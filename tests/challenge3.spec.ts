import { report } from 'process';
import { numberToDollarString } from '../helpers/converter.ts';
import { reportCSVToJson } from '../helpers/csvReader.ts';
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

  // I add static values for this case, since we can decide what value we entering and simple numbers are easier to understand and maintain
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
  const taxes = 8.625;

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
    const income = reportData.totalIncome + productPrice;
    const expectedTaxes = (income * (taxes / 100));
    const expectedRevenue = (income - expectedTaxes);

    // Here I add example of cheking dynamic values, since we can't predict the exact value of the income
    expect.soft(await reportPage.getReportFieldData('Total income')).toEqual(numberToDollarString(income));
    expect.soft(await reportPage.getReportFieldData('Taxes to pay')).toEqual(numberToDollarString(expectedTaxes));
    expect.soft(await reportPage.getReportFieldData('Revenue')).toEqual(numberToDollarString(expectedRevenue));
    expect.soft(await reportPage.getReportFieldData('Orders made')).toBe((reportData.ordersMade + 1).toString());
    expect.soft(await reportPage.getReportFieldData('Prints done')).toBe((reportData.printsDone + 1).toString());

    expect(test.info().errors).toHaveLength(0);
  });
});

test('Data in downloaded report is the same as from the API', async ({ page, productPage, photoBoothPage, context, request, reportPage }) => {
  let reportData: ReportAPIResponse;
  const productPrice = 500;

  //FIXME: notice that month index in the app is 0-based, which might be confusing
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  await test.step('Make a purchase', async () => {
    await context.grantPermissions(['camera']);
    await page.goto('/');

    const productResponse = page.waitForResponse('**/products');
    await photoBoothPage.takePhotoAndProceedButton.click();
    await productResponse;

    await productPage.fourBySixProduct.click();
    await productPage.payButton.click();
  });

  await test.step('Download report file', async () => {
    await productPage.navMenu.openPage('Report');

    const downloadPromise = page.waitForEvent('download');
    await reportPage.saveReportButton.click();
    const download = await downloadPromise;

    await download.saveAs('./temp/report.csv');
  });

  await test.step('Request report data after the order', async () => {
    const response = await request.get(`${process.env.API_URL}/report`, { params: { month: currentMonth, year: currentYear } });
    reportData = await response.json();
  });

  await test.step('Check the downloaded report', async () => {
    const jsonData = await reportCSVToJson('./temp/report.csv');

    expect(jsonData).toMatchObject(reportData);
  });
});

test.fixme('Data in downloaded report is correspond with the UI data for custom income', async () => { });
