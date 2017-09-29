import { browser, Config } from 'protractor';
import { reporter } from './helpers/reporter';

let sauceUser;
let sauceKey;
if (process.env.SAUCE === 'true') {
  sauceUser = process.env.SAUCE_USERNAME;
  sauceKey = process.env.SAUCE_ACCESS_KEY;
}

export let config: Config = {
  sauceUser,
  sauceKey,
  framework: 'jasmine',
  specs: ['../test/**/*.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  noGlobals: true,
  getPageTimeout: 30000,
  capabilities: {
    name: 'UI Workshop',
    browserName: 'chrome',
    chromeOptions: {
      args: ['disable-infobars=true --window-size=800,600'],
      prefs: { credentials_enable_service: false }
    }
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  },
  onPrepare: () => {
    reporter();
    browser.ignoreSynchronization = true;
    browser.manage().timeouts().implicitlyWait(0);
  }
};
