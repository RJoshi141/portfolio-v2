import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArticleCarousel({ articles }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return (prev + 1) % articles.length;
      }
      return (prev - 1 + articles.length) % articles.length;
    });
  };

  const currentArticle = articles[currentIndex];

  return (
    <div className="relative w-full">
      <div className="rounded-3xl bg-white dark:bg-card-dark border border-gray-200 dark:border-card-dark p-8 lg:p-10 shadow-lg transition-colors duration-500">
        <div className="flex justify-between items-center text-xs sm:text-sm uppercase tracking-[0.25em] text-teal-600 dark:text-red-400 mb-6">
          <span>Featured story</span>
          <span>
            {String(currentIndex + 1).padStart(2, "0")}/{String(articles.length).padStart(2, "0")}
          </span>
        </div>

        <div className="overflow-hidden min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.article
              key={currentArticle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{currentArticle.date} · {currentArticle.readTime}</p>
                <h3 className="text-2xl lg:text-3xl font-semibold leading-tight text-gray-900 dark:text-white">
                  {currentArticle.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {currentArticle.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>By {currentArticle.author}</span>
                <a
                  href={currentArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 dark:text-red-400 font-semibold hover:underline underline-offset-4 transition-colors duration-300"
                >
                  {currentArticle.link.includes("uc.edu/news") ? "Read on UC News" : "Read on Medium"}
                </a>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo("prev")}
              aria-label="Previous article"
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-600 hover:text-teal-600 dark:hover:border-red-400 dark:hover:text-red-400 transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => goTo("next")}
              aria-label="Next article"
              className="p-3 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-600 hover:text-teal-600 dark:hover:border-red-400 dark:hover:text-red-400 transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {articles.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-teal-600 dark:bg-red-400"
                    : "w-3 bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

