<!-- Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1 (Nebula Platform CS Project) starting March 21, 2023 -->

# Nebula Platform Mini-Monorepo

## Structure

- `apps/` contains the Next.js applications `platform-portal` and `developer-portal`.
- `packages/` contains ESLint and Typescript configurations that are common to all `apps`, as well as the shared `components` library.
- Essentially, `packages` can be used by any number of `apps` and can be treated like published NPM packages from within an `app`.

## Package Manager
- IMPORTANT: You MUST use `pnpm` as your package manager for this repository.
- If you have `npm`, you can get it with `npm install -g pnpm`. If you do not have `npm`, look up installation instructions for your operating system.

## Execution

- Before doing anything else, you must download the dependencies for this project by running `pnpm install` in a terminal pointed at this directory.
- Work with all `apps` in parallel: run `pnpm {dev|lint|build}` in a terminal pointed at this directory.
- Work with an individual `app`: navigate to its directory in a terminal and run `pnpm {dev|lint|build}`.
- The `dev` operation spins up a development server on your computer that automatically adjusts to code changes so no restart is necessary. You can access the web pages by going to http://localhost:3000/ for `platform-portal` and/or http://localhost:3001/ for `developer-portal`.
- The `lint` operation checks whether the codebase adheres to our style standards and reports any problems as console output. You should run this as a last step before any PR.
- The `build` operation creates an optimized, production-ready bundle. You should run  this as a last step before any PR to make sure that there are no traspilation or compiler-time errors.

## Packages

- ESLint and Prettier are supported, and have been configured to match Nebula's opinionated style guide.
- Tailwind CSS has been configured and is the preferred method for implementing any and all styling.
- `heroicons` are available in `platform-portal`, `developer-portal`, and `components`
- For both `platform-portal` and `developer-portal`:
  - Communication between front-end and local back-end is facilitated by tRPC.
  - Communication with external back-end is facilitated by Express.
  - Input validation is facilitated by Zod.

## Other Files (You Don't Need to Touch These)
- `.github/*` are files that tell GitHub (the website that hosts this repository) how to do things like provide issue templates and perform actions automatically when new commits come through.
- `.eslintrc.js` directs ESLint to use the configuration from the `eslint-config-custom` package at the repository level. This is needed so you can `pnpm lint` from this directory.
- `.gitignore` tells Git (out version control software) what files should not be committed to the repository. These are mostly files that your computer generates when running things like `pnpm dev` and `pnpm lint`.
- `LICENSE` is the file that tells GitHub what license this code uses (for us, this is the MIT License).
- `package.json` is the file that `pnpm` uses to figure out what dependencies this project has and how to run `pnpm {dev|lint|build}`.
- `pnpm-lock.yaml` is a file that is generated by `pnpm` to speed up the execution of `pnpm install` in the case where there have been no dependency changes since the last execution.
- `pnpm-workspace.yaml` is the file that allows `pnpm` to think of this project's `packages` as published NPM packages.
- `tsconfig.json` directs tsc (the TypeScript transpiler) to use the configuration from the `tsconfig` package at the repository level. This is needed so you can `pnpm {dev|lint|build}` from this directory.
- `turbo.json` is the configuration file for Turborepo, the tool we used to make (and continue to use to manage) this monorepo. It contains information about global environment variables and project-wide build dependencies.