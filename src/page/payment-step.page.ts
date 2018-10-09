import { $, ElementFinder } from 'protractor';

export class PaymentStepPage {
  private payByBankWireOption: ElementFinder;

  constructor() {
    this.payByBankWireOption = $('.bankwire');
  }

  public async payByBankWire(): Promise<void> {
    await this.payByBankWireOption.click();
  }
}
