import { Config } from 'protractor';
import { reporter } from './helpers/reporter';

export const config: Config = {
  framework: 'jasmine',
  specs: ['../test/google.spec.js'],
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: () => {
    reporter();
  }
};
