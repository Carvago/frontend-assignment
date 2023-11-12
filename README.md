# Quick Overview

> This repository is built on [Create React App](https://github.com/facebook/create-react-app) with TypeScript configuration
> \- [Chakra UI](https://chakra-ui.com/) is installed as UI framework
> \- For unit testing, [Jest](https://jestjs.io/) is ready for you and for end-to-end testing it is [Cypress](https://www.cypress.io/) > \- You will use our prettier, eslint and typescript config for static testing - `npm run eslint && npm run prettify && npm run typecheck`

For quick start follow these commands

```sh
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000/) to see your app.<br>

## Why the assignment?

The assignment is one of three steps when we profile the applicant.<br>In this step we evaluate:

- `project architecture`
- `sense of clarity and ability to write readable code`
- `knowledge of best practicess`
- `visual design of the application`
- `programming skills`

# The assignment

📝 Your task will be to write a `To Do List`.<br>
You might think a to do list isn't a challenge, and
that's right, that is why we're gonna make it little bit harder.

You can use `Chakra UI` design system with our style theme. Which means that you will create the entire task based on the [Figma specification](<https://www.figma.com/file/dUbAoACARZfJ6TuXvsR4Xk/Frontend-Assignment-(1.0)?type=design&node-id=0-1&mode=design>).

The assignment will not be completely detailed, i.e. you will have to think about the details. How you handle it is up to you and we will grade you accordingly. You will be given a rough description, and figma specification.

### Requirements

- Chakra UI
- Semi responsive design (lets focus on main devices, **Desktop**, **Tablet** and **Mobile**), no extremes
- Error handling

### Descriptions

You will create a simple todo app, with user login. You will use [DummyJSON](https://dummyjson.com/docs) api to provide dummy API endpoints.

1. First, you will create a login page with `userName` and `password` fields.
   - you will authenticate the user as defined in the [dummyJSON api docs](https://dummyjson.com/docs/auth) and get user authorization token as well as id
   - example credentials
   ```json
   {
     "username": "atuny0",
     "password": "9uQFF1Lh"
   }
   ```
2. Then you create simple todo list with all todos assigned to [logged-id user](https://dummyjson.com/docs/users) with authorization token
3. Each todo with have quick actions button, that will reveal delete and complete actions
4. On todo click, you will be redirected to todo detail page
5. On todo detail page, you see todo in full length and have options to edit the todo as well as delete and mark as completed

## Important links

- [Figma specification](<https://www.figma.com/file/dUbAoACARZfJ6TuXvsR4Xk/Frontend-Assignment-(1.0)?type=design&node-id=0-1&mode=design>)
- [DummyJSON](https://dummyjson.com/docs)
- [Chakra UI](https://chakra-ui.com/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

### What we appreciate

- Do you know `Cypress` or `Jest`? Show yourself!
- `Chakra UI` is too easy for you, never mind... style your own using `Styled Components` or use `Tailwindcss`
- We will be very happy if you use some library for animations
- Feel free to host the app on [vercel](https://vercel.com/) or [gh-pages](https://pages.github.com/)

**That's it! Good luck!**
