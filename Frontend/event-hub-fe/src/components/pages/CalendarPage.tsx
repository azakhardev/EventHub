import { useFilterStore } from "../../store/store";
import Filter from "../ui/Filter";

export default function CalendarPage() {
  const { filter } = useFilterStore();

  return (
    <div className="flex flex-col w-full">
      <Filter onFilter={() => console.log("Filtering by filter:", filter)} />
      CalendarPage
    </div>
  );
}
