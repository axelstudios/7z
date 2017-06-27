import _ from 'lodash';
import {defaults} from './defaults';
import {LANGUAGES} from './languages';

export const wizard = {
  template: require('./wizard.html'),
  /* @ngInject */
  controller($log, $mdDialog, $mdToast) {
    this._ = _;

    // Functions
    this.getCommand = getCommand;
    this.getType = getType;
    this.getCompressionLevel = getCompressionLevel;
    this.getCompressionMethod = getCompressionMethod;
    this.getCpuThreads = getCpuThreads;
    this.getMaxThreads = getMaxThreads;
    this.getDictionarySize = getDictionarySize;
    this.getWordSize = getWordSize;
    this.getSolidBlockSize = getSolidBlockSize;
    this.getMemoryUsage = getMemoryUsage;
    this.getSplitToVolume = getSplitToVolume;
    this.getStoreSymbolicLinks = getStoreSymbolicLinks;
    this.getStoreHardLinks = getStoreHardLinks;
    this.getStoreAlternateDataStreams = getStoreAlternateDataStreams;
    this.getStoreFileSecurity = getStoreFileSecurity;
    this.getPathMode = getPathMode;
    this.getSfxArchive = getSfxArchive;
    this.getCompressSharedFiles = getCompressSharedFiles;
    this.getDeleteFilesAfter = getDeleteFilesAfter;
    this.getPassword = getPassword;
    this.getPassTxt = getPassTxt;
    this.getEncryptionMethod = getEncryptionMethod;
    this.getEncryptFileNames = getEncryptFileNames;

    this.archiveFormatChanged = archiveFormatChanged;
    this.compressionLevelChanged = compressionLevelChanged;
    this.compressionMethodChanged = compressionMethodChanged;
    this.splitToVolumeBlur = splitToVolumeBlur;
    this.passwordChanged = passwordChanged;
    this.encryptionMethodChanged = encryptionMethodChanged;

    this.openSettings = openSettings;

    // Input Options
    this.archiveFormats = _.keys(defaults);
    this.archiveFormat = '7z';

    this.cores = navigator.hardwareConcurrency || 8;

    this.splitToVolumeOptions = [
      '10M',
      '100M',
      '1000M',
      '650M - CD',
      '700M - CD',
      '4092M - FAT',
      '4480M - DVD',
      '8128M - DVD DL',
      '23040M - BD'
    ];
    this.splitToVolumeRegex = /^(\d+ *[bkmgt]?(?: +\d+ *[bkmgt]?)*)(?: *-.*)?$/i;

    this.updateModes = {
      add: 'UPDATE_MODES.ADD_AND_REPLACE_FILES',
      update: 'UPDATE_MODES.UPDATE_AND_ADD_FILES',
      freshen: 'UPDATE_MODES.FRESHEN_EXISTING_FILES',
      synchronize: 'UPDATE_MODES.SYNCHRONIZE_FILES'
    };
    this.updateMode = 'add';

    this.pathModes = {
      relative: 'PATH_MODES.RELATIVE_PATHNAMES',
      full: 'PATH_MODES.FULL_PATHNAMES',
      absolute: 'PATH_MODES.ABSOLUTE_PATHNAMES'
    };
    this.pathMode = 'relative';

    function getCommand() {
      switch (this.updateMode) {
        case 'add':
          return 'a';
        case 'update':
          return 'u';
        case 'freshen':
          return 'u -ur0';
        case 'synchronize':
          return 'u -uq0';
      }
    }

    function getType() {
      if (this.archiveFormat !== '7z') {
        return `-t${this.archiveFormat}`;
      }
    }

    function getCompressionLevel() {
      if (this.compressionLevel !== defaults[this.archiveFormat].compressionLevel) {
        return `-mx${this.compressionLevel}`;
      }
    }

    function getCompressionMethod() {
      if (this.compressionMethod !== defaults[this.archiveFormat].compressionMethod) {
        if (this.archiveFormat === '7z') {
          return `-m0${this.compressionMethod}`;
        } else if (this.archiveFormat === 'zip') {
          return `-mm${this.compressionMethod}`;
        }
      }
    }

    function getCpuThreads() {
      if (this.getMaxThreads() > 1) {
        const defaultCpuThreads = _.min([this.cores, this.getMaxThreads()]);
        if (this.cpuThreads === 1) {
          return '-mmtoff';
        } else if (this.cpuThreads !== defaultCpuThreads) {
          return `-mmt${this.cpuThreads}`;
        }
      }
    }

    function getMaxThreads() {
      const maxThreads = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'maxThreads'], null);
      if (maxThreads === Infinity) {
        return 2 * this.cores;
      }
      return maxThreads;
    }

    function getDictionarySize() {
      if (!_.isEmpty(this.dictionarySizes) && this.dictionarySize !== _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'compressionLevels', this.compressionLevel, 'dictionarySize'], null)) {
        return `-md${this.dictionarySize}`;
      }
    }

    function getWordSize() {
      if (!_.isEmpty(this.wordSizes) && this.wordSize !== _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'compressionLevels', this.compressionLevel, 'wordSize'], null)) {
        return `-mfb${this.wordSize}`;
      }
    }

    function getSolidBlockSize() {
      if (!_.isEmpty(this.solidBlockSizes) && this.solidBlockSize !== _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'compressionLevels', this.compressionLevel, 'solidBlockSize'], null) && this.solidBlockSize !== 'on') {
        return `-ms${this.solidBlockSize}`;
      }
    }

    function getMemoryUsage() {
      if (this.compressionLevel === 0) {
        return [1, 1];
      }
      const match = this.dictionarySize.match(/^(\d+)([bkmg])$/);
      let dictionarySize = _.toInteger(match[1]);
      switch (match[2]) {
        case 'g':
          dictionarySize <<= 10;
        case 'm':
          dictionarySize <<= 10;
        case 'k':
          dictionarySize <<= 10;
      }

      let size = 0;
      if (this.archiveFormat === '7z' && this.compressionLevel === 9) {
        size += 29 << 20;
      } else if (this.archiveFormat === 'zip') {
        const subThreads = (this.compressionMethod === 'LZMA' && this.cpuThreads > 1 && this.compressionLevel >= 5) ? 2 : 1;
        const mainThreads = _.floor(this.cpuThreads / subThreads);
        if (mainThreads > 1) {
          size += 32 * mainThreads;
        }
      }

      if (_.includes(['LZMA', 'LZMA2'], this.compressionMethod)) {
        let hs = dictionarySize - 1;
        hs |= (hs >> 1);
        hs |= (hs >> 2);
        hs |= (hs >> 4);
        hs |= (hs >> 8);
        hs >>= 1;
        hs |= 0xFFFF;
        if (hs > (1 << 24)) {
          hs >>= 1;
        }
        hs++;
        let size1 = hs * 4;
        size1 += dictionarySize * 4;
        if (this.compressionLevel >= 5) {
          size1 += dictionarySize * 4;
        }
        size1 += (2 << 20);

        let numThreads1 = 1;
        if (this.cpuThreads > 1 && this.compressionLevel >= 5) {
          size1 += (2 << 20) + (4 << 20);
          numThreads1 = 2;
        }

        const numBlockThreads = _.floor(this.cpuThreads / numThreads1);

        if (this.compressionMethod === 'LZMA' || numBlockThreads === 1) {
          size1 += _.floor(dictionarySize * 3 / 2);
        } else {
          let chunkSize = dictionarySize << 2;
          chunkSize = _.max([chunkSize, (1 << 20)]);
          chunkSize = _.min([chunkSize, (1 << 28)]);
          chunkSize = _.max([chunkSize, dictionarySize]);
          size1 += chunkSize * 2;
        }
        size += size1 * numBlockThreads;

        return [_.ceil(size / (1 << 20)), _.ceil((dictionarySize + (2 << 20)) / (1 << 20))];
      } else if (this.compressionMethod === 'PPMd') {
        const decompression = (dictionarySize >> 20) + 2;
        return [size + (decompression * this.cpuThreads), decompression];
      } else if (_.includes(['Deflate', 'Deflate64'], this.compressionMethod)) {
        if (this.compressionLevel >= 7) {
          size += 1;
        }
        size += 3;
        return [size, 2];
      } else if (this.compressionMethod === 'BZip2') {
        return [size + (10 * this.cpuThreads), 7];
      }
    }

    function getSplitToVolume() {
      if (!_.isEmpty(this.splitToVolume)) {
        const volumes = _.toLower(this.splitToVolume.match(this.splitToVolumeRegex)[1]);
        const volumesArr = _.map(volumes.match(/(\d+) *([bkmgt]?)/g), vol => vol.replace(/ /g, ''));
        return `-v${volumesArr.join(' -v')}`;
      }
    }

    function getStoreSymbolicLinks() {
      if (_.includes(['tar', 'wim'], this.archiveFormat) && this.storeSymbolicLinks) {
        return '-snl';
      }
    }

    function getStoreHardLinks() {
      if (_.includes(['tar', 'wim'], this.archiveFormat) && this.storeHardLinks) {
        return '-snh';
      }
    }

    function getStoreAlternateDataStreams() {
      if (this.archiveFormat === 'wim' && this.storeAlternateDataStreams) {
        return '-sns';
      }
    }

    function getStoreFileSecurity() {
      if (this.archiveFormat === 'wim' && this.storeFileSecurity) {
        return '-sni';
      }
    }

    function getPathMode() {
      switch (this.pathMode) {
        case 'full':
          return '-spf2';
        case 'absolute':
          return '-spf';
      }
    }

    function getSfxArchive() {
      if (this.sfxArchive) {
        return '-sfx';
      }
    }

    function getCompressSharedFiles() {
      if (this.compressSharedFiles) {
        return '-ssw';
      }
    }

    function getDeleteFilesAfter() {
      if (this.deleteFilesAfter) {
        return '-sdel';
      }
    }

    function getPassword() {
      if (!_.isEmpty(this.password) && _.includes(['7z', 'zip'], this.archiveFormat)) {
        if (_.includes(this.password, '"')) {
          return '-p';
        } else if (/^[a-z0-9-'\\.*?=]+$/i.test(this.password)) {
          return `-p${this.password}`;
        }
        return `-p"${this.password}"`;
      }
    }

    function getPassTxt() {
      if (_.includes(this.password, '"') && _.includes(['7z', 'zip'], this.archiveFormat)) {
        const pass = _.replace(this.password, /(["^<>&|])/g, char => {
          return `^${char}`;
        });
        return `echo ${pass}> pass.txt`;
      }
    }

    function getEncryptionMethod() {
      if (this.archiveFormat === 'zip' && this.encryptionMethod !== 'ZipCrypto') {
        return `-mem${this.encryptionMethod}`;
      }
    }

    function getEncryptFileNames() {
      if (!_.isEmpty(this.password) && this.encryptFileNames && this.archiveFormat === '7z') {
        return '-mhe';
      }
    }

    function archiveFormatChanged() {
      // Reset `Create SFX Archive checkbox`
      this.sfxArchive = false;

      // Restrict selections, set defaults
      this.compressionLevels = defaults[this.archiveFormat].compressionLevels;
      this.compressionLevel = defaults[this.archiveFormat].compressionLevel;
      this.compressionMethods = _.keys(defaults[this.archiveFormat].compressionMethods);
      this.compressionLevelChanged();

      // Restrict encryption methods, set default
      if (this.archiveFormat === '7z') {
        this.encryptionMethods = [{
          name: 'AES-256',
          value: 'AES256'
        }];
        this.encryptionMethod = 'AES256';
      } else if (this.archiveFormat === 'zip') {
        this.encryptionMethods = [{
          name: 'ZipCrypto',
          value: 'ZipCrypto'
        }, {
          name: 'AES-256',
          value: 'AES256'
        }];
        this.encryptionMethod = 'ZipCrypto';
      }
    }

    function compressionLevelChanged() {
      this.compressionMethod = defaults[this.archiveFormat].compressionMethod;
      this.compressionMethodChanged();
    }

    function compressionMethodChanged() {
      this.dictionarySizes = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'dictionarySizes'], []);
      this.dictionarySize = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'compressionLevels', this.compressionLevel, 'dictionarySize'], null);
      this.wordSizes = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'wordSizes'], []);
      this.wordSize = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'compressionLevels', this.compressionLevel, 'wordSize'], null);
      this.solidBlockSizes = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'solidBlockSizes'], []);
      this.solidBlockSize = _.get(defaults, [this.archiveFormat, 'compressionMethods', this.compressionMethod, 'compressionLevels', this.compressionLevel, 'solidBlockSize'], null);

      this.cpuThreads = _.min([this.cores, this.getMaxThreads()]);
    }

    function splitToVolumeBlur() {
      if (_.isString(this.splitToVolume)) {
        const match = this.splitToVolume.match(this.splitToVolumeRegex);
        if (match) {
          const volumes = _.toLower(match[1]);
          const volumesArr = _.map(volumes.match(/(\d+) *([bkmgt]?)/g), vol => vol.replace(/ /g, ''));
          const lastVolume = _.last(volumesArr);
          const volumeMatch = lastVolume.match(/^(\d+)([bkmgt]?)$/);
          let volumeSize = _.toInteger(volumeMatch[1]);
          switch (volumeMatch[2]) {
            case 't':
              volumeSize <<= 10;
            case 'g':
              volumeSize <<= 10;
            case 'm':
              volumeSize <<= 10;
            case 'k':
              volumeSize <<= 10;
          }

          // Warn if splitting to less than 100k
          if (volumeSize < (100 << 10)) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(`Splitting to ${volumeSize} byte volumes can result in a huge number of files`)
                .hideDelay(7000)
                .position('top right')
            );
          }
        }
      }
    }

    function passwordChanged() {
      if (_.isEmpty(this.password)) {
        this.passwordToastShown = false;
        $mdToast.hide();
      }

      // Double-quotes cause issues
      if (_.includes(this.password, '"')) {
        if (!this.passwordToastShown) {
          this.passwordToastShown = true;
          $mdToast.show({
            hideDelay: 7000,
            position: 'top right',
            template: require('./dialogs/quotes-toast.html')
          });
        }
      }
    }

    function encryptionMethodChanged() {
      if (this.archiveFormat === 'zip' && this.encryptionMethod === 'AES256') {
        this.passwordToastShown = true;
        $mdToast.show({
          hideDelay: 7000,
          position: 'top right',
          template: require('./dialogs/encryption-toast.html')
        });
      } else {
        $mdToast.hide();
      }
    }

    function openSettings($event) {
      $mdDialog.show({
        controller: ($scope, $mdDialog, $translate) => {
          $scope.language = $translate.use();
          $scope.languages = LANGUAGES;
          $scope.cancel = $mdDialog.cancel;
          $scope.save = function () {
            $translate.use($scope.language);
            localStorage.setItem('lang', $scope.language);
            $mdDialog.hide();
          };
        },
        targetEvent: $event,
        template: require('./dialogs/settings.html')
      });
    }

    this.archiveFormatChanged();
  }
};
