import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Experience() {
  const [activeCompany, setActiveCompany] = useState("Joydrop");

  const experiences = {
    Joydrop: {
      company: "JOYDROP",
      location: "San Francisco, CA",
      title: "Full Stack App Developer",
      duration: "Sep 2025 – Present",
      bullets: [
        "Built and scaled a full-stack platform using Next.js, Nest.js, and Firebase to power real-time recognition and reward interactions.",
        "Optimized frontend and backend performance, improving responsiveness by ~30% and enhancing reliability across user sessions.",
        "Partnered with the lead engineer to design scalable architecture supporting fast, joyful social interactions at scale.",
        "Integrated AI-powered text generation features using LLMs to personalize and enhance user engagement across the app.",
        "Contributed to UI/UX improvements that elevate accessibility, interactivity, and user retention through thoughtful design and iteration.",
      ],
    },
    BMEAS: {
      company: "Bright Mind Enrichment & Schooling",
      location: "San Francisco, CA",
      title: "UI/UX Web Developer",
      duration: "Sep 2024 – Jul 2025",
      bullets: [
        "Developed and maintained donation pages, improving usability and secure payment flows, boosting conversions by 20%.",
        "Optimized site responsiveness and load times by 30% by implementing optimized React components and REST API integrations.",
        "Accelerated backend performance, cutting API response times by 35% and lowering bounce rates by 20% with streamlined logic.",
        "Delivered high-performance, accessible features end-to-end, boosting site traffic and engagement by 25%.",
      ],
    },
    Toyota: {
      company: "TOYOTA",
      location: "Georgetown, KY",
      title: "Full Stack Developer – Production Control",
      duration: "May 2023 – Aug 2023",
      bullets: [
        "Reduced manual errors by 20% by designing and deploying SQL pipelines for Supplier Change Requests.",
        "Improved process scalability and collaboration by 30% by automating workflows with MS Azure and Kaizen methods.",
        "Cut manual reporting efforts by 40% by building real-time analytics dashboards with Power BI and integrating CI/CD pipelines.",
        "Improved data retrieval efficiency by 42% by automating supplier change request data infrastructure across 5+ teams.",
      ],
    },
    BECO: {
      company: "BECO Ventures",
      location: "Singapore",
      title: "UI Process Engineer",
      duration: "Sep 2022 – Dec 2022",
      bullets: [
        "Enabled real-time monitoring of 10K+ greenhouse sensor readings by developing a cloud-based data processing pipeline.",
        "Increased user efficiency by 40% by building interactive dashboards with React, Python, SQL, and MongoDB.",
        "Streamlined reporting, cutting generation time by 30% and improving accessibility by 55% through real-time processing systems.",
        "Improved product reliability and adoption by optimizing AWS infrastructure for 99.9% uptime and refining user flows.",
      ],
    },
    PnG: {
      company: "P&G – UC Simulation Center",
      location: "Cincinnati, OH",
      title: "Data Analyst",
      duration: "Jan 2022 – Apr 2022",
      bullets: [
        "Designed automated analytics with Excel VBA + REST APIs, reducing processing time by 40% for global warehouse operations.",
        "Produced Power BI dashboards that improved decision-making speed by 25% across 3+ time zones.",
        "Validated data accuracy and improved reliability by integrating PyTest and automated testing pipelines.",
        "Facilitated multi-time-zone collaboration by designing a shared analytics system enabling consistent data entry worldwide.",
      ],
    },
    Kroger: {
      company: "KROGER – Virtual Innovation Studio",
      location: "Cincinnati, OH",
      title: "CS Intern",
      duration: "Jan 2020 – Apr 2020",
      bullets: [
        "Increased customer engagement by 15% and retention by 10% by enhancing Kroger Plus iOS app features based on usage data.",
        "Boosted user interaction by 20% by analyzing customer behavior and delivering personalized promotions.",
        "Improved accessibility for 500K+ users by designing and implementing new navigation features.",
        "Incorporated customer feedback into iterative UI/UX updates, raising App Store ratings by 12%.",
      ],
    },
  };

  const active = experiences[activeCompany];

  // Animation variants
  const leftFade = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.7, ease: "easeOut" },
    },
  };

  const leftItem = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const rightFadeInitial = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="experience"
      className="scroll-mt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Section title */}
      <motion.h2
        variants={leftFade}
        className="text-5xl font-bold mb-12 text-gray-900 dark:text-white transition-colors duration-500"
      >
        Experience
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left list (slides on first view only) */}
        <motion.div
          variants={leftFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hidden md:flex md:flex-col md:w-1/3 border-l-2 border-gray-200 dark:border-gray-700 
                     pl-6 space-y-6 transition-colors duration-500"
        >
          {Object.entries(experiences).map(([key, exp]) => (
            <motion.button
              key={key}
              variants={leftItem}
              onClick={() => setActiveCompany(key)}
              className={`block text-left w-full text-lg font-medium transition-colors duration-300 ${
                activeCompany === key
                  ? "text-teal-600 dark:text-cyan-400 border-l-4 border-teal-600 dark:border-cyan-400 -ml-[10px] pl-[6px]"
                  : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              }`}
            >
              {exp.company}
              <br />
              <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                {exp.location}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Right content (keep your animation untouched, only color logic changed) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCompany}
            variants={rightFadeInitial}
            initial="hidden"
            whileInView="visible"
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden md:block md:w-2/3 bg-gray-50 dark:bg-gray-900 
                       rounded-lg shadow-sm p-8 transition-colors duration-500"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-500"
            >
              {active.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-500"
            >
              {active.duration}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="list-disc pl-5 space-y-3 text-gray-700 dark:text-gray-300 transition-colors duration-500"
            >
              {active.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>

        {/* Mobile accordion (dark mode support only) */}
        <div className="md:hidden flex flex-col space-y-4 transition-colors duration-500">
          {Object.entries(experiences).map(([key, exp]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className={`rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-500 ${
                activeCompany === key
                  ? "bg-gray-50 dark:bg-gray-900 border-teal-500 dark:border-cyan-400"
                  : "bg-white dark:bg-black"
              }`}
            >
              <button
                onClick={() => setActiveCompany(key)}
                className="w-full text-left p-4 flex justify-between items-center font-medium text-lg text-gray-800 dark:text-gray-200 transition-colors duration-500"
              >
                <div>
                  <span>{exp.company}</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.location}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    activeCompany === key
                      ? "rotate-180 text-teal-600 dark:text-cyan-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {activeCompany === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-500 dark:text-gray-400 mb-3 text-sm">
                      {exp.duration}
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
