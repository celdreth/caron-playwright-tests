import { test, expect } from '@playwright/test';
 
test.describe('Homepage Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
 
    // Handle cookie banner if present
    const cookieBtn = page.getByRole('button').filter({ hasText: /accept|agree/i }).first();
    if (await cookieBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await cookieBtn.click();
    }
  });
 
  test('Page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Caron/i);
    console.log('✅ Page title verified');
  });
 
  test('Logo is visible', async ({ page }) => {
    const logo = page.locator('img[alt*="Caron"], a[aria-label*="Caron"], .logo').first();
    await expect(logo).toBeVisible({ timeout: 10000 });
    console.log('✅ Logo visible');
  });
 
  test('Utility Nav is visible', async ({ page }) => {
    const utilityItems = ['Donate', 'Events', 'Join Our Newsletter', 'Corporate Wellness'];
 
    for (const item of utilityItems) {
      const link = page.getByRole('link', { name: item }).first();
      await expect(link).toBeVisible({ timeout: 10000 });
      console.log(`✅ Utility nav item found: ${item}`);
    }
  });
 
  test('Search is visible', async ({ page }) => {
    const search = page.getByRole('searchbox')
      .or(page.locator('input[type="search"]'))
      .or(page.getByPlaceholder(/search/i))
      .first();
    await expect(search).toBeVisible({ timeout: 10000 });
    console.log('✅ Search visible');
  });
 
  test('Call Us button is visible', async ({ page }) => {
    const callUs = page.getByRole('link', { name: /call us/i })
      .or(page.getByRole('button', { name: /call us/i }))
      .first();
    await expect(callUs).toBeVisible({ timeout: 10000 });
    console.log('✅ Call Us button visible');
  });
 
  test('Main Nav items are visible', async ({ page }) => {
    const navItems = [
      'Start Your Journey',
      'Programs',
      'Locations',
      'Resources & Support',
      'About',
      'Admissions',
    ];
 
    for (const item of navItems) {
      const navItem = page.getByRole('button', { name: item }).first();
      await expect(navItem).toBeVisible({ timeout: 10000 });
      console.log(`✅ Main nav item found: ${item}`);
    }
  });
});
