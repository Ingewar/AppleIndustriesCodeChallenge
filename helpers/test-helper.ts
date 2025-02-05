import { test as base } from '@playwright/test';
import { PhotoBoothPage } from '../pages/PhotoBoothPage';

type TestCollection = {
  photoBoothPage: PhotoBoothPage;
}

export const test = base.extend<TestCollection>({
  photoBoothPage: async ({ page }, use) => {
    await use(new PhotoBoothPage(page));
  }
})

export { expect } from '@playwright/test';