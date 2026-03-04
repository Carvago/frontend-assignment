import {expect, Locator, Page} from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly userExistsError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('input[type="text"]');
    this.passwordField = page.locator('input[type="password"]');
    this.submitButton = page.getByRole('button', {name: 'Create account'});
    this.loginLink = page.getByRole('link', {name: /Log in/i});
    this.userExistsError = page.getByText('Username already exists.');
  }

  async goto() {
    await this.page.goto('/register');
    await this.waitForPageToLoad();
  }

  async waitForPageToLoad() {
    await expect(this.submitButton).toBeVisible();
  }

  async register(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async expectUserExistsError() {
    await expect(this.userExistsError).toBeVisible();
  }
}
