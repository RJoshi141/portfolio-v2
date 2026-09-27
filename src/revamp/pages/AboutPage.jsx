// About page (#/about), laid out like Gabriel Valdivia's About
import { motion } from "framer-motion";
import { experience } from "../data/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const SectionLabel = ({ children }) => (
  <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 mb-8">{children}</p>
);

export default function AboutPage() {
  return (
    <>
      {/* About: big title, photo left, intro right (Gabriel's About page) */}
      <section className="px-5 md:px-12 pt-16 md:pt-28">
        <motion.h1
          {...fadeUp(0)}
          className="text-7xl md:text-9xl lg:text-[10rem] font-medium tracking-[-0.045em] leading-none text-white"
        >
          About
        </motion.h1>
        <div className="mt-12 md:mt-20 grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-start">
          <motion.img
            {...fadeUp(0.1)}
            src={`${import.meta.env.BASE_URL}assets/comic-self.png`}
            alt="Ritika Joshi"
            className="w-full max-w-md md:max-w-none aspect-[4/5] object-cover object-[50%_30%] rounded-2xl md:rounded-3xl"
          />
          <motion.div {...fadeUp(0.2)}>
            <p className="text-3xl md:text-5xl font-medium tracking-[-0.025em] leading-[1.12] text-white">
              I'm Ritika. I like owning the whole thing, from the Figma file to the production build.
            </p>
            <div className="mt-8 space-y-6 text-lg md:text-2xl tracking-tight leading-relaxed text-neutral-400">
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
        </div>

      </section>

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

    </>
  );
}
