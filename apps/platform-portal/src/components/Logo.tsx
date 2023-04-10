/*
 * Logo Component
 *
 * Exports a function component that renders a styled and working <Logo>.
 * A <Logo> is a lockup consisting of the Nebula Labs "N" icon and the service
 * name "Nebula Platform" (rendered in 2xl kallisto). For a bigger lockup that
 * also contains the slogan "One account, all of Nebula Labs," use the <Hero>
 * component instead.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10th, 2023
 */

import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => (
  <div className="flex flex-row justify-center items-center gap-x-4">
    <Image
      src="./icon-black.svg"
      width={1348 / 18}
      height={864 / 18}
      alt="Icon"
    />
    <h1 className="font-kallisto font-medium text-2xl">Nebula Labs</h1>
  </div>
);

export default Logo;
