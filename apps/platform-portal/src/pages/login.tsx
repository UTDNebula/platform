/*
 * Platform Portal Login Page (http(s)://[hosturl]/login)
 *
 * Exports a function component that renders the login page for Nebula
 * Platform. Services that make use of Nebula SSO have middleware.js files that
 * redirect here whenever an /auth endpoint query fails. On this page, users
 * supply the credentials (email and password) for their Nebula Labs accounts
 * and then click a "Sign in" button that makes an /sso endpoint query. On a
 * successful reply, users are sent the returned SSO JWT and redirected to the
 * service that brought them here, or to the authenticated view of Platform
 * Portal if no service did so. Users without a Nebula Labs account can create
 * one by following a link on this page. In the future, "Forgot password?"
 * functionality will also be implemented.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { Button, InputField } from 'components';

const Login: NextPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-brand-gradient bg-cover bg-center">
      <div className="flex flex-col justify-center items-center gap-y-8 rounded-md px-6 py-10 bg-white">
        {/* Logo and name lockup */}
        <div className="flex flex-row justify-center items-center gap-x-4">
          <Image
            src="./icon-black.svg"
            width={1348 / 18}
            height={864 / 18}
            alt="Icon"
          />
          <h1 className="font-kallisto font-medium text-2xl">Nebula Labs</h1>
        </div>
        {/* Form fields */}
        <div className="flex flex-col justify-center items-center gap-y-4">
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
            helperText="Forgot password?"
          />
        </div>
        {/* Actions */}
        <div className="flex flex-col justify-center items-center w-full gap-y-4">
          <Button
            size="lg"
            type="primary"
            action={() => alert('hi')}
            spread
            text="Sign in"
          />
          <Button
            size="lg"
            type="inline-link"
            action={() => alert('hi')}
            text="I don't have an account"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
