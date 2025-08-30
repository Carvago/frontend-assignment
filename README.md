# Quick Overview

- This repository is built on [Create React App](https://github.com/facebook/create-react-app) with TypeScript configuration
- [Chakra UI](https://chakra-ui.com/) is installed as UI framework
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

| Title                  | 1.                                                                                                                                    | 2.                                                                                                                        | 3.                                                                                        | 4.                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Requirements**       | Chakra UI                                                                                                                             | Error handling                                                                                                            | Responsive design (let's focus on main devices, Desktop, Tablet, and Mobile)              | Write utility function to get formatted current date and test with jest |
| **What we appreciate** | Statefull fetching                                                                                                                    | Basic component system (Button, Checkbox, Card, etc.)                                                                     | Task feedback from your side, feel free to add comments with questions/explanations/notes |
| **Where we relieve**   | Don't have time to waste with fancy design or tranlations. Write a simple proof of concept and focus on the logical part of your code | Performance (let's focus on delivering a working project, we can discuss potential improvements in our online interview ) |                                                                                           |                                                                         |

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
