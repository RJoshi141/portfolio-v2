import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import HomeScreen from "../components/HomeScreen";
import Contact from "../components/Contact";
import Companies from "../components/Companies";
import { featured, selected } from "../data/projects";
import { experience, writing } from "../data/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const SectionLabel = ({ children }) => (
  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 mb-8">{children}</p>
);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-5 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24">
        <motion.h1
          {...fadeUp(0)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[1.02] text-white max-w-6xl"
        >
          I build first versions of products, end to end.
        </motion.h1>
        <motion.p {...fadeUp(0.15)} className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
          Founding product engineer at{" "}
          <a href="https://app.joydrop.me/" target="_blank" rel="noopener noreferrer" className="text-carnation hover:underline">
            Joydrop
          </a>
          . iOS, watchOS, and full-stack web, from sketch to shipped.
        </motion.p>
      </section>

      {/* Featured rail: bleeds off the right edge like the reference */}
      <section id="work" className="scroll-mt-24">
        <div className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory px-5 md:px-12 pb-4 scroll-px-5 md:scroll-px-12
                        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} size="lg" index={i} />
          ))}
          <div className="shrink-0 w-1 md:w-4" aria-hidden />
        </div>
      </section>

      {/* Selected work grid */}
      <section className="px-5 md:px-12 pt-24 md:pt-32">
        <SectionLabel>Selected work</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {selected.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i % 2} />
          ))}
        </div>
      </section>

      {/* About: tappable home screen */}
      <section id="about" className="scroll-mt-24 px-5 md:px-12 pt-24 md:pt-32">
        <SectionLabel>About</SectionLabel>
        <HomeScreen />
      </section>

      <Companies />

      {/* Experience */}
      <section className="px-5 md:px-12 pt-24 md:pt-32">
        <SectionLabel>Experience</SectionLabel>
        <ul>
          {experience.map((e) => (
            <li key={e.company}>
              <a
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_1fr_auto] gap-x-4 py-5 border-t border-neutral-900
                           text-base md:text-lg hover:bg-neutral-950 transition-colors"
              >
                <span className="text-white">{e.company}</span>
                <span className="hidden md:block text-neutral-500">{e.title}</span>
                <span className="text-neutral-500 tabular-nums">{e.when}</span>
                <span className="md:hidden col-span-2 text-neutral-500 mt-0.5 text-sm">{e.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Writing */}
      <section id="writing" className="scroll-mt-24 px-5 md:px-12 pt-24 md:pt-32">
        <SectionLabel>Writing</SectionLabel>
        <ul>
          {writing.map((w) => (
            <li key={w.link}>
              <a
                href={w.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-8 py-5 border-t border-neutral-900"
              >
                <span className="text-lg md:text-2xl tracking-tight text-white group-hover:text-carnation transition-colors">
                  {w.title}
                </span>
                <span className="text-sm text-neutral-500 shrink-0">
                  {w.where} · {w.when}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <Contact />
    </>
  );
}
