import { test, expect } from '@playwright/test';
import { LoginPage } from '../object/LoginPage';
import { InventoryPage } from '../object/InventoryPage';
import { CheckoutPage } from '../object/Checkout';
import { CheckoutData} from '../Data/UserData';
import { UserData } from '../Data/UserData';

test.describe('SauceDemo Checkout', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page); 
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(UserData.validUser.username, UserData.validUser.password);
      });

    test('Checkout dengan data valid', async () => {
    await inventoryPage.tambahProduk(inventoryPage.products.backpack);
    await inventoryPage.bukaKeranjang();
    await checkoutPage.checkout();
    await checkoutPage.isiFormCheckout(CheckoutData.valid.firstName, CheckoutData.valid.lastName, CheckoutData.valid.postalCode);
    await checkoutPage.lanjutkanCheckout();
    console.log('Checkout berhasil dengan data valid');
    await checkoutPage.selesaiCheckout();
    await expect(checkoutPage.page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await checkoutPage.kembaliKeHalamanUtama();
});

    test('Checkout dengan data tidak valid', async () => {
    await inventoryPage.tambahProduk(inventoryPage.products.backpack);
    await inventoryPage.bukaKeranjang();
    await checkoutPage.checkout();
    await checkoutPage.isiFormCheckout(CheckoutData.invalid.firstName, CheckoutData.invalid.lastName, CheckoutData.invalid.postalCode);
    await checkoutPage.lanjutkanCheckout();
    console.log('Checkout gagal dengan data tidak valid');      
    });
    
        

});