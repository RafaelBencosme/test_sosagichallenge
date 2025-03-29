import { test, expect } from '@playwright/test';

test.beforeEach('Navigate to Saucedemo', async ({page}) => {
   await page.goto('https://www.saucedemo.com');
});

test('standard_user, should be able to login', async ({page}) =>{
   await page.locator('[data-test="username"]').fill('standard_user');
   await page.locator('[data-test="password"]').fill('secret_sauce');
   await page.locator('[data-test="login-button"]').click();

   expect(page.getByText('Swag Labs')).toBeVisible();
});