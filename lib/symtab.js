const { 
  STT, STB, STV, 
  stringifyConst 
} = require('./constants');

const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');

class Sym {
  /**
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   * @param [opt.st_name]   {Integer}
   * @param [opt.st_value]  {Integer|BigInt}
   * @param [opt.st_size]   {Integer|BigInt}
   * @param [opt.st_info]   {STT}
   * @param [opt.st_other]  {Char}
   * @param [opt.st_shndx]  {Integer}
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
    if(this.N == 32) {
      return [ 
        { key:'st_name',  size:32, dflt: 0 },
        { key:'st_value', size:32, dflt: 0 },
        { key:'st_size',  size:32, dflt: 0 },
        { key:'st_info',  size: 8, dflt: 0 },
        { key:'st_other', size: 8, dflt: STV.DEFAULT, tdef: STV},
        { key:'st_shndx',size:16, dflt: 0 }
      ];
    }
    else {
      return [ 
        { key:'st_name',  size:32, dflt: 0 },
        { key:'st_info',  size: 8, dflt: 0 },
        { key:'st_other', size: 8, dflt: STV.DEFAULT, tdef: STV},
        { key:'st_shndx',size:16, dflt: 0 },
        { key:'st_value', size:64, dflt: 0 },
        { key:'st_size',  size:64, dflt: 0 },
      ];
    }
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() { return struct2buff(this) }
  /**
   * @type {STT}
   * @readonly
   */
  get st_type() { return this.st_info&0xf; }
  /**
   * @type {STB}
   * @readonly
   */
  get st_bind() { return this.st_info >> 4; }
  /**
   * @returns {String}
   */
  toString() { 
    let extra = `,st_type=${stringifyConst(this.st_type,STT)}`;
    extra += `,st_bind=${stringifyConst(this.st_bind,STB)}`;
    extra += `,name=${this.name}`;
    return `Sym:{${struct2string(this)}${extra}}`; 
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

class SymTab extends Array {
  /**
   * @type {Prototype}
   * @readonly
   */
  static get Sym() { return Sym; }
  /**
   * @param  opt.N          {Integer}
   * @param  opt.LE         {Boolean}
   * @param  opt.sh_entsize {Integer} Size of symbols
   * @param [opt.buffer]    {Buffer} Build from buffer right away
   * @param [opt.data]      {Buffer} Alias for opt.buffer. Supercedes buffer
   */
  constructor(opt) {
    super();
    ['N','LE','sh_entsize'].forEach((prop)=>this[prop] = opt[prop]);
    if(opt.data)
      this.buildFromBuffer(opt.data);
    else if(opt.buffer)
      this.buildFromBuffer(opt.buffer);
  }
  /**
   * Newly allocated buffer
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let size = parseInt(this.sh_entsize)*this.length;
    let buff = Buffer.alloc(size);
    this.forEach((sym,i)=>sym.buffer.copy(buff,i*parseInt(this.sh_entsize)));
    return buff;
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Symbols:\n";
    this.forEach((sym,i)=>{
      ret += ` [${i.toString().padStart(3)}] ${sym}\n`;
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
      throw new Error('Invalid SymTab size');
    let pos = 0;
    while(pos < end) {
      let slice = buff.slice(pos,pos+size);
      this.push((new Sym(this)).buildFromBuffer(slice));
      pos += size;
    }
    return this;
  }
}

module.exports = SymTab;
