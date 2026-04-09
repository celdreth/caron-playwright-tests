import { test, expect } from '@playwright/test';

test.describe('Footer Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('Footer links are visible', async ({ page }) => {
    const footerLinks = [
      'Payments',
      'Nonprofit',
      'Reviews',
      'Newsletter',
      'Shop',
      'Careers',
    ];

    for (const item of footerLinks) {
      const link = page.getByRole('link', { name: item }).first();
      await expect(link).toBeVisible({ timeout: 10000 });
      console.log(`✅ Footer link found: ${item}`);
    }
  });

  test('Social icons are visible', async ({ page }) => {
    const socialIcons = [
      { name: /facebook/i },
      { name: /linkedin/i },
      { name: /twitter/i },
      { name: /youtube/i },
      { name: /instagram/i },
    ];

    for (const icon of socialIcons) {
      const social = page.getByRole('link', { name: icon.name })
        .or(page.getByRole('button', { name: icon.name }))
        .first();
      await expect(social).toBeVisible({ timeout: 10000 });
      console.log(`✅ Social icon found: ${icon.name}`);
    }
  });

  test('Accreditation images are visible', async ({ page }) => {
    const accreditations = [
      { name: /newsweek/i },
      { name: /commission on accreditation/i },
      { name: /national association of addiction/i },
      { name: /florida association of recovery/i },
      { name: /fo rse data site/i },
      { name: /verify approval/i },
    ];

    for (const item of accreditations) {
      const link = page.getByRole('link', { name: item.name }).first();
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible({ timeout: 10000 });
      console.log(`✅ Accreditation found: ${item.name}`);
    }
  });

  test('Bottom links are visible', async ({ page }) => {
    const bottomLinks = ['Compliance & Policies', 'Sitemap'];

    for (const item of bottomLinks) {
      const link = page.getByRole('link', { name: item }).first();
      await expect(link).toBeVisible({ timeout: 10000 });
      console.log(`✅ Bottom link found: ${item}`);
    }
  });

  test('Copyright text is visible', async ({ page }) => {
    const copyright = page.getByText(/© Copyright 2026 Caron Treatment Center/i);
    await expect(copyright).toBeVisible({ timeout: 10000 });
    console.log('✅ Copyright text verified');
  });
});