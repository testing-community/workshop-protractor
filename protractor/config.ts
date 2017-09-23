import { browser, Config } from 'protractor';

export let config: Config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../test/Google.spec.js'],
  noGlobals: true,
  onPrepare: () => {
    browser.ignoreSynchronization = true;
  }
}
