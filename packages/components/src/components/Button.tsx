/*
 * Button Component
 *
 * Exports a function component that renders a styled and working <Button>.
 * A <Button> may contain text, an icon, or both. It can either act as a link
 * to another page (by wrapping it with <Link>) or call a supplied function
 * when clicked. Finally, it can have one of several visual styles and can
 * conform to the width of its parent or to the width of its contents.
 *
 * Props:
 * size (required) - the size of this <Button>. can be 'sm', 'md', or 'lg'.
 * type (required) - the design role played by this <Button>. can be 'primary',
 *                   'secondary', or 'tertiary', 'outlined', or 'inline-link'.
 * danger (optional) - true if this button is associated with a destructive
 *                     action, false or unspecified if not.
 * spread (optional) - true if this <Button> should conform to the width of its
 *                     parent element (contents centered), false or unspecified
 *                     if it should conform to the width of its contents.
 * text (optional*) - the text that this <Button> should contain.
 * icon (optional*) - the name of the Material Symbol
 *                    that this <Button> should contain.
 * iconSide (optional) - if text and an icon are included, the side
 *                       of the text on which the icon should appear.
 * action (optional) - the function that this <Button> will call when clicked.
 *                     note that buttons can act as links by wrapping them with
 *                     a NextJS <Link>, so they do not need actions.
 * disabled (optional) - true if this button should be inoperable, false or
 *                       unspecified if it should work.

 *                       can be either 'left' or 'right'; 'left' by default.
 * NOTE: at least one of {text, icon} must be supplied.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import MaterialSymbol from 'react-material-symbols/outlined';
import { MaterialSymbolProps } from 'react-material-symbols';
import BadPropsException from '../utils/BadPropsException';

/* RenderedSymbol is a helper component (not exported) that houses the logic
necessary to prepare and (if necessary) add margin to the chosen icon. */

type RenderedSymbolProps = {
  icon: MaterialSymbolProps['icon'];
  isSmall?: boolean;
  nearText?: boolean;
  iconSide?: 'left' | 'right';
};

const RenderedSymbol: React.FC<RenderedSymbolProps> = ({
  icon,
  isSmall,
  nearText,
  iconSide
}) => {
  let margin = '';
  // Separate the icon and the text
  if (nearText) {
    if (iconSide === 'left') {
      margin = 'mr-1.5';
    } else {
      margin = 'ml-1.5';
    }
  }
  // Size is in pixels, weight is like thickness
  return (
    <MaterialSymbol
      icon={icon}
      size={isSmall ? 16 : 20}
      weight={400}
      className={margin}
    />
  );
};

RenderedSymbol.defaultProps = {
  isSmall: false,
  nearText: false,
  iconSide: 'left'
};

/* Button is the main component to be exported. It leverages
RenderedSymbol and conforms to the documentation above. */

type ButtonProps = {
  size: 'sm' | 'md' | 'lg';
  type: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'inline-link';
  danger?: boolean;
  spread?: boolean;
  text?: string;
  icon?: MaterialSymbolProps['icon'];
  iconSide?: 'left' | 'right';
  action?: Function;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  size,
  type,
  danger,
  spread,
  text,
  icon,
  iconSide,
  action,
  disabled
}) => {
  if (text === undefined && icon === undefined) {
    throw new BadPropsException(
      'Buttons must have at least one of: {text, icon}.'
    );
  }

  function clickHandler() {
    if (action !== undefined) {
      action();
    }
  }

  // Establish styles that are used regardless of appearance and spread
  let buttonStyles = 'font-inter font-normal rounded-md box-border';
  let innerStyles = 'flex justify-center items-center';

  // Base styles on size prop
  if (size === 'sm') {
    buttonStyles += ' px-5 py-3';
  } else if (size === 'md') {
    buttonStyles += ' px-4 py-2.5';
  } else {
    buttonStyles += ' px-3 py-1.5';
  }

  // Base styles on type, danger, and disabled props
  if (!disabled) {
    if (!danger) {
      if (type === 'primary') {
        buttonStyles +=
          ' bg-cornflower text-white hover:bg-royal active:text-periwinkle';
      } else if (type === 'secondary') {
        buttonStyles += ' ';
      }
    } else {
    }
  }

  // Base styles on spread prop
  if (spread) {
    buttonStyles += 'w-full';
  } else {
    buttonStyles += 'w-fit';
  }

  // Base styles on iconSide prop
  if (text && icon) {
    if (iconSide === 'right') {
      innerStyles += ' ml-1';
    } else {
      innerStyles += ' mr-1';
    }
  }

  // Arrange the text and/or icon based on iconSide
  if (icon) {
    if (iconSide === 'right') {
      return (
        <button type="button" className={buttonStyles} onClick={clickHandler}>
          <div className={innerStyles}>
            {text}
            <RenderedSymbol
              icon={icon}
              nearText={text !== undefined}
              iconSide={iconSide}
            />
          </div>
        </button>
      );
    }
    return (
      <button type="button" className={buttonStyles} onClick={clickHandler}>
        <div className={innerStyles}>
          <RenderedSymbol
            icon={icon}
            nearText={text !== undefined}
            iconSide={iconSide}
          />
          {text}
        </div>
      </button>
    );
  }
  return (
    <button type="button" className={buttonStyles} onClick={clickHandler}>
      <div className={innerStyles}>{text}</div>
    </button>
  );
};

Button.defaultProps = {
  danger: false,
  spread: false,
  text: undefined,
  icon: undefined,
  iconSide: 'left',
  action: undefined,
  disabled: false
};

export default Button;
