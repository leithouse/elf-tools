const constants = require('../constants');

const MIPS = {}

MIPS.PT = {
  /* Register usage information.  Identifies one .reginfo section.  */
  MIPS_REGINFO		:0x70000000,

  /* Runtime procedure table.  */
  MIPS_RTPROC		:0x70000001,

  /* .MIPS.options section.  */
  MIPS_OPTIONS		:0x70000002,

  /* Records ABI related flags.  */
  MIPS_ABIFLAGS		:0x70000003
};
// elf/mips.h
MIPS.SHT = {
/* Section contains the set of dynamic shared objects used when
   statically linking.  */
  MIPS_LIBLIST:	0x70000000,
/* I'm not sure what this is, but it's used on Irix 5.  */
  MIPS_MSYM:		0x70000001,
/* Section contains list of symbols whose definitions conflict with
   symbols defined in shared objects.  */
  MIPS_CONFLICT:	0x70000002,
/* Section contains the global pointer table.  */
  MIPS_GPTAB:		0x70000003,
/* Section contains microcode information.  The exact format is
   unspecified.  */
  MIPS_UCODE:		0x70000004,
/* Section contains some sort of debugging information.  The exact
   format is unspecified.  It's probably ECOFF symbols.  */
  MIPS_DEBUG:		0x70000005,
/* Section contains register usage information.  */
  MIPS_REGINFO:	0x70000006,
/* ??? */
  MIPS_PACKAGE:	0x70000007,
/* ??? */
  MIPS_PACKSYM:	0x70000008,
/* ??? */
  MIPS_RELD:		0x70000009,
/* Section contains interface information.  */
  MIPS_IFACE:		0x7000000b,
/* Section contains description of contents of another section.  */
  MIPS_CONTENT:	0x7000000c,
/* Section contains miscellaneous options.  */
  MIPS_OPTIONS:	0x7000000d,
/* ??? */
  MIPS_SHDR:		0x70000010,
/* ??? */
  MIPS_FDESC:		0x70000011,
/* ??? */
  MIPS_EXTSYM:		0x70000012,
/* ??? */
  MIPS_DENSE:		0x70000013,
/* ??? */
  MIPS_PDESC:		0x70000014,
/* ??? */
  MIPS_LOCSYM:		0x70000015,
/* ??? */
  MIPS_AUXSYM:		0x70000016,
/* ??? */
  MIPS_OPTSYM:		0x70000017,
/* ??? */
  MIPS_LOCSTR:		0x70000018,
/* ??? */
  MIPS_LINE:		0x70000019,
/* ??? */
  MIPS_RFDESC:		0x7000001a,
/* Delta C++: symbol table */
  MIPS_DELTASYM:	0x7000001b,
/* Delta C++: instance table */
  MIPS_DELTAINST:	0x7000001c,
/* Delta C++: class table */
  MIPS_DELTACLASS:	0x7000001d,
/* DWARF debugging section.  */
  MIPS_DWARF:		0x7000001e,
/* Delta C++: declarations */
  MIPS_DELTADECL:	0x7000001f,
/* List of libraries the binary depends on.  Includes a time stamp, version
   number.  */
  MIPS_SYMBOL_LIB:	0x70000020,
/* Events section.  */
  MIPS_EVENTS	:	0x70000021,
/* ??? */
  MIPS_TRANSLATE:	0x70000022,
/* Special pixie sections */
  MIPS_PIXIE	:	0x70000023,
/* Address translation table (for debug info) */
  MIPS_XLATE	:	0x70000024,
/* SGI internal address translation table (for debug info) */
  MIPS_XLATE_DEBUG:	0x70000025,
/* Intermediate code */
  MIPS_WHIRL	:	0x70000026,
/* C++ exception handling region info */
  MIPS_EH_REGION:	0x70000027,
/* Obsolete address translation table (for debug info) */
  MIPS_XLATE_OLD:	0x70000028,
/* Runtime procedure descriptor table exception information (ucode) ??? */
  MIPS_PDR_EXCEPTION:	0x70000029,
/* ABI related flags section.  */
  MIPS_ABIFLAGS:	0x7000002a,
/* GNU style symbol hash table with xlat.  */
  MIPS_XHASH	:	0x7000002b,
};

