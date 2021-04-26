const constants = require('../constants'),
 { struct2buff,
  sizeOfStruct} = require('../buff-utils'),
           Mips = require('../mips');

const genLibList = async (outDir='.') => {
  let elf = new Mips({});
  await elf.loadArchHeaderJson('mips');
  let lstruct = elf.archHeader.structs.Elf32_External_Lib;
  let {sym,str} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar'
  });
  let liblist = elf.addSection({
    segment:'load',
    sh_type:constants.SHT.GNU_LIBLIST,
    name:'.liblist',
    sh_link:elf.shdr.indexOf(str),
    sh_entsize:sizeOfStruct({props:lstruct}),
    data:Buffer.alloc(0x20,'A')
  });

  let optionParams = [];
  for(let i=1;i<11;i++)
    optionParams.push({kind:i});
  optionParams[0].size = 0x10;
  let options = elf.addOptions(optionParams);
  
  let conflict = elf.addSection({
    segment:'load',
    sh_type:constants.SHT.MIPS_CONFLICT,
    name:'.mips.conflict',
    data:Buffer.from('01000000000000','hex')
  })

  let stridx = str.strTab.addString('blah');
  let flags = '';
  for(let i=0;i<32;i++)
    flags += '1';
  flags = parseInt(flags,2);
  let tags = [
    { d_tag:constants.DT.MIPS_FLAGS,      d_un:flags },
    { d_tag:constants.DT.MIPS_TIME_STAMP, d_un:0xdeadbeef },
    { d_tag:constants.DT.MIPS_IVERSION,   d_un:stridx },
    { d_tag:constants.DT.MIPS_LIBLIST,	  d_un:0xdeadbeef },
    { d_tag:constants.DT.MIPS_LIBLISTNO,  d_un:0x10 },
    { d_tag:constants.DT.MIPS_OPTIONS,    d_un:0xdeadbeef },
    { d_tag:constants.DT.MIPS_CONFLICT,   d_un:0xdeadbeef },
    { d_tag:constants.DT.MIPS_CONFLICTNO, d_un:0x2 },
    { d_tag:constants.DT.PLTGOT,          d_un:0xdeadbeef },
    { d_tag:constants.DT.MIPS_LOCAL_GOTNO,d_un:0x2 },
    { d_tag:constants.DT.MIPS_GOTSYM,     d_un:0x2 },
    { d_tag:constants.DT.MIPS_SYMTABNO,   d_un:0x2 },
    { d_tag:constants.DT.MIPS_PLTRELSZ,   d_un:0x2 },
    { d_tag:constants.DT.MIPS_JMPREL,     d_un:0x2 },
    { d_tag:constants.DT.MIPS_PLTREL,     d_un:0x2 },
  ];
  elf.addDynSection({tags});
  elf.recompute();
  let dyn = elf.shdr.lookup('.dynamic');
  dyn.dynTags.find(dt=>dt.d_tag==constants.DT.MIPS_LIBLIST).d_un=liblist.sh_offset;
  dyn.dynTags.find(dt=>dt.d_tag==constants.DT.MIPS_OPTIONS).d_un=options.sh_offset;
  dyn.dynTags.find(dt=>dt.d_tag==constants.DT.MIPS_CONFLICT).d_un=conflict.sh_offset;
  dyn.rebuildData();
  await elf.writeToFile(require('path').join(outDir,'liblist'));
  return elf;
}

module.exports = genLibList;
