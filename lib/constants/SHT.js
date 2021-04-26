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


module.exports = SHT;
