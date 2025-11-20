// src/pages/AddStudyPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  listCategories,
  addStudyPageToCategory,
  normalizeCategories,
  getUserData,
} from "../utils/storage";

export default function AddStudyPage() {
  const navigate = useNavigate();
  const { name } = useParams(); // optional pre-filled category

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState({
    date: "",
    topic: "",
    video: "",
    notes: "",
    pdf: "",
    category: name || "",
  });

  useEffect(() => {
    // ensure categories are normalized and load them
    normalizeCategories();
    setCategories(listCategories());
  }, []);

  // convert uploaded pdf to base64
  const handlePDF = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPage((p) => ({ ...p, pdf: reader.result }));
    reader.readAsDataURL(file);
  };

  const savePage = () => {
    if (!page.topic || !page.date || !page.category)
      return alert("Please fill all required fields (date, topic, category)");

    // create page object (keep only needed fields)
    const pageObj = {
      id: Date.now(),
      date: page.date,
      topic: page.topic,
      video: page.video || "",
      notes: page.notes || "",
      pdf: page.pdf || "",
      category: page.category,
    };

    try {
      addStudyPageToCategory(page.category, pageObj);
      // after save, navigate to the read-content (category-wise) page
      navigate(`/dashboard/read-content/${encodeURIComponent(page.category)}`);
    } catch (err) {
      console.error(err);
      alert("Failed to save page. Make sure you're logged in.");
    }
  };

  return (
    <div className="max-w-2xl bg-gray-400 p-8 rounded-xl shadow-lg w-full md:w-2/3 lg:w-1/2  mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Add Study Page</h1>

      <select
        className="w-full border p-3 rounded-xl mb-4"
        value={page.category}
        onChange={(e) => setPage({ ...page, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="w-full border p-3 rounded-xl mb-4"
        value={page.date}
        onChange={(e) => setPage({ ...page, date: e.target.value })}
      />

      <input
        type="text"
        className="w-full border p-3 rounded-xl mb-4"
        placeholder="Topic / Title"
        value={page.topic}
        onChange={(e) => setPage({ ...page, topic: e.target.value })}
      />

      <input
        type="text"
        className="w-full border p-3 rounded-xl mb-4"
        placeholder="Video URL (optional)"
        value={page.video}
        onChange={(e) => setPage({ ...page, video: e.target.value })}
      />

      <textarea
        rows="6"
        className="w-full border p-3 rounded-xl mb-4"
        placeholder="Your study notes..."
        value={page.notes}
        onChange={(e) => setPage({ ...page, notes: e.target.value })}
      />

      <input type="file" accept="application/pdf" onChange={handlePDF} />
      {page.pdf && <p className="text-green-600 mt-1">PDF uploaded ✓</p>}

      <button
        onClick={savePage}
        className="bg-blue-900 font-bold text-white w-full py-3 rounded-xl mt-5"
      >
        Save Study Page
      </button>
    </div>
  );
}


// // src/pages/AddStudyPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   listCategories,
//   addStudyPageToCategory,
//   normalizeCategories,
// } from "../utils/storage";

// export default function AddStudyPage() {
//   const navigate = useNavigate();
//   const { name } = useParams(); // optional pre-filled category

//   const [categories, setCategories] = useState([]);
//   const [page, setPage] = useState({
//     date: "",
//     topic: "",
//     video: "",
//     notes: "",
//     pdf: "",
//     category: name || "",
//   });

//   // 🔥 FUNCTION TO LOAD CATEGORIES
//   const loadCategories = () => {
//     normalizeCategories();
//     setCategories(listCategories());
//   };

//   useEffect(() => {
//     loadCategories(); // initial load

//     // Listen to storage-update (auto refresh categories)
//     const reload = () => loadCategories();
//     window.addEventListener("storage-update", reload);

//     return () => window.removeEventListener("storage-update", reload);
//   }, []);

//   // convert uploaded pdf to base64
//   const handlePDF = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setPage((p) => ({ ...p, pdf: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   // SAVE PAGE
//   const savePage = () => {
//     if (!page.topic || !page.date || !page.category)
//       return alert("Please fill all required fields (date, topic, category)");

//     const pageObj = {
//       id: Date.now(),
//       date: page.date,
//       topic: page.topic,
//       video: page.video || "",
//       notes: page.notes || "",
//       pdf: page.pdf || "",
//       category: page.category,
//     };

//     try {
//       addStudyPageToCategory(page.category, pageObj);

//       // 🔥 Notify all pages to auto-update
//       window.dispatchEvent(new Event("storage-update"));

//       navigate(`/dashboard/read-content/${encodeURIComponent(page.category)}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save page. Make sure you're logged in.");
//     }
//   };

//   return (
//     <div className="max-w-2xl bg-white p-8 rounded-xl shadow-lg mx-auto mt-8">
//       <h1 className="text-2xl font-bold mb-6">Add Study Page</h1>

//       <select
//         className="w-full border p-3 rounded-xl mb-4"
//         value={page.category}
//         onChange={(e) => setPage({ ...page, category: e.target.value })}
//       >
//         <option value="">Select Category</option>
//         {categories.map((c) => (
//           <option key={c.name} value={c.name}>
//             {c.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="date"
//         className="w-full border p-3 rounded-xl mb-4"
//         value={page.date}
//         onChange={(e) => setPage({ ...page, date: e.target.value })}
//       />

//       <input
//         type="text"
//         className="w-full border p-3 rounded-xl mb-4"
//         placeholder="Topic / Title"
//         value={page.topic}
//         onChange={(e) => setPage({ ...page, topic: e.target.value })}
//       />

//       <input
//         type="text"
//         className="w-full border p-3 rounded-xl mb-4"
//         placeholder="Video URL (optional)"
//         value={page.video}
//         onChange={(e) => setPage({ ...page, video: e.target.value })}
//       />

//       <textarea
//         rows="6"
//         className="w-full border p-3 rounded-xl mb-4"
//         placeholder="Your study notes..."
//         value={page.notes}
//         onChange={(e) => setPage({ ...page, notes: e.target.value })}
//       />

//       <input type="file" accept="application/pdf" onChange={handlePDF} />
//       {page.pdf && <p className="text-green-600 mt-1">PDF uploaded ✓</p>}

//       <button
//         onClick={savePage}
//         className="bg-blue-600 text-white w-full py-3 rounded-xl mt-5"
//       >
//         Save Study Page
//       </button>
//     </div>
//   );
// }
