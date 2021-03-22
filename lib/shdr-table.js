const SHdr = require('./shdr'),
     {SHT} = require('./constants');

class SHdrTable extends Array {
  /**
   * @param ehdr {EHdr}
   */
  constructor(ehdr) {
    super();
    this.ehdr = ehdr;
  }
  /**
   * @type {Integer}
   * @readonly
   */
  get N() { return this.ehdr.N }
  /**
   * @type {Boolean}
   * @readonly
   */
  get LE() { return this.ehdr.LE }
  /**
   * @type {Integer|BigInt}
   * @readonly
   */
  get e_shentsize() { return this.ehdr.e_shentsize }
  /**
   * @type {Integer|BigInt}
   */
  get e_shoff() { return this.ehdr.e_shoff }
  set e_shoff(x) { 
    if(this.N == 64)
      x = parseInt(x);
    this.ehdr.e_shoff = x;
  }
  /**
   * @type {Integer}
   */
  get e_shnum() { return this.ehdr.e_shnum }
  set e_shnum(x) { this.ehdr.e_shnum = x }
  /**
   * @type {Integer}
   */
  get e_shstrndx() { return this.ehdr.e_shstrndx }
  set e_shstrndx(x) { this.ehdr.e_shstrndx = x }
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
  loadHeaderNames() {
    if(!this.shstr || !this.shstr.strTab)
      return false;
    this.forEach((hdr)=>{
      hdr.name = this.shstr.strTab.fromNameID(hdr.sh_name);
    });
    let dynsym = this.lookup('.dynsym');
    let dynstr = this.lookup('.dynstr');
    if(dynsym && dynstr) {
      let symtab = dynsym.symTab;
      let strtab = dynstr.strTab;
      symtab.forEach((sym)=>{
        sym.name = strtab.fromNameID(sym.st_name);
      });
    }
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
    this.loadHeaderNames();
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
      let shdr = new SHdr({N,LE});
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
      this.loadHeaderNames();
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
   * sh_type will auto set to NOBITS if no data provided
   * sh_offset and size are autocalculated
   * @param opt {JSON} Parameters for SHdr
   * @param [opt.data] {Buffer}
   * @param [opt.name] {String}
   * @returns {SHdr}
   */
  addSection(opt) {
    if(!opt)
      opt = {};
    let shdr = new SHdr(opt);
    let {data,name} = opt;
    if(data && shdr.sh_type != SHT.NOBITS) {
      shdr.data = data;
      shdr.handleData();
      let f = this.N==64?BigInt:parseInt;
      opt.sh_size = f(data.length);
      this.e_shoff += opt.sh_size;
    }
    if(name)
      shdr.sh_name = this.shstr.strTab.addString(name);
    let shstr = this.shstr;
    this[this.e_shstrndx] = shdr;
    this.e_shstrndx = this.push(shstr) - 1;
    this.e_shnum++;
    return shdr;
  }
}

module.exports = SHdrTable;
