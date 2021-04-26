const PHdr = require('./phdr'),
      SHdr = require('./shdr'),
         _ = new WeakMap();

const {PT,SHT,EI_NIDENT} = require('./constants');

class PHdrTable extends Array {
  /**
   * Make skeleton with a load segment @ 0x0 and a PHDR segment
   * @param  ehdr {EHdr}
   * @returns {PHdrTable}
   */
  static mkSkeleton(ehdr) {
    let table = new PHdrTable(ehdr);
    let load = table.addLoad();
    table.addSegment({
      p_type:PT.PHDR,
      parentSegment:load
    });
    table.recompute();
    return table;
  }
  /**
   * @param ehdr {EHdr}
   */
  constructor(ehdr) {
    super();
    _.set(this,{ehdr});
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
  get e_phentsize() { return _.get(this).ehdr.e_phentsize }
  /**
   * @type {Integer|BigInt}
   */
  get e_phoff() { return _.get(this).ehdr.e_phoff }
  set e_phoff(x) { 
    if(this.N == 64)
      x = BigInt(x);
    _.get(this).ehdr.e_phoff = x;
  }
  /**
   * @type {Integer}
   */
  get e_phnum() { return _.get(this).ehdr.e_phnum }
  set e_phnum(x) { _.get(this).ehdr.e_phnum = x }
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
    return max;
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
      let phdr = new PHdr({ehdr:_.get(this).ehdr});
      this.push(phdr.buildFromBuffer(slice));
      pos += size;
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
   * Add a new segment
   * If parentSegment is defined, it will be injected into that segment
   * If praentSegment defined, triggers recompute
   * @param  opt  {JSON} All parameters for PHdr construct
   * @param [opt.parentSegment] {PHdr} Segment to inject new segment into
   * @param [opt.parentSegment] {Intger} Index of segment to inject new segment into
   */
  addSegment(opt) {
    if(!opt)
      opt = {};
    if(opt.p_filesz && !opt.p_memsz)
      opt.p_memsz = opt.p_filesz
    if(!opt.p_filesz && opt.p_memsz)
      opt.p_filesz = opt.p_memsz
    let phdr = new PHdr({...opt,ehdr:_.get(this).ehdr});
    if(!opt.parentSegment) {
      if(phdr.p_type != PT.LOAD)
        throw new Error('Can\'t add non-load segment without a parent');
      phdr.p_offset = phdr.p_vaddr = phdr.p_paddr = this.fullSize;
    }
    else {
      let segment = opt.parentSegment;
      if(segment == 'load')
        segment = this.find(x=>x.p_type==PT.LOAD);
      if(typeof segment == 'number')
        segment = this[segment];
      if(!segment)
        throw new Error('Invalid parent segment');
      let loadParent = segment.addSegment(phdr);
      loadParent.recompute();
      let pos = loadParent.p_offset + loadParent.p_filesz;
      let iMax = this.length;
      for(let i=this.indexOf(loadParent)+1;i<iMax;i++) {
        let load = this[i];
        if(load.p_type != PT.LOAD)
          continue;
        pos = load.recompute(pos);
      }
    }
    this.e_phnum++;
    if(phdr.p_type == PT.PHDR)
      this.splice(0,0,phdr);
    else if(phdr.p_type == PT.INTERP) {
      let idx = (this[0].p_type==PT.PHDR)?1:0;
      this.splice(idx,0,phdr);
    }
    else
      this.push(phdr);
    return phdr;
  }
  /**
   * Adds a load segment
   * @returns {PHdr}
   */
  addLoad(opt) {
    if(!opt)
      opt = {};
    opt.p_type = PT.LOAD;
    opt.p_align = 0x1000;
    return this.addSegment(opt);
  }
  /**
   * Add section to segment
   * Defaults to first load segment
   * @param [opt.shdr]    {SHdr} Section to add
   * @param [opt.segment] {PHdr} Segment to add it to
   * @param [opt.segment] {Integer}
   * @returns {BigInt|Integer}
   */
  addSection(opt) {
    if(opt instanceof SHdr)
      opt = { shdr: opt };
    let {shdr,segment} = opt;
    if(!shdr)
      throw new Error('Must supply SHdr');
    if(typeof segment == 'number')
      segment = this[segment];
    if(!segment) {
      let iMax = this.length;
      for(let i=0;i<iMax;i++) {
        if(this[i].p_type==PT.LOAD) {
          segment = this[i];
          break;
    } } }
    if(!segment)
      throw new Error('Couldn\'t find segment to add to');
    let loadParent = segment.addSection(shdr);
    loadParent.recompute();
    let pos = loadParent.p_offset + loadParent.p_filesz;
    let iMax = this.length;
    for(let i=this.indexOf(loadParent)+1;i<iMax;i++) {
      let load = this[i];
      if(load.p_type != PT.LOAD)
        continue;
      pos = load.recompute(pos);
    }
  }
  /**
   * Iterates over every LOAD segment and recomputes it
   * @returns {Integer|BigInt} Final position
   */
  recompute(pos=0) {
    if(this.N==64)
      pos = BigInt(pos);
    if(this[0].p_type == PT.PHDR) {
      let sz = this.e_phnum * this.e_phentsize;
      if(this.N==64)
        sz = BigInt(sz);
      this[0].p_filesz = this[0].p_memsz = sz;
    }
    this.forEach((hdr)=>{
      if(hdr.p_type == PT.LOAD)
        pos = hdr.recompute(pos);
    });
    return pos;
  }
}

module.exports = PHdrTable;
