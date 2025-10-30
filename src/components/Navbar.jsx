import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Code2, Newspaper, Award, FileText } from "lucide-react";
import "../styles/themeToggle.css"; // ✅ keep this import

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme to <html> + persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sync with system changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { name: "About", icon: <User size={20} /> },
    { name: "Experience", icon: <Briefcase size={20} /> },
    { name: "Projects", icon: <Code2 size={20} /> },
    { name: "Articles", icon: <Newspaper size={20} /> },
    { name: "Leadership", icon: <Award size={20} /> },
    { name: "Resume", icon: <FileText size={20} /> },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full bg-white dark:bg-black text-black dark:text-white 
                 border-b border-gray-200 dark:border-card-dark shadow-sm z-50 transition-colors duration-500"
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
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium relative">
          {navItems.map(({ name, icon }) =>
            name === "Resume" ? (
              <a
                key={name}
                href={`${import.meta.env.BASE_URL}Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group flex items-center justify-center 
                          text-black dark:text-white 
                          hover:text-[#f46565] dark:hover:text-[#f46565]
                          transition-colors duration-200"
              >
                {icon}
                <span
                  className="absolute bottom-[-2.5rem] px-2 py-1 text-xs rounded-md opacity-0 scale-90 
                            group-hover:opacity-100 group-hover:scale-100 bg-card-dark text-white 
                            dark:bg-gray-200 dark:text-black shadow-md transition-all duration-200"
                >
                  {name}
                </span>
              </a>
            ) : (
              <button
                key={name}
                onClick={() => scrollToSection(name.toLowerCase())}
                className="relative group flex items-center justify-center 
                          text-black dark:text-white 
                          hover:text-[#f46565] dark:hover:text-[#f46565]
                          transition-colors duration-200"
              >
                {icon}
                <span
                  className="absolute bottom-[-2.5rem] px-2 py-1 text-xs rounded-md opacity-0 scale-90 
                            group-hover:opacity-100 group-hover:scale-100 bg-card-dark text-white 
                            dark:bg-gray-200 dark:text-black shadow-md transition-all duration-200"
                >
                  {name}
                </span>
              </button>
            )
          )}

          {/* 🌗 Custom Animated Sun–Moon Toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle"
            title="Toggle theme"
            aria-label={theme}
            aria-live="polite"
            className="theme-toggle focus:outline-none w-6 h-6 text-black dark:text-white transition-colors"
          >
            <svg
              className="sun-and-moon"
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <mask className="moon" id="moon-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx="24" cy="10" r="6" fill="black" />
              </mask>
              <circle
                className="sun"
                cx="12"
                cy="12"
                r="5.5"
                mask="url(#moon-mask)"
                fill="currentColor"
              />
          <g
            className="sun-beams"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Vertical */}
            <line x1="12" y1="1.8" x2="12" y2="4.0" />
            <line x1="12" y1="20.0" x2="12" y2="22.2" />

            {/* Horizontal */}
            <line x1="1.8" y1="12" x2="4.0" y2="12" />
            <line x1="20.0" y1="12" x2="22.2" y2="12" />

            {/* Diagonals (slightly closer to sun) */}
            <line x1="4.5" y1="4.5" x2="6.1" y2="6.1" />
            <line x1="17.9" y1="17.9" x2="19.5" y2="19.5" />
            <line x1="4.5" y1="19.5" x2="6.1" y2="17.9" />
            <line x1="17.9" y1="6.1" x2="19.5" y2="4.5" />
          </g>
            </svg>
          </button>
        </nav>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-5 md:hidden">
          {/* Same animated toggle for mobile */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-mobile"
            aria-label={theme}
            className="theme-toggle focus:outline-none w-6 h-6 text-black dark:text-white transition-colors"
          >
            <svg
              className="sun-and-moon"
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <mask className="moon" id="moon-mask-mobile">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <circle cx="24" cy="10" r="6" fill="black" />
              </mask>
              <circle
                className="sun"
                cx="12"
                cy="12"
                r="5.5"
                mask="url(#moon-mask-mobile)"
                fill="currentColor"
              />
          <g
            className="sun-beams"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Vertical */}
            <line x1="12" y1="1.8" x2="12" y2="4.0" />
            <line x1="12" y1="20.0" x2="12" y2="22.2" />

            {/* Horizontal */}
            <line x1="1.8" y1="12" x2="4.0" y2="12" />
            <line x1="20.0" y1="12" x2="22.2" y2="12" />

            {/* Diagonals (slightly closer to sun) */}
            <line x1="4.5" y1="4.5" x2="6.1" y2="6.1" />
            <line x1="17.9" y1="17.9" x2="19.5" y2="19.5" />
            <line x1="4.5" y1="19.5" x2="6.1" y2="17.9" />
            <line x1="17.9" y1="6.1" x2="19.5" y2="4.5" />
          </g>

            </svg>
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

      {/* Mobile Menu (unchanged) */}
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
              {navItems.map(({ name, icon }) => (
                <motion.li
                  key={name}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {name === "Resume" ? (
                    <a
                      href={`${import.meta.env.BASE_URL}Resume.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 justify-center hover:text-[#f46565] transition-colors duration-300 ease-linear"
                    >
                      {icon}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        scrollToSection(name.toLowerCase());
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 justify-center hover:text-[#f46565] transition-colors duration-300 ease-linear"
                    >
                      {icon}
                    </button>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
