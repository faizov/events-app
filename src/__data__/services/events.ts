import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Events } from './types'

export interface Event {
  id: string;
  title: string;
  image: string;
  author: string;
  authorAvatar: string;
  dateCreate: Date;
  dateEvent: [];
  likes: number;
}

type EventsResponse = Event[];

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6338577a132b46ee0bee7f64.mockapi.io/api/v1/"
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, void>({
      query: () => "events",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Events", id } as const)),
              { type: "Events", id: "LIST" }
            ]
          : [{ type: "Events", id: "LIST" }]
    }),
    getEventById: builder.query({
      query: (id) => `events/${id}`,
      providesTags: (result, error, id) => [{ type: "Events", id }]
    }),
    addEvent: builder.mutation<Event, Partial<Event>>({
      query(body) {
        return {
          url: `events`,
          method: "POST",
          body
        };
      },
      invalidatesTags: [{ type: "Events", id: "LIST" }]
    }),
    updateEvent: builder.mutation<void, Partial<Event>>({
      query({ id, ...patch }) {
        return {
          url: `events/${id}`,
          method: "PUT",
          body: patch
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Events", id }]
    }),
    deleteEvent: builder.mutation<void, string>({
      query(id) {
        return {
          url: `events/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: [{ type: "Events", id: "LIST" }]
    })
  })
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation
} = eventsApi;
