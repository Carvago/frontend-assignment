import {test, expect} from '@playwright/test';
import {RegisterPage} from '../pom/register-page';
import {OverviewPage} from '../pom/overview-page';
import {TaskPage} from '../pom/task-page';
import {uniqueUsername} from '../utils/test-user';

test.describe('Navigation', () => {
  test('should show 404 page for unknown routes', async ({page}) => {
    // Act
    await page.goto('/some/unknown/route');

    // Assert
    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
  });

  test('should navigate home from 404 page', async ({page}) => {
    // Arrange
    await page.goto('/nonexistent');
    await expect(page.getByText('404')).toBeVisible();

    // Act
    await page.getByRole('link', {name: /Go home/i}).click();

    // Assert - redirects to login since not authenticated
    await expect(page).toHaveURL('/login');
  });

  test.describe('Authenticated navigation', () => {
    test.beforeEach(async ({page}) => {
      const username = uniqueUsername();
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.register(username, 'password123');

      const overviewPage = new OverviewPage(page);
      await overviewPage.waitForPageToLoad();
    });

    test('should navigate to new task page and back', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      // Act - go to new task
      await overviewPage.clickAddTask();
      await expect(page).toHaveURL('/tasks/new');

      // Act - go back
      await taskPage.backButton.click();

      // Assert
      await expect(page).toHaveURL('/');
    });

    test('should discard new task and return to overview', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      // Act
      await overviewPage.clickAddTask();
      await taskPage.titleField.fill('Draft task');
      await taskPage.discardButton.click();

      // Assert
      await overviewPage.waitForPageToLoad();
    });

    test('should navigate to edit page by clicking a todo', async ({page}) => {
      // Arrange
      const overviewPage = new OverviewPage(page);
      const taskPage = new TaskPage(page);

      await overviewPage.clickAddTask();
      await taskPage.createTask('Clickable task');
      await overviewPage.waitForPageToLoad();

      // Act
      await page.getByText('Clickable task').click();

      // Assert
      await expect(page).toHaveURL(/\/tasks\/.+\/edit/);
      await expect(taskPage.saveButton).toBeVisible();
    });
  });
});
