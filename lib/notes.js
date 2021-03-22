const { 
  NT,
  stringifyConst 
} = require('./constants');

const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');

class Note {
  /**
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   * @param [opt.n_namesz] {Integer|BigInt}
   * @param [opt.n_descz]  {Integer|BigInt}
   * @param [opt.n_type]   {Integer|BigInt}
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
      { key:'n_namesz', size:32, dflt: 0 },
      { key:'n_descsz', size:32, dflt: 0 },
      { key:'n_type',   size:32, dflt: 0, tdef: NT }
    ]
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() { return Buffer.concat([struct2buff(this),this.name,this.desc]) }
  /**
   * Size of struct + note data
   * @type {Integer|BigInt}
   * @readonly
   */
  get fullSize() {
    let size = sizeOfStruct(this);
    size += this.n_namesz;
    size += this.n_descsz;
    return size;
  }
  /**
   * @returns {String}
   */
  toString() { 
    return `Note:{${struct2string(this)},name=${this.name}]`;
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
    let pos = sizeOfStruct(this);
    this.name = buff.slice(pos,pos+this.n_namesz-1).toString();
    pos += this.n_namesz;
    this.desc = buff.slice(pos,pos+this.n_descsz);
    return this;
  }
}

class Notes extends Array {
  /**
   * @type {Prototype}
   * @readonly
   */
  static get Note() { return Dyn; }
  /**
   * @param shdr {SHdr}
   */
  constructor(shdr) {
    super();
    ['N','LE'].forEach((prop)=>this[prop] = shdr[prop]);
    if(shdr.data)
      this.buildFromBuffer(shdr.data);
  }
  /**
   * @returns {String}
   */
  toString() {
    let ret = "Notes:\n";
    this.forEach((note,i)=>{
      ret += ` [${i.toString().padStart(3)}] ${note}\n`;
    });
    return ret;
  }
  /**
   * @param buff {Buffer}
   * @returns {SymTab} This instance
   */
  buildFromBuffer(buff) {
    let end = buff.length;
    let pos = 0;
    while(pos < end) {
      let slice = buff.slice(pos);
      let note = (new Note(this)).buildFromBuffer(slice);
      this.push(note);
      pos += parseInt(note.fullSize);
    }
    return this;
  }
}

module.exports = Notes;
