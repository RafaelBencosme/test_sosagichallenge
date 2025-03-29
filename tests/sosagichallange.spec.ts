import { faker } from '@faker-js/faker';
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

test('standard_user, should be able to complete a purchase', async ({page}) => {
   await page.locator('[data-test="username"]').fill('standard_user');
   await page.locator('[data-test="password"]').fill('secret_sauce');
   await page.locator('[data-test="login-button"]').click();

   await page.locator('[data-test="item-4-title-link"]').click();
   await page.locator('[data-test="add-to-cart"]').click();

   await page.locator('[data-test="shopping-cart-link"]').click();

   await page.locator('[data-test="checkout"]').click();

   await page.locator('[data-test="firstName"]').fill(faker.person.firstName());
   await page.locator('[data-test="lastName"]').fill(faker.person.lastName());
   await page.locator('[data-test="postalCode"]').fill(faker.location.zipCode());
   await page.locator('[data-test="continue"]').click();

   await page.locator('[data-test="finish"]').click();

   expect(page.locator('[data-test="complete-header"]')).toBeVisible();
});

test('should not log in with empty credentials', async ({page}) =>{
   await page.locator('[data-test="login-button"]').click();

   expect(page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ })).toBeVisible();
});

test('should not log in with invalid credentials', async ({page}) => {
   await page.locator('[data-test="username"]').fill('standard_user');
   await page.locator('[data-test="password"]').fill('wrongpass');
   await page.locator('[data-test="login-button"]').click();

   await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('locked_out_user, should get helper text', async ({page}) => {
   await page.locator('[data-test="username"]').fill('locked_out_user');
   await page.locator('[data-test="password"]').fill('secret_sauce');
   await page.locator('[data-test="login-button"]').click();

   await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('standard_user, should be able to purchase multiple items', async ({page}) => {
   await page.locator('[data-test="username"]').fill('standard_user');
   await page.locator('[data-test="password"]').fill('secret_sauce');
   await page.locator('[data-test="login-button"]').click();

   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
   await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
   await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
   await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();

   await page.locator('[data-test="shopping-cart-link"]').click();

   await page.locator('[data-test="checkout"]').click();

   await page.locator('[data-test="firstName"]').fill(faker.person.firstName());
   await page.locator('[data-test="lastName"]').fill(faker.person.lastName());
   await page.locator('[data-test="postalCode"]').fill(faker.location.zipCode());
   await page.locator('[data-test="continue"]').click();

   await page.locator('[data-test="finish"]').click();

   await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});

test('problem_user, should be able to log out', async ({page}) => {
   await page.locator('[data-test="username"]').fill('standard_user');
   await page.locator('[data-test="password"]').fill('secret_sauce');
   await page.locator('[data-test="login-button"]').click();

   await page.getByRole('button', { name: 'Open Menu' }).click();
   await page.locator('[data-test="logout-sidebar-link"]').click({ timeout : 5000 });

   await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});