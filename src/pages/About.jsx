import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function About() {
  const images = ["ritika-grad.png", "ritika-grad2.JPG"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section
      id="about"
      className="scroll-mt-14 min-h-screen flex flex-col md:flex-row md:items-start md:justify-between 
                 bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
    >
      {/* Left column – text */}
      <motion.div
        className="md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          className="text-5xl font-bold mb-12 text-center md:text-left text-gray-900 dark:text-white transition-colors duration-500"
        >
          About Me
        </h2>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          I believe in creating experiences that feel calm, human, and intentional — the kind that quietly 
          make someone’s day a little smoother or more delightful. For me, good design isn’t about adding more; 
          it’s about making what’s already there feel just right.

        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          When I’m not building or refining something new, you’ll probably find me deep into a binge-worthy series 
          and updating my latest movie thoughts on Letterboxd.

        </p>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 transition-colors duration-500">
          Fun fact: I had the honor of speaking at my graduation as the Student Commencement Speaker.{" "}
          <a
            href="https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html#:~:text=Undergraduate%20student%20speaker%20Ritika%20Joshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 underline hover:text-teal-600 dark:hover:text-teal-600 transition-colors duration-300"
          >
            Give it a read.
          </a>
        </p>
      </motion.div>

      {/* Right column – responsive carousel */}
      <motion.div
        className="md:w-5/12 mt-10 md:mt-[4.5rem] flex justify-center relative rounded-md w-full"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <a
          href="https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html#:~:text=Undergraduate%20student%20speaker%20Ritika%20Joshi"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full relative"
        >
          {/* Image Slider */}
          <div
            className="relative w-full sm:max-w-lg md:max-w-none min-h-[22rem] sm:min-h-[26rem] md:min-h-[30rem] 
                       overflow-hidden rounded-md shadow-md dark:shadow-[0_0_20px_rgba(0,255,255,0.15)]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`Ritika Joshi at UC Commencement ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 
                       text-gray-800 dark:text-white rounded-full p-2 shadow-md 
                       hover:bg-white dark:hover:bg-gray-700 transition"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 
                       text-gray-800 dark:text-white rounded-full p-2 shadow-md 
                       hover:bg-white dark:hover:bg-gray-700 transition"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-teal-600 dark:bg-cyan-400 scale-110"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </a>
      </motion.div>
    </section>
  );
}
