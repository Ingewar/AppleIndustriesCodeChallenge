import { PageObject } from './Page';

export class PhotoBoothPage extends PageObject {
  readonly pageUrl = '/';
  readonly reversedTextAdminPanel = this.page.locator("//div[contains(@class, 'admin-panel')]/div[3]");
  readonly textOnScreenAlert = this.page.locator('[id="input-3-messages"]');
  readonly textOnScreenInput = this.page.getByRole('textbox', { name: 'Text on screen Text on screen' });
  readonly takePhotoAndProceedButton = this.page.getByRole('button', { name: 'Take photo & proceed' });
}