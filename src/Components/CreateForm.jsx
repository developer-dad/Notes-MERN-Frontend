import axios from "axios";
import React from "react";
import { useState } from "react";
import BACKEND_URL from "../api/url";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState({
    border: "border-none",
    bg: "bg-none"
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({title: "", content: ""})
  const COLOR = [
    {
      border: "border-none",
      bg: "bg-none"
    },
    {
      border: "border-red-400/40",
      bg: "bg-red-400/40"
    },
    {
      border: "border-blue-400/40",
      bg: "bg-blue-400/40"
    },
    {
      border: "border-yellow-400/40",
      bg: "bg-yellow-400/40"
    },
    {
      border: "border-green-400/40",
      bg: "bg-green-400/40"
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {title: "", content: ""}
    let hasError = false

    if(!title.trim()){
      newError.title = "Title is required"
      hasError = true
    }
    
    if(!content.trim()){
      newError.content = "Content is required"
      hasError = true
    }

    setErrors(newError)
    if(hasError) return
    setLoading(true)
    const res = await BACKEND_URL.post("/create-note", {
        title, content, color
    })    
    
    setTitle("")
    setContent("")
    setColor({
      border: "border-none",
      bg: "bg-none"
    })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center dark:text-white text-center gap-2 p-4 md:mx-36">
      <label htmlFor="title" className="text-xl">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border dark:border-white/80 rounded-2xl px-2 h-10 ring-1 dark:ring-white"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">
          {errors.title}
        </p>
      )}
      <label htmlFor="content" className="text-xl">
        Content
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        placeholder="Write your content here"
        className="border dark:border-white/80 rounded-2xl p-2 ring-1 dark:ring-white"
      ></textarea>
      {errors.content && (
        <p className="text-red-500 text-sm">
          {errors.content}
        </p>
      )}
      <label htmlFor="color" className="text-xl">
        Color
      </label>
      <div className="flex justify-between border dark:border-white/80 rounded-full p-1">
        {COLOR.map((item, index) => (
          <label key={index}>
            <input
              type="radio"
              name="color"
              checked={color.bg === item.bg}
              value={item.bg}
              onChange={() => setColor({
                border: `${item.border}`,
                bg: `${item.bg}`
              })}
              className="hidden"
            />
            <div
              className={`border dark:border-white/50 size-12 rounded-full ${item.bg} ${color.bg === item.bg ? "ring-1 ring-black dark:ring-white" : ""}`}
            />
          </label>
        ))}
      </div>
      <button type="submit" className={`bg-gray-200 dark:bg-black/90 p-2 rounded-full ${loading ? "border dark:border-white" : ""}`}>{loading ? "LOADING" : "SUBMIT"}</button>
    </form>
  );
};

export default CreateForm;
