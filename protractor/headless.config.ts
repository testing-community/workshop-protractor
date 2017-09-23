import { browser, Config } from 'protractor';
import { reporter } from './helpers/reporter';

export let config: Config = {
  framework: 'jasmine',
  specs: ['../test/Google.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  noGlobals: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=800,600']
    }
  },
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
  }
};
