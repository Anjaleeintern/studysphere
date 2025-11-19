import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

/* Layout */
import DashboardLayout from "./components/DashboardLayout";

/* Auth Pages */
import Login from "./pages/Login";
import Signup from "./pages/Signup";

/* Protected Route */
import ProtectedRoute from "./components/ProtectedRoute";

/* Dashboard pages */
import HomePage from "./pages/Home";
import YourCategories from "./components/YourCategories";
import CreateCategory from "./pages/CreateCategory";
import SingleCategory from "./pages/SingleCategory";
import AddStudyPage from "./components/AddStudyPage";
import ReadContent from "./pages/ReadContent";
import CategoryPage from "./pages/CategoryPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>

        {/* ---------- Public Routes ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------- Protected Dashboard Routes ---------- */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="your-categories" element={<YourCategories />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="category/:name" element={<SingleCategory />} />
          <Route path="category/:name/add" element={<AddStudyPage />} />
          <Route path="read-content/:categoryName" element={<ReadContent />} />
          <Route path="category" element={<CategoryPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
