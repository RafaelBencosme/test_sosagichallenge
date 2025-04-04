import { Page } from "@playwright/test";

export class Saucedemo {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }
}