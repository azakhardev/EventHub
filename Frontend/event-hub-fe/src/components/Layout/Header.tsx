import IconButton from "../ui/IconButton";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full bg-surface text-onSurface h-[100px] px-4">
      <div></div>
      <div className="text-[48px] font-bold">EventHub</div>
      <div className="text-[24px] flex flex-row items-center gap-4">
        <div>
          {new Date().toLocaleDateString("en-EU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <IconButton
          className="hover:bg-primary"
          icon={<Bell size={32} />}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
