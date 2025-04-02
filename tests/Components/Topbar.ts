import { Page } from "@playwright/test";

export class Topbar{
    private page: Page;

    constructor(page){
        this.page = page;
    };

    async selectCartIcon(){
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    };

    async logOut(){
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
        await this.page.locator('[data-test="logout-sidebar-link"]').click({ timeout : 5000 });
    }
};