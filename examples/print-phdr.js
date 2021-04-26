#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing program header table for ${PROG}\n`);
ELF = require('..');
ELF.mkFromFile(PROG).then((elf) => {
  // Program Header table
  let {phdr} = elf;
  console.log(phdr.toString());
});
