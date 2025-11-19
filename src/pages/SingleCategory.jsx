// src/pages/SingleCategory.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ThreeDotActions from "../components/ThreeDotActions";
import { updateStudyPage, deleteStudyPage } from "../utils/storage";

export default function SingleCategory() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  // Load category from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("learnvault_current_user"));
    if (!user) return;

    const key = user.email + "_data";
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    const found = (data.categories || []).find((c) => c.name === name);
    setCategory(found || null);
  }, [name]);

  if (!category)
    return <h1 className="text-center mt-10 text-2xl">Category Not Found</h1>;

  // Delete page handler
  const handleDelete = (pageId) => {
    deleteStudyPage(category.name, pageId);
    setCategory((prev) => ({
      ...prev,
      pages: prev.pages.filter((p) => p.id !== pageId),
    }));
  };

  // Edit save handler
  const handleEditSave = () => {
    if (!editData) return;
    const updatedPage = { ...editData, date: new Date().toISOString() };
    updateStudyPage(category.name, updatedPage);

    setCategory((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === updatedPage.id ? updatedPage : p)),
    }));
    setEditOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* HEADING */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={() => navigate(`/dashboard/category/${name}/add`)}
        >
          Add Study Page
        </button>
      </div>

      {/* STUDY PAGES */}
      {(!category.pages || category.pages.length === 0) && (
        <p className="text-gray-500">No study pages added yet.</p>
      )}

      <div className="space-y-6">
        {category.pages?.map((page) => (
          <div
            key={page.id}
            className="border p-5 rounded-xl shadow bg-white relative"
          >
            {/* Page Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-xl font-semibold">{page.topic}</h2>
                <p className="text-gray-500 text-sm">📅 {page.date}</p>
              </div>

              {/* Three-dot menu */}
              <ThreeDotActions
                onEdit={() => {
                  setEditData(page);
                  setEditOpen(true);
                }}
                onDelete={() => handleDelete(page.id)}
              />
            </div>

            {/* Notes */}
            <p className="text-gray-700 whitespace-pre-wrap mb-3">{page.notes}</p>

            {/* Video */}
            {page.video && (
              <a
                href={page.video}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mb-3"
              >
                🔗 Open Video
              </a>
            )}

            {/* PDF */}
            {page.pdf && (
              <a
                href={page.pdf}
                download={`notes-${page.topic}.pdf`}
                className="text-purple-600 underline block mb-3"
              >
                📄 Download PDF
              </a>
            )}
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editOpen && editData && (
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
              value={editData.video || ""}
              onChange={(e) =>
                setEditData({ ...editData, video: e.target.value })
              }
            />

            <label className="block text-sm">PDF Link</label>
            <input
              className="border p-2 w-full rounded mb-4"
              value={editData.pdf || ""}
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
    </div>
  );
}
