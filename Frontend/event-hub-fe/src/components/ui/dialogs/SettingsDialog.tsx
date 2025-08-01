import { Select } from "@headlessui/react";
import Dialog from "./Dialog";
import { useThemeStore } from "../../../store/store";

interface SettingsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SettingsDialog({
  isOpen,
  setIsOpen,
}: SettingsDialogProps) {
  const { theme, setTheme } = useThemeStore();

  return (
    <Dialog
      title="Settings"
      description="Setup your app"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      height="h-auto"
    >
      <div className="flex flex-row items-center gap-2 mt-2 mb-6">
        <h4 className="w-auto">Select themes:</h4>
        <Select
          name="theme"
          aria-label="Web Theme"
          className="flex-1 w-auto p-2 rounded-md cursor-pointer border"
          onChange={(e) => {
            setTheme(e.target.value as "green" | "purple" | "blue" | "black");
            localStorage.setItem("theme", e.target.value);
          }}
          value={theme}
        >
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
        </Select>
      </div>
    </Dialog>
  );
}
