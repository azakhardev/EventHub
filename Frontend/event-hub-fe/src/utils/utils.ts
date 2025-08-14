import type { Event } from "../types/event";

export function combineString(strings: (string | undefined)[]) {
  return strings.join(" ");
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (e) {
    return true;
  }
}

export function populateWithReccurenceEvents(
  eventsResponse: Event[] | undefined,
  startDate: Date,
  endDate: Date
): Event[] {
  if (!eventsResponse) return [];

  return eventsResponse;
}

export function formatForDatetimeLocal(
  utcDateString: string | undefined
): string {
  if (utcDateString === undefined) {
    utcDateString = new Date().toISOString();
  }

  const date = new Date(utcDateString);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 19);
}
