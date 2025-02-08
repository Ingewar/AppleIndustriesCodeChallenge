import { test, expect } from '../helpers/test-helper.ts';

test.beforeEach(async ({ page, context }) => {
  await context.grantPermissions(['camera']);
  await page.goto('/');
});

test('"Text on screen" is reverced in Admin panel', async ({ photoBoothPage }) => {
  const text = 'Text on screen';
  const reversedText = text.split('').reverse().join('');
  await photoBoothPage.textOnScreenInput.fill(text);

  await expect(photoBoothPage.reversedTextAdminPanel).toHaveText(reversedText);
});

const textInputs = [
  { caseName: 'Min length', text: 'a', inputMessage: 'No more than 30 chars' },
  { caseName: 'Max length', text: 'a'.repeat(30), inputMessage: 'No more than 30 chars' },
  { caseName: 'Excide the max length', text: 'a'.repeat(31), inputMessage: 'Limit exceeded' },
];

textInputs.forEach(({ caseName, text, inputMessage }) => {
  test(`User can input ${caseName}`, async ({ photoBoothPage }) => {
    await photoBoothPage.textOnScreenInput.fill(text);
    await expect(photoBoothPage.textOnScreenAlert).toHaveText(inputMessage);
  })
});