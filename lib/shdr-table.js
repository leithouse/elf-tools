const SHdr = require('./shdr'),
  {DT,SHT} = require('./constants'),
         _ = new WeakMap();

const dynTagIsString = (d_tag) => {
  d_tag = parseInt(d_tag);
  switch(d_tag) {
    case DT.NEEDED:
    case DT.RUNPATH:
    case DT.SONAME:
    case DT.RPATH:
      return true;
  }
  return false;
}

/**
 * @typedef TagInfo
 * @type {JSON}
 * @prop  d_tag {String}
 * @prop [d_un] {Integer|BigInt} Only optional if string index will be generated
 * @prop [name] {String} Necessary if d_tag type defines a string table offset
 */


class SHdrTable extends Array {
  /**
   * Make skeleton with a NULL section and a section string tab
   * @param  ehdr {EHdr}
   * @param [shdrClass=SHdr] {Prototype} Alternative SHdr class to use
   * @returns {SHdrTable}
   */
  static mkSkeleton(ehdr,shdrClass) {
    let table = new SHdrTable(ehdr,shdrClass);
    table.push(new SHdr({ehdr}));
    table.push(SHdr.mkShStrTab(ehdr));
    ehdr.e_shnum=2;
    ehdr.e_shstrndx=1;
    table.loadNames();
    return table;
  }
  /**
   * @param  ehdr {EHdr}
   * @param [shdrClass=SHdr] {Prototype} Alternative SHdr class to use
   */
  constructor(ehdr,shdrClass) {
    super();
    if(!shdrClass)
      shdrClass = SHdr;
    let me = { ehdr, shdrClass }
    _.set(this,me);
  }
  /**
   * @type {Integer}
   * @readonly
   */
  get N() { return _.get(this).ehdr.N }
  /**
   * @type {Boolean}
   * @readonly
   */
  get LE() { return _.get(this).ehdr.LE }
  /**
   * @type {Integer|BigInt}
   * @readonly
   */
  get e_shentsize() { return _.get(this).ehdr.e_shentsize }
  /**
   * @type {Integer|BigInt}
   */
  get e_shoff() { return _.get(this).ehdr.e_shoff }
  set e_shoff(x) { 
    if(this.N == 64)
      x = BigInt(x);
    _.get(this).ehdr.e_shoff = x;
  }
  /**
   * @type {Integer}
   */
  get e_shnum() { return _.get(this).ehdr.e_shnum }
  set e_shnum(x) { _.get(this).ehdr.e_shnum = x }
  /**
   * @type {Integer}
   */
  get e_shstrndx() { return _.get(this).ehdr.e_shstrndx }
  set e_shstrndx(x) { _.get(this).ehdr.e_shstrndx = x }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let buff = Buffer.alloc(this.e_shnum*this.e_shentsize);
    this.forEach((hdr,i)=>{
      hdr.buffer.copy(buff,i*this.e_shentsize);
    });
    return buff;
  }
  /**
   * Size of table + size of data
   * @type {Integer}
   * @readonly
   */
  get fullSize() {
    let size = this.e_shnum*this.e_shentsize;
    this.forEach((hdr)=>{
      if(!hdr.segmentCnt && hdr.sh_type != SHT.NOBITS)
        size += parseInt(hdr.sh_size);
    });
    return size;
  }
  /**
   * @type {StrTab}
   * @readonly
   */
  get shstr() { return this[this.e_shstrndx]; }
  /**
   * @type {Boolean}
   * @readonly
   */
  get needsRecompute() {
    let iMax = this.length;
    for(let i=0;i<iMax;i++) {
      if(this[i].sizeHasChanged)
        return true;
    }
    return false;
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Section Headers:\n";
    this.forEach((hdr,i)=>{
      ret += ` [${i.toString().padStart(3)}] ${hdr}\n`;
    });
    return ret;
  }
  /**
   * Pulls names from str tab and attaches them to SHdrs
   * @returns {Boolean}
   */
  loadNames() {
    if(!this.shstr || !this.shstr.strTab)
      return false;
    this.forEach((hdr)=>{
      hdr.name = this.shstr.strTab.fromNameID(hdr.sh_name);
      ['dynTags','symTab'].forEach((sub,isSymbols)=>{
        if(hdr[sub]) {
          let {strTab} = this[hdr.sh_link];
          if(strTab) {
            hdr[sub].forEach((el,i)=>{
              if(!isSymbols) { // maybe dynamic tag name
                if(dynTagIsString(el.d_tag))
                  el.name = strTab.fromNameID(el.d_un);
              }
              else { // symbol names, indexed
                el.name = strTab.fromNameID(el.st_name);
              }
            });
          }
        }
      });
    });
    return true;
  }
  /**
   * Looks up a header by name
   * @param name {String}
   * @returns {SHdr}
   */
  lookup(name) {
    let iMax = this.length;
    for(let i=0; i<iMax; i++) {
      if(this[i].name == name)
        return this[i];
    }
    return null;
  }
  /**
   * Build table from an open file handle
   * @param handle {fs~FileHandle}
   * @async
   * @returns {SHdrTable} This instance
   */
  async buildFromHandle(handle) {
    let pos = parseInt(this.e_shoff); // explicitly cast in case of 32 bit
    let size = parseInt(this.e_shnum * this.e_shentsize);
    let buff = Buffer.alloc(size);
    let {bytesRead} = await handle.read(buff,0,size,pos);
    if(bytesRead != size)
      throw new Error(`Failed to read shdr_table entry index ${this.length}`);
    await this.buildFromBuffer(buff,true);
    let iMax = this.length;
    for(let i=0; i<iMax; i++) {
      let hdr = this[i];
      if(hdr.sh_type == SHT.NOBITS)
        continue;
      let size = parseInt(hdr.sh_size);
      if(!size)
        continue;
      hdr.data = Buffer.alloc(size);
      let {bytesRead} = await handle.read(hdr.data,0,size,parseInt(hdr.sh_offset));
      if(bytesRead != size)
        throw new Error('Couldn\'t read full section segment');
      hdr.handleData();
    };
    this.loadNames();
    return this;
  }
  /**
   * Builds table from Buffer
   * If entire file buffer passed, attaches relevant file data to each header
   * Defaults to assuming entire file buffer is passed
   * @param buff {Buffer}
   * @param [exactSlice=false] {Boolean}
   * @returns {SHdrTable} This instance
   */
  buildFromBuffer(buff,exactSlice=false) {
    let pos = exactSlice?0:parseInt(this.e_shoff); // explicitly cast in case of 32 bit
    let size = parseInt(this.e_shentsize);
    while(this.length < this.e_shnum) {
      let slice = buff.slice(pos,pos+size);
      let {N,LE} = this;
      let shdr = new (_.get(this).shdrClass)({ehdr:_.get(this).ehdr});
      this.push(shdr.buildFromBuffer(slice));
      pos += size;
      if(!exactSlice) {
        let start = parseInt(shdr.sh_offset);
        let size = parseInt(shdr.sh_size);
        if(!size || shdr.sh_type == SHT.NOBITS)
          shdr.data = null;
        else
          shdr.data = buff.slice(start,start+size);
        shdr.handleData();
      }
    }
    if(!exactSlice)
      this.loadNames();
    return this;
  }
  /**
   * Writes to a buffer for writing the elf files
   * @param buff {Buffer} Buff to copy into
   */
  writeToBuffer(buff) {
    this.buffer.copy(buff,parseInt(this.e_shoff));
    this.forEach((hdr)=>{
      if(hdr.data)
        hdr.data.copy(buff,parseInt(hdr.sh_offset));
    });
  }
  /**
   * Recompute addresses for orphaned sections and the SHdrTable
   * Orphaned section = not part of any segment
   * @param pos {Integer} New starting point
   */
  recompute(pos) {
    this.e_shnum = this.length;
    for(let i=0;i<this.e_shnum;i++) {
      let shdr = this[i];
      if(shdr.segment || (shdr.sh_type==SHT.NOBITS) || shdr.sh_type==SHT.NULL)
        continue;
      if(shdr.sh_addralign) {
        while(pos%shdr.sh_addralign)
          pos++;
      }
      shdr.sh_offset = pos;
      pos += shdr.sh_size;
    }
    this.e_shoff = pos;
  }
  /**
   * Adds a section
   * sh_offset and size are autocalculated
   * @param opt {JSON} Parameters for SHdr
   * @param [opt.data] {Buffer}
   * @param [opt.name] {String}
   * @returns {SHdr}
   */
  addSection(opt) {
    if(!opt)
      opt = {};
    opt.ehdr = _.get(this).ehdr;
    let shdr = new (_.get(this).shdrClass)(opt);
    let {data,name} = opt;
    if(data && shdr.sh_type != SHT.NOBITS) {
      shdr.data = data;
      shdr.handleData();
      let f = this.N==64?BigInt:parseInt;
      shdr.sh_size = f(data.length);
    }
    if(name) {
      shdr.sh_name = this.shstr.strTab.addString(name);
      shdr.name = name;
    }
    let shstr = this.shstr;
    this[this.e_shstrndx] = shdr;
    this.e_shstrndx = this.push(shstr) - 1;
    this.e_shnum++;
    return shdr;
  }
  /**
   * Add a dynamic section. Also adds a string tab for it if it doesn't exist
   * @param [opt.name='.dynamic']   {String}
   * @param [opt.strName='.dynstr'] {String}
   * @param  opt.tags               {TagInfo[]}
   * @returns shdrs {Object}
   * @returns shdrs.dyn {SHdr} Dynamic section
   * @returns shdrs.str {SHdr} String section
   */
  addDynSection(opt) {
    let dyn = this.addSection({
      sh_type: SHT.DYNAMIC,
      sh_flags: 0x3,
      sh_addralign: 0x8,
      sh_entsize: this.N==64?0x10:0x8,
      data: Buffer.alloc(0),
      name: opt.name || '.dynamic'
    });
    let strName = opt.strName || '.dynstr';
    let str = this.lookup(strName);
    if(!str) {
      str = this.addSection({
        sh_type:SHT.STRTAB,
        sh_flags: 0x2,
        sh_addralign:0x1,
        data: Buffer.alloc(0),
        name: opt.strName || '.dynstr'
      });
    }
    dyn.sh_link = this.length - 2;
    opt.tags.forEach((entry)=>{
      let {d_tag,d_un,name} = entry;
      let attachName;
      if(dynTagIsString(d_tag)) {
        d_un = str.strTab.addString(name);
        if(this.N==64)
          d_un = BigInt(d_un);
        attachName = true;
      }
      let tag = dyn.dynTags.addDyn({d_tag,d_un});
      if(attachName)
        tag.name = name;
    });
    return {dyn,str}
  }
  /**
   * Add a symbol table. If no relevant string table exists, it will be created
   * @param [opt.type='.dynsym'] {String} Other option is .symtab
   * @param [opt.syms]           {JSON[]} Parameters for addSymbol()
   * @returns shdrs {Object}
   * @returns shdrs.sym {SHdr} Symbol section
   * @returns shdrs.str {SHdr} String section
   */
  addSymSection(opt) {
    if(!opt)
      opt = {};
    let name, strName, sh_type, sh_entsize = this.N==64?0x18n:0x10;
    if(opt.type == '.symtab')
      name = '.symtab', strName = '.strtab', sh_type = SHT.SYMTAB;
    else
      name = '.dynsym', strName = '.dynstr', sh_type = SHT.DYNSYM;
    let sym = this.addSection({
      sh_type,
      sh_flags: 0x2,
      sh_addralign: 0x8,
      sh_entsize,
      data: Buffer.alloc(parseInt(sh_entsize)),
      name
    });
    let str = this.lookup(strName);
    if(!str) {
      str = this.addSection({
        sh_type:SHT.STRTAB,
        sh_flags: 0x2,
        sh_addralign:0x1,
        data: Buffer.alloc(0),
        name: strName
      });
    }
    if(opt.syms)
      opt.syms.forEach((param) => this.addSymbol(param));
    return {sym,str};
  }
  /**
   * Adds a symbol. First checks for .dynsym, then .symtab
   * Creates .dynsym if necessary
   * st_name is auto generated
   * @param opt      {JSON} Parameters for Sym
   * @param opt.name {String} Name to add to string tab
   * @returns ret {JSON}
   * @returns ret.sym {Sym}
   * @returns ret.idx {Integer}
   */
  addSymbol(opt) {
    let sym,str;
    sym = this.lookup('.dynsym');
    if(sym)
      str = this.lookup('.dynstr');
    else {
      sym = this.lookup('.symtab');
      str = this.lookup('.strtab');
    }
    if(!sym) {
      let shdrs = this.addSymSection();
      sym = shdrs.sym;
      str = shdrs.str;
    }
    opt.st_name = str.strTab.addString(opt.name);
    let symbol = sym.symTab.addSym(opt);
    symbol.name = opt.name;
    return {sym:symbol,idx:sym.symTab.length-1};
  }
  /**
   * Adds reloc section
   * @param  opt.name                  {String} Prepended if appropriate
   * @param [opt.symSection='.dynsym'] {String}
   * @param [opt.applySection]         {String} Defaults to SHN_UNDEF
   * @param [opt.noAddend=false]       {Boolean}
   * @param [opt.rels]                 {JSON[]} Parameters for addRel
   * @returns {SHdr}
   */
  addRelocSection(opt) {
    let symSection = opt.symSection || '.dynsym';
    let sh_link = this.findIndex(hdr=>hdr.name==symSection);
    if(!sh_link)
      throw new Error('No symbol section to link reloc section to');
    let sh_info = 0;
    if(opt.applySection)
      sh_info = this.findIndex(hdr=>hdr.name==opt.applySection);
    let sh_type = opt.noAddend?SHT.REL:SHT.RELA;
    let sh_entsize = this.N==64?0x18n:0x8;
    let name = opt.name;
    if(!name.startsWith('.'))
      name = '.'+name;
    if(!name.startsWith('.rel'))
      name = `.rel${opt.noAddend?'':'a'}${name}`;
    let reloc = this.addSection({
      sh_type,
      sh_flags: 0x2,
      sh_addralign: 0x8,
      sh_entsize,
      data: Buffer.alloc(0),
      name
    });
    if(opt.rels)
      opt.rels.forEach((rel)=>this.addRel({...rel,reloc}));
    return reloc;
  }
  /**
   * Add a relocation entry
   * @param  opt       {JSON} Parameters for Rel or RelA
   * @param  opt.reloc {SHdr} Relocation section header
   * @param  opt.reloc {String} Name of relocation section header
   * @param [opt.sym]  {JSON} Parameter for associated symbol
   * @returns {Rel|RelA}
   */
  addRel(opt) {
    let {reloc,sym} = opt;
    if(!(reloc instanceof SHdr))
      reloc = this.lookup(reloc);
    if(sym)
      opt.r_sym = this.addSymbol(sym).idx;
    return reloc.relTab.addRel(opt);
  }
  /**
   * Adds a notes section
   * @param  opt.name   {String} Will be prepended with .note. if necessary
   * @param [opt.notes] {JSON[]} Parameters for Notes.addNote()
   * @returns {SHdr}
   */
  addNotesSection(opt) {
    let name = opt.name;
    if(!name.startsWith('.'))
      name = '.'+name;
    if(!name.startsWith('.note'))
      name = '.note'+name;
    opt.name = name;
    if(opt.sh_flags === undefined)
      opt.sh_flags = 0x2;
    opt.sh_type = SHT.NOTE;
    opt.data = Buffer.alloc(0);
    let shdr = this.addSection(opt);
    if(opt.notes)
      opt.notes.forEach((note)=>shdr.notes.addNote(note));
    return shdr;
  }
  /**
   * Searches for and updates values of various dynamic tags pertaining to 
   * section header table values
   */
  updateDynTags() {
    let dynamic = this.lookup('.dynamic');
    if(!dynamic)
      return false;
    let tags = dynamic.dynTags;
    let updateTag = (type)=>tags.find(x=>x.d_tag==type)
    let str = this.lookup('.dynstr');
    if(str) {
      tags.updateOrAdd({d_tag:DT.STRTAB, d_un:str.sh_addr});
      tags.updateOrAdd({d_tag:DT.STRSZ,  d_un:str.sh_size});
    }
    let sym = this.lookup('.dynsym');
    if(sym) {
      tags.updateOrAdd({d_tag:DT.SYMTAB, d_un:sym.sh_addr});
      tags.updateOrAdd({d_tag:DT.SYMSZ,  d_un:sym.sh_size});
      tags.updateOrAdd({d_tag:DT.SYMENT, d_un:sym.sh_entsize});
    }
    let rela = this.lookup('.rela.dyn');
    if(rela) {
      tags.updateOrAdd({d_tag:DT.RELA,    d_un:rela.sh_addr});
      tags.updateOrAdd({d_tag:DT.RELSZ,   d_un:rela.sh_size});
      tags.updateOrAdd({d_tag:DT.RELAENT, d_un:rela.sh_entsize});
    }
    rela = this.lookup('.rela.plt');
    if(rela) {
      tags.updateOrAdd({d_tag:DT.JMPREL,    d_un:rela.sh_addr});
      tags.updateOrAdd({d_tag:DT.PLTRELSZ,  d_un:rela.sh_size});
      tags.updateOrAdd({d_tag:DT.RELAENT,   d_un:rela.sh_entsize});
      tags.updateOrAdd({d_tag:DT.PLTREL,    d_un:DT.RELA});
    }
    let rel = this.lookup('.rel.plt');
    if(rel) {
      tags.updateOrAdd({d_tag:DT.JMPREL,   d_un:rel.sh_addr});
      tags.updateOrAdd({d_tag:DT.PLTRELSZ, d_un:rel.sh_size});
      tags.updateOrAdd({d_tag:DT.RELENT,   d_un:rel.sh_entsize});
      tags.updateOrAdd({d_tag:DT.PLTREL,   d_un:DT.REL});
    }
    let init = this.lookup('.init');
    if(init)
      tags.updateOrAdd({d_tags:DT.INIT, d_un: init.sh_addr});
    let fini = this.lookup('.fini');
    if(fini)
      tags.updateOrAdd({d_tags:DT.FINI, d_un: fini.sh_addr});
    init = this.lookup('.init_array');
    if(init) {
      tags.updateOrAdd({d_tags:DT.INIT_ARRAY,   d_un: init.sh_addr});
      tags.updateOrAdd({d_tags:DT.INIT_ARRAYSZ, d_un: init.sh_size});
    }
    fini = this.lookup('.fini_array');
    if(fini) {
      tags.updateOrAdd({d_tags:DT.FINI_ARRAY,   d_un: fini.sh_addr});
      tags.updateOrAdd({d_tags:DT.FINI_ARRAYSZ, d_un: fini.sh_size});
    }
  }
}

module.exports = SHdrTable;
