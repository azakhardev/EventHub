import type { Notification } from "../../types/notification";
import Button from "./forms/Button";
interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  notification: Notification;
}
export default function NotificationCard({
  notification,
  className,
  ...props
}: NotificationCardProps) {
  return (
    <div className="flex flex-col gap-1" {...props}>
      <h4>
        {new Date(notification.timestamp).toDateString()} -{" "}
        {new Date(notification.timestamp).toTimeString()}
      </h4>
      <p>{notification.message}</p>
      <div className="flex flex-row justify-between my-1">
        {notification.type.toLowerCase() === "invite" && (
          <>
            <Button>Accept</Button>
            <Button>Decline</Button>
          </>
        )}
      </div>
    </div>
  );
}
