import { browser, Config } from 'protractor';
// import { reporter } from './helpers/reporter';

export let config: Config = {
  framework: 'jasmine',
  specs: ['../test/**/*.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  noGlobals: true,
  getPageTimeout: 30000,
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2,
    chromeOptions: {
      args: ['disable-infobars=true', '--window-size=800,600'],
      prefs: { credentials_enable_service: false }
    }
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  },
  onPrepare: () => {
    // reporter();
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(0);
  }
};
