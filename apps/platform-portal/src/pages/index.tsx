/*
 * Platform Portal Homepage (http(s)://[hosturl]/)
 *
 * Exports a function component that renders either the landing page or the
 * manage account page, depending on whether the user is signed in. If the user
 * is not signed in, a page with hero text, a high-level description of
 * platform, and call-to-action buttons for signing up and signing in is
 * rendered. If the user is signed in, ...
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { Button } from 'components';

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-brand-gradient bg-cover bg-center">
      <div className="w-2/3 flex flex-col justify-center items-center gap-y-10 rounded-md p-10 bg-white">
        {/* Logo, name, slogan lockup */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center gap-x-4">
            <Image
              src="./icon-black.svg"
              width={1348 / 12}
              height={864 / 12}
              alt="Icon"
            />
            <div className="flex flex-col justify-start items-center">
              <p className="w-full text-sm text-cornflower-500 font-semibold mt-1">
                <span className="inline-block">ONE ACCOUNT,&nbsp;</span>
                <span className="inline-block">ALL OF NEBULA LABS</span>
              </p>
              <h1 className="font-kallisto font-bold text-5xl mr-4">
                Nebula Platform
              </h1>
            </div>
          </div>
        </div>
        <p className="text-lg text-neutral-700">
          Sign in and unlock the best experience on all Nebula services. Your
          account helps Nebula services work for you by powering personalized
          recommendations and securely storing everything you create. With
          Platform, you can keep your account just how you want it by adjusting
          your settings and managing your data.
        </p>
        {/* Actions */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-3">
          <Button
            size="lg"
            type="secondary"
            action="/signup"
            text="Create an account"
          />
          <Button
            size="lg"
            type="primary"
            action="/login"
            text="Sign into Nebula Platform"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
