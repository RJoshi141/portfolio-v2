// Extra case study blocks (inspired by Karen Happuch's CalmSphere case study):
// an empathy map, a board of live UI components rebuilt in code, and a tools grid.
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle, Brain, Footprints, Heart, Ear, Target, Users, Check, Droplet,
  ScanText, Mic, LayoutGrid, Database, Map, ChartSpline, Watch, AudioLines, Pause, Trash2, ArrowRight, Sparkles, ArrowLeftRight, Gamepad2, Grid3x3, Rocket, FlaskConical,
} from "lucide-react";
// full-color brand marks (devicon, MIT; OSM from simple-icons in its brand green; Lens drawn to match)
import xcode from "../../assets/tools/color/xcode.png";
import swift from "../../assets/tools/color/swift.svg";
import python from "../../assets/tools/color/python.svg";
import fastapi from "../../assets/tools/color/fastapi.svg";
import postgresql from "../../assets/tools/color/postgresql.svg";
import docker from "../../assets/tools/color/docker-2.svg";
import openstreetmap from "../../assets/tools/color/openstreetmap.svg";
import googlelens from "../../assets/tools/color/googlelens.svg";
import expo from "../../assets/tools/color/expo.svg";
import figma from "../../assets/tools/color/figma.svg";
import firebase from "../../assets/tools/color/firebase.svg";
import nestjs from "../../assets/tools/color/nestjs.svg";
import nextjs from "../../assets/tools/color/nextjs.svg";
import react from "../../assets/tools/color/react.svg";
import typescript from "../../assets/tools/color/typescript.svg";
import pixilart from "../../assets/tools/color/pixilart.svg"; // pixel heart redrawn from the Pixilart logo
import html5 from "../../assets/tools/color/html5.svg";
import css3 from "../../assets/tools/color/css3.svg";
import javascript from "../../assets/tools/color/javascript.svg";
import vercel from "../../assets/tools/color/vercel.svg";

const ease = [0.22, 1, 0.36, 1];
const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.8, ease } };

// heading left, short copy right (same as the other case study sections)
const Head = ({ heading, body }) => (
  <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-6 md:gap-16">
    <h2 className="text-xl md:text-[1.4rem] font-normal tracking-[-0.015em] leading-tight text-white">{heading}</h2>
    {body && <p className="text-base md:text-[1.1rem] font-light leading-[1.65] text-neutral-200">{body}</p>}
  </div>
);

const Label = ({ icon: Icon, children }) => (
  <p className="flex items-center gap-2.5 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-500">
    <Icon className="w-4 h-4" /> {children}
  </p>
);

// ---------------------------------------------------------------- empathy map
const QUADRANTS = [
  ["says", "Says", MessageCircle],
  ["thinks", "Thinks", Brain],
  ["does", "Does", Footprints],
  ["feels", "Feels", Heart],
  ["hears", "Hears", Ear],
  ["needs", "Needs", Target],
];

