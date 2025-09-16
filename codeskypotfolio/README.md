# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Codesky — Company Portfolio

This repository contains a production-minded Next.js portfolio for "Codesky".

Keywords: Next.js (App Router), Tailwind CSS, Framer Motion, Accessible, SEO-friendly, Serverless API routes

Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm start
```

Environment

Copy `.env.example` to `.env.local` and fill values before deploying.

Project highlights

- App Router (`/app`) with pages: Home, About, Services, Portfolio, Reviews, Founders, Contact
- Tailwind CSS with custom theme (primary: `#081A2E`, cyan accent: `#00E5FF`, accent purple optional)
- Dark/light mode toggle (class strategy)
- Reusable components: `Navbar`, `Footer`, `Button`, `Modal`, `StarRating`, `Loader`, `Portfolio` card grid
- Framer Motion micro-interactions
- Serverless API routes (App Router): `POST/GET /api/comments`, `POST /api/contact` (with simple rate-limit stub)
- Seed data: `/data/portfolio.json`, `/data/founders.json`, `/data/comments.json`
- SEO: `sitemap.xml`, `robots.txt`, `organization.jsonld`, meta tags in `app/head.js`
- Accessibility: semantic HTML, ARIA attributes, keyboard-friendly controls

Seeding & sample data

Seed data lives in `/data`. To update sample comments, edit `/data/comments.json`. The API routes included write to these files for demonstration but in production you should replace with a database.

Testing & lint

- Jest + React Testing Library example tests under `tests/`.
- ESLint and Prettier config files are included in the repo.

Deploy (Vercel)

1. Install Vercel CLI or connect repo via Vercel dashboard.
2. Set environment variables from `.env.example` (e.g., `SITE_URL`, `SMTP_*`).
3. Deploy — Vercel will detect Next.js and handle serverless `app/api` routes automatically.

Notes for production

- Replace file-based comment storage with a database (e.g., Postgres) and secure serverless functions.
- Add CAPTCHA or bot protection on public forms using `RECAPTCHA_KEY`/`RECAPTCHA_SECRET`.
- Integrate SMTP or a transactional email provider for `POST /api/contact`.
- Add proper image hosting and use `next/image` for optimized images.

Files of interest

- `app/` — Next.js App Router pages and layout
- `components/` — Reusable UI components
- `app/api/` — Serverless route handlers (comments, contact)
- `data/` — Sample JSON seed data
- `public/` — Static assets, `sitemap.xml`, `robots.txt`

Troubleshooting

- If `npm install` fails due to package versions, adjust `package.json` to versions available in your environment or use a known-good Node.js/npm registry.

License

MIT


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
