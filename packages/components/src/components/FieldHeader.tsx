/*
 * Field Header Helper Component
 *
 * Exports a function component that renders the header part of a field
 * component. Field components leverage this one internally, so there is no
 * need to add a <FieldHeader> yourself.
 *
 * Props:
 * styles (required) - the value of the headerStyles property of the computed
 *                     style object for the field component that this
 *                     <FieldHeader> is for. for more information, see
 *                     utils/FieldStyles.ts.
 * text (optional) - the text that this <FieldHeader> should display.
 * hint (optional) - the ReactNode (arbitrary TSX) that will serve as the
 *                   content of the <HoverableHint> for this <FieldHeader>.
 *                   the default is not to include a <HoverableHint>.
 * disabled (optional) - true if the field component that this <FieldHeader>
 *                       is for is disabled, false or unspecified if not.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 7, 2023
 */

import React from 'react';
import HoverableHint from './HoverableHint';

type FieldHeaderProps = {
  styles: string;
  text?: string;
  hint?: React.ReactNode;
  disabled?: boolean;
};

const FieldHeader: React.FC<FieldHeaderProps> = ({
  text,
  styles,
  hint,
  disabled
}) => {
  if (text !== undefined) {
    return (
      <div className="flex flex-row gap-x-1">
        <p className={styles}>{text}</p>
        {/* Include a hoverable hint next to the header if one is supplied */}
        {hint !== undefined && (
          <HoverableHint hintPosition="top-right" grayed={disabled}>
            {hint}
          </HoverableHint>
        )}
      </div>
    );
  }
  return null;
};

FieldHeader.defaultProps = {
  text: undefined,
  hint: undefined,
  disabled: false
};

export default FieldHeader;
