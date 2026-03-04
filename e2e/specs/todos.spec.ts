import {test, expect} from '@playwright/test';
import {OverviewPage} from '../pom/overview-page';
import {TaskPage} from '../pom/task-page';
import {RegisterPage} from '../pom/register-page';
import {uniqueUsername, registerViaApi, createTodoViaApi} from '../utils/test-user';

test.describe('Todo CRUD', () => {
  let username: string;

  test.beforeEach(async ({page}) => {
    // Register a fresh user via UI for each test
    username = uniqueUsername();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(username, 'password123');

    const overviewPage = new OverviewPage(page);
    await overviewPage.waitForPageToLoad();
  });

  test.describe('Create', () => {
    test('should create a todo with title only', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      // Act
      await overviewPage.clickAddTask();
      await taskPage.createTask('Buy groceries');

      // Assert
      await overviewPage.waitForPageToLoad();
      await overviewPage.expectTodoVisible('Buy groceries');
    });

    test('should create a todo with title and description', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      // Act
      await overviewPage.clickAddTask();
      await taskPage.createTask('Morning workout', 'Run 5km and do 50 push-ups');

      // Assert
      await overviewPage.waitForPageToLoad();
      await overviewPage.expectTodoVisible('Morning workout');
      await overviewPage.expectTodoVisible('Run 5km and do 50 push-ups');
    });

    test('should show validation error when title is empty', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      // Act
      await overviewPage.clickAddTask();
      await taskPage.createButton.click();

      // Assert
      await taskPage.expectFieldRequiredError();
    });
  });

  test.describe('Edit', () => {
    test('should edit an existing todo', async ({page, request}) => {
      // Arrange - create a todo via API for speed
      const tokens = await registerViaApi(request, uniqueUsername(), 'password123');
      await createTodoViaApi(request, tokens.accessToken, 'Original title', 'Original description');

      // Re-login as that user won't work — use the UI-created user instead
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      // Create todo via UI
      await overviewPage.clickAddTask();
      await taskPage.createTask('Original title');
      await overviewPage.waitForPageToLoad();

      // Act - edit the todo
      await page.getByText('Original title').click();
      await expect(taskPage.saveButton).toBeVisible();
      await taskPage.saveTask('Updated title');

      // Assert
      await overviewPage.waitForPageToLoad();
      await overviewPage.expectTodoVisible('Updated title');
    });

    test('should edit todo via quick actions menu', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      await overviewPage.clickAddTask();
      await taskPage.createTask('Task to edit');
      await overviewPage.waitForPageToLoad();

      // Act
      await overviewPage.editTodoViaMenu('Task to edit');
      await expect(taskPage.saveButton).toBeVisible();
      await taskPage.saveTask('Edited via menu');

      // Assert
      await overviewPage.waitForPageToLoad();
      await overviewPage.expectTodoVisible('Edited via menu');
    });
  });

  test.describe('Delete', () => {
    test('should delete a todo via quick actions', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      await overviewPage.clickAddTask();
      await taskPage.createTask('Task to delete');
      await overviewPage.waitForPageToLoad();
      await overviewPage.expectTodoVisible('Task to delete');

      // Act
      await overviewPage.deleteTodo('Task to delete');

      // Assert
      await overviewPage.expectTodoNotVisible('Task to delete');
    });
  });

  test.describe('Toggle completion', () => {
    test('should mark a todo as completed', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      await overviewPage.clickAddTask();
      await taskPage.createTask('Task to complete');
      await overviewPage.waitForPageToLoad();

      // Assert - todo is in To-do section
      await expect(overviewPage.todoSection).toBeVisible();

      // Act - toggle checkbox
      await overviewPage.toggleTodoCheckbox('Task to complete');

      // Assert - completed section appears
      await expect(overviewPage.completedSection).toBeVisible({timeout: 10000});
    });

    test('should mark a completed todo as incomplete', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      await overviewPage.clickAddTask();
      await taskPage.createTask('Toggle task');
      await overviewPage.waitForPageToLoad();

      // Mark as complete
      await overviewPage.toggleTodoCheckbox('Toggle task');
      await expect(overviewPage.completedSection).toBeVisible({timeout: 10000});

      // Act - toggle back to incomplete
      await overviewPage.toggleTodoCheckbox('Toggle task');

      // Assert - back in To-do section
      await expect(overviewPage.todoSection).toBeVisible();
      await overviewPage.expectTodoVisible('Toggle task');
    });
  });

  test.describe('Empty state', () => {
    test('should show empty state when no todos exist', async ({page}) => {
      // Assert - fresh user has no todos
      const overviewPage = new OverviewPage(page);
      await overviewPage.expectEmptyState();
    });
  });
});
