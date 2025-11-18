// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Auth from "./pages/Auth";
// // import CategoryPage from "./pages/CategoryPage";
// // // import AddResource from "./components/AddResourceForm";
// // // import ReadPage from "./pages/ReadPage";
// // import DashboardLayout from "./components/DashboardLayout";
// // import YourCategories from "./components/YourCategories";
// // import CreateCategory from "./pages/CreateCategory";
// // import AddStudyPage from "./components/AddStudyPage";
// // import SingleCategory from "./pages/SingleCategory";
// // import ReadContent from "./pages/ReadContent";
// // import HomePage from "./pages/Home";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import ProtectedRoute from "./components/ProtectedRoute";
// // // import StudyPageView from "./pages/StudyPageView";

// // export default function App() {
// //   const user = JSON.parse(localStorage.getItem("learnvault_current_user"));


// //   return (
// //     <BrowserRouter>
// //       <Routes>

// //         {/* AUTH PAGE */}
// //         {/* <Route path="/auth" element={<Auth onLogin={() => { console.log("User logged in!"); }} />}/> */}

// //         {/* PROTECTED ROUTES */}
// //         {user ? (
// //           <Route path="/" element={<ProtectedRoute> <DashboardLayout /> </ProtectedRoute>} >
// //             <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />
            
// //             {/* Home Page */}
            
// //             <Route path="/home" element={<HomePage />} />

// //             {/* Categories */}
// //             <Route path="/category/:name" element={<CategoryPage />} />

// //             {/* Add Resource */}
// //             {/* <Route path="/add" element={<AddResource />} /> */}
// //              <Route path="/your-categories" element={<YourCategories />} />
// //              <Route path="/category/:name" element={<SingleCategory />} />
// //              <Route path="/read-content" element={<ReadContent />} />
// //             <Route path="/category/:name/add" element={<AddStudyPage />} />
// //             <Route path="/read-content/:categoryName" element={<ReadContent />} />




// //             {/* Read Resource */}
// //             {/* <Route path="/read/:id" element={<ReadPage />} /> */}
// //             <Route path="/create-category" element={<CreateCategory />} />


// //           </Route>
// //         ) : (
// //           <Route path="*" element={<Navigate to="/home" />} />
// //         )}

// //         {/* DEFAULT = send to auth */}
// //         {/* <Route path="*" element={<Navigate to="/auth" />} /> */}
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }


// // src/App.js
// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import HomePage from "./pages/Home";

// import DashboardLayout from "./components/DashboardLayout";
// import ProtectedRoute from "./components/ProtectedRoute";

// import YourCategories from "./components/YourCategories";
// import CreateCategory from "./pages/CreateCategory";
// import AddStudyPage from "./components/AddStudyPage";
// import CategoryPage from "./pages/CategoryPage";
// import SingleCategory from "./pages/SingleCategory";
// import ReadContent from "./pages/ReadContent";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public */}
          // <Route path="/" element={<Navigate to="/home" replace />} />
          // <Route path="/home" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {/* Protected: DashboardLayout wraps protected pages */}
//           <Route
//             element={
//               <ProtectedRoute>
//                 <DashboardLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="/your-categories" element={<YourCategories />} />
//             <Route path="/create-category" element={<CreateCategory />} />
//             <Route path="/category/:name" element={<SingleCategory />} />
//             <Route path="/category/:name/add" element={<AddStudyPage />} />
//             <Route path="/read-content/:categoryName" element={<ReadContent />} />
//             <Route path="/category-page/:name" element={<CategoryPage />} />
//           </Route>

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/home" replace />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// /* Layout */
// import DashboardLayout from "./components/DashboardLayout";

// /* Auth Pages */
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// /* Protected Route */
// import ProtectedRoute from "./components/ProtectedRoute";

// /* Pages inside Dashboard */
// import HomePage from "./pages/Home";
// import YourCategories from "./components/YourCategories";
// import CreateCategory from "./pages/CreateCategory";
// import SingleCategory from "./pages/SingleCategory";
// import AddStudyPage from "./components/AddStudyPage";
// import ReadContent from "./pages/ReadContent";
// import CategoryPage from "./pages/CategoryPage";
// import LandingPage from "./pages/LandingPage";
// import { useAuth } from "./context/AuthContext";

// export default function App() {
//   const { user } = useAuth();

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />

//         {/* ---------------- AUTH ROUTES ---------------- */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* ------------- PROTECTED DASHBOARD ROUTES ------------- */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >

//           {/* HOME PAGE */}
//           <Route index element={<HomePage />} />
//           <Route path="/home" element={<HomePage />} />

//           {/* CATEGORY PAGES */}
//           <Route path="your-categories" element={<YourCategories />} />
//           <Route path="create-category" element={<CreateCategory />} />

//           {/* Single category page */}
//           <Route path="category/:name" element={<SingleCategory />} />

//           {/* Add Study Page */}
//           <Route path="category/:name/add" element={<AddStudyPage />} />

//           {/* Read Content Page */}
//           <Route path="read-content/:categoryName" element={<ReadContent />} />

//           {/* Optional category list page */}
//           <Route path="category" element={<CategoryPage />} />

//         </Route>

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";

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
