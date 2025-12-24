import { motion } from "framer-motion";
import ShinyText from "../components/ShinyText";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiFirebase,
  SiPython,
  SiSwift,
  SiCplusplus,
  SiPostgresql,
  SiMysql,
  SiGraphql,
  SiMongodb,
  SiAmazonwebservices,
  SiDocker,
  SiVercel,
  SiTailwindcss,
  SiOpenai,
} from "react-icons/si";

export default function Home() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4, duration: 0.6, ease: "easeOut" },
    }),
  };

  const techStack = [
    { Icon: SiTypescript, name: "TypeScript" },
    { Icon: SiJavascript, name: "JavaScript" },
    { Icon: SiReact, name: "React" },
    { Icon: SiAngular, name: "Angular" },
    { Icon: SiNextdotjs, name: "Next.js" },
    { Icon: SiNestjs, name: "Nest.js" },
    { Icon: SiNodedotjs, name: "Node.js" },
    { Icon: SiFirebase, name: "Firebase" },
    { Icon: SiPython, name: "Python" },
    { Icon: SiSwift, name: "Swift" },
    { Icon: SiCplusplus, name: "C++" },
    { Icon: SiPostgresql, name: "PostgreSQL" },
    { Icon: SiMysql, name: "SQL" },
    { Icon: SiGraphql, name: "GraphQL" },
    { Icon: SiMongodb, name: "MongoDB" },
    { Icon: SiAmazonwebservices, name: "AWS" },
    { Icon: SiDocker, name: "Docker" },
    { Icon: SiVercel, name: "Vercel" },
    { Icon: SiTailwindcss, name: "Tailwind CSS" },
    { Icon: SiOpenai, name: "LLMs" },
  ];

  return (
    <section
      id="home"
      className="relative scroll-mt-20 flex flex-col justify-center items-start 
                 h-auto md:h-[calc(100vh-5rem)] px-5 sm:px-8 md:px-12 py-24 md:py-0 
                 max-w-6xl mx-auto bg-white dark:bg-black overflow-hidden 
                 transition-colors duration-500"
    >
      <div className="relative z-10 space-y-5 sm:space-y-6 text-left w-full transition-colors duration-500">
        {/* Intro line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-base sm:text-lg font-medium text-teal-600 dark:text-cyan-400 transition-colors duration-500"
        >
          Hi there, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="text-5xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-500"
        >
          <ShinyText 
            text="Ritika Joshi." 
            disabled={false} 
            speed={3} 
            className="" 
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-500"
        >
          Full-Stack Developer & Tech-Creative
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.5}
          className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl text-sm sm:text-base transition-colors duration-500"
        >
          I build intuitive, scalable digital products that connect people and technology.
          Currently, I’m part of the team at{" "}
          <span className="font-medium text-teal-600 dark:text-cyan-400 transition-colors">
            Joydrop
          </span>
          , crafting a real-time platform for recognition and rewards using{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">Next.js</span>,{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">Nest.js</span>, and{" "}
          <span className="font-medium text-gray-800 dark:text-gray-100">Firebase</span>.
        </motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl text-sm sm:text-base transition-colors duration-500"
        >
          I enjoy building products that balance technical precision with thoughtful design, 
          creating experiences that feel effortless for users.
        </motion.p>

        {/* Additional line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
          className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl text-sm sm:text-base transition-colors duration-500"
        >
          Based in San Francisco, I love combining design and engineering to
          build experiences that feel joyful, accessible, and human.
        </motion.p>

        {/* Looping tech stack (seamless loop) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 overflow-x-clip overflow-y-visible border-t border-gray-200 dark:border-gray-700 pt-4 pb-8 transition-colors duration-500"
        >
          <div className="relative flex overflow-x-clip overflow-y-visible whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 65, // shorter duration = faster scroll
                ease: "linear",
              }}
              className="flex gap-8 text-teal-600 dark:text-cyan-400 font-medium text-sm sm:text-base md:text-lg transition-colors duration-500"
            >
              {[...techStack, ...techStack, ...techStack].map((item, index) => (
                <div key={index} className="group relative flex-shrink-0">
                  <item.Icon 
                    className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-200 
                               group-hover:text-black dark:group-hover:text-white" 
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 
                                   opacity-0 group-hover:opacity-100 transition-opacity 
                                   text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap pointer-events-none">
                    {item.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
