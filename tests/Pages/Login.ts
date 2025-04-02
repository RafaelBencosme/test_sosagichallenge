import { Page } from "@playwright/test";

export class Login {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    async signIn(username: string, password: string){
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.locator('[data-test="login-button"]').click();
    };

    get hasEmptyCredentialsHelper(){
        return this.page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ });
    };

    get hasInvalidCredentialsHelper(){
        return this.page.locator('[data-test="error"]');
    };

    get hasLockedOutHelper(){
        return this.page.locator('[data-test="error"]');
    };

    get hasLoginButton(){
        return this.page.locator('[data-test="login-button"]');
    };
};