/*
 * Dialog Box Component
 *
 * Exports a function component that renders a styled and working
 * <DialogBox>. A <DialogBox> is a modal dialog that, when set to be visible by
 * a parent element, appears above everything else in the viewport and appears
 * horizontally and vertically centered. <DialogBox>es have a fixed width
 * relative to the width of the viewport, which is based on whether their
 * appearance is wide or tall. They can be customized by supplying an icon
 * and header that will appear at the top in that order. Because the visibility
 * of <DialogBox>es is controlled by their parent elements, you must supply an
 * onClose function that will be called whenever a user clicks on the "X" icon
 * that can always be found in the top-right corner. The contents of any
 * <DialogBox> is/are simply its child component(s). It is recommended that you
 * use text-sm and text-neutral-500 for body text and set the size of any
 * buttons to 'md'. A gap of 2rem (32px) would be reasonable to separate body
 * text and action buttons (e.g., mb-8).
 *
 * Props:
 * onClose (required) - a function that will be called whenever the user clicks
 *                      the "X" icon that is a part of this <DialogBox>. it
 *                      should be used to remove this <DialogBox> from view and
 *                      should not accept any arguments.
 * icon (optional) - the icon that should be shown at the top of this
 *                   <DialogBox>. the default is an information icon.
 * header (optional) - the header text for this <DialogBox>.
 *                     the default is 'Alert'.
 * appearance (optional) - the visual style of this <DialogBox>.
 *                         can be either 'wide' (default) or 'slim'.
 * danger (optional) - true if this <DialogBox> is associated with a
 *                     destructive action, false or unspecified if not.
 * children (optional*) - the contents of this <DialogBox> (except for the icon,
 *                        header, and "X" icon, which are / can be included
 *                        automatically).
 * NOTE: children must be optional for React to work correctly. However, not
 *       supplying children to this component will cause a BadPropsException.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { MaterialSymbolProps } from 'react-material-symbols';
import MaterialSymbol from 'react-material-symbols/outlined';
import BadPropsException from '../utils/BadPropsException';

type DialogBoxProps = {
  onClose: Function;
  icon?: MaterialSymbolProps['icon'];
  header?: string;
  appearance?: 'wide' | 'slim';
  danger?: boolean;
  children?: React.ReactNode;
};

const DialogBox: React.FC<DialogBoxProps> = ({
  onClose,
  icon,
  header,
  appearance,
  danger,
  children
}) => {
  if (children === undefined) {
    throw new BadPropsException('DialogBoxes are useless without children!');
  }

  // Establish styles that are used regardless of appearance
  let boxStyles =
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-6 bg-white rounded-md shadow-xl shadow-shade/10';
  let iconCircleStyles = 'w-12 h-12 rounded-3xl mb-5';
  let iconStyles = 'm-3';
  let headerStyles = 'text-lg font-medium mb-2';

  // Choose border color based on appearance
  if (appearance === 'wide') {
    boxStyles += ' w-wide';
    headerStyles += ' mr-8';
  } else {
    boxStyles += ' w-96';
    headerStyles += ' text-center mx-8';
    iconCircleStyles += ' mx-auto';
  }

  if (danger) {
    iconCircleStyles += ' bg-persimmon-50';
    iconStyles += ' text-persimmon-500';
  } else {
    iconCircleStyles += ' bg-cornflower-50';
    iconStyles += ' text-cornflower-500';
  }

  return (
    <>
      {/* Screen darkener */}
      {/* <div className="fixed left-0 top-0 w-full h-full bg-black opacity-50" /> */}
      {/* Dialog box proper */}
      <div className={boxStyles}>
        <MaterialSymbol
          icon="close"
          size={20}
          weight={400}
          onClick={() => onClose()}
          className="absolute top-6 right-6"
        />
        {icon && (
          <div className={iconCircleStyles}>
            <MaterialSymbol
              icon={icon}
              size={24}
              weight={400}
              onClick={() => onClose()}
              className={iconStyles}
            />
          </div>
        )}
        <h2 className={headerStyles}>{header}</h2>
        {children}
      </div>
    </>
  );
};

DialogBox.defaultProps = {
  icon: 'info',
  header: 'Alert',
  appearance: 'wide',
  danger: false,
  children: undefined
};

export default DialogBox;
