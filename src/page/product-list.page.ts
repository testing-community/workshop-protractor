import { $$, ElementFinder, ElementArrayFinder, browser } from 'protractor';

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
    const card = this.findByProduct(productName);

    await browser.actions().mouseMove(card.$('img')).perform();
    await card.$('.ajax_add_to_cart_button.btn.btn-default').click();
  }
}
