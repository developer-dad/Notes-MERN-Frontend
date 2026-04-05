import React from "react";
import axios from 'axios'
import BACKEND_URL from "../api/url";

const DeleteState = ({ setDelete, setNotes, noteId }) => {

  const onConfirm = async (noteId) => {
    const accessToken = localStorage.getItem("token")
    await BACKEND_URL.delete(`/api/v1/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    setNotes(prev => prev.filter(note => note._id !== noteId))
    setDelete(false)
  }

  return (
    <div className="fixed inset-0 h-screen w-screen bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-5 text-center">
        <h2 className="text-lg font-semibold mb-2">Delete Note</h2>
        <p className="text-gray-500 text-sm mb-5">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setDelete(false)}
            className="px-4 py-1.5 rounded-lg border text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(noteId);
              setDelete(false);
            }}
            className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteState;
