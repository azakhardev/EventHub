import { usePageStore } from "../../store/store";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/CalendarPage";
import FriendsPage from "../pages/FriendsPage";

export default function Content() {
  const { selectedPage } = usePageStore();

  return (
    <main>
      {selectedPage === "home" && <HomePage />}
      {selectedPage === "calendar" && <CalendarPage />}
      {selectedPage === "friends" && <FriendsPage />}
    </main>
  );
}
