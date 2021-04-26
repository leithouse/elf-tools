### elf-tools nodeJS package


#### ELF generation
This package was built to create arbitrary ELF files in the pursuit of building a quality fuzzing corpus.

To recreate the generated brute force corpus:
```
OUT_DIR=/path/for/brute-force node lib/builders/gen-set.js
```

To recreate the generated engineered corpus:
```
OUT_DIR=/path/for/engineered node lib/builders/gen-engineered.js
```


#### ELF parsing

The package can also be used to parse existing ELF files. For examples of this, see examples/


#### Notes

Header files were parsed out of binutils/include/elf and saved as JSON in lib/headers

There are no third party packages required, and it is theoretically platform independent, although it has only been used on a linux machine.

JSDocs are compiled to API.md
