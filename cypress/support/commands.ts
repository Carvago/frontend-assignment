/// <reference types="cypress" />

/**
 * Register a new user via the UI and wait for redirect to dashboard.
 */
Cypress.Commands.add('register', (username: string, password: string) => {
  cy.visit('/register');
  cy.get('#register-username').clear().type(username);
  cy.get('#register-password').clear().type(password);
  cy.get('#register-password-confirm').clear().type(password);
  cy.get('form').submit();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.contains('Hello', {matchCase: false}).should('be.visible');
});

/**
 * Log in via the UI and wait for redirect to dashboard.
 * Clears auth tokens first so it works even when already logged in.
 */
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.window().then((win) => {
    win.localStorage.removeItem('accessToken');
    win.localStorage.removeItem('refreshToken');
  });
  cy.visit('/login');
  cy.get('#login-username').clear().type(username);
  cy.get('#login-password').clear().type(password);
  cy.get('form').submit();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.contains('Hello', {matchCase: false}).should('be.visible');
});

// Cypress type augmentation for custom commands (namespace required by Cypress typings)
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Cypress {
    interface Chainable {
      register(username: string, password: string): Chainable<void>;
      login(username: string, password: string): Chainable<void>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export {};
