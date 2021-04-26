const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
            Elf = require('../elf');

const genDynamic = async (outDir='.') => {
  let elf = new Elf();
  let {sym} = elf.shdr.addSymSection();
  elf.shdr.addSymbol({
    name:'foobar',
    st_shndx:0x1
  });
  // hash
  let hashBuckets = struct2buff({
    props: [
      { key: 'ngnubuckets', size: 32, val: 0x1 },
      { key: 'nchain',      size: 32, val: 0x1 },
    ],
    N:elf.N,
    LE:elf.LE
  });
  hashBuckets = Buffer.concat([hashBuckets,Buffer.alloc(0x20,'A')]);
  let hash = elf.addSection({
    segment:'load',
    name:'.hash',
    sh_type:constants.SHT.HASH,
    data:hashBuckets
  });
  let ls = await Elf.mkFromFile('/bin/ls');
  let ghashBuckets = ls.shdr.lookup('.gnu.hash').data;
  //let ghashBuckets = struct2buff({
  //  props: [
  //    { key: 'nbuckets',    size: 32, val: 0x1 },
  //    { key: 'symoffset',   size: 32, val: 0x1 },
  //    //{ key: 'bloom_size',  size: 32, val: 0x0 },
  //    //{ key: 'bloom_shift', size: 32, val: 0x0 },
  //    //{ key: 'bloom',       size: 64, val: 0x0 },
  //    //{ key: 'buckets',     size: 32, val: 0xdeadbeef },
  //    //{ key: 'chain',       size: 32, val: 0xdeadbeef }
  //  ],
  //  N:elf.N,
  //  LE:elf.LE
  //});
  //ghashBuckets = Buffer.concat([ghashBuckets,Buffer.alloc(0x100,'A')]);
  let ghash = elf.addSection({
    segment:'load',
    name:'.gnu.hash',
    sh_type:constants.SHT.GNU_HASH,
    data:ghashBuckets
  });

  // tags
  let flags = '';
  for(let i=0;i<32;i++)
    flags += '1';
  flags = parseInt(flags,2);
  let tags = [
    { d_tag:constants.DT.NEEDED,    name:'f' },
    { d_tag:constants.DT.SONAME,    name:'o' },
    { d_tag:constants.DT.RPATH,     name:'o' },
    { d_tag:constants.DT.RUNPATH,   name:'b' },
    { d_tag:constants.DT.AUXILIARY, name:'a' },
    { d_tag:constants.DT.FILTER,    name:'r' },
    { d_tag:constants.DT.CONFIG,    name:'l' },
    { d_tag:constants.DT.DEPAUDIT,  name:'i' },
    { d_tag:constants.DT.AUDIT,     name:'f' },
    { d_tag:constants.DT.USED,      name:'e' },
    { d_tag:constants.DT.GNU_PRELINKED, d_un: Date.now() },
    { d_tag:constants.DT.FLAGS,       d_un: flags },
    { d_tag:constants.DT.FLAGS_1,     d_un: flags },
    { d_tag:constants.DT.GNU_FLAGS_1, d_un: flags },
    { d_tag:constants.DT.POSFLAG_1,   d_un: flags },
    { d_tag:constants.DT.FEATURE,     d_un: flags },
    { d_tag:constants.DT.PLTREL,      d_un: 0xdeadbeef },
    { d_tag:constants.DT.VERDEFNUM,   d_un: 0xdeadbeef },
    { d_tag:constants.DT.VERSYM,      d_un: 0x1 },
    { d_tag:constants.DT.VERNEED,     d_un: 0x2 },
    { d_tag:constants.DT.SYMINENT,    d_un: 0x4 },
    { d_tag:constants.DT.SYMINSZ,     d_un: 0x4 },
    { d_tag:constants.DT.SYMINFO,     d_un: 0x8 },
    { d_tag:constants.DT.SYMTAB,      d_un: elf.shdr.indexOf(sym) },
    { d_tag:constants.DT.SYMENT,      d_un: sym.sh_entsize },
    { d_tag:constants.DT.GNU_HASH,    d_un: elf.shdr.indexOf(hash) },
    { d_tag:constants.DT.HASH,        d_un: elf.shdr.indexOf(hash) },
  ];
  elf.addDynSection({tags});
  let relTab = elf.shdr.addRelocSection({
    name:'plt',
    rels:[]
  });
  elf.phdr.addSection({
    segment:elf.phdr.find(x=>x.p_type==constants.PT.LOAD),
    shdr:relTab
  });

  // Fixup tags
  elf.recompute();
  let {dynTags} = elf.shdr.lookup('.dynamic');
  dynTags.find(dt=>dt.d_tag==constants.DT.HASH).d_un = hash.sh_offset;
  dynTags.find(dt=>dt.d_tag==constants.DT.GNU_HASH).d_un = ghash.sh_offset;
  dynTags.find(dt=>dt.d_tag==constants.DT.VERSYM).d_un = ghash.sh_offset;
  elf.shdr.lookup('.dynamic').rebuildData();

  await elf.writeToFile(require('path').join(outDir,'dyn'));
  return elf;
}

module.exports = genDynamic;
