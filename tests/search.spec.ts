import { test, expect } from '@playwright/test';
 
test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });
 
  test('Search from utility nav returns results', async ({ page }) => {
    // Type in utility nav search box
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.fill('Marijuana');
    await searchBox.press('Enter');
 
    // Verify we land on search results page
    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /search results/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ Search results page loaded');
 
    // Verify result count text is visible
    await expect(page.getByText(/results for/i).first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Result count visible');
  });
 
  test('Programs tab filter works', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.fill('Marijuana');
    await searchBox.press('Enter');
 
    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
 
    // Click Programs tab
    await page.getByRole('tab', { name: /programs/i }).click();
    await expect(page.getByRole('tab', { name: /programs/i })).toHaveAttribute('aria-selected', 'true', { timeout: 10000 });
    console.log('✅ Programs tab filter works');
  });
 
  test('Pagination works', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.fill('Marijuana');
    await searchBox.press('Enter');
 
    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
 
    // Click page 2
    await page.getByRole('button', { name: 'Page 2' }).click();
    await expect(page.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page', { timeout: 10000 });
    console.log('✅ Pagination to page 2 works');
  });
 
  test('Search from results page returns new results', async ({ page }) => {
    // First search from utility nav
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.fill('Marijuana');
    await searchBox.press('Enter');
 
    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
 
    // Clear and search again from results page search bar
    const resultsSearchBox = page.getByRole('searchbox').first();
    await resultsSearchBox.clear();
    await resultsSearchBox.fill('Epidemic');
    await resultsSearchBox.press('Enter');
 
    await expect(page.getByText(/results for/i).first()).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/epidemic/i).first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Search from results page returns new results');
  });
 
  test('Clicking a result navigates to correct page', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.fill('Marijuana');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });

    const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByRole('link', { name: /marijuana addiction treatment/i }).first().click(),
  ]);
    await expect(newPage).toHaveURL(/marijuana/, { timeout: 10000 });
    console.log('✅ Clicking a result opened correct page in new tab');
});
 
  test('No results message appears for invalid search term', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
      await searchBox.fill('xyzabc123');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /couldn't find a match/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ No results message appears for invalid search term');
});
 
  test('Empty search is handled gracefully', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.press('Enter');
 
    // Should either stay on homepage or go to search page without errors
    await expect(page).not.toHaveURL(/error/, { timeout: 10000 });
    console.log('✅ Empty search handled gracefully');
  });

  test('Special characters are handled gracefully', async ({ page }) => {
    const searchBox = page.getByRole('searchbox', { name: /search/i }).first();
    await searchBox.fill('@#$%');
    await searchBox.press('Enter');
  
    await expect(page).toHaveURL(/\/search/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /search results/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: /couldn't find a match/i })).toBeVisible({ timeout: 10000 });
    console.log('✅ Special characters return no results message');
});
});