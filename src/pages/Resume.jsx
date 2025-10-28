import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

export default function Resume() {
  const resumePath = `${import.meta.env.BASE_URL}Resume.pdf`;

  return (
    <motion.section
      id="resume"
      className="scroll-mt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-5xl mx-auto flex flex-col items-center transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-12 text-center text-gray-900 dark:text-white transition-colors duration-500"
      >
        Resume
      </motion.h2>

      {/* Static Preview of Resume */}
      <motion.a
        href={resumePath}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl md:max-w-[600px] rounded-xl overflow-hidden 
                   border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl 
                   hover:ring-4 hover:ring-teal-500/30 dark:hover:ring-cyan-400/30 
                   transition-all duration-300"
      >
        <img
          src={`${import.meta.env.BASE_URL}resume-preview.png`}
          alt="Ritika Joshi Resume Preview"
          className="w-full h-auto object-cover rounded-xl"
        />
      </motion.a>

      {/* Download Button */}
      <div className="mt-8">
        <a
          href={resumePath}
          download="Ritika_Joshi_Resume.pdf"
          className="flex items-center justify-center gap-2 bg-teal-600 dark:bg-cyan-500 
                     hover:bg-teal-700 dark:hover:bg-cyan-400 text-white px-6 py-3 
                     rounded-md font-medium shadow-md transition-colors duration-300"
        >
          <FaDownload />
          Download Resume
        </a>
      </div>
    </motion.section>
  );
}
