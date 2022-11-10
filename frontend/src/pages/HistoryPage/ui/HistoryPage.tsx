import { FC, useEffect } from 'react';
import styles from './HistoryPage.module.scss';
import classNames from 'classnames';
import { Table } from 'entities/Events';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { eventsReducer } from 'entities/Events/model/slice/eventsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchEventsData } from 'entities/Events/model/services/fetchEventsData/fetchEventsData';
import { getEventsRenderEvents } from 'entities/Events/model/selectors/getEventsRenderEvents/getEventsRenderEvents';
import { useSelector } from 'react-redux';
import { fetchResourcesByIds } from 'entities/Events/model/services/fetchResourcesByIds/fetchResourcesByIds';

interface HistoryPageProps {
  className?: string;
}

const initialReducers: ReducersList = {
  events: eventsReducer
};

const HistoryPage: FC<HistoryPageProps> = ({ className }) => {
  const events = useSelector(getEventsRenderEvents);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEventsData());
  }, [dispatch]);

  useEffect(() => {
    const ids = events
      ?.map(({ items }) => {
        return items.map(({ id, name }) => {
          return `${name}/${id}`;
        });
      })
      .reduce((prev, arr) => {
        return [...prev, ...arr];
      }, []);
    if (ids?.length) dispatch(fetchResourcesByIds(ids));
  }, [events, dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(styles.historyPage, {}, [className])}>
        <Table />
      </div>
    </DynamicModuleLoader>
  );
};

export default HistoryPage;
