import { $, browser, ElementFinder, promise } from 'protractor';

export class IFramePage {
  private get frame(): ElementFinder {
    return $('#IF1');
  }

  private get documentTitleLabel(): ElementFinder {
    return $('#main h1');
  }

  public setFormFrameHeight(height: number) : promise.Promise<void> {
    return browser
      .executeScript(`document.querySelector("#IF1").setAttribute('height', ${height});`);
  }

  public async getHeight(): Promise<number> {
    const height = await this.frame.getAttribute('height');
    return Number(height);
  }

  public getTitle(): promise.Promise<string> {
    return this.documentTitleLabel.getText();
  }

  public switchToFrame(): promise.Promise<void> {
    return browser.switchTo().frame(this.frame.getWebElement());
  }

  public switchToMainPage(): promise.Promise<void> {
    return browser.switchTo().defaultContent();
  }
}
