/*
 * Developer Portal Homepage (http(s)://[hosturl]/)
 *
 * Exports a function component that renders either the "Join Developer Portal"
 * page or the "My API Keys" page depending on whether the user is signed in
 * and whether the user is a developer. If the user is not signed in or is not
 * a developer, a page with title text and a high-level description of
 * Developer Portal is rendered. If the user is not signed in, call-to-action
 * buttons for signing up and signing in are also shown. If the user is signed
 * in but is not a developer, a call-to-action button for becoming a developer
 * is shown. Finally, if the user is signed in...
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import { Button, Hero } from 'components';
// import trpc from '../utils/trpc';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

// For debug purposes; the final shape of this data will be informed by backend
type User = {
  displayName: string;
  permissionLevel: 'user' | 'developer' | 'projectLeader' | 'admin';
};

const Home: NextPage = () => {
  // const hello = trpc.hello.useQuery({ text: 'Developer Portal' });
  // if (!hello.data) {
  //   return <div>Loading...</div>;
  // }
  // return <h1 className="mb-2">{hello.data.greeting}</h1>;

  // const user: User | undefined = undefined;

  const user: User | undefined = {
    displayName: 'Ludo DeAnda',
    permissionLevel: 'user'
  };

  return (
    <div className="flex flex-row justify-start align-start overflow-hidden">
      {/* Sidebar is on the left because of flex-row justify-start */}
      <Sidebar
        currentPage="index"
        userType={user?.permissionLevel}
        displayName={user?.displayName}
      />
      {/* grow so body takes up rest of width, flex-col to separate content and footer */}
      <div className="grow h-screen flex flex-col">
        {/* only the content scrolls */}
        <div className="grow overflow-y-scroll flex flex-col justify-center items-center">
          {/* show "Join Developer Portal" content if necessary */}
          {(!user || user?.permissionLevel === 'user') && (
            <div className="w-2/3 flex flex-col justify-center items-center gap-y-10">
              <Hero
                serviceName="Developer Portal"
                slogan="BUILD FOR THE UTD COMMUNITY"
              />
              <p className="text-lg text-neutral-700">
                Leverage Nebula&apos;s services to level up your next
                application. {user ? ' Opt' : ' Sign'} in and immediately
                receive an API key you can try out, tinker with, and test on.
                Ready for release? Let us know and we&apos;ll set you up with
                keys fit for production, all delivered straight to your
                dashboard. Contributing to Nebula services? All the keys you
                need for development are just a few clicks away.
              </p>
              {!user && (
                <div className="flex flex-row flex-wrap justify-center items-center gap-3">
                  <Button
                    size="lg"
                    type="secondary"
                    action="/"
                    text="Create an account"
                  />
                  <Button
                    size="lg"
                    type="primary"
                    action="/"
                    text="Sign into Developer Portal"
                  />
                </div>
              )}
              {!!user && user?.permissionLevel === 'user' && (
                <Button
                  size="lg"
                  type="primary"
                  action="/"
                  text="Become a Developer"
                />
              )}
            </div>
          )}
          {/* TODO: show "My API Keys" content */}
        </div>
        {/* Footer is aligned at the bottom because of flex-col */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
