import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import ShinyText from "../components/ShinyText";

import utterFrame from "../assets/project-frames/utter-watch-ultra.png";
import zoomiesFrame from "../assets/project-frames/zoomies-iphone.png";
import cinemateFrame from "../assets/project-frames/cinemate-ipad.png";
import harmoniFrame from "../assets/project-frames/harmoni-frames.png";
import portfolioFrame from "../assets/project-frames/potfolio-frames.png";
import rubiksFrame from "../assets/project-frames/rubiks-mac.png";
import lumonFrame from "../assets/project-frames/lumon-frames.png";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});

  const projects = [
    {
      name: "Utter",
      description: "Voice capture for Apple Watch and iPhone. Speak a thought on your wrist, transcribe and organize it on your phone.",
      tech: ["Swift", "watchOS", "SwiftUI", "WatchConnectivity"],
      github: "https://github.com/RJoshi141/utter",
      frame: utterFrame,
      frameType: "watch",
    },
    {
      name: "Zoomies",
      description: "Retro 2D endless runner built with SpriteKit and Swift, with custom pixel sprites and UI.",
      tech: ["Swift", "iOS", "SpriteKit", "Xcode"],
      github: "https://github.com/RJoshi141/Zoomies",
      frame: zoomiesFrame,
      frameType: "iphone-lg",
    },
    {
      name: "Cinemate",
      description: "Discover and track your favorite movies with personalized recommendations, trivia, and interactive features.",
      tech: ["React", "TypeScript", "TMDB API"],
      github: "https://github.com/RJoshi141/cinemate",
      frame: cinemateFrame,
      frameType: "ipad-sm",
    },
    {
      name: "Portfolio",
      description: "Personal site with AI chatbot, physics-based 3D lanyard, light/dark mode, and smooth animations.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/RJoshi141/portfolio-v2",
      frame: portfolioFrame,
      frameType: "mac-lg",
    },
    {
      name: "Harmoni",
      description: "A full-stack Spotify dashboard to explore your listening profile, edit playlists, and control playback.",
      tech: ["React", "Spotify Web API", "Vercel"],
      github: "https://github.com/RJoshi141/harmoni",
      frame: harmoniFrame,
      frameType: "ipad-sm",
    },
    {
      name: "Lumon Interface",
      description: "A recreation of Severance's retro-futuristic Lumon terminal with grid animations and immersive visuals.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/RJoshi141/lumon",
      frame: lumonFrame,
      frameType: "lumon",
    },
    {
      name: "Rubik's Cube Solver",
      description: "Interactive 3D Rubik's Cube visualizer and trainer built with React and Three.js.",
      tech: ["React", "Three.js", "3D Graphics"],
      github: "https://github.com/RJoshi141/RubiksMaster",
      frame: rubiksFrame,
      frameType: "mac",
    },
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  const toggle = (index) => setOpenIndex((prev) => (prev === index ? null : index));

  const frameClass = (frameType) => {
    switch (frameType) {
      case "watch":     return "w-[60%] max-w-[320px]";
      case "iphone":    return "w-[55%] max-w-[280px]";
      case "iphone-lg": return "w-[75%] max-w-[380px]";
      case "ipad-sm":   return "w-[80%] max-w-[560px]";
      case "ipad":      return "w-[60%] max-w-[420px]";
      case "lumon":     return "w-[70%] max-w-[520px]";
      case "mac-lg":    return "w-full max-w-[700px]";
      default:          return "w-[80%] max-w-[560px]";
    }
  };

  return (
    <motion.section
      id="projects"
      className="scroll-mt-24 bg-white dark:bg-black text-black dark:text-white
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-end justify-between border-b border-gray-200 dark:border-neutral-800 pb-4 mb-0 gap-4">
        <div className="flex flex-col space-y-2">
          <ShinyText
            text="GitHub"
            disabled={false}
            speed={3}
            className="text-sm font-semibold uppercase tracking-[0.3em]"
          />
          <ScrollFloat
            containerClassName="text-left"
            textClassName="text-4xl font-bold uppercase text-gray-900 dark:text-white transition-colors duration-500"
          >
            Projects
          </ScrollFloat>
        </div>
        <span className="text-xs font-medium tracking-[0.12em] text-gray-400 dark:text-gray-500 pb-1">
          {String(projects.length).padStart(2, "0")} WORKS
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {visibleProjects.map((project, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border-b border-gray-100 dark:border-neutral-900"
            >
              {/* Row header */}
              <button
                onClick={() => toggle(index)}
                className="w-full grid grid-cols-[2.5rem_1fr_auto] items-center gap-5
                           px-2 py-5 text-left
                           transition-colors duration-200
                           hover:bg-gray-50 dark:hover:bg-neutral-950 rounded-md"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                    {project.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-0.5">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[200px]">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-gray-100 dark:bg-neutral-900
                                   text-gray-700 dark:text-gray-300
                                   px-2 py-0.5 rounded-full
                                   border border-gray-200 dark:border-neutral-800
                                   transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Expanded image panel */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 pb-8 pt-4 flex flex-col items-center">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/img relative w-full flex items-center justify-center"
                      >
                        {/* Skeleton shown until image loads */}
                        {!loadedImages[index] && (
                          <div
                            className={`animate-pulse rounded-xl bg-gray-100 dark:bg-neutral-900 ${frameClass(project.frameType)}`}
                            style={{ aspectRatio: project.frameType === "watch" ? "1/1.4" : project.frameType.includes("iphone") ? "9/16" : "16/10" }}
                          />
                        )}

                        {/* Image fades + rises in once loaded */}
                        <motion.img
                          src={project.frame}
                          alt={`${project.name} preview`}
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={loadedImages[index]
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: 12, scale: 0.98 }
                          }
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [index]: true }))}
                          className={`h-auto object-contain transition-transform duration-300
                            group-hover/img:scale-[1.03]
                            ${loadedImages[index] ? "block" : "absolute opacity-0 pointer-events-none"}
                            ${frameClass(project.frameType)}`}
                        />

                        {/* View Project overlay */}
                        <div className="absolute inset-0 flex items-center justify-center
                                        opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                          <span className="bg-white/90 dark:bg-black/80 text-gray-900 dark:text-white
                                           text-xs font-semibold tracking-widest uppercase
                                           px-4 py-2 rounded-full border border-gray-200 dark:border-neutral-700">
                            View Project
                          </span>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Load more / GitHub */}
      <div className="pt-4 flex justify-center">
        {!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-medium text-teal-600 dark:text-cyan-400 hover:underline flex items-center gap-2 transition-colors duration-200"
          >
            Show more projects <ChevronDown className="w-4 h-4" />
          </button>
        ) : (
          <a
            href="https://github.com/RJoshi141?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-teal-600 dark:text-cyan-400 hover:underline flex items-center gap-2 transition-colors duration-200"
          >
            More on GitHub
          </a>
        )}
      </div>
    </motion.section>
  );
}