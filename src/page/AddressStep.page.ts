import { $, ElementFinder, promise } from 'protractor';

export class AddressStepPage {
  private get proceedToCheckoutButton(): ElementFinder {
    return $('#center_column > form > p > button > span');
  }

  public proceedToCheckout(): promise.Promise<void> {
    return this.proceedToCheckoutButton.click();
  }
}
