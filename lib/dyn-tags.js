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
    let extra = '';
    if(this.name)
      extra = `, name=${this.name}`;
    return `Dyn:{${struct2string(this)}${extra}}`; 
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
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let size = parseInt(this.sh_entsize);
    let buff = Buffer.alloc(this.length*size);
    this.forEach((tag,i)=>tag.buffer.copy(buff,size*i));
    return buff;
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
    let nullTag = this.pop();
    this.push(dyn);
    if(!nullTag)
      nullTag = new Dyn({N:this.N,LE:this.LE});
    this.push(nullTag);
    this.rebuildSHdrData();
    return dyn;
  }
  /**
   * Updates an existing tag, or adds if it doesn't exit
   * @param opt.d_tag {DT}
   * @param opt.d_un  {Integer|BigInt}
   * @returns Dyn
   */
  updateOrAdd(opt) {
    let {d_tag,d_un} = opt;
    let dyn = this.find(x=>x.d_tag==d_tag);
    if(!dyn)
      return this.addDyn(opt);
    dyn.d_un = d_un;
    this.rebuildSHdrData();
    return dyn;
  }
}

module.exports = DynTags;
