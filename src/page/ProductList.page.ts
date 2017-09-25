import { $$, ElementFinder, ElementArrayFinder, promise } from 'protractor';

export class ProductListPage {
  private get products(): ElementArrayFinder {
    return $$('.product-container');
  }

  private findByProduct(productName: string): ElementFinder {
    return this.products
      .filter((item: ElementFinder) =>
        item
          .$('.product-name')
          .getText()
          .then((text: string) => text.includes(productName)))
      .first();
  }

  public selectProduct(productName: string): promise.Promise<void> {
    return this.findByProduct(productName).$('img').click();
  }
}
