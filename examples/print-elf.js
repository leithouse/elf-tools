#!/usr/bin/env node

const PROG='/bin/ls';
console.log(`Printing contents of ${PROG}\n`);

ELF = require('..');
ELF.mkFromFile(PROG).then( elf => console.log(elf.toString()));
