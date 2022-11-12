import { FC, memo } from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames';

interface HomePageProps {
  className?: string;
}

const HomePage = memo(({ className }: HomePageProps) => {
  return (
    <div className={classNames(styles.homePage, {}, [className])}>
      <p className={styles.text}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, fugiat vitae totam eos mollitia vel debitis
        facilis error dolore, nihil natus ratione nam nesciunt, quod id perferendis culpa. Praesentium tenetur aut
        voluptatibus quae, soluta ad provident officia in quod, sit, excepturi ut vitae animi atque assumenda quos ex.
        Distinctio aspernatur reiciendis magni tenetur sequi, facere molestias illum quos doloribus blanditiis aut
        voluptas mollitia expedita soluta consequatur laboriosam quas ipsa. Necessitatibus sequi officiis quia nobis
        distinctio soluta voluptatum, consectetur nesciunt illum quidem et dolor mollitia aliquam aperiam, id cum, qui
        nam inventore? Illum laudantium natus nulla ea laborum pariatur nam voluptates?
      </p>
    </div>
  );
});

export default HomePage;
