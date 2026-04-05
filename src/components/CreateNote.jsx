import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const CreateNote = ({ onClick }) => {
  return (
    <Link
    to={'/create'}
      className="fixed bottom-8 right-8 bg-neutral-500 hover:bg-neutral-400 text-white p-3 hover:dark:bg-neutral-800 dark:bg-neutral-900 rounded-full shadow-lg z-50 md:mx-36 md:bottom-16"
    >
      <FaPlus size={25} />
    </Link>
  );
}

export default CreateNote;