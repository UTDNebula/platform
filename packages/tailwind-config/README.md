<!-- Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1 (Nebula Platform CS Project) starting March 21, 2023 -->

# `tailwind-config`

- This package contians the base shared `tailwind.config.js` and `postcss.config.js` configuration files from which all others inherit. These files tell Tailwind CSS what files to mess with and what custom theme options are available.
- `package.json` is the file that `pnpm` - the required package manager for this repository - uses to figure out what dependencies this package has and where its exports are.
- Note that, before this package will work, you msut download its dependencies by running `pnpm install` in a terminal pointed either at this directory or at the root directory for the entire repository.