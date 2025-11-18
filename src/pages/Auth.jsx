// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function Auth({ onLogin }) {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [user, setUser] = useState({ name: "", email: "", password: "" });

// //   const navigate = useNavigate();

// //   const handleSubmit = () => {
// //     if (!user.email || !user.password) return alert("All fields required");

// //     if (isLogin) {
// //       localStorage.setItem("learnvault_current_user", JSON.stringify(user));
// //       onLogin();
// //       navigate("/home");
// //     } else {
// //       const users = JSON.parse(localStorage.getItem("learnvault_users") || "[]");
// //       users.push(user);

// //       localStorage.setItem("learnvault_users", JSON.stringify(users));
// //       localStorage.setItem("learnvault_current_user", JSON.stringify(user));

// //       onLogin();
// //       navigate("/home");
// //     }
// //   };




// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-5">

// //       <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
// //         <h2 className="text-3xl font-bold text-center mb-5">
// //           {isLogin ? "Sign In" : "Create Account"}
// //         </h2>

// //         {!isLogin && (
// //           <input
// //             type="text"
// //             className="w-full mb-4 p-3 border rounded-xl"
// //             placeholder="Full Name"
// //             onChange={(e) => setUser({ ...user, name: e.target.value })}
// //           />
// //         )}

// //         <input
// //           type="email"
// //           className="w-full mb-4 p-3 border rounded-xl"
// //           placeholder="Email"
// //           onChange={(e) => setUser({ ...user, email: e.target.value })}
// //         />

// //         <input
// //           type="password"
// //           className="w-full mb-4 p-3 border rounded-xl"
// //           placeholder="Password"
// //           onChange={(e) => setUser({ ...user, password: e.target.value })}
// //         />

// //         <button 
// //           onClick={handleSubmit}
// //           className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
// //         >
// //           {isLogin ? "Login" : "Create Account"}

          
// //         </button>

// //         <p
// //           className="text-center mt-4 text-blue-600 cursor-pointer"
// //           onClick={() => setIsLogin(!isLogin)}
// //         >
// //           {isLogin ? "Create New Account" : "Already have an account? Login"}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// // src/components/Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">

//       {/* Left: Brand */}
//       <Link to="/home" className="text-2xl font-bold text-blue-600">
//         📚 LearnVault
//       </Link>

//       {/* Right: Auth Buttons */}
//       <div className="flex items-center gap-6">

//         {/* Username */}
//         {user && (
//           <span className="font-semibold text-gray-700">
//             👋 {user.name || user.email}
//           </span>
//         )}

//         {/* Login / Logout */}
//         {user ? (
//           <button
//             onClick={logout}
//             className="text-red-600 hover:text-red-800 font-semibold"
//           >
//             Logout
//           </button>
//         ) : (
//           <Link
//             to="/login"
//             className="text-blue-600 hover:text-blue-800 font-semibold"
//           >
//             Login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }
