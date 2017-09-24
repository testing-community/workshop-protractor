import { $, ElementFinder } from 'protractor';

export class SignInStepPage {
  private get emailField(): ElementFinder {
    return $('#email');
  }

  private get passwordFiled(): ElementFinder {
    return $('#passwd');
  }

  private get submitLoginButton(): ElementFinder {
    return $('#SubmitLogin > span');
  }

  public async login(email: string, password: string): Promise<void> {
    await this.emailField.sendKeys(email);
    await this.passwordFiled.sendKeys(password);
    await this.submitLoginButton.click();
  }
}
