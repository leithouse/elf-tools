const { 
  DT,
  stringifyConst 
} = require('./constants');

const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');

class Dyn {
  /**
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   * @param [opt.d_tag] {Integer|BigInt}
   * @param [opt.d_un]  {Integer|BigInt}
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
      { key:'d_tag', size:0, dflt: DT.NULL, tdef: DT },
      { key:'d_un',  size:0, dflt: 0 }
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
    return `Dyn:{${struct2string(this)}}`; 
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

class DynTags extends Array {
  /**
   * @type {Prototype}
   * @readonly
   */
  static get Dyn() { return Dyn; }
  /**
   * @param shdr {SHdr}
   */
  constructor(shdr) {
    super();
    ['N','LE','sh_entsize'].forEach((prop)=>this[prop] = shdr[prop]);
    if(shdr.data)
      this.buildFromBuffer(shdr.data);
    if(shdr.rebuildData)
      this.rebuildSHdrData = shdr.rebuildData.bind(shdr);
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Dynamic Tags:\n";
    this.forEach((dyn,i)=>{
      ret += ` [${i.toString().padStart(3)}] ${dyn}\n`;
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
      throw new Error('Invalid _DYNAMIC size');
    let pos = 0;
    while(pos < end) {
      let slice = buff.slice(pos,pos+size);
      let dyn = (new Dyn(this)).buildFromBuffer(slice);
      this.push(dyn);
      if(dyn.d_tag == DT.NULL)
        break;
      pos += size;
    }
    return this;
  }
  /**
   * Adds a new dynamic tag
   * @param opt.d_tag {DT}
   * @param opt.d_un  {Integer|BigInt}
   * @returns Dyn
   */
  addDyn(opt) {
    if(!opt)
      opt = {};
    opt.N = this.N;
    opt.LE = this.LE;
    let dyn = new Dyn(opt);
    this.push(dyn);
    this.rebuildSHdrData();
  }
}

module.exports = DynTags;
