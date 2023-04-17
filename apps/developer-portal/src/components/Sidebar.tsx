/*
 * Sidebar Component
 *
 * Exports a function component that renders a styled and working <Sidebar>.
 * A <Sidebar> appears on the left-hand side of all (authenticated) pages in
 * Developer Portal and consists of, in order from top to bottom, the
 * Developer Portal logo, a user greeting, anywhere from one to three
 * (depending on the user's credentials) clickable tabs corresponding to
 * Developer Portal pages, a link to Nebula Platform, and a global sign out
 * button. The tab corresponding to the page on which the <Sidebar> is located
 * receives unique styling to set it apart from other tabs.
 *
 * Props:
 * displayName (required) - the display name of the user
 *                          who will see this <Sidebar>.
 * userType (required) - the type of the user who will see this <Sidebar>.
 *                       can be 'developer', 'projectLeader', or 'admin'.
 * currentPage (required) - a string corresponding to the page on which this
 *                          <Sidebar> is located. can be 'myKeys',
 *                          'manageKeys', or 'elevateAccounts'.
 * NOTE: the currentPage must be accessible by the userType. if this is
 *       not the case, this component will throw a BadPropsException.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10, 2023
 */

import React from 'react';
import { Button, Logo } from 'components';
import {
  ArrowLeftOnRectangleIcon,
  KeyIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import BadPropsException from '../utils/BadPropsException';

type SidebarProps = {
  displayName: string;
  userType: 'developer' | 'projectLeader' | 'admin';
  currentPage: 'myKeys' | 'manageKeys' | 'elevateAccounts';
};

const Sidebar: React.FC<SidebarProps> = ({
  displayName,
  userType,
  currentPage
}) => {
  if (
    (userType === 'developer' && currentPage !== 'myKeys') ||
    (userType === 'projectLeader' && currentPage === 'elevateAccounts')
  ) {
    throw new BadPropsException(
      `Users of type ${userType} cannot access page ${currentPage}`
    );
  }

  // static is used to ensure scrolling is ignored;
  // flex-col helps snap the platform and sign out buttons to the bottom
  return (
    <div className="h-screen w-72 flex flex-col justify-between items-center bg-white border-r border-neutral-200">
      {/* Top section - logo, greeting, page tabs */}
      <div className="w-full">
        <div className="my-6 mr-3">
          <Logo serviceName="Developer Portal" size="sm" />
        </div>
        {/* Divider line */}
        <div className="h-[1px] w-full bg-neutral-200" />
        <h3 className="text-lg text-neutral-500 text-center mt-5 mb-4">
          Hello, {displayName}
        </h3>
        {/* Only show relevant page tabs;
            current page tab is shown differently */}
        <div className="flex flex-col justify-center align-center mx-4 gap-y-3">
          <Button
            size="md"
            type={currentPage === 'myKeys' ? 'secondary' : 'tertiary'}
            action="/"
            spread="y-left"
            text="My API Keys"
            Icon={KeyIcon}
          />
          {userType !== 'developer' && (
            <Button
              size="md"
              type={currentPage === 'manageKeys' ? 'secondary' : 'tertiary'}
              action="/"
              spread="y-left"
              text="Manage API Keys"
              Icon={UserGroupIcon}
            />
          )}
          {userType === 'admin' && (
            <Button
              size="md"
              type={
                currentPage === 'elevateAccounts' ? 'secondary' : 'tertiary'
              }
              action="/"
              spread="y-left"
              text="Elevate Accounts"
              Icon={ShieldCheckIcon}
            />
          )}
        </div>
      </div>
      {/* Bottom section - link to Nebula Platform, global sign out */}
      <div className="w-full">
        {/* Divider line */}
        <div className="h-[1px] w-full bg-neutral-200" />
        <div className="flex flex-col justify-center align-center mx-4 my-4 gap-y-3">
          <Button
            size="md"
            type="tertiary"
            action="/"
            external
            spread="y-left"
            text="Nebula Platform"
            Icon={UserCircleIcon}
          />
          <Button
            size="md"
            type="tertiary"
            action="/"
            spread="y-left"
            text="Sign Out"
            Icon={ArrowLeftOnRectangleIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
