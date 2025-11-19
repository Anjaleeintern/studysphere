// src/components/ThreeDotActions.jsx
import React, { useState } from "react";
import { MoreVertical, Trash2, Edit } from "lucide-react";

export default function ThreeDotActions({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-200 rounded-full"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg w-32 z-50">
          <button
            onClick={() => {
              onEdit?.();
              setOpen(false);
            }}
            className="flex items-center px-3 py-2 hover:bg-gray-100 w-full text-left"
          >
            <Edit size={16} className="mr-2" /> Edit
          </button>

          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="flex items-center px-3 py-2 hover:bg-red-100 text-red-600 w-full text-left"
          >
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
