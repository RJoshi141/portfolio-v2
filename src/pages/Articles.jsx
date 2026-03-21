import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import { FaMedium } from "react-icons/fa";
import ShinyText from "../components/ShinyText";

const DURATION = 680;

function useFlip(total) {
  const [current, setCurrent] = useState(0);
  const animating = useRef(false);
  const pagesRef = useRef([]);

  const snap = (el, origin, angle) => {
    if (!el) return;
    el.style.transition = "none";
    el.style.transformOrigin = origin;
    el.style.transform = `rotateY(${angle}deg)`;
    el.getBoundingClientRect();
  };

  const go = (el, angle, cb) => {
    if (!el) return;
    el.style.transition = `transform ${DURATION}ms cubic-bezier(0.645,0.045,0.355,1.000)`;
    el.style.transform = `rotateY(${angle}deg)`;
    setTimeout(() => {
      el.style.transition = "none";
      cb && cb();
    }, DURATION);
  };

  const restack = (newCurrent) => {
    pagesRef.current.forEach((p, i) => {
      if (!p) return;
      if (i < newCurrent) {
        snap(p, "left center", 180);
        p.style.zIndex = 1;
      } else if (i === newCurrent) {
        snap(p, "left center", 0);
        p.style.zIndex = 10;
      } else {
        snap(p, "left center", 0);
        p.style.zIndex = 10 - (i - newCurrent);
      }
    });
  };

  const flipNext = useCallback((currentVal) => {
    if (currentVal >= total - 1 || animating.current) return;
    animating.current = true;
    const outgoing = pagesRef.current[currentVal];
    const incoming = pagesRef.current[currentVal + 1];
    snap(incoming, "left center", 0);
    if (incoming) incoming.style.zIndex = 5;
    snap(outgoing, "left center", 0);
    if (outgoing) outgoing.style.zIndex = 20;
    go(outgoing, 180, () => {
      if (outgoing) outgoing.style.zIndex = 1;
      const next = currentVal + 1;
      animating.current = false;
      restack(next);
      setCurrent(next);
    });
  }, [total]);

  const flipPrev = useCallback((currentVal) => {
    if (currentVal <= 0 || animating.current) return;
    animating.current = true;
    const returning = pagesRef.current[currentVal - 1];
    const beneath = pagesRef.current[currentVal];
    snap(beneath, "left center", 0);
    if (beneath) beneath.style.zIndex = 5;
    snap(returning, "left center", 180);
    if (returning) returning.style.zIndex = 20;
    go(returning, 0, () => {
      const prev = currentVal - 1;
      animating.current = false;
      restack(prev);
      setCurrent(prev);
    });
  }, []);

  return { current, pagesRef, flipNext, flipPrev };
}

