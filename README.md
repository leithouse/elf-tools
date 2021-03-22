## Classes

<dl>
<dt><a href="#Dyn">Dyn</a></dt>
<dd></dd>
<dt><a href="#DynTags">DynTags</a></dt>
<dd></dd>
<dt><a href="#EHdr">EHdr</a></dt>
<dd></dd>
<dt><a href="#E_Ident">E_Ident</a></dt>
<dd></dd>
<dt><a href="#Elf">Elf</a></dt>
<dd></dd>
<dt><a href="#MipsAbiFlags">MipsAbiFlags</a></dt>
<dd></dd>
<dt><a href="#Note">Note</a></dt>
<dd></dd>
<dt><a href="#Notes">Notes</a></dt>
<dd></dd>
<dt><a href="#PHdr">PHdr</a></dt>
<dd></dd>
<dt><a href="#PHdrTable">PHdrTable</a></dt>
<dd></dd>
<dt><a href="#Rel">Rel</a></dt>
<dd></dd>
<dt><a href="#RelTab">RelTab</a></dt>
<dd></dd>
<dt><a href="#SHdr">SHdr</a></dt>
<dd><p>Other props</p>
</dd>
<dt><a href="#SHdrTable">SHdrTable</a></dt>
<dd></dd>
<dt><a href="#StrTab">StrTab</a></dt>
<dd></dd>
<dt><a href="#Sym">Sym</a></dt>
<dd></dd>
<dt><a href="#SymTab">SymTab</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#buff2struct">buff2struct()</a> ⇒ <code>JSON</code></dt>
<dd></dd>
<dt><a href="#struct2buff">struct2buff()</a> ⇒ <code>JSON</code></dt>
<dd></dd>
<dt><a href="#sizeOfStruct">sizeOfStruct()</a> ⇒ <code>Integer</code></dt>
<dd></dd>
<dt><a href="#struct2string">struct2string(struct)</a> ⇒ <code>String</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#StructProp">StructProp</a> : <code>JSON</code></dt>
<dd></dd>
</dl>

<a name="Dyn"></a>

## Dyn
**Kind**: global class  

