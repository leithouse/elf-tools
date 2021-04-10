const { 
  buff2struct,
  sizeOfStruct,
  struct2buff, 
  struct2string
} = require('../buff-utils');

class MipsOption {
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
      { key: 'kind',      size:  8, dflt: 0 },
      { key: 'size',      size:  8, dflt: 8 },
      { key: 'section',   size: 16, dflt: 0 },
      { key: 'info',      size: 32, dflt: 0 }
    ];
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() { 
    let buff = struct2buff(this);
    if(this.data)
      buff = Buffer.concat([buff,this.data]);
    return buff;
  }
  /**
   * @returns {String}
   */
  toString() { 
    return `MipsOption:{${struct2string(this)}}`;
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

class MipsOptions extends Array {
  /**
   * @param shdr {SHdr}
   */
  constructor(shdr) {
    super();
    if(!shdr.rebuildData)
      return;
    this.N = shdr.N;
    this.LE = shdr.LE;
    this.rebuildSHdrData = shdr.rebuildData.bind(shdr);
    if(shdr.data)
      this.buildFromBuffer(shdr.data);
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let buff = Buffer.alloc(0);
    this.forEach((option)=>{
      buff = Buffer.concat([buff,option.buffer]);
    });
    return buff;
  }
  /**
   * Builds from buffer
   * @param buff {Buffer}
   * @returns {MipsOptions}
   */
  buildFromBuffer(buff) {
    let len = buff.length;
    let {N,LE} = this;
    let pos = 0;
    while(pos < len) {
      let option = new MipsOption({N,LE,data:buff.slice(pos,pos+8)});
      pos += 8;
      if(option.size > 8) {
        let sz = option.size - 8;
        option.data = Buffer.alloc(sz);
        buff.copy(option.data,0,pos,sz);
      }
      this.push(option);
    }
    return this;
  }
  /**
   * Add a string to the table
   * Triggers SHDr owner to rebuild its data buffer
   * @param  opt.kind    {Char}
   * @param  opt.section {Integer}
   * @param  opt.info    {Info}
   * @param [opt.data]   {Buffer}
   * @returns {MipsOption}
   */
  addOption(opt) {
    let {size,kind,section,info,data} = opt;
    if(data)
      size = 8 + data.length;
    else
      size = 8;
    let option = new MipsOption({N:this.N,LE:this.LE,kind,size,section,info});
    option.data = data;
    this.push(option);
    this.rebuildSHdrData();
    return option;
  }
}

module.exports = MipsOptions;
