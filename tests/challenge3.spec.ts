import { report } from 'process';
import { test, expect } from '../helpers/test-helper.ts';

test('Check the tax calculation for custom income', async ({ page, photoBoothPage, reportPage }) => {
  await test.step('Open report page', async () => {
    await page.goto('/');
    await photoBoothPage.navMenu.openPage('Report');
  });
  await test.step('Enter custom income', async () => {
    await reportPage.customIncomeCheckbox.check();
    const customIncomePromise = page.waitForResponse('**/report*');
    await reportPage.incomeInput.fill('5');
    await customIncomePromise;
  });
  await test.step('Check the tax calculation', async () => {
    expect.soft(await reportPage.getReportFieldData('Taxes to pay')).toBe('$0.43');
    expect.soft(await reportPage.getReportFieldData('Total income')).toBe('$5.00');
    expect.soft(await reportPage.getReportFieldData('Revenue')).toBe('$4.57');
    expect.soft(await reportPage.getReportFieldData('Total gifted in lottery')).toBe('$0.00');
    expect.soft(await reportPage.getReportFieldData('Orders made')).toBe('0');
    expect.soft(await reportPage.getReportFieldData('Prints done')).toBe('0');

    expect(test.info().errors).toHaveLength(0);
  });
});

test('Tax info updated after user makes an order', async ({ page, productPage, photoBoothPage, context, request, reportPage }) => {
  let reportData;

  await test.step('Request report data before the order', async () => {
    //TODO: make the search parameters configurable
    const response = await request.get('http://localhost:3000/report', { params: { month: 1, year: 2025 } });
    reportData = await response.json();
  });

  await test.step('Make a purchase', async () => {
    await context.grantPermissions(['camera']);
    await page.goto('/');

    const productResponse = page.waitForResponse('**/products');
    await photoBoothPage.takePhotoAndProceedButton.click();
    await productResponse;

    await productPage.fourBySixProduct.click();
    await productPage.payButton.click();
  });

  await test.step('Compare report data before and after the order', async () => {
    await productPage.navMenu.openPage('Report');
    //TODO: male a sum conversion
    expect.soft(await reportPage.getReportFieldData('Taxes to pay')).not.toBe(reportData.taxesToPay);
    expect.soft(await reportPage.getReportFieldData('Total income')).not.toBe(reportData.totalIncome);
    expect.soft(await reportPage.getReportFieldData('Total gifted in lottery')).toBe(1);
    expect.soft(await reportPage.getReportFieldData('Orders made')).toBe(reportData.ordersMade + 1);
    expect.soft(await reportPage.getReportFieldData('Prints done')).toBe(reportData.printsDone + 1);

    expect(test.info().errors).toHaveLength(0);
  });
});

test.fixme('User can download the report', async () => { });
test.fixme('User can download the report for custom income', async () => { });
