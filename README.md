# Nebula Platform Mini-Monorepo

## Structure

- `apps/` contains the Next.js applications `platform-portal` and `developer-portal`.
- `packages/` contains common ESLint and Typescript configurations, as well as the `components` library.
- In other words, `packages/` can be used by multiple `apps/`, where they can be treated like published NPM packages.

## Package Manager
- IMPORTANT: You MUST use `pnpm` as your package manager for this repository.
- If you have `npm`, you can get it with `npm install -g pnpm`.

## Execution

- Run all `apps` in parallel: run `pnpm {dev|lint|build}` in this directory.
- Run an individual `app`: navigate to its directory and `pnpm {dev|lint|build}`.

## Packages

- ESLint and Prettier are supported.
- Tailwind CSS has been configured for use.
- `react-material-symbols` are available in `platform-portal`, `developer-portal`, and `components`
- For both `platform-portal` and `developer-portal`:
  - Communication between front-end and local back-end is facilitated by tRPC.
  - Communication with external back-end is facilitated by Express.
  - Input validation is facilitated by Zod.
