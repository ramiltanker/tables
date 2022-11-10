import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

export enum ButtonTheme {
  CLEAR = 'clear',
  BACKGROUND_WHITE = 'background_white',
  BACKGROUND_PURPLE = 'background_purple'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  theme?: ButtonTheme;
  size?: ButtonSize;
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  children,
  theme = ButtonTheme.CLEAR,
  size = ButtonSize.M,
  disabled,
  ...otherProps
}) => {
  const mods = { [styles[theme]]: true, [styles[size]]: true, [styles.disabled]: disabled };

  return (
    <button {...otherProps} className={classNames(styles.button, mods, [className])} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
