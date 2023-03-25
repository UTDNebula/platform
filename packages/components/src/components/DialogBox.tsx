/*
 * Dialog Box Component
 *
 * Exports a function component that renders a styled and working
 * <DialogBox>. A <DialogBox> is a modal dialog that, when set to be visible by
 * a parent element, appears above everything else in the viewport, darkens
 * everything else in the viewport, and appears horizontally and vertically
 * centered. <DialogBox>es have a fixed width relative to the width of the
 * viewport. They can be customized via an onClose function that is called when
 * a user clicks on the included "X" icon located at the top-right of the
 * <DialogBox>, by specifying the header text that will appear to the left of
 * that icon, and by supplying an appearance. Finally, the contents of any
 * <DialogBox> is/are simply its child component(s).
 *
 * Props:
 * onClose (required) - a function that will be called whenever the user clicks
 *                      the "X" icon that is a part of this <DialogBox>. it
 *                      should be used to remove this <DialogBox> from view and
 *                      should not accept any arguments.
 * header (optional) - the header text for this <DialogBox>.
 *                     the default is 'Alert'.
 * appearance (optional) - the visual style of this <DialogBox>. can be either
 *                         'brand' (default) or 'danger'.
 * children (optional*) - the contents of this <DialogBox> (except for the "X"
 *                       icon, which is included automatically).
 * NOTE: children must be optional for React to work correctly. However, not
 *       supplying children to this component will cause a BadPropsException.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import MaterialSymbol from 'react-material-symbols/outlined';
import BadPropsException from '../utils/BadPropsException';

type DialogBoxProps = {
  onClose: Function;
  header?: string;
  appearance?: 'brand' | 'danger';
  children?: React.ReactNode;
};

const DialogBox: React.FC<DialogBoxProps> = ({
  onClose,
  header,
  appearance,
  children
}) => {
  if (children === undefined) {
    throw new BadPropsException('DialogBoxes are useless without children!');
  }

  // Establish styles that are used regardless of appearance
  let boxStyles =
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-4 bg-white border-3 rounded-xl';

  // Choose border color based on appearance
  if (appearance === 'brand') {
    boxStyles += ' border-brand';
  } else {
    boxStyles += ' border-danger';
  }

  return (
    <>
      {/* Screen darkener */}
      <div className="absolute left-0 top-0 w-full h-full bg-black opacity-50" />
      {/* Dialog box proper */}
      <div className={boxStyles}>
        {/* Flexbox div separates header and X */}
        <div className="flex flex-row justify-between mb-2">
          <h2 className="font-jost text-2xl font-bold mr-3">{header}</h2>
          <MaterialSymbol
            icon="close"
            size={24}
            weight={900}
            onClick={() => onClose()}
          />
        </div>
        {children}
      </div>
    </>
  );
};

DialogBox.defaultProps = {
  header: 'Alert',
  appearance: 'brand',
  children: undefined
};

export default DialogBox;
