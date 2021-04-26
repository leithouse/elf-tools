const constants = require('../constants'),
  {struct2buff} = require('../buff-utils'),
            Elf = require('../elf'),
           path = require('path');

const genCore = async (outDir='.') => {
  let elf = new Elf({ehdr:{e_type:constants.ET.CORE}});
  let segment = elf.addSegment({
    parentSegment:'load',
    p_type:constants.PT.NOTE
  });
  let notes = [
    { name: 'GNU', n_type:constants.NT.GNU_ABI_TAG,
      desc: Buffer.alloc(0x40,'A')
    },
    { name: 'GNU', n_type:constants.NT.GNU_HWCAP,
      desc: Buffer.alloc(0x20,'B')
    },
    { name: 'GNU', n_type:constants.NT.GNU_BUILD_ID,
      desc: Buffer.alloc(0x8,'C')
    },
    { name: 'GNU', n_type:constants.NT.GNU_GOLD_VERSION,
      desc: Buffer.alloc(0x8,'D')
    },
    { name: 'FreeBSD', n_type:constants.NT.FREEBSD_PROCSTAT_PROC,
      desc: Buffer.alloc(0x8,'E')
    },
    { name: 'NetBSD-CORE', n_type:constants.NT.NETBSDCORE_PROCINFO,
      desc: Buffer.alloc(0x8,'F')
    },
    { name: 'NetBSD', n_type:constants.NT.NETBSD_IDENT,
      desc: Buffer.alloc(0x8,'G')
    },
    { name: 'NetBSD', n_type:0x0,
      desc: Buffer.alloc(0x8,'H')
    },
    { name: 'SPU/', 
      desc: Buffer.alloc(0x8,'I')
    },
    { name: 'GA$\x013.2', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x4,'J')
    },
    { name: 'GA*\x0224', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x4,'J2')
    },
    { name: 'GA+\x03', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x4,'J3')
    },
    { name: 'GA*\x0420', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x8,'J4')
    },
    { name: 'GA$\x05foo', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x10,'J5')
    },
    { name: 'GA$\x06foo', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x4,'J6')
    },
    { name: 'GA*\x072', n_type:constants.NT.GNU_BUILD_ATTRIBUTE_OPEN,
      desc: Buffer.alloc(0x0)
    },
    { name: 'stapsdt', n_type:constants.NT.STAPSDT,
      desc: Buffer.alloc(0x50,'L')
    },
    { name: 'CORE', n_type:constants.NT.FILE,
      desc: (()=>{
        let b=Buffer.alloc(0x40,'M');
        b.writeInt8(0x00,0x3f);
        return Buffer.concat([Buffer.from('0200000000000000','hex'),b]);
      })()
    },
  ]
  let snotes = elf.shdr.addNotesSection({
    name:'foobar',
    notes
  });
  segment.addSection(snotes);
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'core-notes'));
  return elf;
}

const genIA64 = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{ e_machine:constants.EM.IA_64, e_ident: { ei_osabi:constants.ELFOSABI.OPENVMS } }
  });
  await elf.loadArchHeaderJson('ia64');
  let segment = elf.addSegment({
    parentSegment:'load',
    p_type:constants.PT.NOTE
  });
  let notes = [
    { name: 'IPF/VMS', isVMS:true, n_type:constants.NT.VMS_MHD,
      desc: Buffer.alloc(0x50,'A'),
    },
    { name: 'IPF/VMS', isVMS:true, n_type:constants.NT.VMS_LNM,
      desc: Buffer.alloc(0x10,'B'),
    },
    { name: 'IPF/VMS', isVMS:true, n_type:constants.NT.VMS_FPMODE,
      desc: Buffer.alloc(0x10,'C'),
    },
    { name: 'IPF/VMS', isVMS:true, n_type:constants.NT.VMS_LINKTIME,
      desc: Buffer.alloc(0x10,'D'),
    },
    { name: 'IPF/VMS', isVMS:true, n_type:constants.NT.VMS_PATCHTIME,
      desc: Buffer.alloc(0x10,'E'),
    },
    { name: 'IPF/VMS', isVMS:true, n_type:constants.NT.VMS_ORIG_DYN,
      desc: Buffer.alloc(0x40,'F'),
    },
  ]
  let snotes = elf.shdr.addNotesSection({
    name:'foobar',
    notes
  });
  segment.addSection(snotes);
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'ia64-notes'));
  return elf;
}

