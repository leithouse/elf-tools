const PHdr = require('./phdr');
const {PT,SHT} = require('./constants');

class PHdrTable extends Array {
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
  get e_phentsize() { return this.ehdr.e_phentsize }
  /**
   * @type {Integer|BigInt}
   */
  get e_phoff() { return this.ehdr.e_phoff }
  set e_phoff(x) { 
    if(this.N == 64)
      x = BigInt(x);
    this.ehdr.e_phoff = x;
  }
  /**
   * @type {Integer}
   */
  get e_phnum() { return this.ehdr.e_phnum }
  set e_phnum(x) { this.ehdr.e_phnum = x }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let buff = Buffer.alloc(this.e_phnum*this.e_phentsize);
    this.forEach((hdr,i)=>{
      hdr.buffer.copy(buff,i*this.e_phentsize);
    });
    return buff;
  }
  /**
   * Size of table + size of data
   * @type {Integer}
   * @readonly
   */
  get fullSize() {
    let max = this.N == 64? 0n: 0; // Including EHDR, we always start form 0
    this.forEach((phdr)=>{
      let tmp = phdr.p_offset + phdr.p_filesz;
      if(tmp > max)
        max = tmp;
    });
    return max - this.e_phoff;
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Program Headers:\n";
    this.forEach((hdr,i)=>{
      ret += ` [${i.toString().padStart(3)}] ${hdr}\n`;
    });
    return ret;
  }
  /**
   * Build table from an open file handle
   * @param handle {fs~FileHandle}
   * @async
   * @returns {PHdrTable} This instance
   */
  async buildFromHandle(handle) {
    let pos = parseInt(this.e_phoff); // explicitly cast in case of 32 bit
    let size = parseInt(this.e_phnum * this.e_phentsize);
    let buff = Buffer.alloc(size);
    let {bytesRead} = await handle.read(buff,0,size,pos);
    if(bytesRead != size)
      throw new Error(`Failed to read phdr_table entry index ${this.length}`);
    return this.buildFromBuffer(buff,true);
  }
  /**
   * Builds table from Buffer
   * If entire file buffer passed, attaches relevant file data to each header
   * Defaults to assuming entire file buffer is passed
   * @param buff {Buffer}
   * @param [exactSlice=false] {Boolean}
   * @returns {PHdrTable} This instance
   */
  buildFromBuffer(buff,exactSlice=false) {
    let pos = exactSlice?0:parseInt(this.e_phoff); // explicitly cast in case of 32 bit
    let size = parseInt(this.e_phentsize);
    while(this.length < this.e_phnum) {
      let slice = buff.slice(pos,pos+size);
      let {N,LE} = this;
      let phdr = new PHdr({N,LE});
      this.push(phdr.buildFromBuffer(slice));
      pos += size;
      if(!exactSlice) {
        let start = parseInt(phdr.p_offset);
        let size = parseInt(phdr.p_filesz);
        if(!size)
          phdr.data = null;
        else
          phdr.data = buff.slice(start,start+size);
      }
    }
    this.assignSubSegments();
    return this;
  }
  /**
   * Writes to a buffer for writing the elf files
   * @param buff {Buffer} Buff to copy into
   */
  writeToBuffer(buff) {
    this.buffer.copy(buff,parseInt(this.e_phoff));
    this.forEach((hdr)=>{
      if(hdr.data)
        hdr.data.copy(buff,parseInt(hdr.p_offset));
    });
  }
  /**
   * Map sections to segments
   * @param shdrTable {SHdrTable}
   */
  mapSections(shdrTable) {
    let shdrs = [...shdrTable];
    this.forEach((phdr) => {
      shdrTable.forEach((shdr)=>{
        if(shdr.sh_type==SHT.NULL)
          return;
        if(shdr.sh_type!=SHT.NOBITS && (shdr.sh_offset+shdr.sh_size)>(phdr.p_offset+phdr.p_filesz))
          return;
        let dist = shdr.sh_offset - phdr.p_offset;
        if(dist < 0 )
          return;
        
        if(shdr.segment) {
          // Check existing segment has closer offset
          if(dist > (shdr.sh_offset-shdr.segment.p_offset))
            return;
          // Remove from existing segment
          shdr.segment.sections.splice(shdr.segment.sections.indexOf(shdr),1);
        }
        phdr.sections.push(shdr);
        shdr.segment = phdr;
      });
    });
    this.sortSections();
  }
  /**
   * Assign segments to their parents
   * O(n^2) :(
   * Does not currently account for being run twice
   */
  assignSubSegments() {
    this.forEach((phdrA)=>{
      this.forEach((phdrB)=>{
        if(phdrB == phdrA)
          return;
        if((phdrB.p_offset+phdrB.p_filesz)>(phdrA.p_offset+phdrA.p_filesz))
          return;
        let dist = phdrB.p_offset - phdrA.p_offset;
        if(dist < 0)
          return;
        if(phdrA.parentSegment && (phdrA.parentSegment==phdrB))
          return;
        if(phdrB.parentSegment) {
          // Check existing parent segment has closer offset
          if(dist > (phdrB.p_offset - phdrB.parentSegment.p_offset))
            return;
          // Remove from existing parent segment
          phdrB.parentSegment.subSegments.splice(phdrB.parentSegment.subSegments.indexOf(phdrB),1);
        }
        phdrB.parentSegment = phdrA;
        phdrA.subSegments.push(phdrB);
      });
    });
  }
  /**
   * Iterates over all PHdrs and calls sortSections() on each
   */
  sortSections() {
    this.forEach((phdr)=>phdr.sortSections());
  }
  /**
   * Recompute addresses
   * @param [pos=0] {Integer|BigInt}
   * @returns {Integer|BigInt} Address at end of all segments
   */
  recompute(pos=0) {
    this.e_phnum = this.length;
    if(this[0].p_type != PT.PHDR) {
      let tableSize = this.e_phnum * this.e_phentsize;
      if(this.N==64)
        tableSize = BigInt(tableSize);
      pos += tableSize;
    }
    else {
      let sz = this.e_phnum * this.e_phentsize;
      if(this.N==64)
        sz = BigInt(sz);
      this[0].p_memsz = this[0].p_filesz = sz;
    }
    (this.e_phnum * this.e_phentsize);
    if(this.N == 64)
      pos = BigInt(pos);
    for(let i=0; i<this.e_phnum; i++) {
      let phdr = this[i];
      if(!phdr.parentSegment)
        pos = phdr.recompute(pos);
    }
    return pos;
  }
  /**
   * Add a new segment
   * If parentSegment is defined, it will be injected into that segment
   * If praentSegment defined, triggers recompute
   * @param  opt  {JSON} All parameters for PHdr construct
   * @param [opt.data] {Buffer}
   * @param [opt.parentSegment] {PHdr} Segment to inject new segment into
   * @param [opt.parentSegment] {Intger} Index of segment to inject new segment into
   */
  addSegment(opt) {
    let phdr = new PHdr({...opt,N:this.N,LE:this.LE});
    if(opt.data)
      phdr.data = opt.data;
    if(!opt.parentSegment)
      phdr.p_offset = this.fullSize;
    else {
      let segment = opt.parentSegment;
      if(typeof segment == 'number')
        segment = this[segment];
      if(!segment)
        throw new Error('Invalid parent segment');
      phdr.parentSegment = segment;
      segment.subSegments.push(phdr);
    }
    this.push(phdr);
    return phdr;
  }
}

module.exports = PHdrTable;
