const constants = require('../constants'),
 { struct2buff,
  sizeOfStruct} = require('../buff-utils'),
            Mips = require('../mips');

const genMipsAttributes = async (outDir='.') => {
  let elf = new Mips({ehdr:{e_machine:constants.EM.MIPS}});
  await elf.loadArchHeaderJson('mips');
  elf.addSection({
    segment:'load',
    sh_type:constants.SHT.GNU_ATTRIBUTES,
    data:(()=>{
      let b = Buffer.concat([
        Buffer.from('A'), // Magic val
        (()=>{
          let attr_len = Buffer.alloc(0x4);
          attr_len.writeUInt32LE(0x20);
          return attr_len;
        })(),
        Buffer.from('gnu\0'), // name
        Buffer.alloc(0x1,0x1),
        Buffer.alloc(0x1,0x1),
        Buffer.alloc(0x20,'B')
      ]);
      return b;
    })()
  });
  elf.addAbiFlags();
  elf.addSection({
    segment:'load',
    name:'.got',
    data:Buffer.alloc(0x20,'C')
  });
  elf.recompute();
  await elf.writeToFile(require('path').join(outDir,'mips-attributes'));
  return elf;
}
const genNds32Attributes = async (outDir='.') => {
  let elf = new Mips({ehdr:{e_machine:constants.EM.NDS32}});
  elf.addSection({
    segment:'load',
    sh_type:constants.SHT.GNU_ATTRIBUTES,
    name:'.nds32_e_flags',
    data:Buffer.from('0200','hex')
  });
  elf.recompute();
  await elf.writeToFile(require('path').join(outDir,'nds32-attributes'));
  return elf;
}

module.exports = {
  genNds32Attributes,
  genMipsAttributes,
  all: async (outDir) => {
    await Promise.all([
      genNds32Attributes(outDir),
      genMipsAttributes(outDir)
    ]);
  }
}
