<!-- Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1 (Nebula Platform CS Project) starting March 21, 2023 -->

# Shared Component Library

## Structure

- Each of the `src/components/*.tsx` files contains a React component that can be imported from any and all of the `apps` in this monorepo.
- `src/index.tsx` collects all of the default exports from all the other `.tsx` files so that they can be imported correctly in `apps`.
- Helper files are contained within `src/utils`.

## Package Manager
- IMPORTANT: You MUST use `pnpm` as your package manager for this repository.
- If you have `npm`, you can get it with `npm install -g pnpm`. If you do not have `npm`, look up installation instructions for your operating system.

## Execution

- Before doing anything else, you must download the dependencies for this package by running `pnpm install` in a terminal pointed either at this directory or at the root directory for the entire repository.
- To lint this package, open a terminal pointed at this directory and run `pnpm lint`.
- The `lint` operation checks whether the codebase adheres to our style standards and reports any problems as console output. You should run this as a last step before any PR.

## Packages

- ESLint and Prettier are supported, and have been configured to match Nebula's opinionated style guide.
- Tailwind CSS has been configured and is the preferred method for implementing any and all styling.
- `react-material-symbols` are also available.

## Other Files (You Don't Need to Touch These)
- `.prettierrc.json` configures Prettier to match Nebula's opinionated style guide for this app.
- `package.json` is the file that `pnpm` uses to figure out what dependencies this package has, where its exports are, and how to run `pnpm lint`.
- `postcss.config.js` and `tailwind.config.js` direct Tailwind CSS to use the configuration from the `tailwind-config` package for this package.
- `tsconfig.json` directs tsc (the TypeScript transpiler) to use the configuration from the `tsconfig` package for this package. This is needed so you can `pnpm lint` from this directory.