export default function Articles() {
  const articles = [
    {
      title: "I Interviewed at Atlassian — Here's Everything You Need to Know",
      description:
        "When I got the chance to interview at Atlassian for a Full Stack Software Engineer role, I wasn't sure what to expect. I'd heard about their unique team-based hiring process.",
      link: "https://medium.com/@ritikajoshi141/i-interviewed-at-atlassian-heres-everything-you-need-to-know-b126553a03d5",
      author: "Ritika Joshi",
      date: "Dec 2025",
      readTime: "8 min read",
    },
    {
      title: "AWS Front End Interview Series: From Application to Phone Screen — Part 1",
      description:
        "A recent CS grad who went through the full front-end engineering interview process at Amazon Web Services. Here's everything I wish I'd known going in.",
      link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41",
      author: "Ritika Joshi",
      date: "Jun 2024",
      readTime: "7 min read",
    },
    {
      title: "Marking Milestones",
      description:
        "In my student address, I shared how our class navigated the twists and turns of UC together — united as Bearcats through Juncta Juvant and Next Lives Here.",
      link: "https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html",
      author: "University of Cincinnati News",
      date: "Apr 2024",
      readTime: "9 min read",
    },
  ];

  const N = articles.length;
  const { current, pagesRef, flipNext, flipPrev } = useFlip(N);

  return (
    <motion.section
      id="articles"
      className="scroll-mt-24 bg-white dark:bg-black text-black dark:text-white
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),minmax(0,1.2fr)] items-start">

        {/* Left column */}
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

        {/* Right column — book */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5"
        >
          {/* Book — no shadow boxes, auto height */}
          <div className="relative w-full" style={{ perspective: "1600px" }}>
            <div className="relative w-full" style={{ minHeight: "320px" }}>
              {articles.map((article, i) => (
                <div
                  key={i}
                  ref={(el) => (pagesRef.current[i] = el)}
                  className="absolute inset-0 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    transform: "rotateY(0deg)",
                    zIndex: 10 - i,
                    borderRadius: "4px 12px 12px 4px",
                    willChange: "transform",
                  }}
                  onClick={() => {
                    if (i === current && current < N - 1) flipNext(current);
                  }}
                >
                  {/* Front face */}
                  <div
                    className="absolute inset-0 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 flex flex-col overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: "4px 12px 12px 4px",
                      padding: "clamp(1.25rem, 4vw, 2rem)",
                    }}
                  >
                    {/* Spine */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-200 dark:bg-neutral-700 rounded-tl-sm rounded-bl-sm" />

                    {/* Dark-mode-only gloss */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10 hidden dark:block"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 100%)",
                        borderRadius: "inherit",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-20 flex flex-col h-full justify-between pl-3">
                      <div>
                        {/* Meta row */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-medium tracking-[0.14em] text-gray-500 dark:text-gray-400 uppercase">
                            {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {article.readTime}
                          </span>
                        </div>

                        {/* Rule */}
                        <div className="w-6 h-px bg-gray-200 dark:bg-neutral-700 mb-4" />

                        {/* Date */}
                        <p className="text-xs font-medium tracking-[0.12em] uppercase text-gray-500 dark:text-gray-400 mb-2">
                          {article.date}
                        </p>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-snug mb-3 tracking-tight">
                          {article.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {article.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-neutral-800 pt-4 mt-4 flex-wrap gap-2">
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {article.author}
                        </span>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-semibold text-teal-600 dark:text-cyan-400 hover:translate-x-0.5 transition-transform duration-200 inline-flex items-center gap-1"
                        >
                          Read article →
                        </a>
                      </div>
                    </div>

                    {/* Folded corner */}
                    <div className="absolute bottom-0 right-0 w-7 h-7 pointer-events-none z-20 overflow-hidden">
                      <div
                        style={{
                          position: "absolute", bottom: 0, right: 0,
                          width: 0, height: 0,
                          borderStyle: "solid",
                          borderWidth: "0 0 28px 28px",
                          borderColor: "transparent transparent #e5e7eb transparent",
                          opacity: 0.7,
                        }}
                        className="dark:!border-b-neutral-700"
                      />
                    </div>
                  </div>

                  {/* Back face */}
                  <div
                    className="absolute inset-0 bg-gray-50 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 flex items-center justify-center overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(-180deg)",
                      borderRadius: "4px 12px 12px 4px",
                    }}
                  >
                    {/* Dark-mode-only gloss on back */}
                    <div
                      className="absolute inset-0 pointer-events-none hidden dark:block"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
                        borderRadius: "inherit",
                      }}
                    />
                    <span className="text-7xl font-light text-gray-200 dark:text-neutral-700 tracking-tighter select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-1 mt-2">
            <button
              onClick={() => flipPrev(current)}
              disabled={current === 0}
              className="flex items-center gap-2 text-xs font-medium tracking-wide
                         text-gray-400 dark:text-gray-500 disabled:opacity-25
                         hover:text-gray-900 dark:hover:text-white transition-colors duration-200
                         border border-gray-200 dark:border-neutral-800 rounded-full px-4 py-2
                         disabled:cursor-not-allowed hover:border-gray-400 dark:hover:border-neutral-600"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>

            <div className="flex items-center gap-2">
              {articles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i > current) flipNext(current);
                    else if (i < current) flipPrev(current);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 bg-gray-900 dark:bg-white"
                      : "w-1.5 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => flipNext(current)}
              disabled={current === N - 1}
              className="flex items-center gap-2 text-xs font-medium tracking-wide
                         text-gray-400 dark:text-gray-500 disabled:opacity-25
                         hover:text-gray-900 dark:hover:text-white transition-colors duration-200
                         border border-gray-200 dark:border-neutral-800 rounded-full px-4 py-2
                         disabled:cursor-not-allowed hover:border-gray-400 dark:hover:border-neutral-600"
            >
              Next
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Mobile tap hint */}
          <p className="text-xs text-center text-gray-400 dark:text-gray-600 tracking-wide lg:hidden">
            Tap the page to flip forward
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}