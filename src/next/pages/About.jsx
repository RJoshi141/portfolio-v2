// About: the swinging badge between my first and last name up top, then a centered bio,
// experience rows and writing.
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { experience, writing } from "../../revamp/data/content";
import { Roll, go, usePageMotion } from "../shared";
import { Footer } from "../NextApp";
import { gsap } from "../motion";
// landmark line icons from the previous site, inlined so fill="currentColor" follows the theme
import sfIcon from "../../assets/city-sf.svg?raw";
import singaporeIcon from "../../assets/city-singapore.svg?raw";
import cincinnatiIcon from "../../assets/city-cincinnati.svg?raw";
import georgetownIcon from "../../assets/city-georgetown-icon.svg?raw";

// the past companies printed as pills on the badge, in their brand colors
const PAST = [
  { label: "Toyota", bg: "#EB0A1E" },
  { label: "P&G", bg: "#003DA5" },
  { label: "BECO", bg: "#141413" },
  { label: "Kroger", bg: "#21409A" },
];

const ICONS = { sf: sfIcon, singapore: singaporeIcon, cincinnati: cincinnatiIcon, kentucky: georgetownIcon };

// the 3D badge from the original site, loaded only here
const Lanyard = lazy(() => import("../../components/Lanyard"));

// follows the light/dark switch so the badge lighting matches the page
const useTheme = () => {
  const get = () => document.documentElement.dataset.theme || "light";
  const [t, setT] = useState(get);
  useEffect(() => {
    const mo = new MutationObserver(() => setT(get()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);
  return t;
};

// the badge hangs from the section's top rule, swinging in the gap between my first and last name
const Pass = () => {
  const theme = useTheme();
  const [grabbed, setGrabbed] = useState(false);
  const fine = "mono text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.18em] leading-[1.7] text-[var(--muted)]";
  return (
    <section className="relative border-t border-[var(--line)] h-[40rem] md:h-[calc(100vh-7rem)] md:min-h-[44rem] overflow-hidden">
      <div data-fade data-delay="0.3" className="absolute right-0 bottom-5"><div className={`text-right ${fine} transition-opacity duration-700 ${grabbed ? "opacity-0" : "opacity-100"}`}>Grab the badge<br />and give it a swing</div></div>

      {/* the name, split around the badge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col md:flex-row md:justify-between md:items-center gap-[22rem] md:gap-0 px-0 md:px-[2%]">
        <span data-split="morph" data-now data-delay="0.1" className="text-[22vw] md:text-[13vw] leading-[0.8] tracking-[-0.065em]">Ritika</span>
        <span data-split="morph" data-now data-delay="0.25" className="serif italic text-right text-[22vw] md:text-[13vw] leading-[0.8] tracking-[-0.03em]">Joshi</span>
      </div>

      {/* the badge drops in once the name has inked; its canvas spans the whole section so it can swing over the name */}
      <div data-fade className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 pointer-events-auto" onPointerDown={() => setGrabbed(true)}>
          <Suspense fallback={null}>
            <Lanyard key={theme} position={[0, 0, 25]} gravity={[0, -40, 0]} cardImage="/portfolio-v2/assets/comic-self.png" theme={theme} bandColor={theme === "dark" ? "#3a3a3a" : "#1f1f1e"} variant="clear" currently="Founding engineer @ Joydrop" previously={PAST} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

// Writing: a loose gallery of cards, like a portfolio grid. Each column a different image height
// so it reads as a staggered wall; title underneath with the source and date in grey.
const SHAPES = ["aspect-[16/10]", "aspect-[4/5]", "aspect-square"];
const WritingList = () => (
  <ul className="max-w-4xl grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 items-start">
    {writing.map((w, i) => (
      <li key={w.link}>
        <a href={w.link} target="_blank" rel="noopener noreferrer" className="group block">
          <div className="overflow-hidden border border-[var(--line)]">
            <img src={w.image} alt="" loading="lazy" className={`w-full ${SHAPES[i % SHAPES.length]} object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]`} />
          </div>
          <h3 className="mt-3 text-[0.95rem] md:text-base font-medium leading-[1.55]">{w.title}</h3>
          <p className="text-[0.95rem] md:text-base font-medium leading-[1.55] text-[var(--muted)]">{w.where} · {w.when}</p>
        </a>
      </li>
    ))}
  </ul>
);

export default function About() {
  const root = useRef(null);
  usePageMotion(root);
  return (
    <main ref={root} className="px-5 md:px-10 pt-24 md:pt-28">
      <h1 className="sr-only">About Ritika Joshi</h1>
      <Pass />

      <section className="mt-24 md:mt-36 max-w-3xl mx-auto text-left">
        <div className="space-y-8">
          <p data-split="lines" className="text-xl md:text-[1.75rem] font-medium leading-[1.25] tracking-[-0.025em]">
            I'm a software engineer who loves products and loves owning them, from the first idea to the version people use every day. I care how things <span className="serif italic">feel</span>, not just whether they work.
          </p>
          <p data-split="lines" className="text-base md:text-[1.1rem] font-medium leading-[1.55] text-[var(--muted)]">
            Right now that means building Joydrop as its founding product engineer, owning the app end to end across web and iOS. I studied Computer Science at the University of Cincinnati, where co-ops had me building at Kroger, P&G, BECO Ventures in Singapore and Toyota.
          </p>
        </div>
      </section>

      {/* previous experiences, after soliciabrown.com/about: an italic label, a big intro with linked
          companies, then entries that zigzag down the page over soft floating shapes */}
      <section className="relative mt-32 md:mt-48">
        <p data-fade className="serif italic text-2xl md:text-3xl text-[var(--muted)] md:ml-[12%]">previous experiences</p>

        {/* soft shapes drifting behind the copy */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-visible">
          <div data-speed="0.25" className="absolute left-[18%] top-[8rem] w-[18rem] h-[22rem] md:w-[22rem] md:h-[26rem] rounded-[48%_52%_55%_45%/50%_42%_58%_50%] rotate-[-25deg] bg-[radial-gradient(circle_at_70%_75%,var(--bg)_0%,var(--blob)_45%,transparent_72%)] opacity-90" />
          <div data-speed="-0.2" className="absolute left-[55%] top-[3rem] w-[13rem] h-[13rem] md:w-[16rem] md:h-[16rem] rounded-full bg-[radial-gradient(circle_at_60%_40%,var(--bg)_0%,var(--blob)_50%,transparent_72%)] opacity-90" />
          <div data-speed="0.3" className="absolute right-[8%] top-[60%] w-[15rem] h-[15rem] rounded-full bg-[radial-gradient(circle_at_40%_60%,var(--bg)_0%,var(--blob)_50%,transparent_72%)] opacity-80" />
        </div>

        <div className="relative md:ml-[25%] md:mr-[8%] mt-16 md:mt-24 space-y-8">
          <p data-split="lines" className="text-xl md:text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em]">
            I started building at <a href="https://apps.apple.com/us/app/kroger/id403901186" target="_blank" rel="noopener noreferrer" className="serif italic underline decoration-1 underline-offset-4 text-[var(--muted)] hover:text-[var(--fg)]">Kroger</a> and{" "}
            <a href="https://us.pg.com/" target="_blank" rel="noopener noreferrer" className="serif italic underline decoration-1 underline-offset-4 text-[var(--muted)] hover:text-[var(--fg)]">P&amp;G</a> as a co-op, then took that to Singapore with{" "}
            <a href="https://beco-ventures.com/" target="_blank" rel="noopener noreferrer" className="serif italic underline decoration-1 underline-offset-4 text-[var(--muted)] hover:text-[var(--fg)]">BECO Ventures</a> and to the factory floor at{" "}
            <a href="https://pressroom.toyota.com/facility/toyota-motor-manufacturing-kentucky/" target="_blank" rel="noopener noreferrer" className="serif italic underline decoration-1 underline-offset-4 text-[var(--muted)] hover:text-[var(--fg)]">Toyota</a>.
          </p>
          <p data-split="lines" className="text-xl md:text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em]">
            Now I'm in San Francisco, building <a href="https://app.joydrop.me/" target="_blank" rel="noopener noreferrer" className="serif italic underline decoration-1 underline-offset-4 text-[var(--muted)] hover:text-[var(--fg)]">Joydrop</a> from zero as its founding product engineer.
          </p>
        </div>

        <ol className="relative mt-24 md:mt-32 space-y-20 md:space-y-28">
          {experience.map((e, i) => {
            const year = (e.when.match(/\d{4}/g) || []).pop();
            // zigzag: left, right, a little further left, right again...
            const pos = ["md:ml-[16%]", "md:ml-[50%]", "md:ml-[20%]", "md:ml-[56%]", "md:ml-[12%]", "md:ml-[46%]"][i % 6];
            return (
              <li key={e.company} data-fade className={`max-w-md ${pos}`}>
                {/* the city's landmark line icon sits on top of the place and year */}
                {ICONS[e.whereIcon] && (
                  <span aria-hidden className="block h-10 md:h-12 mb-3 text-[var(--fg)] [&>svg]:h-full [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: ICONS[e.whereIcon] }} />
                )}
                <p className="serif italic text-xl md:text-2xl text-[var(--muted)]">{e.where}, {e.when.includes("Now") ? "now" : year}</p>
                <p className="mt-4 text-[0.95rem] md:text-base font-medium leading-[1.55]">
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--fg)]">{e.company}</a>, {e.title.toLowerCase()}. {e.bullets[0]}
                </p>
              </li>
            );
          })}
        </ol>
        <a href="#/resume" onClick={go("#/resume")} data-fade className="relative inline-block mt-20 md:ml-[16%] text-lg"><Roll>⁑ Full resume</Roll></a>
      </section>

      <section className="mt-32 md:mt-48">
        <h2 data-fade className="serif italic font-normal text-2xl md:text-3xl text-[var(--muted)] mb-8 md:mb-12">writing</h2>
        <WritingList />
      </section>
      <Footer />
    </main>
  );
}
