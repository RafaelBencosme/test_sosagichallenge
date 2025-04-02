import { Page } from "@playwright/test";

export class Inventory{
    private page: Page;

    constructor(page){
        this.page = page;
    };

    async selectBackPack(){
        await this.page.locator('[data-test="item-4-title-link"]').click();
    };

    async selectAddToCart(){
        await this.page.locator('[data-test="add-to-cart"]').click();
    };

    async selectAddToCartBackpack(){
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    };

    async selectAddToCartBikeLight(){
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    };

    async selectAddToCartTShirt(){
        await this.page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    };

    async selectAddtoCartFleeceJacket(){
        await this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    };
    
    get hasTitle(){
        return this.page.locator('text="Swag Labs"');
    };
};