// Home: loader-led hero with a masked headline, a velocity marquee, big parallax project cards,
// an index of every project with a preview that follows the cursor, and an about teaser.
import { useRef, useState, useEffect } from "react";
import { featured, selected } from "../../revamp/data/projects";
import { CardVisual, Roll, go, pad, usePageMotion } from "../shared";
import { Footer } from "../NextApp";
import { gsap } from "../motion";
import joydropLogo from "../../assets/joydrop.svg";
import bmeLogo from "../../assets/bme.png";
import toyotaLogo from "../../assets/toyota-logo.png";
import becoLogo from "../../assets/beco-ventures.png";
import pgLogo from "../../assets/pg-logo.png";
import krogerLogo from "../../assets/kroger-logo.png";

const all = [...featured, ...selected];
// the home page's picks: the featured projects minus the iPhone Duo case study (it's still on Works)
const picks = featured.filter((p) => p.slug !== "iphone-duo");

// the company logos from the original site; heights balance wide wordmarks against stacked marks
const COMPANIES = [
  { name: "Joydrop", logo: joydropLogo, h: "h-9 md:h-12" },
  { name: "Toyota", logo: toyotaLogo, h: "h-5 md:h-7" },
  { name: "P&G", logo: pgLogo, h: "h-11 md:h-14" },
  { name: "Kroger", logo: krogerLogo, h: "h-8 md:h-11" },
  { name: "BECO Ventures", logo: becoLogo, h: "h-8 md:h-10" },
  { name: "Bright Mind", logo: bmeLogo, h: "h-9 md:h-12" },
];
const href = (p) => p.link || `#/work/${p.slug}`;
const open = (p) => (p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : { href: href(p), onClick: go(href(p)) });

// one big project card: media leans with scroll speed and drifts inside its frame
export const BigCard = ({ p, i, tall }) => (
  <a {...open(p)} data-cursor="View" className="group block">
    <div>
      {/* no backdrop: the art sits straight on the page, contained and inset so it reads smaller */}
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/5]" : "aspect-[4/3]"} [&_img]:object-contain [&_video]:object-contain`}>
        <div data-speed="0.04" className="absolute inset-[6%] flex items-center justify-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <CardVisual p={p} />
        </div>
      </div>
    </div>
    <div className="mt-4 flex items-baseline justify-between gap-4 text-sm md:text-base">
      <p><span className="mono text-[var(--muted)] mr-3">({pad(i + 1)})</span><Roll>{p.name}</Roll></p>
      <p className="text-[var(--muted)] text-right">{p.tags.join(", ")}</p>
    </div>
  </a>
);

// index rows; hovering one floats its card art next to the cursor
export const Index = ({ items }) => {
  const box = useRef(null);
  const prev = useRef(null);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    const x = gsap.quickTo(prev.current, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(prev.current, "y", { duration: 0.6, ease: "power3" });
    const mv = (e) => { const r = box.current.getBoundingClientRect(); x(e.clientX - r.left); y(e.clientY - r.top); };
    const el = box.current;
    el.addEventListener("pointermove", mv);
    return () => el.removeEventListener("pointermove", mv);
  }, []);
  return (
    <div ref={box} className="relative" onPointerLeave={() => setHover(null)}>
      <ul className="border-t border-[var(--line)]">
        {items.map((p, i) => (
          <li key={p.slug} onPointerEnter={() => setHover(p)}>
            <a {...open(p)} data-fade className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-[5rem_1.2fr_1fr_8rem] items-baseline gap-4 py-5 md:py-7 border-b border-[var(--line)] transition-colors hover:text-[var(--fg)] text-[var(--fg)]">
              <span className="mono text-xs text-[var(--muted)]">({pad(i + 1)})</span>
              <span className="text-2xl md:text-5xl tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-3"><Roll>{p.name}</Roll></span>
              <span className="hidden md:block text-[var(--muted)]">{p.tagline}</span>
              <span className="mono text-xs text-[var(--muted)] text-right">{p.link ? "Site" : p.year || p.tags[0]}</span>
            </a>
          </li>
        ))}
      </ul>
      {/* floating preview */}
      <div ref={prev} className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block">
        <div className={`-translate-x-1/2 -translate-y-1/2 w-[22rem] aspect-[4/3] overflow-hidden transition-[opacity,transform] duration-500 ${hover ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          {hover && <div className="absolute inset-0 flex items-center justify-center [&_img]:object-contain [&_video]:object-contain"><CardVisual p={hover} /></div>}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const root = useRef(null);
  usePageMotion(root);
  return (
    <main ref={root}>
      {/* hero */}
      <section className="min-h-[100svh] px-5 md:px-10 pt-36 md:pt-44 pb-10 flex flex-col justify-between">
        <p data-split="lines" data-now className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)]">(Portfolio 2026) Software engineer, San Francisco</p>
        <h1 data-split="morph" data-now className="text-[15vw] md:text-[10.5vw] leading-[0.88] tracking-[-0.055em]">
          Engineer with a <span className="serif italic tracking-[-0.03em]">designer's</span> eye.
        </h1>
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-end">
          <p data-split="lines" data-now data-delay="0.5" className="text-base md:text-xl font-medium leading-[1.35] max-w-xl">
            I design in the same place I build, so the details that make an app feel good don't get lost between Figma and code.
          </p>
          <p data-fade data-now data-delay="0.8" className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)] md:text-right">Scroll ↓</p>
        </div>
      </section>

      {/* the companies, standing still in one row between two rules */}
      <div className="mx-5 md:mx-10 py-8 md:py-12 border-y border-[var(--line)] flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-8 px-0 md:px-[4%]">
        {COMPANIES.map((c) => (
          <img key={c.name} data-fade src={c.logo} alt={c.name} loading="lazy" className={`${c.h} w-auto`} />
        ))}
      </div>

      {/* selected work */}
      <section className="px-5 md:px-10 pt-28 md:pt-40">
        <div className="flex items-baseline justify-between">
          <h2 data-split="morph" className="text-5xl md:text-8xl tracking-[-0.05em]">Selected <span className="serif italic">work</span></h2>
          <p data-fade className="mono text-xs text-[var(--muted)]">({pad(Math.min(picks.length, 6))})</p>
        </div>
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-x-6 gap-y-20 md:gap-y-32">
          {picks.slice(0, 6).map((p, i) => (
            // staggered editorial layout: wide, then narrow and pushed right, and so on
            <div key={p.slug} data-fade className={i % 2 === 0 ? "md:col-span-5 md:col-start-2" : "md:col-span-4 md:col-start-8 md:mt-40"}>
              <BigCard p={p} i={i} tall={i % 2 === 1} />
            </div>
          ))}
        </div>
        <a href="#/work" onClick={go("#/work")} data-fade className="mt-20 md:mt-28 block text-center text-lg md:text-xl"><span className="border-b border-[var(--fg)] pb-0.5">See all work</span></a>
      </section>

      {/* about teaser */}
      <section className="px-5 md:px-10 pt-32 md:pt-48 grid md:grid-cols-12 gap-8">
        <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)] md:col-span-3">(About)</p>
        <div className="md:col-span-9">
          <p data-split="lines" className="text-2xl md:text-[2.75rem] font-medium leading-[1.12] tracking-[-0.035em]">
            I'm a software engineer who loves products and loves <span className="serif italic">owning</span> them, from the first idea to the version people use every day.
          </p>
          <a href="#/about" onClick={go("#/about")} data-fade className="inline-block mt-10 text-lg"><Roll>⁑ More about me</Roll></a>
        </div>
      </section>

      <div className="px-5 md:px-10"><Footer /></div>
    </main>
  );
}
