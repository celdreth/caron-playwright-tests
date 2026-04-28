import { test, expect } from '@playwright/test';
 
// Note: Donation form is a third party Blackbaud form embedded in an iframe - Caron does not own it.
// Note: Form interaction and submission are not tested due to cross-origin iframe restrictions.
// Note: Tests verify the page loads correctly and the donation form iframe is present.
 
test.describe('Donation Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/donate/mission-fund', { waitUntil: 'domcontentloaded' });
  });
 
  test('Donation page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL(/donate\/mission-fund/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /mission fund/i }).first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Donation page loaded');
  });
 
  test('Donation form iframe is present', async ({ page }) => {
    const iframe = page.locator('iframe.blackbaud-donation-form');
    await expect(iframe).toBeVisible({ timeout: 10000 });
    console.log('✅ Donation form iframe is present');
  });
});