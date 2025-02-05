import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  await context.grantPermissions(['camera']);
  await page.goto('http://localhost:5173/');
});

test('User can enter text', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Text on screen Text on screen' }).fill('Text on screen');
  await page.getByText('Admin panelWho doesn\'t like').focus();

  const reversedTextAdminPanel = page.locator("//div[contains(@class, 'admin-panel')]/div[3]");
  expect(await reversedTextAdminPanel.textContent()).toBe('neercs no txeT');
})