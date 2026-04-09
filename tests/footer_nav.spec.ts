import { test, expect } from '@playwright/test';

test.describe('Footer Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('Footer links navigate to correct pages', async ({ page }) => {
    const footerLinks = [
      { name: 'Payments', url: '/make-a-payment' },
      { name: 'Nonprofit', url: '/about-caron/nonprofit' },
      { name: 'Reviews', url: '/reviews' },
      { name: 'Newsletter', url: '/email-signup' },
      { name: 'Careers', url: '/careers' },
    ];

    for (const item of footerLinks) {
      await page.goto('/', { waitUntil: 'networkidle' });
      const link = page.getByRole('link', { name: item.name }).first();
      await link.scrollIntoViewIfNeeded();
      await link.click();
      await expect(page).toHaveURL(new RegExp(item.url), { timeout: 10000 });
      console.log(`✅ Footer link navigated correctly: ${item.name} → ${item.url}`);
    }
  });

test('Shop link opens correct external URL', async ({ page }) => {
  const link = page.getByRole('link', { name: 'Shop' }).first();
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/hospitalgiftshop\.com/, { timeout: 15000 });
  console.log('✅ Shop link opened correct external page');
});

  test('Social icons navigate to correct external URLs', async ({ page, context }) => {
    const socialLinks = [
      { name: /linkedin/i, url: /linkedin\.com/ },
      { name: /twitter/i, url: /x\.com/ },
      { name: /youtube/i, url: /youtube\.com/ },
      { name: /instagram/i, url: /instagram\.com/ },
    ];

    for (const icon of socialLinks) {
      await page.goto('/', { waitUntil: 'networkidle' });
      const link = page.getByRole('link', { name: icon.name }).first();
      await link.scrollIntoViewIfNeeded();
      const pagePromise = context.waitForEvent('page');
      await link.click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState('domcontentloaded');
      await expect(newPage).toHaveURL(icon.url);
      console.log(`✅ Social icon navigated correctly: ${icon.name}`);
      await newPage.close();
    }
  });

  test('Bottom links navigate to correct pages', async ({ page }) => {
    const bottomLinks = [
      { name: 'Compliance & Policies', url: '/policies' },
    ];

    for (const item of bottomLinks) {
      await page.goto('/', { waitUntil: 'networkidle' });
      const link = page.getByRole('link', { name: item.name }).first();
      await link.scrollIntoViewIfNeeded();
      await link.click();
      await expect(page).toHaveURL(new RegExp(item.url), { timeout: 10000 });
      console.log(`✅ Bottom link navigated correctly: ${item.name} → ${item.url}`);
    }
  });
});