#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing dynamic tags for ${PROG}\n`);
ELF = require('..');
ELF.mkFromFile(PROG).then((elf) => {
  // Section Header table
  let {shdr} = elf;
  // Lookup section by name
  let section = shdr.lookup('.dynamic');
  console.log(section.toString());
  console.log();
  console.log(section.dynTags.toString());
});
