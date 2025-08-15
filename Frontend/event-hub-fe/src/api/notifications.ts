const api = import.meta.env.VITE_API_URL;

export async function updateStatus(notificationIds: number[], token: string) {
  const response = await fetch(`${api}/notifications/update-status`, {
    method: "POST",
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
