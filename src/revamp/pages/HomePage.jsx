import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import Contact from "../components/Contact";
import Companies from "../components/Companies";
import { featured } from "../data/projects";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});


export default function HomePage() {
  return (
    <>
      {/* Hero: headline + companies */}
      <section className="px-5 md:px-12 pt-20 md:pt-32 pb-20 md:pb-28">
        <motion.h1
          {...fadeUp(0)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[1.02] text-white max-w-6xl"
        >
          Engineer with a designer's eye.
        </motion.h1>

        <Companies />
      </section>

      {/* Featured rail: bleeds off the right edge like the reference */}
      <section>
        <div className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory md:snap-none px-5 md:px-12 pb-4 scroll-px-5 md:scroll-px-12
                        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} size="lg" index={i} />
          ))}
          <div className="shrink-0 w-1 md:w-4" aria-hidden />
        </div>
      </section>

      <div className="px-5 md:px-12 pt-8">
        <a href="#/work" className="inline-flex items-center gap-2 text-base md:text-lg text-neutral-400 hover:text-white transition-colors">
          All work <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <Contact />
    </>
  );
}
