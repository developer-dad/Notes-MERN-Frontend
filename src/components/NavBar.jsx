import React from "react";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

const NavBar = ({ darkMode, setDarkMode }) => {
  const [linkClicked, setLinkClicked] = useState("HOME");
  const TITLE = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "CREATE",
      link: "/create",
    },
  ];

  return (
    <div className="bg-neutral-300 dark:bg-neutral-900 dark:text-white md:mx-36">
      <div className="flex items-center justify-between py-3 px-5">
        {/* TOP NAVBAR */}
        <Link
          to="/"
        >
          {/* LOGO & TEXT */}
          <div className="flex items-center gap-2">
            <FaRegFileLines className="size-10" />
            <p className="text-2xl font-bold">NOTES</p>
          </div>
        </Link>
        {/* TOGGLE THEME */}
        <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div className="bg-black/40 w-full h-px dark:bg-white/40" />
      <div className="flex justify-around items-center">
        {TITLE.map((title) => {
          return (
            <Link
              onClick={() => {
                setLinkClicked(title.name);
              }}
              key={title.link}
              to={title.link}
              className={`px-5 py-2.5 my-px border-b-2 ${linkClicked === title.name ? "border-black dark:border-white" : "border-transparent"}`}
            >
              {title.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
