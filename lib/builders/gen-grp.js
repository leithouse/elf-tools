const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
           path = require('path'),
            Elf = require('../elf');

const genGrp = async (outDir='.') => {
  let elf = new Elf();
  let {sym} = elf.shdr.addSymSection({type:'.symtab'});
  elf.addSection({
    segment:'load',
    sh_type:constants.SHT.GROUP,
    sh_link:elf.shdr.indexOf(sym),
    sh_entsize:0x4,
    name:'.group',
    data:Buffer.alloc(0x10)
  });
  elf.addInterp('foobar');
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sht-group'));
  return elf;
}

module.exports = genGrp;
