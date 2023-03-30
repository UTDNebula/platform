/*
 * Custom NextJS App
 *
 * This file is responsible for adding Tailwind CSS to this project (by
 * importing globals.css) and initializing tRPC (by wrapping the App export
 * with trpc.withTRPC()). Nebula's custom fonts are also declared as variables
 * for TailwindCSS to use here. For more information, see
 * https://nextjs.org/docs/basic-features/typescript.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import type { AppProps, AppType } from 'next/app';
import localFont from 'next/font/local';
import trpc from '../utils/trpc';
import '../styles/globals.css';

const inter = localFont({
  src: '../../../../fonts/Inter/Inter-VariableFont_slnt,wght.ttf',
  variable: '--font-inter'
});
const kallisto = localFont({
  src: [
    {
      path: '../../../../fonts/Kallisto/Kallisto Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Thin Italic.otf',
      weight: '100',
      style: 'italic'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Light Italic.otf',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Medium Italic.otf',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Bold.otf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Bold Italic.otf',
      weight: '700',
      style: 'italic'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Heavy.otf',
      weight: '900',
      style: 'normal'
    },
    {
      path: '../../../../fonts/Kallisto/Kallisto Heavy Italic.otf',
      weight: '900',
      style: 'italic'
    }
  ],
  variable: '--font-kallisto'
});

// The App is the starting point for any NextJS application.
const App: AppType = ({ Component, pageProps }: AppProps) => (
  <main className={`${kallisto.variable} ${inter.variable} font-inter`}>
    <Component {...pageProps} />
  </main>
);

export default trpc.withTRPC(App);
