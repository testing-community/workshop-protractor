import { browser } from 'protractor';
import { IFramePage } from '../src/page';

fdescribe('Given a page with Iframes', () => {
  beforeAll(async () => {
    await browser.get('http://toolsqa.com/iframe-practice-page/');
  });

  describe('when set the height of iframe', () => {
    const iframe = new IFramePage();

    beforeAll(async () => {
      await iframe.setFormFrameHeight(600);
    });

    it('then the height of iframe should be changed', async () => {
      expect(await iframe.getHeight()).toBe(600);
    });
  });
});
