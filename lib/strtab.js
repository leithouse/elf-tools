
class StrTab extends Array {
  /**
   * @param shdr {SHdr}
   */
  constructor(shdr) {
    super();
    if(!shdr.rebuildData)
      return;
    this.rebuildSHdrData = shdr.rebuildData.bind(shdr);
    if(shdr.data)
      this.buildFromBuffer(shdr.data);
  }
  /**
   * @type {Integer}
   * @readonly
   */
  get size() {
    let ret = 1; // starting \0
    this.forEach(str=>ret+=(str.length+1));
    return ret;
  }
  /**
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let buff = Buffer.alloc(this.size);
    buff.writeInt8(0,0);
    let pos = 1;
    this.forEach((str)=>{
      let tmp = Buffer.from(str);
      tmp.copy(buff,pos);
      pos += tmp.length;
      buff.writeInt8(0,pos);
      pos++;
    });
    return buff;
  }
  /**
   * Builds from buffer
   * @param buff {Buffer}
   * @returns {StrTab}
   */
  buildFromBuffer(buff) {
    if(buff.readInt8(0) != 0)
      throw new Error('Invalid STRTAB');
    let slice = buff.slice(1,buff.length-1);
    this.push(...slice.toString().split('\u0000'));
    return this;
  }
  /**
   * Retrieves string from id (i.e. sh_name, st_name)
   * @param sh_name {Integer}
   * @returns {String}
   */
  fromNameID(sh_name) {
    let i = 1;
    let iMax = this.size;
    let j = 0;
    while(i < iMax) {
      let cur = this[j];
      if(i == sh_name)
        return cur;
      i += cur.length+1;
      j++;
    }
  }
  /**
   * Add a string to the table
   * Triggers SHDr owner to rebuild its data buffer
   * @param str {String}
   * @returns {Integer} Index of added string
   */
  addString(str) {
    let ndx = this.size;
    this.push(str);
    this.rebuildSHdrData();
    return ndx;
  }
  /**
   * Remove a string to the table
   * Triggers SHDr owner to rebuild its data buffer
   * @param str {String}
   * @returns {Boolean}
   */
  rmString(str) {
    let idx = this.indexOf(str);
    if(idx == -1)
      return false;
    this.splice(idx,1);
    this.rebuildSHdrData();
    return true;
  }
}

module.exports = StrTab;
