import { FC, Suspense } from 'react';
import classNames from 'classnames';
import { AppRouter } from './providers/router';
import { Header } from 'widgets/Header/ui/Header';

const App = () => {
  return (
    <div className={classNames('app', {}, [])}>
      <Suspense fallback="loading">
        <Header />
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
