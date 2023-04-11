/*
 * Hero Component
 *
 * Exports a function component that renders a styled and working <Hero>.
 * A <Hero> is a lockup consisting of the Nebula Labs "N" icon, a service
 * name (rendered in 5xl kallisto), and a slogan rendered in blue, all-caps
 * inter. For a smaller lockup that does not contain the slogan, use the
 * <Logo> component instead.
 *
 * Props:
 * serviceName (optional) - the name of the service to lock up with the Nebula
 *                          Labs "N" icon. the default is 'Nebula Labs'.
 * slogan (optional) - the text to display above the serviceName.
 *                     should be in all caps.
 *                     the default is 'TOOLS THAT HELP STUDENTS AT UTD'.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10th, 2023
 */

import React from 'react';
import Image from 'next/image';

const fullWidth = 1348;
const fullHeight = 864;
const heroFactor = 12;

type HeroProps = {
  serviceName?: string;
  slogan?: string;
};

const Hero: React.FC<HeroProps> = ({ serviceName, slogan }) => (
  <div className="flex flex-row justify-center items-center gap-x-4">
    <Image
      src="./icon-black.svg"
      width={fullWidth / heroFactor}
      height={fullHeight / heroFactor}
      alt="Icon"
    />
    <div className="flex flex-col justify-start items-center">
      <p className="w-full text-sm text-cornflower-500 font-semibold mt-1">
        {slogan}
      </p>
      <h1 className="font-kallisto font-bold text-5xl mr-4">{serviceName}</h1>
    </div>
  </div>
);

Hero.defaultProps = {
  serviceName: 'Nebula Labs',
  slogan: 'TOOLS THAT HELP STUDENTS AT UTD'
};

export default Hero;
