import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import AddResourceModal from "../components/AddResourceForm";
// import AddResource from "../components/AddResourceForm";
import AddStudyPage from "../components/AddStudyPage";

export default function CategoryPage() {
  const { name } = useParams();
  const [resources, setResources] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadResources = () => {
    const currentUser = JSON.parse(localStorage.getItem("learnvault_current_user"));
    const userData = JSON.parse(localStorage.getItem(currentUser.email + "_data") || "{}");
    const allResources = userData.resources || [];
    const filtered = allResources.filter((r) => r.category === name);
    setResources(filtered);
  };

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{name} Resources ✨</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-xl"
        >
           Add Study Page
        </button>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resources.map((res, index) => (
          <div key={index} className="p-5 bg-white rounded-xl shadow">
            <h3 className="text-xl font-semibold">{res.title}</h3>
            <p className="text-gray-700 my-2">{res.description}</p>

            {res.link && (
              <a
                href={res.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Visit Resource
              </a>
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddStudyPage
          category={name}
          close={() => setShowAddModal(false)}
          refresh={loadResources}
        />
      )}
    </div>
  );
}
