import React, { useState } from "react";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setUserData(data);
    setCurrentPage("chat");
  };

  const handleBackToLogin = () => {
    setCurrentPage("login");
    setUserData(null);
  };

  return (
    <div className="App">
      {currentPage === "login" ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatPage userData={userData} onBackToLogin={handleBackToLogin} />
      )}
    </div>
  );
};

export default App;
