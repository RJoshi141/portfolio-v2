import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heart } from "lucide-react";
import ScrollFloat from "../components/ScrollFloat";
import ShinyText from "../components/ShinyText";


export default function Leadership() {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      // 👇 Public folder images need a leading slash
      images: ["ug1.jpeg", "ug2.jpeg"],
    },
  ];

  const accolades = [
    {
      title: "Senior 100 Cohort 2024",
      date: "MAY 2024",
      description:
        "Recognized among UC’s top 100 graduating seniors for academic excellence, leadership, and community impact.",
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

  const nextSlide = (images) =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = (images) =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

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

      {/* Leadership Cards */}
      <div className="space-y-12">
        {leadershipRoles.map((role, index) => (
          <motion.div
            key={index}
            className="group bg-gray-50 dark:bg-card-dark border border-gray-50 dark:border-card-dark 
                       rounded-xl shadow-sm p-8 hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300 flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            {/* Carousel */}
            <div className="relative w-full md:w-1/2 rounded-lg overflow-hidden shadow-md dark:shadow-[0_0_20px_rgba(0,255,255,0.15)] h-80 md:h-[28rem] bg-gray-200 dark:bg-gray-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={role.images[currentIndex]}
                  src={role.images[currentIndex]}
                  alt={`${role.org} ${currentIndex + 1}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </AnimatePresence>

              {/* Arrows — now visible */}
              <div className="absolute inset-0 flex justify-between items-center px-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => prevSlide(role.images)}
                  className="bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white 
                             rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={() => nextSlide(role.images)}
                  className="bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white 
                             rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {role.images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-teal-600 dark:bg-cyan-400 scale-110"
                        : "bg-gray-400 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold text-teal-600 dark:text-cyan-400">
                {role.org}
              </h3>
              {role.positions.map((pos, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="font-medium text-lg">{pos.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {pos.date}
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    {pos.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accolades Section */}
      <div className="mt-20">
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
                  className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 px-1 py-5 text-left hover:text-teal-600 dark:hover:text-cyan-400 transition-colors duration-300"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{a.title}</p>
                    {activeAccolade === i && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 md:hidden">
                        {a.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {a.date}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {activeAccolade === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden hidden md:block"
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
      {/* ❤️ Made with love note */}
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
