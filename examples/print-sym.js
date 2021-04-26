#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing dynamic symbols for ${PROG}\n`);
ELF = require('..');
ELF.mkFromFile(PROG).then((elf) => {
  // Section Header table
  let {shdr} = elf;
  // Lookup section by name
  let section = shdr.lookup('.dynsym');
  console.log(section.toString());
  console.log();
  console.log(section.symTab.toString());
});
