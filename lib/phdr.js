const E_Ident = require('./e_ident'),
         SHdr = require('./shdr');

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
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   * @param [opt.p_type]    {PT}
   * @param [opt.p_offset=0] {Integer|BigInt}
   * @param [opt.p_vaddr=0] {Integer|BigInt}
   * @param [opt.p_paddr=0] {Integer|BigInt}
   * @param [opt.p_filesz=0] {Integer}
   * @param [opt.p_memsz=0] {Integer}
   * @param [opt.p_flags=0] {Integer}
   * @param [opt.p_align=0] {Integer}
   */
  constructor(opt) {
    let {N,LE} = opt;
    this.N = N;
    this.LE = LE;
    this.structProps.forEach((prop)=>{
      if(opt[prop.key] !== undefined)
        this[prop.key] = opt[prop.key];
      else
        this[prop.key] = prop.dflt;
    });
    this.data = null;
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
  }
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
    let props = [ { key:'p_type',size:32, dflt: PT.NULL, tdef: PT } ];
    let flags = { key:'p_flags',size:32, dflt:0 };
    if(this.N == 64)
      props.push(flags);
    props.push(
      { key: 'p_offset', size: 0, dflt: 0 },
      { key: 'p_vaddr', size: 0, dflt: 0 },
      { key: 'p_paddr', size: 0, dflt: 0 },
      { key: 'p_filesz', size: 0, dflt: 0 },
      { key: 'p_memsz', size: 0, dflt: 0 },
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
   * Hexdump data
   * @returns {String}
   */
  dumpData() {
    if(!this.data)
      return null;
    let ret = '';
    let iMax = this.data.length;
    for(let i=0;i<iMax;i+=4) {
      ret += this.data.slice(i,i+4).toString('hex');
      if(!(i%0x10))
        ret += '\n';
      else
        ret += ' ';
    }
    return ret;
  }
  /**
   * Sort sections based on sh_offset
   * If sh_offset is 0, do nothing
   */
  sortSections() {
    this.sections.sort((a,b)=>{
      if(!b.sh_offset || !a.sh_offset)
        return 0;
      return a.sh_offset - b.sh_offset;
    });
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
    if(!this.p_offset && !this.p_filesz)
      return pos;
    if(!pos)
      pos = this.p_offset;
    if(this.p_type == PT.PHDR) {
      pos = 4*EI_NIDENT;
      if(this.N == 64)
        pos = BigInt(pos);
    }
    let orig = this.p_offset;
    if(this.p_align) {
      while(pos%this.p_align)
        pos++;
    }
    this.p_offset = pos;
    let members = [...this.subSegments,...this.sections]; // Sections & sub segments
    members.sort((a,b)=>{
      let aoff, boff;
      if(a instanceof SHdr)
        aoff = a.sh_offset;
      else
        aoff = a.p_offset;
      if(b instanceof SHdr)
        boff = b.sh_offset;
      else
        boff = b.p_offset;
      if(!boff || !aoff)
        return 0;
      return aoff - boff;
    });
    members.forEach((hdr)=>{
      pos = hdr.recompute(pos);
    });
    let minSize = pos - this.p_offset;
    if(this.p_filesz < minSize)
      this.p_filesz = minSize;
    let delta = this.p_offset - orig;
    if(this.p_vaddr)
      this.p_vaddr += delta;
    if(this.p_paddr)
      this.p_paddr += delta;
    return this.p_offset + this.p_filesz;
  }
}

module.exports = PHdr;
