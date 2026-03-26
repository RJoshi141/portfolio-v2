import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollFloat from "../components/ScrollFloat";
import ShinyText from "../components/ShinyText";

export default function Leadership() {
  const [accoladeIndex, setAccoladeIndex] = useState(0);

  const leadershipRoles = [
    {
      org: "Student Government",
      positions: [
        {
          title: "Senator-At-Large",
          date: "Apr 2023 – Apr 2024",
          bullets: [
            "Elected as one of 8 Senators-At-Large to represent the UC undergraduate student body.",
            "Led initiatives on Financial Literacy, International Alumni Network & Women-Only-Workout sessions.",
          ],
        },
        {
          title: "Recruitment and Outreach Director",
          date: "Aug 2022 – Dec 2022",
          bullets: [
            "Organized 2-week campus-wide events collaborating with student organizations.",
          ],
        },
        {
          title: "Election Facilitation Committee Member",
          date: "Jan 2022 – Apr 2022",
          bullets: [
            "Ensured campaigns and elections ran smoothly and equitably across campus.",
          ],
        },
        {
          title: "Design Director",
          date: "Aug 2021 – Dec 2021",
          bullets: [
            "Designed event graphics and created the USG Fall Progress Report magazine.",
          ],
        },
      ],
    },
  ];

  const accolades = [
    {
      title: "Senior 100 Cohort 2024",
      date: "MAY 2024",
      description:
        "Recognized among UC's top 100 graduating seniors for academic excellence, leadership, and community impact.",
    },
    {
      title: "Freeman Foundation Scholarship",
      date: "AUG 2022",
      description:
        "Awarded for international outreach and academic excellence during study abroad in Singapore.",
    },
    {
      title: "UC Global Scholarship",
      date: "AUG 2019 – MAY 2024",
      description:
        "Received for demonstrating cultural engagement and leadership in international education programs.",
    },
    {
      title: "CEAS International Outreach Scholarship",
      date: "AUG 2019 – MAY 2024",
      description:
        "A merit-based award for international students offered by UC's College of Engineering & Applied Science.",
    },
  ];

  return (
    <motion.section
      id="leadership"
      className="scroll-mt-24 bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ScrollFloat
        containerClassName="mb-12 text-center"
        textClassName="text-4xl font-bold uppercase text-gray-900 dark:text-white transition-colors duration-500"
      >
        Leadership
      </ScrollFloat>

      {/* Student Government Section */}
      {leadershipRoles.map((role, roleIndex) => (
        <motion.div
          key={roleIndex}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr),minmax(0,2fr)] items-start">

            {/* Left label — mirrors accolades left column exactly */}
            <div className="text-center md:text-left space-y-4">
              <ShinyText
                text="Experience"
                disabled={false}
                speed={3}
                className="text-sm font-semibold uppercase tracking-[0.3em]"
              />
              <h3 className="text-4xl font-bold uppercase text-gray-900 dark:text-white">
                {role.org}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                Held four progressive roles representing and serving the UC undergraduate student body.
              </p>
            </div>

            {/* Right — timeline */}
            <div className="flex flex-col">
              {role.positions.map((pos, posIndex) => (
                <motion.div
                  key={posIndex}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: posIndex * 0.08 }}
                  className="group grid grid-cols-[44px_1fr] gap-x-4"
                >
                  {/* Spine */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-600
                                  bg-white dark:bg-black flex-shrink-0 mt-2
                                  group-hover:bg-gray-900 dark:group-hover:bg-white
                                  group-hover:border-gray-900 dark:group-hover:border-white
                                  transition-all duration-200"
                    />
                    {posIndex < role.positions.length - 1 && (
                      <div className="w-0.5 flex-1 mt-1.5 bg-gray-200 dark:bg-neutral-800" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    {/* Title + date row — matches accolade button row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                        {pos.title}
                      </p>
                      <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {pos.date}
                      </span>
                    </div>
                    {/* Bullets — match accolade description style */}
                    <ul className="space-y-1">
                      {pos.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Accolades Section */}
      <div className="mt-4">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr),minmax(0,2fr)] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left space-y-4"
          >
            <ShinyText
              text="Awards"
              disabled={false}
              speed={3}
              className="text-sm font-semibold uppercase tracking-[0.3em]"
            />
            <h3 className="text-4xl font-bold uppercase text-gray-900 dark:text-white">Accolades</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              Recognition for leadership, impact, and community-building work across UC and abroad.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {/* Carousel card */}
            <div className="border-t border-gray-200 dark:border-card-dark pt-5 min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={accoladeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {accolades[accoladeIndex].title}
                    </p>
                    <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {accolades[accoladeIndex].date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {accolades[accoladeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between md:-mt-4">
              <button
                onClick={() => setAccoladeIndex((prev) => (prev - 1 + accolades.length) % accolades.length)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400
                           hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {accolades.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAccoladeIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === accoladeIndex
                        ? "w-5 h-1.5 bg-gray-900 dark:bg-white"
                        : "w-1.5 h-1.5 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setAccoladeIndex((prev) => (prev + 1) % accolades.length)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400
                           hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Made with love */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 text-center flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400"
      >
        <span className="text-sm font-medium">Made with</span>
        <Heart className="w-4 h-4 text-[#d50202]" fill="#d50202" />
        <span className="text-sm font-medium">by Ritika Joshi.</span>
      </motion.div>
    </motion.section>
  );
}