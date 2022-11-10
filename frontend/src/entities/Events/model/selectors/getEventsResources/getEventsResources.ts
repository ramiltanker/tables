import { createSelector } from '@reduxjs/toolkit';
import { getEventsState } from '../getEventsState/getEventsState';

export const getEventsResources = createSelector(getEventsState, (state) => state?.resources);
