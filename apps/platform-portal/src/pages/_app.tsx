import '../styles/globals.css';
import React from 'react';
import type { AppProps, AppType } from 'next/app';
import trpc from '../utils/trpc';

const App: AppType = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default trpc.withTRPC(App);
