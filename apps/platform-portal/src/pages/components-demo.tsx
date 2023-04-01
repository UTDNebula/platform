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
  const buttonSizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  const buttonTypes: Array<
    'primary' | 'secondary' | 'tertiary' | 'outlined' | 'inline-link'
  > = ['primary', 'secondary', 'tertiary', 'outlined', 'inline-link'];
  return (
    <div className="m-2">
      <p>I'm Inter</p>
      <p className="font-kallisto">I'm Kallisto</p>
      <HoverableHint hintPosition="bottom-right">
        <p>
          Use this API Key to familiarize yourself with Nebula’s public-facing
          API endpoints and to perform testing during development. You’ll have
          access to it for as long as you are opted into Developer Portal.
        </p>
      </HoverableHint>
      <div className="ml-96">
        <HoverableHint hintPosition="bottom-left">
          <p>
            Use this API Key to familiarize yourself with Nebula’s public-facing
            API endpoints and to perform testing during development. You’ll have
            access to it for as long as you are opted into Developer Portal.
          </p>
        </HoverableHint>
      </div>
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
        headerHint={
          <p>
            Use this API Key to familiarize yourself with Nebula’s public-facing
            API endpoints and to perform testing during development. You’ll have
            access to it for as long as you are opted into Developer Portal.
          </p>
        }
        helperText="Don't like this?"
        helperTextLink="/"
      />
      {[false, true].map((disabled, disabledIndex) => (
        <div key={disabledIndex}>
          {[false, true].map((danger, dangerIndex) => (
            <div key={disabledIndex * 2 + dangerIndex}>
              {buttonSizes.map((size) => (
                <div
                  key={disabledIndex * 2 + dangerIndex + size}
                  className="flex space-x-2 m-2"
                >
                  {buttonTypes.map((type) => {
                    return (
                      <Button
                        key={disabledIndex * 2 + dangerIndex + size + type}
                        size={size}
                        type={type}
                        action="/"
                        danger={danger}
                        text="Go Home"
                        icon="home"
                        disabled={disabled}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <Button
        size="lg"
        type="primary"
        action="/"
        text="Go Home"
        icon="home"
        iconSide="right"
        spread
      />
      <div className="flex align-center space-x-2 my-2">
        <Button
          size="lg"
          type="primary"
          danger
          text="Alert!"
          icon="warning"
          iconSide="left"
          action={doAlert}
        />
        <Button
          size="lg"
          type="primary"
          danger
          icon="warning"
          iconSide="left"
          action={doAlert}
          disabled
        />
      </div>
      <HoverableHint hintPosition="top-right">
        <p>
          Use this API Key to familiarize yourself with Nebula’s public-facing
          API endpoints and to perform testing during development. You’ll have
          access to it for as long as you are opted into Developer Portal.
        </p>
      </HoverableHint>
      <div className="ml-96">
        <HoverableHint hintPosition="top-left">
          <p>
            Use this API Key to familiarize yourself with Nebula’s public-facing
            API endpoints and to perform testing during development. You’ll have
            access to it for as long as you are opted into Developer Portal.
          </p>
        </HoverableHint>
      </div>
      <Button
        size="lg"
        type="primary"
        action={() => setDialogBoxOpen(true)}
        text="Show Dialog Box"
        icon="preview"
        iconSide="right"
      />
      {dialogBoxOpen && (
        <DialogBox onClose={() => setDialogBoxOpen(false)} appearance="wide">
          <div className="flex flex-col gap-y-8">
            <p className="text-sm text-neutral-500">
              Here, you can immediately and permanently delete your entire
              Nebula Labs account, including all account data. Note that this
              action will sign you out of all Nebula Labs services and cannot be
              undone. To confirm, and to verify that it’s you, please re-enter
              your password.
            </p>
            <div className="flex flex-row justify-end gap-x-3">
              <Button size="md" type="tertiary" action="/" text="Action" />
              <Button size="md" type="primary" action="/" text="Action" />
            </div>
          </div>
        </DialogBox>
      )}
      <Button
        size="lg"
        type="primary"
        danger
        action={() => setDangerLogBoxOpen(true)}
        text="Show Dangerlog Box"
        icon="preview"
        iconSide="right"
      />
      {dangerLogBoxOpen && (
        <DialogBox
          onClose={() => setDangerLogBoxOpen(false)}
          icon="warning"
          header="Welcome to My Dialog"
          appearance="slim"
          danger
        >
          <div className="flex flex-col gap-y-8">
            <p className="text-sm text-neutral-500">
              Here, you can immediately and permanently delete your entire
              Nebula Labs account, including all account data. Note that this
              action will sign you out of all Nebula Labs services and cannot be
              undone. To confirm, and to verify that it’s you, please re-enter
              your password.
            </p>
            <div className="flex flex-col gap-y-3">
              <Button
                size="md"
                type="tertiary"
                action="/"
                spread
                text="Action"
              />
              <Button
                size="md"
                type="primary"
                action="/"
                spread
                text="Action"
                danger
              />
            </div>
          </div>
        </DialogBox>
      )}
    </div>
  );
};

export default ComponentsDemo;
