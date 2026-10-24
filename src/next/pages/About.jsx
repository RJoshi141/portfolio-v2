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

      {/* the badge drops in once the name has inked */}
      <div data-fade className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full md:w-[46%] pointer-events-auto" onPointerDown={() => setGrabbed(true)}>
          <Suspense fallback={null}>
            <Lanyard key={theme} position={[0, 0, 25]} gravity={[0, -40, 0]} cardImage="/portfolio-v2/assets/comic-self.png" theme={theme} bandColor={theme === "dark" ? "#3a3a3a" : "#1f1f1e"} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

// Writing: a clean index. One line per piece (number, title, where and when), and the cover
// floats next to the cursor while you hover a row. On phones the cover sits under the title.
const WritingList = () => {
  const box = useRef(null);
  const card = useRef(null);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    const el = box.current;
    const x = gsap.quickTo(card.current, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(card.current, "y", { duration: 0.6, ease: "power3" });
    const mv = (e) => { const r = el.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); };
    el.addEventListener("pointermove", mv);
    return () => el.removeEventListener("pointermove", mv);
  }, []);
  return (
    <div ref={box} className="relative" onPointerLeave={() => setHover(null)}>
      <ul className="border-t border-[var(--line)]">
        {writing.map((w, i) => (
          <li key={w.link} data-fade data-delay={i * 0.08} onPointerEnter={() => setHover(i)}>
            <a href={w.link} target="_blank" rel="noopener noreferrer"
               className={`group grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr_12rem_7rem] items-baseline gap-x-4 gap-y-3 py-6 md:py-8 border-b border-[var(--line)] transition-opacity duration-500 ${hover != null && hover !== i ? "md:opacity-35" : ""}`}>
              <span className="mono text-xs text-[var(--muted)]">{String(i + 1).padStart(3, "0")}</span>
              <span className="text-xl md:text-[2.1rem] font-medium leading-[1.15] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-3">{w.title}</span>
              <span className="col-start-2 md:col-start-auto mono uppercase text-[0.7rem] md:text-xs text-[var(--muted)]">{w.where} · {w.when}</span>
              <span className="hidden md:block mono uppercase text-xs text-[var(--muted)] text-right">{w.read}</span>
              <img src={w.image} alt="" loading="lazy" className="md:hidden col-start-2 w-full aspect-[16/10] object-cover" />
            </a>
          </li>
        ))}
      </ul>
      {/* the floating cover, held just to the right of the cursor so the cursor never sits on it */}
      <div ref={card} className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block">
        <div className={`translate-x-10 -translate-y-1/2 w-[20rem] aspect-[16/10] overflow-hidden transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hover != null ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          {writing.map((w, i) => (
            <img key={w.link} src={w.image} alt="" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hover === i ? "opacity-100" : "opacity-0"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

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
        <h2 data-split="morph" className="text-5xl md:text-8xl tracking-[-0.05em] mb-12">Writing</h2>
        <WritingList />
      </section>
      <Footer />
    </main>
  );
}
