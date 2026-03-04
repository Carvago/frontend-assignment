import {test, expect} from '@playwright/test';

test('debug login flow', async ({page, request}) => {
  const username = `debug_${Date.now()}`;
  await request.post('http://localhost:3001/api/register', {
    data: {username, password: 'password123'},
  });

  await page.goto('/login');

  const inputs = await page.locator('input').all();
  console.log(`Found ${inputs.length} inputs`);
  for (const input of inputs) {
    const type = await input.getAttribute('type');
    console.log(`  Input type: ${type}`);
  }

  await page.locator('input[type="text"]').fill(username);
  await page.locator('input[type="password"]').fill('password123');

  const responsePromise = page
    .waitForResponse((resp) => resp.url().includes('/api/login'), {timeout: 10000})
    .catch(() => null);

  await page.getByRole('button', {name: 'Log in'}).click();

  const resp = await responsePromise;
  if (resp) {
    console.log(`Login API response: ${resp.status()}`);
    const body = await resp.json();
    console.log(`Has accessToken: ${!!body.accessToken}`);
  } else {
    console.log('No login API response received!');
  }

  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(3000);
  console.log(`Current URL after 3s: ${page.url()}`);

  const errorText = await page.locator('text=Invalid').isVisible();
  console.log(`Error visible: ${errorText}`);
});
