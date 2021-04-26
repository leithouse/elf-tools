const constants = require('../constants'),
           EHdr = require('../ehdr'),
            Elf = require('../elf'),
           path = require('path'),
            fsp = require('fs').promises,
     {execSync} = require('child_process');

/**
 * Creates an archive that should hit every machine flag decode branch as well as the process_archive branch
 * @async
 * @param [dirOut='.'] {String}
 * @returns {Elf[]}
 */
const genArch = async (dirOut='.') => {
  let elfs = [];
  let bits = '';
  for(let i=0; i<32;i++)
    bits+='1';
  let e_flags = parseInt(bits,2),
      e_type  = constants.ET.REL;
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.ARC_COMPACT}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.ARM}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.AVR}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.BLACKFIN}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.CYGNUS_FRV}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM['68K']}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.CYGNUS_MEP}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.PPC}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.V800}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.V850}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.M32R}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.MIPS}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.NDS32}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.NFP}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.RISCV}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.SH}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.SPARCV9}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.PARISC}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.PJ}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.IA_64}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.VAX}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.VISIUM}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.RL78}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.RX}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.S390}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.TI_C6000}));
  elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.MSP430}));
  //elfs.push(new EHdr({e_type,e_flags,e_machine:constants.EM.Z80}));
  
  let parr = [];
  let sh = 'ar -rsv '+path.join(dirOut,'mach-flags.a');
  elfs.forEach((elf,i)=>{
    let fname = path.join(dirOut,`elf-${i}.o`);
    parr.push(fsp.writeFile(fname,elf.buffer));
    sh += ' '+fname;
  });
  let elf = new Elf({ehdr:{e_type,e_flags,e_machine:constants.EM.Z80}});
  let {sym} = elf.shdr.addSymSection({
    type:'.symtab',
    syms: [
      { name:'foobar',
        st_size:0x10,
        st_other:0x0,
        st_type:constants.STT.OBJECT,
        st_bind:constants.STB.GLOBAL,
        st_shndx:0x1
      }
    ]
  });
  elf.phdr.addSection({
    segment:elf.phdr.find(x=>x.p_type==constants.PT.LOAD),
    shdr:sym
  });
  elf.recompute();
  let fname = path.join(dirOut,`elf-w-sym.o`);
  parr.push(elf.writeToFile(fname));
  sh += ' '+fname;
  await Promise.all(parr);
  execSync(sh);
  let rm = path.join(dirOut,'*.o');
  execSync(`rm ${rm}`);
  return elf;
}

module.exports = genArch;
