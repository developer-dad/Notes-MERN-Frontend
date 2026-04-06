import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";

const App = () => {

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"))

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen dark:bg-neutral-500">
      <Routes>
        <Route path="/" element={
          isAuth ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
        } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<PasswordReset />}/>
        <Route path="/dashboard" element={
          isAuth ? <><NavBar darkMode={darkMode} setDarkMode={setDarkMode} /> <Home /></> : <Navigate to='/login' />
        } />
        <Route path="/create" element={
          isAuth ? <><NavBar darkMode={darkMode} setDarkMode={setDarkMode} /> <Create /></> : <Navigate to='/login' />
        } />
      </Routes>
    </div>
  );
};

export default App;
