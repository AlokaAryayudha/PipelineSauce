import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Buka halaman login
  async goto() {
    await this.page.goto('/');
  }

  // Isi form login dan klik login
  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  // Verifikasi berhasil login
  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  // Verifikasi login gagal
  async verifyLoginFailed() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }

  async MenuAkun() {
    await this.page.locator('#react-burger-menu-btn').click();
  }
  async Logout() {
    await this.page.locator('#logout_sidebar_link').click();
  } 
  
}