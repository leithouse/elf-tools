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
   * @param [opt.n_namesz] {Integer}
   * @param [opt.n_descz]  {Integer}
   * @param [opt.n_type]   {Integer}
   * @param [opt.name]     {String}
   * @param [opt.desc]     {Buffer}
   * @param [opt.isVMS]    {Boolean}
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
    if(opt.name) {
      this.name = opt.name;
      this.n_namesz = opt.name.length+1;
    }
    if(opt.desc) {
      if(typeof opt.desc == 'string')
        opt.desc = Buffer.from(opt.desc+'\0');
      this.desc = opt.desc;
      this.n_descsz = opt.desc.length;
    }
    this.isVMS = !!opt.isVMS;
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    if(this.isVMS) {
      return [
        { key:'n_namesz', size:64, dflt: 8 },
        { key:'n_descsz', size:64, dflt: 8 },
        { key:'n_type',   size:64, dflt: 0, tdef: NT }
      ]
    }
    else {
      return [
        { key:'n_namesz', size:32, dflt: 0 },
        { key:'n_descsz', size:32, dflt: 0 },
        { key:'n_type',   size:32, dflt: 0, tdef: NT }
      ]
    }
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() { 
    let buff = Buffer.concat([struct2buff(this),Buffer.from(this.name+'\0')]);
    let spaceCnt = 0;
    let align = this.isVMS ? 8: 4;
    while( (buff.length+spaceCnt)%align)
      spaceCnt++;
    return Buffer.concat([buff,Buffer.alloc(spaceCnt),this.desc]);
  }
  /**
   * Size of struct + note data
   * @type {Integer|BigInt}
   * @readonly
   */
  get fullSize() {
    let size = sizeOfStruct(this);
    size += this.n_namesz;
    let align = this.isVMS ? 8: 4;
    while(size%align)
      size++;
    size += this.n_descsz;
    return size;
  }
  /**
   * @returns {String}
   */
  toString() { 
    return `Note:{${struct2string(this)}, name=${this.name}]`;
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
    if(shdr.rebuildData)
      this.rebuildSHdrData = shdr.rebuildData.bind(shdr);
  }
  /**
   * Newly allocated buffer
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let buff = Buffer.alloc(0);
    this.forEach((note)=>{
      let spaceCnt=0;
      while((buff.length+spaceCnt)%4)
        spaceCnt++;
      buff = Buffer.concat([buff,Buffer.alloc(spaceCnt),note.buffer]);
    });
    return buff;
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
  /**
   * Adds a new note
   * @param opt.n_type {NT}
   * @param opt.name   {String}
   * @param opt.desc   {Buffer}
   * @returns {Note}
   */
  addNote(opt) {
    if(!opt)
      opt = {};
    opt.N = this.N;
    opt.LE = this.LE;
    let note = new Note(opt);
    if(!opt.desc) {
      let sz = opt.n_descsz || 0;
      opt.desc = Buffer.alloc(sz);
    }
    this.push(note);
    this.rebuildSHdrData();
    return note;
  }
}

module.exports = Notes;
