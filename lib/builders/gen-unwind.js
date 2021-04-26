const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
            Elf = require('../elf'),
           path = require('path');


let flags = '';
for(let i=0;i<32;i++)
  flags += '1';
flags = parseInt(flags,2);

const genHppa = async (outDir='.') => {
  let hppa = new Elf({ehdr:{e_machine:constants.EM.PARISC}});
  await hppa.loadArchHeaderJson('hppa');
  let {sym} = hppa.shdr.addSymSection();
  let hpPT = hppa.addSegment({
    p_type:constants.PT.PARISC_UNWIND,
    parentSegment:'load'
  });
  let hpSHT = hppa.addSection({
    segment:hpPT,
    name:'.PARISC.unwind',
    sh_type:constants.SHT.PARISC_UNWIND,
    data: Buffer.alloc(0x80,'A')
  });
  let tags = [
    {d_tag:constants.DT.HP_DLD_FLAGS,d_un:flags},
  ]
  hppa.addDynSection({tags});
  hppa.recompute();
  await hppa.writeToFile(path.join(outDir,'hppa-unwind'));
  return hppa;
}

const genArm = async (outDir='.') => {
  let arm = new Elf({ehdr:{e_machine:constants.EM.ARM}});
  await arm.loadArchHeaderJson('arm');
  let {sym} = arm.shdr.addSymSection();
  let hpPT = arm.addSegment({
    p_type:constants.PT.PARISC_UNWIND,
    parentSegment:'load'
  });
  let hpSHT = arm.addSection({
    segment:hpPT,
    name:'.PARISC.unwind',
    sh_type:constants.SHT.ARM_EXIDX,
    data: Buffer.concat([
      Buffer.alloc(0x20),
      Buffer.from('deaddead','hex'),
      Buffer.from('deadbeef','hex'),
      Buffer.from('1002beef','hex')
    ])
  });
  let exPT = arm.addSegment({
    p_type:constants.PT.ARM_EXIDX,
    parentSegment:'load'
  });
  let exSHT = arm.addSection({
    segment:exPT,
    name:'.ARM.extab',
    sh_type:constants.SHT.ARM_EXIDX,
    data: Buffer.alloc(0x80,'A')
  });
  let reloc = arm.shdr.addRelocSection({
    name:'arm',
    applySection:'.PARISC.unwind',
    rels:[
      { r_offset:0xdead,     r_info:0xbeef },
      { r_offset:0xdeadbeef, r_info:0xdeadbeef },
    ]
  });
  arm.recompute();
  await arm.writeToFile(path.join(outDir,'arm-unwind'));
  return arm;
}

const genIA64 = async (outDir='.') => {
  let ia64 = new Elf({ehdr:{e_machine:constants.EM.IA_64}});
  await ia64.loadArchHeaderJson('ia64');
  let {sym} = ia64.shdr.addSymSection();
  let iaPT = ia64.addSegment({
    p_type:constants.PT.IA_64_UNWIND,
    parentSegment:'load'
  });
  let iaSHT = ia64.addSection({
    segment:iaPT,
    name:'.gnu.linkonce.ia64unw.',
    sh_type:constants.SHT.IA_64_UNWIND,
    data: Buffer.alloc(0x80,'A')
  });
  let iaInfoSHT = ia64.addSection({
    segment:iaPT,
    name:'.gnu.linkonce.ia64unwi.',
    sh_type:constants.SHT.IA_64_UNWIND,
    data: Buffer.alloc(0x20,'B')
  });
  let relSHdr = ia64.shdr.addRelocSection({
    name:'ia64',
    applySection:'.gnu.linkonce.ia64unw.',
  });
  ia64.phdr.addSection({
    segment:ia64.phdr.find(x=>x.p_type==constants.PT.LOAD),
    shdr:relSHdr
  });
  ia64.shdr.addRel({
    reloc:'.rela.ia64',
    r_type:0x5f,
    r_offset:0x10,
    sym: {
      name:'foobar',
      st_value:0xdeadbeef,
    }
  });
  let tags = [
    {d_tag:constants.DT.IA_64_VMS_LINKTIME, d_un:0xdeadbeef},
    {d_tag:constants.DT.IA_64_PLT_RESERVE,  d_un:0xdeadbeef},
    {d_tag:constants.DT.IA_64_VMS_LNKFLAGS,d_un:flags},
  ]
  ia64.addDynSection({tags});
  ia64.recompute();
  await ia64.writeToFile(path.join(outDir,'ia64-unwind'));
  return ia64;
}

module.exports = {
  genIA64,
  genHppa,
  genArm,
  all: async (outDir='.') => {
    await Promise.all([
      genIA64(outDir),
      genHppa(outDir),
      genArm(outDir)
    ]);
  }
}
