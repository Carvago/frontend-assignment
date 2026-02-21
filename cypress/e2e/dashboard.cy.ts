describe('Dashboard', () => {
  const uniqueId = Date.now().toString(36);
  const user = {username: `dash-${uniqueId}`, password: 'TestPass123!'};

  before(() => {
    cy.register(user.username, user.password);
  });

  beforeEach(() => {
    cy.login(user.username, user.password);
    cy.contains('Add task', {timeout: 10000}).should('be.visible');
  });

  it('shows greeting and add task button', () => {
    cy.contains('Hello', {matchCase: false}).should('be.visible');
    cy.contains('Add task').should('be.visible');
  });

  it('shows empty state or task sections when no tasks or has tasks', () => {
    cy.get('body').then(($body) => {
      const text = $body.text();
      const hasEmptyState =
        text.includes('You are amazing!') && text.includes('There is no more task to do');
      const hasTaskSections = text.includes('To-do') || text.includes('Completed');
      cy.wrap(hasEmptyState || hasTaskSections, {log: false}).should('be.true');
    });
  });

  it('navigates to new task page when clicking Add task', () => {
    cy.contains('Add task').click();
    cy.url().should('include', '/tasks/new');
    cy.contains('New task').should('be.visible');
  });
});
