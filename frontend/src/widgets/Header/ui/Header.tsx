import { FC } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { routes } from 'shared/lib/constants/routes';
import { AppLink, AppLinkSize } from 'shared/ui/AppLink/AppLink';

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={classNames(styles.header, {}, [className])}>
      <div className={styles.wrapper}>
        {routes.map(({ path, text }) => {
          return (
            <AppLink to={path} key={path} size={AppLinkSize.SIZE_M} className={styles.link}>
              {text}
            </AppLink>
          );
        })}
      </div>
    </header>
  );
};

export { Header };
