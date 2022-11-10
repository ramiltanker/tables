import { FC, memo } from 'react';
import styles from './PageError.module.scss';
import classNames from 'classnames';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextColor, TextSize } from 'shared/ui/Text/Text';

interface PageErrorProps {}

const PageError = memo((props: PageErrorProps) => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames('')}>
      <Text size={TextSize.SIZE_M} color={TextColor.BLACK}>
        Произошла непредвиденная ошибка
      </Text>
      <Button onClick={reloadPage} type="button">
        <Text size={TextSize.SIZE_M} color={TextColor.BLACK}>
          Обновить страницу
        </Text>
      </Button>
    </div>
  );
});

export { PageError };
