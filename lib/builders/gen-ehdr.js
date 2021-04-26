const {EM,ELFCLASS,ELFOSABI} = require('../constants'),
       fsp = require('fs').promises;

const genEhdr = (header) => {
  let e_machine, bits, ei_osabi;
  switch(header) {
    case 'aarch64': e_machine = EM.AARCH64; bits = 64; break;
    case 'alpha': e_machine = EM.ALPHA; bits = 64; break;
    case 'arc':  e_machine = EM.ARC_COMPACT; bits = 64; break;
    case 'arm':  
      e_machine = EM.ARM; 
      bits = 32; 
      ei_osabi = ELFOSABI.ARM;
      break;
    case 'csky':
      e_machine = EM.CSKY;
      bits=32;
      break;
    case 'hppa': 
      e_machine = EM.PARISC; 
      bits = 32; 
      ei_osabi = ELFOSABI.HPUX;
      break;
    case 'ia64': 
      e_machine = EM.IA_64; 
      bits = 64; 
      ei_osabi = ELFOSABI.HPUX;
      break;
    case 'mips': e_machine = EM.MIPS; bits = 32; break;
    case 'msp430': e_machine = EM.MSP430; bits = 32; break;
    case 'nfp': e_machine = EM.NFP; bits = 32; break;
    case 'nios2': e_machine = EM.ALTERA_NIOS2; bits = 32; break;
    case 'ppc': e_machine = EM.PPC32; bits = 32; break;
    case 'ppc64': e_machine = EM.PPC64; bits = 64; break;
    case 'riscv': e_machine = EM.RISCV; bits = 32; break;
    case 'score': e_machine = EM.SCORE; bits = 64; break;
    case 'sparc': e_machine = EM.SPARCV9; bits = 64; break;
    case 'tic6x': e_machine = EM.TI_C6000; bits = 32; break;
    case 'v850': e_machine = EM.V850; bits=32; break;
    case 'vxworks': e_machine = EM.SVX; bits=64; break;
    case 'x86-64': e_machine = EM.X86_64; bits=64; break;
    case 'xtensa': e_machine = EM.XTENSA; bits=64; break;
    default: return null;
  }
  return { 
    e_ident: { ei_class: ELFCLASS[bits], ei_osabi },
    e_machine
  }
}

module.exports = genEhdr;
