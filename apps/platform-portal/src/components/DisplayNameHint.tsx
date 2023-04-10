/*
 * Display Name Hint Component
 *
 * Exports a function component that renders a styled and working
 * <DisplayNameHint>, which is simply the standard value for the headerHint
 * prop of <InputField>s concerning display names.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10th, 2023
 */

import React from 'react';

const DisplayNameHint: React.FC = () => (
  <p className="text-sm">
    Your display name is what Nebula Labs services will use to refer to you. It
    is not a username and cannot be used to sign in.
  </p>
);

export default DisplayNameHint;
