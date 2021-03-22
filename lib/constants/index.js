const ELFCLASS = {
  toString: () => 'ELFCLASS',
  NONE: 0,
  '32': 1,
  '64': 2,
}

const ELFDATA = {
  toString: () => 'ELFDATA',
  NONE: 0,
  '2LSB': 1,
  '2MSG': 2
}

const EV = {
  toString: () => 'EV_',
  NONE: 0,
  CURRENT: 1
}

const ET = {
  toString: () => 'ET_',
  NONE: 0,
   REL: 1,
  EXEC: 2,
   DYN: 3,
  CORE: 4
}

const EI_NIDENT = 16;

const parseInput = (input,constStruct) => {
  if(typeof input == 'string') {
    input = input.toUpperCase();
    if(constStruct[input])
      return constStruct[input];
    input = `${constStruct}${input}`;
    if(constStruct[input])
      return constStruct[input];
  }
  else if(typeof input == 'number')
    return input;
  throw new Error(`Unrecognized const ${input} in ${constStruct}`);
}

const stringifyConst = (val,constStruct)=>{
  let ret = constStruct.toString();
  let found;
  for(let key in constStruct) {
    if(constStruct[key] == val) {
      found = true;
      ret += key;
      break;
    }
  }
  if(!found)
    ret += '?';
  return ret;
}

module.exports = {
  EI_NIDENT,
  ELFCLASS,
  ELFDATA,
  ELFOSABI: require('./ELFOSABI'),
  DT:  require('./DT'),
  EM:  require('./EM'),
  ET:  require('./ET'),
  EV,
  NT:  require('./NT'),
  PT:  require('./PT'),
  SHT: require('./SHT'),
  STB: require('./STB'),
  STT: require('./STT'),
  STV: require('./STV'),
  parseInput,
  stringifyConst
}
