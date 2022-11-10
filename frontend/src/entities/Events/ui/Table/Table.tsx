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

  return (
    <div className={classNames(styles.table, {}, [className])}>
      {events?.length
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
              {events?.map(({ name, items }) => {
                return items.map(({ id, date, details }, index) => {
                  return <EventComponent key={id} name={index === 0 ? name : ''} date={date} details={details} />;
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
