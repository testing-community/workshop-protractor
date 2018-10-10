import { $, ElementFinder } from 'protractor';

export class AddressStepPage {
  private proceedToCheckoutButton: ElementFinder;

  constructor () {
    this.proceedToCheckoutButton = $('[name="processAddress"]');
  }

  public async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }
}
