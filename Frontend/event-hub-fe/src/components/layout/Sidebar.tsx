import { Calendar, Home, LogOut, Settings, User, Users } from "lucide-react";
import IconButton from "../ui/IconButton";
import { usePageStore } from "../../store/store";
import { useState } from "react";
import ProfileDialog from "../ui/dialogs/Profile/ProfileDialog";
import SettingsDialog from "../ui/dialogs/SettingsDialog";

export default function Sidebar() {
  const { setSelectedPage } = usePageStore();
  const [profileDialogIsOpen, setProfileDialogIsOpen] = useState(false);
  const [settingsDialogIsOpen, setSettingsDialogIsOpen] = useState(false);

  function handleOpenProfileDialog() {
    setProfileDialogIsOpen(true);
  }

  function handleOpenSettingsDialog() {
    setSettingsDialogIsOpen(true);
  }

  return (
    <div className="flex flex-col items-center justify-between bg-surface text-onSurface h-full">
      <div className="flex flex-col items-start gap-8 w-full pl-8 mt-4">
        <h2 className="text-onSurface">EventHub</h2>
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
          icon={<Settings size={32} className="text-onSurface" />}
          onClick={handleOpenSettingsDialog}
          label="Settings"
        />
        <ProfileDialog
          isOpen={profileDialogIsOpen}
          setIsOpen={setProfileDialogIsOpen}
        />
        <SettingsDialog
          isOpen={settingsDialogIsOpen}
          setIsOpen={setSettingsDialogIsOpen}
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
