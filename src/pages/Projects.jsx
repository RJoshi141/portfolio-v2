import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(6);
  const sectionRef = useRef(null);

  const projects = [
    {
      name: "Cinemate",
      description:
        "Discover and track your favorite movies with personalized recommendations, trivia, and interactive features.",
      tech: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "TMDB API"],
      github: "https://github.com/RJoshi141/cinemate",
    },
    {
      name: "EventReady",
      description:
        "A full-stack web app for event management with goal tracking, budget planning, and attendance tools.",
      tech: ["Django", "React", "MUI", "JavaScript"],
      github: "https://github.com/RJoshi141/EventReady",
    },
    {
      name: "KroDash",
      description:
        "A Flask-based data dashboard built for Kroger, improving data analysis and decision-making with visual insights.",
      tech: ["Flask", "SQLAlchemy", "Azure", "HTML", "PostgreSQL"],
      github: "https://github.com/RJoshi141/KroDash",
    },
    {
      name: "Reddit Clone",
      description:
        "A Reddit-style site featuring post creation, upvoting, comments, and user profiles for community interaction.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/RJoshi141/reddit-clone",
    },
    {
      name: "Lumon Interface",
      description:
        "A recreation of Severance’s retro-futuristic Lumon interface with grid animations and immersive visuals.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/RJoshi141/lumon-interface",
    },
    {
      name: "SkyCast",
      description:
        "Weather app showing real-time forecasts, parameters like humidity, temperature, and wind speed using APIs.",
      tech: ["React", "Tailwind CSS", "Weather API"],
      github: "https://github.com/RJoshi141/skycast",
    },
    {
      name: "Retro Snake Game",
      description:
        "A classic Snake game built using Python’s Turtle graphics library and Freegames module.",
      tech: ["Python", "Turtle Graphics", "Freegames"],
      github: "https://github.com/RJoshi141/snake-game",
    },
    {
      name: "Meteor Shooter Game",
      description:
        "A neon arcade-style space shooter built with Pygame, featuring dynamic meteor physics and increasing difficulty.",
      tech: ["Python", "Pygame"],
      github: "https://github.com/RJoshi141/meteor-shooter",
    },
    {
      name: "Matrix",
      description:
        "Recreation of The Matrix code rain animation using HTML, CSS, and JavaScript.",
      tech: ["HTML", "JavaScript", "Canvas API"],
      github: "https://github.com/RJoshi141/matrix",
    },
    {
      name: "Pixie",
      description:
        "An online pixel art game to create 8-bit art with grid resizing, undo/redo, and save functionality.",
      tech: ["React", "TypeScript", "Node.js", "CSS"],
      github: "https://github.com/RJoshi141/pixie",
    },
    {
      name: "Portfolio",
      description:
        "This portfolio page showcases my skills, experiences, and projects with responsive design and smooth scroll.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      github: "https://github.com/RJoshi141/portfolio",
    },
    {
      name: "Office Adventure Game",
      description:
        "A text-based adventure game set in the world of The Office, with choices determining the story path.",
      tech: ["Python"],
      github: "https://github.com/RJoshi141/office-adventure",
    },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleShowLess = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setVisibleCount(6), 500);
  };

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-24 bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-7xl mx-auto transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-12 text-gray-900 dark:text-white transition-colors duration-500"
      >
        Projects
      </motion.h2>

      {/* Project Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: (index % 6) * 0.1,
              ease: 'easeOut',
            }}
            className="relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                       rounded-xl shadow-md p-6 hover:shadow-xl 
                       hover:ring-4 hover:ring-teal-500/30 dark:hover:ring-cyan-400/30 
                       hover:-translate-y-1 transition-all duration-300"
          >
            {/* GitHub Icon */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            >
              <FaGithub size={20} />
            </a>

            {/* Title */}
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white transition-colors duration-500">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-500">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 
                             px-3 py-1 rounded-full transition-colors duration-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        {visibleCount < projects.length ? (
          <motion.button
            onClick={handleLoadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-lg text-teal-600 dark:text-cyan-400 font-medium hover:text-teal-800 dark:hover:text-cyan-300 transition-colors duration-300"
          >
            Load more projects ↓
          </motion.button>
        ) : (
          <motion.button
            onClick={handleShowLess}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-lg text-teal-600 dark:text-cyan-400 font-medium hover:text-teal-800 dark:hover:text-cyan-300 transition-colors duration-300"
          >
            Show less projects ↑
          </motion.button>
        )}
      </motion.div>
    </motion.section>
  );
}
