import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async kembaliBerbelanja() {
        await this.page.locator('[data-test="continue-shopping"]').click();
    }
    async checkout() {
        await this.page.locator('[data-test="checkout"]').click();
    }   
    async cancel() {
        await this.page.locator('[data-test="cancel"]').click();
    }   
    async isiFormCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill('[data-test="firstName"]', firstName);
        await this.page.fill('[data-test="lastName"]', lastName);
        await this.page.fill('[data-test="postalCode"]', postalCode);
    }

    async lanjutkanCheckout() {
        await this.page.locator('[data-test="continue"]').click();
    }
    async selesaiCheckout() {
        await this.page.locator('[data-test="finish"]').click();
    }   
    async batalkanCheckout() {
        await this.page.locator('[data-test="cancel"]').click();
    }
    async kembaliKeHalamanUtama() {
        await this.page.locator('[data-test="back-to-products"]').click();
    }
}