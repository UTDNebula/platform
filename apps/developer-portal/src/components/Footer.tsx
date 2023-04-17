/*
 * Footer Component
 *
 * Exports a function component that renders a styled and working <Footer>.
 * A <Footer> appears at the bottom of all pages in Developer Portal and
 * consists of, in order from left to right, the Nebula Labs logo, links
 * directing users to resources, and copyright information.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 17, 2023
 */

import { Logo } from 'components';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => (
  <div className="w-full p-11 flex flex-col xl:flex-row justify-between items-center gap-6 bg-white border-t border-neutral-200">
    <Logo size="sm" />
    <div className="flex flex-col xl:flex-row justify-center items-center gap-4 text-sm text-neutral-500">
      <Link href="/">Documentation</Link>
      <Link href="/">Code of Conduct</Link>
      <Link href="/">Key Disabled?</Link>
      <Link href="/">Contact Us</Link>
    </div>
    <p className="text-sm text-neutral-500">© 2023 Nebula Labs Maintainers</p>
  </div>
);

export default Footer;
