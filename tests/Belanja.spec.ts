import { test, expect } from '@playwright/test';
import { LoginPage } from '../object/LoginPage';
import { InventoryPage } from '../object/InventoryPage';
import { UserData } from '../Data/UserData';



test.describe('SauceDemo tambah keranjang', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(UserData.validUser.username, UserData.validUser.password);
    await loginPage.verifyLoginSuccess();
  });

  test('Tambah 1 produk ke keranjang', async () => {
    await inventoryPage.tambahProduk(inventoryPage.products.backpack);    await inventoryPage.verifyCartCount('1');
    console.log('1 Produk berhasil ditambahkan ke keranjang');
  });

  test('Tambah 2 produk ke keranjang', async () => {
    await inventoryPage.tambahProduk(inventoryPage.products.backpack);   
    await inventoryPage.tambahProduk(inventoryPage.products.bikeLight);
    console.log('2 Produk berhasil ditambahkan ke keranjang');    
  });

  test('Tambah semua produk ke keranjang', async () => {
    await inventoryPage.tambahProduk(inventoryPage.products.backpack);   
    await inventoryPage.tambahProduk(inventoryPage.products.bikeLight);
    await inventoryPage.tambahProduk(inventoryPage.products.tShirt);
    await inventoryPage.tambahProduk(inventoryPage.products.fleeceJacket);
    await inventoryPage.tambahProduk(inventoryPage.products.onesie);
    await inventoryPage.tambahProduk(inventoryPage.products.redTShirt);
    console.log('6 Produk berhasil ditambahkan ke keranjang');    
  });



});
