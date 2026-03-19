import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import axios from "axios";
import BACKEND_URL from "../api/url";

const EditNote = ({ setEditNote, note, setNote }) => {
  const noteDate = new Date(note.createdAt);
  const date = noteDate.getDate();
  const month = noteDate.toLocaleString("default", { month: "short" });
  const year = noteDate.getFullYear();
  const hour = String(noteDate.getHours()).padStart(2, "0");
  const minutes = String(noteDate.getMinutes()).padStart(2, "0");

  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);
  const [newColor, setNewColor] = useState({
    border: note.color.border,
    bg: note.color.bg
  });

  const COLOR = [
    {
      border: "border-none",
      bg: "bg-none",
    },
    {
      border: "border-red-400/40",
      bg: "bg-red-400/40",
    },
    {
      border: "border-blue-400/40",
      bg: "bg-blue-400/40",
    },
    {
      border: "border-yellow-400/40",
      bg: "bg-yellow-400/40",
    },
    {
      border: "border-green-400/40",
      bg: "bg-green-400/40",
    },
  ];
  const handleEdit = async (noteId) => {
    const res = await BACKEND_URL.put(`update-note/${noteId}`, {
      title: newTitle,
      content: newContent,
      color: newColor
    });
    setNote((prevNotes) =>
      prevNotes.map((n) =>
        n._id === noteId ? { ...n, title: newTitle, content: newContent, color: newColor } : n,
      ),
    );
    setEditNote(false);
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-white dark:bg-neutral-500">
      <div className={`flex items-center justify-between p-5 ${note.color.bg} md:mx-36`}>
        <IoArrowBackSharp
          onClick={() => setEditNote(false)}
          className="size-10 p-1 border border-black/50 dark:text-white dark:border-white/80 rounded-full"
        />
        <p className="flex items-center text-black/75 dark:text-white/70">
          {date}-{month}-{year} <BsDot /> {hour}:{minutes}
        </p>
        <FaCheck
          onClick={() => handleEdit(note._id)}
          className="size-10 p-1 border border-black/50 dark:text-white dark:border-white/80 rounded-full"
        />
      </div>
      <div className="bg-black/40 w-full h-px dark:bg-white/80 md:mx-36" />
      <div className="p-5 flex flex-col gap-4 overflow-auto dark:text-white md:mx-36">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="text-2xl w-full rounded-2xl px-2 py-1 border dark:border-white/80"
        />
        <textarea
          value={newContent}
          rows={15}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full h-full rounded-2xl px-2 py-1 border dark:border-white/80"
        ></textarea>
        <div className="flex justify-between border rounded-full p-1 dark:border-white/80 md:mr-96">
          {COLOR.map((item, index) => (
            <label key={index}>
              <input
                type="radio"
                name="color"
                checked={newColor.bg === item.bg}
                value={item.bg}
                onChange={() =>
                  setNewColor({
                    border: `${item.border}`,
                    bg: `${item.bg}`,
                  })
                }
                className="hidden"
              />
              <div
                className={`border dark:border-white/50 size-12 rounded-full ${item.bg} ${newColor.bg === item.bg ? "ring-1 ring-black dark:ring-white" : ""}`}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditNote;
