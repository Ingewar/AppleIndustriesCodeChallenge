import { Page } from '@playwright/test';
import NavMenu from './components/NavMenuComponent';

export abstract class PageObject {
  public readonly navMenu: NavMenu;
  public readonly pageUrl: string;

  constructor(public readonly page: Page) {
    this.navMenu = new NavMenu(this.page);
  }

  public reloadPage = async () => {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  };

  public openPage = async () => {
    await this.page.goto(this.pageUrl);
    await this.page.waitForLoadState('networkidle');
  }
}