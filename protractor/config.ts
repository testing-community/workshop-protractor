import { browser, Config } from 'protractor';
import { reporter }   from './helpers/reporter';

export let config: Config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../test/Google.spec.js'],
  helpers: [ './test/helpers/reporter.js'],
  noGlobals: true,
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
  }
}
