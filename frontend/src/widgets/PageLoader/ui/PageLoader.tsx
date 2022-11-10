import { FC, memo } from 'react';
import styles from './PageLoader.module.scss';
import classNames from 'classnames';

interface PageLoaderProps {
  className?: string;
}

const PageLoader = memo(({ className }: PageLoaderProps) => {
  return <div className={classNames(styles.pageLoader, {}, [className])}>Loading...</div>;
});

export { PageLoader };
