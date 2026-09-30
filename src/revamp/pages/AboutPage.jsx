// About page (#/about): big title, intro, then each role with what I actually did there
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

// 3D ID card on a lanyard (three.js), loaded only on the About page so it doesn't weigh down the rest
const Lanyard = lazy(() => import("../../components/Lanyard"));
import { ArrowUpRight } from "lucide-react";
import { experience } from "../data/content";
// raw markup so the icon's fill="currentColor" matches the location text color
import sfIcon from "../../assets/city-sf.svg?raw";
import singaporeIcon from "../../assets/city-singapore.svg?raw";
import cincinnatiIcon from "../../assets/city-cincinnati.svg?raw";
import georgetownIcon from "../../assets/city-georgetown-icon.svg?raw"; // cleaned copy of city-georgetown.svg

// landmark line icons shown before each role's location
const ICONS = { sf: sfIcon, singapore: singaporeIcon, cincinnati: cincinnatiIcon, kentucky: georgetownIcon };

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
const Role = ({ company, title, when, where, whereIcon, link, caseStudy, bullets = [] }) => (
  <motion.li {...rise} className="py-10 md:py-14 border-t border-neutral-900 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-4 md:gap-16">
    <div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-xl md:text-[1.4rem] tracking-[-0.015em] text-white"
      >
        {company}
        <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
      </a>
      <p className="mt-2 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-500">{when}</p>
      {where && (
        <p className="mt-1 flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-600">
          {whereIcon && ICONS[whereIcon] && (
            <span
              aria-hidden
              className="inline-flex h-6 md:h-7 shrink-0 [&>svg]:h-full [&>svg]:w-auto"
              dangerouslySetInnerHTML={{ __html: ICONS[whereIcon] }}
            />
          )}
          {where}
        </p>
      )}
      {/* same pill as the contact form's Send button */}
      {caseStudy && (
        <a
          href={caseStudy}
          className="mt-6 inline-block px-7 py-3 rounded-full border border-neutral-700 text-base md:text-lg text-white hover:bg-white hover:text-black transition-colors"
        >
          View work
        </a>
      )}
    </div>
    <div>
      <p className="text-base md:text-[1.1rem] text-neutral-200">{title}</p>
      <ul className="mt-5 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-4 text-sm md:text-base font-light leading-[1.65] text-neutral-400">
            <span className="mt-[0.7em] w-1 h-1 rounded-full bg-neutral-600 shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.li>
);

export default function AboutPage() {
  return (
    <>
      <section className="relative px-5 md:px-16 lg:px-20 pt-16 md:pt-28">
        <motion.h1
          {...fadeUp(0)}
          className="text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.045em] leading-none text-white"
        >
          About
        </motion.h1>

        {/* Draggable ID card on a dark grey lanyard, pushed to the far right so the intro text has room */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease }}
          className="hidden lg:block absolute top-0 -right-4 w-[32%] h-[720px] z-10"
        >
          <Suspense fallback={null}>
            <Lanyard position={[0, 0, 25]} gravity={[0, -40, 0]} cardImage="/portfolio-v2/assets/comic-self.png" bandColor="#3a3a3a" />
          </Suspense>
        </motion.div>

        {/* Intro: short and product-focused */}
        <motion.div {...fadeUp(0.15)} className="mt-12 md:mt-20 max-w-4xl lg:max-w-[62%]">
          <p className="text-2xl md:text-[2.25rem] font-medium tracking-[-0.025em] leading-[1.15] text-white">
            I'm a product engineer who cares how things feel, not just whether they work.
          </p>
          <div className="mt-6 md:mt-8 space-y-5 text-base md:text-[1.15rem] font-light leading-[1.65] text-neutral-400 max-w-3xl">
            <p>
              I'm a founding product engineer at{" "}
              <a href="https://app.joydrop.me/" target="_blank" rel="noopener noreferrer"
                 className="text-white underline decoration-neutral-600 underline-offset-4 hover:decoration-white">
                Joydrop
              </a>
              , building the app across web and iOS. Outside of work I'm usually tinkering on something
              new just for fun.
            </p>
            {/* background: degree, co-ops, and years of experience */}
            <p>
              I studied Computer Science at the University of Cincinnati, where co-ops had me building at Kroger,
              P&amp;G, BECO Ventures in Singapore, and Toyota before I graduated. Add in Bright Mind Enrichment and
              Joydrop, and that's 2+ years of shipping real products across retail, manufacturing, nonprofits, and
              startups.
            </p>
          </div>
        </motion.div>

      </section>

      {/* Experience, expanded */}
      <section className="px-5 md:px-16 lg:px-20 pt-24 md:pt-32">
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
