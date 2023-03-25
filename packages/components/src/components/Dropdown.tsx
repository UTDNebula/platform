/*
 * Dropdown Component
 *
 * Exports a function component that renders a styled and working <Dropdown>.
 * A <Dropdown> is an expandable menu that conforms to the width of its parent
 * element from which a single option can be chosen. While no option is
 * selected, <Dropdown>s display customizable hint text in place of an option.
 * Clicking on an unexpanded <Dropdown> expands it, causing all options to be
 * displayed. When an option is moused over, its bounding rectangle becomes
 * shaded. <Dropdown>s can optionally have header text, which is rendered in
 * normal-weight Roboto. If this header text exists, it can optionally be
 * accompanied by a <HoverableHint>, which appears to the right of it. Finally,
 * <Dropdown>s get their options from, learn which option is currently selected,
 * and send updates about selection changes to their parent elements via the
 * options, selected, and onChange props, respectively.
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
 * NOTE: supplying a headerHint without specifying
 * header text will cause a BadPropsException.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import MaterialSymbol from 'react-material-symbols/outlined';
import BadPropsException from '../utils/BadPropsException';

type DropdownProps = {
  options: string[];
  onChange: Function;
  hint?: string;
  selected?: number;
  header?: string;
  headerHint?: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  hint,
  selected,
  header,
  headerHint
}) => {
  if (headerHint !== undefined && header === undefined) {
    throw new BadPropsException(
      'Dropdowns must have a header to have a headerHint!'
    );
  }

  const [expanded, setExpanded] = React.useState(false);

  let topStyles =
    'absolute top-0 left-0 w-full bg-neutral-300 rounded-lg text-xl';

  if (selected === undefined) {
    topStyles += ' text-neutral-600';
  } else {
    topStyles += ' text-black';
  }

  // Still render if no vertical movement is necessary
  return (
    <>
      <div className="relative w-full h-13">
        <div className={topStyles}>
          <button
            type="button"
            className="w-full"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex flex-row justify-between p-3 pl-4">
              {selected === undefined ? hint : options[selected]}
              <MaterialSymbol
                icon={expanded ? 'expand_less' : 'expand_more'}
                size={24}
                weight={500}
                className="mt-3px"
              />
            </div>
          </button>
          {expanded && (
            <>
              <div className="h-[1px] w-full bg-neutral-600 mb-2" />
              {options.map((option, index) => {
                let rowStyles =
                  'w-full flex flex-row justify-between text-lg text-black hover:bg-neutral-400 p-2 pl-4';
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                if (index === options.length - 1) {
                  rowStyles += ' mb-3';
                }
                return (
                  <button
                    key={option}
                    type="button"
                    className={rowStyles}
                    onClick={() => {
                      onChange(index);
                      setExpanded(false);
                    }}
                  >
                    {option}
                    {index === selected && (
                      <MaterialSymbol
                        icon="done"
                        size={24}
                        weight={500}
                        className="mt-3px mr-1"
                      />
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

Dropdown.defaultProps = {
  hint: 'Select one...',
  selected: undefined,
  header: undefined,
  headerHint: undefined
};

export default Dropdown;
