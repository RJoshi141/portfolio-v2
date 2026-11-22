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

// gallery: one row of photos, all the same width (each keeps its own shape)
import galMe from "../../assets/gallery/me.jpg";
import galZip from "../../assets/gallery/zipline.jpg";
import galGame from "../../assets/gallery/game-night.jpg";
import galBridge from "../../assets/gallery/golden-gate.jpg";
import galBook from "../../assets/gallery/book-club.jpg";
import galRun from "../../assets/gallery/run.jpg";
import galCamera from "../../assets/gallery/camera.jpg";
import galZumba from "../../assets/gallery/zumba.jpg";
import galSpeech from "../../assets/gallery/commencement.jpg";
import galGov from "../../assets/gallery/student-gov.jpg";
import galBadminton from "../../assets/gallery/badminton.jpg";
import galGreek from "../../assets/gallery/greek-life.jpg";
const GALLERY = [
  [
    { src: galMe, caption: "Me", label: "Hi :)" },
    { src: galZip, caption: "Ziplining with the Joydrop team", label: "Joydrop team" },
    { src: galGame, caption: "Game night with the team" },
    { src: galBridge, caption: "The Golden Gate and Karl the Fog", label: "San Francisco" },
  ],
  [
    { src: galBook, caption: "Book club at the park", label: "Slow weekends" },
    { src: galRun, caption: "Running the length of the park" },
    { src: galCamera, caption: "Amateur photographer", label: "Hobbies" },
    { src: galZumba, caption: "Community Zumba on campus" },
  ],
  [
    { src: galSpeech, caption: "Commencement speech", label: "University of Cincinnati" },
    { src: galGov, caption: "Student government election" },
    { src: galBadminton, caption: "Badminton nights", label: "Singapore" },
    { src: galGreek, caption: "Greek life", label: "Phi Sigma Rho" },
  ],
];

{ let n = 0; GALLERY.flat().forEach((g) => { if (g.label) g.n = String(++n).padStart(2, "0"); }); }

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

// the badge, swinging on its own in the right column (no name around it)
const Pass = ({ className = "" }) => {
  const theme = useTheme();
  const [grabbed, setGrabbed] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0" onPointerDown={() => setGrabbed(true)}>
        <Suspense fallback={null}>
          <Lanyard key={theme} position={[0, 0, 25]} gravity={[0, -40, 0]} cardImage="/portfolio-v2/assets/comic-self.png" theme={theme} bandColor={theme === "dark" ? "#3a3a3a" : "#1f1f1e"} variant="clear" currently="Founding engineer @ Joydrop" previously={PAST} still />
        </Suspense>
      </div>
      <p className={`pointer-events-none absolute right-0 bottom-2 text-[0.78rem] text-[var(--muted)] transition-opacity duration-700 ${grabbed ? "opacity-0" : "opacity-100"}`}>Grab the badge</p>
    </div>
  );
};

// Writing: a loose gallery of cards, like a portfolio grid. Each column a different image height
// so it reads as a staggered wall; title underneath with the source and date in grey.
const SHAPES = ["aspect-[16/10]", "aspect-[4/5]", "aspect-square"];
const WritingList = () => (
  <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 items-start">
    {writing.map((w, i) => (
      <li key={w.link}>
        <a href={w.link} target="_blank" rel="noopener noreferrer" data-cursor="View article" className="group block">
          <div className="overflow-hidden border border-[var(--line)]">
            <img src={w.image} alt="" loading="lazy" className={`w-full ${SHAPES[i % SHAPES.length]} object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]`} />
          </div>
          <h3 className="mt-3 text-[0.82rem] md:text-[0.86rem] font-medium leading-[1.55]">{w.title}</h3>
          <p className="text-[0.82rem] md:text-[0.86rem] leading-[1.55] text-[var(--muted)]">{w.where} · {w.when}</p>
        </a>
      </li>
    ))}
  </ul>
);

