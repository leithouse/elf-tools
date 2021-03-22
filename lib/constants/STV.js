/**
 * Symbol visibity (st_other)
 * @reference elf/common.h
 * @type {JSON}
 * @readonly
 */
const STV = {
  toString: () => 'STV_',
  DEFAULT	:0,		/* Visibility is specified by binding type */
  INTERNAL	:1,		/* OS specific version of STV_HIDDEN */
  HIDDEN	:2,		/* Can only be seen inside currect component */
  PROTECTED	:3,		/* Treat as STB_LOCAL inside current component */
}

module.exports = STV;
