import { createSelector } from '@reduxjs/toolkit';
import { getEventsState } from '../getEventsState/getEventsState';

export const getEventsGroupedEvents = createSelector(getEventsState, (state) => state?.groupedEvents);
