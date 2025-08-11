import type { Event } from "./event";
export type SELECTED_PAGE = "home" | "calendar" | "friends";

export type THEME = "blue" | "purple" | "black" | "green";

export type LoginResponse = {
  token: string;
  userId: number;
};

export function populateWithReccurenceEvents(
  eventsResponse: Event[] | undefined,
  startDate: Date,
  endDate: Date
): Event[] {
  if (!eventsResponse) return [];

  return eventsResponse;
}
