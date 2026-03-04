import {expect, Locator, Page} from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;
  readonly formError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('input[type="text"]');
    this.passwordField = page.locator('input[type="password"]');
    this.submitButton = page.getByRole('button', {name: 'Log in'});
    this.registerLink = page.getByRole('link', {name: /Register/i});
    this.formError = page.getByText('Invalid username or password.');
  }

  async goto() {
    await this.page.goto('/login');
    await this.waitForPageToLoad();
  }

  async waitForPageToLoad() {
    await expect(this.submitButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async expectFormError() {
    await expect(this.formError).toBeVisible();
  }

  async expectFieldRequiredError() {
    await expect(this.page.getByText('This field is required').first()).toBeVisible();
  }
}
