import "./App.css";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import FriendList from "./components/layout/FriendList";
import Content from "./components/layout/Content";
import { useEffect, useState } from "react";
import LoginPage from "./components/pages/LoginPage";
import { isTokenExpired } from "./utils/utils";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
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
      <div className="flex-[24]">
        <Header />
        <div className="flex flex-row gap-2">
          <div className="flex-[3]">
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
