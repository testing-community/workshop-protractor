import { $, ElementFinder, promise } from 'protractor';

export class ProductAddedModalPage {
  private get proceedToCheckoutButton(): ElementFinder {
    return $('.button-container > a');
  }

  public proceedToCheckout(): promise.Promise<void> {
    return this.proceedToCheckoutButton.click();
  }
}
