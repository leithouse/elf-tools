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
<dt><a href="#MipsAbiFlags">MipsAbiFlags</a></dt>
<dd></dd>
<dt><a href="#MipsOption">MipsOption</a></dt>
<dd></dd>
<dt><a href="#MipsOptions">MipsOptions</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#DT">DT</a> : <code>JSON</code></dt>
<dd><p>Dynamic section tags.</p>
</dd>
<dt><a href="#ELFOSABI">ELFOSABI</a> : <code>JSON</code></dt>
<dd></dd>
<dt><a href="#EM">EM</a> : <code>JSON</code></dt>
<dd><p>Machine types</p>
</dd>
<dt><a href="#ET">ET</a> : <code>JSON</code></dt>
<dd><p>Object file type</p>
</dd>
<dt><a href="#NT">NT</a> : <code>JSON</code></dt>
<dd><p>Values of note segment descriptor types for core files.</p>
</dd>
<dt><a href="#PT">PT</a> : <code>JSON</code></dt>
<dd><p>Program header type</p>
</dd>
<dt><a href="#SHT">SHT</a> : <code>JSON</code></dt>
<dd><p>Section Header Type</p>
</dd>
<dt><a href="#STB">STB</a> : <code>JSON</code></dt>
<dd><p>Symbol binding</p>
</dd>
<dt><a href="#STT">STT</a> : <code>JSON</code></dt>
<dd><p>Symbol type</p>
</dd>
<dt><a href="#STV">STV</a> : <code>JSON</code></dt>
<dd><p>Symbol visibity (st_other)</p>
</dd>
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
<dt><a href="#parseHeader">parseHeader(opt, opt)</a> ⇒ <code>JSON</code> | <code>Object</code> | <code>Object</code> | <code>Object</code> | <code>Object</code> | <code>Object</code></dt>
<dd></dd>
<dt><a href="#genArch">genArch([dirOut])</a> ⇒ <code><a href="#Elf">Array.&lt;Elf&gt;</a></code></dt>
<dd><p>Creates an archive that should hit every machine flag decode branch as well as the process_archive branch</p>
</dd>
<dt><a href="#genElf">genElf()</a> ⇒ <code><a href="#Elf">Elf</a></code></dt>
<dd><p>Writes file to output directory in form <code>elf-gen_${key}</code></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#StructProp">StructProp</a> : <code>JSON</code></dt>
<dd></dd>
<dt><a href="#TagInfo">TagInfo</a> : <code>JSON</code></dt>
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
        * [.buffer](#DynTags+buffer) : <code>Buffer</code>
        * [.toString()](#DynTags+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#DynTags+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
        * [.addDyn()](#DynTags+addDyn) ⇒
        * [.updateOrAdd()](#DynTags+updateOrAdd) ⇒
    * _static_
        * [.Dyn](#DynTags.Dyn) : <code>Prototype</code>

<a name="new_DynTags_new"></a>

### new DynTags(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="DynTags+buffer"></a>

### dynTags.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>DynTags</code>](#DynTags)  
**Read only**: true  
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
| opt.d_tag | [<code>DT</code>](#DT) | 
| opt.d_un | <code>Integer</code> \| <code>BigInt</code> | 

<a name="DynTags+updateOrAdd"></a>

### dynTags.updateOrAdd() ⇒
Updates an existing tag, or adds if it doesn't exit

**Kind**: instance method of [<code>DynTags</code>](#DynTags)  
**Returns**: Dyn  

| Param | Type |
| --- | --- |
| opt.d_tag | [<code>DT</code>](#DT) | 
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
    * [.N](#EHdr+N) : <code>Integer</code>
    * [.LE](#EHdr+LE) : <code>Boolean</code>
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
| [opt.e_machine] | [<code>EM</code>](#EM) |  | Default x86-64 |
| [opt.e_version] | <code>EV</code> |  | Default current |
| [opt.e_entry] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.e_phoff] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.e_shoff] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.e_flags] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_phnum] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_shentsize] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_shnum] | <code>Integer</code> | <code>0</code> |  |
| [opt.e_shstrndx] | <code>Integer</code> | <code>0</code> |  |

<a name="EHdr+N"></a>

### eHdr.N : <code>Integer</code>
**Kind**: instance property of [<code>EHdr</code>](#EHdr)  
**Read only**: true  
<a name="EHdr+LE"></a>

### eHdr.LE : <code>Boolean</code>
**Kind**: instance property of [<code>EHdr</code>](#EHdr)  
**Read only**: true  
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
    * [.N](#E_Ident+N) : <code>ELFCLASS</code>
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
| opt.ei_osabi | [<code>ELFOSABI</code>](#ELFOSABI) | 
| opt.ei_abiversion | <code>Integer</code> | 

<a name="E_Ident+N"></a>

### e_Ident.N : <code>ELFCLASS</code>
**Kind**: instance property of [<code>E\_Ident</code>](#E_Ident)  
**Read only**: true  
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
        * [.addressString()](#Elf+addressString)
        * [.addSection(opt)](#Elf+addSection) ⇒ [<code>SHdr</code>](#SHdr)
        * [.addSegment(opt)](#Elf+addSegment) ⇒ [<code>PHdr</code>](#PHdr)
        * [.addDynSection(opt)](#Elf+addDynSection)
        * [.addInterp(interp)](#Elf+addInterp)
        * [.recompute()](#Elf+recompute)
        * [.writeToFile(fpath)](#Elf+writeToFile) ⇒ <code>String</code>
        * [.loadArchHeaderJson([fpath])](#Elf+loadArchHeaderJson)
    * _static_
        * [.mkFromFile(fpath)](#Elf.mkFromFile) ⇒ [<code>Elf</code>](#Elf)

<a name="new_Elf_new"></a>

### new Elf()
ehdr and buff are mutually exclusive


| Param | Type | Description |
| --- | --- | --- |
| opt.ehdr | <code>JSON</code> | Passed directly to {EHdr} |
| opt.buff | <code>Buffer</code> | Build Elf from buffer |
| opt.shdrClass | <code>Prototype</code> | Alternative SHdr class to use |

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
<a name="Elf+addressString"></a>

### elf.addressString()
Sorts addresses into a string

**Kind**: instance method of [<code>Elf</code>](#Elf)  
<a name="Elf+addSection"></a>

### elf.addSection(opt) ⇒ [<code>SHdr</code>](#SHdr)
**Kind**: instance method of [<code>Elf</code>](#Elf)  
**Uses**: [<code>addSection</code>](#SHdrTable+addSection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | All parameters for {SHdrTable#addSection} |
| [opt.segment] | [<code>PHdr</code>](#PHdr) | Segment to add section to |
| [opt.segment] | <code>Integer</code> | Index of segment to add section to |

<a name="Elf+addSegment"></a>

### elf.addSegment(opt) ⇒ [<code>PHdr</code>](#PHdr)
**Kind**: instance method of [<code>Elf</code>](#Elf)  
**Uses**: [<code>addSegment</code>](#PHdrTable+addSegment)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | All parameters for {PHdrTable#addSegment} |

<a name="Elf+addDynSection"></a>

### elf.addDynSection(opt)
**Kind**: instance method of [<code>Elf</code>](#Elf)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | Passed directly to SHdrTable.addDynSection |

<a name="Elf+addInterp"></a>

### elf.addInterp(interp)
**Kind**: instance method of [<code>Elf</code>](#Elf)  

| Param | Type |
| --- | --- |
| interp | <code>String</code> | 

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

<a name="Elf+loadArchHeaderJson"></a>

### elf.loadArchHeaderJson([fpath])
Sets this.archHeader property

**Kind**: instance method of [<code>Elf</code>](#Elf)  

| Param | Type | Description |
| --- | --- | --- |
| [fpath] | <code>String</code> | Defaults to this.jsonPath |

<a name="Elf.mkFromFile"></a>

### Elf.mkFromFile(fpath) ⇒ [<code>Elf</code>](#Elf)
Build ELF from file

**Kind**: static method of [<code>Elf</code>](#Elf)  

| Param | Type | Description |
| --- | --- | --- |
| fpath | <code>String</code> | Path to elf file |

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
| [opt.n_namesz] | <code>Integer</code> | 
| [opt.n_descz] | <code>Integer</code> | 
| [opt.n_type] | <code>Integer</code> | 
| [opt.name] | <code>String</code> | 
| [opt.desc] | <code>Buffer</code> | 
| [opt.isVMS] | <code>Boolean</code> | 

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
        * [.buffer](#Notes+buffer) : <code>Buffer</code>
        * [.toString()](#Notes+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#Notes+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
        * [.addNote()](#Notes+addNote) ⇒ [<code>Note</code>](#Note)
    * _static_
        * [.Note](#Notes.Note) : <code>Prototype</code>

<a name="new_Notes_new"></a>

### new Notes(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="Notes+buffer"></a>

### notes.buffer : <code>Buffer</code>
Newly allocated buffer

**Kind**: instance property of [<code>Notes</code>](#Notes)  
**Read only**: true  
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

<a name="Notes+addNote"></a>

### notes.addNote() ⇒ [<code>Note</code>](#Note)
Adds a new note

**Kind**: instance method of [<code>Notes</code>](#Notes)  

| Param | Type |
| --- | --- |
| opt.n_type | [<code>NT</code>](#NT) | 
| opt.name | <code>String</code> | 
| opt.desc | <code>Buffer</code> | 

<a name="Notes.Note"></a>

### Notes.Note : <code>Prototype</code>
**Kind**: static property of [<code>Notes</code>](#Notes)  
**Read only**: true  
<a name="PHdr"></a>

## PHdr
**Kind**: global class  

* [PHdr](#PHdr)
    * [new PHdr()](#new_PHdr_new)
    * [.N](#PHdr+N) : <code>Integer</code>
    * [.LE](#PHdr+LE) : <code>Boolean</code>
    * [.needsRecompute](#PHdr+needsRecompute) : <code>Boolean</code>
    * [.structProps](#PHdr+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#PHdr+buffer) : <code>Buffer</code>
    * [.toString()](#PHdr+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#PHdr+buildFromBuffer) ⇒ [<code>PHdr</code>](#PHdr)
    * [.recompute([pos])](#PHdr+recompute) ⇒ <code>Integer</code> \| <code>BigInt</code>
    * [.addSegment(phdr)](#PHdr+addSegment) ⇒ [<code>PHdr</code>](#PHdr)
    * [.addSection(shdr)](#PHdr+addSection) ⇒ [<code>PHdr</code>](#PHdr)

<a name="new_PHdr_new"></a>

### new PHdr()

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt.ehdr | [<code>EHdr</code>](#EHdr) |  |  |
| [opt.shdr] | [<code>SHdr</code>](#SHdr) |  | Section contained in segment |
| [opt.shdr] | [<code>Array.&lt;SHdr&gt;</code>](#SHdr) |  | Sections contained in segment |
| [opt.p_type] | [<code>PT</code>](#PT) |  |  |
| [opt.p_offset] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.p_vaddr] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.p_paddr] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> |  |
| [opt.p_filesz] | <code>Integer</code> | <code>0</code> |  |
| [opt.p_memsz] | <code>Integer</code> | <code>0</code> |  |
| [opt.p_flags] | <code>Integer</code> | <code>0</code> |  |
| [opt.p_align] | <code>Integer</code> | <code>0</code> |  |

<a name="PHdr+N"></a>

### pHdr.N : <code>Integer</code>
**Kind**: instance property of [<code>PHdr</code>](#PHdr)  
**Read only**: true  
<a name="PHdr+LE"></a>

### pHdr.LE : <code>Boolean</code>
**Kind**: instance property of [<code>PHdr</code>](#PHdr)  
**Read only**: true  
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

<a name="PHdr+addSegment"></a>

### pHdr.addSegment(phdr) ⇒ [<code>PHdr</code>](#PHdr)
Adds a sub segment

**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
**Returns**: [<code>PHdr</code>](#PHdr) - load  Topmost segment parent added to  

| Param | Type |
| --- | --- |
| phdr | [<code>PHdr</code>](#PHdr) | 

<a name="PHdr+addSection"></a>

### pHdr.addSection(shdr) ⇒ [<code>PHdr</code>](#PHdr)
Adds a section to the segment

**Kind**: instance method of [<code>PHdr</code>](#PHdr)  
**Returns**: [<code>PHdr</code>](#PHdr) - load  Topmost segment parent added to  

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="PHdrTable"></a>

## PHdrTable
**Kind**: global class  

* [PHdrTable](#PHdrTable)
    * [new PHdrTable(ehdr)](#new_PHdrTable_new)
    * _instance_
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
        * [.addSegment(opt)](#PHdrTable+addSegment)
        * [.addLoad()](#PHdrTable+addLoad) ⇒ [<code>PHdr</code>](#PHdr)
        * [.addSection()](#PHdrTable+addSection) ⇒ <code>BigInt</code> \| <code>Integer</code>
        * [.recompute()](#PHdrTable+recompute) ⇒ <code>Integer</code> \| <code>BigInt</code>
    * _static_
        * [.mkSkeleton(ehdr)](#PHdrTable.mkSkeleton) ⇒ [<code>PHdrTable</code>](#PHdrTable)

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
<a name="PHdrTable+addSegment"></a>

### pHdrTable.addSegment(opt)
Add a new segment
If parentSegment is defined, it will be injected into that segment
If praentSegment defined, triggers recompute

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | All parameters for PHdr construct |
| [opt.parentSegment] | [<code>PHdr</code>](#PHdr) | Segment to inject new segment into |
| [opt.parentSegment] | <code>Intger</code> | Index of segment to inject new segment into |

<a name="PHdrTable+addLoad"></a>

### pHdrTable.addLoad() ⇒ [<code>PHdr</code>](#PHdr)
Adds a load segment

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
<a name="PHdrTable+addSection"></a>

### pHdrTable.addSection() ⇒ <code>BigInt</code> \| <code>Integer</code>
Add section to segment
Defaults to first load segment

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| [opt.shdr] | [<code>SHdr</code>](#SHdr) | Section to add |
| [opt.segment] | [<code>PHdr</code>](#PHdr) | Segment to add it to |
| [opt.segment] | <code>Integer</code> |  |

<a name="PHdrTable+recompute"></a>

### pHdrTable.recompute() ⇒ <code>Integer</code> \| <code>BigInt</code>
Iterates over every LOAD segment and recomputes it

**Kind**: instance method of [<code>PHdrTable</code>](#PHdrTable)  
**Returns**: <code>Integer</code> \| <code>BigInt</code> - Final position  
<a name="PHdrTable.mkSkeleton"></a>

### PHdrTable.mkSkeleton(ehdr) ⇒ [<code>PHdrTable</code>](#PHdrTable)
Make skeleton with a load segment @ 0x0 and a PHDR segment

**Kind**: static method of [<code>PHdrTable</code>](#PHdrTable)  

| Param | Type |
| --- | --- |
| ehdr | [<code>EHdr</code>](#EHdr) | 

<a name="Rel"></a>

## Rel
**Kind**: global class  

* [Rel](#Rel)
    * [new Rel()](#new_Rel_new)
    * [.structProps](#Rel+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#Rel+buffer) : <code>Buffer</code>
    * [.r_sym](#Rel+r_sym) : <code>Integer</code>
    * [.r_type](#Rel+r_type) : <code>Integer</code>
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
| [opt.r_type] | <code>Integer</code> | 
| [opt.r_sym] | <code>Integer</code> | 

<a name="Rel+structProps"></a>

### rel.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>Rel</code>](#Rel)  
**Read only**: true  
<a name="Rel+buffer"></a>

### rel.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>Rel</code>](#Rel)  
**Read only**: true  
<a name="Rel+r_sym"></a>

### rel.r\_sym : <code>Integer</code>
**Kind**: instance property of [<code>Rel</code>](#Rel)  
<a name="Rel+r_type"></a>

### rel.r\_type : <code>Integer</code>
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
    * [.buffer](#RelTab+buffer) : <code>Buffer</code>
    * [.toString()](#RelTab+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#RelTab+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
    * [.addRel(opt)](#RelTab+addRel) ⇒ [<code>Rel</code>](#Rel) \| <code>RelA</code>

<a name="new_RelTab_new"></a>

### new RelTab(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="RelTab+buffer"></a>

### relTab.buffer : <code>Buffer</code>
Newly allocated buffer

**Kind**: instance property of [<code>RelTab</code>](#RelTab)  
**Read only**: true  
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

<a name="RelTab+addRel"></a>

### relTab.addRel(opt) ⇒ [<code>Rel</code>](#Rel) \| <code>RelA</code>
Add a reloc entry

**Kind**: instance method of [<code>RelTab</code>](#RelTab)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | Parameters for Rel or RelA |

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
    * _instance_
        * [.N](#SHdr+N) : <code>Integer</code>
        * [.LE](#SHdr+LE) : <code>Boolean</code>
        * [.structProps](#SHdr+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
        * [.buffer](#SHdr+buffer) : <code>Buffer</code>
        * [.toString()](#SHdr+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#SHdr+buildFromBuffer) ⇒ [<code>SHdr</code>](#SHdr)
        * [.dumpData()](#SHdr+dumpData) ⇒ <code>String</code>
        * [.handleData()](#SHdr+handleData)
        * [.rebuildData()](#SHdr+rebuildData)
        * [.recompute([pos])](#SHdr+recompute) ⇒ <code>Integer</code> \| <code>BigInt</code>
    * _static_
        * [.mkShStrTab(ehdr)](#SHdr.mkShStrTab) ⇒ [<code>SHdr</code>](#SHdr)

<a name="new_SHdr_new"></a>

### new SHdr()

| Param | Type | Default |
| --- | --- | --- |
| opt.ehdr | [<code>EHdr</code>](#EHdr) |  | 
| [opt.sh_name] | <code>Integer</code> |  | 
| [opt.sh_type] | [<code>SHT</code>](#SHT) |  | 
| [opt.sh_flags] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_addr] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.sh_offset] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.sh_size] | <code>Integer</code> \| <code>BigInt</code> | <code>0</code> | 
| [opt.sh_link] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_info] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_addralign] | <code>Integer</code> | <code>0</code> | 
| [opt.sh_entsize] | <code>Integer</code> | <code>0</code> | 

<a name="SHdr+N"></a>

### sHdr.N : <code>Integer</code>
**Kind**: instance property of [<code>SHdr</code>](#SHdr)  
**Read only**: true  
<a name="SHdr+LE"></a>

### sHdr.LE : <code>Boolean</code>
**Kind**: instance property of [<code>SHdr</code>](#SHdr)  
**Read only**: true  
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
Returns true if handled

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

<a name="SHdr.mkShStrTab"></a>

### SHdr.mkShStrTab(ehdr) ⇒ [<code>SHdr</code>](#SHdr)
Make starting ShStr section

**Kind**: static method of [<code>SHdr</code>](#SHdr)  

| Param | Type |
| --- | --- |
| ehdr | [<code>EHdr</code>](#EHdr) | 

<a name="SHdrTable"></a>

## SHdrTable
**Kind**: global class  

* [SHdrTable](#SHdrTable)
    * [new SHdrTable(ehdr, [shdrClass])](#new_SHdrTable_new)
    * _instance_
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
        * [.loadNames()](#SHdrTable+loadNames) ⇒ <code>Boolean</code>
        * [.lookup(name)](#SHdrTable+lookup) ⇒ [<code>SHdr</code>](#SHdr)
        * [.buildFromHandle(handle)](#SHdrTable+buildFromHandle) ⇒ [<code>SHdrTable</code>](#SHdrTable)
        * [.buildFromBuffer(buff, [exactSlice])](#SHdrTable+buildFromBuffer) ⇒ [<code>SHdrTable</code>](#SHdrTable)
        * [.writeToBuffer(buff)](#SHdrTable+writeToBuffer)
        * [.recompute(pos)](#SHdrTable+recompute)
        * [.addSection(opt)](#SHdrTable+addSection) ⇒ [<code>SHdr</code>](#SHdr)
        * [.addDynSection()](#SHdrTable+addDynSection) ⇒ <code>Object</code> \| [<code>SHdr</code>](#SHdr) \| [<code>SHdr</code>](#SHdr)
        * [.addSymSection()](#SHdrTable+addSymSection) ⇒ <code>Object</code> \| [<code>SHdr</code>](#SHdr) \| [<code>SHdr</code>](#SHdr)
        * [.addSymbol(opt)](#SHdrTable+addSymbol) ⇒ <code>JSON</code> \| [<code>Sym</code>](#Sym) \| <code>Integer</code>
        * [.addRelocSection()](#SHdrTable+addRelocSection) ⇒ [<code>SHdr</code>](#SHdr)
        * [.addRel(opt)](#SHdrTable+addRel) ⇒ [<code>Rel</code>](#Rel) \| <code>RelA</code>
        * [.addNotesSection()](#SHdrTable+addNotesSection) ⇒ [<code>SHdr</code>](#SHdr)
        * [.updateDynTags()](#SHdrTable+updateDynTags)
    * _static_
        * [.mkSkeleton(ehdr, [shdrClass])](#SHdrTable.mkSkeleton) ⇒ [<code>SHdrTable</code>](#SHdrTable)

<a name="new_SHdrTable_new"></a>

### new SHdrTable(ehdr, [shdrClass])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ehdr | [<code>EHdr</code>](#EHdr) |  |  |
| [shdrClass] | <code>Prototype</code> | <code>SHdr</code> | Alternative SHdr class to use |

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
<a name="SHdrTable+loadNames"></a>

### sHdrTable.loadNames() ⇒ <code>Boolean</code>
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
sh_offset and size are autocalculated

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | Parameters for SHdr |
| [opt.data] | <code>Buffer</code> |  |
| [opt.name] | <code>String</code> |  |

<a name="SHdrTable+addDynSection"></a>

### sHdrTable.addDynSection() ⇒ <code>Object</code> \| [<code>SHdr</code>](#SHdr) \| [<code>SHdr</code>](#SHdr)
Add a dynamic section. Also adds a string tab for it if it doesn't exist

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
**Returns**: <code>Object</code> - shdrs[<code>SHdr</code>](#SHdr) - shdrs.dyn  Dynamic section[<code>SHdr</code>](#SHdr) - shdrs.str  String section  

| Param | Type | Default |
| --- | --- | --- |
| [opt.name] | <code>String</code> | <code>&#x27;.dynamic&#x27;</code> | 
| [opt.strName] | <code>String</code> | <code>&#x27;.dynstr&#x27;</code> | 
| opt.tags | [<code>Array.&lt;TagInfo&gt;</code>](#TagInfo) |  | 

<a name="SHdrTable+addSymSection"></a>

### sHdrTable.addSymSection() ⇒ <code>Object</code> \| [<code>SHdr</code>](#SHdr) \| [<code>SHdr</code>](#SHdr)
Add a symbol table. If no relevant string table exists, it will be created

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
**Returns**: <code>Object</code> - shdrs[<code>SHdr</code>](#SHdr) - shdrs.sym  Symbol section[<code>SHdr</code>](#SHdr) - shdrs.str  String section  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [opt.type] | <code>String</code> | <code>&#x27;.dynsym&#x27;</code> | Other option is .symtab |
| [opt.syms] | <code>Array.&lt;JSON&gt;</code> |  | Parameters for addSymbol() |

<a name="SHdrTable+addSymbol"></a>

### sHdrTable.addSymbol(opt) ⇒ <code>JSON</code> \| [<code>Sym</code>](#Sym) \| <code>Integer</code>
Adds a symbol. First checks for .dynsym, then .symtab
Creates .dynsym if necessary
st_name is auto generated

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
**Returns**: <code>JSON</code> - ret[<code>Sym</code>](#Sym) - ret.sym<code>Integer</code> - ret.idx  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | Parameters for Sym |
| opt.name | <code>String</code> | Name to add to string tab |

<a name="SHdrTable+addRelocSection"></a>

### sHdrTable.addRelocSection() ⇒ [<code>SHdr</code>](#SHdr)
Adds reloc section

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt.name | <code>String</code> |  | Prepended if appropriate |
| [opt.symSection] | <code>String</code> | <code>&#x27;.dynsym&#x27;</code> |  |
| [opt.applySection] | <code>String</code> |  | Defaults to SHN_UNDEF |
| [opt.noAddend] | <code>Boolean</code> | <code>false</code> |  |
| [opt.rels] | <code>Array.&lt;JSON&gt;</code> |  | Parameters for addRel |

<a name="SHdrTable+addRel"></a>

### sHdrTable.addRel(opt) ⇒ [<code>Rel</code>](#Rel) \| <code>RelA</code>
Add a relocation entry

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>JSON</code> | Parameters for Rel or RelA |
| opt.reloc | [<code>SHdr</code>](#SHdr) | Relocation section header |
| opt.reloc | <code>String</code> | Name of relocation section header |
| [opt.sym] | <code>JSON</code> | Parameter for associated symbol |

<a name="SHdrTable+addNotesSection"></a>

### sHdrTable.addNotesSection() ⇒ [<code>SHdr</code>](#SHdr)
Adds a notes section

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Description |
| --- | --- | --- |
| opt.name | <code>String</code> | Will be prepended with .note. if necessary |
| [opt.notes] | <code>Array.&lt;JSON&gt;</code> | Parameters for Notes.addNote() |
| [opt.altSHT] | <code>Integer</code> | Use differnt SHT idefentifier than SHT_NOTE |

<a name="SHdrTable+updateDynTags"></a>

### sHdrTable.updateDynTags()
Searches for and updates values of various dynamic tags pertaining to 
section header table values

**Kind**: instance method of [<code>SHdrTable</code>](#SHdrTable)  
<a name="SHdrTable.mkSkeleton"></a>

### SHdrTable.mkSkeleton(ehdr, [shdrClass]) ⇒ [<code>SHdrTable</code>](#SHdrTable)
Make skeleton with a NULL section and a section string tab

**Kind**: static method of [<code>SHdrTable</code>](#SHdrTable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ehdr | [<code>EHdr</code>](#EHdr) |  |  |
| [shdrClass] | <code>Prototype</code> | <code>SHdr</code> | Alternative SHdr class to use |

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
    * [.st_type](#Sym+st_type) : [<code>STT</code>](#STT)
    * [.st_bind](#Sym+st_bind) : [<code>STB</code>](#STB)
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
| [opt.st_info] | <code>Integer</code> | 
| [opt.st_other] | <code>Char</code> | 
| [opt.st_shndx] | <code>Integer</code> | 
| [opt.st_type] | [<code>STT</code>](#STT) | 
| [opt.st_bind] | [<code>STB</code>](#STB) | 

<a name="Sym+structProps"></a>

### sym.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>Sym</code>](#Sym)  
**Read only**: true  
<a name="Sym+buffer"></a>

### sym.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>Sym</code>](#Sym)  
**Read only**: true  
<a name="Sym+st_type"></a>

### sym.st\_type : [<code>STT</code>](#STT)
**Kind**: instance property of [<code>Sym</code>](#Sym)  
<a name="Sym+st_bind"></a>

### sym.st\_bind : [<code>STB</code>](#STB)
**Kind**: instance property of [<code>Sym</code>](#Sym)  
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
    * [new SymTab(shdr)](#new_SymTab_new)
    * _instance_
        * [.buffer](#SymTab+buffer) : <code>Buffer</code>
        * [.toString()](#SymTab+toString) ⇒ <code>String</code>
        * [.buildFromBuffer(buff)](#SymTab+buildFromBuffer) ⇒ [<code>SymTab</code>](#SymTab)
        * [.addSym()](#SymTab+addSym) ⇒ [<code>Sym</code>](#Sym)
    * _static_
        * [.Sym](#SymTab.Sym) : <code>Prototype</code>

<a name="new_SymTab_new"></a>

### new SymTab(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

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

<a name="SymTab+addSym"></a>

### symTab.addSym() ⇒ [<code>Sym</code>](#Sym)
Adds a new symbol

**Kind**: instance method of [<code>SymTab</code>](#SymTab)  

| Param | Type |
| --- | --- |
| [opt.st_name] | <code>Integer</code> | 
| [opt.st_value] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.st_size] | <code>Integer</code> \| <code>BigInt</code> | 
| [opt.st_info] | [<code>STT</code>](#STT) | 
| [opt.st_other] | <code>Char</code> | 
| [opt.st_shndx] | <code>Integer</code> | 

<a name="SymTab.Sym"></a>

### SymTab.Sym : <code>Prototype</code>
**Kind**: static property of [<code>SymTab</code>](#SymTab)  
**Read only**: true  
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

<a name="MipsOption"></a>

## MipsOption
**Kind**: global class  

* [MipsOption](#MipsOption)
    * [new MipsOption()](#new_MipsOption_new)
    * [.structProps](#MipsOption+structProps) : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
    * [.buffer](#MipsOption+buffer) : <code>Buffer</code>
    * [.toString()](#MipsOption+toString) ⇒ <code>String</code>
    * [.buildFromBuffer(buff)](#MipsOption+buildFromBuffer) ⇒ [<code>SHdr</code>](#SHdr)

<a name="new_MipsOption_new"></a>

### new MipsOption()

| Param | Type |
| --- | --- |
| opt.N | <code>Integer</code> | 
| opt.LE | <code>Boolean</code> | 

<a name="MipsOption+structProps"></a>

### mipsOption.structProps : [<code>Array.&lt;StructProp&gt;</code>](#StructProp)
**Kind**: instance property of [<code>MipsOption</code>](#MipsOption)  
**Read only**: true  
<a name="MipsOption+buffer"></a>

### mipsOption.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>MipsOption</code>](#MipsOption)  
**Read only**: true  
<a name="MipsOption+toString"></a>

### mipsOption.toString() ⇒ <code>String</code>
**Kind**: instance method of [<code>MipsOption</code>](#MipsOption)  
<a name="MipsOption+buildFromBuffer"></a>

### mipsOption.buildFromBuffer(buff) ⇒ [<code>SHdr</code>](#SHdr)
Build from buff

**Kind**: instance method of [<code>MipsOption</code>](#MipsOption)  
**Returns**: [<code>SHdr</code>](#SHdr) - Reference to this instance  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="MipsOptions"></a>

## MipsOptions
**Kind**: global class  

* [MipsOptions](#MipsOptions)
    * [new MipsOptions(shdr)](#new_MipsOptions_new)
    * [.buffer](#MipsOptions+buffer) : <code>Buffer</code>
    * [.buildFromBuffer(buff)](#MipsOptions+buildFromBuffer) ⇒ [<code>MipsOptions</code>](#MipsOptions)
    * [.addOption()](#MipsOptions+addOption) ⇒ [<code>MipsOption</code>](#MipsOption)

<a name="new_MipsOptions_new"></a>

### new MipsOptions(shdr)

| Param | Type |
| --- | --- |
| shdr | [<code>SHdr</code>](#SHdr) | 

<a name="MipsOptions+buffer"></a>

### mipsOptions.buffer : <code>Buffer</code>
**Kind**: instance property of [<code>MipsOptions</code>](#MipsOptions)  
**Read only**: true  
<a name="MipsOptions+buildFromBuffer"></a>

### mipsOptions.buildFromBuffer(buff) ⇒ [<code>MipsOptions</code>](#MipsOptions)
Builds from buffer

**Kind**: instance method of [<code>MipsOptions</code>](#MipsOptions)  

| Param | Type |
| --- | --- |
| buff | <code>Buffer</code> | 

<a name="MipsOptions+addOption"></a>

### mipsOptions.addOption() ⇒ [<code>MipsOption</code>](#MipsOption)
Add a string to the table
Triggers SHDr owner to rebuild its data buffer

**Kind**: instance method of [<code>MipsOptions</code>](#MipsOptions)  

| Param | Type |
| --- | --- |
| opt.kind | <code>Char</code> | 
| opt.section | <code>Integer</code> | 
| opt.info | <code>Info</code> | 
| [opt.data] | <code>Buffer</code> | 

<a name="DT"></a>

## DT : <code>JSON</code>
Dynamic section tags.

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="ELFOSABI"></a>

## ELFOSABI : <code>JSON</code>
**Kind**: global constant  
**Reference**: elf/common.h  
<a name="EM"></a>

## EM : <code>JSON</code>
Machine types

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="ET"></a>

## ET : <code>JSON</code>
Object file type

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="NT"></a>

## NT : <code>JSON</code>
Values of note segment descriptor types for core files.

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="PT"></a>

## PT : <code>JSON</code>
Program header type

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="SHT"></a>

## SHT : <code>JSON</code>
Section Header Type

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="STB"></a>

## STB : <code>JSON</code>
Symbol binding

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="STT"></a>

## STT : <code>JSON</code>
Symbol type

**Kind**: global constant  
**Reference**: elf/common.h  
<a name="STV"></a>

## STV : <code>JSON</code>
Symbol visibity (st_other)

**Kind**: global constant  
**Read only**: true  
**Reference**: elf/common.h  
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

<a name="parseHeader"></a>

## parseHeader(opt, opt) ⇒ <code>JSON</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code> \| <code>Object</code>
**Kind**: global function  
**Returns**: <code>JSON</code> - parsed<code>Object</code> - parsed.DT   Name => Int<code>Object</code> - parsed.SHT  Name => Int<code>Object</code> - parsed.NT   Name => Int<code>Object</code> - parsed.PT   Name => Int<code>Object</code> - parsed.struct  Name => StructInfo[]  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>String</code> | Header file path |
| opt | <code>JSON</code> | Options |
| opt.fpath | <code>String</code> | Header file path |
| opt.jsonOut | <code>String</code> | File path to write out JSON to |

<a name="genArch"></a>

## genArch([dirOut]) ⇒ [<code>Array.&lt;Elf&gt;</code>](#Elf)
Creates an archive that should hit every machine flag decode branch as well as the process_archive branch

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [dirOut] | <code>String</code> | <code>&#x27;.&#x27;</code> | 

<a name="genElf"></a>

## genElf() ⇒ [<code>Elf</code>](#Elf)
Writes file to output directory in form `elf-gen_${key}`

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opt.key | <code>String</code> |  | Name of json file, extension not necessary |
| [opt.common] | <code>JSON</code> |  | Add DT & NT from common.h |
| [opt.outDir] | <code>String</code> | <code>&#x27;.&#x27;</code> | Output Directory |

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

<a name="TagInfo"></a>

## TagInfo : <code>JSON</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| d_tag | <code>String</code> |  |
| [d_un] | <code>Integer</code> \| <code>BigInt</code> | Only optional if string index will be generated |
| [name] | <code>String</code> | Necessary if d_tag type defines a string table offset |

