const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
            Elf = require('../elf'),
           path = require('path');


let flags = '';
for(let i=0;i<32;i++)
  flags += '1';
flags = parseInt(flags,2);

const genSolaris = async (outDir='.') => {
  let elf = new Elf({ehdr:{e_ident:{ei_osabi:constants.ELFOSABI.SOLARIS}}});
  await elf.loadArchHeaderJson('hppa');
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_other:4
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sym-solaris'));
  return elf;
}

const genIA64 = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{
      e_machine:constants.EM.IA_64,
      e_ident:{ei_osabi:constants.ELFOSABI.OPENVMS}
    }
  });
  await elf.loadArchHeaderJson('ia64');
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_other:0xff,
    st_info:0xff
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sym-ia64'));
  return elf;
}
const genAarch64 = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{
      e_machine:constants.EM.AARCH64,
    }
  });
  await elf.loadArchHeaderJson('aarch64');
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_other:0xff,
    st_info:0xff
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sym-aarch64'));
  return elf;
}
const genAlpha = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{
      e_machine:constants.EM.ALPHA,
    }
  });
  await elf.loadArchHeaderJson('alpha');
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_info:0xff,
    st_other:0xff,
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sym-alpha'));
  return elf;
}
const genPpc64 = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{
      e_machine:constants.EM.PPC64,
    }
  });
  await elf.loadArchHeaderJson('ppc64');
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_info:0xff,
    st_other:0xff,
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sym-ppc64'));
  return elf;
}
const genMips = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{
      e_machine:constants.EM.MIPS,
    }
  });
  await elf.loadArchHeaderJson('mips');
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_info:0xff,
    st_other:0xff,
  });
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'sym-mips'));
  return elf;
}

module.exports = {
  genSolaris,
  genIA64,
  genAarch64,
  genAlpha,
  genPpc64,
  genMips,
  all: async (outDir) => Promise.all([
    genSolaris(outDir),
    genIA64(outDir),
    genAarch64(outDir),
    genAlpha(outDir),
    genPpc64(outDir),
    genMips(outDir)
  ])
}
