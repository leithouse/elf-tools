const { 
  STT, STB, STV, SHN, 
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
   * @param [opt.st_info]   {Integer}
   * @param [opt.st_other]  {Char}
   * @param [opt.st_shndx]  {Integer}
   * @param [opt.st_type]   {STT}
   * @param [opt.st_bind]   {STB}
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
    if(opt.st_type)
      this.st_type = opt.st_type;
    if(opt.st_bind)
      this.st_bind = opt.st_bind;
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
        { key:'st_other', size: 8, dflt: STV.DEFAULT, tdef: STV },
        { key:'st_shndx',size:16,  dflt: SHN.UNDEF,   tdef: SHN }
      ];
    }
    else {
      return [ 
        { key:'st_name',  size:32, dflt: 0 },
        { key:'st_info',  size: 8, dflt: 0 },
        { key:'st_other', size: 8, dflt: STV.DEFAULT, tdef: STV },
        { key:'st_shndx', size:16, dflt: SHN.UNDEF,   tdef: SHN },
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
   */
  get st_type() { return this.st_info&0xf; }
  set st_type(stt) {
    this.st_info = (this.st_bind<<4)+(stt&0xf);
  }
  /**
   * @type {STB}
   */
  get st_bind() { return this.st_info >> 4; }
  set st_bind(stb) {
    this.st_info = (stb<<4)+(this.st_type&0xf);
  }
  /**
   * @returns {String}
   */
  toString() { 
    let extra = `, st_type=${stringifyConst(this.st_type,STT)}`;
    extra += `, st_bind=${stringifyConst(this.st_bind,STB)}`;
    return `Sym:{name=${this.name}, ${struct2string(this)}${extra}}`; 
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
  /**
   * Adds a new symbol
   * @param [opt.st_name]   {Integer}
   * @param [opt.st_value]  {Integer|BigInt}
   * @param [opt.st_size]   {Integer|BigInt}
   * @param [opt.st_info]   {STT}
   * @param [opt.st_other]  {Char}
   * @param [opt.st_shndx]  {Integer}
   * @returns {Sym}
   */
  addSym(opt) {
    if(!opt)
      opt = {};
    opt.N = this.N;
    opt.LE = this.LE;
    let sym = new Sym(opt);
    this.push(sym);
    this.rebuildSHdrData();
    return sym;
  }
}

module.exports = SymTab;
