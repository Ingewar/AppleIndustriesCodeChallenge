import { test, expect } from '../helpers/test-helper.ts';

test('User get two free products with disabled timer', async ({ productPage }) => {
  await test.step('Open products page', async () => {
    await productPage.openPage();
  });
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