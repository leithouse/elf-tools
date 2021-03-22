process.env.NODE_ENV='dev';
const {stringifyConst,PT} = require('../lib/constants'),
                 {expect} = require('chai'),
                     EHdr = require('../lib/ehdr'),
                     PHdr = require('../lib/phdr'),
                PHdrTable = require('../lib/phdr-table'),
                      fsp = require('fs').promises,
               {execSync} = require('child_process');

const TEST_PROG = '/bin/ls';

const tableRE = '(\\w*)\\s{1,}((?:\\w|\\d){18})\\s{1,}((?:\\w|\\d){18})\\s{1,}((?:\\w|\\d){18})\\s{1,}((?:\\w|\\d){18})\\s{1,}((?:\\w|\\d){18})  (.{3})\\s{1,}(0x(?:\\d|\\w){1,})';

describe('PHdr', function() {
  let fpath, fbuff, readelf, readelfTable; 
  before(async function() {
    fpath = TEST_PROG;
    fbuff = await fsp.readFile(fpath);
    readelf = execSync('/bin/readelf -l '+fpath).toString();
    readelfTable = [];
    readelf.match(new RegExp(tableRE,'g')).forEach((row)=>{
      let i = readelfTable.push(row.split(/\s{1,}/)) - 1;
      if(readelfTable[i].length == 9) {
        readelfTable[i][6] = 'R E';
        readelfTable[i][7] = readelfTable[i][8];
        readelfTable[i].pop();
      }
    });
  });
  describe('PHdrTable.buildFromHandle()', function() {
    let fhandle,ehdr,table;
    before(async function() {
      fhandle = await fsp.open(fpath,'r');
      ehdr = new EHdr();
      await ehdr.buildFromHandle(fhandle);
      table = new PHdrTable(ehdr);
      await table.buildFromHandle(fhandle);
    });
    after(async function() {
      await fhandle.close();
    });
    it('doesn\'t throw', function() {
      // tests before
    });
    it('populates same number of headers as defined', function() {
      expect(table).length(ehdr.e_phnum);
    });
    it('fills table with PHdr instances', function() {
      table.forEach((hdr)=>expect(hdr).instanceof(PHdr));
    });
    it('header buffer sizes match definition in ehdr', function() {
      table.forEach((hdr)=>expect(hdr.buffer).length(ehdr.e_phentsize));
    });
    it('header data matches that reported by readelf -l', function() {
      table.forEach((hdr,i)=>{
        let chk = [];
        chk.push(stringifyConst(hdr.p_type,PT).replace('PT_',''));
        ['p_offset','p_vaddr','p_paddr','p_filesz','p_memsz'].forEach((key)=>{
          chk.push('0x'+hdr[key].toString(16).padStart(16,'0'));
        });
        let flags = '';
        if((hdr.p_flags&4)==4)
          flags += 'R';
        if((hdr.p_flags&2)==2)
          flags += 'W';
        else
          flags += ' ';
        if((hdr.p_flags&1)==1)
          flags += 'E';
        chk.push(flags.trim());
        chk.push('0x'+hdr.p_align.toString(16));
        expect(chk).eql(readelfTable[i]);
      });
    });
    it('buffer property returns same binary data as read', function() {
      let size = ehdr.e_phentsize * ehdr.e_phnum;
      let start = parseInt(ehdr.e_phoff);
      let chk = fbuff.slice(start,start+size);
      expect(Buffer.compare(chk,table.buffer)).equal(0);
    });
  });
  describe('PHdrTable.buildFromBuffer()', function() {
    let fhandle,ehdr,table;
    before(async function() {
      ehdr = new EHdr();
      await ehdr.buildFromBuffer(fbuff);
      table = new PHdrTable(ehdr);
      await table.buildFromBuffer(fbuff);
    });
    it('buffer property returns same binary data as read', function() {
      let size = ehdr.e_phentsize * ehdr.e_phnum;
      let start = parseInt(ehdr.e_phoff);
      let chk = fbuff.slice(start,start+size);
      expect(Buffer.compare(chk,table.buffer)).equal(0);
    });
    it('attaches segment data', function() {
      table.forEach((entry)=>{
        if(entry.p_filesz) {
          expect(entry.data).instanceof(Buffer);
          expect(entry.data).length(entry.p_filesz);
        }
        else
          expect(entry.data).null;
      });
    });
  });
});
