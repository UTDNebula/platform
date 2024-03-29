/*
 * Field HelperText Helper Component
 *
 * Exports a function component that renders the helper text part of a field
 * component. Field components leverage this one internally, so there is no
 * need to add a <FieldHelperText> yourself.
 *
 * Props:
 * styles (required) - the value of the helperTextStyles property of the
 *                     computed style object for the field component that this
 *                     <FieldHelperText> is for. for more information, see
 *                     utils/FieldStyles.ts.
 * text (optional) - the text that this <FieldHelperText> should display.
 * link (optional) - the href of a NextJS <Link> to be applied to this
 *                   <FieldHelperText>. the default is to not include a link.
 * error (optional) - true if the field component that this <FieldHelperText>
 *                    is for is in an error state, false or unspecified if not.
 * disabled (optional) - true if the field component that this
 *                       <FieldHelperText> is for is disabled,
 *                       false or unspecified if not.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 7, 2023
 */

import React from 'react';
import Button from './Button';

type FieldHelperTextProps = {
  styles: string;
  text?: string;
  link?: string;
  error?: boolean;
  disabled?: boolean;
};

const FieldHelperText: React.FC<FieldHelperTextProps> = ({
  styles,
  text,
  link,
  error,
  disabled
}) => {
  if (text !== undefined) {
    if (link === undefined || disabled) {
      return <p className={styles}>{text}</p>;
    }
    return (
      <div className="my-2">
        <Button
          size="md"
          type="inline-link"
          action={link}
          danger={error}
          text={text}
        />
      </div>
    );
  }
  return null;
};

FieldHelperText.defaultProps = {
  text: undefined,
  link: undefined,
  error: false,
  disabled: false
};

export default FieldHelperText;
