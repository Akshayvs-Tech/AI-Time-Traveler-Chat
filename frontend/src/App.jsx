import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import RegisterPage from "./components/RegisterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
