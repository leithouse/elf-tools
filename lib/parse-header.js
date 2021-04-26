const constants = require('./constants'),
      fsp = require('fs').promises;

let hexChk ='(?<hex>0x[0-9a-fA-F]{1,}\\b)';
let relChk = '(?:\\(\\w{1,}_(?<relTo>\\w{1,})\\s{0,}\\+\\s{0,}(?<relPlus>\\d{1,}))'
const defRE = {
  EM:   `\\s{0,}#define\\s{1,}EM_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|(?<num>\\d{1,}))`,
  DT:   `\\s{0,}#define\\s{1,}DT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|${relChk})`,
  PT:   `\\s{0,}#define\\s{1,}PT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|${relChk})`,
  NT:   `\\s{0,}#define\\s{1,}NT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|(?<num>\\d{1,}))`,
  SHT: `\\s{0,}#define\\s{1,}SHT_(?<name>\\w{1,})\\s{1,}(?:${hexChk}|${relChk})`,
}
const structRE = {
  bytes: 'unsigned\\s{1,}char\\s{1,}(?<name>\\w{1,})\\s{0,}\\[(?<size>\\d{1,})\\]',
  long: 'long\\s{1,}(?<name>\\w{1,}\\b)',
  uint: 'uint(?<size>\\d{2})_t\\s{1,}(?<name>\\w{1,});',
  end: '}\\s{0,}(\\w{1,}\\b)'
}

/**
 * @param opt         {String} Header file path
 * @param opt         {JSON} Options
 * @param opt.fpath   {String} Header file path
 * @param opt.jsonOut {String} File path to write out JSON to
 * @async
 * @returns parsed  {JSON}
 * @returns parsed.DT  {Object} Name => Int
 * @returns parsed.SHT {Object} Name => Int
 * @returns parsed.NT  {Object} Name => Int
 * @returns parsed.PT  {Object} Name => Int
 * @returns parsed.struct {Object} Name => StructInfo[]
 */
const parseHeader = async (opt) => {
  if(typeof opt == 'string')
    opt = { fpath: opt };
  let {fpath,jsonOut} = opt;

  const data = await fsp.readFile(fpath,'utf8');
  const parsed = {
    EM:  {},
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
          else if(key == 'uint')
            struct.push({key:name,size:parseInt(size),dflt:0});
        }
      }
    }
  });
  if(jsonOut)
    await fsp.writeFile(jsonOut,JSON.stringify(parsed,null,'  '));
  return parsed;
}
module.exports = parseHeader;
