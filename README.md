### A College Assignment
### Submitted as part of my L4 Software Development Apprenticeship 
### Module Name: Web Design & Authoring
### October 2024.

---

The assignment criteria was as follows:

- Create a web app that allows users to browse information about movies.
- The web app will be coded using a Javascript framework, HTML and CSS.
- It won’t have a backend server component, but will retrieve data from one or more APIs.
- State will be preserved by storing data in the user’s browser.


### Core functional requirements
Users of the web app should at minimum be able to:
- See a list or grid of movies with titles and optionally posters
- Search movies by keyword
- Filter results using the following attributes
  - Runtime / duration
  - Genre
  - Release year
- View movie information including:
  - Title
  - Overview
  - Release year
  - Genre
  - Duration
  - Cast list
- Allow the user to manage a watchlist, including adding and deleting movies
- Navigate the following screens:
  - Homepage
  - View movie details
  - Manage watchlist

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
