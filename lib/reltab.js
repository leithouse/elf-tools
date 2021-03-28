const { SHT } = require('./constants');
const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');

class Rel {
  /**
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   * @param [opt.r_offset] {Integer|BigInt}
   * @param [opt.r_info]   {Integer|BigInt}
   * @param [opt.r_type]   {Integer}
   * @param [opt.r_sym]    {Integer}
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
    if(this.N==64) {
      this.r_offset = BigInt(this.r_offset);
      this.r_info = BigInt(this.r_info);
    }
    if(opt.r_type)
      this.r_type = opt.r_type;
    if(opt.r_sym)
      this.r_sym = opt.r_sym;
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    return [
      { key: 'r_offset', size: 0, dflt: 0 },
      { key: 'r_info',   size: 0, dflt: 0 },
    ]
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() { return struct2buff(this) }
  /**
   * @type {Integer}
   */
  get r_sym() { 
    let shift = this.N==64?32n:8;
    return this.r_info >> shift;
  }
  set r_sym(rs) {
    if(this.N==64)
      rs = BigInt(rs);
    let shift = this.N==64?32n:8;
    this.r_info = (rs<<shift)+this.r_type;
    if(this.N==64)
      this.r_info = BigInt(this.r_info);
  }
  /**
   * @type {Integer}
   * @readonly
   */
  get r_type() {
    let mask = this.N==64?0xffffffffn:0xff;
    return this.r_info & mask;
  }
  set r_type(rt) {
    if(this.N==64)
      rt = BigInt(rt);
    let mask = this.N==64?0xffffffffn:0xff;
    let shift = this.N==64?32n:8;
    this.r_info = (this.r_sym<<shift)+(rt&mask);
    if(this.N==64)
      this.r_info = BigInt(this.r_info);
  }
  /**
   * @returns {String}
   */
  toString() {
    let extra = `r_sym=0x${this.r_sym.toString(16)}, r_type=0x${this.r_type.toString(16)}`;
    return `Rel:{${struct2string(this)}, ${extra}}`;
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
}

class RelA extends Rel {
  constructor(opt) {
    super(opt);
    if(this.N==64)
      this.r_addend = BigInt(this.r_addend);
  }
  get structProps() {
    let props = super.structProps;
    props.push({key: 'r_addend', size: 0, dflt: 0 });
    return props;
  }
  toString() { 
    let ret = super.toString();
    return ret.replace(/Rel/,'Rela');
  }
}

class RelTab extends Array {
  /**
   * @param shdr {SHdr}
   */
  constructor(shdr) {
    super();
    ['N','LE','sh_entsize'].forEach((prop)=>{
      this[prop] = shdr[prop];
    });
    this.useA = shdr.sh_type == SHT.RELA;
    if(shdr.data)
      this.buildFromBuffer(shdr.data);
    if(shdr.rebuildData)
      this.rebuildSHdrData = shdr.rebuildData.bind(shdr);
  }
  /**
   * Newly allocated buffer
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let size = parseInt(this.sh_entsize)*this.length;
    let buff = Buffer.alloc(size);
    this.forEach((rel,i)=>rel.buffer.copy(buff,i*parseInt(this.sh_entsize)));
    return buff;
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Relocations:\n";
    this.forEach((reloc,i)=>{
      ret += ` [${i.toString().padStart(3)}] ${reloc}\n`;
    });
    return ret;
  }
  /**
   * @param buff {Buffer}
   * @returns {SymTab} This instance
   */
  buildFromBuffer(buff) {
    let end = buff.length;
    let size = parseInt(this.sh_entsize);
    if(end%size)
      throw new Error('Invalid RelTab size');
    let pos = 0;
    let Class = this.useA? RelA: Rel;
    while(pos < end) {
      let slice = buff.slice(pos,pos+size);
      this.push((new Class(this)).buildFromBuffer(slice));
      pos += size;
    }
    return this;
  }
  /**
   * Add a reloc entry
   * @param opt {JSON} Parameters for Rel or RelA
   * @returns {Rel|RelA}
   */
  addRel(opt) {
    let Class = this.useA? RelA: Rel;
    opt.N = this.N;
    opt.LE = this.LE;
    let rel = new Class(opt);
    this.push(rel);
    this.rebuildSHdrData();
    return rel;
  }
}

module.exports = RelTab;
