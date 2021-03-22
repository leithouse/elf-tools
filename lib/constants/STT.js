/**
 * Symbol type
 * @reference elf/common.h
 * @type {JSON}
 */
const STT = {
  toString: () => 'STT_',
  NOTYPE	:0,		/* Symbol type is unspecified */
  OBJECT	:1,		/* Symbol is a data object */
  FUNC		:2,		/* Symbol is a code object */
  SECTION	:3,		/* Symbol associated with a section */
  FILE		:4,		/* Symbol gives a file name */
  COMMON	:5,		/* An uninitialised common block */
  TLS		:6,		/* Thread local data object */
  RELC		:8,		/* Complex relocation expression */
  SRELC		:9,		/* Signed Complex relocation expression */
  LOOS		:10,		/* OS-specific semantics */
  GNU_IFUNC	:10,		/* Symbol is an indirect code object */
  HIOS		:12,		/* OS-specific semantics */
  LOPROC	:13,		/* Processor-specific semantics */
  HIPROC	:15,		/* Processor-specific semantics */
}

module.exports = STT;
