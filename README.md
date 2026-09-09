# Fayid — official brand website

Arabic / RTL static Next.js website. No backend, database, accounts, checkout, or marketplace.

## Run

    npm install
    npm run dev

Open http://localhost:3000. Build with `npm run build`; deploy the `out/` directory to any static host. `npm run typecheck` checks TypeScript.

## Before publication

Edit `src/lib/site.ts` and populate `ZID_STORE_URL`, `SUPPLIER_FORM_URL`, `CONTACT_EMAIL`, `INSTAGRAM_URL`, `X_URL`, `LINKEDIN_URL`, and `CANONICAL_URL` with verified official destinations. Empty store/supplier destinations show an honest availability notice; absent social links are omitted. The commerce and supplier links open a new tab once configured. Set the production canonical origin before the release build so social metadata resolves correctly.

Replace the licensed illustrative photographs with approved Fayid photography when available. They do not represent Fayid facilities or actual store stock. Asset sources and placeholders are listed in `docs/assets.md` and the image manifest in `src/lib/site.ts`. The supplied logo is retained; no replacement identity was drawn. Gold is a provisional restrained accent (#A58A51), since no exact brand gold token was supplied.

## Content and structure

`src/lib/site.ts`: primary copy, navigation, destinations, social links, image manifest, future sourced impact metrics.
`src/components/home.tsx`: page sections, native dialog navigation, destination notices, Motion scroll narrative.
`src/app/globals.css`: Fayid-specific responsive design system.
`src/app/layout.tsx`: local fonts and metadata.
`src/app/page.tsx`: static entry and organization structured data.

Motion respects reduced motion. Content is server rendered and remains visible without JavaScript. The mobile story is linear; desktop uses a sticky visual with four scroll-driven stages. The mobile menu uses the native modal dialog focus trap, Escape handling, and focus restoration. Images are locally hosted WebP with width variants and no runtime image service. Original source assets are retained only for reproducibility; remove unneeded originals from publication if desired.

Browser verification: `node scripts/verify.mjs` with the development server running and local Chrome installed. Screenshots and results go into `docs/qa/`.

SEO preview images and canonical URLs are emitted only after CANONICAL_URL is configured, avoiding accidental localhost metadata in the static output. Run node scripts/accessibility.mjs for the automated accessibility checks.
