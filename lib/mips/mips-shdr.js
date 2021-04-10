const AbiFlags = require('./abi-flags'),
       Options = require('./options'),
          SHdr = require('../shdr'),
         {SHT} = require('../constants');

class MipsSHdr extends SHdr {
  handleData() {
    if(super.handleData())
      return true;
    switch(this.sh_type) {
      case SHT.MIPS_ABIFLAGS:
        this.abiFlags = new AbiFlags(this);
        return true;
      case SHT.MIPS_OPTIONS:
        this.options = new Options(this);
        return true;
    }
    return false;
  }
}

module.exports = MipsSHdr;
