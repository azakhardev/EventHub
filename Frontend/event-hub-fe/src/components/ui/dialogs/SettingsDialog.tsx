import {
  ListboxOption,
  ListboxButton,
  Listbox,
  ListboxOptions,
  Select,
} from "@headlessui/react";
import Dialog from "./Dialog";
import { useThemeStore } from "../../../store/store";
import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Interval } from "../../../types/helpers";

interface SettingsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const options: Interval[] = [
  { id: 1, value: "Week", interval: 1000 * 60 * 60 * 24 * 7 },
  { id: 2, value: "Day", interval: 1000 * 60 * 60 * 24 },
  { id: 3, value: "Hour", interval: 1000 * 60 * 60 },
  { id: 4, value: "10 min", interval: 1000 * 60 * 10 },
];

export default function SettingsDialog({
  isOpen,
  setIsOpen,
}: SettingsDialogProps) {
  const { theme, setTheme } = useThemeStore();
  const [selectedReminders, setSelectedReminders] = useState<typeof options>(
    []
  );

  useEffect(() => {
    const reminders = JSON.parse(
      localStorage.getItem("reminders-interval") ?? "[]"
    );
    setSelectedReminders(reminders);
  }, []);

  function selectReminders(reminders: Interval[]) {
    localStorage.setItem("reminders-interval", JSON.stringify(reminders));
    setSelectedReminders(reminders);
  }

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
        <Listbox value={selectedReminders} onChange={selectReminders} multiple>
          <div className="flex-1 relative flex flex-col gap-0 overflow-visible">
            <ListboxButton
              className="w-auto p-2 flex flex-row rounded-md cursor-pointer border bg-white justify-between"
              as="button"
            >
              <div>
                {selectedReminders.length === 0
                  ? "Select categories"
                  : selectedReminders.map((s) => s.value).join(", ")}
              </div>
              <ChevronDown />
            </ListboxButton>

            <ListboxOptions
              className="w-[25vw] overflow-scroll border-black border-1 bg-white py-1 shadow-lg focus:outline-none"
              anchor="bottom"
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.id}
                  value={option}
                  className="px-2 cursor-pointer data-[focus]:bg-[#2196f3] data-[focus]:text-white flex flex-row gap-1"
                >
                  {selectedReminders.some((r) => r.id === option.id) && (
                    <Check />
                  )}
                  {option.value}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </Dialog>
  );
}
