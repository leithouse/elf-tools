/**
 * Values of note segment descriptor types for core files.
 * @reference elf/common.h
 * @type {JSON}
 */
const NT = {
  toString: () => 'NT_',
  PRSTATUS	:1,		/* Contains copy of prstatus struct */
  FPREGSET	:2,		/* Contains copy of fpregset struct */
  PRPSINFO	:3,		/* Contains copy of prpsinfo struct */
  TASKSTRUCT	:4,		/* Contains copy of task struct */
  AUXV		:6,		/* Contains copy of Elfxx_auxv_t */
  PRXFPREG	:0x46e62b7f,	/* Contains a user_xfpregs_struct; */
					/*   note name must be "LINUX".  */
  PPC_VMX	:0x100,		/* PowerPC Altivec/VMX registers */
					/*   note name must be "LINUX".  */
  PPC_VSX	:0x102,		/* PowerPC VSX registers */
					/*   note name must be "LINUX".  */
  PPC_TAR	:0x103,		/* PowerPC Target Address Register */
					/*   note name must be "LINUX".  */
  PPC_PPR	:0x104,		/* PowerPC Program Priority Register */
					/*   note name must be "LINUX".  */
  PPC_DSCR	:0x105,		/* PowerPC Data Stream Control Register */
					/*   note name must be "LINUX".  */
  PPC_EBB	:0x106,		/* PowerPC Event Based Branch Registers */
					/*   note name must be "LINUX".  */
  PPC_PMU	:0x107,		/* PowerPC Performance Monitor Registers */
					/*   note name must be "LINUX".  */
  PPC_TM_CGPR	:0x108,		/* PowerPC TM checkpointed GPR Registers */
					/*   note name must be "LINUX".  */
  PPC_TM_CFPR	:0x109,		/* PowerPC TM checkpointed FPR Registers */
					/*   note name must be "LINUX".  */
  PPC_TM_CVMX	:0x10a,		/* PowerPC TM checkpointed VMX Registers */
					/*   note name must be "LINUX".  */
  PPC_TM_CVSX	:0x10b,		/* PowerPC TM checkpointed VSX Registers */
					/*   note name must be "LINUX".  */
  PPC_TM_SPR	:0x10c,		/* PowerPC TM Special Purpose Registers */
					/*   note name must be "LINUX".  */
  PPC_TM_CTAR	:0x10d,		/* PowerPC TM checkpointed TAR */
					/*   note name must be "LINUX".  */
  PPC_TM_CPPR	:0x10e,		/* PowerPC TM checkpointed PPR */
					/*   note name must be "LINUX".  */
  PPC_TM_CDSCR	:0x10f,		/* PowerPC TM checkpointed Data SCR */
					/*   note name must be "LINUX".  */
  '386_TLS'	:0x200,		/* x86 TLS information */
        				/*   note name must be "LINUX".  */
  '386_IOPERM'	:0x201,		/* x86 io permissions */
					/*   note name must be "LINUX".  */
  X86_XSTATE	:0x202,		/* x86 XSAVE extended state */
					/*   note name must be "LINUX".  */
  X86_CET	:0x203,		/* x86 CET state.  */
					/*   note name must be "LINUX".  */
  S390_HIGH_GPRS :0x300,		/* S/390 upper halves of GPRs  */
					/*   note name must be "LINUX".  */
  S390_TIMER	:0x301,		/* S390 timer */
					/*   note name must be "LINUX".  */
  S390_TODCMP	:0x302,		/* S390 TOD clock comparator */
					/*   note name must be "LINUX".  */
  S390_TODPREG	:0x303,		/* S390 TOD programmable register */
					/*   note name must be "LINUX".  */
  S390_CTRS	:0x304,		/* S390 control registers */
					/*   note name must be "LINUX".  */
  S390_PREFIX	:0x305,		/* S390 prefix register */
					/*   note name must be "LINUX".  */
  S390_LAST_BREAK      :0x306,   /* S390 breaking event address */
					/*   note name must be "LINUX".  */
  S390_SYSTEM_CALL     :0x307,   /* S390 system call restart data */
					/*   note name must be "LINUX".  */
  S390_TDB	:0x308,		/* S390 transaction diagnostic block */
					/*   note name must be "LINUX".  */
  S390_VXRS_LOW	:0x309,	/* S390 vector registers 0-15 upper half */
					/*   note name must be "LINUX".  */
  S390_VXRS_HIGH	:0x30a,	/* S390 vector registers 16-31 */
					/*   note name must be "LINUX".  */
  S390_GS_CB	:0x30b,		/* s390 guarded storage registers */
		 			/*   note name must be "LINUX".  */
  S390_GS_BC	:0x30c,		/* s390 guarded storage broadcast control block */
		 			/*   note name must be "LINUX".  */
  ARM_VFP	:0x400,		/* ARM VFP registers */
/* The following definitions should really use NT_AARCH_..., but defined
   this way for compatibility with Linux.  */
  ARM_TLS	:0x401,		/* AArch TLS registers */
		 			/*   note name must be "LINUX".  */
  ARM_HW_BREAK	:0x402,		/* AArch hardware breakpoint registers */
		 			/*   note name must be "LINUX".  */
  ARM_HW_WATCH	:0x403,		/* AArch hardware watchpoint registers */
		 			/*   note name must be "LINUX".  */
  ARM_SVE	:0x405,		/* AArch SVE registers.  */
		 			/*   note name must be "LINUX".  */
  ARM_PAC_MASK	:0x406,		/* AArch pointer authentication code masks */
		 			/*   note name must be "LINUX".  */
  ARC_V2	:0x600,		/* ARC HS accumulator/extra registers.  */
		 			/*   note name must be "LINUX".  */
  SIGINFO	:0x53494749,	/* Fields of siginfo_t.  */
  FILE		:0x46494c45,	/* Description of mapped files.  */
/* Note segments for core files on dir-style procfs systems.  */
  PSTATUS	:10,		/* Has a struct pstatus */
  FPREGS	:12,		/* Has a struct fpregset */
  PSINFO	:13,		/* Has a struct psinfo */
  LWPSTATUS	:16,		/* Has a struct lwpstatus_t */
  LWPSINFO	:17,		/* Has a struct lwpsinfo_t */
  WIN32PSTATUS	:18,		/* Has a struct win32_pstatus */
/* Note segment for SystemTap probes.  */
  STAPSDT	:3,
/* Note segments for core files on FreeBSD systems.  Note name is
   "FreeBSD".  */
  FREEBSD_THRMISC	      :7,	/* Thread miscellaneous info. */
  FREEBSD_PROCSTAT_PROC	      :8,	/* Procstat proc data. */
  FREEBSD_PROCSTAT_FILES      :9,	/* Procstat files data. */
  FREEBSD_PROCSTAT_VMMAP      :10,	/* Procstat vmmap data. */
  FREEBSD_PROCSTAT_GROUPS     :11,	/* Procstat groups data. */
  FREEBSD_PROCSTAT_UMASK      :12,	/* Procstat umask data. */
  FREEBSD_PROCSTAT_RLIMIT     :13,	/* Procstat rlimit data. */
  FREEBSD_PROCSTAT_OSREL      :14,	/* Procstat osreldate data. */
  FREEBSD_PROCSTAT_PSSTRINGS  :15,	/* Procstat ps_strings data. */
  FREEBSD_PROCSTAT_AUXV	      :16,	/* Procstat auxv data. */
  FREEBSD_PTLWPINFO	      :17,	/* Thread ptrace miscellaneous info. */
/* Note segments for core files on NetBSD systems.  Note name
   must start with "NetBSD-CORE".  */
  NETBSDCORE_PROCINFO	:1,	/* Has a struct procinfo */
  NETBSDCORE_AUXV	:2,	/* Has auxv data */
  NETBSDCORE_LWPSTATUS	:24,	/* Has LWPSTATUS data */
  NETBSDCORE_FIRSTMACH	:32,	/* start of machdep note types */
/* Note segments for core files on OpenBSD systems.  Note name is
   "OpenBSD".  */
  OPENBSD_PROCINFO	:10,
  OPENBSD_AUXV		:11,
  OPENBSD_REGS		:20,
  OPENBSD_FPREGS	:21,
  OPENBSD_XFPREGS	:22,
  OPENBSD_WCOOKIE	:23,
/* Note segments for core files on SPU systems.  Note name
   must start with "SPU/".  */
  SPU		:1,
/* Values of note segment descriptor types for object files.  */
  VERSION	:1,		/* Contains a version string.  */
  ARCH		:2,		/* Contains an architecture string.  */
  GNU_ABI_TAG		:1,
  GNU_HWCAP		:2,	/* Used by ld.so and kernel vDSO.  */
  GNU_BUILD_ID		:3,	/* Generated by ld --build-id.  */
  GNU_GOLD_VERSION	:4,	/* Generated by gold.  */
  GNU_PROPERTY_TYPE_0   :5,	/* Generated by gcc.  */

  GNU_BUILD_ATTRIBUTE_OPEN	:0x100,
  GNU_BUILD_ATTRIBUTE_FUNC	:0x101,
}

// elf/ia64.h
Object.assign(NT,{
  VMS_MHD         :1, /* Object module name, version, and date/time.  */
  VMS_LNM         :2, /* Language processor name.  */
  VMS_SRC         :3, /* Source files.  */
  VMS_TITLE       :4, /* Title text.  */
  VMS_EIDC        :5, /* Entity ident consistency check.  */
  VMS_FPMODE      :6, /* Whole program floating-point mode.  */
  VMS_LINKTIME  :101, /* Date/time image was linked.  */
  VMS_IMGNAM    :102, /* Image name string.  */
  VMS_IMGID     :103, /* Image ident string.  */
  VMS_LINKID    :104, /* Linker ident string.  */
  VMS_IMGBID    :105, /* Image build ident string.  */
  VMS_GSTNAM    :106, /* Global Symbol Table Name.  */
  VMS_ORIG_DYN  :107, /* Original setting of dynamic data.  */
  VMS_PATCHTIME :108, /* Date/time of last patch.  */
});

module.exports = NT;
