// About page (#/about): big title, intro, then each role with what I actually did there
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { experience } from "../data/content";

const ease = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});
const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease },
};

const SectionLabel = ({ children }) => (
  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 mb-8">{children}</p>
);

// One role: company, dates and place on the left; title and bullets on the right
const Role = ({ company, title, when, where, link, caseStudy, bullets = [] }) => (
  <motion.li {...rise} className="py-10 md:py-14 border-t border-neutral-900 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-4 md:gap-16">
    <div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-2xl md:text-[1.75rem] tracking-[-0.015em] text-white"
      >
        {company}
        <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
      </a>
      <p className="mt-2 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-500">{when}</p>
      {where && <p className="mt-1 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-600">{where}</p>}
    </div>
    <div>
      <p className="text-lg md:text-[1.35rem] text-neutral-200">{title}</p>
      <ul className="mt-5 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-4 text-base md:text-lg font-light leading-[1.6] text-neutral-400">
            <span className="mt-[0.7em] w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {caseStudy && (
        <a
          href={caseStudy}
          className="group mt-7 inline-flex items-center gap-2 text-base md:text-lg text-white"
        >
          View work
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      )}
    </div>
  </motion.li>
);

export default function AboutPage() {
  return (
    <>
      <section className="px-5 md:px-12 pt-16 md:pt-28">
        <motion.h1
          {...fadeUp(0)}
          className="text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.045em] leading-none text-white"
        >
          About
        </motion.h1>

        {/* Intro: headline left-aligned across the page, supporting copy below it */}
        <motion.div {...fadeUp(0.15)} className="mt-12 md:mt-20 max-w-5xl">
          <p className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.12] text-white">
            I'm Ritika, a product engineer. I design and build apps for the web and iOS.
          </p>
          <div className="mt-8 space-y-6 text-lg md:text-2xl tracking-tight leading-relaxed text-neutral-400 max-w-4xl">
            <p>
              I'm a founding product engineer at{" "}
              <a href="https://app.joydrop.me/" target="_blank" rel="noopener noreferrer"
                 className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white">
                Joydrop
              </a>
              , where I build the product end to end across web, iOS, and Android with Next.js, Nest.js, and Firebase.
            </p>
            <p>
              On the side I make Apple platform apps like Utter and Zoomies. I studied CS at the University of
              Cincinnati and I'm based in San Francisco.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Experience, expanded */}
      <section className="px-5 md:px-12 pt-24 md:pt-32">
        <SectionLabel>Experience</SectionLabel>
        <ul>
          {experience.map((e) => (
            <Role key={e.company} {...e} />
          ))}
        </ul>
      </section>
    </>
  );
}