export default function About() {
  const root = useRef(null);
  usePageMotion(root);
  return (
    <main ref={root} className="soft-ink px-5 md:px-10 pt-24 md:pt-28">
      <h1 className="sr-only">About Ritika Joshi</h1>

      {/* after rachelchen.tech/about: a few quiet paragraphs, then a plain list of where I've been.
          The badge swings beside them. */}
      <div className="md:grid md:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] md:gap-x-16 pt-8 md:pt-0">
        <div className="md:order-2 md:sticky md:top-28 md:self-start">
          <Pass className="h-[26rem] md:h-[40rem]" />
        </div>

        <div className="md:order-1 mt-6 md:mt-0 md:pt-[calc(30vh-7rem-0.15rem)]">
          <section className="space-y-3.5 text-[0.85rem] md:text-[0.9rem] leading-[1.55] text-[var(--muted)]">
            <p>I'm a software engineer who loves products, and loves owning them from the first idea to the version people use every day.</p>
            <p>I started at <a href="https://app.joydrop.me/" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--fg)]">Joydrop</a> as a frontend engineer and grew into its founding product engineer. Today I own the app end to end, across web and iOS. I care how things feel, not just whether they work.</p>
            <p>Before that I studied Computer Science at the University of Cincinnati, where co-ops took me to Kroger, P&amp;G, BECO Ventures in Singapore and the factory floor at Toyota.</p>
            <p>Outside of work, I paint with acrylics, cook for friends and go looking for good techno.</p>
          </section>

          <section className="mt-12 md:mt-16">
            <ol className="space-y-4">
              {experience.map((e) => {
                const now = e.when.includes("Now");
                const year = (e.when.match(/\d{4}/g) || []).pop();
                return (
                  <li key={e.company} className="grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[6rem_minmax(0,1fr)_auto] gap-x-4 items-start">
                    <span className="text-[0.82rem] md:text-[0.86rem]" style={{ color: now ? "var(--fg)" : "var(--muted)" }}>{now ? "Now" : year}</span>
                    <div className="min-w-0">
                      <a href={e.link} target="_blank" rel="noopener noreferrer" className="block text-[0.82rem] md:text-[0.86rem] leading-snug hover:underline underline-offset-4">{e.company}</a>
                      <p className="text-[0.82rem] md:text-[0.86rem] leading-snug text-[var(--muted)]">{e.title}</p>
                    </div>
                    {/* the city's landmark, small, with the place */}
                    <span className="col-start-2 md:col-start-auto mt-1 md:mt-0.5 flex items-center gap-2 text-[0.8rem] text-[var(--muted)]">
                      {ICONS[e.whereIcon] && <span aria-hidden className="block h-4 text-[var(--muted)] [&>svg]:h-full [&>svg]:w-auto" dangerouslySetInnerHTML={{ __html: ICONS[e.whereIcon] }} />}
                      {e.where}
                    </span>
                  </li>
                );
              })}
            </ol>
            <a href="#/resume" onClick={go("#/resume")} className="inline-block mt-10 text-[0.82rem] md:text-[0.86rem]"><Roll>Full resume</Roll></a>
          </section>
        </div>
      </div>

      {/* photos, after rachelchen.tech: rows of equal-width pictures, captions on hover */}
      <section className="mt-24 md:mt-32 md:max-w-[46rem]">
        {GALLERY.map((row, r) => (
          <div key={r} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 items-start mt-8 md:mt-12 first:mt-0">
            {row.map((g) => (
              // the caption rides on the cursor while you hover the photo
              <figure key={g.caption}>
                {/* a numbered label where a group starts; the others keep the same space so photos line up */}
                <p className="h-6 md:h-7 text-[0.8rem] md:text-[0.85rem] text-[var(--muted)] whitespace-nowrap">
                  {g.label && <><span className="mr-2">{g.n}</span>{g.label}</>}
                </p>
                <img src={g.src} alt={g.caption} data-cursor={g.caption} loading="lazy" className="w-full h-auto" />
              </figure>
            ))}
          </div>
        ))}
      </section>

      <section className="mt-32 md:mt-48 md:max-w-[46rem]">
        <h2 className="font-normal text-[0.85rem] md:text-[0.9rem] text-[var(--muted)] mb-4">Writing</h2>
        <WritingList />
      </section>
      <Footer />
    </main>
  );
}
