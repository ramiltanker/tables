import { HistoryPage } from 'pages/HistoryPage/ui/HistoryPage.async';
import { HomePageAsync } from 'pages/HomePage/ui/HomePage.async';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  HOME_PAGE = 'main',
  HISTORY_PAGE = 'history',
  NOT_FOUND = 'not-found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME_PAGE]: '/',
  [AppRoutes.HISTORY_PAGE]: '/history',
  [AppRoutes.NOT_FOUND]: '*'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME_PAGE]: {
    path: RoutePath.main,
    element: <HomePageAsync />
  },
  [AppRoutes.HISTORY_PAGE]: {
    path: RoutePath.history,
    element: <HistoryPage />
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath['not-found'],
    element: <></>
  }
};
