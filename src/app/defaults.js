export const defaults = {
  '7z': {
    compressionLevel: 5,
    compressionLevels: [0, 1, 3, 5, 7, 9],
    compressionMethod: 'LZMA2',
    compressionMethods: {
      LZMA2: {
        dictionarySizes: ['64k', '1m', '2m', '3m', '4m', '6m', '8m', '12m', '16m', '24m', '32m', '48m', '64m', '96m', '128m', '192m', '256m', '384m', '512m', '768m', '1024m', '1536m'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 273],
        solidBlockSizes: ['off', '1m', '2m', '4m', '8m', '16m', '32m', '64m', '128m', '256m', '512m', '1g', '2g', '4g', '8g', '16g', '32g', '64g', 'on'],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '64k',
            wordSize: 32,
            solidBlockSize: '8m'
          },
          3: {
            dictionarySize: '1m',
            wordSize: 32,
            solidBlockSize: '128m'
          },
          5: {
            dictionarySize: '16m',
            wordSize: 32,
            solidBlockSize: '2g'
          },
          7: {
            dictionarySize: '32m',
            wordSize: 64,
            solidBlockSize: '4g'
          },
          9: {
            dictionarySize: '64m',
            wordSize: 64,
            solidBlockSize: '4g'
          }
        }
      },
      LZMA: {
        dictionarySizes: ['64k', '1m', '2m', '3m', '4m', '6m', '8m', '12m', '16m', '24m', '32m', '48m', '64m', '96m', '128m', '192m', '256m', '384m', '512m', '768m', '1024m', '1536m'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 273],
        solidBlockSizes: ['off', '1m', '2m', '4m', '8m', '16m', '32m', '64m', '128m', '256m', '512m', '1g', '2g', '4g', '8g', '16g', '32g', '64g', 'on'],
        maxThreads: 2,
        compressionLevels: {
          1: {
            dictionarySize: '64k',
            wordSize: 32,
            solidBlockSize: '8m'
          },
          3: {
            dictionarySize: '1m',
            wordSize: 32,
            solidBlockSize: '128m'
          },
          5: {
            dictionarySize: '16m',
            wordSize: 32,
            solidBlockSize: '2g'
          },
          7: {
            dictionarySize: '32m',
            wordSize: 64,
            solidBlockSize: '4g'
          },
          9: {
            dictionarySize: '64m',
            wordSize: 64,
            solidBlockSize: '4g'
          }
        }
      },
      PPMd: {
        dictionarySizes: ['1m', '2m', '3m', '4m', '6m', '8m', '12m', '16m', '24m', '32m', '48m', '64m', '96m', '128m', '192m', '256m', '384m', '512m', '768m', '1024m'],
        wordSizes: [2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32],
        solidBlockSizes: ['off', '1m', '2m', '4m', '8m', '16m', '32m', '64m', '128m', '256m', '512m', '1g', '2g', '4g', '8g', '16g', '32g', '64g', 'on'],
        maxThreads: 1,
        compressionLevels: {
          1: {
            dictionarySize: '4m',
            wordSize: 4,
            solidBlockSize: '512m'
          },
          3: {
            dictionarySize: '4m',
            wordSize: 4,
            solidBlockSize: '512m'
          },
          5: {
            dictionarySize: '16m',
            wordSize: 6,
            solidBlockSize: '2g'
          },
          7: {
            dictionarySize: '64m',
            wordSize: 16,
            solidBlockSize: '4g'
          },
          9: {
            dictionarySize: '192m',
            wordSize: 32,
            solidBlockSize: '4g'
          }
        }
      },
      BZip2: {
        dictionarySizes: ['100k', '200k', '300k', '400k', '500k', '600k', '700k', '800k', '900k'],
        wordSizes: [],
        solidBlockSizes: ['off', '1m', '2m', '4m', '8m', '16m', '32m', '64m', '128m', '256m', '512m', '1g', '2g', '4g', '8g', '16g', '32g', '64g', 'on'],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '100k',
            solidBlockSize: '8m'
          },
          3: {
            dictionarySize: '500k',
            solidBlockSize: '32m'
          },
          5: {
            dictionarySize: '900k',
            solidBlockSize: '64m'
          },
          7: {
            dictionarySize: '900k',
            solidBlockSize: '64m'
          },
          9: {
            dictionarySize: '900k',
            solidBlockSize: '64m'
          }
        }
      }
    }
  },
  bzip2: {
    compressionLevel: 5,
    compressionLevels: [1, 3, 5, 7, 9],
    compressionMethod: 'BZip2',
    compressionMethods: {
      BZip2: {
        dictionarySizes: ['100k', '200k', '300k', '400k', '500k', '600k', '700k', '800k', '900k'],
        wordSizes: [],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '100k'
          },
          3: {
            dictionarySize: '500k'
          },
          5: {
            dictionarySize: '900k'
          },
          7: {
            dictionarySize: '900k'
          },
          9: {
            dictionarySize: '900k'
          }
        }
      }
    }
  },
  gzip: {
    compressionLevel: 5,
    compressionLevels: [1, 5, 7, 9],
    compressionMethod: 'Deflate',
    compressionMethods: {
      Deflate: {
        dictionarySizes: ['32k'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 258],
        solidBlockSizes: [],
        maxThreads: null,
        compressionLevels: {
          1: {
            dictionarySize: '32k',
            wordSize: 32
          },
          5: {
            dictionarySize: '32k',
            wordSize: 32
          },
          7: {
            dictionarySize: '32k',
            wordSize: 64
          },
          9: {
            dictionarySize: '32k',
            wordSize: 128
          }
        }
      }
    }
  },
  tar: {
    compressionLevel: 0,
    compressionLevels: [0],
    compressionMethod: null,
    compressionMethods: []
  },
  wim: {
    compressionLevel: 0,
    compressionLevels: [0],
    compressionMethod: null,
    compressionMethods: []
  },
  xz: {
    compressionLevel: 5,
    compressionLevels: [1, 3, 5, 7, 9],
    compressionMethod: 'LZMA2',
    compressionMethods: {
      LZMA2: {
        dictionarySizes: ['64k', '1m', '2m', '3m', '4m', '6m', '8m', '12m', '16m', '24m', '32m', '48m', '64m', '96m', '128m', '192m', '256m', '384m', '512m', '768m', '1024m', '1536m'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 273],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '64k',
            wordSize: 32
          },
          3: {
            dictionarySize: '1m',
            wordSize: 32
          },
          5: {
            dictionarySize: '16m',
            wordSize: 32
          },
          7: {
            dictionarySize: '32m',
            wordSize: 64
          },
          9: {
            dictionarySize: '64m',
            wordSize: 64
          }
        }
      }
    }
  },
  zip: {
    compressionLevel: 5,
    compressionLevels: [0, 1, 3, 5, 7, 9],
    compressionMethod: 'Deflate',
    compressionMethods: {
      Deflate: {
        dictionarySizes: ['32k'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 258],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '32k',
            wordSize: 32
          },
          3: {
            dictionarySize: '32k',
            wordSize: 32
          },
          5: {
            dictionarySize: '32k',
            wordSize: 32
          },
          7: {
            dictionarySize: '32k',
            wordSize: 64
          },
          9: {
            dictionarySize: '32k',
            wordSize: 128
          }
        }
      },
      Deflate64: {
        dictionarySizes: ['64k'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 257],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '64k',
            wordSize: 32
          },
          3: {
            dictionarySize: '64k',
            wordSize: 32
          },
          5: {
            dictionarySize: '64k',
            wordSize: 32
          },
          7: {
            dictionarySize: '64k',
            wordSize: 64
          },
          9: {
            dictionarySize: '64k',
            wordSize: 128
          }
        }
      },
      BZip2: {
        dictionarySizes: ['100k', '200k', '300k', '400k', '500k', '600k', '700k', '800k', '900k'],
        wordSizes: [],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '100k'
          },
          3: {
            dictionarySize: '500k'
          },
          5: {
            dictionarySize: '900k'
          },
          7: {
            dictionarySize: '900k'
          },
          9: {
            dictionarySize: '900k'
          }
        }
      },
      LZMA: {
        dictionarySizes: ['64k', '1m', '2m', '3m', '4m', '6m', '8m', '12m', '16m', '24m', '32m', '48m', '64m', '96m', '128m', '192m', '256m', '384m', '512m', '768m', '1024m', '1536m'],
        wordSizes: [8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 273],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '64k',
            wordSize: 32
          },
          3: {
            dictionarySize: '1m',
            wordSize: 32
          },
          5: {
            dictionarySize: '16m',
            wordSize: 32
          },
          7: {
            dictionarySize: '32m',
            wordSize: 64
          },
          9: {
            dictionarySize: '64m',
            wordSize: 64
          }
        }
      },
      PPMd: {
        dictionarySizes: ['1m', '2m', '4m', '8m', '16m', '32m', '64m', '128m', '256m'],
        wordSizes: [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16],
        solidBlockSizes: [],
        maxThreads: Infinity,
        compressionLevels: {
          1: {
            dictionarySize: '1m',
            wordSize: 4
          },
          3: {
            dictionarySize: '4m',
            wordSize: 6
          },
          5: {
            dictionarySize: '16m',
            wordSize: 8
          },
          7: {
            dictionarySize: '64m',
            wordSize: 10
          },
          9: {
            dictionarySize: '128m',
            wordSize: 12
          }
        }
      }
    }
  }
};
