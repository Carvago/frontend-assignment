import {test, expect} from '@playwright/test';
import {LoginPage} from '../pom/login-page';
import {RegisterPage} from '../pom/register-page';
import {OverviewPage} from '../pom/overview-page';
import {uniqueUsername} from '../utils/test-user';

test.describe('Authentication', () => {
  test.describe('Register', () => {
    test('should register a new user and redirect to overview', async ({page}) => {
      // Arrange
      const registerPage = new RegisterPage(page);
      const overviewPage = new OverviewPage(page);
      const username = uniqueUsername();

      // Act
      await registerPage.goto();
      await registerPage.register(username, 'password123');

      // Assert
      await overviewPage.waitForPageToLoad();
      await expect(page.getByText(username, {exact: true})).toBeVisible();
    });

    test('should show error when registering with existing username', async ({page, request}) => {
      // Arrange
      const registerPage = new RegisterPage(page);
      const username = uniqueUsername();

      await request.post('http://localhost:3001/api/register', {
        data: {username, password: 'password123'},
      });

      // Act
      await registerPage.goto();
      await registerPage.register(username, 'password123');

      // Assert
      await registerPage.expectUserExistsError();
    });

    test('should navigate to login page via link', async ({page}) => {
      // Arrange
      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();
      await registerPage.loginLink.click();

      // Assert
      await expect(page).toHaveURL('/login');
    });
  });

  test.describe('Login', () => {
    let username: string;

    test.beforeEach(async ({request}) => {
      username = uniqueUsername();
      await request.post('http://localhost:3001/api/register', {
        data: {username, password: 'password123'},
      });
    });

    test('should login with valid credentials and redirect to overview', async ({page}) => {
      // Arrange
      const loginPage = new LoginPage(page);
      const overviewPage = new OverviewPage(page);

      // Act
      await loginPage.goto();
      await loginPage.login(username, 'password123');

      // Assert
      await overviewPage.waitForPageToLoad();
      await expect(page.getByText(username, {exact: true})).toBeVisible();
    });

    test('should show error for invalid credentials', async ({page}) => {
      // Arrange
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();
      await loginPage.login(username, 'wrongpassword');

      // Assert
      await loginPage.expectFormError();
    });

    test('should show required field error when submitting empty form', async ({page}) => {
      // Arrange
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();
      await loginPage.submitButton.click();

      // Assert
      await loginPage.expectFieldRequiredError();
    });

    test('should navigate to register page via link', async ({page}) => {
      // Arrange
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();
      await loginPage.registerLink.click();

      // Assert
      await expect(page).toHaveURL('/register');
    });
  });

  test.describe('Protected Routes', () => {
    test('should redirect unauthenticated user to login', async ({page}) => {
      // Act
      await page.goto('/');

      // Assert
      await expect(page).toHaveURL('/login');
    });

    test('should redirect unauthenticated user from new task page to login', async ({page}) => {
      // Act
      await page.goto('/tasks/new');

      // Assert
      await expect(page).toHaveURL('/login');
    });
  });

  test.describe('Session', () => {
    test('should persist auth after page reload', async ({page}) => {
      // Arrange - register
      const registerPage = new RegisterPage(page);
      const username = uniqueUsername();
      await registerPage.goto();
      await registerPage.register(username, 'password123');

      const overviewPage = new OverviewPage(page);
      await overviewPage.waitForPageToLoad();

      // Act - reload page
      await page.reload();

      // Assert - still on overview, still authenticated
      await overviewPage.waitForPageToLoad();
      await expect(page.getByText(username, {exact: true})).toBeVisible();
    });
  });
});
