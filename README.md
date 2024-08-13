# Story

A web app that showcases the latest articles, allowing users to vote on posts and comment to engage in discussions

## Functional Requirements

The functional requirements are as follows:

- Users can browse and view a list of the latest articles.
- Each article is displayed as a post with a title, summary, author information, and publication date.
- Users can upvote or downvote posts.
- Users can comment on posts.

## Technologies and Dependencies

- [ReactJS](https://reactjs.org/ 'ReactJS')
- [NextJS](https://nextjs.org/ 'NextJS')
- [Typescript](https://www.typescriptlang.org/ 'Typescript')
- [Axios](https://www.npmjs.com/package/axios 'Axios')
- [React Hook Form](https://react-hook-form.com/ 'React Hook Form')
- [Vite Frontend Tool](https://vitejs.dev/ 'Vite Frontend Tool')
- [Vitest](https://vitest.dev/ 'Vitest')
- [React Hot Toast](https://react-hot-toast.com/ 'React Hot Toast')
- [Redux Toolkit](https://redux-toolkit.js.org/ 'Redux Toolkit')
- [Lucide React](https://lucide.dev/guide/packages/lucide-react 'Lucide React')
- [Lottie React](https://lottiereact.com/ 'Lottie React')
- [Tailwind CSS](https://tailwindcss.com/ 'Tailwind CSS')
- [Radix UI](https://www.radix-ui.com/ 'Radix UI')
- [ESLint](https://eslint.org/ 'ESLint')
- [Prettier](https://prettier.io/ 'Prettier')
- [Lint-staged](https://www.npmjs.com/package/lint-staged 'Lint-staged')
- [Husky](https://www.npmjs.com/package/husky 'Husky')

## Prerequisites

To run the web application, you need Node.js, NPM or Yarn, and a code editor (VSCode with ESLint installed).

## Environment Variables

The exist in the `.env.local` file in root directory

## Setup

- Unzip project folder

- Install the essential packages after cloning the project and going to its root path.

```bash
npm install
```

- Execute the service in development mode with the following command:

```bash
npm run dev
```

## Code Structure

- `.github`: This folder contains GitHub-specific configurations, including workflows, issue templates, and pull request templates, which automate CI/CD processes and standardize contribution practices for the repository.
- `.husky`: Contains the husky configuration file.
- `public`: Contains the public assets.
  - `assets`: This folder contains static files like Images and Styles for the web application.
- `src`: This folder contains the source code for the payment links web app.
  - `__tests__`: This folder contains unit and integration tests for the application, ensuring that the components and functions work as expected and maintain high code quality.
  - `app`: This folder contains the main components and routing logic for the application, following Next.js's file-based routing system, and serves as the entry point for rendering pages and layouts.
  - `components`: This folder contains the building blocks of the application.
  - `lib`: This folder contains the axios, API, and Redux Toolkit configuration files for the application.
    - `utils`: This folder contains utility functions, variables and interfaces for the application.
  - `lotties`: This folder contains json files with animations used in the Lottie animation package.
  - `styles`: This folder contains global CSS files and styling modules that define the visual appearance of the application, providing consistent design and layout across all components.

## Development Process

- Pull from the main branch
- Create a feature branch off the main branch
- Implement your changes
- If no conflict, merge to the Development branch
- If conflict arises, they are to be resolved, before being pushed
- Then get QA to test your changes/fixes on the development branch
- Once approved, by QA on test branch, merge original branch to staging
- If no staging, proceed to production

## Deployment

Deployed on Vercel - a seamless deployment and hosting platform that ensures continuous deployment, automatically updating the live site with every code change.

## Contributors

| Role             | People                             |
| ---------------- | ---------------------------------- |
| Code 💻          | Chidera Ezenwekwe, Immanuel Kattey |
| Maintenance 🛠   | Chidera Ezenwekwe                  |
| Documentation 📖 | Chidera Ezenwekwe                  |
