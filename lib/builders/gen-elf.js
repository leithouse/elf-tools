#!/usr/bin/node
// 
// Generates an elf file from parsed header JSON
// File's not filled with anything meaningful but valid-ish PHdr & SHdr tables
//
// One of each struct type, as well as an emtpy struct type will be placed
// in every SHdr type which in turn are placed in every PHdr type
//
// Total sections added on top of skeleton = (# of structs)*(# of SHTs)*(# of PTs)
//

const {struct2buff} = require('../buff-utils'),
            genEhdr = require('./gen-ehdr'),
                Elf = require('../elf'),
          constants = require('../constants'),
               path = require('path'),
      {randomBytes} = require('crypto'),
               objv = Object.values;

const randInt = (n=0x1000)=>parseInt(Math.random()*n);

/**
 * Writes file to output directory in form `elf-gen_${key}`
 *
 * @param  opt.key         {String} Name of json file, extension not necessary
 * @param [opt.common]     {JSON} Add DT & NT from common.h
 * @param [opt.outDir='.'] {String} Output Directory
 * @async
 * @returns {Elf}
 */

const genElf = async (opt) => {
  let {key,outDir} = opt;
          jsonPath = path.resolve(__dirname,'..','headers',key);
  
  if(jsonPath.endsWith('.json'))
    key = key.substring(0,key.length-5);
  else
    jsonPath += '.json';
  if(!outDir)
    outDir = '.';
  const outFile = path.join(outDir,`elf-gen_${key}`)
           ehdr = genEhdr(key),
            elf = new Elf({ehdr});

  let flags = '';
  for(let i=0;i<32;i++)
    flags += '1';
  elf.ehdr.e_flags = parseInt(flags,2);
  await elf.loadArchHeaderJson(jsonPath);

  let tags = [],
      d_un = 0x0,
    header = elf.archHeader;
  if(!header)
    throw new Error(`Missing ${jsonPath}`);
  // Dynamic tags
  let i = 0;
  objv(header.DT).forEach((d_tag)=>tags.push({d_tag,d_un,name:key+'-dt-'+(i++)}));
  elf.addDynSection({tags});
  let parentSegment = elf.phdr.find(hdr=>hdr.p_type==constants.PT.LOAD);
  

  // Architecture sections
  objv(header.structs).forEach((arr)=>arr.forEach((prop)=>{
    if(prop.size==8)
      prop.val=randInt(0x100);
    else
      prop.val=randInt(0x1000);
  }));
  i=0;
  objv(header.SHT).forEach((sh_type)=>{
    [null,...objv(header.PT)].forEach((p_type,j)=>{
      let name;
      if (elf.ehdr.e_machine == constants.EM.PARISC
          && sh_type == header.SHT.PARISC_UNWIND
      ) 
        name = '.PARISC.unwind';
      objv(header.structs).forEach((props)=>{
        let data = struct2buff({props,N:elf.N,LE:elf.LE});
        if(!name)
          name = `.${key}.${i++}`;
        let shdr = elf.shdr.addSection({sh_type,data,name});
        if(!j)
          elf.phdr.addSection({segment:parentSegment,shdr});
        else {
          elf.phdr.addSegment({
            parentSegment,
            p_type,
            shdr
          });
        }
      });
      let data = Buffer.alloc(0x30);
      if(!name)
        name = `.${key}.${i++}`;
      let shdr = elf.shdr.addSection({sh_type,data,name});
      if(!i)
        elf.phdr.addSection({segment:parentSegment,shdr});
      else {
        elf.phdr.addSegment({
          parentSegment,
          p_type,
          shdr
        });
      }
    });
  });
  // architecture notes
  let notes = [];
  objv(header.NT).forEach((n_type)=>{
    let name = key;
    let desc = Buffer.alloc(0x20,'N');
    notes.push({n_type,name,desc});
  });
  if(opt.common) {
    objv(opt.common.NT).forEach((n_type)=>{
      let name = 'LINUX';
      let desc = Buffer.alloc(0x20,'N');
      notes.push({n_type,name,desc});
    });
  }
  let noteSHdr = elf.shdr.addNotesSection({name:key,notes});
  elf.phdr.addSegment({
    parentSegment,
    p_type: constants.PT.NOTE,
    shdr: noteSHdr
  });
  
  // reloc section
  let rels = [];
  for(let i=0;i<5;i++)
    rels.push({r_offset:randInt(),r_type:randInt(0x100),r_sym:i});
  let relSHdr = elf.shdr.addRelocSection({
    name:'plt',
    rels,
    noAddend:Math.round(Math.random())
  });
  elf.phdr.addSection({
    segment:parentSegment,
    shdr:relSHdr
  });

  // symbol section
  let syms = [];
  let {STT,STB} = constants;
  
  objv(STT).forEach((st_type)=>{
    objv(STB).forEach((st_bind)=>{
      syms.push({
        name:randomBytes(4).toString('hex'),
        st_value:randInt(0x10)<<2,
        st_size:randInt(0x8)<<2,
        st_other:0x0,
        st_type,
        st_bind
      });
    });
  });
  let symSHdr = elf.shdr.addSymSection({syms}).sym
  elf.phdr.addSection({
    segment:parentSegment,
    shdr:symSHdr
  });
  elf.recompute();
  elf.writeToFile(outFile);
  return elf;
}

module.exports = genElf;
