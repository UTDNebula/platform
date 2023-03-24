/*
 * Button Component
 *
 * Exports a functional component that renders a styled and working <Button>.
 * A <Button> may contain text, an icon, or both. It can either act as a link
 * to another page (by wrapping it with <Link>) or call a supplied function
 * when clicked. Finally, it can have one of three visual styles and can either
 * conform to the width of its parent or to the width of its contents.
 *
 * Props:
 * appearance (required) - the visual style for the <Button>.
 *                         can be 'primary', 'secondary', or 'danger'.
 * action (optional) - the function that this <Button> will call when clicked.
 *                     note that buttons can become links by wrapping them with
 *                     a NextJS <Link>.
 * spread (optional) - true if this <Button> should conform to the width of its
 *                     parent element (contents centered), false or absent if
 *                     it should conform to the width of its contents.
 * text (optional*) - the text that this <Button> should contain.
 * icon (optional*) - the name of the Material Symbol
 *                    that this <Button> should contain.
 * iconSide (optional) - if text and an icon are included, the side
 *                       of the text on which the icon should appear.
 *                       can be either 'left' or 'right'; 'left' by default.
 * NOTE: at least one of {text, icon} must be supplied.
 *
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import React from 'react';
import Icon from 'react-material-symbols/outlined';
import { MaterialSymbolProps } from 'react-material-symbols';
import BadPropsException from '../utils/BadPropsException';

/* RenderedIcon is a helper component (not exported) that houses the logic
necessary to prepare and (if necessary) add margin to the chosen icon. */

type RenderedIconProps = {
  icon: MaterialSymbolProps['icon'];
  nearText: boolean;
  iconSide?: 'left' | 'right';
};

const RenderedIcon: React.FC<RenderedIconProps> = ({
  icon,
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
  return <Icon icon={icon} size={32} weight={500} className={margin} />;
};

RenderedIcon.defaultProps = {
  iconSide: 'left'
};

/* Button is the main component to be exported. It leverages
RenderedIcon and conforms to the documentation above. */

type ButtonProps = {
  appearance: 'primary' | 'secondary' | 'danger';
  action?: Function;
  spread?: boolean;
  text?: string;
  icon?: MaterialSymbolProps['icon'];
  iconSide?: 'left' | 'right';
};

const Button: React.FC<ButtonProps> = ({
  appearance,
  action,
  spread,
  text,
  icon,
  iconSide
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
  let buttonStyles =
    'font-roboto font-bold text-2xl px-3 h-13 rounded-lg box-border ';
  let innerStyles = 'flex justify-center items-center';

  // Base styles on appearance prop
  if (appearance === 'primary') {
    buttonStyles += 'text-white bg-brand ';
  } else if (appearance === 'secondary') {
    buttonStyles += 'text-brand bg-white border-[3px] border-brand ';
  } else {
    buttonStyles += 'text-white bg-danger ';
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
            <RenderedIcon
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
          <RenderedIcon
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
  action: undefined,
  spread: false,
  text: undefined,
  icon: undefined,
  iconSide: 'left'
};

export default Button;
