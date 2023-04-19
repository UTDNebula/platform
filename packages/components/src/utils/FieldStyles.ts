/*
 * Field Styles Helper
 *
 * Exports functions that compute Tailwind style classes for the (similarly-
 * styled) field components (Dropdown, InputField, ReadOnlyField). Each
 * function returns an object containing all of the relevant styles for a
 * component; corresponding type definitions are also exported. The main
 * purpose of this helper file is to minimize code duplication.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting April 5, 2023
 */

// Establish styles that are used regardless of props
const baseHeaderStyles = 'text-sm font-medium mb-1';
// Specify width explicitly to ensure that the border will appear inside
const baseContainerStyles =
  'w-full bg-white box-border border rounded-md shadow-sm shadow-shade/5';
const baseMainContentStyles =
  'flex flex-row justify-between items-center gap-x-2 px-3 py-2.5 text-sm text-left';
const baseIconStyles = 'w-5 h-5 shrink-0 cursor-pointer';
const baseHelperTextStyles = 'text-sm my-2';

// Types returned by exported functions for importing TSX files to leverage
export type DropdownStyles = {
  headerStyles: string;
  containerStyles: string;
  topRowStyles: string;
  expandableRowStyles: string;
  iconStyles: string;
  helperTextStyles: string;
};
export type InputFieldStyles = {
  headerStyles: string;
  containerStyles: string;
  inputElementStyles: string;
  iconStyles: string;
  helperTextStyles: string;
};
export type ReadOnlyFieldStyles = {
  headerStyles: string;
  containerStyles: string;
  iconStyles: string;
  helperTextStyles: string;
};

/*
 * computeStyles - main helper function. returns the computed style object
 *                 corresponding with the value of the fieldType parameter.
 *
 * Parameters:
 * fieldType - the type of field for which styles should be computed.
 *             can be 'dropdown', 'input', or 'readonly'.
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
const computeStyles = (
  fieldType: 'dropdown' | 'input' | 'readonly',
  populated: boolean,
  error: boolean,
  disabled: boolean,
  expanded: boolean
): DropdownStyles | InputFieldStyles | ReadOnlyFieldStyles => {
  // Set up variables
  let headerStyles: string;
  let containerStyles: string;
  let topRowStyles: string;
  let expandableRowStyles: string;
  let inputElementStyles: string;
  let iconStyles: string;
  let helperTextStyles: string;
  // Establish styles that are used regardless of props. Specify width/height
  // explicitly to ensure that the border will appear inside.
  headerStyles = baseHeaderStyles;
  iconStyles = baseIconStyles;
  helperTextStyles = baseHelperTextStyles;
  if (fieldType === 'dropdown') {
    containerStyles = `${baseContainerStyles} absolute top-0 left-0`;
    topRowStyles = `${baseMainContentStyles} hover:bg-neutral-50 active:bg-neutral-100`;
    expandableRowStyles = `${baseMainContentStyles} w-full hover:bg-neutral-100 active:bg-neutral-200`;
    inputElementStyles = ''; // unused
  } else if (fieldType === 'input') {
    containerStyles = `${baseContainerStyles} ${baseMainContentStyles} h-10`;
    topRowStyles = ''; // unused
    expandableRowStyles = ''; // unused
    inputElementStyles = 'w-full outline-0 placeholder-shown:truncate';
  } else {
    // fieldType === 'readonly'
    containerStyles = `${baseContainerStyles} ${baseMainContentStyles} h-10`;
    topRowStyles = ''; // unused
    expandableRowStyles = ''; // unused
    inputElementStyles = ''; // unused
  }
  // Adjust colors/borders/rings based on disabled/error/populated status
  if (disabled) {
    headerStyles += ' text-neutral-400';
    containerStyles += ' border-neutral-200';
    helperTextStyles += ' text-neutral-400';
  } else if (error) {
    headerStyles += ' text-haiti';
    containerStyles += ' border-persimmon-300';
    if (fieldType !== 'readonly') {
      containerStyles += ' ring-persimmon-100';
    }
    // Always show a ring when an error-state field component has user content
    if (fieldType !== 'readonly') {
      if (populated) {
        containerStyles += ' ring-4';
      } else {
        containerStyles += ' focus-within:ring-4';
      }
    }
    if (fieldType === 'input') {
      inputElementStyles += ' caret-persimmon-500';
    }
    helperTextStyles += ' text-persimmon-500';
  } else {
    headerStyles += ' text-haiti';
    if (fieldType !== 'readonly') {
      containerStyles +=
        ' border-neutral-200 ring-cornflower-100 focus-within:ring-4 focus-within:border-cornflower-300';
    }
    if (fieldType === 'input') {
      inputElementStyles += ' caret-cornflower-500';
    }
    helperTextStyles += ' text-neutral-500';
  }
  // Adjust text color based on whether an option is selected
  if (!populated || disabled) {
    if (fieldType === 'dropdown') {
      topRowStyles += ' text-neutral-400';
    } else {
      containerStyles += ' text-neutral-400';
    }
  }
  // Set color of clickable icons for writeable field components
  if (fieldType !== 'readonly') {
    iconStyles += ' text-neutral-500';
  }
  if (fieldType === 'dropdown') {
    // Adjust top row corner rounding based on expanded status
    // Also ensure that expanded dropdowns obscure HoverableHints
    if (expanded) {
      topRowStyles += ' rounded-t-md';
      containerStyles += ' z-20';
    } else {
      topRowStyles += ' rounded-md';
    }
    const dropdownStyles: DropdownStyles = {
      headerStyles,
      containerStyles,
      topRowStyles,
      expandableRowStyles,
      iconStyles,
      helperTextStyles
    };
    return dropdownStyles;
    // eslint-disable-next-line no-else-return
  } else if (fieldType === 'input') {
    const inputFieldStyles: InputFieldStyles = {
      headerStyles,
      containerStyles,
      inputElementStyles,
      iconStyles,
      helperTextStyles
    };
    return inputFieldStyles;
  }
  // else - fieldType === 'readonly'
  const readOnlyFieldStyles: ReadOnlyFieldStyles = {
    headerStyles,
    containerStyles,
    iconStyles,
    helperTextStyles
  };
  return readOnlyFieldStyles;
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
): DropdownStyles =>
  computeStyles(
    'dropdown',
    selected !== undefined,
    error,
    disabled,
    expanded
  ) as DropdownStyles;

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
  disabled: boolean
): InputFieldStyles =>
  computeStyles(
    'input',
    content !== '',
    error,
    disabled,
    false
  ) as InputFieldStyles;

/*
 * getReadOnlyFieldStyles - returns the computed style
 *                          object for a<ReadOnlyField>.
 */
export const getReadOnlyFieldStyles = (): ReadOnlyFieldStyles =>
  computeStyles('readonly', true, false, false, false) as ReadOnlyFieldStyles;
