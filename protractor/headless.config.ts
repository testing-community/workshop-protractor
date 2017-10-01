import { browser, Config } from 'protractor';
import { reporter } from './helpers/reporter';
import { resolve } from 'path';

export let config: Config = {
  framework: 'jasmine',
  specs: ['../test/**/*.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  noGlobals: true,
  getPageTimeout: 30000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000 
  },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=800,600'],
      prefs: {
        credentials_enable_service: false,
        download: {
          default_directory: resolve(process.cwd(), 'temp')
        }
      }
    }
  },
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(0);
  }
};
