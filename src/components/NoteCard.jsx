import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import DeleteState from "./DeleteState.jsx";
import FullNoteState from "./FullNoteState.jsx";
import CreateNote from "./CreateNote.jsx";
import EditNote from "./EditNote.jsx";

const NoteCard = ({ title, content, createdAt, color, setNotes, noteId, note }) => {
  const ICONS = [CiEdit, IoCloseOutline];
  const [deleteBox, setDeleteBox] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [fullNote, setFullNote] = useState(false);
  const creationDate = new Date(createdAt);
  const date = creationDate.getDate();
  const month = creationDate.toLocaleString("default", { month: "short" });
  const year = creationDate.getFullYear();
  const hour = String(creationDate.getHours()).padStart(2, "0");
  const minutes = String(creationDate.getMinutes()).padStart(2, "0");

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", deleteBox)
    document.documentElement.classList.toggle("overflow-hidden", deleteBox)
    
    return () => {
      document.body.classList.remove("overflow-hidden", deleteBox)
      document.documentElement.classList.remove("overflow-hidden", deleteBox)
    };
  }, [deleteBox]);
  
  return (
    <>
      <div className="px-4 py-4 flex justify-between items-center gap-3.5">
        <div onClick={() => setFullNote(true)} className={`rounded-2xl px-5 py-3 w-full shadow-lg shadow-black/25 dark:bg-neutral-600/75 border-l-6 ${color.border} max-h-36 overflow-hidden`}>
          <div className="flex justify-center items-center m-1 text-gray-400 dark:text-white/65">
            {date}-{month}-{year} <BsDot /> {hour}:{minutes}
          </div>
          <div>
            <p className="text-xl wrap-break-word whitespace-pre-wrap mb-1 dark:text-white">
              {title}
            </p>
            <p className="mb-2 wrap-break-word whitespace-pre-wrap text-gray-500 dark:text-white/80">
              {content}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {ICONS.map((Icon, index) => {
            return (
              <button
                key={index}
                onClick={
                  index === 0
                    ? () => setEditNote(true)
                    : () => setDeleteBox(true)
                }
                className={`py-1 px-1 w-10 h-10 rounded-full border dark:border-white dark:bg-neutral-600/75 shadow-lg ${index === 0 ? "shadow-green-500/15" : "shadow-red-500/15"}`}
              >
                <Icon className="size-7 dark:text-white" />
              </button>
            );
          })}
        </div>
      </div>
      {deleteBox && <DeleteState setDelete={setDeleteBox} setNotes={setNotes} noteId={noteId} />}
      {fullNote && <FullNoteState setFullNote={setFullNote} setEditNote={setEditNote} editNote={editNote} note={note}/>}
      {editNote && <EditNote setEditNote={setEditNote} note={note} setNote={setNotes}/>}
      {!fullNote && <CreateNote/>}
    </>
  );
};

export default NoteCard;
