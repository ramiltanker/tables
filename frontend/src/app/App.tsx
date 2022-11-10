import { FC, Suspense } from 'react';
import classNames from 'classnames';
import { AppRouter } from './providers/router';

const App = () => {
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="loading">
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
