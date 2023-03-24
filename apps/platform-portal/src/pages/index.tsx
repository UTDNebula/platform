/*
 * Platform Portal Homepage (http(s)://[hosturl]/)
 *
 * This Page is currently just a template demonstrating the capabilities
 * of the NextJS app to which it belongs, including TypeScript, Tailwind CSS,
 * ESLint, Prettier, tRPC, the shared component library, and
 * react-material-symbols. It will be fleshed out in the future.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Button } from 'components/src';
import trpc from '../utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.hello.useQuery({ text: 'Platform Portal' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ml-2">
      <h1 className="pb-10 text-brand">{hello.data.greeting}</h1>
      <Link href="/">
        <Button
          appearance="secondary"
          text="Go Home"
          icon="home"
          iconSide="right"
        />
      </Link>
    </div>
  );
};

export default Home;
