const EHdr = require('./ehdr'),
 SHdrTable = require('./shdr-table'),
 PHdrTable = require('./phdr-table'),
      SHdr = require('./shdr'),
      PHdr = require('./phdr'),
    StrTab = require('./strtab'),
 constants = require('./constants'),
       fsp = require('fs').promises;

class Elf {
  /**
   * Build ELF from file
   * @param fpath {String} Path to elf file
   * @async
   * @returns {Elf}
   */
  static async mkFromFile(fpath) {
    let handle = await fsp.open(fpath);
    let buff = await handle.readFile();
    await handle.close();
    let elf = new Elf({buff});
    elf.fromFile = fpath;
    return elf;
  }
  /**
   * ehdr and buff are mutually exclusive
   * @param opt.ehdr {JSON} Passed directly to {EHdr}
   * @param opt.buff {Buffer} Build Elf from buffer
   * @param opt.shdrClass {Prototype} Alternative SHdr class to use
   */
  constructor(opt) {
    if(!opt)
      opt = {};
    let {ehdr,buff} = opt;
    if(buff) {
      this.ehdr = (new EHdr()).buildFromBuffer(buff);
      this.phdr = (new PHdrTable(this.ehdr)).buildFromBuffer(buff);
      this.shdr = (new SHdrTable(this.ehdr)).buildFromBuffer(buff);
      this.phdr.mapSections(this.shdr);
    }
    else {
      this.ehdr = new EHdr(ehdr);
      this.shdr = SHdrTable.mkSkeleton(this.ehdr,opt.shdrClass);
      this.phdr = PHdrTable.mkSkeleton(this.ehdr);
    }
  }
  /**
   * Returns a newly allocated and populated buffer
   * @type {Buffer}
   * @readonly
   */
  get buffer() {
    let buff = Buffer.alloc(this.fullSize);
    this.ehdr.buffer.copy(buff);
    this.phdr.writeToBuffer(buff);
    this.shdr.writeToBuffer(buff);
    return buff;
  }
  /**
   * @type {Integer}
   * @readonly
   */
  get fullSize() {
    return  parseInt(this.ehdr.e_shoff)
          + parseInt(this.ehdr.e_shnum) * parseInt(this.ehdr.e_shentsize);
  }
  /**
   * @type {Integer} 32 or 64
   * @readonly
   */
  get N() { return this.ehdr.N }

