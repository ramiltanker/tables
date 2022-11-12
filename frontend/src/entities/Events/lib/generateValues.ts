import { ResourceValue } from '../model/types/events';

export const generateValues = (values: ResourceValue[] | string[] | undefined) => {
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
};
