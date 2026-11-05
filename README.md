# MatchPass — Bayern vs Ajax

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## Deploy to Vercel

This repository includes `vercel.json` for a Vite static deployment. The current checkout is a preview-safe client flow, so Vercel should use the static build rather than the Express server.

From the project root, install dependencies and verify the production bundle locally:

```bash
pnpm install --frozen-lockfile
pnpm build:static
```

To create a GitHub repository and push the code yourself:

```bash
git init
git add .
git commit -m "Prepare MatchPass for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Then open Vercel, choose **Add New Project**, import the GitHub repository, and deploy. The repository configuration already sets the install command, build command (`pnpm build:static`), output directory (`dist/public`), and the `/404` SPA rewrite.

The repository now owns the poster at `client/public/match-poster.png`, so the artwork works independently of Manus storage. Live Stripe payment processing, database order persistence, and transactional E-ticket email delivery still require a backend deployment and provider credentials; the current Vercel deployment intentionally keeps the demo payment flow.
