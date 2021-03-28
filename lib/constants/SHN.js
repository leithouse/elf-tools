const SHN = {
  toString: () => 'SHN_',

  UNDEF:  0x0000,
  LOPROC: 0xff00,
  HIPROC: 0xff1f,
  LOOS:   0xff20,
  HIOS:   0xff3f,
  ABS:    0xfff1,
  COMMON: 0xfff2,
  XINDEX: 0xffff,

  LORESERVE: 0xff00,
  HIRESERVE: 0xffff
}

module.exports = SHN;
