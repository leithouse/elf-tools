process.env.NODE_ENV='dev';
const {stringifyConst,SHT,STT,STV,STB,DT} = require('../lib/constants'),
                 {expect} = require('chai'),
                     EHdr = require('../lib/ehdr'),
                     SHdr = require('../lib/shdr'),
                SHdrTable = require('../lib/shdr-table'),
                      fsp = require('fs').promises,
               {execSync} = require('child_process'),
                   StrTab = require('../lib/strtab'),
                   SymTab = require('../lib/symtab');

const TEST_PROG = '/bin/ls';
const tableRE = '(?:\\[(?:\\s|\\d){1,3}\\]) (?<sh_name>.{17}) (?<sh_type>\\w{1,})(?:\\s{1,})(?<sh_addr>\\d|\\w{16})\\s{1,}(?<sh_offset>\\d|\\w{8})\\s{1,}(?<sh_size>\\d|\\w{16})\\s{1,}(?<sh_entsize>\\d|\\w{16})\\s{1,}';

const symbolRE='(?:\\d{1,}:) (?<st_value>(?:\\w|\\d){16})\\s{1,}(?<st_size>\\d{1,})\\s{1,}(?<st_type>\\w{1,})\\s{1,}(?<st_bind>\\w{1,})\\s{1,}(?<st_other>\\w{1,})\\s{1,}(?<st_shndx>\\d|\\w{1,})\\s{0,}(?<name>(?:\\w|\\@|\\.|\\d){1,}(?: \\(\\d\\)){0,1}){0,1}\\s{0,}\\n';

const tagsRE='(?<d_tag>0x(?:\\d|\\w){16})\\s{1,}\\((?<type>\\w{1,})\\)\\s{1,}(?<d_un>(?:\\d|\\w).*)';