const genV850 = async (outDir='.') => {
  let elf = new Elf({
    ehdr:{ 
      e_machine:constants.EM.V850, 
      e_ident: { 
        ei_osabi:constants.ELFOSABI.OPENVMS,
        elfclass:constants.ELFCLASS[32]
      } 
    }
  });
  await elf.loadArchHeaderJson('v850');
  let segment = elf.addSegment({
    parentSegment:'load',
    p_type:constants.PT.NOTE
  });
  let notes = [
    { name: 'IPF/VMS', n_type:constants.NT.V850_NOTE_ALIGNMENT,
      desc: Buffer.from('01000000','hex')
    },
    { name: 'IPF/VMS', n_type:constants.NT.V850_NOTE_DATA_SIZE,
      desc: Buffer.from('01000000','hex')
    },
    { name: 'IPF/VMS', n_type:constants.NT.V850_NOTE_FPU_INFO,
      desc: Buffer.from('01000000','hex')
    },
    { name: 'IPF/VMS', n_type:constants.NT.V850_NOTE_MMU_INFO,
      desc: Buffer.from('01000000','hex')
    },
  ]
  let snotes = elf.shdr.addNotesSection({
    name:'foobar',
    altSHT:constants.SHT.RENESAS_INFO,
    notes
  });
  segment.addSection(snotes);
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'v850-notes'));
  return elf;
}

const genGnu = async (outDir='.') => {
  let elf = new Elf();
  let segment = elf.addSegment({
    parentSegment:'load',
    p_type:constants.PT.NOTE
  });

  let flags = '';
  for(let i=0;i<32;i++)
    flags += '1';
  flags = parseInt(flags,2);

  let notes = [
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('01000000','hex'), // type = STACK_SIZE
        Buffer.from('08000000','hex'), // datasz
        Buffer.from('0800000000000000','hex')
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('02000000','hex'), // type = NO_COPY_ON_PROTECTED
        Buffer.from('00000000','hex'), // datasz
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('020000c0','hex'), // FEATURE_1_AND 
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('020001c0','hex'), // ISA_1_USED 
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('028000c0','hex'), // ISA_1_NEEDED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('018000c0','hex'),  // FEATURE_2_NEEDED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('020010c0','hex'), // FEATURE_2_USED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('000000c0','hex'), // COMPAT_ISA_1_USED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('008000c0','hex'), // COMPAT_2_ISA_1_NEEDED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('000001c0','hex'), // COMPAT_2_ISA_1_USED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
    { name: 'GNU', n_type:constants.NT.GNU_PROPERTY_TYPE_0,
      desc:Buffer.concat([
        Buffer.from('010000c0','hex'), // COMPAT_ISA_1_NEEDED
        Buffer.from('04000000','hex'), 
        Buffer.from('ffffffff','hex'),
        Buffer.from('00000000','hex'),
      ])
    },
  ];
  let snotes = elf.shdr.addNotesSection({
    name:'foobar',
    notes
  });
  segment.addSection(snotes);
  elf.recompute();
  await elf.writeToFile(path.join(outDir,'gnu-notes'));
  return elf;
}

module.exports = {
  genV850,
  genIA64,
  genCore,
  genGnu,
  all: async (outDir) => {
    await Promise.all([
      genV850(outDir),
      genIA64(outDir),
      genCore(outDir),
      genGnu(outDir)
    ]);
  }
}
