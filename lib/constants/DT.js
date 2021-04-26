
/**
 * Dynamic section tags.
 * @reference elf/common.h
 * @type {JSON}
 */
const DT = {
  toString: () => 'DT_',
  NULL            :0,
  NEEDED          :1,
  PLTRELSZ        :2,
  PLTGOT          :3,
  HASH            :4,
  STRTAB          :5,
  SYMTAB          :6,
  RELA            :7,
  RELASZ          :8,
  RELAENT         :9,
  STRSZ           :10,
  SYMENT          :11,
  INIT            :12,
  FINI            :13,
  SONAME          :14,
  RPATH	          :15,
  SYMBOLIC	  :16,
  REL		  :17,
  RELSZ	          :18,
  RELENT	  :19,
  PLTREL	  :20,
  DEBUG	          :21,
  TEXTREL	  :22,
  JMPREL	  :23,
  BIND_NOW	  :24,
  INIT_ARRAY	  :25,
  FINI_ARRAY	  :26,
  INIT_ARRAYSZ    :27,
  FINI_ARRAYSZ    :28,
  RUNPATH	  :29,
  FLAGS		  :30,
  ENCODING	  :32,
  PREINIT_ARRAY   :32,
  PREINIT_ARRAYSZ :33,
  SYMTAB_SHNDX    :34,

/* Note, the Oct 4, 1999 draft of the ELF ABI changed the values
   for DT_LOOS and DT_HIOS.  Some implementations however, use
   values outside of the new range (see below).	 */
  OLD_DT_LOOS	:0x60000000,
  LOOS		:0x6000000d,
  HIOS		:0x6ffff000,

  LOPROC	:0x70000000,
  HIPROC	:0x7fffffff,

/* The next 2 dynamic tag ranges, integer value range (DT_VALRNGLO to
   DT_VALRNGHI) and virtual address range (DT_ADDRRNGLO to DT_ADDRRNGHI),
   are used on Solaris.  We support them everywhere.  Note these values
   lie outside of the (new) range for OS specific values.  This is a
   deliberate special case and we maintain it for backwards compatability.
 */
  VALRNGLO	:0x6ffffd00,
  GNU_FLAGS_1  	:0x6ffffdf4,
  GNU_PRELINKED :0x6ffffdf5,
  GNU_CONFLICTSZ:0x6ffffdf6,
  GNU_LIBLISTSZ :0x6ffffdf7,
  CHECKSUM	:0x6ffffdf8,
  PLTPADSZ	:0x6ffffdf9,
  MOVEENT	:0x6ffffdfa,
  MOVESZ	:0x6ffffdfb,
  FEATURE	:0x6ffffdfc,
  POSFLAG_1	:0x6ffffdfd,
  SYMINSZ	:0x6ffffdfe,
  SYMINENT	:0x6ffffdff,
  VALRNGHI	:0x6ffffdff,

  ADDRRNGLO	:0x6ffffe00,
  GNU_HASH	:0x6ffffef5,
  TLSDESC_PLT	:0x6ffffef6,
  TLSDESC_GOT	:0x6ffffef7,
  GNU_CONFLICT	:0x6ffffef8,
  GNU_LIBLIST	:0x6ffffef9,
  CONFIG	:0x6ffffefa,
  DEPAUDIT	:0x6ffffefb,
  AUDIT		:0x6ffffefc,
  PLTPAD	:0x6ffffefd,
  MOVETAB	:0x6ffffefe,
  SYMINFO	:0x6ffffeff,
  ADDRRNGHI	:0x6ffffeff,

  RELACOUNT	:0x6ffffff9,
  RELCOUNT	:0x6ffffffa,
  FLAGS_1	:0x6ffffffb,
  VERDEF	:0x6ffffffc,
  VERDEFNUM	:0x6ffffffd,
  VERNEED	:0x6ffffffe,
  VERNEEDNUM	:0x6fffffff,

/* This tag is a GNU extens,ion to the Solaris version scheme.  */
  VERSYM	:0x6ffffff0,

  LOPROC	:0x70000000,
  HIPROC	:0x7fffffff,

/* These section tags are used on Solaris.  We support them
   everywhere, and hope they do not conflict.  */

  AUXILIARY	:0x7ffffffd,
  USED		:0x7ffffffe,
  FILTER	:0x7fffffff,

  OLD_DT_HIOS	:0x6fffffff,
}


module.exports = DT;
