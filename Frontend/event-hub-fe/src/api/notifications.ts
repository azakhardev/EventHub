const api = import.meta.env.VITE_API_URL;

export async function updateStatus(notificationIds: number[], token: string) {
  const response = await fetch(`${api}/notifications/update-status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationIds),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `An error occured: ${response.status}`
    );
  }

  return { success: true };
}

export async function acceptInvitation(token: string, notificationId: number) {
  const response = await fetch(
    `${api}/notifications/${notificationId}/accept`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

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
