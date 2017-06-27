/* eslint no-unused-vars: "off" */
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-material';
import '@uirouter/angularjs';
import 'angular-translate';
import 'angular-translate-loader-static-files';

import _ from 'lodash';

import config from './config';

import {wizard} from './app/wizard';
import {textInput} from './app/textInput';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ngMessages', 'ngSanitize', 'ngMaterial', 'pascalprecht.translate', 'ui.router'])
  .config(config)
  .component('app', wizard)
  .component('textInput', textInput)
  .filter('size', () => {
    return input => {
      const match = input.match(/^(\d+)([bkmg])$/);
      if (match) {
        return `${match[1]} ${_.toUpper(match[2])}B`;
      }
      return input;
    };
  })
  .filter('archiveName', () => {
    return input => {
      if (input === '<archive_name>') {
        return input;
      }
      input = _.trim(_.replace(input, /[\\/:*?"<>|]/g, '_'));

      if (_.includes(input, ' ')) {
        return `"${input}"`;
      }

      return input;
    };
  });
