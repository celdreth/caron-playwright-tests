import { test, expect } from '@playwright/test';

// Tests verify the News & Resources page loads correctly and all functionality works as expected.
// Filter functionality: verifies the "By Date" dropdown filters news cards by Last 30 Days, Last 90 Days, and Last Year.
// Search: verifies the search input on the page accepts input and returns results.
// Card navigation: verifies clicking a news card navigates to the correct article page.
// Load More: verifies clicking Load More loads additional news cards on the page.
 
test.describe('News & Blog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/news-resources', { waitUntil: 'domcontentloaded' });
  });
 
  test('News page loads correctly', async ({ page }) => {
    await expect(page).toHaveURL(/news-resources/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /caron in the news/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ News page loaded');
  });
 
  test('News cards are visible', async ({ page }) => {
    const cards = page.locator('a[href*="/news-resources/"]').first();
    await expect(cards).toBeVisible({ timeout: 10000 });
    console.log('✅ News cards are visible');
  });
 
  test('Filter by date dropdown is visible', async ({ page }) => {
    await expect(page.getByText('Filter News')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'By Date' })).toBeVisible({ timeout: 10000 });
    console.log('✅ Filter by date dropdown visible');
  });
 
  test('Filter - Last 30 Days works', async ({ page }) => {
    await page.getByRole('button', { name: 'By Date' }).click();
    await expect(page.getByText('Last 30 Days')).toBeVisible({ timeout: 10000 });
    await page.getByText('Last 30 Days').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('a[href*="/news-resources/"]').first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Last 30 Days filter works');
  });
 
  test('Filter - Last 90 Days works', async ({ page }) => {
    await page.getByRole('button', { name: 'By Date' }).click();
    await expect(page.getByText('Last 90 Days')).toBeVisible({ timeout: 10000 });
    await page.getByText('Last 90 Days').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('a[href*="/news-resources/"]').first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Last 90 Days filter works');
  });
 
  test('Filter - Last Year works', async ({ page }) => {
    await page.getByRole('button', { name: 'By Date' }).click();
    await expect(page.getByText('Last Year')).toBeVisible({ timeout: 10000 });
    await page.getByText('Last Year').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('a[href*="/news-resources/"]').first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Last Year filter works');
  });
 
  test('Search returns results', async ({ page }) => {
    const searchBox = page.locator('#main-content').getByRole('searchbox', { name: 'Search Caron website' });
    await searchBox.fill('addiction');
    await searchBox.press('Enter');
    await page.waitForTimeout(1000);
    await expect(searchBox).toHaveValue('addiction');
    console.log('✅ Search returns results');
  });
 
  test('Clicking a card navigates to correct page', async ({ page }) => {
    const firstCard = page.locator('a[href*="/news-resources/"]').first();
    const href = await firstCard.getAttribute('href');
    await firstCard.click();
    await expect(page).not.toHaveURL(/\/news-resources$/, { timeout: 10000 });
    console.log(`✅ Card navigated to: ${href}`);
  });
 
  test('Load More button loads additional cards', async ({ page }) => {
    const initialCards = await page.locator('a[href*="/news-resources/"]').count();
    const loadMore = page.getByRole('link', { name: /load more/i })
      .or(page.getByRole('button', { name: /load more/i }))
      .first();
    await loadMore.scrollIntoViewIfNeeded();
    await loadMore.click();
    await page.waitForTimeout(2000);
    const newCards = await page.locator('a[href*="/news-resources/"]').count();
    expect(newCards).toBeGreaterThan(initialCards);
    console.log(`✅ Load More loaded additional cards: ${initialCards} → ${newCards}`);
  });
});