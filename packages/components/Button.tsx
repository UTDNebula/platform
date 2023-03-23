import { FC } from 'react';
import Icon from 'react-material-symbols/outlined';
import { MaterialSymbolProps } from 'react-material-symbols';

type ButtonProps = {
  style: 'primary' | 'secondary' | 'danger';
  action: string | Function;
  spread?: boolean;
  text?: string;
  icon?: MaterialSymbolProps['icon'];
  iconSide?: 'left' | 'right';
};

const Button: FC<ButtonProps> = ({
  style,
  action,
  spread,
  text,
  icon,
  iconSide
}) => {
  let styles =
    'flex items-center font-roboto font-bold text-2xl px-3 py-2.5 rounded-lg ';

  if (style === 'primary') {
    styles += 'text-white bg-brand ';
  } else if (style === 'secondary') {
    styles += 'text-brand bg-white border-[3px] border-brand ';
  } else {
    styles += 'text-danger bg-white ';
  }

  if (spread) {
    styles += 'w-full';
  } else {
    styles += 'w-fit';
  }

  const ButtonShell: FC<{
    children?: Array<JSX.Element | string | undefined>;
  }> = ({ children }) => {
    if (typeof action === 'string') {
      return (
        <a className={styles} href={action}>
          {children}
        </a>
      );
    } else {
      return (
        <button type="button" className={styles} onClick={() => action()}>
          {children}
        </button>
      );
    }
  };

  if (icon) {
    const RenderedIcon: FC = () => (
      <Icon
        icon={icon}
        size={32}
        weight={500}
        className={text ? 'mr-1.5' : ''}
      />
    );
    if (iconSide === 'right') {
      return (
        <ButtonShell>
          {text}
          <RenderedIcon />
        </ButtonShell>
      );
    } else {
      return (
        <button type="button" className={styles}>
          <RenderedIcon />
          {text}
        </button>
      );
    }
  } else {
    return (
      <button type="button" className={styles}>
        {text}
      </button>
    );
  }
};

export default Button;
