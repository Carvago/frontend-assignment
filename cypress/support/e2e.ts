// Cypress E2E support file.
// Runs before every test file. Use for global configuration and imports.
// https://docs.cypress.io/guides/end-to-end-testing/writing-and-organizing-tests#Support-file

import './commands';

// App throws on failed login/register; we assert on UI instead.
Cypress.on('uncaught:exception', (err) => {
  if (err.message?.includes('status code 401') || err.message?.includes('status code 400')) {
    return false;
  }
  return true;
});
