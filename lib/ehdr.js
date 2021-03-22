const E_Ident = require('./e_ident');
const {
  ET,
  EM,
  EV,
} = require('./constants');

const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');

class EHdr {
  /**
   * @param [opt.e_ident] {E_Ident}}
   * @param [opt.e_ident] {JSON} Parameters for new E_Ident
   * @param [opt.e_machine] {EM} Default x86-64
   * @param [opt.e_version] {EV} Default current
   * @param [opt.e_entry=0] {Integer|BigInt}
   * @param [opt.e_phoff=0] {Integer|BigInt}
   * @param [opt.e_shoff=0] {Integer|BigInt}
   * @param [opt.e_flags=0] {Integer}
   * @param [opt.e_phnum=0] {Integer}
   * @param [opt.e_shentsize=0] {Integer}
   * @param [opt.e_shnum=0] {Integer}
   * @param [opt.e_shstrndx=0] {Integer}
   */
  constructor(opt) {
    if(!opt)
      opt = {};
    if(!(opt.e_ident instanceof E_Ident))
      this.e_ident = new E_Ident(opt.e_ident);
    else
      this.e_ident = opt.e_ident;
    this.structProps.forEach((prop)=>{
      if(opt[prop.key] !== undefined)
        this[prop.key] = opt[prop.key];
      else
        this[prop.key] = prop.dflt;
    });
    if(this.N == 64) {
      this.e_phoff = BigInt(this.e_phoff);
      this.e_shoff = BigInt(this.e_shoff);
    }
  }
  /**
   * @type {E_Ident}
   */
  get e_ident() { return this._e_ident }
  set e_ident(ei) {
    this._e_ident = ei;
    if(ei instanceof E_Ident) {
      this.N = ei.N;
      this.LE = ei.LE;
    }
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    return [
      { key:'e_type',      size:16, tdef: ET, dflt: ET.DYN },
      { key:'e_machine',   size:16, tdef: EM, dflt: EM.X86_64 },
      { key:'e_version',   size:32, tdef: EV, dflt: EV.CURRENT },
      { key:'e_entry',     size:0,  dflt: 0x00 },
      { key:'e_phoff',     size:0,  dflt: 0x40 },
      { key:'e_shoff',     size:0,  dflt: 0x00 },
      { key:'e_flags',     size:32, dflt: 0x00 },
      { key:'e_ehsize',    size:16, dflt: 0x40 },
      { key:'e_phentsize', size:16, dflt: 0x38 },
      { key:'e_phnum',     size:16, dflt: 0x00 },
      { key:'e_shentsize', size:16, dflt: 0x40 },
      { key:'e_shnum',     size:16, dflt: 0x00 },
      { key:'e_shstrndx',  size:16, dflt: 0x00 },
    ]
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let props = this.structProps;
    props.forEach((prop)=>prop.val = this[prop.key]);
    let {N,LE} = this;
    return Buffer.concat([this.e_ident.buffer,struct2buff({props,N,LE})]);
  }
  /**
   * @returns {String}
   */
  toString() { return `EHdr:{${this.e_ident},${struct2string(this)}}`; }
  /**
   * Build from open FileHandle
   * @param handle {fs~FileHandle}
   * @async
   * @returns {EHdr} Reference to this instance
   */
  async buildFromHandle(handle) {
    let ei_buff = Buffer.alloc(0x10);
    await handle.read(ei_buff,0,0x10,null);
    let e_ident = new E_Ident();
    this.e_ident = e_ident.buildFromBuffer(ei_buff);
    let size = sizeOfStruct({props:this.structProps,N:this.N}); 
    let buff = Buffer.alloc(size);
    let {bytesRead} = await handle.read(buff,0,size,null);
    if(bytesRead != size)
      throw new Error('Unable to read ELF header');
    let struct = buff2struct({buff,N:this.N,LE:this.LE,props:this.structProps});
    Object.assign(this,struct);
    return this;
  }
  /**
   * Build from buffer
   * @param buff {Buffer}
   * @returns {EHdr} Reference to this instance
   */
  buildFromBuffer(buff) {
    let e_ident = new E_Ident();
    this.e_ident = e_ident.buildFromBuffer(buff);
    let size = sizeOfStruct({props:this.structProps,N:this.N}); 
    let eiLen = e_ident.buffer.length;
    let slice = buff.slice(eiLen,eiLen+size);
    if(slice.length != size)
      throw new Error('Unable to read ELF header');
    let struct = buff2struct({buff:slice,N:this.N,LE:this.LE,props:this.structProps});
    Object.assign(this,struct);
    return this;
  }
}

module.exports = EHdr;
