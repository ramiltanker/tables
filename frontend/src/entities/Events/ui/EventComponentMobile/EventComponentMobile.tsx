import React, { FC, memo, useCallback } from 'react';
import styles from './EventComponentMobile.module.scss';
import classNames from 'classnames';
import { getDateValues } from 'shared/lib/getDateValues/getDateValues';
import { monthNames } from 'shared/lib/constants/constants';
import { EventItem, ResourceValue } from 'entities/Events/model/types/events';
import { generateValues } from '../../lib/generateValues';

interface EventComponentMobileProps {
  className?: string;
  items: EventItem[];
  index: number;
}

const EventComponentMobile = memo(({ className, items, index }: EventComponentMobileProps) => {
  return (
    <div className={classNames(styles.event, [className])}>
      {items.map(({ id, date, name, resource, code, details, values }, index) => {
        const isHeader = index === 0;
        const eventName = isHeader ? name : '';
        const valuesString = generateValues(values);

        const [year, month, day] = getDateValues(new Date(date));

        return (
          <React.Fragment key={id}>
            {isHeader && (
              <div className={styles.header}>
                <p className={classNames(styles.eventName, { [styles[name.toLowerCase()]]: name }, [className])}>
                  {eventName}
                </p>
                <p className={classNames(styles.text, {}, [className])}>
                  {monthNames[month]} {day}, {year}
                </p>
              </div>
            )}
            <div className={styles.main}>
              <p className={styles.text}>
                {details}
                {valuesString !== '' ? `: ${valuesString}` : ''}
              </p>
              <p className={styles.code}>{code}</p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
});

export { EventComponentMobile };
