import { usePageStore } from "../../store/store";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/CalendarPage";
import FriendsPage from "../pages/FriendsPage";

export default function Content() {
  const { selectedPage } = usePageStore();

  return (
    <main className="mx-16 mt-8 overflow-y-scroll max-h-[calc(100vh-2rem)] scrollbar-hide">
      {selectedPage === "home" && <HomePage />}
      {selectedPage === "calendar" && <CalendarPage />}
      {selectedPage === "friends" && <FriendsPage />}
    </main>
  );
}
