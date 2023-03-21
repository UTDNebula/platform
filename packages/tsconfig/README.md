<!-- Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1 (Nebula Platform CS Project) starting March 21, 2023 -->

# `tsconfig`

- This package contians the base shared configuration files from which all `tsconfig.json` files throughout this repository inherit. `base.json` contains the elements of the configuration that should apply repository-wide, and is extended by both `nextjs.json` (used by apps) and `react-library.json` (used by the shared `components` library).
- `package.json` is the file that `pnpm` - the required package manager for this repository - uses to figure out what dependencies this package has and where its exports are.
- Note that, before this package will work, you msut download its dependencies by running `pnpm install` in a terminal pointed either at this directory or at the root directory for the entire repository.