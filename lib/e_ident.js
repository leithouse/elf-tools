const assert = require('assert');
const {
  ELFCLASS,
  ELFDATA,
  EV,
  ELFOSABI,
  parseInput,
  stringifyConst
} = require('./constants');

const {struct2string} = require('./buff-utils');

class E_Ident {
  /**
   * @param opt.ei_class   {ELFCLASS}
   * @param opt.ei_data    {ELFDATA}
   * @param opt.ei_version {EV}
   * @param opt.ei_osabi   {ELFOSABI}
   * @param opt.ei_abiversion {Integer}
   */
  constructor(opt) {
    if(!opt)
      opt = {};
    this.structProps.forEach((prop)=>{
      let {key,dflt} = prop;
      if(opt[key] == undefined)
        this[key] = dflt;
      else
        this[key] = opt[key];
    });
  }
  /**
   * @type {ELFCLASS}
   * @readonly
   */
  get N() {
    if(this.ei_class == ELFCLASS['64'])
      return 64;
    if(this.ei_class == ELFCLASS['32'])
      return 32;
    else
      throw new Error('Not built to handle ELFCLASSNONE');
  }
  get LE() {
    if(this.ei_data == ELFDATA['2LSB'])
      return true;
    else if(this.ei_data == ELFDATA['2MSB'])
      return false;
    else
      throw new Error('Not built to handle to ELFDATANONE');
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    let size = 8;
    return [
      { key: 'ei_class', size, tdef:ELFCLASS,dflt:ELFCLASS['64'] },
      { key: 'ei_data', size, tdef:ELFDATA, dflt:ELFDATA['2LSB'] },
      { key: 'ei_version', size, tdef: EV, dflt: EV.CURRENT },
      { key: 'ei_osabi', size, tdef: ELFOSABI, dflt: ELFOSABI.LINUX },
      { key: 'ei_abiversion', size, dflt: 0 },
    ]
  } 
  /**
   * @type {Int8Array}
   * @readonly
   */
  get buffer() {
    let arr = [0x7f,0x45,0x4c,0x46];
    this.structProps.forEach((prop)=>{
      arr.push(this[prop.key]);
    });
    while(arr.length < 0x10)
      arr.push(0x0);
    return Uint8Array.from(arr);
  }
  /**
   * @returns {String}
   */
  toString() { return 'e_ident:{'+struct2string(this)+'}'; }
  /**
   * @param buff {Buffer}
   * @async
   * @static
   * @returns {E_Ident} this instance
   */
  buildFromBuffer(buff) {
    let slice = buff.slice(0,0x10);
    if(slice.length != 0x10)
      throw new Error('Unable to read EID');
    assert.equal(slice[0],0x7f);
    assert.equal(slice[1],0x45); // E
    assert.equal(slice[2],0x4c); // L
    assert.equal(slice[3],0x46); // F
    let idx = 4;
    this.structProps.forEach((prop)=>{
      this[prop.key] = slice[idx];
      idx++;
    });
    return this;
  } 
}

module.exports = E_Ident;
