import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import BACKEND_URL from "../api/url";
import { motion } from "framer-motion";

const NavBar = ({ darkMode, setDarkMode }) => {
  const [linkClicked, setLinkClicked] = useState("HOME");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getName = async () => {
    try {
      const accessToken = localStorage.getItem("token");
      const fetchedData = await BACKEND_URL.get("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userName = fetchedData.data.data.name;

      const nameFormated = (userName) => {
        return userName
          .split(" ")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
      };

      setName(nameFormated(userName));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const getNameInitials = (name) => {
    if (!name) return "";
    const nameArr = name.trim().split(" ");
    const initials = nameArr.map((word) => word[0]).join("");
    return initials;
  };

  useEffect(() => {
    getName();
    getNameInitials();
  }, []);

  const TITLE = [
    { name: "HOME", link: "/" },
    { name: "CREATE", link: "/create" },
  ];

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-300 dark:bg-neutral-900 dark:text-white md:mx-36"
    >
      <div className="flex items-center justify-between py-3 px-5">
        {/* LOGO */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <FaRegFileLines className="size-10" />
            <p className="text-2xl font-bold">NOTES</p>
          </motion.div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative">
          <ThemeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* PROFILE ICON */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setProfile((prev) => !prev)}
            className="bg-gray-400/50 border-2 border-black/50 dark:border-white/50 min-w-10 min-h-10 rounded-full text-2xl font-bold flex justify-center items-center p-1.5 cursor-pointer"
          >
            {getNameInitials(name) || "?"}
          </motion.div>

          {/* PROFILE DROPDOWN */}
          {profile && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute border mt-1.5 border-black/25 dark:border-white/25 top-full p-2 rounded-2xl right-0 space-y-2 bg-neutral-400 dark:bg-neutral-700"
            >
              <p className="text-xl w-full px-4 border text-center border-black/40 dark:border-white/40 rounded-xl py-1.5 bg-white/90 dark:bg-neutral-500/90 whitespace-nowrap">
                {name}
              </p>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogOut}
                className="flex border border-black/40 px-4 py-1.5 dark:border-white/30 rounded-xl items-center gap-2 text-lg dark:bg-neutral-500/90 bg-white/90 cursor-pointer"
              >
                <CiLogout className="size-6" />
                <button>Logout</button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="bg-black/40 w-full h-px dark:bg-white/40" />

      {/* NAV LINKS */}
      <div className="flex justify-around items-center">
        {TITLE.map((title) => {
          return (
            <Link
              onClick={() => {
                setLinkClicked(title.name);
              }}
              key={title.link}
              to={title.link}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 my-px border-b-2 ${
                  linkClicked === title.name
                    ? "border-black dark:border-white"
                    : "border-transparent"
                }`}
              >
                {title.name}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NavBar;