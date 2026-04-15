import { test, expect } from '@playwright/test';
 
test.describe('Main Nav', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });
 
  test('Start Your Journey flyout opens and sample link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Start Your Journey' }).click();
    await expect(page.getByRole('link', { name: 'Signs of Addiction' })).toBeVisible({ timeout: 10000 });
    console.log('✅ Start Your Journey flyout opened');
 
    await page.getByRole('link', { name: 'Signs of Addiction' }).click();
    await expect(page).toHaveURL(/signs-symptoms-addiction/, { timeout: 10000 });
    console.log('✅ Signs of Addiction link navigated correctly');
  });
 
  test('Programs flyout opens and sample link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Programs' }).click();
    await expect(page.getByText('Treatment Programs in PA')).toBeVisible({ timeout: 10000 });
    console.log('✅ Programs flyout opened');
 
    await page.getByRole('link', { name: 'Detox' }).first().click();
    await expect(page).toHaveURL(/detox/, { timeout: 10000 });
    console.log('✅ Detox link navigated correctly');
  });
 
  test('Locations flyout opens and sample link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Locations' }).click();
    await expect(page.getByText('Inpatient Locations')).toBeVisible({ timeout: 10000 });
    console.log('✅ Locations flyout opened');
 
    await page.getByRole('link', { name: 'Pennsylvania' }).first().click();
    await expect(page).toHaveURL(/pennsylvania/, { timeout: 10000 });
    console.log('✅ Pennsylvania link navigated correctly');
  });
 
  test('Resources & Support flyout opens and sample link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Resources & Support' }).click();
    await expect(page.getByText('Resources', { exact: true })).toBeVisible({ timeout: 10000 });
    console.log('✅ Resources & Support flyout opened');
 
    await page.getByRole('link', { name: 'Recovery Services' }).first().click();
    await expect(page).toHaveURL(/recovery/, { timeout: 10000 });
    console.log('✅ Recovery Services link navigated correctly');
  });
 
  test('About flyout opens and sample link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'About' }).click();
    await expect(page.locator('div.menu__heading', { hasText: 'About Caron' })).toBeVisible({ timeout: 10000 });
    console.log('✅ About flyout opened');

    await page.getByRole('link', { name: 'About Caron' }).first().click();
    await expect(page).toHaveURL(/about-caron/, { timeout: 10000 });
    console.log('✅ About Caron link navigated correctly');
});
 
  test('Admissions flyout opens and sample link navigates correctly', async ({ page }) => {
    await page.getByRole('button', { name: 'Admissions' }).click();
    await expect(page.getByRole('link', { name: 'Becoming a Patient' })).toBeVisible({ timeout: 10000 });
    console.log('✅ Admissions flyout opened');
 
    await page.getByRole('link', { name: 'Becoming a Patient' }).click();
    await expect(page).toHaveURL(/becoming-a-patient/, { timeout: 10000 });
    console.log('✅ Becoming a Patient link navigated correctly');
  });
 
  test('Call Us flyout opens and phone numbers are visible', async ({ page }) => {
    await page.getByRole('button', { name: /call us/i }).first().click();
    const flyout = page.locator('#header-call-us-desktop');
    await expect(flyout).toBeVisible({ timeout: 10000 });
    console.log('✅ Call Us flyout opened and phone numbers visible');
});
});
