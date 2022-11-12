import { memo } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { EventComponent } from '../EventComponent/EventComponent';
import { GroupedEvents } from 'entities/Events/model/types/events';

interface TableProps {
  className?: string;
  renderItems: GroupedEvents[] | undefined;
}

const Table = memo(({ className, renderItems }: TableProps) => {
  return (
    <div className={classNames(styles.table, {}, [className])}>
      <table>
        <thead>
          <tr>
            <th>Event type</th>
            <th>Details</th>
            <th>Code</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {renderItems?.map(({ name, items }) => {
            return items.map((item, index) => {
              return <EventComponent key={item.id} index={index} item={item} />;
            });
          })}
        </tbody>
      </table>
    </div>
  );
});

export { Table };
