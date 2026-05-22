import { test, expect } from '@playwright/test';
import { LoginPage } from '../object/LoginPage';
import { InventoryPage } from '../object/InventoryPage';
import { ProductPage } from '../object/ProductPage';

test.describe('SauceDemo Detail Produk', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    productPage = new ProductPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyLoginSuccess();
  });

  test('Buka detail produk Backpack', async () => {
    await productPage.bukaDetailProduk('backpack');
    // await expect(productPage.page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
        console.log('Detail produk Backpack berhasil dibuka');
    await productPage.kembaliKeInventory()
        console.log('berhasil kembali ke inventory');

  });   

  test.only('Buka detail produk Backpack dan memasukan kekeranjang', async () => {
    await productPage.bukaDetailProduk('backpack');
    // await expect(productPage.page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
        console.log('Detail produk Backpack berhasil dibuka');
    await productPage.tambahKeKeranjang();  
        console.log('Berhasil menambahkan produk ke keranjang');
    await productPage.kembaliKeInventory()
        console.log('berhasil kembali ke inventory');

  });   

  

  });