describe('SHdr', function() {
  let fpath, fbuff, readelf, readelfTable,table;
  before(async function() {
    fpath = TEST_PROG;
    fbuff = await fsp.readFile(fpath);
    readelf = execSync('/bin/readelf -S '+fpath).toString();
    readelfTable = [];
    readelf.match(new RegExp(tableRE,'g')).forEach((row)=>{
      readelfTable.push(row.match(new RegExp(tableRE)));
    });
  });
  describe('SHdrTable.buildFromHandle()', function() {
    let fhandle,ehdr,table;
    before(async function() {
      fhandle = await fsp.open(fpath,'r');
      ehdr = new EHdr();
      await ehdr.buildFromHandle(fhandle);
      table = new SHdrTable(ehdr);
      await table.buildFromHandle(fhandle);
    });
    after(async function() {
      await fhandle.close();
    });
    it('doesn\'t throw', function() {
      // tests before
    });
    it('populates same number of headers as defined', function() {
      expect(table).length(ehdr.e_shnum);
    });
    it('fills table with SHdr instances', function() {
      table.forEach((hdr)=>expect(hdr).instanceof(SHdr));
    });
    it('header buffer sizes match definition in ehdr', function() {
      table.forEach((hdr)=>expect(hdr.buffer).length(ehdr.e_shentsize));
    });
    it('header data matches that reported by readelf -S', function() {
      table.forEach((hdr,i)=>{
        let chk = readelfTable[i].groups;
        let sh_type = stringifyConst(hdr.sh_type,SHT).replace('SHT_','');
        if(chk.sh_type != 'VERSYM')     
          expect(sh_type).match(new RegExp(chk.sh_type,'i'));
        ['sh_addr','sh_offset','sh_size','sh_entsize'].forEach((prop)=>{
          let num = parseInt(chk[prop],16);
          if(typeof hdr[prop] == 'bigint')
            expect(hdr[prop],prop).equal(BigInt(num));
          else
            expect(hdr[prop],prop).equal(num);
        });
      });
    });
    it('buffer property returns same binary data as read', function() {
      let size = ehdr.e_shentsize * ehdr.e_shnum;
      let start = parseInt(ehdr.e_shoff);
      let chk = fbuff.slice(start,start+size);
      expect(Buffer.compare(chk,table.buffer)).equal(0);
    });
  });
  describe('SHdrTable.buildFromBuffer()', function() {
    let fhandle,ehdr,table;
    before(async function() {
      ehdr = new EHdr();
      await ehdr.buildFromBuffer(fbuff);
      table = new SHdrTable(ehdr);
      await table.buildFromBuffer(fbuff);
    });
    it('buffer property returns same binary data as read', function() {
      let size = ehdr.e_shentsize * ehdr.e_shnum;
      let start = parseInt(ehdr.e_shoff);
      let chk = fbuff.slice(start,start+size);
      expect(Buffer.compare(chk,table.buffer)).equal(0);
    });
    it('attaches segment data', function() {
      table.forEach((entry)=>{
        if(entry.sh_type != SHT.NOBITS && entry.sh_size) {
          expect(entry.data).instanceof(Buffer);
          expect(entry.data).length(parseInt(entry.sh_size));
        }
        else
          expect(entry.data).null;
      });
    });
  });
  describe('ShStr', function() {
    let shstr;
    before(async function() {
      ehdr = new EHdr();
      await ehdr.buildFromBuffer(fbuff);
      table = new SHdrTable(ehdr);
      await table.buildFromBuffer(fbuff);
      shstr = table.shstr;
    });
    it('SHdrTable has reference to the section strings header @shstr', function() {
      expect(shstr).exist;
    });
    it('header has StrTab', function() {
      expect(shstr.strTab).instanceof(StrTab);
    });
    it('strTab.buffer returns same data as in original buffer', function() {
      expect(Buffer.compare(shstr.strTab.buffer,shstr.data)).equal(0);
    });
    it('rebuildData with no changes doesn\'t set sizeHasChanged flag', function() {
      shstr.rebuildData();
      expect(shstr.sizeHasChanged).not.true;
    });
    describe('addString', function() {
      let ndx;
      before(function() {
        ndx = shstr.strTab.addString('foobar');
      });
      it('doesn\'t throw', function() {
        // tests before
      });
      it('returns ndx of added string', function() {
        expect(shstr.strTab.fromNameID(ndx)).equal('foobar');
      });
      it('triggers data rebuild in header', function() {
        expect(Buffer.compare(shstr.strTab.buffer,shstr.data)).equal(0);
      });
      it('flips sizeHasChanged flag header', function() {
        expect(shstr.sizeHasChanged).true;
      });
      it('triggers needsRecompute property in table', function() {
        expect(table.needsRecompute).true;
      });
    });
    describe('rmString', function() {
      let ret;
      before(function() {
        shstr.sizeHasChanged = false;
        ret = shstr.strTab.rmString('foobar');
      });
      it('doesn\'t throw', function() {
        // tests before
      });
      it('returns true on valid string', function() {
        expect(ret).true;
      });
      it('returns false on invalid string', function() {
        expect(shstr.strTab.rmString('asdfasdf')).false;
      });
      it('triggers data rebuild in header', function() {
        expect(Buffer.compare(shstr.strTab.buffer,shstr.data)).equal(0);
      });
      it('flips sizeHasChanged flag header', function() {
        expect(shstr.sizeHasChanged).true;
      });
    });
  });
  describe('SymTab', function() {
    let tab;
    before(function() {
      expect(table).exist;
      let hdr = table.lookup('.dynsym');
      expect(hdr).exist;
      tab = hdr.symTab;
      readelf = execSync('/bin/readelf -s '+fpath).toString();
      readelfTable = [];
      readelf.match(new RegExp(symbolRE,'g')).forEach((row)=>{
        readelfTable.push(row.match(new RegExp(symbolRE)));
      });
    });
    it('builds SymTab from .dynsym section', function() {
      // tests before
    });
    it('populates same number of symbols as readelf', function() {
      expect(tab).length(readelfTable.length);
    });
    it('populates fields properly', function() {
      tab.forEach((sym,i)=>{
        let chk = readelfTable[i].groups;
        ['st_value','st_size','st_shndx'].forEach((prop,i)=>{
          if(chk[prop] == 'UND')
            chk[prop] = 0;
          let num = parseInt(chk[prop],i?10:16);
          if(typeof sym[prop] == 'bigint')
            expect(parseInt(sym[prop]),chk.name+'.'+prop).eql(num);
          else
            expect(sym[prop],prop).equal(num);
        });
        let st_type = stringifyConst(sym.st_type,STT).replace('STT_','');
        expect(st_type).match(new RegExp(chk.st_type,'i'));
        let st_bind = stringifyConst(sym.st_bind,STB).replace('STB_','');
        expect(st_bind).match(new RegExp(chk.st_bind,'i'));
        let st_other = stringifyConst(sym.st_other,STV).replace('STV_','');
        expect(st_other).match(new RegExp(chk.st_other,'i'));
        if(chk.name && sym.name) {
          expect(chk.name).match(new RegExp(sym.name.substring(0,25),'i'));
        }
      });
    });
  });
  describe('DynTags', function() {
    let tags;
    before(function() {
      expect(table).exist;
      let hdr = table.lookup('.dynamic');
      expect(hdr).exist;
      tags = hdr.dynTags;
      expect(tags).exist;
      readelf = execSync('/bin/readelf -d '+fpath).toString();
      readelfTable = [];
      readelf.match(new RegExp(tagsRE,'g')).forEach((row)=>{
        readelfTable.push(row.match(new RegExp(tagsRE)));
      });
    });
    it('builds SymTab from .dynsym section', function() {
      // tests before
    });
    it('populates same number of symbols as readelf', function() {
      expect(tags).length(readelfTable.length);
    });
    it('populates fields properly', function() {
      tags.forEach((dyn,i)=>{
        let chk = readelfTable[i].groups;
        let num;
        if(typeof dyn.d_tag == 'bigint')
          num = BigInt(chk.d_tag);
        else
          num = parseInt(chk.d_tag);
        expect(dyn.d_tag).equal(num);
        let d_type = stringifyConst(dyn.d_tag,DT).replace('DT_','');
        expect(d_type).match(new RegExp(chk.type,'i'));
        num = parseInt(chk.d_un);
        if(!Number.isNaN(num)) {
          if(typeof dyn.d_un == 'bigint')
            num = BigInt(num);
          expect(dyn.d_un).equal(num);
        }
      });
    });
  });
  describe.skip('addSection', function() {
    ['withData','withoutData'].forEach((type,i)=>{
      let shdr,pre,data;
      before(function() {
        expect(table).exist;
        let {sh_offset} = table.shstrhdr;
        let {e_shoff,e_shnum,e_shentsize} = table;
        pre = {sh_offset,e_shoff,e_shnum,e_shentsize};
        if(!i)
          data = Buffer.alloc(0x10);
        shdr = table.addSection(/* TODO */);
        expect(shdr).exist;
      });
      it('doesn\'t throw', function() {
        // tests before
      });
      it('returns SHdr', function() {
        expect(shdr).instanceof(SHdr);
      });
      it('adds string to the section header string tab', function() {
        
      });
    });
  });
});
