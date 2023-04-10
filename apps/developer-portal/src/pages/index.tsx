/*
 * Developer Portal Homepage (http(s)://[hosturl]/)
 *
 * This Page is currently just a template demonstrating the capabilities
 * of the NextJS app to which it belongs, including TypeScript, Tailwind CSS,
 * ESLint, Prettier, tRPC, the shared component library, and
 * heroicons. It will be fleshed out in the future.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import { Button } from 'components';
import { HomeIcon } from '@heroicons/react/20/solid';
import trpc from '../utils/trpc';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  const hello = trpc.hello.useQuery({ text: 'Developer Portal' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-row justify-start align-start overflow-hidden">
      <Sidebar
        displayName="Ludo DeAnda"
        userType="admin"
        currentPage="myKeys"
      />
      <div className="grow h-screen overflow-y-scroll">
        <div className="mx-3 my-2.5">
          <h1 className="mb-2">{hello.data.greeting}</h1>
          <Button
            size="lg"
            type="primary"
            action="/"
            text="Go Home"
            Icon={HomeIcon}
            iconSide="right"
          />
          <p>
            a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a
            <br />
            a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a
            <br />
            a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a
            <br />
            a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a
            <br />
            a<br />a<br />a<br />a<br />a<br />a<br />a<br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
