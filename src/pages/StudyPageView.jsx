// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getStudyPages, deleteStudyPage } from "../utils/storage";

// export default function StudyPageView() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const pages = getStudyPages().filter(p => p.category === category);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">📄 {category} — All Study Pages</h1>

//       {/* {pages.map((page) => (
//         <div key={page.id} className="border p-4 rounded-xl my-4">
//           <h2 className="text-xl font-semibold">{page.title}</h2>
//           <p className="text-sm text-gray-500">{page.date}</p>

//           <p className="mt-2">{page.notes}</p>

//           {page.video && (
//             <iframe
//               src={page.video}
//               className="w-full h-64 mt-3 rounded"
//             ></iframe>
//           )}

//           {page.pdf && (
//             <a
//               href={page.pdf}
//               target="_blank"
//               rel="noopener"
//               className="text-blue-600 underline mt-3 block"
//             >
//               📄 Open PDF
//             </a>
//           )}

//           <div className="flex gap-3 mt-4">
//             <button
//               onClick={() => navigate(`/edit-study/${page.id}`)}
//               className="px-4 py-2 bg-yellow-500 text-white rounded"
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => {
//                 deleteStudyPage(page.id);
//                 window.location.reload();
//               }}
//               className="px-4 py-2 bg-red-600 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))} */}
//     </div>
//   );
// }
