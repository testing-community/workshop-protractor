import { $, ElementFinder, promise } from 'protractor';

export class SummaryStepPage {
  private get proceedToCheckoutButton(): ElementFinder {
    return $('.cart_navigation span');
  }

  public proceedToCheckout(): promise.Promise<void> {
    return this.proceedToCheckoutButton.click();
  }
}
