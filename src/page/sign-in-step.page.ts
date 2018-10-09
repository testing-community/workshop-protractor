import { $, ElementFinder } from 'protractor';

export class SignInStepPage {
  private emailField: ElementFinder;
  private passwordFiled: ElementFinder;
  private submitLoginButton: ElementFinder;

  constructor() {
    this.emailField = $('#email');
    this.passwordFiled = $('#passwd');
    this.submitLoginButton = $('#SubmitLogin');
  }

  public async login(email: string, password: string): Promise<void> {
    await this.emailField.sendKeys(email);
    await this.passwordFiled.sendKeys(password);
    await this.submitLoginButton.click();
  }
}
