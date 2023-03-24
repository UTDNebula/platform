/*
 * Custom NextJS App
 *
 * This file is responsible for adding Tailwind CSS to this project (by
 * importing globals.css) and initializing tRPC (by wrapping the App export
 * with trpc.withTRPC()). For more information, see
 * https://nextjs.org/docs/basic-features/typescript.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import type { AppProps, AppType } from 'next/app';
import trpc from '../utils/trpc';
import '../styles/globals.css';

// The App is the starting point for any NextJS application.
const App: AppType = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default trpc.withTRPC(App);
