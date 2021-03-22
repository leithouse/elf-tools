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
   * @returns {String}
   */
  toString() { 
    return `Rel:{${struct2string(this)}}`;
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
  get structProps() {
    let props = super.structProps;
    props.push({key: 'r_addend', size: 0, dflt: 0 });
    return props;
  }
  toString() { 
    return `Rela:{${struct2string(this)}}`;
  }
}

class RelTab {
  /**
   * @param shdr {SHdr}
   */
  constructor(shdr) {
    ['N','LE','sh_entsize'].forEach((prop)=>{
      this[prop] = shdr[prop];
    });
    this.useA = shdr.sh_type == SHT.RELA;
    this.table = [];
    if(shdr.data)
      this.buildFromBuffer(shdr.data);
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Relocations:\n";
    this.table.forEach((reloc,i)=>{
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
      this.table.push((new Class(this)).buildFromBuffer(slice));
      pos += size;
    }
    return this;
  }
}

module.exports = RelTab;
