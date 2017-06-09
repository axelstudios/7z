import _ from 'lodash';
import {LANGUAGES} from './app/languages';
export default config;

/* @ngInject */
// eslint-disable-next-line max-params
function config($compileProvider, $stateProvider, $translateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    });

  $compileProvider.debugInfoEnabled(false);
  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);

  let language = localStorage.getItem('lang');
  if (!_.includes(_.keys(LANGUAGES), language)) {
    language = 'en';
  }

  $translateProvider
    .preferredLanguage(language)
    .fallbackLanguage('en')
    .useStaticFilesLoader({
      prefix: 'translations/',
      suffix: '.json'
    })
    .useSanitizeValueStrategy('escape');
}
