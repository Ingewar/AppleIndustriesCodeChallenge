import { test as base } from '@playwright/test';
import { PhotoBoothPage } from '../pages/PhotoBoothPage';
import { ProductsPage } from '../pages/ProductsPage';

type TestCollection = {
  photoBoothPage: PhotoBoothPage;
  productPage: ProductsPage;
}

export const test = base.extend<TestCollection>({
  photoBoothPage: async ({ page }, use) => { await use(new PhotoBoothPage(page)) },
  productPage: async ({ page }, use) => { await use(new ProductsPage(page)) }
})

export { expect } from '@playwright/test';