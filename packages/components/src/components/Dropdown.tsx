/*
 * Dropdown Component
 *
 * Exports a function component that renders a styled and working <Dropdown>.
 * A <Dropdown> is an expandable menu from which a single option can be chosen.
 * While no option is selected, <Dropdown>s display customizable hint text in
 * place of an option. Clicking on an unexpanded <Dropdown> expands it, causing
 * all options to be displayed. When an option is moused over, its bounding
 * rectangle becomes shaded. <Dropdown>s can optionally have header text, which
 * is rendered in normal-weight text. If this header text exists, it can
 * optionally be accompanied by a <HoverableHint>, which appears to the right
 * of it. <Dropdown>s can also optionally have helper text; if supplied, it
 * appears just below them and can be made into a link. <Dropdown>s get their
 * options from, learn which option is currently selected, and send updates
 * about selection changes to their parent elements via the options, selected,
 * and onChange props, respectively. Finally, <Dropdown>s can be put into an
 * error or disabled state (but not both; disabled takes priority) by setting
 * the props of the same names to true.
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
import Link from 'next/link';
import MaterialSymbol from 'react-material-symbols/outlined';
import BadPropsException from '../utils/BadPropsException';
import Button from './Button';
import HoverableHint from './HoverableHint';

type DropdownProps = {
  options: string[];
  onChange: Function;
  hint?: string;
  selected?: number;
  header?: string;
  headerHint?: React.ReactNode;
  helperText?: string;
  helperTextLink?: string;
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

  // Establish styles that are used regardless of selection and expanded status
  let rowStyles =
    'flex flex-row justify-between items-center px-3 py-2.5 text-sm';
  let topStyles = rowStyles + ' hover:bg-neutral-50 active:bg-neutral-100';
  let expandableRowStyles =
    rowStyles + ' w-full hover:bg-neutral-100 active:bg-neutral-200';

  // Adjust text color based on whether an option is selected
  if (selected === undefined) {
    topStyles += ' text-neutral-400';
  }

  // Adjust top row corner rounding based on expanded status
  if (expanded) {
    topStyles += ' rounded-md';
  } else {
    topStyles += ' rounded-md';
  }

  return (
    <>
      {/* Include a header if one is supplied */}
      {header !== undefined && (
        <div className="flex flex-row gap-x-1 ">
          <p className="text-sm font-medium mb-1">{header}</p>
          {/* Include a hoverable hint next to the header if one is supplied */}
          {headerHint !== undefined && (
            <div className="">
              <HoverableHint hintPosition="top-right">
                {headerHint}
              </HoverableHint>
            </div>
          )}
        </div>
      )}
      {/* Specify w and h to ensure that, when expanded, the space occupied by
          this component in the normal flow of the document will not change */}
      <div className="relative w-96 h-10">
        <div className="absolute top-0 left-0 w-full bg-white border border-neutral-200 rounded-md shadow-sm shadow-shade/5 text-tahiti">
          {/* Render the top part of the dropdown (always visible) */}
          <button
            type="button"
            className="w-full"
            onClick={() => setExpanded(!expanded)}
          >
            <div className={topStyles}>
              {/* Show hint or selected option text, as applicable */}
              {selected === undefined ? hint : options[selected]}
              <MaterialSymbol
                icon={expanded ? 'expand_less' : 'expand_more'}
                size={20}
                weight={500}
                className="text-neutral-500"
              />
            </div>
          </button>
          {/* Render the expandable part of the dropdown (not always visible) */}
          {expanded && (
            <>
              {/* Divider line */}
              <div className="h-[1px] w-full bg-neutral-200" />
              {/* For each option... */}
              {options.map((option, index) => {
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                if (index === options.length - 1) {
                  expandableRowStyles += ' rounded-b-md';
                }
                return (
                  <button
                    key={option}
                    type="button"
                    className={expandableRowStyles}
                    onClick={() => {
                      onChange(index);
                      setExpanded(false);
                    }}
                  >
                    {option}
                    {/* Check mark if option is currently selected */}
                    {index === selected && (
                      <MaterialSymbol
                        icon="done"
                        size={20}
                        weight={500}
                        className="text-neutral-500"
                      />
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
      {/* Include helperText if it is supplied */}
      {helperText !== undefined && helperTextLink === undefined && (
        <p className="text-sm my-2.5">{helperText}</p>
      )}
      {helperText !== undefined && helperTextLink !== undefined && (
        <Button size="md" type="inline-link" action="/" text={helperText} />
      )}
    </>
  );
};

Dropdown.defaultProps = {
  hint: 'Select one...',
  selected: undefined,
  header: undefined,
  headerHint: undefined,
  helperText: undefined,
  helperTextLink: undefined,
  error: false,
  disabled: false
};

export default Dropdown;
