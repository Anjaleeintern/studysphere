import { motion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import homeimage from "../images/download.jpg"


export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition">
    

      {/* Dark Mode Button */}
      <ThemeToggle />

      {/* Floating Animated Circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20 w-20 h-20 bg-blue-300/40 dark:bg-blue-600/30 rounded-full blur-xl"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-32 w-24 h-24 bg-purple-300/40 dark:bg-purple-600/30 rounded-full blur-xl"
      ></motion.div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Welcome to <span className="text-blue-600 dark:text-blue-400">StudySphere</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            A smart personal learning organizer where students, developers, and
            professionals save videos, articles, notes, and GitHub resources —
            all inside one private, beautifully organized digital space.
          </p>
        </motion.div>

        {/* Right Illustration */}
        <motion.img
          src={homeimage}
          alt="Learning Illustration"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="rounded-xl shadow-2xl dark:shadow-blue-900/40"
        />
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-28">
        
        {[
          {
            title: "Organize Everything",
            text: "Create categories for any subject and manage your study content easily.",
          },
          {
            title: "Save Any Resource",
            text: "YouTube videos, GitHub repos, blogs, notes — everything in one place.",
          },
          {
            title: "Private & Secure",
            text: "Your entire knowledge stays on your device. No login, no cloud.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 shadow-lg dark:shadow-xl rounded-2xl p-6 hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.text}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
