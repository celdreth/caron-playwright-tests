import { test, expect } from '@playwright/test';

// Note: Form is a third party JotForm embedded in an iframe - Caron does not own it.
// Note: Form submission is not tested due to hCaptcha and cross-origin iframe restrictions.
// Note: Tests verify the page loads correctly and the form iframe is present and rendering.

test.describe('Newsletter Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/email-signup', { waitUntil: 'domcontentloaded' });
  });

  test('Newsletter page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL(/email-signup/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Join Our Email List' })).toBeVisible({ timeout: 10000 });
    console.log('✅ Newsletter page loaded');
  });

  test('Newsletter form is present', async ({ page }) => {
    await expect(page.locator('form').first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Newsletter form is present');
  });

test('Newsletter form iframe is present', async ({ page }) => {
  const iframe = page.locator('iframe[title="Email Communication Sign-up"]');
  await expect(iframe).toBeVisible({ timeout: 10000 });
  console.log('✅ Newsletter form iframe is present');
   });
 });