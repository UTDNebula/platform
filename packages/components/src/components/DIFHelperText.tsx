/*
 * HelperText Helper Component for Dropdowns and InputFields (DIF)
 *
 * Exports a function component that renders the helper text part of a
 * <Dropdown> or <InputField>. Both those components leverage this one
 * internally, so there is no need to add a <DIHelperText> yourself.
 *
 * Props:
 * styles (required) - the value of the helperTextStyles property of the
 *                     computed style object for the <Dropdown> or <InputField>
 *                     that this <DIHelperText> is for. for more information,
 *                     see utils/CommonStyles.ts.
 * text (optional) - the text that this <DIHelperText> should display.
 * link (optional) - the href of a NextJS <Link> to be applied to this
 *                   <DIFHelperText>. the default is to not include a link.
 * error (optional) - true if the <Dropdown> or <InputField> that this
 *                    <DIFHelperText> is for is in an error state, false or
 *                    unspecified if not.
 * disabled (optional) - true if the <Dropdown> or <InputField> that this
 *                       <DIHelperText> is for is disabled, false or
 *                       unspecified if not.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 7, 2023
 */

import React from 'react';
import Button from './Button';

type DIFHelperTextProps = {
  styles: string;
  text?: string;
  link?: string;
  error?: boolean;
  disabled?: boolean;
};

const DIFHelperText: React.FC<DIFHelperTextProps> = ({
  styles,
  text,
  link,
  error,
  disabled
}) => {
  if (text !== undefined && (link === undefined || disabled)) {
    return <p className={styles}>{text}</p>;
  } else if (text !== undefined && link !== undefined && !disabled) {
    return (
      <Button
        size="md"
        type="inline-link"
        action={link}
        danger={error}
        text={text}
      />
    );
  }
  return null;
};

DIFHelperText.defaultProps = {
  text: undefined,
  link: undefined,
  error: false,
  disabled: false
};

export default DIFHelperText;
