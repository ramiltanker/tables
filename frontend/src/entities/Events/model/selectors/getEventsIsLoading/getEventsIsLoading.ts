import { createSelector } from '@reduxjs/toolkit';
import { getEventsState } from '../getEventsState/getEventsState';

export const getEventsIsLoading = createSelector(getEventsState, (state) => state?.isLoading);
