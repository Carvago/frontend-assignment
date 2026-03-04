import {expect, Locator, Page} from '@playwright/test';

export class OverviewPage {
  readonly page: Page;

  readonly greeting: Locator;
  readonly addTaskButton: Locator;
  readonly todoSection: Locator;
  readonly completedSection: Locator;
  readonly emptyStateTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.getByText(/Hello .+!/);
    this.addTaskButton = page.getByRole('button', {name: 'Add task'});
    this.todoSection = page.getByText('To-do', {exact: true});
    this.completedSection = page.getByText('Completed', {exact: true});
    this.emptyStateTitle = page.getByText('You are amazing!');
  }

  async waitForPageToLoad() {
    await expect(this.page).toHaveURL('/', {timeout: 15000});
    await expect(this.greeting).toBeVisible({timeout: 10000});
  }

  async clickAddTask() {
    await this.addTaskButton.click();
    await expect(this.page).toHaveURL('/tasks/new');
  }

  getTodoItemByTitle(title: string): Locator {
    return this.page.getByText(title);
  }

  getCheckboxForTodo(title: string): Locator {
    return this.page.locator('li').filter({hasText: title}).getByRole('button').first();
  }

  getQuickActionsButton(title: string): Locator {
    return this.page
      .locator('li')
      .filter({hasText: title})
      .getByRole('button', {name: /more/i})
      .or(this.page.locator('li').filter({hasText: title}).locator('button').last());
  }

  async openQuickActions(title: string) {
    const item = this.page.locator('[data-testid="todo-item"]').filter({hasText: title});
    const menuButton = item.locator('button').last();
    await menuButton.click();
  }

  async deleteTodo(title: string) {
    await this.openQuickActions(title);
    await this.page.getByRole('menuitem', {name: 'Delete'}).click();
  }

  async editTodoViaMenu(title: string) {
    await this.openQuickActions(title);
    await this.page.getByRole('menuitem', {name: 'Edit'}).click();
  }

  async toggleTodoCheckbox(title: string) {
    const item = this.page.locator('[data-testid="todo-item"]').filter({hasText: title});
    const checkbox = item.getByRole('checkbox');
    await checkbox.click({force: true});
  }

  async expectTodoVisible(title: string) {
    await expect(this.page.getByText(title).first()).toBeVisible();
  }

  async expectTodoNotVisible(title: string) {
    await expect(this.page.getByText(title)).toHaveCount(0);
  }

  async expectEmptyState() {
    await expect(this.emptyStateTitle).toBeVisible();
  }
}
