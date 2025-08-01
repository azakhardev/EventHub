import type { User } from "../types/user";

const api = import.meta.env.VITE_API_URL;

export async function pinFriend(
  followedUserId: number,
  pinned: boolean,
  followerId: number,
  token: string
) {
  const response = await fetch(`${api}/users/pin-follower`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      followedUserId: followedUserId,
      pinned: pinned,
      followerId: followerId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to pin friend");
  }

  return await response.json();
}

export async function addFriend(
  userId: number,
  token: string,
  followToken: string,
  followedUserId: number
) {
  const response = await fetch(`${api}/users/${userId}/add-friend`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      followToken: followToken,
      followedUserId: followedUserId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add friend");
  }

  return await response.json();
}

export async function removeFriend(
  userId: number,
  token: string,
  followedUserId: number
) {
  const response = await fetch(
    `${api}/users/${userId}/remove-friend/${followedUserId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove friend");
  }

  return await response.json();
}

export async function getParticipants(token: string, eventId: number) {
  const response = await fetch(`${api}/events/${eventId}/participants`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

export async function getFriends(
  userId: number,
  token: string,
  expression: string
) {
  const response = await fetch(
    `${api}/users/${userId}/following?expression=${expression}`,
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

  return response.json();
}
