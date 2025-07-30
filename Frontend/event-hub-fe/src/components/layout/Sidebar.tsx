import { Calendar, Home, LogOut, Settings, User, Users } from "lucide-react";
import IconButton from "../ui/IconButton";
import { usePageStore } from "../../store/store";
import { useState } from "react";
import ProfileDialog from "../ui/dialogs/ProfileDialog";

export default function Sidebar() {
  const { setSelectedPage } = usePageStore();
  const [profileDialogIsOpen, setProfileDialogIsOpen] = useState(false);

  function handleOpenProfileDialog() {
    setProfileDialogIsOpen(true);
  }

  return (
    <div className="flex flex-col items-center justify-between bg-surface text-onSurface h-full">
      <div className="flex flex-col items-start gap-8 w-full pl-8 mt-4">
        <h2>EventHub</h2>
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
          onClick={handleOpenProfileDialog}
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
        <ProfileDialog
          isOpen={profileDialogIsOpen}
          setIsOpen={setProfileDialogIsOpen}
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
