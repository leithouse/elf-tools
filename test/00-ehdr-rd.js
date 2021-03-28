process.env.NODE_ENV='dev';
const {expect} = require('chai'),
          EHdr = require('../lib/ehdr'),
       E_Ident = require('../lib/e_ident'),
           fsp = require('fs').promises,
    {execSync} = require('child_process');

const TEST_PROG = '/bin/ls';
const TEST_PROG_32 = '/usr/lib32/rcrt1.o';

describe('EHdr', function() {
  let fpath, fbuff, readelf, ehdr;
  before(async function() {
    fpath = TEST_PROG;
    fbuff = await fsp.readFile(fpath);
    readelf = execSync('/bin/readelf -h '+fpath).toString();
  });
  describe('buildFromHandle()', function() {
    let fhandle;
    before(async function() {
      fhandle = await fsp.open(fpath,'r');
      ehdr = new EHdr();
      await ehdr.buildFromHandle(fhandle);
    });
    after(async function() {
      await fhandle.close();
    });
    it('doesn\'t throw', function() {
      // tests before
    });
    it('creates e_ident which translates back to proper bytes', function() {
      expect(Buffer.compare(ehdr.e_ident.buffer,fbuff.slice(0,0x10))).equal(0);
    });
    it('read e_ehsize of header properly', function() {
      let re = new RegExp('this header:\\s*(\\d{2})')
      let chk = readelf.match(re);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_ehsize).equal(chk);
    });
    it('size of header matches e_ehsize', function() {
      expect(ehdr.buffer).length(ehdr.e_ehsize);
    });
    it('pulls entry address properly', function() {
      let chk = readelf.match(/Entry .* 0x(.*)\n/)
      expect(chk).not.null;
      if(typeof ehdr.e_entry == 'bigint')
        chk = BigInt('0x'+chk[1]);
      else
        chk = parseInt(chk[1]);
      expect(ehdr.e_entry).equal(chk);
    });
    it('pulls ph offset address properly', function() {
      let chk = readelf.match(/Start of program headers:\s*(\d*) \(bytes/)
      expect(chk).not.null;
      if(typeof ehdr.e_phoff == 'bigint')
        chk = BigInt(chk[1]);
      else
        chk = parseInt(chk[1]);
      expect(ehdr.e_phoff).equal(chk);
    });
    it('pulls sh offset address properly', function() {
      let chk = readelf.match(/Start of section headers:\s*(\d*) \(bytes/)
      expect(chk).not.null;
      if(typeof ehdr.e_shoff == 'bigint')
        chk = BigInt(chk[1]);
      else
        chk = parseInt(chk[1]);
      expect(ehdr.e_shoff).equal(chk);
    });
    it('pulls size of program header properly', function() {
      let chk = readelf.match(/Size of program.*\:\s*(\d*) \(by/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_phentsize).equal(chk);
    });
    it('pulls size of section header properly', function() {
      let chk = readelf.match(/Size of section.*\:\s*(\d*) \(by/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_shentsize).equal(chk);
    });
    it('pulls number of program headers properly', function() {
      let chk = readelf.match(/Number of program.*\:\s*(\d*)\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_phnum).equal(chk);
    });
    it('pulls number of section headers properly', function() {
      let chk = readelf.match(/Number of section.*\:\s*(\d*)\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_shnum).equal(chk);
    });
    it('pulls out string table inedex properly', function() {
      let chk = readelf.match(/string table.*\:\s*(\d*)\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_shstrndx).equal(chk);
    });
    it('pulls out flags properly', function() {
      let chk = readelf.match(/Flags:\s*(0x(?:.*))\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_flags).equal(chk);
    });
    it('buffer property matches original buffer', function() {
      expect(Buffer.compare(ehdr.buffer,fbuff.slice(0,ehdr.e_ehsize))).equal(0);
    })
  });
  describe('32 bit buildFromHandle()', function() {
    let fhandle;
    before(async function() {
      fpath = TEST_PROG_32;
      fbuff = await fsp.readFile(fpath);
      readelf = execSync('/bin/readelf -h '+fpath).toString();
      fhandle = await fsp.open(fpath,'r');
      ehdr = new EHdr();
      await ehdr.buildFromHandle(fhandle);
    });
    after(async function() {
      await fhandle.close();
    });
    it('doesn\'t throw', function() {
      // tests before
    });
    it('creates e_ident which translates back to proper bytes', function() {
      expect(Buffer.compare(ehdr.e_ident.buffer,fbuff.slice(0,0x10))).equal(0);
    });
    it('read e_ehsize of header properly', function() {
      let re = new RegExp('this header:\\s*(\\d{2})')
      let chk = readelf.match(re);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_ehsize).equal(chk);
    });
    it('size of header matches e_ehsize', function() {
      expect(ehdr.buffer).length(ehdr.e_ehsize);
    });
    it('pulls entry address properly', function() {
      let chk = readelf.match(/Entry .* 0x(.*)\n/)
      expect(chk).not.null;
      if(typeof ehdr.e_entry == 'bigint')
        chk = BigInt('0x'+chk[1]);
      else
        chk = parseInt(chk[1]);
      expect(ehdr.e_entry).equal(chk);
    });
    it('pulls ph offset address properly', function() {
      let chk = readelf.match(/Start of program headers:\s*(\d*) \(bytes/)
      expect(chk).not.null;
      if(typeof ehdr.e_phoff == 'bigint')
        chk = BigInt(chk[1]);
      else
        chk = parseInt(chk[1]);
      expect(ehdr.e_phoff).equal(chk);
    });
    it('pulls sh offset address properly', function() {
      let chk = readelf.match(/Start of section headers:\s*(\d*) \(bytes/)
      expect(chk).not.null;
      if(typeof ehdr.e_shoff == 'bigint')
        chk = BigInt(chk[1]);
      else
        chk = parseInt(chk[1]);
      expect(ehdr.e_shoff).equal(chk);
    });
    it('pulls size of program header properly', function() {
      let chk = readelf.match(/Size of program.*\:\s*(\d*) \(by/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_phentsize).equal(chk);
    });
    it('pulls size of section header properly', function() {
      let chk = readelf.match(/Size of section.*\:\s*(\d*) \(by/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_shentsize).equal(chk);
    });
    it('pulls number of program headers properly', function() {
      let chk = readelf.match(/Number of program.*\:\s*(\d*)\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_phnum).equal(chk);
    });
    it('pulls number of section headers properly', function() {
      let chk = readelf.match(/Number of section.*\:\s*(\d*)\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_shnum).equal(chk);
    });
    it('pulls out string table inedex properly', function() {
      let chk = readelf.match(/string table.*\:\s*(\d*)\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_shstrndx).equal(chk);
    });
    it('pulls out flags properly', function() {
      let chk = readelf.match(/Flags:\s*(0x(?:.*))\n/);
      expect(chk).not.null;
      chk = parseInt(chk[1]);
      expect(ehdr.e_flags).equal(chk);
    });
    it('buffer property matches original buffer', function() {
      expect(Buffer.compare(ehdr.buffer,fbuff.slice(0,ehdr.e_ehsize))).equal(0);
    })
  });
});
