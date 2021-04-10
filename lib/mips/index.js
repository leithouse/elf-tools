const constants = require('./constants'),
            Elf = require('../elf'),
       MipsSHdr = require('./mips-shdr'),
       AbiFlags = require('./abi-flags');

const ehdrDefaults = (opt) => {
  if(!opt)
    opt = {};
  if(!opt.ehdr)
    opt.ehdr = {};
  if(!opt.ehdr.e_ident)
    opt.ehdr.e_ident = {};
  if(!opt.ehdr.e_ident.ei_class)
    opt.ehdr.e_ident.ei_class = constants.ELFCLASS[32];
  if(!opt.ehdr.e_machine)
    opt.ehdr.e_machine = constants.EM.MIPS;
  return opt;
}

class Mips extends Elf { 
  
  constructor(opt) {
    opt = ehdrDefaults(opt);
    opt.shdrClass = MipsSHdr;
    super(opt);
  }
  /**
   * Adds ABI flags
   * @param opt.flags {JSON} Parameters for MipsAbiFlags
   */
  addAbiFlags(opt) {
    if(!opt)
      opt = {};
    let {N,LE} = this;
    let {flags} = opt;
    if(!flags)
      flags = {};
    flags.N = N, flags.LE = LE;
    let abiFlags = new AbiFlags(flags);
    let i, iMax = this.phdr.length;
    for(i=0;i<iMax;i++) {
      if(this.phdr[i].p_type == constants.PT.LOAD)
        break;
    }
    let shdr = this.addSection({
      sh_type:constants.SHT.MIPS_ABIFLAGS,
      name:'.MIPS.abiflags',
      data:abiFlags.buffer
    });
    this.addSegment({
      p_type:constants.PT.MIPS_ABIFLAGS,
      parentSegment:i,
      shdr
    });
    return shdr;
  }
  /**
   * Add options
   * @param options {JSON[]} Params for MipsOptions.addOption
   * @returns {SHdr}
   */
  addOptions(options) {
    let {N,LE} = this;
    let i, iMax = this.phdr.length;
    for(i=0;i<iMax;i++) {
      if(this.phdr[i].p_type == constants.PT.LOAD)
        break;
    }
    let shdr = this.addSection({
      sh_type:constants.SHT.MIPS_OPTIONS,
      name:'.MIPS.options',
      data:Buffer.alloc(0)
    });
    if(options)
      options.forEach((option)=>shdr.options.addOption(option));
    this.addSegment({
      p_type:constants.PT.MIPS_OPTIONS,
      parentSegment:i,
      shdr
    });
    return shdr;
  }

}

module.exports = Mips;