* [Dyn](#Dyn)
    * [new Dyn()](#new_Dyn_new)
    * [.structProps](#Dyn+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#Dyn+buffer) : <code>Buffer</code>
    * [.toString()](#Dyn+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#Dyn+buildFromBuffer) ⇒ [<code>PHdr</code>](#PHdr)

<a name="new_Dyn_new"></a>

### new Dyn()

| Param | Type |
| --- | --- |
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 
| [opt.d_tag] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.d_un] | <code>Integer</code> \| <code>BigInt</code> | 

<a name="Dyn+structProps"></a>

### dyn.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>Dyn</code>](#Dyn)  
**Read only**: true  
<a name="Dyn+buffer"></a>

### dyn.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>Dyn</code>](#Dyn)  
**Read only**: true  
<a name="Dyn+toString"></a>

### dyn.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Dyn</code>](#Dyn)  
<a name="Dyn+buildFromBuffer"></a>

### dyn.buildFromBuffer(buff) ⇒ [<code>PHdr</code>](#PHdr)
Build from buff

**Kind**: instance method of [<code>Dyn</code>](#Dyn)  
**Returns**: [<code>PHdr</code>](#PHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="DynTags"></a>

## DynTags
**Kind**: global class  

* [DynTags](#DynTags)
    * [new DynTags(shdr)](#new_DynTags_new)
    * _instance_
        * [.toString()](#DynTags+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#DynTags+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
        * [.addDyn()](#DynTags+addDyn) ⇒
    * _static_
        * [.Dyn](#DynTags.Dyn) : <code>Prototype</code>

<a name="new_DynTags_new"></a>

### new DynTags(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="DynTags+toString"></a>

### dynTags.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>DynTags</code>](#DynTags)  
<a name="DynTags+buildFromBuffer"></a>

### dynTags.buildFromBuffer(buff) ⇒ [<code>SymTab</code>](#SymTab)
**Kind**: instance method of [<code>DynTags</code>](#DynTags)  
**Returns**: [<code>SymTab</code>](#SymTab) - This instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="DynTags+addDyn"></a>

### dynTags.addDyn() ⇒
Adds a new dynamic tag

**Kind**: instance method of [<code>DynTags</code>](#DynTags)  
**Returns**: Dyn  

| Param | Type |
| --- | --- |
| opt.d_tag | <code>DT</code> | 
| opt.d_un | <code>Integer</code> \| <code>BigInt</code> | 

<a name="DynTags.Dyn"></a>

### DynTags.Dyn : <code>Prototype</code>
**Kind**: static property of [<code>DynTags</code>](#DynTags)  
**Read only**: true  
<a name="EHdr"></a>

## EHdr
**Kind**: global class  

* [EHdr](#EHdr)
    * [new EHdr()](#new_EHdr_new)
    * [.e_ident](#EHdr+e_ident) : [<code>E\_Ident</code>](#E_Ident)
    * [.structProps](#EHdr+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#EHdr+buffer) : <code>Buffer</code>
    * [.toString()](#EHdr+toString) ⇒ <code>String</code>
    * [.buildFromHandle(handle)](#EHdr+buildFromHandle) ⇒ [<code>EHdr</code>](#EHdr)
    * [.buildFromBuffer(buff)](#EHdr+buildFromBuffer) ⇒ [<code>EHdr</code>](#EHdr)

<a name="new_EHdr_new"></a>

### new EHdr()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opt.e_ident] | [<code>E\_Ident</code>](#E_Ident) |  | } |
| [opt.e_ident] | <code>JSON</code> |  | Parameters for new E_Ident |
| [opt.e_machine] | <code>EM</code> |  | Default x86-64 |
| [opt.e_version] | <code>EV</code> |  | Default current |
| [opt.e_entry] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.e_phoff] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.e_shoff] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.e_flags] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_phnum] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_shentsize] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_shnum] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_shstrndx] | <code>Integer</code> | <code>0</code> |  |

<a name="EHdr+e_ident"></a>

### eHdr.e\_ident : [<code>E\_Ident</code>](#E_Ident)
**Kind**: instance property of [<code>EHdr</code>](#EHdr)  
<a name="EHdr+structProps"></a>

### eHdr.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>EHdr</code>](#EHdr)  
**Read only**: true  
<a name="EHdr+buffer"></a>

### eHdr.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>EHdr</code>](#EHdr)  
**Read only**: true  
<a name="EHdr+toString"></a>

### eHdr.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>EHdr</code>](#EHdr)  
<a name="EHdr+buildFromHandle"></a>

### eHdr.buildFromHandle(handle) ⇒ [<code>EHdr</code>](#EHdr)
Build from open FileHandle

**Kind**: instance method of [<code>EHdr</code>](#EHdr)  
**Returns**: [<code>EHdr</code>](#EHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| handle | <code>fs~FileHandle</code> | 

<a name="EHdr+buildFromBuffer"></a>

### eHdr.buildFromBuffer(buff) ⇒ [<code>EHdr</code>](#EHdr)
Build from buffer

**Kind**: instance method of [<code>EHdr</code>](#EHdr)  
**Returns**: [<code>EHdr</code>](#EHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="E_Ident"></a>

## E\_Ident
**Kind**: global class  

* [E_Ident](#E_Ident)
    * [new E_Ident()](#new_E_Ident_new)
    * [.structProps](#E_Ident+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#E_Ident+buffer) : <code>Int8Array</code>
    * [.toString()](#E_Ident+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#E_Ident+buildFromBuffer) ⇒ [<code>E\_Ident</code>](#E_Ident)

<a name="new_E_Ident_new"></a>

### new E\_Ident()

| Param | Type |
| --- | --- |
| opt.ei_class | <code>ELFCLASS</code> | 
| opt.ei_data | <code>ELFDATA</code> | 
| opt.ei_version | <code>EV</code> | 
| opt.ei_osabi | <code>ELFOSABI</code> | 
| opt.ei_abiversion | <code>Integer</code> | 

<a name="E_Ident+structProps"></a>

### e_Ident.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>E\_Ident</code>](#E_Ident)  
**Read only**: true  
<a name="E_Ident+buffer"></a>

### e_Ident.buffer : <code>Int8Array</code>
**Kind**: instance property of [<code>E\_Ident</code>](#E_Ident)  
**Read only**: true  
<a name="E_Ident+toString"></a>

### e_Ident.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>E\_Ident</code>](#E_Ident)  
<a name="E_Ident+buildFromBuffer"></a>

### e_Ident.buildFromBuffer(buff) ⇒ [<code>E\_Ident</code>](#E_Ident)
**Kind**: instance method of [<code>E\_Ident</code>](#E_Ident)  
**Returns**: [<code>E\_Ident</code>](#E_Ident) - this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="Elf"></a>

## Elf
**Kind**: global class  

* [Elf](#Elf)
    * [new Elf()](#new_Elf_new)
    * _instance_
        * [.buffer](#Elf+buffer) : <code>Buffer</code>
        * [.fullSize](#Elf+fullSize) : <code>Integer</code>
        * [.N](#Elf+N) : <code>Integer</code>
        * [.LE](#Elf+LE) : <code>Boolean</code>
        * [.toString()](#Elf+toString) ⇒ <code>String</code>
        * [.addSection(opt)](#Elf+addSection) ⇒ [<code>SHdr</code>](#SHdr)
        * [.addSegment(opt)](#Elf+addSegment) ⇒ [<code>PHdr</code>](#PHdr)
        * [.recompute()](#Elf+recompute)
        * [.writeToFile(fpath)](#Elf+writeToFile) ⇒ <code>String</code>
    * _static_
        * [.mkFromFile(fpath)](#Elf.mkFromFile) ⇒ [<code>Elf</code>](#Elf)
        * [.mkSkeleton(opt)](#Elf.mkSkeleton) ⇒ [<code>Elf</code>](#Elf)

<a name="new_Elf_new"></a>

### new Elf()
ehdr and buff are mutually exclusive


| Param | Type | Description |
| --- | --- | --- |
| opt.ehdr | <code>JSON</code> | Passed directly to {EHdr} |
| opt.buff | <code>Buffer</code> | Build Elf from buffer |

<a name="Elf+buffer"></a>

### elf.buffer : <code>Buffer</code>
Returns a newly allocated and populated buffer

**Kind**: instance property of [<code>Elf</code>](#Elf)  
**Read only**: true  
<a name="Elf+fullSize"></a>

### elf.fullSize : <code>Integer</code>
**Kind**: instance property of [<code>Elf</code>](#Elf)  
**Read only**: true  
<a name="Elf+N"></a>

### elf.N : <code>Integer</code>
32 or 64

**Kind**: instance property of [<code>Elf</code>](#Elf)  
**Read only**: true  
<a name="Elf+LE"></a>

### elf.LE : <code>Boolean</code>
**Kind**: instance property of [<code>Elf</code>](#Elf)  
**Read only**: true  
<a name="Elf+toString"></a>

### elf.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Elf</code>](#Elf)  
<a name="Elf+addSection"></a>

### elf.addSection(opt) ⇒ [<code>SHdr</code>](#SHdr)
**Kind**: instance method of [<code>Elf</code>](#Elf)  
**Uses**: [<code>addSection</code>](#SHdrTable+addSection)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>JSON</code> |  | All parameters for {SHdrTable#addSection} |
| [opt.setAddr] | <code>Boolean</code> | <code>false</code> | Set sh_addr = sh_offset |
| [opt.segment] | [<code>PHdr</code>](#PHdr) |  | Segment to add section to |
| [opt.segment] | <code>Integer</code> |  | Index of segment to add section to |

<a name="Elf+addSegment"></a>

### elf.addSegment(opt) ⇒ [<code>PHdr</code>](#PHdr)
**Kind**: instance method of [<code>Elf</code>](#Elf)  
**Uses**: [<code>addSegment</code>](#PHdrTable+addSegment)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt | <code>JSON</code> |  | All parameters for {PHdrTable#addSegment} |
| [opt.setAddr] | <code>Boolean</code> | <code>false</code> | Set p_vaddr = p_paddr = p_offset |

<a name="Elf+recompute"></a>

### elf.recompute()
Calls recompute on EHdr, PHdrTable and SHdrTable

**Kind**: instance method of [<code>Elf</code>](#Elf)  
<a name="Elf+writeToFile"></a>

### elf.writeToFile(fpath) ⇒ <code>String</code>
Writes ELF to file

**Kind**: instance method of [<code>Elf</code>](#Elf)  
**Returns**: <code>String</code> - file path  

| Param | Type |
| --- | --- |
| fpath | <code>String</code> | 

<a name="Elf.mkFromFile"></a>

### Elf.mkFromFile(fpath) ⇒ [<code>Elf</code>](#Elf)
Build ELF from file

**Kind**: static method of [<code>Elf</code>](#Elf)  

| Param | Type | Description |
| --- | --- | --- |
| fpath | <code>String</code> | Path to elf file |

<a name="Elf.mkSkeleton"></a>

### Elf.mkSkeleton(opt) ⇒ [<code>Elf</code>](#Elf)
Build basic elf skeleton

**Kind**: static method of [<code>Elf</code>](#Elf)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Options</code> | Options for EHdr |

<a name="MipsAbiFlags"></a>

## MipsAbiFlags
**Kind**: global class  

* [MipsAbiFlags](#MipsAbiFlags)
    * [new MipsAbiFlags()](#new_MipsAbiFlags_new)
    * [.structProps](#MipsAbiFlags+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#MipsAbiFlags+buffer) : <code>Buffer</code>
    * [.toString()](#MipsAbiFlags+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#MipsAbiFlags+buildFromBuffer) ⇒ [<code>SHdr</code>](#SHdr)

<a name="new_MipsAbiFlags_new"></a>

### new MipsAbiFlags()

| Param | Type |
| --- | --- |
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 

<a name="MipsAbiFlags+structProps"></a>

### mipsAbiFlags.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>MipsAbiFlags</code>](#MipsAbiFlags)  
**Read only**: true  
<a name="MipsAbiFlags+buffer"></a>

### mipsAbiFlags.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>MipsAbiFlags</code>](#MipsAbiFlags)  
**Read only**: true  
<a name="MipsAbiFlags+toString"></a>

### mipsAbiFlags.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>MipsAbiFlags</code>](#MipsAbiFlags)  
<a name="MipsAbiFlags+buildFromBuffer"></a>

### mipsAbiFlags.buildFromBuffer(buff) ⇒ [<code>SHdr</code>](#SHdr)
Build from buff

**Kind**: instance method of [<code>MipsAbiFlags</code>](#MipsAbiFlags)  
**Returns**: [<code>SHdr</code>](#SHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="Note"></a>

## Note
**Kind**: global class  

* [Note](#Note)
    * [new Note()](#new_Note_new)
    * [.structProps](#Note+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#Note+buffer) : <code>Buffer</code>
    * [.fullSize](#Note+fullSize) : <code>Integer</code> \| <code>BigInt</code>
    * [.toString()](#Note+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#Note+buildFromBuffer) ⇒ [<code>PHdr</code>](#PHdr)

<a name="new_Note_new"></a>

### new Note()

| Param | Type |
| --- | --- |
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 
| [opt.n_namesz] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.n_descz] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.n_type] | <code>Integer</code> \| <code>BigInt</code> | 

<a name="Note+structProps"></a>

### note.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>Note</code>](#Note)  
**Read only**: true  
<a name="Note+buffer"></a>

### note.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>Note</code>](#Note)  
**Read only**: true  
<a name="Note+fullSize"></a>

### note.fullSize : <code>Integer</code> \| <code>BigInt</code>
Size of struct + note data

**Kind**: instance property of [<code>Note</code>](#Note)  
**Read only**: true  
<a name="Note+toString"></a>

### note.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Note</code>](#Note)  
<a name="Note+buildFromBuffer"></a>

### note.buildFromBuffer(buff) ⇒ [<code>PHdr</code>](#PHdr)
Build from buff

**Kind**: instance method of [<code>Note</code>](#Note)  
**Returns**: [<code>PHdr</code>](#PHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="Notes"></a>

## Notes
**Kind**: global class  

* [Notes](#Notes)
    * [new Notes(shdr)](#new_Notes_new)
    * _instance_
        * [.toString()](#Notes+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#Notes+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
    * _static_
        * [.Note](#Notes.Note) : <code>Prototype</code>

<a name="new_Notes_new"></a>

### new Notes(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="Notes+toString"></a>

### notes.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Notes</code>](#Notes)  
<a name="Notes+buildFromBuffer"></a>

### notes.buildFromBuffer(buff) ⇒ [<code>SymTab</code>](#SymTab)
**Kind**: instance method of [<code>Notes</code>](#Notes)  
**Returns**: [<code>SymTab</code>](#SymTab) - This instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="Notes.Note"></a>

### Notes.Note : <code>Prototype</code>
**Kind**: static property of [<code>Notes</code>](#Notes)  
**Read only**: true  
<a name="PHdr"></a>

## PHdr
**Kind**: global class  

* [PHdr](#PHdr)
    * [new PHdr()](#new_PHdr_new)
    * [.needsRecompute](#PHdr+needsRecompute) : <code>Boolean</code>
    * [.structProps](#PHdr+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#PHdr+buffer) : <code>Buffer</code>
    * [.toString()](#PHdr+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#PHdr+buildFromBuffer) ⇒ [<code>PHdr</code>](#PHdr)
    * [.dumpData()](#PHdr+dumpData) ⇒ <code>String</code>
    * [.sortSections()](#PHdr+sortSections)
    * [.recompute([pos])](#PHdr+recompute) ⇒ <code>Integer</code> \| <code>BigInt</code>

<a name="new_PHdr_new"></a>

### new PHdr()

| Param | Type | Default |
| --- | --- | --- |
| opt.N | <code>Integer</code> |  | 
| opt.LE | <code>Boolean</code> |  | 
| [opt.p_type] | <code>PT</code> |  | 
| [opt.p_offset] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.p_vaddr] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.p_paddr] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.p_filesz] | <code>Integer</code> | <code>0</code> | 
| [opt.p_memsz] | <code>Integer</code> | <code>0</code> | 
| [opt.p_flags] | <code>Integer</code> | <code>0</code> | 
| [opt.p_align] | <code>Integer</code> | <code>0</code> | 

<a name="PHdr+needsRecompute"></a>

### pHdr.needsRecompute : <code>Boolean</code>
Returns true if any internal sections have "needsRecompute" flag

**Kind**: instance property of [<code>PHdr</code>](#PHdr)  
**Read only**: true  
<a name="PHdr+structProps"></a>

### pHdr.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>PHdr</code>](#PHdr)  
**Read only**: true  
<a name="PHdr+buffer"></a>

### pHdr.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>PHdr</code>](#PHdr)  
**Read only**: true  
<a name="PHdr+toString"></a>

### pHdr.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
<a name="PHdr+buildFromBuffer"></a>

### pHdr.buildFromBuffer(buff) ⇒ [<code>PHdr</code>](#PHdr)
Build from buff

**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
**Returns**: [<code>PHdr</code>](#PHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="PHdr+dumpData"></a>

### pHdr.dumpData() ⇒ <code>String</code>
Hexdump data

**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
<a name="PHdr+sortSections"></a>

### pHdr.sortSections()
Sort sections based on sh_offset
If sh_offset is 0, do nothing

**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
<a name="PHdr+recompute"></a>

### pHdr.recompute([pos]) ⇒ <code>Integer</code> \| <code>BigInt</code>
Recomputes addresses based on new starting position
May change sh_offset of any child sections
May change p_offset of instance
May change p_data of instance
May change p_filesz of instance
If p_vaddr or p_paddr exist, they will be incremented/decremented same amount as p_offset

**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
**Returns**: <code>Integer</code> \| <code>BigInt</code> - pos  Position at end of recomputed segment  

| Param | Type | Description |
| --- | --- | --- |
| [pos] | <code>Integer</code> \| <code>BigInt</code> | Starting position. Default instance's p_offset |

<a name="PHdrTable"></a>

## PHdrTable
**Kind**: global class  

* [PHdrTable](#PHdrTable)
    * [new PHdrTable(ehdr)](#new_PHdrTable_new)
    * [.N](#PHdrTable+N) : <code>Integer</code>
    * [.LE](#PHdrTable+LE) : <code>Boolean</code>
    * [.e_phentsize](#PHdrTable+e_phentsize) : <code>Integer</code> \| <code>BigInt</code>
    * [.e_phoff](#PHdrTable+e_phoff) : <code>Integer</code> \| <code>BigInt</code>
    * [.e_phnum](#PHdrTable+e_phnum) : <code>Integer</code>
    * [.buffer](#PHdrTable+buffer) : <code>Buffer</code>
    * [.fullSize](#PHdrTable+fullSize) : <code>Integer</code>
    * [.toString()](#PHdrTable+toString) ⇒ <code>String</code>
    * [.buildFromHandle(handle)](#PHdrTable+buildFromHandle) ⇒ [<code>PHdrTable</code>](#PHdrTable)
    * [.buildFromBuffer(buff, [exactSlice])](#PHdrTable+buildFromBuffer) ⇒ [<code>PHdrTable</code>](#PHdrTable)
    * [.writeToBuffer(buff)](#PHdrTable+writeToBuffer)
    * [.mapSections(shdrTable)](#PHdrTable+mapSections)
    * [.assignSubSegments()](#PHdrTable+assignSubSegments)
    * [.sortSections()](#PHdrTable+sortSections)
    * [.recompute([pos])](#PHdrTable+recompute) ⇒ <code>Integer</code> \| <code>BigInt</code>
    * [.addSegment(opt)](#PHdrTable+addSegment)

<a name="new_PHdrTable_new"></a>

### new PHdrTable(ehdr)

| Param | Type |
| --- | --- |
| ehdr | [<code>EHdr</code>](#EHdr) | 

<a name="PHdrTable+N"></a>

### pHdrTable.N : <code>Integer</code>
**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
**Read only**: true  
<a name="PHdrTable+LE"></a>

### pHdrTable.LE : <code>Boolean</code>
**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
**Read only**: true  
<a name="PHdrTable+e_phentsize"></a>

### pHdrTable.e\_phentsize : <code>Integer</code> \| <code>BigInt</code>
**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
**Read only**: true  
<a name="PHdrTable+e_phoff"></a>

### pHdrTable.e\_phoff : <code>Integer</code> \| <code>BigInt</code>
**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
<a name="PHdrTable+e_phnum"></a>

### pHdrTable.e\_phnum : <code>Integer</code>
**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
<a name="PHdrTable+buffer"></a>

### pHdrTable.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
**Read only**: true  
<a name="PHdrTable+fullSize"></a>

### pHdrTable.fullSize : <code>Integer</code>
Size of table + size of data

**Kind**: instance property of [<code>PHdrTable</code>](#PHdrTable)  
**Read only**: true  
<a name="PHdrTable+toString"></a>

### pHdrTable.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
<a name="PHdrTable+buildFromHandle"></a>

### pHdrTable.buildFromHandle(handle) ⇒ [<code>PHdrTable</code>](#PHdrTable)
Build table from an open file handle

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
**Returns**: [<code>PHdrTable</code>](#PHdrTable) - This instance  

| Param | Type |
| --- | --- |
| handle | <code>fs~FileHandle</code> | 

<a name="PHdrTable+buildFromBuffer"></a>

### pHdrTable.buildFromBuffer(buff, [exactSlice]) ⇒ [<code>PHdrTable</code>](#PHdrTable)
Builds table from Buffer
If entire file buffer passed, attaches relevant file data to each header
Defaults to assuming entire file buffer is passed

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
**Returns**: [<code>PHdrTable</code>](#PHdrTable) - This instance  

| Param | Type | Default |
| --- | --- | --- |
| buff | <code>Buffer</code> |  | 
| [exactSlice] | <code>Boolean</code> | <code>false</code> | 

<a name="PHdrTable+writeToBuffer"></a>

### pHdrTable.writeToBuffer(buff)
Writes to a buffer for writing the elf files

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| buff | <code>Buffer</code> | Buff to copy into |

<a name="PHdrTable+mapSections"></a>

### pHdrTable.mapSections(shdrTable)
Map sections to segments

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  

| Param | Type |
| --- | --- |
| shdrTable | [<code>SHdrTable</code>](#SHdrTable) | 

<a name="PHdrTable+assignSubSegments"></a>

### pHdrTable.assignSubSegments()
Assign segments to their parents
O(n^2) :(
Does not currently account for being run twice

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
<a name="PHdrTable+sortSections"></a>

### pHdrTable.sortSections()
Iterates over all PHdrs and calls sortSections() on each

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
<a name="PHdrTable+recompute"></a>

### pHdrTable.recompute([pos]) ⇒ <code>Integer</code> \| <code>BigInt</code>
Recompute addresses

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
**Returns**: <code>Integer</code> \| <code>BigInt</code> - Address at end of all segments  

| Param | Type | Default |
| --- | --- | --- |
| [pos] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 

<a name="PHdrTable+addSegment"></a>

### pHdrTable.addSegment(opt)
Add a new segment
If parentSegment is defined, it will be injected into that segment
If praentSegment defined, triggers recompute

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | All parameters for PHdr construct |
| [opt.data] | <code>Buffer</code> |  |
| [opt.parentSegment] | [<code>PHdr</code>](#PHdr) | Segment to inject new segment into |
| [opt.parentSegment] | <code>Intger</code> | Index of segment to inject new segment into |

<a name="Rel"></a>

## Rel
**Kind**: global class  

* [Rel](#Rel)
    * [new Rel()](#new_Rel_new)
    * [.structProps](#Rel+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#Rel+buffer) : <code>Buffer</code>
    * [.toString()](#Rel+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#Rel+buildFromBuffer) ⇒ [<code>PHdr</code>](#PHdr)

<a name="new_Rel_new"></a>

### new Rel()

| Param | Type |
| --- | --- |
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 
| [opt.r_offset] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.r_info] | <code>Integer</code> \| <code>BigInt</code> | 

<a name="Rel+structProps"></a>

### rel.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>Rel</code>](#Rel)  
**Read only**: true  
<a name="Rel+buffer"></a>

### rel.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>Rel</code>](#Rel)  
**Read only**: true  
<a name="Rel+toString"></a>

### rel.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Rel</code>](#Rel)  
<a name="Rel+buildFromBuffer"></a>

### rel.buildFromBuffer(buff) ⇒ [<code>PHdr</code>](#PHdr)
Build from buff

**Kind**: instance method of [<code>Rel</code>](#Rel)  
**Returns**: [<code>PHdr</code>](#PHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="RelTab"></a>

## RelTab
**Kind**: global class  

* [RelTab](#RelTab)
    * [new RelTab(shdr)](#new_RelTab_new)
    * [.toString()](#RelTab+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#RelTab+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)

<a name="new_RelTab_new"></a>

### new RelTab(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="RelTab+toString"></a>

### relTab.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>RelTab</code>](#RelTab)  
<a name="RelTab+buildFromBuffer"></a>

### relTab.buildFromBuffer(buff) ⇒ [<code>SymTab</code>](#SymTab)
**Kind**: instance method of [<code>RelTab</code>](#RelTab)  
**Returns**: [<code>SymTab</code>](#SymTab) - This instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="SHdr"></a>

## SHdr
Other props

**Kind**: global class  
**Properties**

| Name | Type |
| --- | --- |
| sizeHasChanged | <code>Boolean</code> | 


* [SHdr](#SHdr)
    * [new SHdr()](#new_SHdr_new)
    * [.structProps](#SHdr+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#SHdr+buffer) : <code>Buffer</code>
    * [.toString()](#SHdr+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#SHdr+buildFromBuffer) ⇒ [<code>SHdr</code>](#SHdr)
    * [.dumpData()](#SHdr+dumpData) ⇒ <code>String</code>
    * [.handleData()](#SHdr+handleData)
    * [.rebuildData()](#SHdr+rebuildData)
    * [.recompute([pos])](#SHdr+recompute) ⇒ <code>Integer</code> \| <code>BigInt</code>

<a name="new_SHdr_new"></a>

### new SHdr()

| Param | Type | Default |
| --- | --- | --- |
| opt.N | <code>Integer</code> |  | 
| opt.LE | <code>Boolean</code> |  | 
| [opt.sh_name] | <code>Integer</code> |  | 
| [opt.sh_type] | <code>SHT</code> |  | 
| [opt.sh_flags] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_addr] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.sh_offset] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.sh_size] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.sh_link] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_info] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_addralign] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_entsize] | <code>Integer</code> | <code>0</code> | 

<a name="SHdr+structProps"></a>

### sHdr.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>SHdr</code>](#SHdr)  
**Read only**: true  
<a name="SHdr+buffer"></a>

### sHdr.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>SHdr</code>](#SHdr)  
**Read only**: true  
<a name="SHdr+toString"></a>

### sHdr.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>SHdr</code>](#SHdr)  
<a name="SHdr+buildFromBuffer"></a>

### sHdr.buildFromBuffer(buff) ⇒ [<code>SHdr</code>](#SHdr)
Build from buff

**Kind**: instance method of [<code>SHdr</code>](#SHdr)  
**Returns**: [<code>SHdr</code>](#SHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="SHdr+dumpData"></a>

### sHdr.dumpData() ⇒ <code>String</code>
Hexdump data

**Kind**: instance method of [<code>SHdr</code>](#SHdr)  
<a name="SHdr+handleData"></a>

### sHdr.handleData()
Maybe creates data structure

**Kind**: instance method of [<code>SHdr</code>](#SHdr)  
<a name="SHdr+rebuildData"></a>

### sHdr.rebuildData()
Recalculate size

**Kind**: instance method of [<code>SHdr</code>](#SHdr)  
<a name="SHdr+recompute"></a>

### sHdr.recompute([pos]) ⇒ <code>Integer</code> \| <code>BigInt</code>
Recomputes addresses based on new starting position

Changes sh_offset
If sh_vaddr or sh_paddr exist, they will be incremented/decremented same amount as sh_offset

**Kind**: instance method of [<code>SHdr</code>](#SHdr)  
**Returns**: <code>Integer</code> \| <code>BigInt</code> - pos  Position at end of recomputed section  

| Param | Type | Description |
| --- | --- | --- |
| [pos] | <code>Integer</code> \| <code>BigInt</code> | Starting position. Default instance's sh_offset |

<a name="SHdrTable"></a>

## SHdrTable
**Kind**: global class  

* [SHdrTable](#SHdrTable)
    * [new SHdrTable(ehdr)](#new_SHdrTable_new)
    * [.N](#SHdrTable+N) : <code>Integer</code>
    * [.LE](#SHdrTable+LE) : <code>Boolean</code>
    * [.e_shentsize](#SHdrTable+e_shentsize) : <code>Integer</code> \| <code>BigInt</code>
    * [.e_shoff](#SHdrTable+e_shoff) : <code>Integer</code> \| <code>BigInt</code>
    * [.e_shnum](#SHdrTable+e_shnum) : <code>Integer</code>
    * [.e_shstrndx](#SHdrTable+e_shstrndx) : <code>Integer</code>
    * [.buffer](#SHdrTable+buffer) : <code>Buffer</code>
    * [.fullSize](#SHdrTable+fullSize) : <code>Integer</code>
    * [.shstr](#SHdrTable+shstr) : [<code>StrTab</code>](#StrTab)
    * [.needsRecompute](#SHdrTable+needsRecompute) : <code>Boolean</code>
    * [.toString()](#SHdrTable+toString) ⇒ <code>String</code>
    * [.loadHeaderNames()](#SHdrTable+loadHeaderNames) ⇒ <code>Boolean</code>
    * [.lookup(name)](#SHdrTable+lookup) ⇒ [<code>SHdr</code>](#SHdr)
    * [.buildFromHandle(handle)](#SHdrTable+buildFromHandle) ⇒ [<code>SHdrTable</code>](#SHdrTable)
    * [.buildFromBuffer(buff, [exactSlice])](#SHdrTable+buildFromBuffer) ⇒ [<code>SHdrTable</code>](#SHdrTable)
    * [.writeToBuffer(buff)](#SHdrTable+writeToBuffer)
    * [.recompute(pos)](#SHdrTable+recompute)
    * [.addSection(opt)](#SHdrTable+addSection) ⇒ [<code>SHdr</code>](#SHdr)

<a name="new_SHdrTable_new"></a>

### new SHdrTable(ehdr)

| Param | Type |
| --- | --- |
| ehdr | [<code>EHdr</code>](#EHdr) | 

<a name="SHdrTable+N"></a>

### sHdrTable.N : <code>Integer</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+LE"></a>

### sHdrTable.LE : <code>Boolean</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+e_shentsize"></a>

### sHdrTable.e\_shentsize : <code>Integer</code> \| <code>BigInt</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+e_shoff"></a>

### sHdrTable.e\_shoff : <code>Integer</code> \| <code>BigInt</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
<a name="SHdrTable+e_shnum"></a>

### sHdrTable.e\_shnum : <code>Integer</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
<a name="SHdrTable+e_shstrndx"></a>

### sHdrTable.e\_shstrndx : <code>Integer</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
<a name="SHdrTable+buffer"></a>

### sHdrTable.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+fullSize"></a>

### sHdrTable.fullSize : <code>Integer</code>
Size of table + size of data

**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+shstr"></a>

### sHdrTable.shstr : [<code>StrTab</code>](#StrTab)
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+needsRecompute"></a>

### sHdrTable.needsRecompute : <code>Boolean</code>
**Kind**: instance property of [<code>SHdrTable</code>](#SHdrTable)  
**Read only**: true  
<a name="SHdrTable+toString"></a>

### sHdrTable.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
<a name="SHdrTable+loadHeaderNames"></a>

### sHdrTable.loadHeaderNames() ⇒ <code>Boolean</code>
Pulls names from str tab and attaches them to SHdrs

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
<a name="SHdrTable+lookup"></a>

### sHdrTable.lookup(name) ⇒ [<code>SHdr</code>](#SHdr)
Looks up a header by name

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="SHdrTable+buildFromHandle"></a>

### sHdrTable.buildFromHandle(handle) ⇒ [<code>SHdrTable</code>](#SHdrTable)
Build table from an open file handle

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
**Returns**: [<code>SHdrTable</code>](#SHdrTable) - This instance  

| Param | Type |
| --- | --- |
| handle | <code>fs~FileHandle</code> | 

<a name="SHdrTable+buildFromBuffer"></a>

### sHdrTable.buildFromBuffer(buff, [exactSlice]) ⇒ [<code>SHdrTable</code>](#SHdrTable)
Builds table from Buffer
If entire file buffer passed, attaches relevant file data to each header
Defaults to assuming entire file buffer is passed

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
**Returns**: [<code>SHdrTable</code>](#SHdrTable) - This instance  

| Param | Type | Default |
| --- | --- | --- |
| buff | <code>Buffer</code> |  | 
| [exactSlice] | <code>Boolean</code> | <code>false</code> | 

<a name="SHdrTable+writeToBuffer"></a>

### sHdrTable.writeToBuffer(buff)
Writes to a buffer for writing the elf files

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| buff | <code>Buffer</code> | Buff to copy into |

<a name="SHdrTable+recompute"></a>

### sHdrTable.recompute(pos)
Recompute addresses for orphaned sections and the SHdrTable
Orphaned section = not part of any segment

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>Integer</code> | New starting point |

<a name="SHdrTable+addSection"></a>

### sHdrTable.addSection(opt) ⇒ [<code>SHdr</code>](#SHdr)
Adds a section
sh_type will auto set to NOBITS if no data provided
sh_offset and size are autocalculated

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | Parameters for SHdr |
| [opt.data] | <code>Buffer</code> |  |
| [opt.name] | <code>String</code> |  |

<a name="StrTab"></a>

## StrTab
**Kind**: global class  

* [StrTab](#StrTab)
    * [new StrTab(shdr)](#new_StrTab_new)
    * [.size](#StrTab+size) : <code>Integer</code>
    * [.buffer](#StrTab+buffer) : <code>Buffer</code>
    * [.buildFromBuffer(buff)](#StrTab+buildFromBuffer) ⇒ [<code>StrTab</code>](#StrTab)
    * [.fromNameID(sh_name)](#StrTab+fromNameID) ⇒ <code>String</code>
    * [.addString(str)](#StrTab+addString) ⇒ <code>Integer</code>
    * [.rmString(str)](#StrTab+rmString) ⇒ <code>Boolean</code>

<a name="new_StrTab_new"></a>

### new StrTab(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="StrTab+size"></a>

### strTab.size : <code>Integer</code>
**Kind**: instance property of [<code>StrTab</code>](#StrTab)  
**Read only**: true  
<a name="StrTab+buffer"></a>

### strTab.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>StrTab</code>](#StrTab)  
**Read only**: true  
<a name="StrTab+buildFromBuffer"></a>

### strTab.buildFromBuffer(buff) ⇒ [<code>StrTab</code>](#StrTab)
Builds from buffer

**Kind**: instance method of [<code>StrTab</code>](#StrTab)  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="StrTab+fromNameID"></a>

### strTab.fromNameID(sh_name) ⇒ <code>String</code>
Retrieves string from id (i.e. sh_name, st_name)

**Kind**: instance method of [<code>StrTab</code>](#StrTab)  

| Param | Type |
| --- | --- |
| sh_name | <code>Integer</code> | 

<a name="StrTab+addString"></a>

### strTab.addString(str) ⇒ <code>Integer</code>
Add a string to the table
Triggers SHDr owner to rebuild its data buffer

**Kind**: instance method of [<code>StrTab</code>](#StrTab)  
**Returns**: <code>Integer</code> - Index of added string  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="StrTab+rmString"></a>

### strTab.rmString(str) ⇒ <code>Boolean</code>
Remove a string to the table
Triggers SHDr owner to rebuild its data buffer

**Kind**: instance method of [<code>StrTab</code>](#StrTab)  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

<a name="Sym"></a>

## Sym
**Kind**: global class  

* [Sym](#Sym)
    * [new Sym()](#new_Sym_new)
    * [.structProps](#Sym+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#Sym+buffer) : <code>Buffer</code>
    * [.st_type](#Sym+st_type) : <code>STT</code>
    * [.st_bind](#Sym+st_bind) : <code>STB</code>
    * [.toString()](#Sym+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#Sym+buildFromBuffer) ⇒ [<code>PHdr</code>](#PHdr)

<a name="new_Sym_new"></a>

### new Sym()

| Param | Type |
| --- | --- |
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 
| [opt.st_name] | <code>Integer</code> | 
| [opt.st_value] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.st_size] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.st_info] | <code>STT</code> | 
| [opt.st_other] | <code>Char</code> | 
| [opt.st_shndx] | <code>Integer</code> | 

<a name="Sym+structProps"></a>

### sym.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>Sym</code>](#Sym)  
**Read only**: true  
<a name="Sym+buffer"></a>

### sym.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>Sym</code>](#Sym)  
**Read only**: true  
<a name="Sym+st_type"></a>

### sym.st\_type : <code>STT</code>
**Kind**: instance property of [<code>Sym</code>](#Sym)  
**Read only**: true  
<a name="Sym+st_bind"></a>

### sym.st\_bind : <code>STB</code>
**Kind**: instance property of [<code>Sym</code>](#Sym)  
**Read only**: true  
<a name="Sym+toString"></a>

### sym.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>Sym</code>](#Sym)  
<a name="Sym+buildFromBuffer"></a>

### sym.buildFromBuffer(buff) ⇒ [<code>PHdr</code>](#PHdr)
Build from buff

**Kind**: instance method of [<code>Sym</code>](#Sym)  
**Returns**: [<code>PHdr</code>](#PHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="SymTab"></a>

## SymTab
**Kind**: global class  

* [SymTab](#SymTab)
    * [new SymTab()](#new_SymTab_new)
    * _instance_
        * [.buffer](#SymTab+buffer) : <code>Buffer</code>
        * [.toString()](#SymTab+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#SymTab+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
    * _static_
        * [.Sym](#SymTab.Sym) : <code>Prototype</code>

<a name="new_SymTab_new"></a>

### new SymTab()

| Param | Type | Description |
| --- | --- | --- |
| opt.N | <code>Integer</code> |  |
| opt.LE | <code>Boolean</code> |  |
| opt.sh_entsize | <code>Integer</code> | Size of symbols |
| [opt.buffer] | <code>Buffer</code> | Build from buffer right away |
| [opt.data] | <code>Buffer</code> | Alias for opt.buffer. Supercedes buffer |

<a name="SymTab+buffer"></a>

### symTab.buffer : <code>Buffer</code>
Newly allocated buffer

**Kind**: instance property of [<code>SymTab</code>](#SymTab)  
**Read only**: true  
<a name="SymTab+toString"></a>

### symTab.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>SymTab</code>](#SymTab)  
<a name="SymTab+buildFromBuffer"></a>

### symTab.buildFromBuffer(buff) ⇒ [<code>SymTab</code>](#SymTab)
**Kind**: instance method of [<code>SymTab</code>](#SymTab)  
**Returns**: [<code>SymTab</code>](#SymTab) - This instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="SymTab.Sym"></a>

### SymTab.Sym : <code>Prototype</code>
**Kind**: static property of [<code>SymTab</code>](#SymTab)  
**Read only**: true  
<a name="buff2struct"></a>

## buff2struct() ⇒ <code>JSON</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| opt.props | [<code>Array.&lt;StructProp&gt;</code>](#StructProp) | 
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 
| opt.buff | <code>Buffer</code> | 

<a name="struct2buff"></a>

## struct2buff() ⇒ <code>JSON</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| opt.props | [<code>Array.&lt;StructProp&gt;</code>](#StructProp) | 
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 

<a name="sizeOfStruct"></a>

## sizeOfStruct() ⇒ <code>Integer</code>
**Kind**: global function  

| Param | Type |
| --- | --- |
| opt.props | [<code>Array.&lt;StructProp&gt;</code>](#StructProp) | 
| opt.N | <code>Integer</code> | 

<a name="struct2string"></a>

## struct2string(struct) ⇒ <code>String</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| struct | <code>Object</code> | Object with structProps getter |

<a name="StructProp"></a>

## StructProp : <code>JSON</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| size | <code>Integer</code> | 32,64,0. 0 = follow N |
| key | <code>String</code> |  |
| [tdef] | <code>Object</code> | Typedef enumeration object |
| [val] | <code>Any</code> |  |

