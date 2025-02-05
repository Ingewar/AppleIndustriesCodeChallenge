import { Page } from '@playwright/test';

export abstract class PageObject {
  constructor(public readonly page: Page) { }

  public reloadPage = async () => {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  };
}