import { test, expect } from '@playwright/test';
 
// Note: Form submission is not tested due to reCAPTCHA being active on the staging environment.
// Note: Tests verify the page loads correctly and all form fields are present.
// Note: If reCAPTCHA is disabled on staging, full submission testing can be added.
 
test.describe('Contact Us Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us', { waitUntil: 'domcontentloaded' });
  });
 
  test('Contact Us page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL(/contact-us/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /how can we help you today/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ Contact Us page loaded');
  });
 
  test('Form fields are visible', async ({ page }) => {
    await expect(page.locator('#form-input-firstNameFiltered')).toBeVisible({ timeout: 10000 });
    console.log('✅ First Name field visible');
    await expect(page.locator('#form-input-lastNameFiltered')).toBeVisible({ timeout: 10000 });
    console.log('✅ Last Name field visible');
    await expect(page.locator('#form-input-email')).toBeVisible({ timeout: 10000 });
    console.log('✅ Email field visible');
    await expect(page.locator('#form-input-phoneNumber')).toBeVisible({ timeout: 10000 });
    console.log('✅ Phone field visible');
    await expect(page.locator('#form-input-zipCode')).toBeVisible({ timeout: 10000 });
    console.log('✅ Zip Code field visible');
  });
 
  test('Submit button is visible', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /submit admissions inquiry/i });
    await submitBtn.scrollIntoViewIfNeeded();
    await expect(submitBtn).toBeVisible({ timeout: 10000 });
    console.log('✅ Submit Admissions Inquiry button visible');
  });
});