import { browser } from 'protractor';
import { PersonalInformationPage } from '../src/page';
import { DownloadService } from '../src/service';

describe('Given a page to practice automation', () => {
  beforeAll(async () => {
    await browser.get('http://toolsqa.com/automation-practice-form/');
  });

  describe('when I am training locators', () => {
    const personalInformationPage = new PersonalInformationPage();

    beforeAll(async () => {
      await personalInformationPage.fillForm({
        firstName: 'Alejandro',
        lastName: 'Perdomo',
        sex: 'Male',
        experience: 7,
        profession: ['Automation Tester'],
        tools: ['Selenium Webdriver'],
        continent: 'South America',
        file: './resources/photo.jpg',
        downloadFile: true,
        commands: [
          'Browser Commands',
          'Navigation Commands',
          'Switch Commands',
          'Wait Commands',
          'WebElement Commands']
      });
    });

    it('the form should be filled', async () => {
      expect(await personalInformationPage.getPageTitle()).toBe('Practice Automation Form');
    });

    it('then filename should be loaded', async () => {
      expect(await personalInformationPage.getFilename()).toBe('photo.jpg');
    });

    it('then should be created a file', async () => {
      const service = new DownloadService();
      const file = await service.readFileFromTemp('test-document.xlsx');
      expect(file.byteLength).toBeGreaterThanOrEqual(8000);
    });
  });
});
