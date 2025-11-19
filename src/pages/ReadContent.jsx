// // src/pages/ReadContent.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getPagesByCategory, deleteStudyPage } from "../utils/storage";
// import StudyPageActions from "../components/StudyPageActions";

// export default function ReadContent() {
//   const { categoryName } = useParams();
//   const navigate = useNavigate();
//   const [pages, setPages] = useState([]);

//   // useEffect(() => {
//   //   if (!categoryName) {
//   //     setPages([]);
//   //     return;
//   //   }
//   //   const decoded = decodeURIComponent(categoryName);
//   //   const p = getPagesByCategory(decoded);
//   //   setPages(p || []);
//   // }, [categoryName]);

//   useEffect(() => {
//   const decoded = decodeURIComponent(categoryName);
//   setPages(getPagesByCategory(decoded));

//   const reload = () => {
//     setPages(getPagesByCategory(decoded));
//   };

//   window.addEventListener("storage-update", reload);
//   return () => window.removeEventListener("storage-update", reload);
// }, [categoryName]);

//   // 🗑 DELETE HANDLER
//   const handleDelete = (id) => {
//     deleteStudyPage(id);
//     setPages(prev => prev.filter(p => p.id !== id));
//   };

//   return (
//     <div className="  bg-gray-200 p-6 max-w-4xl mx-auto">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">
//           Study Notes — {decodeURIComponent(categoryName)}
//         </h1>

//         {/* ➕ Add New Page Btn */}
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//           onClick={() =>
//             navigate(`/dashboard/category/${decodeURIComponent(categoryName)}/add`)
//           }
//         >
//           ➕ Add New Page
//         </button>
//       </div>

//       {/* NO DATA */}
//       {pages.length === 0 ? (
//         <p className="text-gray-600">No study pages saved yet for this category.</p>
//       ) : (
//         pages
//           .slice()
//           .sort((a, b) => new Date(a.date) - new Date(b.date))

//           .map((p) => (
//             <article
//               key={p.id}
//               className="p-5 border rounded-xl mb-5 bg-white shadow-sm bg-gray-300"
//             >
//               {/* TITLE + ACTIONS */}
//               <div className="flex justify-between items-start ">
//                 <div>
//                   <h2 className="text-2xl text-blue-600 text-lg font-bold">{p.topic}</h2>
//                   <p className="text-sm text-gray-500">📅 {p.date}</p>
//                 </div>

//                 {/* ⋮ More Options (Edit/Delete) */}
                
//   <StudyPageActions
//     page={p}
//     categoryName={decodeURIComponent(categoryName)}

//     onDelete={() => {
//       const updated = getPagesByCategory(decodeURIComponent(categoryName));
//       setPages([...updated]);
//     }}

//     onUpdate={() => {
//       const updated = getPagesByCategory(decodeURIComponent(categoryName));
//       setPages([...updated]);
//     }}
//   />
//               </div>

//               {/* VIDEO */}
//               {p.video && (
//                 <a
//                   href={p.video}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline block mt-2"
//                 >
//                   ▶ Watch Video
//                 </a>
//               )}

//               {/* PDF INLINE VIEWER */}
//               {p.pdf && (
//                 <div className="mt-4">
//                   <h3 className="font-semibold mb-2 text-gray-700">📄 PDF Preview</h3>
//                   <iframe
//                     src={p.pdf}
//                     title="PDF Viewer"
//                     className="w-full h-72 border rounded-lg"
//                   ></iframe>

//                   <a
//                     href={p.pdf}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-green-600 underline block mt-2"
//                   >
//                     Open Full PDF
//                   </a>
//                 </div>
//               )}

//               {/* NOTES */}
//               <p className="whitespace-pre-line mt-4 text-gray-800">
//                 {p.notes}
//               </p>
//             </article>
//           ))
//       )}
//     </div>
//   );
// }


// src/pages/ReadContent.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPagesByCategory, deleteStudyPage } from "../utils/storage";
import StudyPageActions from "../components/StudyPageActions";

export default function ReadContent() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  // Load pages for the selected category
  useEffect(() => {
    const decoded = decodeURIComponent(categoryName);

    const loadPages = () => {
      const fetched = getPagesByCategory(decoded) || [];
      setPages(fetched);
    };

    loadPages();

    // Listen for global storage updates
    window.addEventListener("storage-update", loadPages);
    return () => window.removeEventListener("storage-update", loadPages);
  }, [categoryName]);

  // DELETE handler
  const handleDelete = (id) => {
    deleteStudyPage(id);
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-gray-200 p-6 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Study Notes — {decodeURIComponent(categoryName)}
        </h1>

        {/* ➕ Add New Page Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() =>
            navigate(`/dashboard/category/${decodeURIComponent(categoryName)}/add`)
          }
        >
          ➕ Add New Page
        </button>
      </div>

      {/* NO DATA */}
      {pages.length === 0 ? (
        <p className="text-gray-600">
          No study pages saved yet for this category.
        </p>
      ) : (
        pages
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((p) => (
            <article
              key={p.id}
              className="p-5 border rounded-xl mb-5 bg-white shadow-sm bg-gray-300"
            >
              {/* TITLE + ACTIONS */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl text-blue-600 font-bold">{p.topic}</h2>
                  <p className="text-sm text-gray-500">📅 {p.date}</p>
                </div>

                {/* More Options (Edit/Delete) */}
                <StudyPageActions
                  page={p}
                  categoryName={decodeURIComponent(categoryName)}
                  onDelete={() => handleDelete(p.id)}
                  onUpdate={() => {
                    const updated = getPagesByCategory(
                      decodeURIComponent(categoryName)
                    );
                    setPages([...updated]);
                  }}
                />
              </div>

              {/* VIDEO */}
              {p.video && (
                <a
                  href={p.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline block mt-2"
                >
                  ▶ Watch Video
                </a>
              )}

              {/* PDF INLINE VIEWER */}
              {p.pdf && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2 text-gray-700">📄 PDF Preview</h3>
                  <iframe
                    src={p.pdf}
                    title="PDF Viewer"
                    className="w-full h-72 border rounded-lg"
                  ></iframe>

                  <a
                    href={p.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline block mt-2"
                  >
                    Open Full PDF
                  </a>
                </div>
              )}

              {/* NOTES */}
              <p className="whitespace-pre-line mt-4 text-gray-800">{p.notes}</p>
            </article>
          ))
      )}
    </div>
  );
}
