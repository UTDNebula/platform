/*
 * Basic Key View Component
 *
 * Exports a function component that renders a styled and working
 * <BasicKeyView>. A <BasicKeyView> consists of a header reading "Basic Key";
 * a <HoverableHint> that explains what a basic key is; a text field
 * containing the key itself, a visibility toggle, and a clickable copy icon;
 * a regenerate button; and text displaying metadata about the key.
 * Clicking on the button will cause the function passed to onRegenerateRequest
 * to be called; the event should be used to open a <DialogBox> offering
 * further explanation to and requesting confirmation from the user.
 *
 * Props:
 * key (required) - the actual Basic API Key that this
 *                  <BasicKeyView> should reveal to users.
 * onRegenerateRequest (required) - the function that this <BasicKeyView> will
 *                                  call when the user clicks the "Regenerate"
 *                                  button. see above for more information.
 * quota (required) - the total number of requests that the Basic API Key
 *                    revealed by this <BasicKeyView> is alloted during each
 *                    time interval.
 * quotaRemaining (required) - the number of requests that the Basic API Key
 *                    revealed by this <BasicKeyView> has left for the current
 *                    time interval.
 * refillTime (required) - the UNIX timestamp at which the quota of the Basic
 *                         API Key revealed by this <BasicKeyView> will be
 *                         refilled.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 17, 2023
 */

import { HoverableHint } from 'components';
import React from 'react';

type BasicKeyViewProps = {
  key: string;
  onRegenerateRequest: Function;
  quota: number;
  quotaRemaining: number;
  refillTime: number;
};

const BasicKeyView: React.FC<BasicKeyViewProps> = ({
  key,
  onRegenerateRequest,
  quota,
  quotaRemaining,
  refillTime
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-x-1">
        <p className="text-lg font-bold">Basic Key</p>
        <HoverableHint>
          Use this API Key to familiarize yourself with Nebula&apos;s
          public-facing API endpoints and to perform testing during development.
          You&apos;ll have access to it for as long as you are opted into
          Developer Portal.
        </HoverableHint>
      </div>
    </div>
  );
};

export default BasicKeyView;
