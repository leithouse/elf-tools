/**
 * @reference elf/common.h
 * @type {JSON}
 */
const ELFOSABI = {
  toString: () => 'ELFOSABI_',
      NONE: 0,
      HPUX: 1,
    NETBSD: 2,
       GNU: 3,
     LINUX: 3,  // ELFOSABI_LINUX is an alias for ELFOSABI_GNU.
   SOLARIS: 6,
       AIX: 7,
      IRIX: 8,
   FREEBSD: 9,
     TRU64: 10,
   MODESTO: 11,
   OPENBSD: 12,
   OPENVMS: 13,
       NSK: 14,
      AROS: 15,
       ARM: 97,
STANDALONE: 255
}

module.exports = ELFOSABI;
