/*
 * Dropdown Component
 *
 * Exports a function component that renders a styled and working <Dropdown>.
 * A <Dropdown> is an expandable menu from which a single option can be chosen.
 * While no option is selected, <Dropdown>s display customizable hint text in
 * place of an option. Clicking on an unexpanded <Dropdown> expands it, causing
 * all options to be displayed. <Dropdown>s can optionally have header text. If
 * this is included, it can optionally be accompanied by a <HoverableHint> to
 * its immediate right. <Dropdown>s can also optionally have helper text; if
 * supplied, it appears at the bottom and can optionally be made into a link.
 * Finally, <Dropdown>s can be put into an error or disabled state (but not
 * both; disabled takes priority) by setting the corresponding props to true.
 *
 * Props:
 * options (required) - the options that this <Dropdown> should display. they
 *                      will be shown in the order that they are supplied.
 * onChange (required) - a function that this <Dropdown> will call whenever
 *                       the user clicks on an option. it should accept one
 *                       argument, to which this <Dropdown> will supply
 *                       the index of whichever option was just selected.
 * hint (optional) - the text that this <Dropdown> will display in place of
 *                   a selection when no selection has been made yet. the
 *                   default is 'Select one...'
 * selected (optional) - the index in the options array of the option that this
 *                       <Dropdown> should display as currently selected.
 *                       the default is to fall back to the hint text.
 * header (optional) - the header text for this <Dropdown>, if supplied. the
 *                     default is to not include a header.
 * headerHint (optional*) - the ReactNode (arbitrary TSX) that will serve as
 *                          the content of the <HoverableHint> for this
 *                          <Dropdown>'s header. the default is to not include
 *                          a <HoverableHint>.
 * helperText (optional) - text that appears just below this <Dropdown> and
 *                         is styled based on the other props. can be made into
 *                         a link by supplying a helperTextLink.
 * helperTextLink (optional*) - the href of a NextJS <Link> to be applied to
 *                              the helperText of this <Dropdown>.
 * spread (optional) - true if this <Dropdown> should conform to the width of
 *                     its parent element, false or unspecified if it should
 *                     use a default, fixed width (w-96).
 * error (optional) - true if this <Dropdown> should appear in an error state,
 *                    false or unspecified otherwise.
 * disabled (optional) - true if this <Dropdown> should not function, false or
 *                       unspecified if it should work normally.
 * NOTE: supplying a headerHint without specifying header text will cause a
 * BadPropsException. so will supplying a helperTextLink without supplying
 * helperText.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/20/solid';
import BadPropsException from '../utils/BadPropsException';
import { getDropdownStyles } from '../utils/CommonStyles';
import DIFHeader from './DIFHeader';
import DIFHelperText from './DIFHelperText';

type DropdownProps = {
  options: string[];
  onChange: Function;
  hint?: string;
  selected?: number;
  header?: string;
  headerHint?: React.ReactNode;
  helperText?: string;
  helperTextLink?: string;
  spread?: boolean;
  error?: boolean;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  hint,
  selected,
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
      'Dropdowns must have a header to have a headerHint!'
    );
  }

  if (helperTextLink !== undefined && helperText === undefined) {
    throw new BadPropsException(
      'Dropdowns must have helperText to have a helperTextLink!'
    );
  }

  const [expanded, setExpanded] = React.useState(false);

  // Use utils/CommonStyles.ts to compute styles
  const styles = getDropdownStyles(selected, !!error, !!disabled, expanded);

  return (
    <div className={`font-inter text-haiti ${spread ? 'w-full' : 'w-96'}`}>
      {/* Include a header if one is supplied */}
      <DIFHeader
        text={header}
        styles={styles.headerStyles}
        hint={headerHint}
        disabled={disabled}
      />
      {/* Specify height explicitly to ensure that, when expanded, the space
       * occupied by this component in the normal flow of the document will
       * not change */}
      <div className="relative h-10">
        <div className={styles.containerStyles}>
          {/* Render the top part of the dropdown (always visible) */}
          <button
            type="button"
            className="w-full outline-0"
            disabled={disabled}
            onClick={() => setExpanded(!expanded)}
          >
            <div className={styles.topRowStyles}>
              {/* Show hint or selected option text, as applicable */}
              {selected === undefined ? hint : options[selected]}
              {expanded ? (
                <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-neutral-500" />
              )}
            </div>
          </button>
          {/* Render the expandable part of the dropdown (not always visible) */}
          {expanded && (
            <>
              {/* Divider line */}
              <div className="h-[1px] w-full bg-neutral-200" />
              {/* For each option... */}
              {options.map((option, index) => {
                let thisExpandableRowStyles = styles.expandableRowStyles;
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                if (index === options.length - 1) {
                  thisExpandableRowStyles += ' rounded-b-md';
                }
                return (
                  <button
                    key={option}
                    type="button"
                    className={thisExpandableRowStyles}
                    disabled={disabled}
                    onClick={() => {
                      onChange(index);
                      setExpanded(false);
                    }}
                  >
                    {option}
                    {/* Check mark if option is currently selected */}
                    {index === selected && (
                      <CheckIcon className="w-5 h-5 text-neutral-500" />
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
      {/* Include helperText if it is supplied */}
      <DIFHelperText
        styles={styles.helperTextStyles}
        text={helperText}
        link={helperTextLink}
        error={error}
        disabled={disabled}
      />
    </div>
  );
};

Dropdown.defaultProps = {
  hint: 'Select one...',
  selected: undefined,
  header: undefined,
  headerHint: undefined,
  helperText: undefined,
  helperTextLink: undefined,
  spread: false,
  error: false,
  disabled: false
};

export default Dropdown;
