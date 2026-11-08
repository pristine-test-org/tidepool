# Tidepool

Tidepool books small-group guided walks on the Northern California coast, timed to the lowest tides of the month. Guests browse tours, sign in and book a spot; the owner sees capacity, waitlists and recent bookings on the owner desk.

Used as an Impeccable test repository.

## Stack

- SvelteKit 3 (Svelte 5) with `@sveltejs/adapter-node`, TypeScript
- Tailwind CSS v4. The design tokens (colours, fonts, radii, shadow) are declared with `@theme` in `src/app.css` and used through utility classes.
- pnpm, Node 22.17 or later (`.nvmrc` selects Node 22)
- In-memory data only (`src/lib/server/seed.ts`); it resets when the server restarts.

## Accounts

| Role  | Email                 | Password         | Can see                              |
| ----- | --------------------- | ---------------- | ------------------------------------ |
| guest | `guest@tidepool.test` | `tidepool-guest` | Tours, their bookings                |
| owner | `owner@tidepool.test` | `tidepool-owner` | Everything, plus the owner desk `/admin` |

## Pages

| Path              | Route file                                   | Access        |
| ----------------- | -------------------------------------------- | ------------- |
| `/`               | `src/routes/+page.svelte`                    | public        |
| `/tours`          | `src/routes/tours/+page.svelte`              | public        |
| `/tours/[slug]`   | `src/routes/tours/[slug]/+page.svelte`       | public        |
| `/login`          | `src/routes/login/+page.svelte`              | public        |
| `/bookings`       | `src/routes/(app)/bookings/+page.svelte`     | signed in     |
| `/bookings/[id]`  | `src/routes/(app)/bookings/[id]/+page.svelte`| signed in     |
| `/admin`          | `src/routes/(admin)/admin/+page.svelte`      | owner only    |

## Run it

```sh
pnpm install
pnpm dev            # http://localhost:5173
```

Production build:

```sh
ORIGIN=http://localhost:3000 pnpm build
PORT=3000 pnpm start
```

For a plain HTTP production-build smoke test, set `ORIGIN` when building, matching the URL you will open. SvelteKit 3 takes this value through `paths.origin`; adapter-node 6 no longer reads `ORIGIN` at server startup. Rebuild if the fixed origin changes. For HTTPS previews with a dynamic hostname, omit `ORIGIN` when building so the adapter derives the origin from the request host. CSRF checks remain enabled.

## Contributing

Pull requests target `develop`. `main` is the release branch.
