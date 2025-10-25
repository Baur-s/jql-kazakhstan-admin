import { test, expect } from '@playwright/test';

test('sample request flow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Order sample');
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="city"]', 'Almaty');
  await page.fill('input[name="phone"]', '+7700...');
  await page.click('text=Submit');
  await expect(page.locator('text=Спасибо')).toBeVisible();
});
