#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing section header table for ${PROG}\n`);
ELF = require('..');
ELF.mkFromFile(PROG).then((elf) => {
  // Section Header table
  let {shdr} = elf;
  console.log(shdr.toString());
});
