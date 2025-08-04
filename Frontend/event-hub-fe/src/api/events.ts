import type { User } from "../types/user";
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
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

export async function getForeignEvents(
  token: string,
  userId: number,
  page: number
) {
  const response = await fetch(
    `${api}/users/${userId}/foreign-events?page=${page}&pageSize=10`,
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
      errorData.message || `HTTP error! status: ${response.status}`
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
        errorData.message || `HTTP error! status: ${response.status}`;
    } catch {
      errorMessage = `HTTP error! status: ${response.status}`;
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
