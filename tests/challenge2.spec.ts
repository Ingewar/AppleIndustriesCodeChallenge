import { test, expect } from '../helpers/test-helper.ts';

test.beforeEach(async ({ page, context }) => {
  await test.step('Enable camera permissions', async () => {
    await context.grantPermissions(['camera']);
  });
  await test.step('Open Photo Booth page', async () => {
    await page.goto('http://localhost:5173/');
  })
});

test('User get two free products with disabled timer', async ({ photoBoothPage, productPage, page }) => {
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
  })

  await test.step('Verify that Congrats alert is visible', async () => {
    await expect(productPage.congratsAlert).toBeVisible({ timeout: 3000 });
  });

  await test.step('Verify that price is right', async () => {
    await productPage.totalPrice.scrollIntoViewIfNeeded()
    await expect(productPage.totalPrice).toHaveText('Total: $5.00');
  });

  await test.step('Verify that all other then selected product are added as free', async () => {
    // It's hihly important to add proper test-id attributes each price element
    // otherwise it would be an ugly and fragile test
  });
});