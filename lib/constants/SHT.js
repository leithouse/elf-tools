/**
 * Section Header Type
 * @reference elf/common.h
 * @type {JSON}
 */
const SHT = {
  toString:()=>'SHT_',
  NULL	        :0,		/* Section header table entry unused */
  PROGBITS	:1,		/* Program specific (private) data */
  SYMTAB	:2,		/* Link editing symbol table */
  STRTAB	:3,		/* A string table */
  RELA          :4,		/* Relocation entries with addends */
  HASH          :5,		/* A symbol hash table */
  DYNAMIC	:6,		/* Information for dynamic linking */
  NOTE          :7,		/* Information that marks file */
  NOBITS	:8,		/* Section occupies no space in file */
  REL		:9,		/* Relocation entries, no addends */
  SHLIB        :10,		/* Reserved, unspecified semantics */
  DYNSYM       :11,		/* Dynamic linking symbol table */

  INIT_ARRAY	:14,		/* Array of ptrs to init functions */
  FINI_ARRAY	:15,		/* Array of ptrs to finish functions */
  PREINIT_ARRAY :16,		/* Array of ptrs to pre-init funcs */
  GROUP	        :17,		/* Section contains a section group */
  SYMTAB_SHNDX  :18,		/* Indices for SHN_XINDEX entries */

  LOOS	:0x60000000,	/* First of OS specific semantics */
  HIOS	:0x6fffffff,	/* Last of OS specific semantics */

  GNU_INCREMENTAL_INPUTS :0x6fff4700,   /* incremental build data */
  GNU_ATTRIBUTES :0x6ffffff5,	/* Object attributes */
  GNU_HASH	  :0x6ffffff6,	/* GNU style symbol hash table */
  GNU_LIBLIST	  :0x6ffffff7,	/* List of prelink dependencies */

/* The next three section types are defined by Solaris, and are named
   SHT_SUNW*.  We use them in GNU code, so we also define SHT_GNU*
   versions.  */
  SUNW_verdef	:0x6ffffffd,	/* Versions defined by file */
  SUNW_verneed :0x6ffffffe,	/* Versions needed by file */
  SUNW_versym	:0x6fffffff,	/* Symbol versions */


  LOPROC	:0x70000000,	/* Processor-specific semantics, lo */
  HIPROC	:0x7FFFFFFF,	/* Processor-specific semantics, hi */
  LOUSER	:0x80000000,	/* Application-specific semantics */
/*   HIUSER	:0x8FFFFFFF,    *//* Application-specific semantics */
  HIUSER	:0xFFFFFFFF,	/* New value, defined in Oct 4, 1999 Draft */
}
SHT.GNU_verdef	=SHT.SUNW_verdef;
SHT.GNU_verneed	=SHT.SUNW_verneed;
SHT.GNU_versym	=SHT.SUNW_versym;

// elf/mips.h
Object.assign(SHT,{
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
})


// elf/ia64.h
Object.assign(SHT,{
  IA_64_EXT	:(SHT.LOPROC + 0),	/* Extension bits.  */
  IA_64_UNWIND	:(SHT.LOPROC + 1),	/* Unwind bits.  */
  IA_64_LOPSREG	:(SHT.LOPROC + 0x8000000),
/* ABI says (SHT_LOPROC + 0xfffffff) but I think it's a typo -- this makes sense.  */
  IA_64_HIPSREG	:(SHT.LOPROC + 0x8ffffff),
  IA_64_PRIORITY_INIT :(SHT.LOPROC + 0x9000000),

/* SHT_IA_64_HP_OPT_ANOT is only generated by HPUX compilers for its
   optimization annotation section.  GCC does not generate it but we
   want readelf to know what they are.  Do not use two capital Ns in
   annotate or sed will turn it into 32 or 64 during the build.  */
  IA_64_HP_OPT_ANOT	:0x60000004,

/* OpenVMS section types.  */
/* The section contains PC-to-source correlation information for use by the
   VMS RTL's traceback facility.  */
  IA_64_VMS_TRACE             :0x60000000,
/* The section contains routine signature information for use by the
   translated image executive.  */
  IA_64_VMS_TIE_SIGNATURES    :0x60000001,
/* The section contains dwarf-3 information.  */
  IA_64_VMS_DEBUG             :0x60000002,
/* The section contains the dwarf-3 string table.  */
  IA_64_VMS_DEBUG_STR         :0x60000003,
/* The section contains linkage information to perform consistency checking
   accross object modules.  */
  IA_64_VMS_LINKAGES          :0x60000004,
/* The section allows the symbol vector in an image to be location through
   the section table.  */
  IA_64_VMS_SYMBOL_VECTOR     :0x60000005,
/* The section contains inter-image fixups.  */
  IA_64_VMS_FIXUP             :0x60000006,
/* The section contains unmangled name info.  */
  IA_64_VMS_DISPLAY_NAME_INFO :0x60000007,
});


module.exports = SHT;
