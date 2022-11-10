import { FC, memo } from 'react';
import styles from './Text.module.scss';
import classNames from 'classnames';

export enum TextColor {
  WHITE = 'white',
  BLACK = 'black',
  GRAY = 'gray',
  RED = 'red'
}

export enum TextSize {
  SIZE_S = 'size_s',
  SIZE_M = 'size_m'
}

export enum TextWeight {
  WEIGHT_500 = 'weight_500',
  WEIGHT_600 = 'weight_600',
  WEIGHT_700 = 'weight_700'
}

interface TextProps {
  className?: string;
  children?: React.ReactNode;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
}

const Text = memo(
  ({
    className,
    children,
    size = TextSize.SIZE_S,
    color = TextColor.WHITE,
    weight = TextWeight.WEIGHT_500
  }: TextProps) => {
    const mods = {
      [styles[size]]: true,
      [styles[color]]: true,
      [styles[weight]]: true
    };

    return <p className={classNames(styles.text, mods, [className])}>{children}</p>;
  }
);

export { Text };
