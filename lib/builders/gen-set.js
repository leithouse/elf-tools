const genElf = require('./gen-elf'),
     genEHdr = require('./gen-ehdr'),
         fsp = require('fs').promises,
      assert = require('assert'),
        path = require('path'),
   headerDir = path.resolve(__dirname,'..','headers');

const genSet = async (outDir) => {
  assert(outDir,'Must specify output directory');
  let ls = await fsp.readdir(headerDir);
  let rd = async (name)=> {
    let data = await fsp.readFile(path.join(headerDir,name+'.json'),'utf8');
    return JSON.parse(data);
  }
  let common = await rd('common');
  let external = await rd('external');
  for(let i in ls) {
    let key = ls[i];
    let chk = genEHdr(key.match(/(.*)\.json/)[1]);
    if(!chk)
      continue;
    console.log(`Generating elf corresponding to ${key}`);
    let elf = await genElf({key,outDir,common});
    console.log(elf.addressString());
    console.log();
  };
}

const main = async () => {
  if(process.argv[2] && /\-h/.test(process.argv[2])) {
    console.log('Specify output directory via env var\nOUT_DIR=../foobar\nDefault to \'.\'');
    process.exit(0);
  }
  let outDir = process.env.OUT_DIR || '.';
  await genSet(outDir);
}

if(require.main==module)
  main();
else
  module.exports = genSet;
