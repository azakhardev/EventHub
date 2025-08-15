import type { Notification } from "../../types/notification";
import Button from "./forms/Button";
import Line from "./Line";
interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  notification: Notification;
}
export default function NotificationCard({
  notification,
  className,
  ...props
}: NotificationCardProps) {
  return (
    <div className="flex flex-col gap-1 px-4 min-w-[300px]" {...props}>
      <h4>
        {new Date(notification.timestamp).toLocaleDateString()} -{" "}
        {new Date(notification.timestamp).toLocaleTimeString()}
      </h4>
      <p className="text-text">{notification.message}</p>
      <div className="flex flex-row justify-between my-1">
        {notification.type.toUpperCase() === "INVITE" &&
          !notification.isRead && (
            <>
              <Button
                onClick={() =>
                  alert("Set is read to true & create event relation")
                }
              >
                Accept
              </Button>
              <Button
                onClick={() => alert("Set is read to true")}
                className="bg-red-500"
              >
                Decline
              </Button>
            </>
          )}
        {notification.type.toUpperCase() !== "DELETE" &&
          notification.type.toUpperCase() !== "INVITE" && (
            <Button onClick={() => alert("Open event dialog")}>View</Button>
          )}
      </div>
      <Line />
    </div>
  );
}
