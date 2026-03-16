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

## Important links

- [Api docs](http://localhost:3001/api/docs) _(will work only when the project is locally started)_
- [Figma specification](https://www.figma.com/file/JoD25P1n4ALPTdt1wesM1S/Zentask---Frontend-Assignment?type=design&t=qZXHzbWa37NSYGcn-6)
- [Chakra UI](https://chakra-ui.com/)
- [Jest](https://jestjs.io/)

**That's it! Good luck!**

---

## Implementation Notes

### Tech decisions
- Migrated from Create React App to **Next.js 16 App Router** with webpack
- **Chakra UI v3** with a custom theme (colors, font sizes, recipes for Button, Input, Textarea)
- **axios** for HTTP requests with JWT auth interceptors (access token + refresh token flow)
- **i18next** for multi-language support (English / Czech), locale persisted in cookies
- **yup** for form validation, custom `useForm` hook to avoid duplication
- SVG icons imported as React components via SVGR

### Features implemented
- Authentication: login, register (with full name field), JWT + refresh token
- Todo list with stateful fetching, loading states, error handling
- Todo detail page, create and edit todo
- Mark todo as complete / incomplete
- Delete todo with confirmation dialog
- Responsive design (mobile, tablet, desktop)
- 404 page with translations
- Keyboard navigation with styled focus outline

### Extra improvements
- Full name field added to registration
- Date formatting respects current locale (month name in English/Czech)
- Accessibility improvements: `aria-label` on icon buttons, checkbox ARIA label, `<main>` landmark
- Redirect to `/todos` when navigating to a non-existent todo ID

### Deployment
- Frontend: [Vercel](https://frontend-assignment-hazel-chi.vercel.app)
- Backend: Railway (Express + SQLite)
