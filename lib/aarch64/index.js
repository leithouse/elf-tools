const constants = require('../constants'),
            Elf = require('../elf');

const ehdrDefaults = (opt) => {
  if(!opt)
    opt = {};
  if(!opt.ehdr)
    opt.ehdr = {};
  if(!opt.ehdr.e_ident)
    opt.ehdr.e_ident = {};
  if(!opt.ehdr.e_ident.ei_class)
    opt.ehdr.e_ident.ei_class = constants.ELFCLASS[64];
  if(!opt.ehdr.e_machine)
    opt.ehdr.e_machine = constants.EM.AARCH64;
  return opt;
}

class Aarch64 extends Elf { 
  
  constructor(opt) {
    opt = ehdrDefaults(opt);
    super(opt);
  }
  get jsonPath() { return __dirname+'/header.json' }
}

module.exports = Aarch64;
