import { $, ElementFinder, promise } from 'protractor';

export class PaymentStepPage {
  private get payByBankWireOption(): ElementFinder {
    return $('.bankwire');
  }

  public payByBankWire(): promise.Promise<void> {
    return this.payByBankWireOption.click();
  }
}
