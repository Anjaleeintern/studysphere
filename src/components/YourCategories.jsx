import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function YourCategories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("learnvault_current_user"));
  const key = user.email + "_data";

  // -----------------------------------------
  // 🔥 FUNCTION TO LOAD CATEGORIES
  // -----------------------------------------
  const loadCategories = () => {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    let catList = data.categories || [];

    // Convert old format (["React","JS"]) → new format
    const fixedList = catList.map((c) =>
      typeof c === "string" ? { name: c, resources: [] } : c
    );

    // Save converted format back
    if (JSON.stringify(fixedList) !== JSON.stringify(catList)) {
      localStorage.setItem(
        key,
        JSON.stringify({ ...data, categories: fixedList })
      );
    }

    setCategories(fixedList);
  };

  // -----------------------------------------
  // 🔥 LOAD + LISTENER FOR AUTO REFRESH
  // -----------------------------------------
  useEffect(() => {
    loadCategories(); // initial load

    // Listen for "storage-update" from other pages
    const reload = () => loadCategories();
    window.addEventListener("storage-update", reload);

    return () => window.removeEventListener("storage-update", reload);
  }, []);

  // -----------------------------------------
  // 🔥 DELETE CATEGORY
  // -----------------------------------------
  const deleteCategory = (name) => {
    if (!window.confirm("Do you want to delete this category?")) return;
    const data = JSON.parse(localStorage.getItem(key) || "{}");

    const updated = data.categories.filter((c) => c.name !== name);
    localStorage.setItem(key, JSON.stringify({ ...data, categories: updated }));

    setCategories(updated);

    // 🔥 notify other pages to refresh
    window.dispatchEvent(new Event("storage-update"));
  };

  // -----------------------------------------
  // 🔥 EDIT CATEGORY
  // -----------------------------------------
  const editCategory = (oldName) => {
    const newName = prompt("Enter new category name:", oldName);
    if (!newName) return;

    const data = JSON.parse(localStorage.getItem(key) || "{}");

    const updated = data.categories.map((c) =>
      c.name === oldName ? { ...c, name: newName } : c
    );

    localStorage.setItem(key, JSON.stringify({ ...data, categories: updated }));
    setCategories(updated);

    // 🔥 notify other pages to refresh
    window.dispatchEvent(new Event("storage-update"));
  };

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Your Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="m-5 p-5 bg-gray-200 shadow rounded-xl border"
          >
            <h2 className="text-xl font-semibold">{cat.name}</h2>

            <div className="mt-4 flex justify-between">
              <button
                className="text-blue-600"
                onClick={() => navigate(`/dashboard/category/${cat.name}`)}
              >
                Open
              </button>

              <button
                className="text-green-600"
                onClick={() => editCategory(cat.name)}
              >
                Edit
              </button>

              <button
                className="text-red-600"
                onClick={() => deleteCategory(cat.name)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
