/*
 * Platform Portal Signup Page (http(s)://[hosturl]/login)
 *
 * Exports a function component that renders the signup page for Nebula
 * Platform. On this page, users supply the information necessary to create a
 * Nebula Labs account  and then click a "Create account" button that registers
 * them and then makes an /sso endpoint query. On a successful reply, users are
 * sent the returned SSO JWT and redirected to the service that brought them
 * here, or to the authenticated view of Platform Portal if no service did so.
 * Users who already have a Nebula Labs account can sign into it by following a
 * link on this page.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 7, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import Logo from '../components/Logo';
import { Button, InputField } from 'components';
import DisplayNameHint from '../components/DisplayNameHint';

const Login: NextPage = () => {
  const [displayName, setDisplayName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-brand-gradient bg-cover bg-center">
      <div className="flex flex-col justify-center items-center gap-y-8 rounded-md px-6 py-10 bg-white">
        <Logo />
        {/* Form fields */}
        <div className="flex flex-col justify-center items-center gap-y-4">
          <InputField
            content={displayName}
            onChange={setDisplayName}
            header="Display name"
            headerHint={<DisplayNameHint />}
            hint=""
          />
          <InputField
            content={email}
            onChange={setEmail}
            header="Email address"
            hint=""
          />
          <InputField
            content={password}
            onChange={setPassword}
            visibilityToggle
            header="Password"
            hint=""
          />
          <InputField
            content={confirmPassword}
            onChange={setConfirmPassword}
            visibilityToggle
            header="Confirm password"
            hint=""
          />
        </div>
        {/* Actions */}
        <div className="flex flex-col justify-center items-center w-full gap-y-4">
          <Button
            size="lg"
            type="primary"
            action={() => alert('hi')}
            spread
            text="Create Account"
          />
          <Button
            size="lg"
            type="inline-link"
            action="/login"
            text="Already have an account?"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
