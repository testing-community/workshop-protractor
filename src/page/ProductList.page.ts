import { $$, ElementFinder, ElementArrayFinder } from 'protractor';

export class ProductListPage {
  private products: ElementArrayFinder;

  constructor() {
    this.products = $$('.product-container');
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

  public async selectProduct(productName: string): Promise<void> {
    await this.findByProduct(productName).$('img').click();
  }
}
