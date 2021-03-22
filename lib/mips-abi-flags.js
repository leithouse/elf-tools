const { 
  buff2struct,
  sizeOfStruct,
  struct2buff, 
  struct2string
} = require('./buff-utils');

class MipsAbiFlags {
  /**
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   */
  constructor(opt) {
    let {N,LE} = opt;
    this.N = N;
    this.LE = LE;
    this.sizeHasChanged = false;
    this.segment = null;
    if(opt.data)
      this.buildFromBuffer(opt.data);
    else {
      this.structProps.forEach((prop)=>{
        if(opt[prop.key] !== undefined)
          this[prop.key] = opt[prop.key];
        else
          this[prop.key] = prop.dflt;
      });
    }
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    return [
      { key: 'version',   size:16, dflt: 0 },
      { key: 'isa_level', size: 8, dflt: 1 },
      { key: 'isa_rev',   size: 8, dflt: 0 },
      { key: 'gpr_size',  size: 8, dflt: 8 },
      { key: 'cpr1_size', size: 8, dflt: 8 },
      { key: 'cpr2_size', size: 8, dflt: 8 },
      { key: 'fp_abi',    size: 8, dflt: 0 },
      { key: 'isa_ext',   size:32, dflt: 0 },
      { key: 'ases',      size:32, dflt: 0 },
      { key: 'flags1',    size:32, dflt: 0 },
      { key: 'flags2',    size:32, dflt: 0 },
    ];
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
    return `MipsAbiFlags:{${struct2string(this)}}`;
  }
  /**
   * Build from buff
   * @param buff {Buffer}
   * @async
   * @returns {SHdr} Reference to this instance
   */
  buildFromBuffer(buff) {
    let struct = buff2struct({buff,N:this.N,LE:this.LE,props:this.structProps});
    Object.assign(this,struct);
    return this;
  }
}

module.exports = MipsAbiFlags;
