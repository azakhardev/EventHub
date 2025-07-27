import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import FriendList from "./components/layout/FriendList";
import Content from "./components/layout/Content";
import { useEffect, useState } from "react";
import LoginPage from "./components/pages/LoginPage";
import { isTokenExpired } from "./utils/utils";
import { useUserStore } from "./store/store";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setUserId, setToken } = useUserStore();

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
    <div className="w-full h-screen flex flex-row bg-background">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[7]">
        <div className="flex flex-row gap-2">
          <div className="flex-[3] xl:flex-[4]">
            <Content />
          </div>
          <div className="flex-1">
            <FriendList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
