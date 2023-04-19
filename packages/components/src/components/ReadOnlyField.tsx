/*
 * Read Only Field Component
 *
 * Exports a function component that renders a styled and working
 * <ReadOnlyField>. A <ReadOnlyField> is a text box that looks like an
 * <InputField> but does not accept user input. Instead, it is populated with
 * a copiable value by the application. <ReadOnlyField>s can optionally have
 * header text. If this is included, it can optionally be accompanied by a
 * <HoverableHint> to its immediate right. <ReadOnlyField>s can also optionally
 * have helper text; if supplied, it appears at the bottom and can optionally
 * be made into a link.
 *
 * Props:
 * content (required) - the value that this <ReadOnlyField> should display.
 * visibilityToggle (optional) - true if this <ReadOnlyField> should include a
 *                               clickable eye icon that toggles whether the
 *                               content is hidden with asterisks, false or
 *                               unspecified if not.
 * header (optional) - the header text for this <ReadOnlyField>, if supplied.
 *                     the default is to not include a header.
 * headerHint (optional*) - the ReactNode (arbitrary TSX) that will serve as
 *                          the content of the <HoverableHint> for this
 *                          <ReadOnlyField>'s header. the default is to not
 *                          include a <HoverableHint>.
 * helperText (optional) - text that appears just below this <ReadOnlyField>
 *                         and is styled based on the other props. can be made
 *                         into a link by supplying a helperTextLink.
 * helperTextLink (optional*) - the href of a NextJS <Link> to be applied to
 *                              the helperText of this <ReadOnlyField>.
 * spread (optional) - true if this <ReadOnlyField> should conform to the width
 *                     of its parent element, false or unspecified if it should
 *                     use a default, fixed width (w-96).
 * NOTE: supplying a headerHint without specifying header text will cause a
 * BadPropsException. so will supplying a helperTextLink without supplying
 * helperText.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 19, 2023
 */

import React from 'react';
import {
  CheckIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';
import BadPropsException from '../utils/BadPropsException';
import { getReadOnlyFieldStyles } from '../utils/FieldStyles';
import FieldHeader from './FieldHeader';
import FieldHelperText from './FieldHelperText';

// Number of milliseconds to show check mark as copy confirmation
const CHECK_TIMEOUT = 1000;

type ReadOnlyFieldProps = {
  content: string;
  visibilityToggle?: boolean;
  header?: string;
  headerHint?: React.ReactNode;
  helperText?: string;
  helperTextLink?: string;
  spread?: boolean;
};

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  content,
  visibilityToggle,
  header,
  headerHint,
  helperText,
  helperTextLink,
  spread
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
  const [showCopyCheck, setShowCopyCheck] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setShowCopyCheck(true);
    setTimeout(() => setShowCopyCheck(false), CHECK_TIMEOUT);
  };

  // Use utils/CommonStyles.ts to compute styles
  const styles = getReadOnlyFieldStyles();

  return (
    <div className={`font-inter text-haiti ${spread ? 'w-full' : 'w-96'}`}>
      {/* Include a header if one is supplied */}
      <FieldHeader
        text={header}
        styles={styles.headerStyles}
        hint={headerHint}
        disabled={false}
      />
      {/* Render the content container itself */}
      <div className={styles.containerStyles}>
        <div
          className={`font-mono grow ${
            visible ? 'truncate' : 'text-clip overflow-hidden'
          }`}
        >
          {visible ? content : content.replace(/./g, '*')}
        </div>
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
        {/* Show either clickable copy icon or check icon, as applicable */}
        {showCopyCheck ? (
          <CheckIcon className={styles.iconStyles} onClick={handleCopy} />
        ) : (
          <DocumentDuplicateIcon
            className={styles.iconStyles}
            onClick={handleCopy}
          />
        )}
      </div>
      {/* Include helperText if it is supplied */}
      <FieldHelperText
        styles={styles.helperTextStyles}
        text={helperText}
        link={helperTextLink}
        error={false}
        disabled={false}
      />
    </div>
  );
};

ReadOnlyField.defaultProps = {
  visibilityToggle: false,
  header: undefined,
  headerHint: undefined,
  helperText: undefined,
  helperTextLink: undefined,
  spread: false
};

export default ReadOnlyField;
