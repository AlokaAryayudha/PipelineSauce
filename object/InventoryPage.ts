import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;  

  readonly products = {
    backpack: 'sauce-labs-backpack',
    bikeLight: 'sauce-labs-bike-light',
    tShirt: 'sauce-labs-bolt-t-shirt',
    fleeceJacket: 'sauce-labs-fleece-jacket',
    onesie: 'sauce-labs-onesie',
    redTShirt: 'test.allthethings()-t-shirt-(red)',
  };

   readonly productNames: { [key: string]: string } = {
    'sauce-labs-backpack': 'Backpack',
    'sauce-labs-bike-light': 'Bike Light',
    'sauce-labs-bolt-t-shirt': 'T-Shirt',
    'sauce-labs-fleece-jacket': 'Fleece Jacket',
    'sauce-labs-onesie': 'Onesie',
    'test.allthethings()-t-shirt-(red)': 'Red T-Shirt',
  };

  constructor(page: Page) {
    this.page = page;
  }
  async tambahProduk(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
     console.log(`Berhasil menambahkan ${this.productNames[productName] ?? productName} ke keranjang`);
  
  }

  async verifyCartCount(count: string) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(count);
  }

  async bukaKeranjang(){
    await this.page.locator('.shopping_cart_link').click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
  }


}