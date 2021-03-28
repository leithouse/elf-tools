const constants = require('../constants'),
   MipsAbiFlags = require('../mips-abi-flags'),
            Elf = require('../elf');

/**
 * @param [opt.abiFlags] {JSON} Parameters for MipsAbiFlags
 */
const MIPS = (opt) => {
  let elf = Elf.mkSkeleton({
    e_ident: { ei_class: constants.ELFCLASS['32'] },
    e_machine: constants.EM.MIPS
  });
  let {N,LE} = elf;
  //elf.addSection({
  //  name:'.MIPS.abiflags',
  //  sh_type: constants.SHT.MIPS_ABIFLAGS,
  //  data: (new MipsAbiFlags({N,LE})).buffer
  //});
  return elf;
}

module.exports = MIPS;
