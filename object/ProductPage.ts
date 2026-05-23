import { Page, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    readonly itemLinks: { [key: string]: string } = {
    backpack: 'item-4-title-link',
    bikeLight: 'item-0-title-link',
    tShirt: 'item-1-title-link',
    fleeceJacket: 'item-5-title-link',
    onesie: 'item-2-title-link',
    redTShirt: 'item-3-title-link',
}
constructor(page: Page) {
    this.page = page;
  }

  async bukaDetailProduk(productKey: string) {
    await this.page.locator(`[data-test="${this.itemLinks[productKey]}"]`).click();
  }

  async kembaliKeInventory() {
    await this.page.locator('[data-test="back-to-products"]').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }
  async tambahKeKeranjang() {
    await this.page.locator('[data-test="add-to-cart"]').click();
    await expect(this.page.locator('[data-test="remove"]')).toBeVisible();
  }
  async Keranjang() {
    await this.page.locator('.shopping_cart_link').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');

  }

}
