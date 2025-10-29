import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> and persist
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white dark:bg-black text-black dark:text-white 
                 border-b border-gray-200 dark:border-gray-800 shadow-sm z-50 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Left: Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center"
        >
          <img
            src={
              theme === "dark"
                ? `${import.meta.env.BASE_URL}logo-white.png`
                : `${import.meta.env.BASE_URL}logo-black.png`
            }
            alt="Ritika Joshi Logo"
            className="w-5 h-5 object-contain transition-all duration-500"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
          {["About", "Experience", "Projects", "Resume"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="relative hover:text-teal-600 dark:hover:text-cyan-400 transition duration-300 
                         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] 
                         after:bg-teal-600 dark:after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </button>
          ))}

          {/* Desktop Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FiMoon className="w-5 h-5 text-gray-800" />
            ) : (
              <FiSun className="w-5 h-5 text-white-400" />
            )}
          </button>
        </nav>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-5 md:hidden">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FiMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            ) : (
              <FiSun className="w-5 h-5 text-white-400" />
            )}
          </button>

          {/* Hamburger / Close Icon */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none z-50 relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence initial={false} mode="wait">
              {menuOpen ? (
                <motion.svg
                  key="close"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="absolute w-7 h-7 text-black dark:text-white transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="absolute w-7 h-7 text-black dark:text-white transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-black flex flex-col items-center justify-center md:hidden 
                       z-40 transition-colors duration-500"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
              }}
              className="flex flex-col space-y-8 text-2xl font-medium text-black dark:text-white"
            >
              {["About", "Experience", "Projects", "Resume"].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <button
                    onClick={() => {
                      scrollToSection(item.toLowerCase());
                      setMenuOpen(false);
                    }}
                    className="hover:text-teal-600 dark:hover:text-cyan-400 transition"
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
