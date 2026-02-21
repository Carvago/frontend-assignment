describe('Authentication', () => {
  const uniqueId = Date.now().toString(36);
  const newUser = {
    username: `cyuser-${uniqueId}`,
    password: 'TestPass123!',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Login', () => {
    it('redirects unauthenticated user to login', () => {
      cy.url().should('include', '/login');
      cy.contains("It's good to have you back!").should('be.visible');
    });

    it('shows validation when submitting empty form', () => {
      cy.visit('/login');
      cy.get('form').submit();
      cy.contains('This field is mandatory').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('shows error for invalid credentials', () => {
      cy.visit('/login');
      cy.get('#login-username').type('nonexistent');
      cy.get('#login-password').type('wrongpassword');
      cy.get('form').submit();
      cy.contains(/Invalid credentials|User was not found/, {matchCase: false}).should(
        'be.visible'
      );
      cy.url().should('include', '/login');
    });

    it('logs in successfully and redirects to dashboard', () => {
      cy.register(newUser.username, newUser.password);
      cy.get('header').contains(newUser.username, {matchCase: false}).click();
      cy.contains('Log out').click();
      cy.url().should('include', '/login');
      cy.login(newUser.username, newUser.password);
      cy.contains('Add task').should('be.visible');
    });
  });

  describe('Register', () => {
    it('navigates to register from login', () => {
      cy.visit('/login');
      cy.contains('Sign up').click();
      cy.url().should('include', '/register');
      cy.contains('Create account').should('be.visible');
    });

    it('shows validation for empty required fields', () => {
      cy.visit('/register');
      cy.get('form').submit();
      cy.contains('This field is mandatory').should('be.visible');
    });

    it('shows error when passwords do not match', () => {
      cy.visit('/register');
      cy.get('#register-username').type('someone');
      cy.get('#register-password').type('Pass123!');
      cy.get('#register-password-confirm').type('Different1!');
      cy.get('form').submit();
      cy.contains('Passwords do not match').should('be.visible');
    });

    it('registers successfully and lands on dashboard', () => {
      const regUsername = `cyreg-${uniqueId}-${Math.random().toString(36).slice(2, 8)}`;
      cy.visit('/register');
      cy.get('#register-username').type(regUsername);
      cy.get('#register-password').type(newUser.password);
      cy.get('#register-password-confirm').type(newUser.password);
      cy.get('form').submit();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.contains('Hello', {matchCase: false}).should('be.visible');
    });
  });

  describe('Logout', () => {
    it('logs out and redirects to login', () => {
      const logoutUser = `cylogout-${uniqueId}`;
      cy.register(logoutUser, newUser.password);
      cy.get('header').contains(logoutUser, {matchCase: false}).click();
      cy.contains('Log out').click();
      cy.url().should('include', '/login');
      cy.visit('/');
      cy.url().should('include', '/login');
    });
  });
});
