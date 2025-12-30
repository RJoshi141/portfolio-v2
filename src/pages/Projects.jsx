import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollFloat from "../components/ScrollFloat";

// Frame image imports
import zoomiesFrame from "../assets/project-frames/zoomies-iphone.png";
import cinemateFrame from "../assets/project-frames/cinemate-mac.png";
import harmoniFrame from "../assets/project-frames/harmoni-mac.png";
import portfolioFrame from "../assets/project-frames/portfolio-mac.png";
import rubiksFrame from "../assets/project-frames/rubiks-mac.png";
import lumonFrame from "../assets/project-frames/lumon-mac.png";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const projects = [
    {
      name: "Zoomies",
      description:
        "Retro 2D endless runner built with SpriteKit + Swift with custom pixel sprites and UI.",
      tech: ["Swift", "iOS", "SpriteKit", "Xcode"],
      github: "https://github.com/RJoshi141/Zoomies",
      frame: zoomiesFrame,
      frameType: "iphone",
    },
    {
      name: "Cinemate",
      description:
        "Discover and track your favorite movies with personalized recommendations, trivia, and interactive features.",
      tech: ["React", "TypeScript", "TMDB API"],
      github: "https://github.com/RJoshi141/cinemate",
      frame: cinemateFrame,
      frameType: "mac",
    },
    {
      name: "Harmoni",
      description:
        "A full-stack Spotify dashboard that lets you explore your listening profile, edit playlists, and control playback.",
      tech: ["React", "Vercel", "Spotify Web API"],
      github: "https://github.com/RJoshi141/harmoni",
      frame: harmoniFrame,
      frameType: "mac",
    },
    {
      name: "Portfolio",
      description:
        "Personal portfolio with AI chatbot, light/dark mode, 3D interactive elements, and smooth animations.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/RJoshi141/portfolio-v2",
      frame: portfolioFrame,
      frameType: "mac",
    },
    {
      name: "Rubik's Cube Solver",
      description:
        "Interactive 3D Rubik's Cube visualizer and trainer built with React and Three.js.",
      tech: ["React", "Three.js", "3D Graphics"],
      github: "https://github.com/RJoshi141/RubiksMaster",
      frame: rubiksFrame,
      frameType: "mac",
    },
    {
      name: "Lumon Interface",
      description:
        "A recreation of Severance's retro-futuristic Lumon interface with grid animations and immersive visuals.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/RJoshi141/lumon",
      frame: lumonFrame,
      frameType: "mac",
    },
  ];

  const handleLoadMore = () => setShowAll(true);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      className="scroll-mt-24 bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-7xl mx-auto transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ScrollFloat
        containerClassName="mb-16 text-center"
        textClassName="text-4xl font-bold uppercase text-gray-900 dark:text-white transition-colors duration-500"
      >
        Projects
      </ScrollFloat>

      {/* Projects List */}
      <div className="flex flex-col gap-16 md:gap-20">
        {visibleProjects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-8 md:gap-12`}
          >
            {/* Frame Image (Left) */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} on GitHub`}
              className="group relative flex-shrink-0 w-full md:w-[45%] lg:w-[50%]"
            >
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 
                            group-hover:scale-[1.02] 
                            border-2 border-transparent
                            group-hover:border-coral-400 dark:group-hover:border-coral-500
                            flex items-center justify-center">
                <img
                  src={project.frame}
                  alt={`${project.name} preview`}
                  className={`h-auto object-contain ${
                    project.frameType === "iphone" 
                      ? "w-[85%] max-w-[500px]" 
                      : "w-full"
                  }`}
                />
                {/* Hover button */}
                <div className="absolute inset-0 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-coral-400 dark:bg-coral-500 text-white 
                                 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1
                                 shadow-lg">
                    View Project <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>

            {/* Project Details (Right) */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-base md:text-lg max-w-xl">
                {project.description}
              </p>
              {/* Tech Stack */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm font-medium bg-gray-100 dark:bg-neutral-900 
                             text-gray-700 dark:text-gray-300 
                             px-3 py-1.5 rounded-full transition-colors duration-300
                             border border-gray-200 dark:border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Load More / More Projects Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mt-16"
      >
        {!showAll ? (
          <motion.button
            onClick={handleLoadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-lg text-teal-600 dark:text-cyan-400 font-medium 
                     hover:underline underline-offset-4 transition-all duration-300"
          >
            Load more projects ↓
          </motion.button>
        ) : (
          <motion.a
            href="https://github.com/RJoshi141?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 text-lg text-teal-600 dark:text-cyan-400 
                     font-medium hover:underline underline-offset-4 transition-all duration-300"
          >
            More projects on GitHub <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        )}
      </motion.div>
    </motion.section>
  );
}
