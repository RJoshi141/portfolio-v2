import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heart } from "lucide-react";


export default function Leadership() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const leadershipRoles = [
    {
      org: "Undergraduate Student Government",
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
      description:
        "Recognized among UC’s top 100 graduating seniors for academic excellence, leadership, and community impact.",
    },
    {
      title: "Freeman Foundation Scholarship",
      description:
        "Awarded for international outreach and academic excellence during study abroad in Singapore.",
    },
    {
      title: "UC Global Scholarship",
      description:
        "Received for demonstrating cultural engagement and leadership in international education programs.",
    },
    {
      title: "CEAS International Outreach Scholarship",
      description:
        "A merit-based award for international students offered by UC's College of Engineering & Applied Science.",
    },
  ];

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
      <motion.h2
        className="text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Leadership & Accolades
      </motion.h2>

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
      <div className="mt-20 text-center">
        <motion.h3
          className="text-3xl font-semibold mb-12 text-teal-600 dark:text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Accolades
        </motion.h3>
        

        <div className="flex flex-wrap justify-center gap-12">
          {accolades.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group relative w-72 h-72 flex flex-col justify-center items-center text-center
                         rounded-full bg-gray-50 dark:bg-card-dark border border-gray-50 dark:border-card-dark
                         shadow-sm hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300 p-8"
            >
              <h4
                className="text-xl font-semibold mb-3 text-gray-900 dark:text-white
                           group-hover:text-teal-600 dark:group-hover:text-cyan-400 transition-colors duration-300"
              >
                {a.title}
              </h4>

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed px-2">
                {a.description}
              </p>
              
            </motion.div>
            
          ))}
          
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
