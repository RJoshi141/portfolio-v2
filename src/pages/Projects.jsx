import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import ScrollFloat from "../components/ScrollFloat";
import TiltedCard from "../components/TiltedCard";

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(6);
  const sectionRef = useRef(null);

  const projects = [
    {
      name: "Zoomies",
      description:
        "Retro 2D endless runner built with SpriteKit + Swift with custom pixel sprites and UI.",
      tech: ["Swift", "iOS", "SpriteKit", "Mobile Game", "Xcode", "Platformer", "Sprite Animation"],
      github: "https://github.com/RJoshi141/Zoomies",
    },
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
      github: "https://github.com/RJoshi141/Capstone-Project",
    },
    {
      name: "Portfolio",
      description:
        "This portfolio page showcases my skills, experiences, and projects with responsive design and smooth scroll.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      github: "https://github.com/RJoshi141/portfolio-v2",
    },
    {
      name: "Taskly",
      description:
        "A clean, minimal to-do list iOS app built with SwiftUI and SwiftData — designed for clarity, speed, and delight.",
      tech: ["Swift", "iOS", "Xcode", "SwiftData"],
      github: "https://github.com/RJoshi141/Taskly",
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
      github: "https://github.com/RJoshi141/lumon",
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
      github: "https://github.com/RJoshi141/retro-snake-game",
    },
    {
      name: "Matrix",
      description:
        "Recreation of The Matrix code rain animation using HTML, CSS, and JavaScript.",
      tech: ["HTML", "JavaScript", "Canvas API"],
      github: "https://github.com/RJoshi141/matrix",
    },
    {
      name: "Office Adventure Game",
      description:
        "A text-based adventure game set in the world of The Office, with choices determining the story path.",
      tech: ["Python"],
      github: "https://github.com/RJoshi141/TextbasedGame",
    },
    {
      name: "KroDash",
      description:
        "A Flask-based data dashboard built for Kroger, improving data analysis and decision-making with visual insights.",
      tech: ["Flask", "SQLAlchemy", "Azure", "HTML", "PostgreSQL"],
      github: "https://github.com/RJoshi141/KroDash",
    },
  ];

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
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
      <ScrollFloat
        containerClassName="mb-12 text-center"
        textClassName="text-4xl font-bold uppercase text-gray-900 dark:text-white transition-colors duration-500"
      >
        Projects
      </ScrollFloat>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: (index % 6) * 0.1,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
            className="h-full"
          >
            <TiltedCard
              className="h-full"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
            >
              <div className="group relative bg-gray-50 dark:bg-card-dark border border-gray-50 dark:border-card-dark 
                             rounded-xl shadow-sm p-8 hover:shadow-xl 
                             transition-all duration-300 h-full">
                {/* GitHub Icon (top-right) */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} on GitHub`}
                  className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 
                             hover:text-black dark:hover:text-white focus-visible:outline-none 
                             focus-visible:ring-2 focus-visible:ring-teal-500 dark:focus-visible:ring-cyan-400 
                             rounded-sm transition-colors duration-300 z-10"
                >
                  <Github className="w-5 h-5" />
                </a>

                {/* Title */}
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-teal-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm font-medium bg-gray-200 dark:bg-tech-dark text-gray-700 dark:text-gray-200 
                                 px-3 py-1 rounded-full transition-colors duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltedCard>
          </motion.div>
        ))}
      </div>

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
            className="text-lg text-teal-600 dark:text-cyan-400 font-medium hover:underline"
          >
            Load more projects ↓
          </motion.button>
        ) : (
          <motion.button
            onClick={handleShowLess}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-lg text-teal-600 dark:text-cyan-400 font-medium hover:underline"
          >
            Show less projects ↑
          </motion.button>
        )}
      </motion.div>
    </motion.section>
  );
}
