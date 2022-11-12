import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EventsResponse } from '../../types/events';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchEventsData = createAsyncThunk<EventsResponse, void, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, { rejectWithValue, dispatch, extra }) => {
    try {
      const response = await extra.api.post<EventsResponse>('/events');

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  }
);
