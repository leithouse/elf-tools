
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

// elf/ia64.h
Object.assign(DT,{
/* Possible values for d_tag in Elf64_Dyn:  */
  IA_64_PLT_RESERVE	:(DT.LOPROC + 0),

/* VMS specific values for d_tag in Elf64_Dyn:  */
  IA_64_VMS_SUBTYPE         :(DT.LOOS + 0),
  IA_64_VMS_IMGIOCNT        :(DT.LOOS + 2),
  IA_64_VMS_LNKFLAGS        :(DT.LOOS + 8),
  IA_64_VMS_VIR_MEM_BLK_SIZ :(DT.LOOS + 10),
  IA_64_VMS_IDENT           :(DT.LOOS + 12),
  IA_64_VMS_NEEDED_IDENT    :(DT.LOOS + 16),
  IA_64_VMS_IMG_RELA_CNT    :(DT.LOOS + 18),
  IA_64_VMS_SEG_RELA_CNT    :(DT.LOOS + 20),
  IA_64_VMS_FIXUP_RELA_CNT  :(DT.LOOS + 22),
  IA_64_VMS_FIXUP_NEEDED    :(DT.LOOS + 24),
  IA_64_VMS_SYMVEC_CNT      :(DT.LOOS + 26),
  IA_64_VMS_XLATED          :(DT.LOOS + 30),
  IA_64_VMS_STACKSIZE       :(DT.LOOS + 32),
  IA_64_VMS_UNWINDSZ        :(DT.LOOS + 34),
  IA_64_VMS_UNWIND_CODSEG   :(DT.LOOS + 36),
  IA_64_VMS_UNWIND_INFOSEG  :(DT.LOOS + 38),
  IA_64_VMS_LINKTIME        :(DT.LOOS + 40),
  IA_64_VMS_SEG_NO          :(DT.LOOS + 42),
  IA_64_VMS_SYMVEC_OFFSET   :(DT.LOOS + 44),
  IA_64_VMS_SYMVEC_SEG      :(DT.LOOS + 46),
  IA_64_VMS_UNWIND_OFFSET   :(DT.LOOS + 48),
  IA_64_VMS_UNWIND_SEG      :(DT.LOOS + 50),
  IA_64_VMS_STRTAB_OFFSET   :(DT.LOOS + 52),
  IA_64_VMS_SYSVER_OFFSET   :(DT.LOOS + 54),
  IA_64_VMS_IMG_RELA_OFF    :(DT.LOOS + 56),
  IA_64_VMS_SEG_RELA_OFF    :(DT.LOOS + 58),
  IA_64_VMS_FIXUP_RELA_OFF  :(DT.LOOS + 60),
  IA_64_VMS_PLTGOT_OFFSET   :(DT.LOOS + 62),
  IA_64_VMS_PLTGOT_SEG      :(DT.LOOS + 64),
  IA_64_VMS_FPMODE          :(DT.LOOS + 66),
});

Object.assign(DT,{
  /* 32 bit version number for runtime linker interface.  */
  MIPS_RLD_VERSION	:0x70000001,

  /* Time stamp.  */
  MIPS_TIME_STAMP	:0x70000002,

  /* Checksum of external strings and common sizes.  */
  MIPS_ICHECKSUM	:0x70000003,

  /* Index of version string in string table.  */
  MIPS_IVERSION		:0x70000004,

  /* 32 bits of flags.  */
  MIPS_FLAGS		:0x70000005,

  /* Base address of the segment.  */
  MIPS_BASE_ADDRESS	:0x70000006,

  /* ??? */
  MIPS_MSYM		:0x70000007,

  /* Address of .conflict section.  */
  MIPS_CONFLICT		:0x70000008,

  /* Address of .liblist section.  */
  MIPS_LIBLIST		:0x70000009,

  /* Number of local global offset table entries.  */
  MIPS_LOCAL_GOTNO	:0x7000000a,

  /* Number of entries in the .conflict section.  */
  MIPS_CONFLICTNO	:0x7000000b,

  /* Number of entries in the .liblist section.  */
  MIPS_LIBLISTNO	:0x70000010,

  /* Number of entries in the .dynsym section.  */
  MIPS_SYMTABNO		:0x70000011,

  /* Index of first external dynamic symbol not referenced locally.  */
  MIPS_UNREFEXTNO	:0x70000012,

  /* Index of first dynamic symbol in global offset table.  */
  MIPS_GOTSYM		:0x70000013,

  /* Number of page table entries in global offset table.  */
  MIPS_HIPAGENO		:0x70000014,

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
  MIPS_GP_VALUE		:0x70000030,

  /* Address of auxiliary .dynamic.  */
  MIPS_AUX_DYNAMIC	:0x70000031,

  /* Address of the base of the PLTGOT.  */
  MIPS_PLTGOT         :0x70000032,

  /* Points to the base of a writable PLT.  */
  MIPS_RWPLT          :0x70000034,

  /* Relative offset of run time loader map, used for debugging.  */
  MIPS_RLD_MAP_REL    :0x70000035,

  /* Address of .MIPS.xhash section.  */
  MIPS_XHASH	       :0x70000036,
});

module.exports = DT;
