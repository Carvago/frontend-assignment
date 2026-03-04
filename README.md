# Quick Overview

- This repository is built on [Create React App](https://github.com/facebook/create-react-app) with TypeScript configuration
- [Chakra Theme](https://chakra-ui.com/) is set up with all the colors and sizes
- For unit testing, [Jest](https://jestjs.io/) is already installed
- You will use our prettier, eslint, and typescript config for static testing <br/> `npm run eslint && npm run prettify && npm run typecheck`

For a quick start follow these commands

```sh
npm install
npm start
```

Then open [localhost:3000](http://localhost:3000/) to see your app.
Or open [localhost:3001/api/docs](http://localhost:3001/api/docs) to see APIs you will be working with<br>

---

![Alt text](./src/assets/readme/banner.png)

**Your task will be to write a `To-Do app`.** <br/>
You might think a to-do list isn't a challenge, and
that's right, that is why we're gonna make it a little bit harder.

You can use the `Chakra UI` design system with our style theme. This means that you will create the entire task based on the [Figma specification](https://www.figma.com/file/JoD25P1n4ALPTdt1wesM1S/Zentask---Frontend-Assignment?type=design&t=qZXHzbWa37NSYGcn-6).

The assignment will not be completely detailed, i.e. you will have to think about the details. How you handle it is up to you and we will grade you accordingly. You will be given a rough description, and figma specification.

| Title                  | 1.                                                                                                                                    | 2.                                                                                                                          | 3.                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Requirements**       | Statefull fetching                                                                                                                    | Error handling                                                                                                              | Write utility function to get formatted current date and test with jest                                                                |
| **What we appreciate** | Responsive design _(Desktop, Tablet, and Mobile)_                                                                                     | Basic component system _(Button, Checkbox, Card, etc.)_                                                                     | Chakra UI / tailwind setup _(Chakra is already set up in the project, but feel free to ditch or overwrite the current implementation)_ |
| **Where we relieve**   | Don't have time to waste with fancy design or tranlations. Write a simple proof of concept and focus on the logical part of your code | Performance _(let's focus on delivering a working project, we can discuss potential improvements in our online interview )_ |                                                                                                                                        |

**Feel free to update update the readme.md with any notes, feedback or comments**

### Description

You will create a simple to-do app, with a user register and login. You will work with local BE, already pre-build in your project.

1. First, you will handle authentication, including login and register page.
2. Then you create a simple todo list with all todos assigned to logged-in
3. Each todo has quick actions button, that will reveal delete and complete actions
4. On todo click, you will be redirected to the todo detail page
5. On the todo detail page, you see todo in full length and have options to edit the todo as well as delete and mark it as completed

---

## Implementation Notes

### Architecture

The app follows a feature-based folder structure with clear separation of concerns:

```
src/
  api/            # Axios client with JWT interceptors + Orval-generated React Query hooks
  components/     # Reusable UI components (Button, Card, TextField, Checkbox, etc.)
  features/       # Feature modules (todos — TodoItem, TodoForm, TodoSections, QuickActions)
  pages/          # Route-level pages (Login, Register, Overview, NewTask, EditTask, NotFound)
  providers/      # Context providers (AuthProvider, QueryProvider)
  routes/         # Router config, route guards (ProtectedRoute), path constants
  utils/          # Utilities (formatDate, storage, Zod validation schemas)
  i18n/           # i18next config and English translations
```

### Key Technical Decisions

**API layer — Orval + React Query + Axios**

All API types and React Query hooks are auto-generated from the backend Swagger spec via [Orval](https://orval.dev/) (`npx orval`). The generated file `src/api/generated.ts` should never be edited manually. Axios client (`src/api/client.ts`) handles JWT token attachment and silent token refresh via interceptors.

**Form management — react-hook-form + Zod**

Forms (Login, Register, TodoForm) use [react-hook-form](https://react-hook-form.com/) with [@hookform/resolvers/zod](https://github.com/react-hook-form/resolvers) for schema-based validation. Validation schemas are defined in `src/utils/schemas.ts` and are typed against the generated API types (`LoginRequest`, `CreateTodoRequest`). Error messages use i18n keys that get translated at the component level via `t()`.

**State management — React Query + optimistic updates**

Server state is managed entirely through React Query. The overview page uses optimistic updates for toggle/delete operations — the UI updates immediately and rolls back on error. No client-side state library (Redux, Zustand) is needed.

**Authentication — JWT with refresh tokens**

`AuthProvider` manages login/register/logout and persists tokens in localStorage. The Axios interceptor silently refreshes expired access tokens using the refresh token. `ProtectedRoute` guards authenticated pages.

**Styling — Chakra UI v3**

All components are built on Chakra UI with a custom theme. Reusable UI primitives (`TextField`, `PasswordField`, `TextArea`, `Button`, `Card`, `Checkbox`) wrap Chakra components with consistent styling.

**Internationalization — react-i18next**

All user-facing strings are externalized in `src/i18n/en.json`. Components access translations via the `useTranslation` hook.

**Animations — Framer Motion**

Todo list items use `AnimatePresence` and `motion.div` for enter/exit animations and layout transitions.

### Testing

- **Unit tests** (Jest + Testing Library): Component and utility tests in `*.test.ts(x)` files. Run with `npm test`.
- **E2E tests** (Playwright): Full user flow tests in `e2e/specs/` using the Page Object Model pattern (`e2e/pom/`). Run with `npm run e2e`.
- **Static analysis**: `npm run eslint && npm run prettify && npm run typecheck`

### Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server (frontend on :3000, backend on :3001) |
| `npm test` | Run Jest unit tests |
| `npm run e2e` | Run Playwright E2E tests |
| `npm run eslint` | Lint with ESLint |
| `npm run prettify` | Format with Prettier |
| `npm run typecheck` | TypeScript type check |
| `npx orval` | Regenerate API hooks from Swagger |

## Important links

- [Api docs](http://localhost:3001/api/docs) _(will work only when the project is locally started)_
- [Figma specification](https://www.figma.com/file/JoD25P1n4ALPTdt1wesM1S/Zentask---Frontend-Assignment?type=design&t=qZXHzbWa37NSYGcn-6)
- [Chakra UI](https://chakra-ui.com/)
- [Jest](https://jestjs.io/)

**That's it! Good luck!**
