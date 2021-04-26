const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
            Elf = require('../elf');

const genVersion = async (outDir='.') => {
  let elf = new Elf();
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({name:'foobar'});
  elf.addSection({
    segment:'load',
    sh_type:constants.SHT.GNU_verdef,
    sh_info:0x8,
    data:Buffer.alloc(0x20,'A')
  });
  let ls = await Elf.mkFromFile('/bin/ls');
  let versym = ls.shdr.lookup('.gnu.version');
  let verneed = ls.shdr.lookup('.gnu.version_r');
  elf.shdr.push(versym);
  elf.shdr.push(verneed);
  verneed.sh_link = elf.shdr.indexOf(versym);
  versym.sh_link = elf.shdr.indexOf(sym);
  elf.phdr.addSection({shdr:versym});
  elf.phdr.addSection({shdr:verneed});
  let tags = [
    { d_tag:constants.DT.VERNEED,    d_un: elf.shdr.indexOf(verneed) },
    { d_tag:constants.DT.VERDEF,    d_un: elf.shdr.indexOf(verneed) }
  ];
  elf.addDynSection({tags});
  elf.recompute();
  await elf.writeToFile(require('path').join(outDir,'ver'));
  return elf;
}

module.exports = genVersion;
