import { browser } from 'protractor';

describe('Given a SDET learning protractor', () => {
  describe('when open Google Page', () => {
    beforeEach(async () => {
      await browser.driver.get('http://www.google.com');
    });

    it('then should have a title', async () => {
      expect(await browser.driver.getTitle()).toEqual('Google');
    });
  });
});
