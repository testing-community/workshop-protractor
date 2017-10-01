import { element, by, ElementFinder, browser } from 'protractor';

export class PersonalInformationPage {
  private get firstNameField(): ElementFinder {
    return element(by.name('firstname'));
  }

  private get lastNameField(): ElementFinder {
    return element(by.name('lastname'));
  }

  private get sendButton(): ElementFinder {
    return element(by.id('submit'));
  }

  private get pageTitleLabel(): ElementFinder {
    return element(by.id('content')).element(by.tagName('h1'));
  }

  private sexOption(name: string): ElementFinder {
    return element(by.css(`[name="sex"][value="${name}"]`));
  }

  private experienceOption(years: number): ElementFinder {
    return element(by.css(`[name="exp"][value="${years}"]`));
  }

  private professionOption(name: string): ElementFinder {
    return element(by.css(`[name="profession"][value="${name}"]`));
  }

  private toolsOption(name: string): ElementFinder {
    return element(by.css(`[name="tool"][value="${name}"]`));
  }

  private continentOption(name: string): ElementFinder {
    return element(by.id('continents')).element(by.cssContainingText('option', name));
  }

  private seleniumCommandOption(name: string): ElementFinder {
    return element(by.id('selenium_commands')).element(by.cssContainingText('option', name));
  }

  public async getPageTitle(): Promise<string> {
    return await this.pageTitleLabel.getText();
  }

  public async fillForm(form: {
    firstName: string,
    lastName: string,
    sex: string,
    experience: number,
    profession: string[],
    tools: string[],
    continent: string,
    commands: string[]
  }): Promise<void> {
    await this.firstNameField.sendKeys(form.firstName);
    await this.lastNameField.sendKeys(form.lastName);
    await this.sexOption(form.sex).click();
    await this.experienceOption(form.experience).click();

    for (const name of form.profession) {
      await this.professionOption(name).click();
    }

    for (const name of form.tools) {
      await this.toolsOption(name).click();
    }

    await this.continentOption(form.continent).click();

    for (const name of form.commands) {
      await this.seleniumCommandOption(name).click();
    }

    browser.sleep(1000);
    await this.sendButton.click();
  }
}
