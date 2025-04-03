import { Page } from "@playwright/test";

export class Checkout {
  private page: Page;

  constructor(page) {
    this.page = page;
  }

  async selectCheckOut() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillPersonalData(firstName: string, lastName: string, zipCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zipCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async selectFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  get hasPurchasCompleteHelper() {
    return this.page.locator('[data-test="complete-header"]');
  }
}