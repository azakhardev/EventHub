import { Bell } from "lucide-react";

export default function NotificationsButton() {
  return (
    <div className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover">
      <Bell size={28} className="text-onSurface" />
    </div>
  );
}
