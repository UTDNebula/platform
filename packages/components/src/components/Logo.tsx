/*
 * Logo Component
 *
 * Exports a function component that renders a styled and working <Logo>.
 * A <Logo> is a lockup consisting of the Nebula Labs "N" icon and a service
 * name (rendered in 2xl or lg kallisto). For a bigger lockup that also
 * contains a slogan, use the <Hero> component instead.
 *
 * Props:
 * serviceName (optional) - the name of the service to lock up with the Nebula
 *                          Labs "N" icon. the default is 'Nebula Labs'.
 * size (optional) - the size of this <Logo>. can be 'lg' (default) or 'sm'.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10th, 2023
 */

import React from 'react';
import Image from 'next/image';

const fullWidth = 1348;
const fullHeight = 864;
const lgFactor = 18;
const smFactor = 24;

type LogoProps = {
  serviceName?: string;
  size?: 'sm' | 'lg';
};

const Logo: React.FC<LogoProps> = ({ serviceName, size }) => (
  <div className="flex flex-row justify-center items-center gap-x-4">
    <Image
      src="./icon-black.svg"
      width={fullWidth / (size === 'sm' ? smFactor : lgFactor)}
      height={fullHeight / (size === 'sm' ? smFactor : lgFactor)}
      alt="Icon"
    />
    <h1
      className={`font-kallisto font-medium ${
        size === 'sm' ? 'text-lg' : 'text-2xl'
      }`}
    >
      {serviceName}
    </h1>
  </div>
);

Logo.defaultProps = {
  serviceName: 'Nebula Labs',
  size: 'lg'
};

export default Logo;
