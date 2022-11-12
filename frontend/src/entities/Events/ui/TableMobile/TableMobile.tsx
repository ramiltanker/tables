import { memo } from 'react';
import styles from './TableMobile.module.scss';
import classNames from 'classnames';
import { GroupedEvents } from 'entities/Events/model/types/events';
import { EventComponentMobile } from '../EventComponentMobile/EventComponentMobile';

interface TableMobileProps {
  className?: string;
  renderItems: GroupedEvents[] | undefined;
}

const TableMobile = memo(({ className, renderItems }: TableMobileProps) => {
  return (
    <div className={classNames(styles.tableMobile, {}, [className])}>
      <div className={styles.wrapper}>
        {renderItems?.map(({ name, items }, index) => {
          return <EventComponentMobile key={index} index={index} items={items} />;
        })}
      </div>
    </div>
  );
});

export { TableMobile };
