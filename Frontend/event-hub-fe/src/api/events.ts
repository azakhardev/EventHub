import type { User } from "../types/user";
import type { Event } from "../types/event";
import { api } from "../utils/api";

export async function inviteFriends(
  token: string,
  eventId: number,
  selectedFriends: User[]
) {
  const response = await fetch(`${api}/events/${eventId}/invite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedFriends.map((friend) => friend.id)),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
  }

  return response.json();
}

export async function getForeignEvents(
  token: string,
  userId: number,
  page: number,
  requesterId: number
) {
  const response = await fetch(
    `${api}/users/${userId}/foreign-events?page=${page}&pageSize=10&requesterId=${requesterId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
  }

  return await response.json();
}

export async function deleteEvent(token: string, eventId: number) {
  const response = await fetch(`${api}/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let errorMessage: string;
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.message || `An error occured: ${response.status}`;
    } catch {
      errorMessage = `An error occured: ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return { success: true };
  }

  try {
    return await response.json();
  } catch {
    return { success: true };
  }
}

export async function getMyEvents(
  token: string,
  userId: number,
  page: number,
  pageSize: number,
  owned?: boolean,
  important?: boolean,
  isPrivate?: boolean,
  from?: string,
  to?: string,
  expression?: string,
  order?: string
) {
  const response = await fetch(
    `${api}/users/${userId}/my-events?page=${page}&pageSize=${pageSize}&owned=${
      owned ? owned : ""
    }&important=${important ? important : ""}&private=${
      isPrivate ? isPrivate : ""
    }&from=${from}&to=${to}&expression=${expression}&order=${order}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let errorMessage: string;
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.message || `An error occured: ${response.status}`;
    } catch {
      errorMessage = `An error occured: ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function joinEvent(
  token: string,
  userId: number,
  eventId: number,
  eventToken?: string
) {
  const response = await fetch(`${api}/events/${eventId}/join`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId, token: eventToken ?? "" }),
  });

  if (!response.ok) {
    let errorMessage: string;
    try {
      const errorData = await response.json();
      errorMessage =
        errorData.message || `An error occured: ${response.status}`;
    } catch {
      errorMessage = `An error occured: ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return { success: true };
  }
}

export async function createEvent(token: string, userId: number, event: Event) {
  const response = await fetch(`${api}/events/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: event.title,
      body: event.body,
      ownerId: userId,
      startTime: event.startTime,
      endTime: event.endTime,
      place: event.place,
      category: event.category,
      color: event.color,
      public: event.public,
      recurrence: event.recurrence,
      recurrenceEndDate: event.recurrenceEndDate,
    }),
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      throw { general: `An error occurred: ${response.status}` };
    }
    throw errorData;
  }

  return await response.json();
}

export async function editEvent(token: string, userId: number, event: Event) {
  const response = await fetch(`${api}/events/${event.id}/edit`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: event.id,
      title: event.title,
      body: event.body,
      ownerId: userId,
      startTime: event.startTime,
      endTime: event.endTime,
      category: event.category,
      place: event.place,
      color: event.color,
      public: event.public,
      recurrence: event.recurrence,
      recurrenceEndDate: event.recurrenceEndDate,
    }),
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      throw { general: `An error occurred: ${response.status}` };
    }
    throw errorData;
  }

  return await response.json();
}

export async function toggleImportant(
  token: string,
  eventId: number,
  body: { important: boolean; userId: number }
) {
  const response = await fetch(`${api}/events/${eventId}/important`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      throw { general: `An error occurred: ${response.status}` };
    }
    throw errorData;
  }

  return await response.json();
}
