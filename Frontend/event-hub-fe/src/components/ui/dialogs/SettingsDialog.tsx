import {
  ListboxOption,
  ListboxButton,
  Listbox,
  ListboxOptions,
  Select,
} from "@headlessui/react";
import Dialog from "./Dialog";
import { useThemeStore } from "../../../store/store";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface SettingsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const options = [
  { id: 1, name: "Week" },
  { id: 2, name: "Day" },
  { id: 3, name: "Hour" },
  { id: 4, name: "10 min" },
];

export default function SettingsDialog({
  isOpen,
  setIsOpen,
}: SettingsDialogProps) {
  const { theme, setTheme } = useThemeStore();
  const [selectedReminders, setSelectedReminders] = useState<typeof options>(
    []
  );

  // function selectReminder(value: string){
  //   setSelectedReminders((old)=> [...old, value as (typeof options)])
  // }

  return (
    <Dialog
      title="Settings"
      description="Setup your app"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      height="h-auto"
      className="overflow-visible"
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

      <div className="flex flex-row items-center gap-2 mt-2 mb-6">
        <h4 className="w-auto">Set reminders:</h4>
        <Listbox
          value={selectedReminders}
          onChange={setSelectedReminders}
          multiple
        >
          <div className="flex-1 relative flex flex-col gap-0">
            <ListboxButton className="w-auto p-2 flex flex-row rounded-md cursor-pointer border bg-white justify-between">
              <div>
                {selectedReminders.length === 0
                  ? "Select categories"
                  : selectedReminders.map((s) => s.name).join(", ")}
              </div>
              <ChevronDown />
            </ListboxButton>

            <ListboxOptions className="absolute top-[88%] mt-1 max-h-60 w-full overflow-scroll border-black border-1 bg-white py-1 z-60 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 scrollbar-hide">
              {options.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className="data-focus:bg-blue-100 px-2 cursor-pointer hover:bg-[#2196f3] hover:text-white flex flex-row gap-1"
                >
                  {selectedReminders.includes(option) && <Check />}
                  {option.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </Dialog>
  );
}
