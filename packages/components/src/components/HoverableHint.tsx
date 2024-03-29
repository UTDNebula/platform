/*
 * Hoverable Hint Component
 *
 * Exports a function component that renders a styled and working
 * <HoverableHint>. A <HoverableHint> is a question mark icon that reveals
 * a modified tooltip (non-modal dialog) consisting of its child element(s)
 * when hovered over.
 *
 * Props:
 * hintPosition (optional) - the side of the hint icon on which the floating,
 *                           non-modal dialog should appear. can be 'top left',
 *                           'top right', 'bottom left', or 'bottom right'.
 *                           the default is 'bottom-right'.
 * grayed (optional) - true if this <HoverableHint> should appear grayed out
 *                     (it will still function), false or unspecified if not.
 * children (optional*) - the contents of the floating, non-modal dialog.
 * NOTE: children must be optional for React to work correctly. However, not
 *       supplying children to this component will cause a BadPropsException.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import BadPropsException from '../utils/BadPropsException';

type HoverableHintProps = {
  hintPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  grayed?: boolean;
  children?: React.ReactNode;
};

const HoverableHint: React.FC<HoverableHintProps> = ({
  hintPosition,
  grayed,
  children
}) => {
  if (children === undefined) {
    throw new BadPropsException('HoverableHints are useless without children!');
  }

  // This state variable keeps track of mouseover/mouseout events on the icon
  // Each change in state causes a rerender
  const [visible, setVisible] = React.useState(false);

  // Establish styles that are used regardless of prop values
  let hintStyles =
    'absolute z-10 w-80 p-4 text-sm text-neutral-700 bg-white rounded-lg shadow-lg shadow-shade/10';

  // Show/hide hint dialog based on hover status
  if (visible) {
    hintStyles += ' block';
  } else {
    hintStyles += ' hidden';
  }

  // Move the dialog to the left if needed (right is default for absolute)
  if (hintPosition === 'top-left' || hintPosition === 'bottom-left') {
    hintStyles += ' right-[calc(100%-20px)]';
  }

  // Move the dialog up if needed (bottom is default for absolute) and render
  if (hintPosition === 'top-left' || hintPosition === 'top-right') {
    hintStyles += ' bottom-[calc(100%+5px)]';
    return (
      <div className="relative">
        <div className={hintStyles}>{children}</div>
        <QuestionMarkCircleIcon
          onMouseOver={() => setVisible(true)}
          onMouseOut={() => setVisible(false)}
          className={grayed ? 'w-5 h-5 text-neutral-400' : 'w-5 h-5 text-haiti'}
        />
      </div>
    );
  }

  // Still render if no vertical movement is necessary
  return (
    <div className="relative font-inter">
      <QuestionMarkCircleIcon
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
        className={grayed ? 'w-5 h-5 text-neutral-400' : 'w-5 h-5 text-haiti'}
      />
      <div className={hintStyles}>{children}</div>
    </div>
  );
};

HoverableHint.defaultProps = {
  hintPosition: 'bottom-right',
  grayed: false,
  children: undefined
};

export default HoverableHint;
