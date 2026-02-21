describe('Task management', () => {
  const uniqueId = Date.now().toString(36);
  const user = {username: `taskuser-${uniqueId}`, password: 'TestPass123!'};
  const taskTitle = `E2E task ${uniqueId}`;
  const taskDescription = 'Created by Cypress';

  before(() => {
    cy.register(user.username, user.password);
  });

  beforeEach(() => {
    cy.login(user.username, user.password);
    cy.contains('Add task', {timeout: 10000}).should('be.visible');
  });

  it('creates a new task and shows it on dashboard', () => {
    cy.contains('Add task').click();
    cy.url().should('include', '/tasks/new');

    cy.get('#new-task-title').type(taskTitle);
    cy.get('#new-task-description').type(taskDescription);
    cy.contains('Create task').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('To-do').should('be.visible');
    cy.contains(taskTitle).should('be.visible');
    cy.contains(taskDescription).should('be.visible');
  });

  it('validates required title on new task form', () => {
    cy.visit('/tasks/new');
    cy.get('#new-task-description', {timeout: 10000}).type('Only description');
    cy.contains('Create task').click();
    cy.contains('This field is mandatory').should('be.visible');
    cy.url().should('include', '/tasks/new');
  });

  it('toggles task completion', () => {
    cy.contains(taskTitle, {timeout: 10000}).should('be.visible');
    cy.contains(taskTitle).parent().parent().find('[role="checkbox"]').click();
    cy.contains('Completed').should('be.visible');
    cy.contains(taskTitle).should('be.visible');
    cy.contains('You are amazing!').should('be.visible');
  });

  it('edits a task', () => {
    const updatedTitle = `${taskTitle} (edited)`;
    cy.contains(taskTitle, {timeout: 10000}).should('be.visible');
    cy.contains(taskTitle).click();
    cy.url().should('match', /\/tasks\/[^/]+\/edit/);
    cy.get('#new-task-title').clear().type(updatedTitle);
    cy.contains('Save changes').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(updatedTitle).should('be.visible');
  });

  it('deletes a task from edit page', () => {
    const toDeleteTitle = `Delete from edit ${uniqueId}`;
    cy.contains('Add task').click();
    cy.get('#new-task-title', {timeout: 10000}).type(toDeleteTitle);
    cy.contains('Create task').click();
    cy.contains(toDeleteTitle, {timeout: 10000}).should('be.visible');
    cy.contains(toDeleteTitle).click();
    cy.url().should('match', /\/tasks\/[^/]+\/edit/);
    cy.contains('button', 'Delete').click();
    cy.get('[role="alertdialog"]').should('be.visible').contains('button', 'Delete').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(toDeleteTitle).should('not.exist');
  });

  it('deletes a task via menu and stays on dashboard', () => {
    const toDeleteViaMenu = `Delete via menu ${uniqueId}`;
    cy.contains('Add task').click();
    cy.get('#new-task-title', {timeout: 10000}).type(toDeleteViaMenu);
    cy.contains('Create task').click();
    cy.contains(toDeleteViaMenu, {timeout: 10000}).should('be.visible');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(toDeleteViaMenu).parent().parent().find('[aria-label="Edit"]').click();
    cy.get('[role="menu"]').should('be.visible').contains('button', 'Delete').click();
    cy.get('[role="alertdialog"]', {timeout: 10000}).should('be.visible');
    cy.get('[role="alertdialog"]').contains('button', 'Delete').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains(toDeleteViaMenu).should('not.exist');
  });

  it('shows leave confirmation when discarding with unsaved changes', () => {
    cy.contains(taskTitle, {timeout: 10000}).should('be.visible');
    cy.contains(taskTitle).click();
    cy.url().should('match', /\/tasks\/[^/]+\/edit/);
    cy.get('#new-task-title').clear().type('Changed title');
    cy.contains('Discard changes').click();
    cy.get('[role="alertdialog"]')
      .should('be.visible')
      .contains('Leave page?')
      .should('be.visible');
    cy.get('[role="alertdialog"]').contains('button', 'Cancel').click();
    cy.url().should('match', /\/tasks\/[^/]+\/edit/);
    cy.get('#new-task-title').should('have.value', 'Changed title');
  });
});
