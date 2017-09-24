import { $, ElementFinder, promise } from 'protractor';

export class ProductDetailPage {
  private get addToCartButton(): ElementFinder {
    return $('#add_to_cart > button > span');
  }

  public adToCart(): promise.Promise<void> {
    return this.addToCartButton.click();
  }
}
