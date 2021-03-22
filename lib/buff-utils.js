const {stringifyConst} = require('./constants');

const BufferPolyFill = {
  /**
   * @param offset {Integer}
   */
  readBigUInt64BE(offset) {
    let sub = this.slice(offset,offset+0x8);
    return BigInt('0x'+sub.toString('hex'));
  },
  /**
   * @param offset {Integer}
   */
  readBigUInt64LE(offset) {
    let sub = this.slice(offset,offset+0x8);
    sub.swap64();
    let ret = BigInt('0x'+sub.toString('hex'));
    sub.swap64();
    return ret;
  },
  /**
   * @param value {BigInt}
   * @param offset {Integer}
   */
  writeBigUInt64LE(value,offset) {
    let ret = this.write(value.toString(16).padStart(16,'0'),offset,0x8,'hex');
    let sub = this.slice(offset,offset+0x8);
    sub.swap64();
    return ret;
  },
  /**
   * @param value {BigInt}
   * @param offset {Integer}
   */
  writeBigUInt64BE(value,offset) {
    return this.write(value.toString(16).padStart(16,'0'),offset,0x8,'hex');
  }
}
const bufferPoly = (buff) => {
  for(let func in BufferPolyFill)
    buff[func] = BufferPolyFill[func].bind(buff);
}


/**
 * @typedef StructProp
 * @type {JSON}
 * @prop  size {Integer} 32,64,0. 0 = follow N
 * @prop  key  {String}
 * @prop [tdef] {Object} Typedef enumeration object
 * @prop [val] {Any}
 */

/**
 * @param opt.props {StructProp[]}
 * @param opt.N {Integer}
 * @param opt.LE {Boolean}
 * @param opt.buff {Buffer}
 * @returns {JSON}
 */
const buff2struct = (opt) => {
  let {props,N,LE,buff} = opt;
  let ret = {};
  let offset = 0;
  bufferPoly(buff);
  props.forEach((prop)=>{
    let {key,size} = prop;
    let propSize, noOrder, rdFunc = 'read';
    if(!size)
      size = N;
    switch(size) {
      case 8:
        rdFunc += 'UInt8';
        noOrder = true;
        propSize = 1;
        break;
      case 16:
        rdFunc += 'UInt16';
        propSize = 2;
        break;
      case 32:
        rdFunc += 'UInt32';
        propSize = 4;
        break;
      case 64:
        rdFunc += 'BigUInt64';
        propSize = 8;
        break;
    }
    if(!noOrder)
      rdFunc += LE?'LE':'BE';
    ret[key] = buff[rdFunc](offset);
    offset += propSize;
  });
  return ret;
}

/**
 * @param opt.props {StructProp[]}
 * @param opt.N {Integer}
 * @param opt.LE {Boolean}
 * @returns {JSON}
 */
const struct2buff = (opt) => {
  let {props,N,LE} = opt;
  let struct;
  if(!props) {
    props = opt.structProps;
    struct = opt;
  }
  let size = sizeOfStruct({props,N});
  let buff = Buffer.alloc(size);
  let offset = 0;
  bufferPoly(buff);
  props.forEach((prop)=>{
    let {key,size,val,dflt} = prop;
    if(val === undefined && struct)
      val = struct[key];
    let propSize, noOrder, wrFunc = 'write';
    if(!size)
      size = N;
    switch(size) {
      case 8:
        wrFunc += 'UInt8';
        noOrder = true;
        propSize = 1;
        break;
      case 16:
        wrFunc += 'UInt16';
        propSize = 2;
        break;
      case 32:
        wrFunc += 'UInt32';
        propSize = 4;
        break;
      case 64:
        wrFunc += 'BigUInt64';
        propSize = 8;
        break;
    }
    if(!noOrder)
      wrFunc += LE?'LE':'BE';
    if(val === undefined)
      val = dflt;
    buff[wrFunc](val,offset);
    offset += propSize;
  });
  return buff;
}
/**
 * @param opt.props {StructProp[]}
 * @param opt.N {Integer}
 * @returns {Integer}
 */
const sizeOfStruct = (opt) => {
  let {props,N} = opt;
  if(!props)
    props = opt.structProps;
  let size = 0;
  props.forEach((prop)=>{
    let propSize = prop.size || N;
    size += (propSize>>3);
  });
  return size;
}

/**
 * @param struct {Object} Object with structProps getter
 * @returns {String}
 */
const struct2string = (struct) => {
  let ret = '';
  if(!struct.structProps)
    throw new Error('struct2string: invalid struct param');
  struct.structProps.forEach((prop,i)=>{
    if(i)
      ret += ', ';
    ret += `${prop.key}=`;
    let val = struct[prop.key];
    if(prop.tdef)
      ret += stringifyConst(val,prop.tdef);
    else {
      if(typeof val == 'number' || typeof val == 'bigint')
        val = '0x'+val.toString(16);
      ret += val;
    }
  });
  return ret;
}

module.exports = {
  buff2struct,
  bufferPoly,
  sizeOfStruct,
  struct2buff,
  struct2string
}
