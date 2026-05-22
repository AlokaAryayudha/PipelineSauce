import { test, expect } from '@playwright/test';
import { LoginPage } from '../object/LoginPage';

test.describe('SauceDemo Login', () => {
  let loginPage: LoginPage;

  // Dijalankan sebelum setiap test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.skip('Login berhasil dengan kredensial valid', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verifyLoginSuccess();
    await loginPage.page.pause()
  });

  test.skip('Login gagal dengan password salah', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.verifyLoginFailed();
  });

});