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
import { Button, DialogBox, Dropdown, HoverableHint } from 'components';
import { NextPage } from 'next';

function doAlert() {
  alert('Hi'); // eslint-disable-line no-alert
}
const ComponentsDemo: NextPage = () => {
  const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);
  const [dangerLogBoxOpen, setDangerLogBoxOpen] = React.useState(false);
  const [dropdownSelection, setDropdownSelection] = React.useState<
    number | undefined
  >(undefined);
  return (
    <div className="m-2">
      <HoverableHint hintPosition="bottom-right">
        <p>
          Use this API Key to familiarize yourself with Nebula’s public-facing
          API endpoints and to perform testing during development. You’ll have
          access to it for as long as you are opted into Developer Portal.
        </p>
      </HoverableHint>
      <div className="float-right">
        <HoverableHint hintPosition="bottom-left">
          <p>
            Use this API Key to familiarize yourself with Nebula’s public-facing
            API endpoints and to perform testing during development. You’ll have
            access to it for as long as you are opted into Developer Portal.
          </p>
        </HoverableHint>
      </div>
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
      <HoverableHint hintPosition="top-right">
        <p>
          Use this API Key to familiarize yourself with Nebula’s public-facing
          API endpoints and to perform testing during development. You’ll have
          access to it for as long as you are opted into Developer Portal.
        </p>
      </HoverableHint>
      <div className="float-right">
        <HoverableHint hintPosition="top-left">
          <p>
            Use this API Key to familiarize yourself with Nebula’s public-facing
            API endpoints and to perform testing during development. You’ll have
            access to it for as long as you are opted into Developer Portal.
          </p>
        </HoverableHint>
      </div>
      <Button
        appearance="primary"
        action={() => setDialogBoxOpen(true)}
        text="Show Dialog Box"
        icon="preview"
        iconSide="right"
      />
      {dialogBoxOpen && (
        <DialogBox
          onClose={() => setDialogBoxOpen(false)}
          header="Welcome to My Dialog"
        >
          <p className="font-roboto text-xl">
            Here, you can immediately and permanently delete your entire Nebula
            Labs account, including all account data. Note that this action will
            sign you out of all Nebula Labs services and cannot be undone. To
            confirm, and to verify that it’s you, please re-enter your password.
          </p>
        </DialogBox>
      )}
      <Button
        appearance="danger"
        action={() => setDangerLogBoxOpen(true)}
        text="Show Dangerlog Box"
        icon="preview"
        iconSide="right"
      />
      {dangerLogBoxOpen && (
        <DialogBox
          onClose={() => setDangerLogBoxOpen(false)}
          appearance="danger"
        >
          <p className="font-roboto text-xl">
            Here, you can immediately and permanently delete your entire Nebula
            Labs account, including all account data. Note that this action will
            sign you out of all Nebula Labs services and cannot be undone. To
            confirm, and to verify that it’s you, please re-enter your password.
          </p>
        </DialogBox>
      )}
      <div className="mt-3" />
      <Dropdown
        onChange={(newSelection: number) => setDropdownSelection(newSelection)}
        options={[
          'First option',
          'Second option',
          'Third option',
          'Fourth option'
        ]}
        hint="Select one, or don't, I'm not your dad..."
        selected={dropdownSelection}
        header="Display name"
        headerHint={<p>
          Use this API Key to familiarize yourself with Nebula’s public-facing
          API endpoints and to perform testing during development. You’ll have
          access to it for as long as you are opted into Developer Portal.
        </p>}
      />
      <Button appearance="primary" text="Hello" />
    </div>
  );
};

export default ComponentsDemo;
