import { browser, Config } from 'protractor';
import { reporter }   from './helpers/reporter';

export let config: Config = {
  framework: 'jasmine',
  specs: ['../test/**/*.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  noGlobals: true,
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
  }
};
