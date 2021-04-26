const genArch = require('./gen-arch'),
       genGrp = require('./gen-grp'),
       genDyn = require('./gen-dynamic'),
    genUnwind = require('./gen-unwind').all,
  genVersions = require('./gen-ver'),
     genNotes = require('./gen-notes').all,
   genLibList = require('./gen-liblist'),
genAttributes = require('./gen-attributes').all,
    genSymbol = require('./gen-symbol').all,
     genReloc = require('./gen-relocs').all;

const genEng = async (outDir='.') => {
  await Promise.all([
    genArch(outDir),
    genGrp(outDir),
    genDyn(outDir),
    genUnwind(outDir),
    genVersions(outDir),
    genNotes(outDir),
    genLibList(outDir),
    genAttributes(outDir),
    genSymbol(outDir),
    genReloc(outDir)
  ]);
}

const main = async () => {
  if(process.argv[2] && /\-h/.test(process.argv[2])) {
    console.log('Specify output directory via env var\nOUT_DIR=../foobar\nDefault to \'.\'');
    process.exit(0);
  }
  let outDir = process.env.OUT_DIR || '.';
  await genEng(outDir);
}

if(require.main==module)
  main();
else
  module.exports = genEng;

