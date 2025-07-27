import { Calendar, Home, LogOut, Settings, User, Users } from "lucide-react";
import IconButton from "../ui/IconButton";
import { usePageStore } from "../../store/store";

export default function Sidebar() {
  const { setSelectedPage } = usePageStore();
  return (
    <div className="flex flex-col items-center justify-between bg-surface text-onSurface h-full">
      <div className="flex flex-col items-start gap-8 w-full pl-8 mt-4">
        <div className="text-[36px] font-bold">EventHub</div>
        <IconButton
          icon={<Home size={32} className="text-onSurface" />}
          onClick={() => setSelectedPage("home")}
          label="Home"
        />
        <IconButton
          icon={<Calendar size={32} className="text-onSurface" />}
          onClick={() => setSelectedPage("calendar")}
          label="Calendar"
        />
        <IconButton
          icon={<User size={32} className="text-onSurface" />}
          onClick={() => alert("open profile dialog")}
          label="Profile"
        />
        <IconButton
          icon={<Users size={32} className="text-onSurface" />}
          onClick={() => setSelectedPage("friends")}
          label="Friends"
        />
        <IconButton
          icon={<Settings size={32} className="text-onSurface" />}
          onClick={() => {
            alert("open settings dialog");
          }}
          label="Settings"
        />
      </div>
      <div className="mb-8">
        <IconButton
          icon={<LogOut size={32} className="text-onSurface" />}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          label="Logout"
        />
      </div>
    </div>
  );
}
