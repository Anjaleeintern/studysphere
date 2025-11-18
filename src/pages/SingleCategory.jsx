import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SingleCategory() {
  const { name } = useParams(); // category name from URL
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("learnvault_current_user"));
    const key = user.email + "_data";

    const data = JSON.parse(localStorage.getItem(key) || "{}");

    const found = (data.categories || []).find((c) => c.name === name);

    setCategory(found || null);
  }, [name]);

  if (!category)
    return <h1 className="text-center mt-10 text-2xl">Category Not Found</h1>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* HEADING */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{category.name}</h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={() => navigate(`dashboard/category/${name}/add`)}
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
            className="border p-5 rounded-xl shadow bg-white"
          >
            <h2 className="text-xl font-semibold mb-1">{page.topic}</h2>
            <p className="text-gray-500 text-sm mb-3">
              📅 {page.date}
            </p>

            {/* Notes */}
            <p className="text-gray-700 whitespace-pre-wrap mb-3">
              {page.notes}
            </p>

            {/* Video link */}
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

            {/* EDIT + DELETE */}
            <div className="flex gap-4 mt-3">
              <button className="text-green-600">Edit</button>
              <button className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
