

import React, { useState } from "react";
import { MoreVertical, Trash2, Edit } from "lucide-react";
import { deleteStudyPage, updateStudyPage } from "../utils/storage";

export default function StudyPageActions({ page, categoryName, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [editData, setEditData] = useState({
    topic: page.topic,
    notes: page.notes,
    video: page.video || "",
    pdf: page.pdf || "",
  });

  const handleDelete = () => {
    deleteStudyPage(categoryName, page.id);
    onDelete?.();
    setOpen(false);
  };

  const handleEditSave = () => {
    const updated = {
      ...page,
      ...editData,
      date: new Date().toISOString()
    };

    updateStudyPage(categoryName, updated);

    onUpdate?.();
    setEditOpen(false);
  };

  return (
    <>
      {/* Three Dots Button */}
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
                setEditOpen(true);
                setOpen(false);
              }}
              className="flex items-center px-3 py-2 hover:bg-gray-100 w-full text-left"
            >
              <Edit size={16} className="mr-2" /> Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center px-3 py-2 hover:bg-red-100 text-red-600 w-full text-left"
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-5 rounded-xl w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-3">Edit Study Page</h2>

            <label className="block text-sm">Topic</label>
            <input
              className="border p-2 w-full rounded mb-3"
              value={editData.topic}
              onChange={(e) =>
                setEditData({ ...editData, topic: e.target.value })
              }
            />

            <label className="block text-sm">Notes</label>
            <textarea
              className="border p-2 w-full rounded mb-3 h-32"
              value={editData.notes}
              onChange={(e) =>
                setEditData({ ...editData, notes: e.target.value })
              }
            />

            <label className="block text-sm">Video Link</label>
            <input
              className="border p-2 w-full rounded mb-3"
              value={editData.video}
              onChange={(e) =>
                setEditData({ ...editData, video: e.target.value })
              }
            />

            <label className="block text-sm">PDF Link</label>
            <input
              className="border p-2 w-full rounded mb-4"
              value={editData.pdf}
              onChange={(e) =>
                setEditData({ ...editData, pdf: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
