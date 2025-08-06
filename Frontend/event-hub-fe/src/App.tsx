import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import FriendsListSection from "./components/layout/FriendsListSection";
import Content from "./components/layout/Content";
import { useEffect, useState } from "react";
import LoginPage from "./components/pages/LoginPage";
import { isTokenExpired } from "./utils/utils";
import { useThemeStore, useUserStore } from "./store/store";
import DeleteDialog from "./components/ui/dialogs/DeleteDialog";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserId, setToken } = useUserStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      setUserId(parseInt(localStorage.getItem("userId") ?? "0"));
      setToken(token);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="w-full h-auto max-h-screen flex flex-row bg-background">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[7]">
        <div className="flex flex-row gap-2 max-h-[100vh] h-[100vh]">
          <div className="flex-[3] xl:flex-[4]">
            <Content />
          </div>
          <div className="flex-1">
            <FriendsListSection />
          </div>
        </div>
      </div>
      <DeleteDialog />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default App;
