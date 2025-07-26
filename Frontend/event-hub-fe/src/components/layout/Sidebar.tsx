import { Calendar, LogOut, Settings, User } from "lucide-react";
import IconButton from "../ui/IconButton";

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center justify-between bg-surface text-onSurface h-full">
      <div className="flex flex-col gap-12 mt-28">
        <IconButton
          className="hover:bg-primary"
          icon={<Settings size={32} className="text-onSurface" />}
          onClick={() => {}}
        />
        <IconButton
          className="hover:bg-primary"
          icon={<Calendar size={32} className="text-onSurface" />}
          onClick={() => {}}
        />
        <IconButton
          className="hover:bg-primary"
          icon={<User size={32} className="text-onSurface" />}
          onClick={() => {}}
        />
      </div>
      <div className="mb-8">
        <IconButton
          className="hover:bg-primary"
          icon={<LogOut size={32} className="text-onSurface" />}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
