#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing (some) relocations for ${PROG}\n`);
ELF = require('..');
ELF.mkFromFile(PROG).then((elf) => {
  // Section Header table
  let {shdr} = elf;
  // Lookup section by name
  let section = shdr.lookup('.rela.plt');
  console.log(section.toString());
  console.log();
  console.log(section.relTab.toString());
});
