

import React, { useState } from "react";
// import { MoreVertical, Trash2, Edit } from "lucide-react";
import { deleteStudyPage, updateStudyPage } from "../utils/storage";
import ThreeDotActions from "./ThreeDotActions";

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
    <ThreeDotActions
        onEdit={() => setEditOpen(true)}
        onDelete={handleDelete}
      />

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
