const api = import.meta.env.VITE_API_URL;

export async function updateStatus(token: string, notificationIds: number[]) {
  const response = await fetch(`${api}/notifications/update-status`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationIds),
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      throw new Error(`An error occurred: ${response.status}`);
    }
    throw new Error(
      errorData.message || `An error occurred: ${response.status}`
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
      throw new Error(`An error occurred: ${response.status}`);
    }
    throw new Error(
      errorData.message || `An error occurred: ${response.status}`
    );
  }

  return await response.json();
}

export async function deleteNotification(
  token: string,
  notificationId: number
) {
  const response = await fetch(`${api}/notifications/${notificationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      throw new Error(`An error occurred: ${response.status}`);
    }
    throw new Error(
      errorData.message || `An error occurred: ${response.status}`
    );
  }

  return { success: true };
}
