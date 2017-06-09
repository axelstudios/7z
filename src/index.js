/* eslint no-unused-vars: "off" */
import angular from 'angular';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-material';
import '@uirouter/angularjs';
import 'angular-translate';
import 'angular-translate-loader-static-files';

import _ from 'lodash';

import config from './config';

import {wizard} from './app/wizard';

import './index.scss';

export const app = 'app';

angular
  .module(app, ['ngMessages', 'ngSanitize', 'ngMaterial', 'pascalprecht.translate', 'ui.router'])
  .config(config)
  .component('app', wizard)
  .filter('size', () => {
    return input => {
      const match = input.match(/^(\d+)([bkmg])$/);
      if (match) {
        return `${match[1]} ${_.toUpper(match[2])}B`;
      }
      return input;
    };
  });
