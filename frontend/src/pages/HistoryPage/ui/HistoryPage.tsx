import { memo, useCallback, useEffect, useState } from 'react';
import styles from './HistoryPage.module.scss';
import classNames from 'classnames';
import { Table } from 'entities/Events';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { eventsActions, eventsReducer } from 'entities/Events/model/slice/eventsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchEventsData } from 'entities/Events/model/services/fetchEventsData/fetchEventsData';
import { getEventsRenderEvents } from 'entities/Events/model/selectors/getEventsRenderEvents/getEventsRenderEvents';
import { useSelector } from 'react-redux';
import { fetchResourcesByIds } from 'entities/Events/model/services/fetchResourcesByIds/fetchResourcesByIds';
import { TableMobile } from 'entities/Events/ui/TableMobile/TableMobile';
import { getEventsResources } from 'entities/Events/model/selectors/getEventsResources/getEventsResources';
import { getEventsIsLoading } from 'entities/Events/model/selectors/getEventsIsLoading/getEventsIsLoading';
import { Loader } from 'widgets/Loader';
import { Text, TextColor } from 'shared/ui/Text/Text';

interface HistoryPageProps {
  className?: string;
}

const initialReducers: ReducersList = {
  events: eventsReducer
};

const HistoryPage = memo(({ className }: HistoryPageProps) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const events = useSelector(getEventsRenderEvents);
  const [renderItems, setRenderItems] = useState(events);
  const resources = useSelector(getEventsResources);
  const isLoading = useSelector(getEventsIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEventsData());
  }, [dispatch]);

  useEffect(() => {
    const ids = events
      ?.map(({ items }) => {
        return items.map(({ id, resource }) => {
          return `${resource}/${id}`;
        });
      })
      .reduce((prev, arr) => {
        return [...prev, ...arr];
      }, []);
    if (ids?.length) dispatch(fetchResourcesByIds(ids));
  }, [dispatch, events]);

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      setScreenWidth(window.screen.width);
    });

    return () => {
      window.removeEventListener('resize', (e) => {
        setScreenWidth(window.screen.width);
      });
    };
  }, []);

  useEffect(() => {
    const newRenderItems = events?.map((event) => {
      const newItems = event.items.map((item) => {
        const resource = resources?.find((resourceItem) => {
          const eventId = resourceItem.id.split('/')[1];
          return eventId === item.id;
        });
        if (resource) {
          const details = resource.details === '---' ? '' : resource.details;
          return { ...item, details, code: resource.code, values: resource.values };
        }
        return item;
      });
      return { ...event, items: newItems };
    });

    setRenderItems(newRenderItems);
  }, [events, resources]);

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
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(styles.historyPage, {}, [className])}>
        {renderItems?.length
          ? (
            <>{screenWidth > 768 ? <Table renderItems={renderItems} /> : <TableMobile renderItems={renderItems} />}</>
            )
          : isLoading
            ? (
              <Loader />
              )
            : (
              <Text color={TextColor.RED} className={styles.error}>
                Произошла ошибка при загрузки данных
              </Text>
              )}
      </div>
    </DynamicModuleLoader>
  );
});

export default HistoryPage;
