import { $, ElementFinder, promise } from 'protractor';

export class ProductListPage {
  private get firstItem(): ElementFinder {
    return $('.product-container img');
  }

  public selectFirstItem(): promise.Promise<void> {
    return this.firstItem.click();
  }
}
