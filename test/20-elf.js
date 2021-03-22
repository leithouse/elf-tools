process.env.NODE_ENV='dev';
const {stringifyConst,SHT,STT,STV,STB,DT} = require('../lib/constants'),
                 {expect} = require('chai').use(require('chai-bytes')),
                     EHdr = require('../lib/ehdr'),
                     SHdr = require('../lib/shdr'),
                SHdrTable = require('../lib/shdr-table'),
                      fsp = require('fs').promises,
               {execSync} = require('child_process'),
                   StrTab = require('../lib/strtab'),
                   SymTab = require('../lib/symtab'),
                      Elf = require('../lib/elf');

const TEST_PROG = '/bin/ls';

describe('Elf', function() {
  let fpath, fbuff, readelf, elf;
  before(async function() {
    fpath = TEST_PROG;
    fbuff = await fsp.readFile(fpath);
    readelf = execSync('/bin/readelf -S '+fpath).toString();
    elf = await Elf.mkFromFile(fpath);
  });
  it('doesn\'t throw', function() {
    // tests before
  });
  describe('basics', function() {
    it('fullSize property equals file size', function() {
      expect(elf.fullSize).equal(fbuff.length);
    });
    it('buffer property returns buffer which matches original', function() {
      expect(Buffer.compare(elf.buffer,fbuff)).equal(0);
    });
  });
  describe('recompute', function() {
    describe('w/ no changes', function() {
      let pre;
      before(function() {
        pre = {
          str: elf.toString(),
          buff: elf.buffer,
          size: elf.fullSize
        }
        elf.recompute();
      });
      it('doesn\'t change any addresses', function() {
        expect(elf.toString()).equal(pre.str);
      });
      it(' file that runs the same way', async function() {
        let chk = execSync(TEST_PROG+' /var/log').toString();
        elf.recompute();
        expect( execSync((await elf.writeToFile('/tmp/asdfsdafdasdfasdfasdf'))+' /var/log').toString()).equal(chk);
      });
    });
  });
  describe('section mapping', function() {
    
  });
});
