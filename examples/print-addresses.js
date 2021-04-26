#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing address map for ${PROG}\n`);
ELF = require('..');
ELF.mkFromFile(PROG).then( elf => console.log(elf.addressString()));
