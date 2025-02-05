import { test, expect } from '../helpers/test-helper.ts';

test('Check the tax calculation for custom income', async ({ page, photoBoothPage, reportPage }) => {
  await test.step('Open report page', async () => {
    //TODO: move it to the .env file
    await page.goto('http://localhost:5173/');
    await photoBoothPage.navMenu.openPage('Report');
  })
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

  test.fixme('Tax info updated after user makes an order', async () => { });

  test.fixme('User can download the report', async () => { });
  test.fixme('User can download the report for custom income', async () => { });
});