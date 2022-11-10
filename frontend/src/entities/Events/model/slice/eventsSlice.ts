import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEventsData } from '../services/fetchEventsData/fetchEventsData';
import { fetchResourcesByIds } from '../services/fetchResourcesByIds/fetchResourcesByIds';
import {
  EventsResponse,
  EventsSchema,
  EVENT_NAMES_WEIGHT,
  GroupedEvents,
  Names,
  ResourceResponse
} from '../types/events';
import { checkIsSameDate } from 'shared/lib/checkIsSameDate/checkIsSameDate';

const initialState: EventsSchema = {
  events: undefined,
  groupedEvents: undefined,
  renderEvents: undefined,
  resources: undefined,
  isLoading: false,
  error: undefined
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    loadMoreEvents: (state) => {
      if (state.renderEvents!.length !== state.groupedEvents!.length) {
        const begin = state.renderEvents!.length;
        const end = begin + 15;
        state.renderEvents = [...state.renderEvents!, ...state.groupedEvents!.slice(begin, end)];
        // resources.forEach((resource) => {
        //   const eventId = resource.id.split('/')[1];
        //   events?.map((event) => {
        //     const newEventItems = event.items.map((item) => {
        //       if (eventId === item.id) {
        //         return { ...item, details: resource.details };
        //       }
        //       return item;
        //     });
        //     console.log(newEventItems);
        //     return { ...event, items: newEventItems };
        //   });
        // });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsData.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchEventsData.fulfilled, (state, action: PayloadAction<EventsResponse>) => {
        state.isLoading = false;
        state.events = action.payload.items;

        const timeSortedArr = state.events.sort((a, b) => {
          const isAppointmentA = a.appointmentId ? 1 : 0;
          const isAppointmentB = b.appointmentId ? 1 : 0;
          const Date1 = new Date(a.date).getTime();
          const Date2 = new Date(b.date).getTime();
          if (isAppointmentA > isAppointmentB) return -1;
          if (Date1 > Date2) return -1;
          if (Date1 < Date2) return 1;
          if (EVENT_NAMES_WEIGHT[a.name] > EVENT_NAMES_WEIGHT[b.name] && Date1 < Date2) return -1;
          if (EVENT_NAMES_WEIGHT[a.name] < EVENT_NAMES_WEIGHT[b.name]) return 1;
          return 0;
        });

        const groupedSortedArr = timeSortedArr.reduce((prev: GroupedEvents[], item) => {
          const groupedEvent = prev.find((groupedEvent) => {
            const isSameDate = checkIsSameDate(new Date(item.date), new Date(groupedEvent.items[0].date));
            return groupedEvent.name === item.name && groupedEvent.items.length !== 15 && isSameDate;
          });
          if (groupedEvent) {
            groupedEvent.items.push(item);
          } else {
            prev.push({ name: item.name, items: [item] });
          }
          return prev;
        }, []);

        state.groupedEvents = groupedSortedArr;
        state.renderEvents = groupedSortedArr.slice(0, 15);
      })

      .addCase(fetchEventsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchResourcesByIds.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchResourcesByIds.fulfilled, (state, action: PayloadAction<ResourceResponse>) => {
        state.isLoading = false;
        state.resources = action.payload.items;
        let newRenderEvents: GroupedEvents[] | undefined;
        // state.renderEvents = state.renderEvents?.map((event) => {
        //   event.items.map((item) => {
        //     const event = state.resources?.find((event) => {
        //       const eventId = event.id.split('/')[1];
        //       if (eventId === item.id) {
        //         return event;
        //       }
        //       return event;
        //     });
        //     return { ...item, details: event?.details };
        //   });
        //   return event;
        // });

        console.log(state.resources);
      })
      .addCase(fetchResourcesByIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { actions: eventsActions } = eventsSlice;
export const { reducer: eventsReducer } = eventsSlice;
