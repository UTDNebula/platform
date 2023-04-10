/*
 * Hero Component
 *
 * Exports a function component that renders a styled and working <Hero>.
 * A <Hero> is a lockup consisting of the Nebula Labs "N" icon, the service
 * name "Nebula Platform" (rendered in 5xl kallisto), and the slogan "One
 * account, all of Nebula Labs" rendered in blue, all-caps inter. For a smaller
 * lockup that does not contain the slogan, use the <Logo> component instead.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10th, 2023
 */

import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => (
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
      <h1 className="font-kallisto font-bold text-5xl mr-4">Nebula Platform</h1>
    </div>
  </div>
);

export default Hero;
