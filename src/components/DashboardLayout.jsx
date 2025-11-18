import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";


export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userKey = user.email + "_data";
  const [categories, setCategories] = useState([]);
  const [showReadMenu, setShowReadMenu] = useState(false);
  const [showAddStudyMenu, setShowAddStudyMenu] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(userKey) || "{}");
    setCategories(data.categories || []);
  }, []);

  if (!user) return null;

  

  return (
    <div className="min-h-screen">
       
      <Navbar />

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-xl p-6">
          <ul className="space-y-4">

            {/* HOME */}
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/dashboard/home")}
            >
              🏠 Home
            </li>

            {/* CREATE CATEGORY */}
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/dashboard/create-category")}
            >
              📁 Create Category
            </li>

            {/* YOUR CATEGORIES */}
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/dashboard/your-categories")}
            >
              📂 Your Categories
            </li>

            {/* ADD STUDY PAGE */}
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setShowAddStudyMenu(!showAddStudyMenu)}
            >
              📝 Add Study Page ▾
            </li>

            {showAddStudyMenu && (
              <ul className="ml-4 space-y-2">
                {categories.map((c) => (
                  <li
                    key={c.name}
                    className="cursor-pointer text-sm hover:text-blue-600"
                    onClick={() =>
                      navigate(`/dashboard/category/${c.name}/add`)
                    }
                  >
                    ➤ {c.name}
                  </li>
                ))}
              </ul>
            )}

            {/* READ CONTENT */}
            <li
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setShowReadMenu(!showReadMenu)}
            >
              📖 Read Content ▾
            </li>

            {showReadMenu && (
              <ul className="ml-4 space-y-2">
                {categories.map((c) => (
                  <li
                    key={c.name}
                    className="cursor-pointer text-sm hover:text-blue-600"
                    onClick={() =>
                      navigate(`/dashboard/read-content/${c.name}`)
                    }
                  >
                    ➤ {c.name}
                  </li>
                ))}
              </ul>
            )}

          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
