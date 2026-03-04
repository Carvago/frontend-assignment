import {expect, Locator, Page} from '@playwright/test';

export class TaskPage {
  readonly page: Page;

  readonly titleField: Locator;
  readonly descriptionField: Locator;
  readonly createButton: Locator;
  readonly saveButton: Locator;
  readonly discardButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleField = page.locator('input[type="text"]');
    this.descriptionField = page.locator('textarea');
    this.createButton = page.getByRole('button', {name: 'Create task'});
    this.saveButton = page.getByRole('button', {name: 'Save changes'});
    this.discardButton = page.getByRole('button', {name: /Discard/i});
    this.backButton = page.locator('button').first();
  }

  async gotoNew() {
    await this.page.goto('/tasks/new');
    await expect(this.createButton).toBeVisible();
  }

  async fillForm(title: string, description?: string) {
    await this.titleField.fill(title);
    if (description) {
      await this.descriptionField.fill(description);
    }
  }

  async createTask(title: string, description?: string) {
    await this.fillForm(title, description);
    await this.createButton.click();
  }

  async saveTask(title: string, description?: string) {
    await this.titleField.clear();
    await this.titleField.fill(title);
    if (description !== undefined) {
      await this.descriptionField.clear();
      await this.descriptionField.fill(description);
    }
    await this.saveButton.click();
  }

  async expectFieldRequiredError() {
    await expect(this.page.getByText('This field is required')).toBeVisible();
  }
}
