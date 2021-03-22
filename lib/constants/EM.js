/**
 * Machine types
 * @type {JSON}
 * @reference elf/common.h
 */
const EM = {
    toString: () => 'EM_',
        NONE: 0,
         M32: 1,
       SPARC: 2,
       '386': 3,
       '68K': 4,
       '88K': 5,
       IAMCU: 6,
       '860': 7,
        MIPS: 8,
        S370: 9,
 MIPS_RS3_LE: 10,
    // 11 was the old Sparc V9 ABI.
OLD_SPARC_V9: 11,
    // 12 through 14 are reserved.
      PARISC: 15,
    // 16 is reserved.
    // Some old PowerPC object files use 17.
     PPC_OLD: 17,
      VPP500: 17,
 SPARC32PLUS: 18,
       '960': 19,
         PPC: 20,
       PPC64: 21,
        S390: 22,
       // 23 through 35 are served.
        V800: 36,
        FR20: 37,
        RH32: 38,
         RCE: 39,
         ARM: 40,
       ALPHA: 41,
          SH: 42,
     SPARCV9: 43,
     TRICORE: 44,
         ARC: 45,
      H8_300: 46,
     H8_300H: 47,
         H8S: 48,
      H8_500: 49,
       IA_64: 50,
      MIPS_X: 51,
    COLDFIRE: 52,
    '68HC12': 53,
         MMA: 54,
         PCP: 55,
        NCPU: 56,
        NDR1: 57,
    STARCORE: 58,
        ME16: 59,
       ST100: 60,
       TINYJ: 61,
      X86_64: 62,
        PDSP: 63,
       PDP10: 64,
       PDP11: 65,
        FX66: 66,
     ST9PLUS: 67,
         ST7: 68,
    '68HC16': 69,
    '68HC11': 70,
    '68HC08': 71,
    '68HC05': 72,
         SVX: 73,
        ST19: 74,
         VAX: 75,
        CRIS: 76,
     JAVELIN: 77,
    FIREPATH: 78,
         ZSP: 79,
        MMIX: 80,
       HUANY: 81,
       PRISM: 82,
         AVR: 83,
        FR30: 84,
        D10V: 85,
        D30V: 86,
        V850: 87,
        M32R: 88,
     MN10300: 89,
     MN10200: 90,
          PJ: 91,
        OR1K: 92,
      ARC_A5: 93,
      XTENSA: 94,
   VIDEOCORE: 95,
     TMM_GPP: 96,
       NS32K: 97,
         TPC: 98,
      // Some old picoJava object files use 99 (PJ is correct).
       SNP1K: 99,
       ST200: 100,
        IP2K: 101,
         MAX: 102,
          CR: 103,
      F2MC16: 104,
      MSP430: 105,
    BLACKFIN: 106,
      SE_C33: 107,
         SEP: 108,
        ARCA: 109,
     UNICORE: 110,
ALTERA_NIOS2: 113,
         CRX: 114,
      TI_PRU: 144,
     AARCH64: 183,
      TILEGX: 191,
          // The Morph MT.
          MT: 0x2530,
         // #DLX.
         DLX: 0x5aa5,
         // FRV.
         FRV: 0x5441,
        // Infineon Technologies 16-bit microcontroller with C166-V2 core.
        X16X: 0x4688,
   // Xstorym16
   XSTORMY16: 0xad45,
        // Renesas M32C
        M32C: 0xfeb0,
      // #Vitesse IQ2000
      IQ2000: 0xfeba,
      // NIOS
      NIOS32: 0xfebb,
     // #Old AVR objects used 0x1057 (AVR is correct).
     AVR_OLD: 0x1057,
  // Old MSP430 objects used 0x1059 (MSP430 is correct).
  MSP430_OLD: 0x1059,
    // Old FR30 objects used 0x3330 (FR30 is correct).
    FR30_OLD: 0x3330,
    // Old OpenRISC objects used 0x3426 and 0x8472 (OR1K is correct).
    OR1K_OLD: 0x3426,
    // Old D10V objects used 0x7650 (D10V is correct).
    D10V_OLD: 0x7650,
    // Old D30V objects used 0x7676 (D30V is correct).
    D30V_OLD: 0x7676,
    // Old IP2X objects used 0x8217 (IP2K is correct).
    IP2K_OLD: 0x8217,
    // Old PowerPC objects used 0x9025 (PPC is correct).
 POWERPC_OLD: 0x9025,
    // Old Alpha objects used 0x9026 (ALPHA is correct).
   ALPHA_OLD: 0x9026,
    // Old M32R objects used 0x9041 (M32R is correct).
    M32R_OLD: 0x9041,
    // Old V850 objects used 0x9080 (V850 is correct).
    V850_OLD: 0x9080,
    // Old S/390 objects used 0xa390 (S390 is correct).
    S390_OLD: 0xa390,
  // Old Xtensa objects used 0xabc7 (XTENSA is correct).
  XTENSA_OLD: 0xabc7,
    MICROBLAZE_OLD: 0xbaab,
    // Old MN10300 objects used 0xbeef (MN10300 is correct).
    MN10300_OLD: 0xbeef,
    // Old MN10200 objects used 0xdead (MN10200 is correct).
    MN10200_OLD: 0xdead,
}

module.exports = EM;
