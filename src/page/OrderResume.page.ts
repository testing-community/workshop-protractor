import { $, ElementFinder, promise } from 'protractor';

export class OrderResumePage {
  private get orderTitleLabel(): ElementFinder {
    return $('#center_column .dark');
  }

  public getOrderTitle(): promise.Promise<string> {
    return this.orderTitleLabel.getText();
  }
}
