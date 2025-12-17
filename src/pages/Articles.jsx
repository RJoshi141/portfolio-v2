import { motion } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import ArticleCarousel from "../components/ArticleCarousel";
import { FaMedium } from "react-icons/fa";
import ShinyText from "../components/ShinyText";

export default function Articles() {
  const articles = [
    {
      title: "I Interviewed at Atlassian — Here's Everything You Need to Know",
      description:
        "When I got the chance to interview at Atlassian for a Full Stack Software Engineer role, I wasn't sure what to expect. I'd heard about their...",
      link: "https://medium.com/@ritikajoshi141/i-interviewed-at-atlassian-heres-everything-you-need-to-know-b126553a03d5",
      author: "Ritika Joshi",
      date: "Dec 2025",
      readTime: "8 min read",
    },
    {
      title: "AWS Front End Interview Series: From Application to Phone Screen — Part 1",
      description:
        "Hi, I’m Ritika, a recent CS grad who recently went through the full front-end engineering interview process at Amazon Web Services...",
      link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41",
      author: "Ritika Joshi",
      date: "Jun 2024",
      readTime: "7 min read",
    },
    {
      title: "AWS Front End Interview Series: From Phone Screen to Virtual Loop Onsite — Part 2",
      description:
        "If you're reading this, you're probably preparing for an Amazon front-end interview — or at least deep in the process. In Part 1...",
      link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-phone-screen-to-virtual-loop-onsite-part-2-of-2-bea61498bee7",
      author: "Ritika Joshi",
      date: "Jul 2024",
      readTime: "9 min read",
    },
    {
      title: "Marking milestones",
      description:
        "In my student address, I shared how our class navigated the twists and turns of UC together — united as Bearcats through Juncta Juvant and Next Lives Here.",
      link: "https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html#:~:text=Undergraduate%20student%20speaker%20Ritika%20Joshi",
      author: "University of Cincinnati News",
      date: "Apr 2024",
      readTime: "9 min read",
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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)] items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <ShinyText 
            text="Writing" 
            disabled={false} 
            speed={3} 
            className="text-sm font-semibold uppercase tracking-[0.3em]" 
          />
          <ScrollFloat
            containerClassName="text-left"
            textClassName="text-4xl font-bold uppercase text-gray-900 dark:text-white transition-colors duration-500"
          >
            Articles
          </ScrollFloat>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
            Deep dives on interviewing at AWS, human-centered design, and building thoughtful product experiences.
          </p>
          <a
            href="https://medium.com/@ritikajoshi141"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-semibold hover:translate-x-1 transition-transform duration-300"
          >
            <FaMedium className="w-5 h-5" />
            Follow on Medium
          </a>
        </motion.div>

        <ArticleCarousel articles={articles} />
      </div>
    </motion.section>
  );
}
