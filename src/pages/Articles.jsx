import { motion } from "framer-motion";
import { FaMedium } from "react-icons/fa";

export default function Articles() {
  const articles = [
    {
      title: "AWS Front End Interview Series: From Application to Phone Screen — Part 1",
      description:
        "Hi, I’m Ritika, a recent CS grad who recently went through the full front-end engineering interview process at Amazon Web Services (AWS) specifically for the EC2N Console team. The entire journey took nearly 4 months...",
      link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41",
    },
    {
      title: "AWS Front End Interview Series: From Phone Screen to Virtual Loop Onsite — Part 2",
      description:
        "If you’re reading this, you’re probably preparing for an Amazon front-end interview — or at least deep in the process. In Part 1, I walked through how I applied and optimized my resume, what the OA was like, and how I...",
      link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-phone-screen-to-virtual-loop-onsite-part-2-of-2-bea61498bee7",
    },
  ];

  return (
    <motion.section
      id="articles"
      className="scroll-mt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.h2
        className="text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Articles
      </motion.h2>

      {/* Articles grid */}
      <div className="grid sm:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="group bg-gray-50 dark:bg-card-dark border border-gray-50 dark:border-card-dark 
                       rounded-xl shadow-sm p-8 hover:shadow-xl hover:-translate-y-1 
                       transition-all duration-300"
          >
            <h3
              className="text-2xl font-semibold mb-3 group-hover:text-teal-600 dark:group-hover:text-cyan-400 
                         transition-colors leading-snug"
            >
              {article.title}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base line-clamp-5">
              {article.description}
            </p>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 dark:text-cyan-400 hover:underline font-medium"
            >
              <FaMedium className="w-5 h-5" /> Read on Medium →
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
