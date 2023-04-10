/*
 * InputGroup Component
 *
 * Exports a function component that renders a styled and working <InputGroup>.
 * An <InputGroup> is a wrapper for a vertical (flex-col) collection of
 * interactive components (e.g., <Button>s, <Dropdown>s, <InputField>s) that
 * ensures even spacing. child components can be placed horizontally using the
 * "Align Self" tailwind classes (e.g., self-start). <InputGroup>s can
 * optionally have a header, which, if included, can have a <HoverableHint>.
 * <InputGroup> headers are larger than <DIFHeader>s.
 *
 * Props:
 * header (optional) - the header text for this <InputGroup>, if supplied. the
 *                     default is to not include a header.
 * headerHint (optional*) - the ReactNode (arbitrary TSX) that will serve as
 *                          the content of the <HoverableHint> for this
 *                          <InputGroup>'s header. the default is to not
 *                          include a <HoverableHint>.
 * children (optional*) - the interactive component(s) that should belong to
 *                        this <InputGroup>.
 * NOTE: children must be optional for React to work correctly. However, not
 *       supplying children to this component will cause a BadPropsException.
 *       A BadPropsException will also be thrown if no header text is supplied
 *       but a headerHint is.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 10, 2023
 */

import React from 'react';
import HoverableHint from './HoverableHint';
import BadPropsException from '../utils/BadPropsException';

type InputGroupProps = {
  header?: string;
  headerHint?: React.ReactNode;
  children?: React.ReactNode;
};

const InputGroup: React.FC<InputGroupProps> = ({
  header,
  headerHint,
  children
}) => {
  if (headerHint !== undefined && header === undefined) {
    throw new BadPropsException(
      'InputGroups must have a header to have a headerHint!'
    );
  }

  if (children === undefined) {
    throw new BadPropsException('InputGroups are useless without children!');
  }

  return (
    <div className="flex flex-col justify-center gap-y-2">
      <div className="flex flex-row items-center gap-x-1">
        <h3 className="text-md font-medium self-start">{header}</h3>
        {headerHint && (
          <HoverableHint hintPosition="top-right" grayed={false}>
            {headerHint}
          </HoverableHint>
        )}
      </div>
      {children}
    </div>
  );
};

InputGroup.defaultProps = {
  header: undefined,
  headerHint: undefined,
  children: undefined
};

export default InputGroup;
