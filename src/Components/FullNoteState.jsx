import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { BsDot } from "react-icons/bs";

const FullNoteState = ({ setFullNote, setEditNote, editNote, note }) => {
  const noteDate = new Date(note.createdAt);
  const date = noteDate.getDate();
  const month = noteDate.toLocaleString("default", { month: "short" });
  const year = noteDate.getFullYear();
  const hour = String(noteDate.getHours()).padStart(2, "0");
  const minutes = String(noteDate.getMinutes()).padStart(2, "0");
  return (
    <div className="fixed inset-0 z-20 h-screen w-screen bg-white dark:bg-neutral-500 flex flex-col">
      <div
        className={`flex items-center justify-between p-5 ${note.color.bg} md:mx-36`}
      >
        <IoArrowBackSharp
          onClick={() => setFullNote(false)}
          className="size-10 p-1 border border-black/50 dark:text-white dark:border-white/80 rounded-full"
        />
        <p className="flex items-center text-black/75 md:text-xl dark:text-white/70">
          {date}-{month}-{year} <BsDot /> {hour}:{minutes}
        </p>
        <CiEdit onClick={() => setEditNote(true)} className="size-10 p-1 border dark:text-white border-black/50 dark:border-white/80 rounded-full" />
      </div>
      <div className="bg-black/40 w-full h-px dark:bg-white/80 md:mx-36"/>
      <div className="p-5 flex-1 flex-col gap-3 overflow-auto md: mx-36">
        <div className="text-2xl dark:text-white md:text-5xl md:mb-5">{note.title}</div>
        <div className="dark:text-white/80 md:text-2xl">
          {note.content}
        </div>
      </div>
    </div>
  );
};

export default FullNoteState;
