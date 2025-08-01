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
