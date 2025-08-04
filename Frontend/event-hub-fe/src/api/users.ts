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

  if (response.status === 200) {
    try {
      const friendId = await response.json();
      return { success: true, friendId };
    } catch {
      return { success: true };
    }
  }

  try {
    return await response.json();
  } catch {
    return { success: true };
  }
}

export async function removeFollower(
  userId: number,
  token: string,
  followerId: number
) {
  const response = await fetch(
    `${api}/users/${userId}/remove-follower/${followerId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return { success: true };
}

export async function getParticipants(
  token: string,
  eventId: number,
  page: number
) {
  const response = await fetch(
    `${api}/events/${eventId}/participants?page=${page}&pageSize=15`,
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

export async function getFriends(
  userId: number,
  token: string,
  expression: string,
  pageParam: number
) {
  const response = await fetch(
    `${api}/users/${userId}/following?expression=${expression}&page=${pageParam}&pageSize=15`,
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
