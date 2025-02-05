import { Page } from "@playwright/test";

export default class NavMenu {
  constructor(public readonly page: Page) { }

  public openPage = async (menuItem: 'Photo Booth' | 'Products' | 'Report') => {
    await this.page.getByRole('link', { name: menuItem }).click();
  }
}