import { createSelector } from '@reduxjs/toolkit';
import { getEventsState } from '../getEventsState/getEventsState';

export const getEventsRenderEvents = createSelector(getEventsState, (state) => state?.renderEvents);
