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

Then open Vercel, choose **Add New Project**, import the GitHub repository, and deploy. The repository configuration already sets the install command, build command (`pnpm build:static`), output directory (`dist/public`), and the SPA rewrite needed for direct visits to both `/` and `/admin`.

The repository now owns the poster at `client/public/match-poster.png`, so the artwork works independently of Manus storage. Live Stripe payment processing, database order persistence, and transactional E-ticket email delivery still require a backend deployment and provider credentials; the current Vercel deployment intentionally keeps the demo payment flow.

The public homepage also includes the supplied Talanta Stadium image at `client/public/stadium-background.png` without recompression. It is preloaded and rendered beneath a readability overlay. Visitors can switch between persistent dark and light modes using the header toggle; the preference is saved in their browser.

## Admin panel and Resend delivery

Open `/admin` to use the MatchPass Control Room. The homepage editor can update the announcement, hero copy, event details, ticket tier labels, ticket prices, availability labels, delivery note, and support email. In this first deployment-ready version, edits persist in the current browser with `localStorage`; connect `SiteContent` to your database when multiple admins need shared publishing.

The Orders & delivery view includes sample order records and controls for sending an E-ticket, a payment receipt, or both. The Vercel function at `api/admin/send-receipt.ts` is prepared for Resend and sends only from the server side. Add these Vercel environment variables before using live delivery:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=MatchPass <tickets@your-verified-domain.com>
RESEND_REPLY_TO=hello@your-domain.com
ADMIN_PANEL_KEY=use-a-long-random-private-value
```

Resend handles email only. Phone numbers are captured in the order records and delivery UI, but actual SMS requires a separate provider such as Twilio or Africa's Talking. The admin key protects the delivery endpoint; it is never embedded in the public bundle.
