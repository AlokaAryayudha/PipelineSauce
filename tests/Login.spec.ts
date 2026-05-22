import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login', () => {

  test('Login berhasil dengan kredensial valid', async ({ page }) => {
    // Buka halaman login
    await page.goto('/');

    // Isi username dan password
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    // Klik tombol login
    await page.click('#login-button');

    // Verifikasi berhasil login - halaman products muncul
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Login gagal dengan password salah', async ({ page }) => {
    await page.goto('/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    // Verifikasi muncul pesan error
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

});