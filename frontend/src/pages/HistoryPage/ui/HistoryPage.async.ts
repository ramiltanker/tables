import { lazy } from 'react';

const HistoryPageAsync = lazy(async () => await import('./HistoryPage'));

export { HistoryPageAsync as HistoryPage };
