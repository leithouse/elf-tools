const StrTab = require('./strtab'),
      SymTab = require('./symtab'),
      RelTab = require('./reltab'),
     DynTags = require('./dyn-tags'),
       Notes = require('./notes'),
MipsAbiFlags = require('./mips-abi-flags'),
       {SHT} = require('./constants');

const {
  buff2struct,
  sizeOfStruct,
  struct2buff,
  struct2string
} = require('./buff-utils');


/**
 * Other props
 * @prop sizeHasChanged {Boolean}
 */
class SHdr {
  /**
   * @param  opt.N {Integer}
   * @param  opt.LE {Boolean}
   * @param [opt.sh_name]         {Integer}
   * @param [opt.sh_type]         {SHT}
   * @param [opt.sh_flags=0]      {Integer}
   * @param [opt.sh_addr=0]       {Integer|BigInt}
   * @param [opt.sh_offset=0]     {Integer|BigInt}
   * @param [opt.sh_size=0]       {Integer|BigInt}
   * @param [opt.sh_link=0]       {Integer}
   * @param [opt.sh_info=0]       {Integer}
   * @param [opt.sh_addralign=0]  {Integer}
   * @param [opt.sh_entsize=0]    {Integer}
   */
  constructor(opt) {
    let {N,LE} = opt;
    this.N = N;
    this.LE = LE;
    this.sizeHasChanged = false;
    this.segment = null;

    this.structProps.forEach((prop)=>{
      if(opt[prop.key] !== undefined)
        this[prop.key] = opt[prop.key];
      else
        this[prop.key] = prop.dflt;
    });
    if(this.N==64) {
      ['flags','addr','offset','size','addralign','entsize'].forEach((p)=>{
        let prop = `sh_${p}`;
        this[prop] = BigInt(this[prop]);
      });
    }
  }
  /**
   * @type {StructProp[]}
   * @readonly
   */
  get structProps() {
    return [
      { key: 'sh_name',     size:32, dflt:0 },
      { key: 'sh_type',     size:32, dflt: SHT.NULL, tdef: SHT},
      { key: 'sh_flags',    size:0,  dflt: 0},
      { key: 'sh_addr',     size:0,  dflt: 0},
      { key: 'sh_offset',   size:0,  dflt: 0},
      { key: 'sh_size',     size:0,  dflt: 0},
      { key: 'sh_link',     size:32, dflt: 0},
      { key: 'sh_info',     size:32, dflt: 0},
      { key: 'sh_addralign',size:0,  dflt: 0},
      { key: 'sh_entsize',  size:0,  dflt: 0}
    ];
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
    return `SHdr:{name=${this.name}, ${struct2string(this)}}`;
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
  /**
   * Hexdump data
   * @returns {String}
   */
  dumpData() {
    if(!this.data)
      return null;
    let ret = '';
    let iMax = this.data.length;
    for(let i=0, j=0;i<iMax;i+=4,j++) {
      ret += this.data.slice(i,i+4).toString('hex');
      if(j==3) {
        ret += '\n';
        j=-1;
      }
      else
        ret += ' ';
    }
    return ret;
  }
  /**
   * Maybe creates data structure
   */
  handleData() {
    switch(this.sh_type) {
      
      case SHT.STRTAB: 
        this.strTab = new StrTab(this);
        break;
      
      case SHT.DYNSYM: // intentional fallthrough
      case SHT.SYMTAB: 
        this.symTab = new SymTab(this);
        break;
      
      case SHT.RELA: // intentional fallthrough
      case SHT.REL: 
        this.relTab = new RelTab(this);
        break;

      case SHT.DYNAMIC: 
        this.dynTags = new DynTags(this);
        break;
      
      case SHT.NOTE: 
        this.notes = new Notes(this);
        break;

      case SHT.MIPS_ABIFLAGS:
        this.abiFlags = new MipsAbiFlags(this);
        break;
    }
  }
  /**
   * Recalculate size
   */
  rebuildData() {
    let pre = this.sh_size;
    let subs = ['strTab','symTab','relTab','dynTags','notes'];
    let iMax = subs.length;
    for(let i=0;i<iMax;i++) {
      if(this[subs[i]]) {
        this.data = this[subs[i]].buffer;
        break;
      }
    }
    this.sh_size = this.data.length;
    if(this.N == 64)
      this.sh_size = BigInt(this.sh_size);
    if(this.sh_size != pre)
      this.sizeHasChanged = true;
    return this.sh_size;
  }

  /**
   * Recomputes addresses based on new starting position
   * 
   * Changes sh_offset
   * If sh_vaddr or sh_paddr exist, they will be incremented/decremented same amount as sh_offset
   *
   * @param [pos] {Integer|BigInt} Starting position. Default instance's sh_offset
   * @returns pos {Integer|BigInt} Position at end of recomputed section
   */
  recompute(pos) {
    if(pos === undefined)
      pos = this.sh_offset;
    let orig = this.sh_offset;
    this.sh_offset = pos;
    if(this.sh_type == SHT.NOBITS)
      return pos;
    if(this.sh_addralign > 0x1) {
      while(pos%this.sh_addralign)
	pos++;
      this.sh_offset = pos;
    }
    let delta = pos - orig;
    if(this.sh_addr)
      this.sh_addr += delta;
    this.sizeHasChanged = false;
    return this.sh_offset + this.sh_size;
  }
}

module.exports = SHdr;