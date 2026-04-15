import { test, expect } from '@playwright/test';
 
test.describe('Utility Nav', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });
 
  test('Utility nav links navigate to correct pages', async ({ page }) => {
    const utilityLinks = [
      { name: 'Events', url: '/events' },
      { name: 'Join Our Newsletter', url: '/email-signup' },
      { name: 'Corporate Wellness', url: '/corporate-wellness' },
    ];
 
    for (const item of utilityLinks) {
      await page.goto('/', { waitUntil: 'networkidle' });
      const link = page.getByRole('link', { name: item.name }).first();
      await link.click();
      await expect(page).toHaveURL(new RegExp(item.url), { timeout: 10000 });
      console.log(`✅ Utility nav link navigated correctly: ${item.name} → ${item.url}`);
    }
  });
 
  test('Search navigates to correct page', async ({ page }) => {
    const searchBtn = page.getByRole('button', { name: /search/i }).first();
    await searchBtn.click();
    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
    console.log('✅ Search navigated correctly');
  });
 
  test('Donate navigates to correct page', async ({ page }) => {
    const donate = page.getByRole('link', { name: /donate/i })
      .or(page.getByRole('button', { name: /donate/i }))
      .first();
    await donate.click();
    await expect(page).toHaveURL(/\/donate\/mission-fund/, { timeout: 10000 });
    console.log('✅ Donate navigated correctly');
  });
});
 