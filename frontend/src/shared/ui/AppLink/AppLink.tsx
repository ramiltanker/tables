import { FC } from 'react';
import styles from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

export enum AppLinkSize {
  SIZE_S = 'size_s',
  SIZE_M = 'size_m'
}

interface AppLinkProps extends LinkProps {
  className?: string;
  size?: AppLinkSize;
}

const AppLink: FC<AppLinkProps> = (props) => {
  const { className, children, to, size = AppLinkSize.SIZE_S, ...otherProps } = props;

  return (
    <Link to={to} className={classNames(styles.appLink, styles[size], {}, [className])} {...otherProps}>
      {children}
    </Link>
  );
};

export { AppLink };
