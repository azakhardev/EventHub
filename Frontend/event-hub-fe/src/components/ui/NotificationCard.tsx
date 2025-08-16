import { useMutation } from "@tanstack/react-query";
import type { Notification } from "../../types/notification";
import Button from "./forms/Button";
import Line from "./Line";
import { acceptInvitation, updateStatus } from "../../api/notifications";
import { useUserStore } from "../../store/store";
import { toast } from "react-toastify";
import { queryClient } from "../../main";
import { useState } from "react";
import PulsingDot from "./loaders/PulsingDot";

interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  notification: Notification;
}
export default function NotificationCard({
  notification,
  className,
  ...props
}: NotificationCardProps) {
  const { token } = useUserStore();

  const [isRead, setIsRead] = useState(notification.isRead);

  const { mutate: acceptMutation } = useMutation({
    mutationFn: async () => acceptInvitation(token, notification.id),
    onSuccess: () => {
      setIsRead(true);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("You accepted the invitation");
    },
    onError: (e) => {
      toast.error("Failed to accept invitation: " + e.message);
    },
  });

  const { mutate: mutateStatus } = useMutation({
    mutationFn: async () => updateStatus([notification.id], token),
    onSuccess: () => {
      setIsRead(true);
    },
  });

  function handleMouseOver() {
    if (!isRead && notification.type.toUpperCase() !== "INVITE") {
      mutateStatus();
    }
  }

  return (
    <div
      className="relative flex flex-col gap-1 px-4 min-w-[300px]"
      onMouseOverCapture={handleMouseOver}
      {...props}
    >
      <h4>
        {new Date(notification.timestamp).toLocaleDateString()} -{" "}
        {new Date(notification.timestamp).toLocaleTimeString()}
      </h4>
      <p className="text-text">{notification.message}</p>
      {!isRead && (
        <div className="absolute top-1 right-4">
          <PulsingDot />
        </div>
      )}
      <div className="flex flex-row justify-between my-1">
        {notification.type.toUpperCase() === "INVITE"
          ? !isRead && (
              <>
                <Button
                  onClick={() => {
                    acceptMutation();
                  }}
                >
                  Accept
                </Button>
                <Button onClick={() => mutateStatus()} className="bg-red-500">
                  Decline
                </Button>
              </>
            )
          : notification.type.toUpperCase() !== "DELETE" && (
              <Button onClick={() => alert("Open event dialog")}>View</Button>
            )}
      </div>
      <Line />
    </div>
  );
}
