import { FC, memo } from 'react';
import styles from './EventComponent.module.scss';
import classNames from 'classnames';
import { getDateValues } from 'shared/lib/getDateValues/getDateValues';
import { monthNames } from 'shared/lib/constants/constants';

interface EventComponentProps {
  className?: string;
  name?: string;
  date?: string;
  details: string | undefined;
}

const EventComponent = memo(({ className, name, date, details }: EventComponentProps) => {
  const [year, month, day] = getDateValues(new Date(date!));

  return (
    <tr className={classNames(styles.event, {}, [className])}>
      <td>{name}</td>
      <td>{details}</td>
      <td>hsab34b235</td>
      <td>
        {monthNames[month]} {day}, {year}
      </td>
    </tr>
  );
});

export { EventComponent };
