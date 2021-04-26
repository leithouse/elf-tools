const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
            Elf = require('../elf'),
           path = require('path');

const genRela = async (outDir='.') => {
  let elf = new Elf({ehdr:{e_type:constants.ET.REL}});
  let segment = elf.addSegment({
    parentSegment:'load',
    p_type:constants.PT.NOTE
  });
  let notes = [
    { name: 'GNU', n_type:constants.NT.GNU_ABI_TAG,
      desc: Buffer.alloc(0x40,'A')
    },
  ]
  let snotes = elf.shdr.addNotesSection({
    name:'foobar',
    notes
  });
  segment.addSection(snotes);
  let {sym} = elf.shdr.addSymSection();
  let tags = []
  elf.addDynSection({tags});
  let relTab = elf.shdr.addRelocSection({
    name:'plt',
    applySection:'.note.foobar',
    rels:[{r_info:0xdead, r_offset:0xbeef}]
  });
  elf.phdr.addSection({
    segment:elf.phdr.find(x=>x.p_type==constants.PT.LOAD),
    shdr:relTab
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'rela'));
  return elf;
}

const genRel = async (outDir='.') => {
  let elf = new Elf({ehdr:{e_type:constants.ET.REL}});
  let segment = elf.addSegment({
    parentSegment:'load',
    p_type:constants.PT.NOTE
  });
  let notes = [
    { name: 'GNU', n_type:constants.NT.GNU_ABI_TAG,
      desc: Buffer.alloc(0x40,'A')
    },
  ]
  let snotes = elf.shdr.addNotesSection({
    name:'foobar',
    notes
  });
  segment.addSection(snotes);
  let {sym} = elf.shdr.addSymSection();
  let tags = []
  elf.addDynSection({tags});
  let relTab = elf.shdr.addRelocSection({
    name:'plt',
    applySection:'.note.foobar',
    rels:[{r_info:0xdead, r_offset:0xbeef}],
    noAddend:true
  });
  elf.phdr.addSection({
    segment:elf.phdr.find(x=>x.p_type==constants.PT.LOAD),
    shdr:relTab
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'rel'));
  return elf;
}


module.exports = {
  genRel,
  genRela,
  all: async (outDir) => Promise.all([
    genRel(outDir),
    genRela(outDir)
  ])
};
