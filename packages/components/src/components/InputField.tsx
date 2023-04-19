/*
 * Input Field Component
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
 *                      (NOT undefined) if there is no data.
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
 * spread (optional) - true if this <InputField> should conform to the width of
 *                     its parent element, false or unspecified if it should
 *                     use a default, fixed width (w-96).
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
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import BadPropsException from '../utils/BadPropsException';
import { getInputFieldStyles } from '../utils/FieldStyles';
import FieldHeader from './FieldHeader';
import FieldHelperText from './FieldHelperText';

type InputFieldProps = {
  content: string;
  onChange: Function;
  visibilityToggle?: boolean;
  hint?: string;
  header?: string;
  headerHint?: React.ReactNode;
  helperText?: string;
  helperTextLink?: string;
  spread?: boolean;
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
  spread,
  error,
  disabled
}) => {
  if (headerHint !== undefined && header === undefined) {
    throw new BadPropsException(
      'InputFields must have a header to have a headerHint!'
    );
  }

  if (helperTextLink !== undefined && helperText === undefined) {
    throw new BadPropsException(
      'InputFields must have helperText to have a helperTextLink!'
    );
  }

  const [visible, setVisible] = React.useState(!visibilityToggle);

  // Use utils/CommonStyles.ts to compute styles
  const styles = getInputFieldStyles(content, !!error, !!disabled);

  return (
    <div className={`font-inter text-haiti ${spread ? 'w-full' : 'w-96'}`}>
      {/* Include a header if one is supplied */}
      <FieldHeader
        text={header}
        styles={styles.headerStyles}
        hint={headerHint}
        disabled={disabled}
      />
      {/* Render the input box itself */}
      <div className={styles.containerStyles}>
        <input
          type={visible ? 'text' : 'password'}
          value={content}
          placeholder={hint}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={styles.inputElementStyles + ' disabled:bg-white'}
        />
        {/* Show either visibility toggle icon, if applicable */}
        {visibilityToggle && visible && (
          <EyeSlashIcon
            className={styles.iconStyles}
            onClick={() => setVisible(false)}
          />
        )}
        {visibilityToggle && !visible && (
          <EyeIcon
            className={styles.iconStyles}
            onClick={() => setVisible(true)}
          />
        )}
      </div>
      {/* Include helperText if it is supplied */}
      <FieldHelperText
        styles={styles.helperTextStyles}
        text={helperText}
        link={helperTextLink}
        error={error}
        disabled={disabled}
      />
    </div>
  );
};

InputField.defaultProps = {
  visibilityToggle: false,
  hint: 'Response',
  header: undefined,
  headerHint: undefined,
  helperText: undefined,
  helperTextLink: undefined,
  spread: false,
  error: false,
  disabled: false
};

export default InputField;
