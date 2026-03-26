import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import { FaMedium } from "react-icons/fa";
import ShinyText from "../components/ShinyText";
import atlassianImg from "../assets/atlassian.png";
import amazonImg from "../assets/amazon.png";
import ucImg from "../assets/uc.png";

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

  const goTo = useCallback((target) => {
    if (animating.current) return;
    animating.current = true;
    pagesRef.current.forEach((p, i) => {
      if (!p) return;
      p.style.transition = "none";
      p.style.transformOrigin = "left center";
      p.style.transform = i < target ? "rotateY(180deg)" : "rotateY(0deg)";
      p.style.zIndex = i === target ? 10 : i < target ? 1 : 10 - (i - target);
      p.getBoundingClientRect();
    });
    setTimeout(() => {
      animating.current = false;
      setCurrent(target);
    }, 30);
  }, []);

  return { current, pagesRef, flipNext, flipPrev, goTo };
}

export default function Articles() {
  // Page 0 = cover, pages 1-3 = articles
  // Back face of page 0 = atlassian image
  // Back face of page 1 = amazon image
  // Back face of page 2 = uc image
  const pages = [
    { type: "cover" },
    {
      type: "article",
      title: "I Interviewed at Atlassian — Here's Everything You Need to Know",
      description:
        "When I got the chance to interview at Atlassian for a Full Stack Software Engineer role, I wasn't sure what to expect. I'd heard about their unique team-based hiring process.",
      link: "https://medium.com/@ritikajoshi141/i-interviewed-at-atlassian-heres-everything-you-need-to-know-b126553a03d5",
      author: "Ritika Joshi",
      date: "Dec 2025",
      readTime: "8 min read",
      backImage: atlassianImg,
      backImageAlt: "Atlassian",
    },
    {
      type: "article",
      title: "AWS Front End Interview Series: From Application to Phone Screen — Part 1",
      description:
        "A recent CS grad who went through the full front-end engineering interview process at Amazon Web Services. Here's everything I wish I'd known going in.",
      link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41",
      author: "Ritika Joshi",
      date: "Jun 2024",
      readTime: "7 min read",
      backImage: amazonImg,
      backImageAlt: "Amazon Web Services",
    },
    {
      type: "article",
      title: "Marking Milestones",
      description:
        "In my student address, I shared how our class navigated the twists and turns of UC together — united as Bearcats through Juncta Juvant and Next Lives Here.",
      link: "https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html",
      author: "University of Cincinnati News",
      date: "Apr 2024",
      readTime: "9 min read",
      backImage: ucImg,
      backImageAlt: "University of Cincinnati",
    },
  ];

  const articles = pages.filter((p) => p.type === "article");
  const N = pages.length;
  const { current, pagesRef, flipNext, flipPrev, goTo } = useFlip(N);

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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr),minmax(0,1fr)] items-center">

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
          className="flex flex-col items-center lg:items-end gap-5"
        >
          <div
            className="relative w-full max-w-[360px] lg:max-w-[460px]"
            style={{ perspective: "1400px" }}
          >
            <div className="relative w-full h-[320px] lg:h-[400px]">
              {pages.map((page, i) => (
                <div
                  key={i}
                  ref={(el) => (pagesRef.current[i] = el)}
                  className="absolute inset-0 cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    transform: "rotateY(0deg)",
                    zIndex: 10 - i,
                    willChange: "transform",
                  }}
                  onClick={() => {
                    if (i === current && current < N - 1) flipNext(current);
                  }}
                >
                  {/* Front face */}
                  <div
                    className="absolute inset-0 bg-gray-50 dark:bg-neutral-900 flex flex-col overflow-hidden border-2 border-gray-200 dark:border-neutral-700"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: "2px 10px 10px 2px",
                    }}
                  >
                    {/* Spine */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-gray-300 dark:bg-neutral-600"
                      style={{ borderRadius: "2px 0 0 2px" }}
                    />

                    {/* Gloss */}
                    <div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 35%, transparent 70%)",
                        borderRadius: "inherit",
                      }}
                    />

                    {page.type === "cover" ? (
                      /* Cover page */
                      <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center gap-4">
                        <div className="w-10 h-px bg-gray-300 dark:bg-neutral-600" />
                        <p className="text-base font-semibold text-gray-700 dark:text-gray-200 leading-snug tracking-tight">
                          Writing & Press
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                          Flip through the pages to read articles Ritika has written and been featured in.
                        </p>
                        <button
                          onClick={(e) => { e.stopPropagation(); flipNext(current); }}
                          className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase
                                     text-gray-400 dark:text-gray-500
                                     hover:text-gray-900 dark:hover:text-white transition-colors duration-200
                                     border border-gray-200 dark:border-neutral-700 rounded-full px-4 py-1.5
                                     hover:border-gray-400 dark:hover:border-neutral-500 mt-1"
                        >
                          Start reading
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <div className="w-10 h-px bg-gray-300 dark:bg-neutral-600" />
                      </div>
                    ) : (
                      /* Article page */
                      <>
                        {/* Top band */}
                        <div className="flex items-center justify-between px-5 py-3 pl-6 lg:py-4 border-b border-gray-100 dark:border-neutral-800 flex-shrink-0 relative z-20">
                          <span className="text-[10px] lg:text-xs font-medium tracking-[0.14em] uppercase text-gray-400 dark:text-gray-500">
                            {String(i).padStart(2, "0")} / {String(N - 1).padStart(2, "0")}
                          </span>
                          <span className="text-[10px] lg:text-xs text-gray-400 dark:text-gray-500">
                            {page.readTime}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex-1 flex flex-col gap-2 lg:gap-3 px-5 py-4 pl-6 lg:px-6 lg:py-5 lg:pl-7 overflow-hidden relative z-20">
                          <p className="text-[10px] lg:text-xs font-medium tracking-[0.12em] uppercase text-gray-400 dark:text-gray-500">
                            {page.date}
                          </p>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white leading-snug tracking-tight">
                            {page.title}
                          </h3>
                          <div className="w-6 h-px bg-gray-200 dark:bg-neutral-700 flex-shrink-0" />
                          <p className="text-xs lg:text-sm font-normal text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
                            {page.description}
                          </p>
                        </div>

                        {/* Company logo watermark — visible on all screen sizes */}
                        {page.backImage && (
                          <div className="absolute bottom-14 right-4 z-20 opacity-70 dark:opacity-50 pointer-events-none lg:hidden">
                            <img
                              src={page.backImage}
                              alt={page.backImageAlt}
                              className="h-12 w-auto object-contain"
                            />
                          </div>
                        )}

                        {/* Footer band */}
                        <div className="flex items-center justify-between px-5 py-3 pl-6 lg:px-6 lg:py-4 lg:pl-7 border-t border-gray-100 dark:border-neutral-800 flex-shrink-0 relative z-20">
                          <span className="text-[11px] lg:text-xs text-gray-400 dark:text-gray-500">
                            {page.author}
                          </span>
                          <a
                            href={page.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[11px] lg:text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 inline-flex items-center gap-1 tracking-wide"
                          >
                            Read article
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </div>

                        {/* Folded corner */}
                        <div
                          className="absolute bottom-0 right-0 pointer-events-none z-20"
                          style={{
                            width: 0, height: 0,
                            borderStyle: "solid",
                            borderWidth: "0 0 20px 20px",
                            borderColor: "transparent transparent #e5e7eb transparent",
                            opacity: 0.6,
                          }}
                        />
                      </>
                    )}
                  </div>

                  {/* Back face — image for cover page back, and for article pages */}
                  <div
                    className="absolute inset-0 bg-gray-50 dark:bg-neutral-900 flex items-center justify-center border-2 border-gray-200 dark:border-neutral-700 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(-180deg)",
                      borderRadius: "10px 2px 2px 10px",
                    }}
                  >
                    {/* Cover back = atlassian, page 1 back = amazon, page 2 back = uc */}
                    {pages[i + 1]?.backImage && (
                      <img
                        src={pages[i + 1].backImage}
                        alt={pages[i + 1]?.backImageAlt}
                        className="w-full h-full object-cover opacity-80 dark:opacity-60"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 w-full max-w-[360px] lg:max-w-[460px] justify-between">
            <button
              onClick={() => {
                if (current === 0) goTo(N - 1);
                else flipPrev(current);
              }}
              className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide
                         text-gray-400 dark:text-gray-500
                         hover:text-gray-900 dark:hover:text-white transition-colors duration-200
                         border border-gray-200 dark:border-neutral-800 rounded-full px-4 py-1.5
                         hover:border-gray-400 dark:hover:border-neutral-600"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Prev
            </button>

            <div className="flex items-center gap-1.5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-[5px] rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-4 bg-gray-900 dark:bg-white"
                      : "w-[5px] bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (current === N - 1) goTo(0);
                else flipNext(current);
              }}
              className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide
                         text-gray-400 dark:text-gray-500
                         hover:text-gray-900 dark:hover:text-white transition-colors duration-200
                         border border-gray-200 dark:border-neutral-800 rounded-full px-4 py-1.5
                         hover:border-gray-400 dark:hover:border-neutral-600"
            >
              Next
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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