import { browser } from 'protractor';
import { IFramePage, PersonalInformationPage } from '../src/page';

describe('Given a page with Iframes', () => {
  const iframe = new IFramePage();

  beforeAll(async () => {
    await browser.get('http://toolsqa.com/iframe-practice-page/');
  });

  it('then should be a title', async () => {
    expect(await iframe.getTitle()).toBe('Sample Iframe page');
  });

  describe('when set the height of iframe', () => {
    beforeAll(async () => {
      await iframe.setFormFrameHeight(600);
    });

    it('then the height of iframe should be changed', async () => {
      expect(await iframe.getHeight()).toBe(600);
    });

    describe('and switch to iframe', () => {
      const personalInformationPage = new PersonalInformationPage();
      beforeAll(async () => {
        await iframe.switchToFrame();
      });

      it('then should be have other title', async () => {
        expect(await personalInformationPage.getPageTitle()).toBe('Practice Automation Form');
      });

      describe('and return to main frame', () => {
        beforeAll(async () => {
          await iframe.switchToMainPage();
        });

        it('then should be a title', async () => {
          expect(await iframe.getTitle()).toBe('Sample Iframe page');
        });
      });
    });
  });
});
