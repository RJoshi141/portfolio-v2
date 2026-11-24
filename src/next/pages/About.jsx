// About: the swinging badge between my first and last name up top, then a centered bio,
// experience rows and writing.
import { useRef } from "react";
import { writing } from "../../revamp/data/content";
import { Roll, go, usePageMotion } from "../shared";
import { Footer } from "../NextApp";
import { gsap } from "../motion";


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
    { src: galMe, caption: "Me", label: "Hi" },
    { src: galZip, caption: "Ziplining with the team", label: "Joydrop" },
    { src: galGame, caption: "Game night" },
    { src: galBridge, caption: "Say hi to Karl", label: "SF" },
  ],
  [
    { src: galCamera, caption: "Amateur photographer", label: "Hobbies" },
        { src: galRun, caption: "Firs 5K in the park" },

    { src: galBook, caption: "Book club at the park" },
    { src: galZumba, caption: "Community Zumba" },
  ],
  [
    { src: galSpeech, caption: "Public speaking", label: "University of Cincinnati" },
    { src: galGov, caption: "Student gov election" },
    { src: galBadminton, caption: "Badminton nights", label: "Singapore" },
    { src: galGreek, caption: "Phi Rho House", label: "Greek life" },
  ],
];

{ let n = 0; GALLERY.flat().forEach((g) => { if (g.label) g.n = String(++n).padStart(2, "0"); }); }

// consecutive photos belong to the label above them
const PILES = [];
GALLERY.flat().forEach((g) => { if (g.label || !PILES.length) PILES.push({ label: g.label, n: g.n, items: [] }); PILES[PILES.length - 1].items.push(g); });
const TILT = [-6, 4, -2, 7, -4, 3];
const hand = { fontFamily: '"Caveat", "Bradley Hand", cursive' };
const Polaroid = ({ g, style, className = "" }) => (
  <figure className={`absolute left-1/2 top-0 w-[78%] bg-[#fdfcf9] p-[6%] pb-[4%] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`} style={style}>
    <img src={g.src} alt={g.caption} loading="lazy" className="w-full aspect-square object-cover" />
    <figcaption className="mt-[6%] text-center text-[0.95rem] md:text-[1.05rem] leading-[1.05] text-[#4a4a46] line-clamp-2 min-h-[2.1em]" style={hand}>{g.caption === "Me" ? "Me :)" : g.caption}</figcaption>
  </figure>
);
const Pile = ({ pile }) => {
  const n = pile.items.length;
  return (
    <div className="group relative hover:z-20 focus-within:z-20 outline-none" tabIndex={0}>
      <p className="text-[0.8rem] md:text-[0.85rem] text-[var(--muted)] whitespace-nowrap"><span className="mr-2">{pile.n}</span>{pile.label}</p>
      <div className="relative mt-3 aspect-[5/6]">
        {pile.items.map((g, i) => {
          const rest = TILT[(i + pile.label.length) % TILT.length];
          const spread = (i - (n - 1) / 2) * 72; // % of a polaroid's width
          return (
            <Polaroid key={g.caption} g={g}
              className="[transform:translateX(var(--x0))_rotate(var(--r0))] group-hover:[transform:translateX(var(--x1))_translateY(-6%)_rotate(var(--r1))] group-focus-within:[transform:translateX(var(--x1))_translateY(-6%)_rotate(var(--r1))] hover:!z-10"
              style={{ zIndex: n - i, "--x0": `calc(-50% + ${i * 4}%)`, "--r0": `${rest}deg`, "--x1": `calc(-50% + ${spread}%)`, "--r1": `${n > 1 ? (i - (n - 1) / 2) * 6 : 0}deg` }} />
          );
        })}
      </div>
    </div>
  );
};


// follows the light/dark switch so the badge lighting matches the page
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
          */}
      <div className="md:max-w-[32rem] pt-8 md:pt-0">
        <div className="mt-6 md:mt-0 md:pt-[calc(30vh-7rem-0.15rem)]">
          <section className="space-y-3.5 text-[0.85rem] md:text-[0.9rem] leading-[1.55] text-[var(--muted)]">
            <p>I'm a software engineer who loves products, and loves owning them from the first idea to the version people use every day.</p>
            <p>I started at <a href="https://app.joydrop.me/" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--fg)]">Joydrop</a> as a frontend engineer and grew into its founding product engineer. Today I own the app end to end, across web and iOS. I care how things feel, not just whether they work.</p>
            <p>Before that I studied Computer Science at the University of Cincinnati, where co-ops took me to Kroger, P&amp;G, BECO Ventures in Singapore and the factory floor at Toyota.</p>
          </section>

          <section className="mt-6">
            <a href="#/resume" onClick={go("#/resume")} className="inline-block text-[0.82rem] md:text-[0.86rem]"><Roll>Full resume</Roll></a>
          </section>
        </div>
      </div>

      {/* photos as polaroid piles: each group is a messy stack that fans out when you hover it */}
      <section className="mt-24 md:mt-12 md:max-w-[46rem] grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-y-10">
        {PILES.map((pile) => <Pile key={pile.label} pile={pile} />)}
      </section>

      <section className="mt-32 md:mt-20 md:max-w-[46rem]">
        <h2 className="font-normal text-[0.85rem] md:text-[0.9rem] text-[var(--muted)] mb-4">Writing</h2>
        <WritingList />
      </section>
      <Footer />
    </main>
  );
}
