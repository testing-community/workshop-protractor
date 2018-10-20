import { $, browser, ElementFinder, promise } from 'protractor';

export class IFramePage {
  private frame: ElementFinder;
  private documentTitleLabel: ElementFinder;

  constructor() {
    this.documentTitleLabel = $('#main h1');
    this.frame = $('#IF1');
  }

  public setFormFrameHeight(height: number): promise.Promise<void> {
    return browser
      .executeScript(`document.querySelector("#IF1").setAttribute('height', ${height});`);
  }

  public async getHeight(): Promise<number> {
    const height = await this.frame.getAttribute('height');

    return Number(height);
  }

  public async getTitle(): Promise<string> {
    return await this.documentTitleLabel.getText();
  }

  public async switchToFrame(): Promise<void> {
    await browser.switchTo().frame(this.frame.getWebElement());
  }

  public async switchToMainPage(): Promise<void> {
    await browser.switchTo().defaultContent();
  }
}
