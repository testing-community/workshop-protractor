import { $, ElementFinder, promise } from 'protractor';

export class AddressStepPage {
  private get proceedToCheckoutButton(): ElementFinder {
    return $('[name="processAddress"]');
  }

  public proceedToCheckout(): promise.Promise<void> {
    return this.proceedToCheckoutButton.click();
  }
}
