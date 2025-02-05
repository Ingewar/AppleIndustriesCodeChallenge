import { test, expect } from '../helpers/test-helper.ts';

test.beforeEach(async ({ page, context }) => {
  await test.step('Enable camera permissions', async () => {
    await context.grantPermissions(['camera']);
  });
  await test.step('Open Photo Booth page', async () => {
    await page.goto('http://localhost:5173/');
  })
});

test('User get free product', async ({ photoBoothPage, productPage, page }) => {
  await test.step('Take a photo and proceed with a default text', async () => {
    const productResponse = page.waitForResponse('**/products');
    await photoBoothPage.takePhotoAndProceedButton.click();
    await productResponse;
  })
  await test.step('Enable price for each purchase', async () => {
    await productPage.setPriceTimeout('Ain\'t nobody got time for that (once per order)');
  })
  await test.step('Select a 4*6 product', async () => {
    await productPage.fourBySixProduct.click();
    await productPage.payButton.click();
  })
});