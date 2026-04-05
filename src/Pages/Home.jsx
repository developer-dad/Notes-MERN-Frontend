import React from "react";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import BACKEND_URL from "../api/url";
import { motion } from "framer-motion";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [emptyState, setEmptyState] = useState(null);

  const fetchNotes = async () => {
    const accessToken = localStorage.getItem("token")
    const fetchedData = await BACKEND_URL.get("/notes", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    setNotes(fetchedData.data.data);
    if (fetchedData.data.data.length === 0) { 
      setEmptyState(true);
    } else {
      setEmptyState(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="md:grid md:grid-cols-3 md:mx-36"
    >
      {emptyState && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mt-10 col-span-3"
        >
          <p className="text-2xl dark:text-white">Create Your First Note</p>
        </motion.div>
      )}

      {!emptyState && (
        <motion.div
          className="contents"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
        >
          {notes.map((note) => (
            <motion.div
              key={note._id}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.3 }}
            >
              <NoteCard
                title={note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
                content={note.content.length > 120 ? note.content.slice(0, 120) + "..." : note.content}
                createdAt={note.createdAt}
                color={note.color}
                setNotes={setNotes}
                noteId={note._id}
                note={note}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;