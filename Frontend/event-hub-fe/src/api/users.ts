import type { User } from "../types/user";

const api = import.meta.env.VITE_API_URL;

export async function pinFriend(
  followedUserId: number,
  pinned: boolean,
  followerId: number,
  token: string
) {
  const response = await fetch(`${api}/users/pin-followed`, {
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
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
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
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
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
        errorData.message || `An error occured: ${response.status}`;
    } catch {
      errorMessage = `An error occured: ${response.status}`;
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
      errorData.message || `An error occured: ${response.status}`
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
      errorData.message || `An error occured: ${response.status}`
    );
  }

  return response.json();
}

export async function getFollowers(
  userId: number,
  token: string,
  expression: string,
  pageParam: number
) {
  const response = await fetch(
    `${api}/users/${userId}/followers?expression=${expression}&page=${pageParam}&pageSize=15`,
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

  return response.json();
}

export async function editProfile(userId: number, token: string, user: User) {
  const response = await fetch(`${api}/users/${userId}/edit-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      profile_picture_url: user.profilePictureUrl,
      proffesion: user.proffesion,
      about: user.about,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
  }

  return { success: true };
}

export async function changePassword(
  userId: number,
  token: string,
  currentPassword: string,
  newPassword: string
) {
  const response = await fetch(`${api}/users/${userId}/change-password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword: currentPassword,
      newPassword: newPassword,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
  }

  return { success: true };
}

export async function getNotifications(
  userId: number,
  token: string,
  page: number
) {
  const response = await fetch(
    `${api}/users/${userId}/notifications?page=${page}&pageSize=20`,
    {
      method: "GET",
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

  return response.json();
}
