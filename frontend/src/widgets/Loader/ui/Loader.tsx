import { FC, memo } from 'react';
import styles from './Loader.module.scss';
import classNames from 'classnames';

interface LoaderProps {
  className?: string;
}

const Loader = memo(({ className }: LoaderProps) => {
  return <div className={classNames(styles.loader, {}, [className])}>Loading....</div>;
});

export { Loader };
