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
 * danger (optional) - true if this <Button> is associated with a destructive
 *                     action, false or unspecified if not.
 * spread (optional) - true if this <Button> should conform to the width of its
 *                     parent element (contents centered), false or unspecified
 *                     if it should conform to the width of its contents.
 * text (optional*) - the text that this <Button> should contain.
 * icon (optional*) - the name of the Material Symbol
 *                    that this <Button> should contain.
 * iconSide (optional) - if text and an icon are included, the side
 *                       of the text on which the icon should appear.
 *                       can be either 'left' or 'right'; 'left' by default.
 * action (optional) - the function that this <Button> will call when clicked.
 *                     note that buttons can act as links by wrapping them with
 *                     a NextJS <Link>, so they do not need actions.
 * disabled (optional) - true if this button should be inoperable, false or
 *                       unspecified if it should work.
 * NOTE: at least one of {text, icon} must be supplied.
 *       supplying neither will cause a BadPropsException.
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
};

const RenderedSymbol: React.FC<RenderedSymbolProps> = ({ icon, isSmall }) => {
  let margin = '';
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
  isSmall: false
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
    if (action !== undefined && (disabled === undefined || !disabled)) {
      action();
    }
  }

  // Establish styles that are used regardless of props
  let buttonStyles = 'font-inter font-medium rounded-md box-border';
  let innerStyles = 'flex justify-center items-center';

  /* Choose font size, height, and padding based on size prop (padding is
   * different for inline-link type buttons). Specifying a height is
   * required for box-border to work; we use what it would be anyway. */
  const addPaddingX = type !== 'inline-link';
  if (size === 'lg') {
    buttonStyles += ' text-base h-12 py-3' + (addPaddingX ? ' px-5' : '');
    innerStyles += ' gap-x-2';
  } else if (size === 'md') {
    buttonStyles += ' text-sm h-10 py-2.5' + (addPaddingX ? ' px-4' : '');
    innerStyles += ' gap-x-1.5';
  } else {
    buttonStyles += ' text-xs h-8 py-2' + (addPaddingX ? ' px-3' : '');
    innerStyles += ' gap-x-1.5';
  }

  // Choose colors and shades based on danger, type, and disabled props
  if (!danger) {
    if (type === 'primary') {
      buttonStyles += ' text-white';
      if (disabled) {
        buttonStyles += ' bg-cornflower-300';
      } else {
        buttonStyles +=
          ' bg-cornflower-500 text-white hover:bg-cornflower-600 active:text-cornflower-200';
      }
    } else if (type === 'secondary') {
      buttonStyles += ' bg-cornflower-50';
      if (disabled) {
        buttonStyles += ' text-cornflower-300';
      } else {
        buttonStyles +=
          ' text-cornflower-500 hover:bg-cornflower-100 hover:text-cornflower-600 active:bg-cornflower-100 active:text-cornflower-500';
      }
    } else if (type === 'tertiary') {
      buttonStyles += ' border border-neutral-200 bg-white';
      if (disabled) {
        buttonStyles += ' text-neutral-400';
      } else {
        buttonStyles +=
          ' text-neutral-700 bg-white hover:border-neutral-300 active:text-neutral-500';
      }
    } else if (type === 'outlined') {
      buttonStyles += ' border bg-white';
      if (disabled) {
        buttonStyles += ' border-cornflower-300 text-cornflower-300';
      } else {
        buttonStyles +=
          ' border-cornflower-500 text-cornflower-500 hover:border-cornflower-400 active:text-cornflower-400';
      }
    } else {
      buttonStyles += ' bg-white';
      if (disabled) {
        buttonStyles += ' text-cornflower-300';
      } else {
        buttonStyles +=
          ' text-cornflower-500 hover:text-cornflower-600 active:text-cornflower-400';
      }
    }
  } else {
    if (type === 'primary') {
      buttonStyles += ' text-white';
      if (disabled) {
        buttonStyles += ' bg-persimmon-300';
      } else {
        buttonStyles +=
          ' bg-persimmon-500 text-white hover:bg-persimmon-600 active:text-persimmon-200';
      }
    } else if (type === 'secondary') {
      buttonStyles += ' bg-persimmon-50';
      if (disabled) {
        buttonStyles += ' text-persimmon-300';
      } else {
        buttonStyles +=
          ' text-persimmon-500 hover:bg-persimmon-100 hover:text-persimmon-600 active:bg-persimmon-100 active:text-persimmon-500';
      }
    } else if (type === 'tertiary') {
      buttonStyles += ' border border-persimmon-200 bg-white';
      if (disabled) {
        buttonStyles += ' text-persimmon-300';
      } else {
        buttonStyles +=
          ' text-persimmon-500 bg-white hover:border-persimmon-300 hover:bg-persimmon-50 active:border-persimmon-300 active:bg-persimmon-50 active:text-persimmon-400';
      }
    } else if (type === 'outlined') {
      buttonStyles += ' border bg-white';
      if (disabled) {
        buttonStyles += ' border-persimmon-300 text-persimmon-300';
      } else {
        buttonStyles +=
          ' border-persimmon-500 text-persimmon-500 hover:border-persimmon-400 active:text-persimmon-400';
      }
    } else {
      buttonStyles += ' bg-white';
      if (disabled) {
        buttonStyles += ' text-persimmon-300';
      } else {
        buttonStyles +=
          ' text-persimmon-500 hover:text-persimmon-600 active:text-persimmon-500';
      }
    }
  }

  // Choose width based on spread prop
  if (spread) {
    buttonStyles += ' w-full';
  } else {
    buttonStyles += ' w-fit';
  }

  // Choose balancing margin based on iconSide prop
  // if (text && icon) {
  //   if (iconSide === 'right') {
  //     innerStyles += ' ml-0.5';
  //   } else {
  //     innerStyles += ' mr-0.5';
  //   }
  // }

  // Arrange the text and/or icon based on iconSide
  if (icon) {
    if (iconSide === 'right') {
      return (
        <button type="button" className={buttonStyles} onClick={clickHandler}>
          <div className={innerStyles}>
            {text}
            <RenderedSymbol icon={icon} isSmall={size === 'sm'} />
          </div>
        </button>
      );
    }
    return (
      <button type="button" className={buttonStyles} onClick={clickHandler}>
        <div className={innerStyles}>
          <RenderedSymbol icon={icon} isSmall={size === 'sm'} />
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
