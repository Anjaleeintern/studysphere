
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCategory() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const saveCategory = () => {
    if (!category) return alert("Enter category name");

    const user = JSON.parse(localStorage.getItem("learnvault_current_user"));
    const key = user.email + "_data";

    const existing = JSON.parse(localStorage.getItem(key) || "{}");
    const categories = existing.categories || [];

   categories.push({
  name: category,
  resources: []
});

    localStorage.setItem(key, JSON.stringify({ ...existing, categories }));


    navigate("/dashboard/your-categories"); // redirect to category list page
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-400">
      <div className="bg-gray-300 p-8 rounded-xl w-96 shadow-lg">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Create Category
        </h2>

        <input
          type="text"
          placeholder="Enter category name"
          className="w-full border p-3 rounded-xl mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={saveCategory}
          className="w-full bg-blue-900 font-bold text-white p-3 rounded-xl"
        >
          Save Category
        </button>

        <button
          onClick={() => navigate("/dashboard/your-categories")}
          className="mt-3 w-full text-gray-900 text-lg "
        >
          Cancel
        </button>

      </div>
    </div>
  );
}
