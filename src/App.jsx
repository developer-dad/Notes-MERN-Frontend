import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Create from "./Pages/Create";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  });
  useEffect(() => {
    if(darkMode){
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark")
    }else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light")
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen dark:bg-neutral-500">
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Routes>
          <Route path="/api/v1/all-notes" element={<Home />} />
          <Route path="api/v1/create-note" element={<Create />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
