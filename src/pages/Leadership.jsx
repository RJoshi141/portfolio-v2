import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import ScrollFloat from "../components/ScrollFloat";
import ShinyText from "../components/ShinyText";

export default function Leadership() {
  const [activeAccolade, setActiveAccolade] = useState(null);

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

  const toggleAccolade = (index) => {
    setActiveAccolade((prev) => (prev === index ? null : index));
  };

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
                text="On-campus Experience"
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
                  className="group grid grid-cols-[16px_1fr] gap-x-4"
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
                      <div className="w-px flex-1 mt-1 bg-gray-200 dark:bg-gray-800" />
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
                          className="text-gray-600 dark:text-gray-300 text-base leading-relaxed"
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

          <div className="bg-transparent">
            {accolades.map((a, i) => (
              <div
                key={a.title}
                className={`transition-colors duration-300 ${
                  i !== 0 ? "border-t border-gray-200 dark:border-card-dark" : ""
                }`}
              >
                <button
                  onClick={() => toggleAccolade(i)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 py-5 text-left hover:text-teal-600 dark:hover:text-cyan-400 transition-colors duration-300"
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{a.title}</p>
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {a.date}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccolade === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                        opacity: { duration: 0.3 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 md:pb-6">
                        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                          {a.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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