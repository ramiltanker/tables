import { FC } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames';

interface HomePageProps {
  className?: string;
}

const HomePage: FC<HomePageProps> = ({ className }) => {
  return <div className={classNames(styles.HomePage, {}, [className])}></div>;
};

export default HomePage;
