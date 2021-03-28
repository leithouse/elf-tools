const constants = require('../lib/constants'),
      SHdrTable = require('../lib/shdr-table'),
           SHdr = require('../lib/shdr'),
           EHdr = require('../lib/ehdr'),
         StrTab = require('../lib/strtab'),
       {expect} = require('chai');

describe('SHdr building', function() {
  describe('SHdr.mkShStrTab', function() {
    let shdr;
    before(function() {
      shdr = SHdr.mkShStrTab(new EHdr());
    })
    it('doesn\'t throw', function() {
      // tests before
    });
    it('sets name index to 1', function() {
      expect(shdr.sh_name).equal(1);
    });
    it('sets sh type to STRTAB', function() {
      expect(shdr.sh_type).equal(constants.SHT.STRTAB);
    });
    it('builds StrTab class', function() {
      expect(shdr.strTab).instanceof(StrTab);
    });
  });
  describe('SHdr table', function() {
    let table,ehdr;
    describe('mkSkeleton', function() {
      before(function() {
        ehdr = new EHdr();
        table = SHdrTable.mkSkeleton(ehdr);
      });
      it('doesn\'t throw', function() {
        // tests before
      });
      it('adds two sections', function() {
        expect(table).length(2);
      });
      it('sets ehdr section count to 2', function() {
        expect(ehdr.e_shnum).equal(2);
      });
      it('sets ehdr string tab index', function() {
        expect(ehdr.e_shstrndx).equal(1);
      });
      describe('first section', function() {
        it('first section is NULL', function() {
          expect(table[0].sh_type).equal(constants.SHT.NULL);
        });
        it('NULL section has all values set to 0', function() {
          let hdr = table[0];
          ['sh_flags','sh_addr','sh_offset','sh_size','sh_link','sh_info','sh_addralign','sh_entsize'].forEach(prop=>expect(parseInt(hdr[prop]),prop).equal(0));
        });
      });
      describe('second section', function() {
        let hdr;
        before(function() { hdr = table[1] });
        it('is type STRTAB', function() {
          expect(hdr.sh_type).equal(constants.SHT.STRTAB);
        });
        it('has name .shstrtab', function() {
          expect(hdr.name).equal('.shstrtab');
        });

      });
    });
    describe('addSection', function() {
      let hdr,name,data;
      before(function() {
        name = 'foobar';
        data = Buffer.from('test');
        hdr = table.addSection({
          name,
          data
        });
      });
      it('doesn\'t throw', function() {
        // tests before
      });
      it('returns a SHdr', function() {
        expect(hdr).instanceof(SHdr);
      });
      it('adds new section before the section string tab', function() {
        expect(table[1]).equal(hdr);
        expect(table[2].strTab).exist;
      });
      it('adds the name to the string tab and correctly sets SHdr.sh_name', function() {
        expect(table[2].strTab.fromNameID(table[1].sh_name)).equal(name);
      });
      it('attaches to SHdr a reference to supplied data', function() {
        expect(hdr.data).equal(data);
      });
      it('increases EHdrs section count', function() {
        expect(ehdr.e_shnum).equal(3);
      });
      it('changes EHdrs string tab index', function() {
        expect(ehdr.e_shstrndx).equal(2);
      });
    });
    describe('addDynSection', function() {
      let preCnt,tags,shdrs;
      before(function() {
        preCnt = table.length;
        tags = [
          { d_tag:constants.DT.NEEDED,  d_un:0x1n, name:'test1' },
          { d_tag:constants.DT.RUNPATH, d_un:0x2n, name:'test2' },
          { d_tag:constants.DT.JMPREL,  d_un:0x3n, name:'test3' },
        ];
        shdrs = table.addDynSection({tags});
      });
      it('returns two SHdrs as {dyn,str}', function() {
        expect(shdrs.dyn).instanceof(SHdr);
        expect(shdrs.str).instanceof(SHdr);
      });
      it('adds two SHdrs to the table', function() {
        expect(table.length).equal(ehdr.e_shnum).equal(preCnt+2);
      });
      it('default names new sections \'.dynamic\' and \'.dynstr\'', function() {
        expect(shdrs.dyn.name).equal('.dynamic');
        expect(shdrs.str.name).equal('.dynstr');
      });
      it('adds only relevant strings to the string section', function() {
        expect(shdrs.str.strTab).eql(['test1','test2']);
      });
      it('adds tags to the dynamic section', function() {
        tags.forEach((tag,i)=>{
          expect(shdrs.dyn.dynTags[i].d_tag).equal(tag.d_tag);
          if(i==2)
            expect(shdrs.dyn.dynTags[i].d_un).equal(tag.d_un);
          else
            expect(shdrs.str.strTab.fromNameID(shdrs.dyn.dynTags[i].d_un)).equal(tag.name)
        });
      });
      it('adds NULL tag at the end of the list', function() {
        expect(shdrs.dyn.dynTags.length).equal(4);
        expect(shdrs.dyn.dynTags[3].d_tag).equal(constants.DT.NULL);
      });
      it('dynTags produces buffer that will reconstruct to same tags', function() {
        let chk = shdrs.dyn.dynTags.toString();
        let hdr = new SHdr({
          ehdr,
          sh_entsize:shdrs.dyn.sh_entsize,
          sh_type:constants.SHT.DYNAMIC,
          data:shdrs.dyn.data
        });
        hdr.dynTags[0].name='test1';
        hdr.dynTags[1].name='test2';
        expect(hdr.dynTags.toString()).equal(chk);
      });
    });
    describe('addSymSection', function() {
      let preCnt,syms,shdrs;
      before(function() {
        preCnt = table.length;
        let {STT,STB} = constants;
        syms = [
          { name:'foo', st_value:0x1, st_size: 0x1, st_type:STT.FUNC, st_bind:STB.LOCAL },
          { name:'bar', st_value:0x2, st_size: 0x2, st_type:STT.FUNC, st_bind:STB.LOCAL },
        ];
        shdrs = table.addSymSection({syms});
      });
      it('returns two SHdrs as {sym,str}', function() {
        expect(shdrs.sym).instanceof(SHdr);
        expect(shdrs.str).instanceof(SHdr);
      });
      it('adds one SHdr to the table, reusing string section if it exists', function() {
        expect(table.length).equal(ehdr.e_shnum).equal(preCnt+1);
      });
      it('default names to \'.dynsym\' and \'.dynstr\'', function() {
        expect(shdrs.sym.name).equal('.dynsym');
        expect(shdrs.str.name).equal('.dynstr');
      });
      it('adds names to the string tab', function() {
        expect(shdrs.str.strTab).includes('foo');
        expect(shdrs.str.strTab).includes('bar');
      });
      it('adds NOTYPE symbol to start of list', function() {
        expect(shdrs.sym.symTab[0].st_type).equal(constants.STT.NOTYPE);
      });
      it('adds specified symbols, auto generating the st_name field', function() {
        syms.forEach((info,i)=>{
          let sym = shdrs.sym.symTab[i+1];
          ['st_value','st_size','st_type','st_bind','name'].forEach((prop)=>{
            expect(sym).property(prop,info[prop]);
          });
          expect(shdrs.str.strTab.fromNameID(sym.st_name)).equal(info.name);
        });
      });
      it('SymTab creates buffer which recreates to itself', function() {
        let chk = shdrs.sym.symTab.toString();
        let hdr = new SHdr({
          ehdr,
          sh_type:constants.SHT.DYNSYM,
          sh_entsize:shdrs.sym.sh_entsize,
          data:shdrs.sym.data
        });
        hdr.symTab[1].name='foo';
        hdr.symTab[2].name='bar';
        expect(hdr.symTab.toString()).equal(chk);
      });
    });
    describe('addRelocSection', function() {
      let preCnt,rels,shdrs;
      before(function() {
        preCnt = table.length;
        let {STT,STB} = constants;
        rels = [
          { r_offset: 0x1, sym: {
            name:'reloc', st_value:0x1, st_size: 0x1, st_type:STT.FUNC, st_bind:STB.LOCAL
          }},
          { r_offset: 0x2, r_info: 0x20 }
        ]
        shdr = table.addRelocSection({rels,name:'foo'});
      });
      it('returns SHdr ', function() {
        expect(shdr).instanceof(SHdr);
      });
      it('adds one SHdr to the table', function() {
        expect(table.length).equal(ehdr.e_shnum).equal(preCnt+1);
      });
      it('adjust name to start with \'.rel\'', function() {
        expect(shdr.name).equal('.rela.foo');
      });
      it('adds specified symbol and sets r_sym on rel added', function() {
        let rel = shdr.relTab[0];
        let sym = table.lookup('.dynsym').symTab[rel.r_sym];
        expect(sym).exist;
        expect(sym.name).equal('reloc');
      });
      it('adds relocation which has no symbol', function() {
        expect(shdr.relTab[1].r_offset).equal(BigInt(0x2));
        expect(shdr.relTab[1].r_info).equal(BigInt(0x20));
      });
      it('RelTab creates buffer which recreates to itself', function() {
        let hdr = new SHdr({
          ehdr,
          sh_type:constants.SHT.RELA,
          sh_entsize:shdr.sh_entsize,
          data:shdr.data
        });
        expect(hdr.relTab).eql(shdr.relTab);
      });
    });
    describe('addNotesSection', function() {
      let desc,preCnt,rels,notes;
      before(function() {
        preCnt = table.length;
        let {NT} = constants;
        desc = Buffer.from('asdfasdffddadfasdfasdfasdfasdf');
        notes = [
          { n_type: NT.VERSION, name:'ver',desc:'asdf'},
          { n_type: NT.GNU_ABI_TAG, name:'GNU',desc }
        ];
        shdr = table.addNotesSection({notes,name:'foo'});
      });
      it('returns SHdr ', function() {
        expect(shdr).instanceof(SHdr);
      });
      it('adds one SHdr to the table', function() {
        expect(table.length).equal(ehdr.e_shnum).equal(preCnt+1);
      });
      it('adjust name to start with \'.note\'', function() {
        expect(shdr.name).equal('.note.foo');
      });
      it('adds specified notes, converting string to buffer if necessary', function() {
        expect(shdr.notes).length(2);
        expect(shdr.notes[0].name).equal('ver');
        expect(Buffer.compare(shdr.notes[0].desc,Buffer.from('asdf\0'))).equal(0);
        expect(shdr.notes[0].n_namesz).equal(4);
        expect(shdr.notes[0].n_descsz).equal(5);
        expect(shdr.notes[1].name).equal('GNU');
        expect(shdr.notes[1].desc).equal(desc);
        expect(shdr.notes[1].n_namesz).equal(4);
        expect(shdr.notes[1].n_descsz).equal(desc.length);
      });
      it('Notes creates buffer which recreates to itself', function() {
        let hdr = new SHdr({
          ehdr,
          sh_type:constants.SHT.NOTE,
          data:shdr.data
        });
        expect(hdr.notes).eql(shdr.notes);
      });
    });
  });
});
