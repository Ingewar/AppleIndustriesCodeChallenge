import { numberToDollarString } from '../helpers/converter.ts';
import { test, expect } from '../helpers/test-helper.ts';
import { ReportAPIResponse } from '../types/api/report.ts';

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
  let reportData: ReportAPIResponse;
  const productPrice = 500;

  //FIXME: notice that month index in the app is 0-based, which might be confusing
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  await test.step('Request report data before the order', async () => {
    const response = await request.get(`${process.env.API_URL}/report`, { params: { month: currentMonth, year: currentYear } });
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

    expect.soft(await reportPage.getReportFieldData('Total income')).toEqual(numberToDollarString(reportData.totalIncome + productPrice));
    expect.soft(await reportPage.getReportFieldData('Orders made')).toBe((reportData.ordersMade + 1).toString());
    expect.soft(await reportPage.getReportFieldData('Prints done')).toBe((reportData.printsDone + 1).toString());

    //TODO: other fields are also important to check but due to time limitations, I will skip them for now

    expect(test.info().errors).toHaveLength(0);
  });
});

test.fixme('User can download the report', async () => { });
test.fixme('User can download the report for custom income', async () => { });
