const EHdr = require('./ehdr'),
 SHdrTable = require('./shdr-table'),
 PHdrTable = require('./phdr-table'),
      SHdr = require('./shdr'),
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
   * Build basic elf skeleton
   * @param opt {Options} Options for EHdr
   * @returns {Elf}
   */
  static mkSkeleton(opt) {
    let elf = new Elf({ehdr:opt});
    let {ehdr,N} = elf;
    elf.shdr.push(new SHdr({ehdr}))
    let shstr = new SHdr({
      ehdr,
      sh_name:1,
      sh_type:constants.SHT.STRTAB,
      sh_addralign: N==64?1n:1,
      sh_size: '.shstrtab'.length+2
    });
    shstr.name = '.shstrtab';
    shstr.data = Buffer.from('\0.shstrtab\0');
    shstr.strTab = new StrTab(shstr);
    elf.shdr.e_shstrndx = 1;
    elf.shdr.push(shstr);
    let addr = constants.EI_NIDENT * 8;
    if(N==64)
      addr = BigInt(addr);
    let phdrSeg = elf.addSegment({
      p_type:   constants.PT.PHDR,
      p_flags:  0x4,
      p_offset: addr,
      p_vaddr:  addr,
      p_paddr:  addr,
      p_align:  N==64? 1n: 1
    });
    let load = elf.addSegment({
      p_type: constants.PT.LOAD,
      p_flags: 0x4,
      p_offset: 0x0,
      p_align:0x1000,
      data: elf.ehdr.buffer,
      setAddr: true,
    });
    load.subSegments.push(phdrSeg);
    load.p_offset = 0x0;
    phdrSeg.p_offset = addr;
    phdrSeg.parentSegment = load;
    elf.recompute();
    return elf;
  }
  /**
   * ehdr and buff are mutually exclusive
   * @param opt.ehdr {JSON} Passed directly to {EHdr}
   * @param opt.buff {Buffer} Build Elf from buffer
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
      this.shdr = new SHdrTable(this.ehdr);
      this.phdr = new PHdrTable(this.ehdr);
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
      if(typeof segment == 'number')
        segment = this.phdr[segment];
      if(!segment)
        throw new Error('Invalid segment');
      segment.sections.push(shdr);
      shdr.segment = segment;
    }
    this.recompute();
    if(opt.setAddr)
      shdr.sh_addr = shdr.sh_offset;
    return shdr;
  }
  /**
   * @uses {PHdrTable#addSegment}
   * @param  opt {JSON} All parameters for {PHdrTable#addSegment}
   * @param [opt.setAddr=false] {Boolean} Set p_vaddr = p_paddr = p_offset
   * @returns {PHdr}
   */
  addSegment(opt) {
    let phdr = this.phdr.addSegment(opt);
    this.recompute();
    if(opt.setAddr)
      phdr.p_paddr = phdr.p_vaddr = phdr.p_offset;
    return phdr;
  }
  /**
   * Calls recompute on EHdr, PHdrTable and SHdrTable
   */
  recompute() {
    let pos = this.phdr.recompute();
    this.shdr.recompute(pos);
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
