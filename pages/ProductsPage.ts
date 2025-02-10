import { PageObject } from './Page';

export class ProductsPage extends PageObject {
  readonly pageUrl = '/products';
  readonly fourBySixProduct = this.page.locator('div.cursor-pointer').first();
  readonly payButton = this.page.getByRole('button', { name: 'Pay' });
  readonly congratsAlert = this.page.getByRole('alert').filter({ hasText: 'Congrats! You have won extra' });
  readonly totalPrice = this.page.getByText('Total: $');

  public setPriceTimeout = async (timeout: 'One hour' | 'One minute' | "Ain't nobody got time for that (once per order)") => {
    await this.page.getByRole('radio', { name: timeout }).click();
  }
}