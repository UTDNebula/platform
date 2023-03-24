/*
 * Components Demo Page (http(s)://[hosturl]/components-demo)
 *
 * This Page, written for development purposes only, is for testing and
 * demoing the various configurations of the components in the shared library.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import Link from 'next/link';
import { Button } from 'components/src';
import { NextPage } from 'next';

function doAlert() {
  alert('Hi'); // eslint-disable-line no-alert
}
const ComponentsDemo: NextPage = () => (
  <div className="m-2">
    <div className="flex align-center space-x-2">
      <Link href="/">
        <Button appearance="primary" text="Go Home" />
      </Link>
      <Link href="/">
        <Button appearance="secondary" icon="home" />
      </Link>
    </div>
    <Link href="/">
      <Button appearance="danger" spread icon="home" iconSide="right" />
    </Link>
    <div className="flex align-center space-x-2">
      <Button
        appearance="primary"
        action={doAlert}
        text="Alert!"
        icon="warning"
        iconSide="left"
      />
      <Button
        appearance="secondary"
        action={doAlert}
        text="Alert!"
        icon="refresh"
        iconSide="right"
      />
    </div>
    <Button
      appearance="primary"
      action={doAlert}
      spread
      text="Alert!"
      icon="warning"
    />
  </div>
);

export default ComponentsDemo;
