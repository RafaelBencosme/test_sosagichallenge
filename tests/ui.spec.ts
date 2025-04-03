import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { Saucedemo } from "./pageobjects/Saucedemo";
import { Login } from "./pageobjects/Login";
import { Inventory } from "./pageobjects/Inventory";
import { Topbar } from "./pageobjects/Topbar";
import { Checkout } from "./pageobjects/Checkout";

test.beforeEach("Navigate to Saucedemo", async ({ page }) => {
  const navigation = new Saucedemo(page);
  await navigation.navigate();
});

test.describe("Saucedemo tests", async () => {
  let login: Login;
  let inventory: Inventory;
  let topbar: Topbar;

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    inventory = new Inventory(page);
    topbar = new Topbar(page);
  });

  test.describe("login tests", async () => {
    test("standard_user, should be able to login", async () => {
      await login.signIn("standard_user", "secret_sauce");

      expect(inventory.hasTitle).toBeVisible();
    });

    test("problem_user, should be able to login", async () => {
      await login.signIn("problem_user", "secret_sauce");

      expect(inventory.hasTitle).toBeVisible();
    });

    test("performance_glitch_user, should be able to login", async () => {
      await login.signIn("performance_glitch_user", "secret_sauce");

      expect(inventory.hasTitle).toBeVisible();
    });

    test("error_user, should be able to login", async () => {
      await login.signIn("error_user", "secret_sauce");

      expect(inventory.hasTitle).toBeVisible();
    });

    test("visual_user, should be able to login", async () => {
      await login.signIn("visual_user", "secret_sauce");

      expect(inventory.hasTitle).toBeVisible();
    });

    test("should not log in with empty credentials", async () => {
      await login.signIn("", "");

      expect(login.hasEmptyCredentialsHelper).toBeVisible();
    });

    test("should not log in with invalid credentials", async () => {
      await login.signIn("standard_user", "wrongpass");

      expect(login.hasInvalidCredentialsHelper).toBeVisible();
    });

    test("locked_out_user, should get helper text", async () => {
      await login.signIn("locked_out_user", "secret_sauce");

      expect(login.hasLockedOutHelper).toBeVisible();
    });

    test("should be able to log out", async () => {
      await login.signIn("standard_user", "secret_sauce");

      await topbar.logOut();

      expect(login.hasLoginButton).toBeVisible();
    });
  });

  test.describe("purchase tests", async () => {
    let checkout: Checkout;

    test.beforeEach(async ({ page }) => {
      checkout = new Checkout(page);
    });

    test("standard_user, should be able to complete a purchase", async () => {
      await login.signIn("standard_user", "secret_sauce");

      await inventory.selectBackPack();
      await inventory.selectAddToCart();

      await topbar.selectCartIcon();

      await checkout.selectCheckOut();
      await checkout.fillPersonalData(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode()
      );
      await checkout.selectFinish();

      expect(checkout.hasPurchasCompleteHelper).toBeVisible();
    });

    test("standard_user, should be able to purchase multiple items", async () => {
      await login.signIn("standard_user", "secret_sauce");

      await inventory.selectAddToCartBackpack();
      await inventory.selectAddToCartBikeLight();
      await inventory.selectAddToCartTShirt();
      await inventory.selectAddtoCartFleeceJacket();

      await topbar.selectCartIcon();

      await checkout.selectCheckOut();
      await checkout.fillPersonalData(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode()
      );
      await checkout.selectFinish();

      expect(checkout.hasPurchasCompleteHelper).toBeVisible();
    });
  });
});
