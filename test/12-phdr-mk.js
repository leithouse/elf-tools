const PHdrTable = require('../lib/phdr-table'),
           EHdr = require('../lib/ehdr'),
           PHdr = require('../lib/phdr'),
           SHdr = require('../lib/shdr'),
      SHdrTable = require('../lib/shdr-table'),
      constants = require('../lib/constants'),
       {expect} = require('chai');

describe('PHdr building', function() {
  let table,load,load2,ehdr,level1,level2;
  before(function() {
    ehdr = new EHdr();
    table = new PHdrTable(ehdr);
  });
  describe('PHdrTable.addSegment() LOAD', function() {
    before(function() {
      load = table.addSegment({
        p_align:0x1000,
        p_type: constants.PT.LOAD,
        p_filesz: 0x0,
      });
    });
    it('returns a PHdr', function() {
      expect(load).instanceof(PHdr);
    });
    it('updates ehdr.e_phnum', function() {
      expect(ehdr.e_phnum).equal(1);
    });
    it('first segment added gets p_offset = p_vaddr = p_paddr = 0x0', function() {
      expect(load.p_offset).equal(load.p_vaddr).equal(load.p_paddr).equal(BigInt(0));
    });
    it('second segment added gets p_offset=p_vaddr=p_paddr = next address that aligns', function(){ 
      load2 = table.addSegment({
        p_align:0x100,
        p_type: constants.PT.LOAD,
        shdr: new SHdr({
          ehdr,
          sh_size:0x100
        })
      });
      expect(load2.p_offset).equal(load2.p_vaddr).equal(load2.p_paddr).equal(BigInt(0x0));
    });
    it('sets filesz = memsz = data length if shdr supplied and filesz not', function() {
      expect(load2.p_filesz).equal(load2.p_memsz).equal(BigInt(0x100));
    });
    it('adds SHdr to segment', function() {
      expect(load2.sections).length(1);
    });
  });
  describe('PHdrTable.addSegment() level 1 sub segment', function() {
    // 0x0 > LOAD 1
    // 0x0 < LOAD 1
    // 0x0 > LOAD 2
    // 0x0 > Section 1
    // 0x100 < Section 1
    // 0x100 < LOAD 2
    let segment;
    before(function() {
      segment = table.addSegment({
        p_align:BigInt(0x8),
        p_type: constants.PT.NOTE,
        parentSegment: load,
        shdr: new SHdr({
          ehdr,
          sh_size:0x21
        })
      });
      level1 = segment;
    });
    it('updates ehdr.e_phnum', function() {
      expect(ehdr.e_phnum).equal(3);
    });
    it('first sub segment gets offset to beginning of parent if alignment matches', function() {
      expect(segment.p_offset).equal(BigInt(0x0));
    });
    it('updates parent filesz and memsz if segment section has bits', function() {
      expect(load.p_filesz).equal(load.p_memsz).equal(0x21n);
    });
    it('updates offset of next load section', function() {
      expect(load2.p_offset).equal(0x100n);
    });
    it('updates addresses of next load section', function() {
      expect(load2.p_paddr).equal(load2.p_vaddr).equal(0x100n);
    });
    it('updates section offset in next load section', function() {
      expect(load2.sections[0].sh_offset).equal(0x100n);
    });
    it('second sub segment gets offset to next spot that matches alignment', function() {
      segment = table.addSegment({
        p_align:0x8n,
        p_type: constants.PT.NOTE,
        parentSegment: load,
        shdr: new SHdr({
          ehdr,
          sh_size:0x100
        })
      });
      expect(segment.p_offset).equal(BigInt(0x28));
    });
    it('if size overflows parent segment, parent segment file size is adjusted', function() {
      expect(load.p_filesz).equal(BigInt(0x128));
    });
    it('if size overflows parent segment, parent segment mem size is adjusted', function() {
      expect(load.p_memsz).equal(BigInt(0x128));
    });
    it('if size overflows parent and parent is LOAD, the next LOAD is adjusted', function() {
      expect(load2.p_offset).equal(0x200n);
    });
  });
  describe('PHdrTable.addSegment() level 2 sub segment', function() {
    // 0x000 > LOAD 1
    // 0x000 > NOTE 1
    // 0x000 > Section 1
    // 0x021 < Section 1
    // 0x021 < NOTE 1
    // 0x028 > NOTE 2
    // 0x028 > Section 3
    // 0x128 < Section 3
    // 0x128 < NOTE 2
    // 0x128 < LOAD 1
    // 0x200 > LOAD 2
    // 0x200 > Section 1
    // 0x300 < Section 1
    // 0x300 < LOAD 2
    let segment;
    before(function() {
      segment = table.addSegment({
        p_align:0x8n,
        p_type: constants.PT.NOTE,
        parentSegment: level1,
        shdr: new SHdr({
          ehdr,
          sh_size:0x100
        })
      });
      level2 = segment;
    });
    it('updates ehdr.e_phnum', function() {
      expect(ehdr.e_phnum).equal(5);
    });
    it('sets offset as expected, after existing segment', function() {
      expect(segment.p_offset).equal(0x28n);
    });
    it('updates next segment in load', function() {
      expect(load.subSegments[1].p_offset).equal(0x128n);
    });
    it('if size overflows parent segment, parent segment file size is adjusted', function() {
      expect(level1.p_filesz).equal(0x128n);
    });
    it('if size overflows parent segment, parent segment mem size is adjusted', function() {
      expect(level1.p_memsz).equal(BigInt(0x128));
    });
    it('size adjustment cascades up to load', function() {
      expect(load2.p_offset).equal(0x300n);
    });
  });
  describe('addSection', function() {
    let pre, shdr, preSz;
    before(function() {
      preSz = load.p_filesz;
      pre = load.sections.length;
      shdr = new SHdr({
        ehdr,
        sh_size:0x100
      })
      table.addSection(shdr);
    });
    it('doesn\'t throw', function() {
    });
    it('adds to first LOAD by default', function() {
      expect(load.sections.length).equal(pre+1);
      expect(load.sections).includes(shdr);
    });
    it('updates segment size', function() {
      expect(load.p_filesz).equal(preSz+0x100n);
    });
  });
  describe('mkSkeleton()', function() {
    let skel;
    before(function() {
      skel = PHdrTable.mkSkeleton(ehdr);
    });
    it('doesn\'t throw', function() {
      // tests before
    });
    it('returns a PHdrTable instance', function() {
      expect(skel).instanceof(PHdrTable);
    });
    it('adds two segments to the table, PHDR followed by LOAD', function() {
      expect(skel.length).equal(2);
      expect(skel[1].p_type).equal(constants.PT.LOAD);
      expect(skel[0].p_type).equal(constants.PT.PHDR);
    });
    it('sets offset of phdr appropriately', function() {
      expect(skel[0].p_offset).equal(0x40n);
    });
    it('nests PHDR in LOAD', function() {
      expect(skel[0].parentSegment).equal(skel[1]);
      expect(skel[1].subSegments[0]).equal(skel[0]);
    });
  });
});
