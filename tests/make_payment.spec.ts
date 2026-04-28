import { test, expect } from '@playwright/test';
 
// Note: Payment forms are hosted on third party payment processors.
// Note: Tests verify the Make a Payment page loads and payment links navigate correctly.
// Note: Form submission is not tested as these are external payment systems.
 
test.describe('Make a Payment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/make-a-payment', { waitUntil: 'domcontentloaded' });
    // Dismiss cookie banner
    await page.evaluate(() => {
      const banner = document.querySelector('#ccc');
      if (banner) (banner as HTMLElement).style.display = 'none';
    });
  });
 
  test('Make a Payment page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL(/make-a-payment/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /make a payment/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ Make a Payment page loaded');
  });
 
  test('Pennsylvania Patients section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /pennsylvania patients/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ Pennsylvania Patients section visible');
  });
 
  test('Other States section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /other states/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ Other States section visible');
  });
 
  test('General Payments section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /general payments/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ General Payments section visible');
  });
 
  test('Payment links are present', async ({ page }) => {
    const paymentLinks = page.getByRole('link', { name: /pay with/i });
    await expect(paymentLinks.first()).toBeVisible({ timeout: 10000 });
    const count = await paymentLinks.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✅ ${count} payment links found`);
  });
 
  test('Pay with credit card link opens correct external page', async ({ page, context }) => {
    const creditCardLink = page.getByRole('link', { name: /pay with credit card/i }).first();
    await creditCardLink.scrollIntoViewIfNeeded();
    const pagePromise = context.waitForEvent('page');
    await creditCardLink.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL(/usiopay\.com/, { timeout: 15000 });
    await expect(newPage.getByRole('heading', { name: /make a payment/i })).toBeVisible({ timeout: 15000 });
    console.log('✅ Credit card payment form loaded correctly');
    await newPage.close();
  });
 
  test('Pay with e-check link opens correct external page', async ({ page, context }) => {
    const eCheckLink = page.getByRole('link', { name: /pay with e-check/i }).first();
    await eCheckLink.scrollIntoViewIfNeeded();
    const pagePromise = context.waitForEvent('page');
    await eCheckLink.click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState('domcontentloaded');
    await expect(newPage).toHaveURL(/cardpointe\.com/, { timeout: 15000 });
    await expect(newPage.getByRole('heading', { name: /payment page/i })).toBeVisible({ timeout: 15000 });
    console.log('✅ e-check payment form loaded correctly');
    await newPage.close();
  });
});