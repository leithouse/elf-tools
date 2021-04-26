
/**
 * Program header type
 * @reference elf/common.h
 * @type {JSON}
 */
const PT = {
  toString   : ()=>'PT_',
  NULL       : 0,		/* Program header table entry unused */
  LOAD       : 1,		/* Loadable program segment */
  DYNAMIC    : 2,		/* Dynamic linking information */
  INTERP     : 3,		/* Program interpreter */
  NOTE       : 4,		/* Auxiliary information */
  SHLIB      : 5,               /* Reserved, unspecified semantics */
  PHDR       : 6,		/* Entry for header table itself */
  TLS        : 7,		/* Thread local storage segment */
  LOOS       : 0x60000000,	/* OS-specific */
  HIOS       : 0x6fffffff,	/* OS-specific */
  LOPROC     : 0x70000000,	/* Processor-specific */
  HIPROC     : 0x7FFFFFFF,	/* Processor-specific */
}
Object.assign(PT,{
  GNU_EH_FRAME : (PT.LOOS + 0x474e550), /* Frame unwind information */
  SUNW_EH_FRAM :  PT.GNU_EH_FRAME,      /* Solaris uses the same value */
  GNU_STACK    : (PT.LOOS + 0x474e551), /* Stack flags */
  GNU_RELRO    : (PT.LOOS + 0x474e552), /* Read-only after relocation */
  GNU_PROPERTY : (PT.LOOS + 0x474e553), /* GNU property */
})
/* OpenBSD ssegment types.  */
Object.assign(PT,{
  OPENBSD_RANDOMIZE: (PT.LOOS + 0x5a3dbe6),  /* Fill with random data.  */
  OPENBSD_WXNEEDED : (PT.LOOS + 0x5a3dbe7),  /* Program does W^X violations.  */
  OPENBSD_BOOTDATA : (PT.LOOS + 0x5a41be6),  /* Section for boot arguments.  */
})
/* Mbind segments */
Object.assign(PT,{
  GNU_MBIND_NUM: 4096,
  GNU_MBIND_LO : (PT.LOOS + 0x474e555),
  GNU_MBIND_HI : (PT.GNU_MBIND_LO + PT.GNU_MBIND_NUM - 1)
});
module.exports = PT;
