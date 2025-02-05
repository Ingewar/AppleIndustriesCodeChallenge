import { PageObject } from './Page';

export class ProductsPage extends PageObject {
  readonly fourBySixProduct = this.page.locator('div.cursor-pointer').first();
  readonly payButton = this.page.getByRole('button', { name: 'Pay' });

  public setPriceTimeout = async (timeout: 'One hour' | 'One minute' | "Ain't nobody got time for that (once per order)") => {
    await this.page.getByRole('radio', { name: timeout }).click();
  }
}