export const EmpathyMap = ({ heading, body, map }) => (
  <motion.section {...rise} className="pt-20 md:pt-32">
    <Head heading={heading} body={body} />
    {/* hairline grid: 1px gaps over a grey backing draw the lines between cells */}
    <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
      <div className="md:col-span-3 bg-black p-6 md:p-8">
        <Label icon={Users}>Who we're designing for</Label>
        <p className="mt-4 text-lg md:text-[1.35rem] leading-[1.45] text-white max-w-4xl">{map.who}</p>
      </div>
      {QUADRANTS.map(([key, title, Icon]) => map[key] && (
        <div key={key} className="bg-black p-6 md:p-8">
          <Label icon={Icon}>{title}</Label>
          {key === "feels" ? (
            // feelings read best as chips
            <div className="mt-5 flex flex-wrap gap-2">
              {map.feels.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full border border-neutral-700 text-sm text-neutral-200">{f}</span>
              ))}
            </div>
          ) : key === "says" || key === "thinks" ? (
            // their own words, as quotes
            <div className="mt-5 space-y-3">
              {map[key].map((q) => (
                <p key={q} className="text-base md:text-lg leading-[1.45] text-white">“{q}”</p>
              ))}
            </div>
          ) : (
            <ul className="mt-5 space-y-2.5">
              {map[key].map((t) => (
                <li key={t} className="flex gap-3 text-base font-light leading-[1.55] text-neutral-300">
                  <span className="mt-[0.65em] w-1 h-1 rounded-full bg-neutral-500 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </motion.section>
);

// ---------------------------------------------------------------- UI component boards
// Each cell shows one real component on the app's own background, with a note underneath.
// Each cell spans two rows of the board (component, caption) through subgrid, so the colored
// areas and the captions line up across a row even when one caption wraps to more lines.
const Cell = ({ bg, note, children, wide }) => (
  <figure className={`bg-black grid grid-rows-subgrid row-span-2 gap-0 ${wide ? "md:col-span-2" : ""}`}>
    <div className="min-h-[13rem] md:min-h-[16rem] flex items-center justify-center p-6 md:p-10" style={bg}>
      {children}
    </div>
    <figcaption className="px-5 md:px-6 py-4 text-sm md:text-base font-light leading-[1.55] text-neutral-400 border-t border-neutral-800">{note}</figcaption>
  </figure>
);

const Board = ({ heading, body, children }) => (
  <motion.section {...rise} className="pt-20 md:pt-32">
    <Head heading={heading} body={body} />
    <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">{children}</div>
  </motion.section>
);

// Even: neo-brutalist, Helvetica, paper with a faint grid, one blue accent
const evenFont = { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' };
const paper = {
  ...evenFont,
  backgroundColor: "#FBFAF7",
  backgroundImage: "linear-gradient(#E8E5DE 1px, transparent 1px), linear-gradient(90deg, #E8E5DE 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};
const brut = "border-2 border-[#111] shadow-[3px_3px_0_#111]";
// pressing sinks the button into its own shadow, like the app
const press = "transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";

const EvenBoard = (props) => (
  <Board {...props}>
    <Cell bg={paper} note="Actions: square, thick borders, hard shadows. Press one and it sinks into its shadow. Blue only marks the thing to tap.">
      <div className="flex gap-3">
        <button type="button" className={`${brut} ${press} bg-white px-4 py-3 text-[0.8rem] font-bold tracking-[0.08em] text-[#111]`}>TRIP INFO</button>
        <button type="button" className={`${brut} ${press} bg-[#1D4ED8] px-4 py-3 text-[0.8rem] font-bold tracking-[0.08em] text-white`}>DIRECTIONS</button>
      </div>
    </Cell>
    <Cell bg={paper} note="The trip card stays small: time, distance, and the steepest climb and descent.">
      <div className={`${brut} bg-white w-full max-w-[17rem] p-4 flex items-end justify-between`}>
        <div>
          <p className="text-3xl font-bold leading-none text-[#111]">18 min</p>
          <p className="mt-1.5 text-[0.7rem] font-bold tracking-[0.1em] text-neutral-500">0.81 MI</p>
        </div>
        <div className="flex gap-1.5 text-[0.8rem] font-bold text-[#111]">
          <span className="border-2 border-[#111] px-1.5 py-0.5">↑ 6.3%</span>
          <span className="border-2 border-[#111] px-1.5 py-0.5">↓ 7.8%</span>
        </div>
      </div>
    </Cell>
    <Cell bg={paper} note="Circles carry places, squares carry warnings: a steep or worn ramp (!) and an unsurveyed crossing (?).">
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 rounded-full border-2 border-[#111] bg-white flex items-center justify-center font-bold text-[#111]">A</span>
        <span className="w-10 h-10 rounded-full border-2 border-[#111] bg-[#1D4ED8] flex items-center justify-center font-bold text-white">B</span>
        <span className="w-8 h-8 border-2 border-[#111] bg-[#D98E04] flex items-center justify-center font-bold text-[#111]">!</span>
        <span className="w-8 h-8 border-2 border-[#111] bg-neutral-400 flex items-center justify-center font-bold text-white">?</span>
      </div>
    </Cell>
    <Cell bg={paper} wide note="One route, colored by slope. Green is under 3%, amber is 3 to 8%. Anything past your limit never makes it onto the map.">
      <div className="w-full max-w-md">
        <div className="flex h-3 border-2 border-[#111]">
          <span className="flex-[3] bg-[#15803D]" />
          <span className="flex-1 bg-[#D98E04]" />
          <span className="flex-[2] bg-[#15803D]" />
          <span className="flex-[1.2] bg-[#D98E04]" />
        </div>
        <div className="mt-4 flex gap-6 text-[0.75rem] font-bold tracking-[0.08em] text-[#111]">
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#15803D] border border-[#111]" />EASY · UNDER 3%</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#D98E04] border border-[#111]" />MODERATE · 3 TO 8%</span>
        </div>
      </div>
    </Cell>
    <Cell bg={paper} note="Profiles: the selected row turns light blue, so the choice is obvious at a glance.">
      <div className={`${brut} bg-white w-full max-w-[16rem] text-[#111]`}>
        <div className="px-3 py-2.5 bg-[#DCE6FF] border-b-2 border-[#111] flex justify-between items-start">
          <div><p className="text-sm font-bold">Manual wheelchair</p><p className="text-[0.7rem] text-neutral-600">Gentle hills, a ramp at every curb</p></div>
          <Check className="w-4 h-4 text-[#1D4ED8]" />
        </div>
        <div className="px-3 py-2.5"><p className="text-sm font-bold">Walker or cane</p><p className="text-[0.7rem] text-neutral-600">Easy descents matter most</p></div>
      </div>
    </Cell>
  </Board>
);

// Layer: sage pages, forest controls, one lime accent, Instrument Serif for product names
const layerSans = { fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif' };
const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };
const sage = { ...layerSans, backgroundColor: "#F3F4EF" };

const LayerBoard = (props) => (
  <Board {...props}>
    <Cell bg={sage} note="Morning and night toggles: forest pills with a check, so a product can live in both routines.">
      <div className="flex gap-2.5">
        {["☀︎ Morning", "☾ Night"].map((t) => (
          <span key={t} className="flex items-center gap-3 rounded-full bg-[#2F3D2C] text-[#F3F4EF] pl-4 pr-3 py-2.5 text-sm">
            {t} <Check className="w-4 h-4" />
          </span>
        ))}
      </div>
    </Cell>
    <Cell bg={sage} note="Shelf filters: sage chips, with the active type filled in forest.">
      <div className="flex gap-2 text-sm">
        <span className="rounded-full bg-[#E4E7DC] text-[#1F261F] px-4 py-2">All</span>
        <span className="rounded-full bg-[#2F3D2C] text-[#F3F4EF] px-4 py-2">Serum</span>
        <span className="rounded-full bg-[#E4E7DC] text-[#1F261F] px-4 py-2">Moisturizer</span>
      </div>
    </Cell>
    <Cell bg={sage} note="Shelf rows: bracket numbers, the product name in Instrument Serif, the active ingredient underneath.">
      <div className="flex items-center gap-4 w-full max-w-[15rem]">
        <span className="w-14 h-14 rounded-xl bg-[#E4E7DC] flex items-center justify-center"><Droplet className="w-6 h-6 text-[#2F3D2C]" /></span>
        <div>
          <p className="text-[0.7rem] text-[#737A6D]">[01]</p>
          <p className="text-2xl leading-tight text-[#1F261F]" style={serif}>Vitamin C</p>
          <p className="text-xs text-[#737A6D]">Ascorbic Acid</p>
        </div>
      </div>
    </Cell>
    <Cell bg={sage} wide note="The routine check card: one forest tile with a lime status, so tonight's routine is readable before you open it.">
      <div className="w-full max-w-sm rounded-2xl bg-[#2A3328] p-5 text-[#EDF0E6]">
        <p className="flex items-center gap-2 text-[0.65rem] tracking-[0.15em] text-[#C4D97C]"><span className="w-1.5 h-1.5 rounded-full bg-[#C4D97C]" />ROUTINE CHECK</p>
        <p className="mt-3 text-[1.7rem] leading-tight" style={serif}>Review your night</p>
        <p className="mt-1.5 text-xs text-[#ADB3A4]">What each step does, swaps for your skin, and anything worth fixing.</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#C4D97C] text-[#1F261F] px-3 py-1 text-xs"><Check className="w-3.5 h-3.5" />Looks balanced</span>
      </div>
    </Cell>
    <Cell bg={sage} note="Quiz answers fill in forest when picked. Lime is saved for the one button that moves you on.">
      <div className="w-full max-w-[15rem] space-y-2">
        <div className="rounded-xl bg-[#2F3D2C] text-[#F3F4EF] px-4 py-3 flex justify-between items-center">
          <div><p className="text-lg leading-tight" style={serif}>Combination</p><p className="text-[0.65rem] text-[#ADB3A4]">Oily T-zone, normal cheeks</p></div>
          <span className="w-4 h-4 rounded-full border-2 border-[#C4D97C] flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-[#C4D97C]" /></span>
        </div>
        <div className="rounded-full bg-[#C4D97C] text-[#1F261F] text-center py-2.5 text-sm">Continue</div>
      </div>
    </Cell>
  </Board>
);

// Utter: black canvas like watchOS, one amber accent, one color per category
const ink = { fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif', backgroundColor: "#000" };
const AMBER = "#f5c542";
const CATS = [["Todo", "#34c759", 4], ["Reminder", "#ff9f0a", 2], ["Idea", "#bf5af2", 3], ["Note", "#0a84ff", 5]];

const UtterBoard = (props) => (
  <Board {...props}>
    <Cell bg={ink} note="The idle screen is one big amber mic. You're grabbing it mid-thought, so it's the only target.">
      <span className="relative flex items-center justify-center w-24 h-24">
        <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: AMBER }} />
        <span className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: AMBER }}>
          <Mic className="w-9 h-9 text-black" />
        </span>
      </span>
    </Cell>
    <Cell bg={ink} note="Holding swaps in a live waveform and a timer, so you know it's listening.">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1 h-10">
          {[0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.45, 0.75, 0.5].map((h, i) => (
            <motion.span key={i} className="w-1.5 rounded-full" style={{ backgroundColor: AMBER }}
              animate={{ height: [`${h * 100}%`, `${(1.25 - h) * 100}%`, `${h * 100}%`] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.07 }} />
          ))}
        </div>
        <p className="font-mono text-lg text-white tabular-nums">00:07</p>
      </div>
    </Cell>
    <Cell bg={ink} note="Let go to review: play it back, trash it, or send it. The send button is the amber one.">
      <div className="flex items-center gap-4">
        <span className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: AMBER }}><Pause className="w-5 h-5" style={{ color: AMBER }} /></span>
        <span className="w-12 h-12 rounded-full bg-[#3a1212] flex items-center justify-center"><Trash2 className="w-5 h-5 text-[#ff453a]" /></span>
        <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: AMBER }}><ArrowRight className="w-5 h-5 text-black" /></span>
      </div>
    </Cell>
    <Cell bg={ink} wide note="Color is saved for meaning. Each category keeps its color everywhere, from onboarding chips to inbox cards.">
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
        {CATS.map(([name, c, n]) => (
          <div key={name} className="rounded-2xl px-4 py-3 flex items-end justify-between" style={{ backgroundColor: `${c}22` }}>
            <span className="text-sm font-semibold" style={{ color: c }}>{name}</span>
            <span className="text-2xl font-bold text-white tabular-nums">{n}</span>
          </div>
        ))}
      </div>
    </Cell>
    <Cell bg={ink} note="Inbox rows: the memo in plain words, its category as a dot, and when it came in.">
      <div className="w-full max-w-[16rem] rounded-2xl bg-[#1c1c1e] p-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: "#ff9f0a" }}><span className="w-2 h-2 rounded-full bg-[#ff9f0a]" />Reminder</div>
        <p className="mt-2 text-sm leading-snug text-white">Call the dentist tomorrow morning</p>
        <p className="mt-2 text-[0.7rem] text-neutral-500">From Apple Watch · 2m ago</p>
      </div>
    </Cell>
  </Board>
);

// Lumon: navy terminal, phosphor cyan, Share Tech Mono for digits, Russo One for the wordmark
const CYAN = "#8EE3F1";
const navy = { backgroundColor: "#08203A", color: CYAN, fontFamily: '"Share Tech Mono", monospace' };

const LumonLogo = ({ className = "" }) => (
  <svg viewBox="0 0 120 50" className={className} fill="none" stroke={CYAN} strokeWidth="1.4">
    <ellipse cx="60" cy="25" rx="57" ry="22" />
    <ellipse cx="60" cy="25" rx="28" ry="22" />
    <path d="M3 25h114M12 13h96M12 37h96" />
    <rect x="22" y="17" width="76" height="16" fill="#08203A" stroke="none" />
    <text x="60" y="30" textAnchor="middle" fill={CYAN} stroke="none" fontSize="13" letterSpacing="4" style={{ fontFamily: '"Russo One", sans-serif' }}>LUMON</text>
  </svg>
);

// the refinement grid: digits swell as the cursor gets close, same falloff as the real site
const RefineGrid = () => {
  const box = useRef(null);
  const [digits] = useState(() => Array.from({ length: 60 }, () => Math.floor(Math.random() * 10)));
  const [p, setP] = useState(null);
  const cells = useRef([]);
  const scale = (i) => {
    const el = cells.current[i];
    if (!p || !el) return 1;
    const d = Math.hypot(el.offsetLeft + el.offsetWidth / 2 - p.x, el.offsetTop + el.offsetHeight / 2 - p.y);
    return d <= 30 ? 2.6 : d <= 42 ? 2.1 : d <= 55 ? 1.6 : d <= 70 ? 1.25 : 1;
  };
  return (
    <div
      ref={box}
      onPointerMove={(e) => { const r = box.current.getBoundingClientRect(); setP({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onPointerLeave={() => setP(null)}
      className="relative grid grid-cols-12 gap-y-3 w-full max-w-md cursor-crosshair select-none"
    >
      {digits.map((n, i) => (
        <span key={i} ref={(el) => (cells.current[i] = el)} className="text-center text-sm transition-transform duration-150" style={{ transform: `scale(${scale(i)})` }}>{n}</span>
      ))}
    </div>
  );
};

const LumonBoard = (props) => (
  <Board {...props}>
    <Cell bg={navy} wide note="The refinement grid. Move your cursor over the numbers: they swell as you get close, the way the real site does it.">
      <RefineGrid />
    </Cell>
    <Cell bg={navy} note="The Lumon mark, drawn as line art so it glows like the rest of the terminal.">
      <LumonLogo className="w-40" />
    </Cell>
    <Cell bg={navy} note="The file header: the file name on the left, progress and the mark on the right, boxed in one cyan rule.">
      <div className="w-full max-w-[17rem] border px-3 py-2 flex items-center justify-between text-sm" style={{ borderColor: CYAN }}>
        <span>Dranesville</span>
        <span className="flex items-center gap-2"><span>19% Complete</span><LumonLogo className="w-12" /></span>
      </div>
    </Cell>
    <Cell bg={navy} note="Bins 01 to 05: each one fills as you refine, with its percent underneath.">
      <div className="grid grid-cols-5 gap-2 w-full max-w-[17rem] text-[0.65rem]">
        {[10, 11, 9, 27, 18].map((v, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="border text-center py-0.5" style={{ borderColor: CYAN }}>0{i + 1}</span>
            <span className="border h-4 relative" style={{ borderColor: CYAN }}>
              <span className="absolute inset-y-0 left-0" style={{ width: `${v * 2.5}%`, backgroundColor: CYAN }} />
            </span>
            <span className="text-center">{v}%</span>
          </div>
        ))}
      </div>
    </Cell>
    <Cell bg={navy} note="An employee report row, the second screen: name, tasks refined and a compliance score.">
      <div className="w-full max-w-[15rem] border px-3 py-2.5 text-xs leading-relaxed" style={{ borderColor: CYAN }}>
        <p>Employee: Mark S.</p>
        <p>Tasks Refined: 238</p>
        <p>Compliance Score: 92%</p>
      </div>
    </Cell>
  </Board>
);

export const ComponentBoard = ({ kind, ...props }) =>
  kind === "even" ? <EvenBoard {...props} /> : kind === "layer" ? <LayerBoard {...props} /> : kind === "utter" ? <UtterBoard {...props} /> : kind === "lumon" ? <LumonBoard {...props} /> : null;

// ---------------------------------------------------------------- tools grid
const LOGOS = { xcode, swift, python, fastapi, postgresql, docker, openstreetmap, googlelens, expo, figma, firebase, nestjs, nextjs, react, typescript, pixilart, html5, css3, javascript, vercel };

// Apple frameworks and data sources with no public logo get an app-icon-style tile:
// a rounded square with its own gradient and a white glyph, so the row reads like real icons.
const TILES = {
  map: [Map, "linear-gradient(160deg,#6ee08a,#2bb24c)"],
  chart: [ChartSpline, "linear-gradient(160deg,#5e9bff,#6e4bf0)"],
  intelligence: [Sparkles, "linear-gradient(135deg,#ff9f0a,#ff375f 40%,#bf5af2 70%,#0a84ff)"],
  scan: [ScanText, "linear-gradient(160deg,#3a3a3c,#1c1c1e)"],
  mic: [Mic, "linear-gradient(160deg,#ff6b6b,#e0245e)"],
  widget: [LayoutGrid, "linear-gradient(160deg,#ffd60a,#ff9f0a)"],
  database: [Database, "linear-gradient(160deg,#ff8fb1,#d9467a)"],
  watch: [Watch, "linear-gradient(160deg,#2c2c2e,#000)"],
  sync: [ArrowLeftRight, "linear-gradient(160deg,#64d2ff,#0a84ff)"],
  audio: [AudioLines, "linear-gradient(160deg,#bf5af2,#7d2ae8)"],
  sprite: [Gamepad2, "linear-gradient(160deg,#30d158,#0a8f3c)"],
  pixel: [Grid3x3, "linear-gradient(160deg,#5ac8fa,#2b6fd6)"],
  eas: [Rocket, "linear-gradient(160deg,#4630eb,#1f1a5c)"],
  flask: [FlaskConical, "linear-gradient(160deg,#3a3a3c,#111)"],
};

export const Tools = ({ items }) => (
  <motion.section {...rise} className="pt-20 md:pt-32">
    <h2 className="text-xl md:text-[1.4rem] font-normal tracking-[-0.015em] leading-tight text-white">Tools</h2>
    {/* real icon on top, name underneath, in a wrapping row */}
    <ul className="mt-8 md:mt-10 flex flex-wrap gap-x-10 md:gap-x-14 gap-y-8">
      {items.map((t) => {
        const tile = TILES[t.icon];
        return (
          <li key={t.name} className="flex flex-col items-center gap-2.5 text-center">
            {t.logo ? (
              <img src={LOGOS[t.logo]} alt="" className="w-11 h-11 md:w-14 md:h-14 object-contain" />
            ) : tile ? (
              <span className="w-11 h-11 md:w-14 md:h-14 rounded-[22%] flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" style={{ background: tile[1] }}>
                {(() => { const G = tile[0]; return <G className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.8} />; })()}
              </span>
            ) : null}
            <span className="text-xs md:text-sm leading-tight text-neutral-400">{t.name}</span>
          </li>
        );
      })}
    </ul>
  </motion.section>
);
