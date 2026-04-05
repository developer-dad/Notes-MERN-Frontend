import React from "react";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import BACKEND_URL from "../api/url";

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
    <div className="md:grid md:grid-cols-3 md:mx-36">
      {emptyState && (
        <div className="flex justify-center mt-10">
          <p className="text-2xl dark:text-white">Create Your First Note</p>
        </div>
      )}
      {!emptyState &&
        notes.map((note) => (
          <NoteCard
            key={note._id}
            title={note.title.length > 20 ? note.title.slice(0, 20) + "..." : note.title}
            content={note.content.length > 120 ? note.content.slice(0, 120) + "..." : note.content}
            createdAt={note.createdAt}
            color={note.color}
            setNotes={setNotes}
            noteId={note._id}
            note={note}
          />
        ))}
    </div>
  );
};

export default Home;
