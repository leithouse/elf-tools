#!/usr/bin/node
const {struct2buff} = require('../buff-utils'),
          constants = require('../constants'),
               path = require('path'),
               MIPS = require('../mips'), 
               objv = Object.values;

const main = async () => {
  let elf = new MIPS();
  await elf.loadArchHeaderJson();
  let tags = [];
  let d_un = 0x0;
  let header = elf.archHeader;
  objv(header.DT).forEach((d_tag)=>tags.push({d_tag,d_un}));
  elf.addDynSection({tags});
  let parentSegment = elf.phdr.find(hdr=>hdr.p_type==constants.PT.LOAD);
  objv(header.structs).forEach((arr)=>arr.forEach((prop)=>prop.val=0x0));
  let i=0;
  objv(header.PT).forEach((p_type)=>{
    objv(header.SHT).forEach((sh_type)=>{
      objv(header.structs).forEach((props)=>{
        let data = struct2buff({props,N:mips32.N,LE:mip32.LE});
        let shdr = elf.shdr.addSection({sh_type,data,name:`.mips.${i++}`});
        elf.phdr.addSegment({
          parentSegment,
          p_type,
          shdr
        });
      });
      let data = Buffer.alloc(0x30);
      let shdr = elf.shdr.addSection({sh_type,data,name:`.mips.${i++}`});
      elf.phdr.addSegment({
        parentSegment,
        p_type,
        shdr
      });
    });
  });
  elf.recompute();
  elf.writeToFile('./elf-gen_mips');
}

main();
