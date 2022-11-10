import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { EventItem, ResourceResponse } from '../../types/events';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const fetchResourcesByIds = createAsyncThunk<ResourceResponse, string[], ThunkConfig<string>>(
  'profile/fetchResourcesByIds',
  async (ids, { rejectWithValue, dispatch, extra }) => {
    try {
      const response = await extra.api.post<ResourceResponse>('/resources', { ids });

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
