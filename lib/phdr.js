const E_Ident = require('./e_ident'),
         SHdr = require('./shdr'),
            _ = new WeakMap();

const {
  EI_NIDENT,
  PT,
  SHT
} = require('./constants');

const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');

class PHdr {
  /**
   * @param  opt.ehdr        {EHdr}
   * @param [opt.shdr]       {SHdr} Section contained in segment
   * @param [opt.shdr]       {SHdr[]} Sections contained in segment
   * @param [opt.p_type]     {PT}
   * @param [opt.p_offset=0] {Integer|BigInt}
   * @param [opt.p_vaddr=0]  {Integer|BigInt}
   * @param [opt.p_paddr=0]  {Integer|BigInt}
   * @param [opt.p_filesz=0] {Integer}
   * @param [opt.p_memsz=0]  {Integer}
   * @param [opt.p_flags=0]  {Integer}
   * @param [opt.p_align=0]  {Integer}
   */
  constructor(opt) {
    _.set(this,{ehdr:opt.ehdr});
    this.structProps.forEach((prop)=>{
      if(opt[prop.key] !== undefined)
        this[prop.key] = opt[prop.key];
      else
        this[prop.key] = prop.dflt;
    });
    this.sections = [];
    this.subSegments = [];
    this.parentSegment = null;
    this.sizeHasChanged = false;
    if(this.N==64) {
      ['offset','vaddr','paddr','filesz','memsz','align'].forEach((p)=>{
        let prop = `p_${p}`;
        this[prop] = BigInt(this[prop]);
      });
    }
    if(opt.shdr) {
      if(!(opt.shdr instanceof Array))
        opt.shdr = [opt.shdr];
      opt.shdr.forEach((shdr)=>this.addSection(shdr));
    }
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
   * Returns true if any internal sections have "needsRecompute" flag
   * @type {Boolean}
   * @readonly
   */
  get needsRecompute() {
    for(let i in this.sections) {
      if(this.sections[i].needsRecompute)
        return true;
    }
    return false;
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    let props = [ { key:'p_type',size:32, dflt: PT.LOAD, tdef: PT } ];
    let flags = { key:'p_flags',size:32, dflt:0 };
    if(this.N == 64)
      props.push(flags);
    props.push(
      { key: 'p_offset', size: 0, dflt: 0 },
      { key: 'p_vaddr',  size: 0, dflt: 0 },
      { key: 'p_paddr',  size: 0, dflt: 0 },
      { key: 'p_filesz', size: 0, dflt: 0 },
      { key: 'p_memsz',  size: 0, dflt: 0 },
    );
    if(this.N == 32)
      props.push(flags);
    props.push({ key: 'p_align', size: 0, dflt: 0 });
    return props;
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() { return struct2buff(this) }
  /**
   * @returns {String}
   */
  toString() { 
    let extra = `segmentCnt=${this.subSegments.length}, sectionCnt=${this.sections.length}`;
    return `PHdr:{${struct2string(this)}, ${extra}}`;
  }
  /**
   * Build from buff
   * @param buff {Buffer}
   * @async
   * @returns {PHdr} Reference to this instance
   */
  buildFromBuffer(buff) {
    let struct = buff2struct({buff,N:this.N,LE:this.LE,props:this.structProps});
    Object.assign(this,struct);
    return this;
  }
  /**
   * Recomputes addresses based on new starting position
   * May change sh_offset of any child sections
   * May change p_offset of instance
   * May change p_data of instance
   * May change p_filesz of instance
   * If p_vaddr or p_paddr exist, they will be incremented/decremented same amount as p_offset
   *
   * @param [pos] {Integer|BigInt} Starting position. Default instance's p_offset
   * @returns pos {Integer|BigInt} Position at end of recomputed segment
   */
  recompute(pos) {
    if(!this.p_offset && !this.p_filesz && !this.p_type == PT.LOAD)
      return pos;
    if(!pos)
      pos = this.p_offset;
    if(this.p_type == PT.PHDR) {
      pos = 4*EI_NIDENT;
      if(this.N == 64)
        pos = BigInt(pos);
      this.p_offset = this.p_paddr = this.p_vaddr = pos;
      return this.p_offset + this.p_filesz;
    }
    let orig = this.p_offset;
    if(this.p_align > 0x1) {
      while(pos%this.p_align)
        pos++;
    }
    this.p_offset = this.p_paddr = this.p_vaddr = pos;
    let subSegments = [...this.subSegments];
    let sections = [...this.sections];
    while(subSegments[0] || sections[0]) {
      if(!sections[0])
        pos = subSegments.shift().recompute(pos);
      else if(!subSegments[0])
        pos = sections.shift().recompute(pos);
      else {
        let arr = (sections[0].sh_offset<subSegments[0].p_offset)? sections : subSegments;
        pos = arr.shift().recompute(pos);
      }
    }
    this.p_filesz = this.p_memsz = pos - this.p_offset
    return this.p_offset + this.p_filesz;
  }
  /**
   * Adds a sub segment
   * @param phdr {PHdr}
   * @returns load {PHdr} Topmost segment parent added to
   */
  addSegment(phdr) {
    let pos = this.p_offset + this.p_filesz;
    let chk = this.N==64?1n:1;
    if(phdr.p_align > chk) {
      while(pos%phdr.p_align)
        pos++;
    }
    phdr.p_offset = phdr.p_paddr = phdr.p_vaddr = pos;
    pos += phdr.p_filesz;
    let size = pos - this.p_offset;
    if(size > this.p_memsz)
      this.p_memsz = size;
    if(size > this.p_filesz)
      this.p_filesz = size;
    this.subSegments.push(phdr);
    phdr.parentSegment = this;
    if(!this.parentSegment)
      return this;
    let load = this.parentSegment
    while(1) {
      if(load.parentSegment)
        load = load.parentSegment;
      else
        return load;
    }
  }
  /**
   * Adds a section to the segment
   * @param shdr {SHdr}
   * @returns load {PHdr} Topmost segment parent added to
   */
  addSection(shdr) {
    let pos = this.p_offset + this.p_filesz;
    let chk = this.N==64?1n:1;
    if(shdr.sh_addralign > chk) {
      while(pos%shdr.sh_addralign)
        pos++;
    }
    shdr.sh_offset = shdr.sh_addr = pos;
    this.p_memsz = (pos+shdr.sh_size) - this.p_offset;
    if(shdr.sh_type != SHT.NOBITS)
      this.p_filesz = this.p_memsz;
    shdr.segment = this;
    this.sections.push(shdr);
    if(!this.parentSegment)
      return this;
    let load = this.parentSegment
    while(1) {
      if(load.parentSegment)
        load = load.parentSegment;
      else
        return load;
    }
  }
}

module.exports = PHdr;
