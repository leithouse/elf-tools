/**
 * Symbol binding
 * @reference elf/common.h
 * @type {JSON}
 */
const STB = {
  toString: () => 'STB_',
  LOCAL		:0,		/* Symbol not visible outside obj */
  GLOBAL	:1,		/* Symbol visible outside obj */
  WEAK		:2,		/* Like globals, lower precedence */
  LOOS		:10,		/* OS-specific semantics */
  GNU_UNIQUE	:10,		/* Symbol is unique in namespace */
  HIOS		:12,		/* OS-specific semantics */
  LOPROC	:13,		/* Processor-specific semantics */
  HIPROC	:15,		/* Processor-specific semantics */
}

module.exports = STB;