  /**
   * @type {Boolean}
   * @readonly
   */
  get LE() { return this.ehdr.LE }
  /**
   * @returns {String}
   */
  toString() {
    let ret = 'ELF';
    if(this.fromFile)
      ret += `: from file ${this.fromFile}`;
    ret += `\n\n${this.ehdr}`;
    ret += '\n\n Program Segments:\n';
    let recurse = (phdr,depth=1)=> {
      let spacer = '';
      for(let i=0;i<depth;i++)
        spacer += '  ';
      ret += spacer+phdr+'\n';
      spacer += '  ';
      if(phdr.sections[0]) {
        ret += '\n'+spacer+'Segment Sections\n';
        phdr.sections.forEach((shdr)=>ret+=spacer+'  '+shdr+'\n');
      }
      if(phdr.subSegments[0]) {
        ret += '\n'+spacer+'Sub Segments:\n';
        phdr.subSegments.forEach((sub)=>recurse(sub,depth+2));
      }
      ret += '\n';
    }
    this.phdr.forEach((phdr)=>{
      if(!phdr.parentSegment)
        recurse(phdr);
    })
    let hasOrphan;
    this.shdr.forEach((shdr)=>{
      if(shdr.segment)
        return;
      if(!hasOrphan) {
        ret += ' Orphaned Sections:\n';
        hasOrphan = true;
      }
      ret += '  '+shdr+'\n';
    });
    //ret += `\n\n${this.shdr}`;
    return ret;
  }
  /**
   * Sorts addresses into a string
   */
  addressString() {
    let arr = [];
    this.shdr.forEach((hdr)=>{
      let start = hdr.sh_offset;
      let stop = hdr.sh_offset + hdr.sh_size;
      let {name,sh_type} = hdr;
      sh_type = constants.stringifyConst(sh_type,constants.SHT);
      name = 'Section - '+sh_type+' '+name;
      arr.push({name:'> '+name,addr:start});
      if(hdr.sh_type != constants.SHT.NOBITS)
        arr.push({name:'< '+name,addr:stop});
    });
    this.phdr.forEach((hdr)=>{
      let start = hdr.p_offset;
      let stop = hdr.p_offset + hdr.p_filesz;
      let {p_type} = hdr;
      p_type = constants.stringifyConst(p_type,constants.PT);
      let name = 'Segment - '+p_type;
      arr.push({name:'> '+name,addr:start});
      arr.push({name:'< '+name,addr:stop});
    });
    arr.sort((a,b)=>{
      let ret = a.addr-b.addr;
      if(ret == 0) {
        if(/> Segment/.test(a.name) && /> Section/.test(b.name))
          return -1;
        else if(/> Section/.test(a.name) && /> Segment/.test(b.name))
          return 1;
        else if(/< Segment/.test(a.name) && /< Section/.test(b.name))
          return 1;
        else if(/< Section/.test(a.name) && /< Segment/.test(b.name))
          return -1;
        else if(/^</.test(a.name) && /^>/.test(b.name))
          return -1;
        else if(/^>/.test(a.name) && /^</.test(b.name))
          return 1;
      }
      return ret;
    });
    let ret = 'ELF addresses:\n\n';
    let pad = this.fullSize.toString(16).length;
    arr.forEach((entry)=>ret+=` 0x${entry.addr.toString(16).padStart(pad,'0')} ${entry.name}\n`);
    return ret;
  }
  /**
   * @uses {SHdrTable#addSection}
   * @param  opt {JSON} All parameters for {SHdrTable#addSection}
   * @param [opt.setAddr=false] {Boolean} Set sh_addr = sh_offset
   * @param [opt.segment]       {PHdr} Segment to add section to
   * @param [opt.segment]       {Integer} Index of segment to add section to
   * @returns {SHdr}
   */
  addSection(opt) {
    let shdr = this.shdr.addSection(opt);
    let {segment} = opt;
    if(segment) {
      this.phdr.addSection({shdr,segment});
    }
    return shdr;
  }
  /**
   * @uses {PHdrTable#addSegment}
   * @param  opt {JSON} All parameters for {PHdrTable#addSegment}
   * @returns {PHdr}
   */
  addSegment(opt) {
    let phdr = this.phdr.addSegment(opt);
    return phdr;
  }
  /**
   * @param opt {JSON} Passed directly to SHdrTable.addDynSection
   */
  addDynSection(opt) {
    let preCnt = this.shdr.length;
    let {dyn,str} = this.shdr.addDynSection(opt);
    let i=0,iMax = this.phdr.length;
    for( ;i<iMax;i++) {
      if(this.phdr[i].p_type == constants.PT.LOAD)
        break;
    }
    let segment = this.phdr.addSegment({
      parentSegment:i,
      p_type:constants.PT.DYNAMIC,
      shdr:dyn
    });
    if(this.shdr.length - preCnt == 2) {
      this.phdr.addSection({
        segment:i,
        shdr:str
      });
    }
    this.recompute();
  }
  /**
   * Calls recompute on EHdr, PHdrTable and SHdrTable
   */
  recompute() {
    let pos = this.phdr.recompute();
    this.shdr.recompute(pos);
    this.shdr.updateDynTags();
  }
  /**
   * Writes ELF to file
   * @param fpath {String}
   * @async
   * @returns {String} file path
   */
  async writeToFile(fpath) {
    let handle = await fsp.open(fpath,'w',0o750);
    await handle.writeFile(this.buffer,{encoding:null,mode:0o750});
    await handle.close();
    return fpath;
  }
}

module.exports = Elf;
