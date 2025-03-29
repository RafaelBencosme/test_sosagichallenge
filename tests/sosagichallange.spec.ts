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

   expect(page.locator('[data-test="complete-header"]')).toBeVisible({ timeout : 10000 });
});

test('should not log in with empty credentials', async ({page}) =>{
   await page.locator('[data-test="login-button"]').click();

   expect(page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ })).toBeVisible();
});