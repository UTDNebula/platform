/*
 * Platform Portal Homepage (http(s)://[hosturl]/)
 *
 * Exports a function component that renders either the landing page or the
 * manage account page, depending on whether the user is signed in. If the user
 * is not signed in, a page with hero text, a high-level description of
 * platform, and call-to-action buttons for signing up and signing in is
 * rendered. If the user is signed in, a page with hero text; a link to
 * Developer Portal; forms allowing users to change their display name, email
 * address, and password; buttons tied to modal dialogs allowing users to
 * delete account data; and a global sign out button is rendered.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { NextPage } from 'next';
import {
  Button,
  DialogBox,
  Dropdown,
  Hero,
  InputField,
  InputGroup
} from 'components';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import DisplayNameHint from '../components/DisplayNameHint';

// Mock data; will be handled automatically once SSO is implemented
const authenticated = true;
const displayName = 'Ludo DeAnda';
const services = ['Nebula Planner', 'Nebula Trends', 'UTD Survival Guide'];

const Home: NextPage = () => {
  // *** HOOKS (only used if authenticated) ***
  // Values for always-visible <InputField>s
  const [newDisplayName, setNewDisplayName] = React.useState('');
  const [newEmailAddress, setNewEmailAddress] = React.useState('');
  const [confirmNewEmailAddress, setConfirmNewEmailAddress] =
    React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  // Modal dialog toggles
  const [showSpecificServiceDialog, setShowSpecificServiceDialog] =
    React.useState(false);
  const [showAllServicesDialog, setShowAllServicesDialog] =
    React.useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] =
    React.useState(false);
  const inDialog =
    showSpecificServiceDialog ||
    showAllServicesDialog ||
    showDeleteAccountDialog;

  // Values for modal dialog contents
  const [serviceSelection, setServiceSelection] = React.useState<
    undefined | number
  >(undefined);
  const [reenterPassword, setReenterPassword] = React.useState('');

  if (authenticated) {
    /*
     * The purposes of the four container <div>s, in order:
     * 1. Set the (centered) gradient background to cover the entire viewport.
     *    Also center the page content.
     * 2. Set the white background for the page content and x-margin.
     *    Also set rounded corners for contents (including inner scroll bars!).
     * 3. Set maximum dimensions for and padding around the page content.
     *    Also ensure that a vertical scroll bar appears when necessary.
     * 4. Establish a flex-col model for the immediate contents of this <div>.
     */
    return (
      <div
        className={`w-screen h-screen flex justify-center items-center fixed bg-brand-gradient bg-cover bg-center${
          inDialog ? ' pointer-events-none' : ''
        }`}
      >
        <div className="mx-12 rounded-md bg-white overflow-hidden">
          <div className="p-16 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="flex flex-col justify-center items-center gap-y-10">
              <Hero
                serviceName="Nebula Platform"
                slogan="ONE ACCOUNT, ALL OF NEBULA LABS"
              />
              {/* Welcome and Developer Portal link */}
              <div className="flex flex-col justify-center items-center gap-y-3">
                <h2 className="text-2xl font-medium">Welcome, {displayName}</h2>
                <div className="flex flex-col justify-center items-center">
                  <p>You can manage your Nebula Labs account here.</p>
                  <Button
                    size="lg"
                    type="inline-link"
                    action="/"
                    text="Looking for Developer Portal?"
                  />
                </div>
              </div>
              {/* Change account properties (display
                  name, email address, password) */}
              <div className="flex flex-col justify-center items-center gap-y-6">
                <InputGroup
                  header="Change Display Name"
                  headerHint={<DisplayNameHint />}
                >
                  <InputField
                    content={newDisplayName}
                    onChange={setNewDisplayName}
                    hint="New name..."
                  />
                  <div className="self-end">
                    <Button size="md" type="primary" action="/" text="Submit" />
                  </div>
                </InputGroup>
                <InputGroup header="Change Email Address">
                  <InputField
                    content={newEmailAddress}
                    onChange={setNewEmailAddress}
                    hint="New email address..."
                  />
                  <InputField
                    content={confirmNewEmailAddress}
                    onChange={setConfirmNewEmailAddress}
                    hint="Confirm new email address..."
                  />
                  <div className="self-end">
                    <Button size="md" type="primary" action="/" text="Submit" />
                  </div>
                </InputGroup>
                <InputGroup header="Change Password">
                  <InputField
                    content={newPassword}
                    onChange={setNewPassword}
                    visibilityToggle
                    hint="New password..."
                  />
                  <InputField
                    content={confirmNewPassword}
                    onChange={setConfirmNewPassword}
                    visibilityToggle
                    hint="Confirm new password..."
                  />
                  <div className="self-end">
                    <Button size="md" type="primary" action="/" text="Submit" />
                  </div>
                </InputGroup>
              </div>
              {/* Delete account (data) buttons */}
              <InputGroup header="Danger Zone">
                <div className="self-start">
                  <Button
                    size="md"
                    type="primary"
                    action={() => setShowSpecificServiceDialog(true)}
                    danger
                    text="Delete account data for a specific Nebula service..."
                  />
                </div>
                <div className="self-start">
                  <Button
                    size="md"
                    type="primary"
                    action={() => setShowAllServicesDialog(true)}
                    danger
                    text="Delete account data for all Nebula services..."
                  />
                </div>
                <div className="self-start">
                  <Button
                    size="md"
                    type="primary"
                    action={() => setShowDeleteAccountDialog(true)}
                    danger
                    text="Delete entire Nebula Labs account..."
                  />
                </div>
              </InputGroup>
              {/* Global sign out button */}
              <div className="my-4">
                <Button
                  size="md"
                  type="tertiary"
                  action="/"
                  text="Sign out of all Nebula services"
                  Icon={ArrowRightOnRectangleIcon}
                  iconSide="right"
                />
              </div>
            </div>
          </div>
        </div>
        {/* The <DialogBox>es are included at this
            <div> level so they center properly. */}
        {/* "Delete account data for a specific Nebula service..." */}
        {showSpecificServiceDialog && (
          <DialogBox
            Icon={ExclamationTriangleIcon}
            onClose={() => setShowSpecificServiceDialog(false)}
            header="Delete Service-Specific Data"
            danger
          >
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-3">
                <p className="text-sm text-neutral-500">
                  Here, you can immediately and permanently remove any and all
                  data that you have supplied to the Nebula Labs service you
                  choose, including most settings changes, from Nebula’s
                  servers. Note that this action cannot be undone.
                </p>
                <Dropdown
                  options={services}
                  onChange={setServiceSelection}
                  hint="Choose a service..."
                  selected={serviceSelection}
                  spread
                />
                <p className="text-sm text-neutral-500 mt-1">
                  To confirm, and to verify that it’s you, please re-enter your
                  password.
                </p>
                <InputField
                  content={reenterPassword}
                  onChange={setReenterPassword}
                  visibilityToggle
                  hint="Password"
                  spread
                />
              </div>
              <div className="self-end">
                <Button
                  size="md"
                  type="primary"
                  action="/"
                  text="Delete Data"
                  danger
                />
              </div>
            </div>
          </DialogBox>
        )}
        {/* "Delete account data for all Nebula services..." */}
        {showAllServicesDialog && (
          <DialogBox
            Icon={ExclamationTriangleIcon}
            onClose={() => setShowAllServicesDialog(false)}
            header="Delete All Account Data"
            danger
          >
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-3">
                <p className="text-sm text-neutral-500">
                  Here, you can immediately and permanently remove any and all
                  data that you have supplied to Nebula Labs services, including
                  most settings changes, from Nebula’s servers. Note that this
                  action cannot be undone. To confirm, and to verify that it’s
                  you, please re-enter your password.
                </p>
                <InputField
                  content={reenterPassword}
                  onChange={setReenterPassword}
                  visibilityToggle
                  hint="Password"
                  spread
                />
              </div>
              <div className="self-end">
                <Button
                  size="md"
                  type="primary"
                  action="/"
                  text="Delete Data"
                  danger
                />
              </div>
            </div>
          </DialogBox>
        )}
        {/* "Delete entire Nebula Labs account..." */}
        {showDeleteAccountDialog && (
          <DialogBox
            Icon={ExclamationTriangleIcon}
            onClose={() => setShowDeleteAccountDialog(false)}
            header="Delete Nebula Labs Account"
            danger
          >
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-3">
                <p className="text-sm text-neutral-500">
                  Here, you can immediately and permanently delete your entire
                  Nebula Labs account, including all account data. Note that
                  this action will sign you out of all Nebula Labs services and
                  cannot be undone. To confirm, and to verify that it’s you,
                  please re-enter your password.
                </p>
                <InputField
                  content={reenterPassword}
                  onChange={setReenterPassword}
                  visibilityToggle
                  hint="Password"
                  spread
                />
              </div>
              <div className="self-end">
                <Button
                  size="md"
                  type="primary"
                  action="/"
                  text="Delete Account"
                  danger
                />
              </div>
            </div>
          </DialogBox>
        )}
      </div>
    );
  }
  // (else) Unauthenticated - Landing Page
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-brand-gradient bg-cover bg-center">
      <div className="w-2/3 flex flex-col justify-center items-center gap-y-10 rounded-md p-16 bg-white">
        <Hero
          serviceName="Nebula Platform"
          slogan="ONE ACCOUNT, ALL OF NEBULA LABS"
        />
        <p className="text-lg text-neutral-700">
          Sign in and unlock the best experience on all Nebula services. Your
          account helps Nebula services work for you by powering personalized
          recommendations and securely storing everything you create. With
          Platform, you can keep your account just how you want it by adjusting
          your settings and managing your data.
        </p>
        <div className="flex flex-row flex-wrap justify-center items-center gap-3">
          <Button
            size="lg"
            type="secondary"
            action="/signup"
            text="Create an account"
          />
          <Button
            size="lg"
            type="primary"
            action="/login"
            text="Sign into Nebula Platform"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
