/**
 * Object file type
 * @reference elf/common.h
 * @type {JSON}
 */
const ET = {
  toString: () => 'ET_',
  NONE: 0,
   REL: 1,
  EXEC: 2,
   DYN: 3,
  CORE: 4
}

module.exports = ET;
