import { $, ElementFinder, promise } from 'protractor';

export class ProductListPage {
  private get firstItem(): ElementFinder {
    return $('#center_column > ul > li > div > div.left-block > div > a.product_img_link > img');
  }

  public selectFirstItem(): promise.Promise<void> {
    return this.firstItem.click();
  }
}
