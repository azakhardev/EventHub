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