MIPS.DT = {
/* 32 bit version number for runtime linker interface.  */
  MIPS_RLD_VERSION	:0x70000001,

/* Time stamp.  */
  MIPS_TIME_STAMP	:0x70000002,

/* Checksum of external strings and common sizes.  */
  MIPS_ICHECKSUM	:0x70000003,

/* Index of version string in string table.  */
  MIPS_IVERSION	:0x70000004,

/* 32 bits of flags.  */
  MIPS_FLAGS		:0x70000005,

/* Base address of the segment.  */
  MIPS_BASE_ADDRESS	:0x70000006,

/* ??? */
  MIPS_MSYM		:0x70000007,

/* Address of .conflict section.  */
  MIPS_CONFLICT	:0x70000008,

/* Address of .liblist section.  */
  MIPS_LIBLIST		:0x70000009,

/* Number of local global offset table entries.  */
  MIPS_LOCAL_GOTNO	:0x7000000a,

/* Number of entries in the .conflict section.  */
  MIPS_CONFLICTNO	:0x7000000b,

/* Number of entries in the .liblist section.  */
  MIPS_LIBLISTNO	:0x70000010,

/* Number of entries in the .dynsym section.  */
  MIPS_SYMTABNO	:0x70000011,

/* Index of first external dynamic symbol not referenced locally.  */
  MIPS_UNREFEXTNO	:0x70000012,

/* Index of first dynamic symbol in global offset table.  */
  MIPS_GOTSYM		:0x70000013,

/* Number of page table entries in global offset table.  */
  MIPS_HIPAGENO	:0x70000014,

/* Address of run time loader map, used for debugging.  */
  MIPS_RLD_MAP		:0x70000016,

/* Delta C++ class definition.  */
  MIPS_DELTA_CLASS	:0x70000017,

/* Number of entries in DT_MIPS_DELTA_CLASS.  */
  MIPS_DELTA_CLASS_NO	:0x70000018,

/* Delta C++ class instances.  */
  MIPS_DELTA_INSTANCE	:0x70000019,

/* Number of entries in DT_MIPS_DELTA_INSTANCE.  */
  MIPS_DELTA_INSTANCE_NO	:0x7000001a,

/* Delta relocations.  */
  MIPS_DELTA_RELOC	:0x7000001b,

/* Number of entries in DT_MIPS_DELTA_RELOC.  */
  MIPS_DELTA_RELOC_NO	:0x7000001c,

/* Delta symbols that Delta relocations refer to.  */
  MIPS_DELTA_SYM	:0x7000001d,

/* Number of entries in DT_MIPS_DELTA_SYM.  */
  MIPS_DELTA_SYM_NO	:0x7000001e,

/* Delta symbols that hold class declarations.  */
  MIPS_DELTA_CLASSSYM	:0x70000020,

/* Number of entries in DT_MIPS_DELTA_CLASSSYM.  */
  MIPS_DELTA_CLASSSYM_NO	:0x70000021,

/* Flags indicating information about C++ flavor.  */
  MIPS_CXX_FLAGS	:0x70000022,

/* Pixie information (???).  */
  MIPS_PIXIE_INIT	:0x70000023,

/* Address of .MIPS.symlib */
  MIPS_SYMBOL_LIB	:0x70000024,

/* The GOT index of the first PTE for a segment */
  MIPS_LOCALPAGE_GOTIDX	:0x70000025,

/* The GOT index of the first PTE for a local symbol */
  MIPS_LOCAL_GOTIDX	:0x70000026,

/* The GOT index of the first PTE for a hidden symbol */
  MIPS_HIDDEN_GOTIDX	:0x70000027,

/* The GOT index of the first PTE for a protected symbol */
  MIPS_PROTECTED_GOTIDX	:0x70000028,

/* Address of `.MIPS.options'.  */
  MIPS_OPTIONS		:0x70000029,

/* Address of `.interface'.  */
  MIPS_INTERFACE	:0x7000002a,

/* ??? */
  MIPS_DYNSTR_ALIGN	:0x7000002b,

/* Size of the .interface section.  */
  MIPS_INTERFACE_SIZE	:0x7000002c,

/* Size of rld_text_resolve function stored in the GOT.  */
  MIPS_RLD_TEXT_RESOLVE_ADDR	:0x7000002d,

/* Default suffix of DSO to be added by rld on dlopen() calls.  */
  MIPS_PERF_SUFFIX	:0x7000002e,

/* Size of compact relocation section (O32).  */
  MIPS_COMPACT_SIZE	:0x7000002f,

/* GP value for auxiliary GOTs.  */
  MIPS_GP_VALUE	:0x70000030,

/* Address of auxiliary .dynamic.  */
  MIPS_AUX_DYNAMIC	:0x70000031,

/* Address of the base of the PLTGOT.  */
  MIPS_PLTGOT         :0x70000032,

/* Points to the base of a writable PLT.  */
  MIPS_RWPLT          :0x70000034,

/* Relative offset of run time loader map, used for debugging.  */
  MIPS_RLD_MAP_REL    :0x70000035,

/* Address of .MIPS.xhash section.  */
  MIPS_XHASH	       :0x70000036
}

Object.assign(constants,MIPS);
constants.MIPS = MIPS;

module.exports = constants;
