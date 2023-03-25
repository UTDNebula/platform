/*
 * Hoverable Hint Component
 *
 * Exports a function component that renders a styled and working
 * <HoverableHint>. A <HoverableHint> is a question mark icon that reveals
 * a floating, non-modal dialog consisting of its child element(s) when hovered
 * over. The revealed element(s) is/are located just below the icon.
 *
 * Props:
 * hintPosition (optional) - the side of the hint icon on which the floating,
 *                           non-modal dialog should appear. can be 'top left',
 *                           'top right', 'bottom left', or 'bottom right'.
 *                           the default is 'bottom-right'.
 * children (optional*) - the contents of the floating, non-modal dialog.
 * NOTE: children must be optional for React to work correctly. However, not
 *       supplying children to this component will cause a BadPropsException.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import MaterialSymbol from 'react-material-symbols/outlined';
import BadPropsException from '../utils/BadPropsException';

type HoverableHintProps = {
  hintPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  children?: React.ReactNode;
};

const HoverableHint: React.FC<HoverableHintProps> = ({
  hintPosition,
  children
}) => {
  if (children === undefined) {
    throw new BadPropsException('HoverableHints are useless without children!');
  }

  // This state variable keeps track of mouseover/mouseout events on the icon
  // Each change in state causes a rerender
  const [visible, setVisible] = React.useState(false);

  // Establish styles that are used regardless of appearance and spread
  let hintStyles =
    'absolute w-72 p-3 bg-white border-3 border-black rounded-xl';

  // Show/hide hint dialog based on hover status
  if (visible) {
    hintStyles += ' block';
  } else {
    hintStyles += ' hidden';
  }

  // Move the dialog to the left if needed (right is default for absolute)
  if (hintPosition === 'top-left' || hintPosition === 'bottom-left') {
    hintStyles += ' right-[calc(100%-24px)]';
  }

  // Move the dialog up if needed (bottom is default for absolute) and render
  if (hintPosition === 'top-left' || hintPosition === 'top-right') {
    hintStyles += ' bottom-[calc(100%+5px)]';
    return (
      <div className="relative">
        <div className={hintStyles}>{children}</div>
        <MaterialSymbol
          icon="help"
          size={24}
          weight={500}
          onMouseOver={() => setVisible(true)}
          onMouseOut={() => setVisible(false)}
        />
      </div>
    );
  }

  // Still render if no vertical movement is necessary
  return (
    <div className="relative">
      <MaterialSymbol
        icon="help"
        size={24}
        weight={500}
        onMouseOver={() => setVisible(true)}
        onMouseOut={() => setVisible(false)}
      />
      <div className={hintStyles}>{children}</div>
    </div>
  );
};

HoverableHint.defaultProps = {
  hintPosition: 'bottom-right',
  children: undefined
};

export default HoverableHint;
