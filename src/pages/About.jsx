import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-14 min-h-screen flex flex-col md:flex-row items-center justify-between 
                 bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-6xl mx-auto overflow-hidden transition-colors duration-500"
    >
      {/* Left column – text */}
      <motion.div
        className="md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500">
          About Me
        </h2>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          I'm a passionate developer with a love for creating beautiful, functional web applications.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          My passion for tech began early, driving me to work on exciting projects and constantly learn.
          I'm excited to contribute my skills and grow with a dynamic team.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          Beyond tech, I thrive in leadership roles. As a Senator-At-Large in the Undergraduate Student
          Government at the University of Cincinnati, I passionately advocated for student interests and
          initiatives, contributing to a vibrant campus community.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          Fun fact: I had the honor of being the Student Commencement Speaker at my graduation, representing
          the Spring 2024 undergraduate class with an impactful address at all three graduation ceremonies.{" "}
          <a
            href="https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html#:~:text=Undergraduate%20student%20speaker%20Ritika%20Joshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 dark:text-cyan-400 underline hover:text-teal-800 dark:hover:text-cyan-300 transition-colors duration-300"
          >
            Check out the highlights
          </a>
        </p>
      </motion.div>

      {/* Right column – image */}
      <motion.div
        className="md:w-5/12 mt-10 md:mt-0 flex justify-center"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <a
          href="https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html#:~:text=Undergraduate%20student%20speaker%20Ritika%20Joshi"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={`${import.meta.env.BASE_URL}ritika-grad.png`}
            alt="Ritika Joshi speaking at UC commencement"
            className="rounded-md shadow-md dark:shadow-[0_0_20px_rgba(0,255,255,0.15)] 
                       hover:shadow-lg hover:dark:shadow-[0_0_25px_rgba(0,255,255,0.25)] 
                       transition-transform duration-300 hover:scale-[1.02] object-cover"
          />
        </a>
      </motion.div>
    </section>
  );
}
