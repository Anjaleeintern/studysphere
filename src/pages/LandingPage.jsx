// // src/pages/LandingPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Top Navbar */}
//       <nav className="flex justify-between items-center p-5 shadow bg-white">
//         <div className="text-2xl font-bold text-blue-600 cursor-pointer"
//              onClick={() => navigate("/")}>
//           📚 StudySphere
//         </div>

//         <div className="flex space-x-6 items-center">
//           <button onClick={() => navigate("/login")}
//                   className="text-gray-700 hover:text-blue-600">
//             Sign In
//           </button>

//           <button onClick={() => navigate("/signup")}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       {/* About Section */}
//       <div className="max-w-4xl mx-auto text-center mt-20 p-5">
//         <h1 className="text-4xl font-extrabold text-gray-900">
//           Welcome to <span className="text-blue-600">StudySphere</span>
//         </h1>

//         <p className="mt-4 text-gray-600 text-lg leading-relaxed">
//           Your personal learning organizer to store notes, articles, videos,  
//           GitHub links, and study resources — all in one secure dashboard.
//         </p>

//         <img
//           src="https://cdni.iconscout.com/illustration/premium/thumb/girl-studying-online-illustration-download-in-svg-png-gif-file-formats--distance-education-e-learning-student-school-pack-graphics-4571373.png"
//           alt="Study Illustration"
//           className="mx-auto mt-10 w-96"
//         />

//         <button
//           onClick={() => navigate("/signup")}
//           className="mt-10 px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import landing_image from "../images/landingpageimage"

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Animated Background Shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full blur-2xl"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute bottom-10 right-10 w-56 h-56 bg-indigo-300 rounded-full blur-3xl"
      ></motion.div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 backdrop-blur-xl bg-white/60 shadow-md sticky top-0 z-50">
        <div
          className="text-3xl font-extrabold text-blue-700 cursor-pointer tracking-tight"
          onClick={() => navigate("/")}
        >
          📘 StudySphere
        </div>

        <div className="flex space-x-6 items-center">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-blue-700 text-white rounded-xl text-lg font-semibold shadow hover:bg-blue-800 hover:shadow-lg transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center mt-24 px-6">

        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Organize Your Learning With  
            <span className="text-blue-700"> StudySphere</span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Store notes, articles, videos, GitHub links, study materials,
            and resources — all securely in one personalized dashboard.
          </p>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 bg-blue-700 text-white rounded-xl text-lg shadow hover:bg-blue-800 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-white text-blue-700 border-2 border-blue-700 rounded-xl text-lg shadow hover:bg-blue-50 transition"
            >
              Login
            </button>
          </div>

          {/* Features Icons */}
          <div className="mt-10 grid grid-cols-2 gap-5">
            <Feature icon="📁" title="Organize Notes" />
            <Feature icon="🔗" title="Save Links" />
            <Feature icon="🎥" title="Video Library" />
            <Feature icon="📊" title="Track Progress" />
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          src={landing_image}
          alt="Study Illustration"
          className="flex-1 w-full md:w-[420px] drop-shadow-2xl mt-10 md:mt-0"
        />
      </div>

      {/* Footer */}
      <footer className="text-center mt-20 py-6 text-gray-600">
        © {new Date().getFullYear()} StudySphere — All Rights Reserved
      </footer>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-4 bg-white rounded-xl shadow flex items-center space-x-3"
    >
      <span className="text-3xl">{icon}</span>
      <p className="text-gray-700 font-medium">{title}</p>
    </motion.div>
  );
}
