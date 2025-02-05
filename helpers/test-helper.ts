import { test as base } from '@playwright/test';
import { PhotoBoothPage } from '../pages/PhotoBoothPage';
import { ProductsPage } from '../pages/ProductsPage';
import ReportPage from '../pages/ReportPage';

type TestCollection = {
  photoBoothPage: PhotoBoothPage;
  productPage: ProductsPage;
  reportPage: ReportPage;
}

export const test = base.extend<TestCollection>({
  photoBoothPage: async ({ page }, use) => { await use(new PhotoBoothPage(page)) },
  productPage: async ({ page }, use) => { await use(new ProductsPage(page)) },
  reportPage: async ({ page }, use) => { await use(new ReportPage(page)) }
})

export { expect } from '@playwright/test';