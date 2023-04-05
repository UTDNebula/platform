/*
 * InputField Component
 *
 * Exports a function component that renders a styled and working <InputField>.
 * An <InputField> is a text box that accepts user input. While there is no
 * data inside, <InputField>s display customizable hint text. <InputField>s can
 * optionally have header text. If this is included, it can optionally be
 * accompanied by a <HoverableHint> to its immediate right. <InputField>s can
 * also optionally have helper text; if supplied, it appears at the bottom and
 * can optionally be made into a link. Finally, <InputField>s can be put into
 * an error or disabled state (but not both; disabled takes priority) by
 * setting the corresponding props to true.
 *
 * Props:
 * content (required) - the data entered into this <InputField>. must be ''
 *                      (not undefined) if there is no data.
 * onChange (required) - a function that this <InputField> will call whenever
 *                       the user changes the data inside it. it should accept
 *                       one argument, to which this <InputField> will supply
 *                       the updated data in full.
 * visibilityToggle (optional) - true if this <InputField> should include a
 *                               clickable eye icon that toggles whether the
 *                               content (data) is hidden with asterisks, false
 *                               or unspecified if not.
 * hint (optional) - the text that this <InputField> will display in place of
 *                   user-provided data when the content prop is ''.
 *                   the default is 'Response'.
 * header (optional) - the header text for this <InputField>, if supplied. the
 *                     default is to not include a header.
 * headerHint (optional*) - the ReactNode (arbitrary TSX) that will serve as
 *                          the content of the <HoverableHint> for this
 *                          <InputField>'s header. the default is to not
 *                          include a <HoverableHint>.
 * helperText (optional) - text that appears just below this <InputField> and
 *                         is styled based on the other props. can be made into
 *                         a link by supplying a helperTextLink.
 * helperTextLink (optional*) - the href of a NextJS <Link> to be applied to
 *                              the helperText of this <InputField>.
 * error (optional) - true if this <InputField> should appear in an error
 *                    state, false or unspecified otherwise.
 * disabled (optional) - true if this <InputField> should not function, false
 *                       or unspecified if it should work normally.
 * NOTE: supplying a headerHint without specifying header text will cause a
 * BadPropsException. so will supplying a helperTextLink without supplying
 * helperText.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 1, 2023
 */

import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import BadPropsException from '../utils/BadPropsException';
import Button from './Button';
import HoverableHint from './HoverableHint';

type InputFieldProps = {
  content: string;
  onChange: Function;
  visibilityToggle?: boolean;
  hint?: string;
  header?: string;
  headerHint?: React.ReactNode;
  helperText?: string;
  helperTextLink?: string;
  error?: boolean;
  disabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  content,
  onChange,
  visibilityToggle,
  hint,
  header,
  headerHint,
  helperText,
  helperTextLink,
  error,
  disabled
}) => {
  if (headerHint !== undefined && header === undefined) {
    throw new BadPropsException(
      'Dropdowns must have a header to have a headerHint!'
    );
  }

  if (helperTextLink !== undefined && helperText === undefined) {
    throw new BadPropsException(
      'Dropdowns must have helperText to have a helperTextLink!'
    );
  }

  const [visible, setVisible] = React.useState(!visibilityToggle);

  // Establish styles that are used regardless of selection and expanded status
  let headerStyles = 'text-sm font-medium mb-1';
  let boxStyles =
    'w-96 h-10 bg-white box-border border rounded-md shadow-sm shadow-shade/5 flex flex-row justify-between items-center px-3 py-2.5 text-sm';
  let inputStyles = 'w-full outline-0';
  let helperTextStyles = 'text-sm my-2.5';

  // Adjust colors based on disabled and error props
  if (disabled) {
    headerStyles += ' text-neutral-400';
    boxStyles += ' border-neutral-200';
    helperTextStyles += ' text-neutral-400';
  } else if (error) {
    headerStyles += ' text-haiti';
    boxStyles += ' border-persimmon-300 ring-persimmon-100';
    // Always show an error ring when the <InputField> is not empty
    if (content != '') {
      boxStyles += ' ring-4';
    } else {
      boxStyles += ' focus-within:ring-4';
    }
    helperTextStyles += ' text-persimmon-500';
  } else {
    headerStyles += ' text-haiti';
    boxStyles += ' border-neutral-200 ring-cornflower-100 focus-within:ring-4 focus-within:border-cornflower-300';
    helperTextStyles += ' text-neutral-500';
  }

  // Adjust text color based on whether an option is selected
  if (content === undefined || disabled) {
    boxStyles += ' text-neutral-400';
  }

  // Separate the <input> element and the visibility icon if the latter exists
  if (visibilityToggle) {
    inputStyles += ' mr-3';
  }

  return (
    <div className="font-inter text-haiti">
      {/* Include a header if one is supplied */}
      {header !== undefined && (
        <div className="flex flex-row gap-x-1">
          <p className={headerStyles}>{header}</p>
          {/* Include a hoverable hint next to the header if one is supplied */}
          {headerHint !== undefined && (
            <HoverableHint hintPosition="top-right" grayed={disabled}>
              {headerHint}
            </HoverableHint>
          )}
        </div>
      )}
      {/* Specify w and h to ensure that, when expanded, the space occupied by
          this component in the normal flow of the document will not change */}
      <div className={boxStyles}>
        <input
          type={visible ? 'text' : 'password'}
          value={content}
          placeholder={hint}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={inputStyles}
        />
        {visibilityToggle && visible && (
          <EyeSlashIcon
            className="w-5 h-5 text-neutral-500"
            onClick={() => setVisible(false)}
          />
        )}
        {visibilityToggle && !visible && (
          <EyeIcon
            className="w-5 h-5 text-neutral-500"
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      {/* Include helperText if it is supplied */}
      {helperText !== undefined &&
        (helperTextLink === undefined || disabled) && (
          <p className={helperTextStyles}>{helperText}</p>
        )}
      {helperText !== undefined &&
        helperTextLink !== undefined &&
        !disabled && (
          <Button
            size="md"
            type="inline-link"
            action={helperTextLink}
            danger={error}
            text={helperText}
          />
        )}
    </div>
  );
};

InputField.defaultProps = {
  hint: 'Response',
  header: undefined,
  headerHint: undefined,
  helperText: undefined,
  helperTextLink: undefined,
  error: false,
  disabled: false
};

export default InputField;
