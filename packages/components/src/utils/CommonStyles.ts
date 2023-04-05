/*
 * Common Styles Helper
 *
 * Exports functions that compute Tailwind style classes for components that
 * have very similar appearances, such as Dropdown and InputField. Each
 * function returns an object containing all of the relevant styles for a
 * component; corresponding type definitions are also exported. The main
 * purpose of this helper file is to minimize code duplication.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 5, 2023
 */

/* DROPDOWN AND INPUTFIELD (DIF) */

// Establish styles that are used regardless of props
const DIFBaseHeaderStyles = 'text-sm font-medium mb-1';
// Specify width explicitly to ensure that the border will appear inside
const DIFBaseContainerStyles =
  'w-full bg-white box-border border rounded-md shadow-sm shadow-shade/5';
const DIFBaseMainContentStyles =
  'flex flex-row justify-between items-center px-3 py-2.5 text-sm';
const DIFBaseHelperTextStyles = 'text-sm my-2.5';

// Types returned by exported functions for importing TSX files to leverage
export type DropdownStyles = {
  headerStyles: string;
  containerStyles: string;
  topRowStyles: string;
  expandableRowStyles: string;
  helperTextStyles: string;
};
export type InputFieldStyles = {
  headerStyles: string;
  containerStyles: string;
  inputElementStyles: string;
  helperTextStyles: string;
};

/*
 * DIFComputeStyles - main helper function. returns the computed style object
 *                    corresponding with the value of the isDropdown parameter.
 *
 * Parameters:
 * isDropdown - true if the styles to be computed will be applied to a
 *              <Dropdown>, false if they are for an <InputField>.
 * populated - true if the target <Dropdown> or <InputField> contains user
 *             input, false if it is empty
 * error - true if the target <Dropdown> or <InputField> should appear in an
 *         error state, false if not
 * disabled - true if the target <Dropdown> or <InputField> should appear as
 *            though it does not function, false or unspecified otherwise
 * expanded - true if the target is an expanded <Dropdown>, false otherwise
 * visibilityToggle - true if the target is an <InputField> that should have
 *                    a visibilityToggle, false otherwise
 */
const DIFComputeStyles = (
  isDropdown: boolean,
  populated: boolean,
  error: boolean,
  disabled: boolean,
  expanded: boolean,
  visibilityToggle: boolean
): DropdownStyles | InputFieldStyles => {
  // Set up variables
  let headerStyles: string,
    containerStyles: string,
    topRowStyles: string,
    expandableRowStyles: string,
    inputElementStyles: string,
    helperTextStyles: string;
  // Establish styles that are used regardless of props. Specify width/height
  // explicitly to ensure that the border will appear inside.
  if (isDropdown) {
    headerStyles = DIFBaseHeaderStyles;
    containerStyles = DIFBaseContainerStyles + ' absolute top-0 left-0';
    topRowStyles =
      DIFBaseMainContentStyles + ' hover:bg-neutral-50 active:bg-neutral-100';
    expandableRowStyles =
      DIFBaseMainContentStyles +
      ' w-full hover:bg-neutral-100 active:bg-neutral-200';
    inputElementStyles = ''; // unused
    helperTextStyles = DIFBaseHelperTextStyles;
  } else {
    headerStyles = DIFBaseHeaderStyles;
    containerStyles =
      DIFBaseContainerStyles + ' ' + DIFBaseMainContentStyles + ' h-10';
    topRowStyles = ''; // unused
    expandableRowStyles = ''; // unused
    inputElementStyles = 'w-full outline-0';
    helperTextStyles = DIFBaseHelperTextStyles;
  }
  // Adjust colors/borders/rings based on disabled/error/populated status
  if (disabled) {
    headerStyles += ' text-neutral-400';
    containerStyles += ' border-neutral-200';
    helperTextStyles += ' text-neutral-400';
  } else if (error) {
    headerStyles += ' text-haiti';
    containerStyles += ' border-persimmon-300';
    if (!isDropdown) {
      containerStyles += ' ring-persimmon-100';
      // Always show a ring when an error-state <InputField> is not empty
      if (populated) {
        containerStyles += ' ring-4';
      } else {
        containerStyles += ' focus-within:ring-4';
      }
      inputElementStyles += ' caret-persimmon-500';
    }
    helperTextStyles += ' text-persimmon-500';
  } else {
    headerStyles += ' text-haiti';
    containerStyles += ' border-neutral-200';
    if (!isDropdown) {
      containerStyles +=
        ' ring-cornflower-100 focus-within:ring-4 focus-within:border-cornflower-300';
      inputElementStyles += ' caret-cornflower-500';
    }
    helperTextStyles += ' text-neutral-500';
  }
  // Adjust text color based on whether an option is selected
  if (!populated || disabled) {
    if (isDropdown) {
      topRowStyles += ' text-neutral-400';
    } else {
      containerStyles += ' text-neutral-400';
    }
  }
  if (isDropdown) {
    // Adjust top row corner rounding based on expanded status
    // Also ensure that expanded dropdowns obscure HoverableHints
    if (expanded) {
      topRowStyles += ' rounded-t-md';
      containerStyles += ' z-20';
    } else {
      topRowStyles += ' rounded-md';
    }
    const dropdownStyles: DropdownStyles = {
      headerStyles: headerStyles,
      containerStyles: containerStyles,
      topRowStyles: topRowStyles,
      expandableRowStyles: expandableRowStyles,
      helperTextStyles: helperTextStyles
    };
    return dropdownStyles;
  } else {
    // Separate the <input> element and visibility icon if the latter exists
    if (visibilityToggle) {
      inputElementStyles += ' mr-3';
    }
    const inputFieldStyles: InputFieldStyles = {
      headerStyles: headerStyles,
      containerStyles: containerStyles,
      inputElementStyles: inputElementStyles,
      helperTextStyles: helperTextStyles
    };
    return inputFieldStyles;
  }
};

/*
 * getDropdownStyles - returns the computed style object for a <Dropdown> with
 *                     props and state corresponding to the supplied arguments.
 *
 * Parameters:
 * selected, error, disabled - the current values of the <Dropdown>
 *                             props of the same names.
 * expanded - true if the target <Dropdown> is expanded, false otherwise.
 */
export const getDropdownStyles = (
  selected: number | undefined,
  error: boolean,
  disabled: boolean,
  expanded: boolean
): DropdownStyles => {
  return DIFComputeStyles(
    true,
    selected !== undefined,
    error,
    disabled,
    expanded,
    false
  ) as DropdownStyles;
};

/*
 * getInputFieldStyles - returns the computed style object for an <InputField>
 *                       with props and state corresponding to the supplied
 *                       arguments.
 *
 * All Parameters - the current values of the <InputField>
 *                  props of the same names.
 */
export const getInputFieldStyles = (
  content: string,
  error: boolean,
  disabled: boolean,
  visibilityToggle: boolean
): InputFieldStyles => {
  return DIFComputeStyles(
    false,
    content !== '',
    error,
    disabled,
    false,
    visibilityToggle
  ) as InputFieldStyles;
};
