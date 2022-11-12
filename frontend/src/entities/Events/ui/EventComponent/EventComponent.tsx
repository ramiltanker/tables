import { FC, memo, useCallback } from 'react';
import styles from './EventComponent.module.scss';
import classNames from 'classnames';
import { getDateValues } from 'shared/lib/getDateValues/getDateValues';
import { monthNames } from 'shared/lib/constants/constants';
import { EventItem, ResourceValue } from 'entities/Events/model/types/events';

interface EventComponentProps {
  className?: string;
  item: EventItem;
  index: number;
}

const EventComponent = memo(({ className, item, index }: EventComponentProps) => {
  const { name, details, code, date, values } = item;

  const [year, month, day] = getDateValues(new Date(date));

  const nameMods = {
    [styles[name.toLowerCase()]]: name,
    [styles.eventName]: index === 0
  };

  const dateMods = {
    [styles.boldDate]: index === 0,
    [styles.normalDate]: index !== 0
  };

  const generateValues = useCallback(() => {
    if (values) {
      return values
        .map((item) => {
          if (typeof item === 'object') {
            return `${item.value} ${item.unit}`;
          } else {
            return item === '---' ? '' : item;
          }
        })
        .join('');
    }
    return '';
  }, [values]);

  return (
    <tr className={classNames(styles.event, [className])} style={{ borderTop: index !== 0 ? 0 : '' }}>
      <td>
        <p className={classNames('', nameMods, [className])}>{index === 0 ? name : ''}</p>
      </td>
      <td>
        {details}
        {generateValues() !== '' ? `: ${generateValues()}` : ''}
      </td>
      <td>{code}</td>
      <td>
        <p className={classNames('', dateMods, [className])}>
          {monthNames[month]} {day}, {year}
        </p>
      </td>
    </tr>
  );
});

export { EventComponent };
