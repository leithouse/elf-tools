const constants = require('./constants'),
      fsp = require('fs').promises;

let hexChk ='(?<hex>0x[0-9a-fA-F]{1,}\\b)';
let relChk = '(?:\\(\\w{1,}_(?<relTo>\\w{1,})\\s{0,}\\+\\s{0,}(?<relPlus>\\d{1,}))'
const defRE = {
  DT:   `\\s{0,}#define\\s{1,}DT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|${relChk})`,
  PT:   `\\s{0,}#define\\s{1,}PT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|${relChk})`,
  NT:   `\\s{0,}#define\\s{1,}NT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|(?<num>\\d{1,}))`,
  SHT: `\\s{0,}#define\\s{1,}SHT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|${relChk})`,
}
const structRE = {
  bytes: 'unsigned\\s{1,}char\\s{1,}(?<name>\\w{1,})\\s{0,}\\[(?<size>\\d{1,})\\]',
  long: 'long\\s{1,}(?<name>\\w{1,}\\b)',
  end: '}\\s{0,}(\\w{1,}\\b)'
}

const parse = async (file) => {
  file = '/home/null/school/practicum/fuzzing-seed/andrew/binutils-gdb/include/elf/ia64.h';

  const data = await fsp.readFile(file,'utf8');
  const parsed = {
    DT:  {},
    SHT: {},
    PT:  {},
    NT:  {},
    structs: {}
  }
  let struct = null;
  let isComment;
  data.split('\n').forEach((line)=>{
    if(line.trim() == '')
      return;
    if(new RegExp('^\\s{0,}\\/\\*').test(line))
      isComment = true;
    if(isComment) {
      if(new RegExp('\\*\\/\\s{0,}$').test(line))
        isComment = false;
      return;
    }
    for(let key in defRE) {
      let re = new RegExp(defRE[key],'m');
      let match = line.match(re);
      if(match) {
        struct = null;
        let val;
        let {name,hex,relTo,relPlus,num} = match.groups;
        if(hex)
          val = parseInt(hex);
        else if(relTo && relPlus)
          val = constants[key][relTo] + parseInt(relPlus);
        else if(num)
          val = parseInt(num);
        else
          return;
        parsed[key][name] = val;
        return;
      }
    }
    if(/typedef struct/.test(line))
      struct = [];
    else if(struct) {
      for(let key in structRE) {
        let match = line.match(new RegExp(structRE[key]));
        if(match) {
          if(key == 'end') {
            if(!(/internal/i.test(match[1])))
              parsed.structs[match[1]] = struct;
            struct = null;
            return;
          }
          let {name,size} = match.groups;
          if(key == 'bytes')
            struct.push({key:name,size:parseInt(size)*8,dflt:0});
          else if(key == 'long')
            struct.push({key:name,size:8,dflt:0});
        }
      }
    }
  });
  return parsed;
}
module.exports = parse;
