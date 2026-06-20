import { test, expect } from '@playwright/test';
import { LoginPage } from '../object/LoginPage';
import { UserData } from '../Data/UserData';

test.describe('SauceDemo Login', () => {
  let loginPage: LoginPage;

  // Dijalankan sebelum setiap test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login berhasil dengan user valid @smoke', async () => {
    await loginPage.login(UserData.validUser.username, UserData.validUser.password);
    await loginPage.verifyLoginSuccess();
    // await loginPage.page.pause()
    await loginPage.MenuAkun();
    await loginPage.Logout();
    console.log('Logout berhasil');
  });

  test('Login gagal dengan user tanpa password @regression', async () => {
    await loginPage.login(UserData.validUser.username, '');
    await loginPage.verifyLoginFailed();
    console.log('User tanpa password, login gagal');
  });

  test('Login gagal dengan user tanpa username', async () => {
    await loginPage.login('', UserData.validUser.password);
    await loginPage.verifyLoginFailed();
    console.log('User tanpa username, login gagal');
  });

  test('Login gagal dengan user tanpa username dan password', async () => {
    await loginPage.login('', '');
    await loginPage.verifyLoginFailed();
    console.log('User tanpa username dan password, login gagal');
  });

  test('Login gagal dengan user tidak valid', async () => {
    await loginPage.login(UserData.invalidUser.username, UserData.invalidUser.password);
    await loginPage.verifyLoginFailed();
    console.log('User tidak valid, login gagal');
  });

  test('Login gagal dengan user terkunci', async () => {
    await loginPage.login(UserData.lockedUser.username, UserData.lockedUser.password);
    await loginPage.verifyLoginFailed();
    console.log('User terkunci, login gagal');
  });

  test('Login dengan user bermasalah', async () => {
    await loginPage.login(UserData.problemUser.username, UserData.problemUser.password);
    await loginPage.verifyLoginSuccess();
    console.log('Berhasil login dengan user bermasalah');
  });

  test('Login dengan user performance', async () => {
    await loginPage.login(UserData.performanceUser.username, UserData.performanceUser.password);
    await loginPage.verifyLoginSuccess();
    console.log('Berhasil login dengan user performance');
  });

  test('Login dengan akun bermasalah', async () => {
    await loginPage.login(UserData.errorUser.username, UserData.errorUser.password);
    await loginPage.verifyLoginSuccess();
    console.log('Berhasil login dengan akun bermasalah');
  });

  test('Login dengan user visual', async () => {
    await loginPage.login(UserData.visualUser.username, UserData.visualUser.password);
    await loginPage.verifyLoginSuccess();
    console.log('Berhasil login dengan user visual');
  }); 

  test('Login dengan user visual 1.2 ', async () => {
    await loginPage.login(UserData.visualUser.username, UserData.visualUser.password);
    await loginPage.verifyLoginSuccess();
    console.log('Berhasil login dengan user visual');
  }); 




});