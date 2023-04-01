/*
 * Custom NextJS Document
 *
 * This file is responsible for configuring the <Head>s of the HTML files that
 * this NextJS app will send to users. We use a <link> tag to add the favicon.
 * <meta> information can also be added here. For more information, see
 * https://nextjs.org/docs/advanced-features/custom-document.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';
import { NextPage } from 'next';

const Document: NextPage = () => (
  <Html>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
