import { FC, useCallback, useEffect, useState } from 'react';
import styles from './Table.module.scss';
import classNames from 'classnames';
import { EventComponent } from '../EventComponent/EventComponent';
import { useSelector } from 'react-redux';
import { getEventsRenderEvents } from 'entities/Events/model/selectors/getEventsRenderEvents/getEventsRenderEvents';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { eventsActions } from 'entities/Events/model/slice/eventsSlice';
import { Loader } from 'widgets/Loader';
import { getEventsResources } from 'entities/Events/model/selectors/getEventsResources/getEventsResources';
import { GroupedEvents } from 'entities/Events/model/types/events';

interface TableProps {
  className?: string;
}

const Table: FC<TableProps> = ({ className }) => {
  const events = useSelector(getEventsRenderEvents);
  const resources = useSelector(getEventsResources);
  const [renderItems, setRenderItems] = useState(events);

  const dispatch = useAppDispatch();

  const scrollHandler = useCallback(() => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 10) {
      dispatch(eventsActions.loadMoreEvents());
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  useEffect(() => {
    const newRenderItems = events?.map((event) => {
      const newItems = event.items.map((item) => {
        const resource = resources?.find((resourceItem) => {
          const eventId = resourceItem.id.split('/')[1];
          return eventId === item.id;
        });
        if (resource) {
          return { ...item, details: resource.details, code: resource.code, values: resource.values };
        }
        return item;
      });
      return { ...event, items: newItems };
    });

    setRenderItems(newRenderItems);
  }, [events, resources]);

  return (
    <div className={classNames(styles.table, {}, [className])}>
      {renderItems?.length
        ? (
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
          )
        : (
          <Loader />
          )}
    </div>
  );
};

export { Table };
