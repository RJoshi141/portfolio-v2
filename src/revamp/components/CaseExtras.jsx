// Extra case study blocks (inspired by Karen Happuch's CalmSphere case study):
// an empathy map, a board of live UI components rebuilt in code, and a tools grid.
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle, Brain, Footprints, Heart, Ear, Target, Users, Check, Droplet,
  ScanText, Mic, LayoutGrid, Database, Map, ChartSpline, Watch, AudioLines, Pause, Trash2, ArrowRight, Sparkles, ArrowLeftRight, Gamepad2, Grid3x3, Rocket, Laptop, Smartphone, BatteryCharging, Thermometer, Zap, FlaskConical, Layers, BookOpen, Star,
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
import flask from "../../assets/tools/color/flask.svg";

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

// bare: just the grid, no heading or top spacing (the new site supplies its own chapter heading)
export const EmpathyMap = ({ heading, body, map, bare }) => (
  <motion.section {...rise} className={bare ? "" : "pt-20 md:pt-32"}>
    {!bare && <Head heading={heading} body={body} />}
    {/* hairline grid: 1px gaps over a grey backing draw the lines between cells */}
    <div className={`${bare ? "" : "mt-10 md:mt-14"} grid md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800`}>
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

const Board = ({ heading, body, children, bare }) => (
  <motion.section {...rise} className={bare ? "" : "pt-20 md:pt-32"}>
    {!bare && <Head heading={heading} body={body} />}
    <div className={`${bare ? "" : "mt-10 md:mt-14"} grid md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800`}>{children}</div>
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

// Layer (revamp): warm paper, near-black ink, one bronze accent. Spaced capitals in a geometric
// sans, and a handwritten script for the second word of a heading.
const serif = { fontFamily: '"Instrument Serif", Georgia, serif' };
const L = { paper: "#E8E6DE", card: "#EFEDE6", stone: "#B8B6AF", ink: "#111111", bronze: "#764823", muted: "#6F6A5F" };
const jost = { fontFamily: '"Jost", "Futura", Inter, sans-serif' };
const script = { fontFamily: '"Pinyon Script", "Snell Roundhand", cursive' };
const lpaper = { ...jost, backgroundColor: L.paper, color: L.ink };
const caps = "uppercase tracking-[0.28em] text-[0.68rem]";

const LBtn = ({ children, solid }) => (
  <button type="button" className={`w-full py-3 ${caps} transition-colors`}
    style={{ ...jost, background: solid ? L.ink : "transparent", color: solid ? L.paper : L.ink, border: `1px solid ${solid ? L.ink : L.muted}` }}>
    {children}
  </button>
);

const Choices = () => {
  const [v, setV] = useState(1);
  const rows = [["Rarely", "New products don't usually bother me"], ["Sometimes", "Some products sting or make me red"], ["Often", "My skin reacts to a lot of things"]];
  return (
    <div className="w-full max-w-[16rem] space-y-1.5">
      {rows.map(([t, sub], i) => {
        const on = v === i;
        return (
          <button key={t} type="button" onClick={() => setV(i)} className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors"
            style={{ ...jost, background: on ? L.ink : L.card, color: on ? L.paper : L.ink }}>
            <span>
              <span className="block text-[0.95rem] tracking-[0.02em]">{t}</span>
              <span className="block text-[0.62rem]" style={{ color: on ? "#bdb8ad" : L.muted }}>{sub}</span>
            </span>
            <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ border: `1px solid ${on ? L.bronze : L.stone}` }}>
              {on && <span className="w-2 h-2 rounded-full" style={{ background: L.bronze }} />}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const Tabs = () => {
  const [v, setV] = useState("Morning");
  return (
    <div className="flex gap-6">
      {["Morning", "Night"].map((t) => (
        <button key={t} type="button" onClick={() => setV(t)} className={`${caps} pb-1.5 border-b transition-colors`}
          style={{ ...jost, color: v === t ? L.ink : L.muted, borderColor: v === t ? L.ink : "transparent" }}>{t}</button>
      ))}
    </div>
  );
};

const PICKS = [["Holika Holika", "Sunscreen", "#3e9b52"], ["Naturium", "Moisturizer", "#5aaedc"], ["Versed", "Moisturizer", "#8b9590"], ["peach slices", "Mask", "#8fd1c4"]];
const RoutinePicker = () => {
  const [on, setOn] = useState({ 1: true, 3: true });
  return (
    <div className="w-full max-w-sm" style={jost}>
      <p className="text-[0.7rem] mb-2" style={{ color: L.muted }}>Pick what goes in. Layer puts it in order.</p>
      {PICKS.map(([n, type, c], i) => (
        <div key={n} className="flex items-center gap-3 px-2 py-2 border-t transition-colors" style={{ borderColor: "#d3d0c6", background: on[i] ? "#e2dfd4" : "transparent" }}>
          <span className="w-7 h-9 flex items-end justify-center"><span className="w-3 h-7 rounded-[2px]" style={{ background: c }} /></span>
          <span className="flex-1">
            <span className="block text-[0.95rem] tracking-[0.03em]">{n}</span>
            <span className={`block ${caps} !text-[0.55rem]`} style={{ color: L.muted }}>{on[i] ? "In this routine" : type}</span>
          </span>
          <button type="button" onClick={() => setOn({ ...on, [i]: !on[i] })} className="w-7 h-7 flex items-center justify-center transition-colors"
            style={{ background: on[i] ? L.ink : "transparent", color: on[i] ? L.paper : L.ink, border: `1px solid ${on[i] ? L.ink : L.muted}` }}>
            {on[i] ? <Check className="w-3.5 h-3.5" strokeWidth={1.5} /> : <span className="text-base leading-none">+</span>}
          </button>
        </div>
      ))}
    </div>
  );
};

const LayerBoard = (props) => (
  <Board {...props}>
    <Cell bg={lpaper} note="Headings pair a spaced sans with a handwritten script word.">
      <div>
        <p className="text-[2rem] leading-none tracking-[0.04em]">Your</p>
        <p className="-mt-1 ml-1 text-[2.4rem] leading-none" style={{ ...script, color: L.muted }}>shelf</p>
        <p className="mt-3 text-[0.7rem]" style={{ color: L.muted }}>4 products</p>
      </div>
    </Cell>
    <Cell bg={lpaper} note="Questions answer on cards. The pick turns ink, with a bronze dot. Tap one.">
      <Choices />
    </Cell>
    <Cell bg={lpaper} note="Square buttons in spaced capitals: solid for the step forward, outlined for the way back.">
      <div className="w-full max-w-[13rem] space-y-2">
        <LBtn solid>Remove</LBtn>
        <LBtn>Keep it</LBtn>
      </div>
    </Cell>
    <Cell bg={lpaper} wide note="The routine picker. Tap + to add a product; Layer puts it in layering order.">
      <RoutinePicker />
    </Cell>
    <Cell bg={lpaper} note="Morning and night, as underlined tabs. Tap to switch.">
      <Tabs />
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

// CellScope: Apple-style paper, SF fonts, one blue accent, green and red only for battery state
const sf = { fontFamily: '-apple-system, "SF Pro Text", Inter, sans-serif', backgroundColor: "#F5F5F7", color: "#1D1D1F" };
const mono = { fontFamily: '"SF Mono", ui-monospace, Menlo, monospace' };

const CellScopeBoard = (props) => (
  <Board {...props}>
    <Cell bg={sf} wide note="Fleet cards: the device icon, charge left and one status chip. Green only when it's charging, red only when it's low.">
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {[
          [Laptop, "Laptop 02", 27, "Charging", "#34C759"],
          [Smartphone, "Phone 01", 14, "Low", "#FF3B30"],
        ].map(([Icon, name, pct, state, c]) => (
          <div key={name} className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
            <p className="flex items-center gap-2 text-xs text-[#6E6E73]"><Icon className="w-4 h-4" />{name}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{pct}<span className="text-base text-[#6E6E73]">%</span></p>
            <span className="mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium" style={{ color: c, backgroundColor: `${c}1a` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />{state}
            </span>
          </div>
        ))}
      </div>
    </Cell>
    <Cell bg={sf} note="Stat tiles: a small label, one big number, units kept quiet.">
      <div className="grid grid-cols-2 gap-3 w-full max-w-[16rem]">
        {[[Zap, "Voltage", "11.57", "V"], [Thermometer, "Temp", "33.4", "°C"]].map(([Icon, l, v, u]) => (
          <div key={l} className="rounded-xl bg-white p-3">
            <p className="flex items-center gap-1.5 text-[0.7rem] text-[#6E6E73]"><Icon className="w-3.5 h-3.5" />{l}</p>
            <p className="mt-1 text-xl font-semibold">{v}<span className="ml-0.5 text-xs text-[#6E6E73]">{u}</span></p>
          </div>
        ))}
      </div>
    </Cell>
    <Cell bg={sf} note="Register rows: the raw word in SF Mono, what it means beside it. The value flashes blue when it changes.">
      <div className="w-full max-w-[17rem] rounded-xl bg-white divide-y divide-[#E5E5EA] text-xs">
        {[["0x0A", "Current", "0xFF38", "−200 mA"], ["0x08", "Temperature", "0x0C1B", "36.6 °C"], ["0x16", "Status", "0x00C0", "FC, INIT"]].map(([a, n, w, m], i) => (
          <div key={a} className="flex items-center justify-between px-3 py-2">
            <span style={mono} className="text-[#6E6E73]">{a}</span>
            <span className="flex-1 ml-3">{n}</span>
            <span style={mono} className={`px-1 rounded ${i === 0 ? "bg-[#0071E3]/10 text-[#0071E3]" : ""}`}>{w}</span>
            <span className="ml-3 w-16 text-right text-[#6E6E73]">{m}</span>
          </div>
        ))}
      </div>
    </Cell>
    <Cell bg={sf} note="Battery health: capacity left against design, one bar and one number.">
      <div className="w-full max-w-[15rem]">
        <div className="flex items-baseline justify-between"><span className="text-sm">Battery health</span><span className="text-2xl font-semibold">89.7%</span></div>
        <div className="mt-3 h-2 rounded-full bg-[#E5E5EA]"><div className="h-full w-[89.7%] rounded-full bg-[#1D1D1F]" /></div>
        <p className="mt-2 text-[0.7rem] text-[#6E6E73]">4,486 of 5,000 mAh · 312 cycles</p>
      </div>
    </Cell>
    <Cell bg={sf} note="The live pill and charge state: a blinking dot so you know the numbers are moving.">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs">
          <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-[#34C759] animate-ping opacity-60" /><span className="relative w-2 h-2 rounded-full bg-[#34C759]" /></span>Live
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0071E3] text-white px-3 py-1.5 text-xs"><BatteryCharging className="w-4 h-4" />60× speed</span>
      </div>
    </Cell>
  </Board>
);


// Bound: paper and ink. Letterpress buttons, oak shelves, tear-off meetup tickets, index cards.
const B = { paper: "#F2EADB", card: "#FAF5EA", ink: "#221A14", forest: "#2F4A35", oxblood: "#8A2C22", rust: "#B4572A", mustard: "#C69A3A", gilt: "#A9813A", oak: "#7A4B2E" };
const fell = { fontFamily: '"IM Fell English SC", Georgia, serif' };
const hanken = { fontFamily: '"Hanken Grotesk", Inter, sans-serif' };
const dmono = { fontFamily: '"DM Mono", ui-monospace, monospace' };
const bpaper = { ...hanken, backgroundColor: B.paper, color: B.ink };

// square-cornered letterpress button with an inset hairline
const Press = ({ children, fill, color = B.ink, onClick, active = true }) => (
  <button type="button" onClick={onClick}
    className="relative px-5 py-2.5 text-[0.95rem] tracking-wide transition-colors"
    style={{ ...fell, background: fill && active ? fill : "transparent", color: fill && active ? B.card : color, border: `1px solid ${fill || color}` }}>
    <span aria-hidden className="pointer-events-none absolute inset-[3px] border" style={{ borderColor: fill && active ? "rgba(250,245,234,.45)" : `${fill || color}55` }} />
    <span className="relative">{children}</span>
  </button>
);

const RSVP = () => {
  const [v, setV] = useState("Going");
  return (
    <div className="flex gap-2">
      {[["Going", B.forest], ["Maybe", B.rust], ["Can't", B.oxblood]].map(([l, c]) => (
        <Press key={l} fill={c} active={v === l} color={c} onClick={() => setV(l)}>{l}</Press>
      ))}
    </div>
  );
};

// spines stand on an oak plank; width follows page count; tap one to lift it with its paper slip
const SPINES = [["Middlemarch", "#24382c", 880], ["Piranesi", "#1e1b1a", 272], ["Bleak House", "#5f8a86", 1017], ["Carrie", "#141212", 199], ["Persuasion", "#4a3557", 249], ["The Secret History", "#8a2c22", 559]];
const Shelf = () => {
  const [up, setUp] = useState(2);
  return (
    <div className="w-full max-w-md" onClick={() => setUp(null)}>
      <div className="flex items-end justify-center gap-[3px] h-44 px-4">
        {SPINES.map(([t, c, pages], i) => {
          const lifted = up === i;
          return (
            <button key={t} type="button" onClick={(e) => { e.stopPropagation(); setUp(lifted ? null : i); }}
              className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: 16 + pages / 30, height: 120 + (i % 3) * 14, transform: lifted ? "translateY(-26px)" : "none" }}>
              {/* the paper slip slides up from under a lifted spine */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[150%] px-1 py-1 text-[0.55rem] leading-tight text-center transition-all duration-500"
                style={{ ...dmono, background: B.card, color: B.ink, boxShadow: "0 1px 2px rgba(0,0,0,.15)", opacity: lifted ? 1 : 0, transform: lifted ? "translate(-50%, 34px)" : "translate(-50%, 0)" }}>
                {pages} pp.
              </span>
              <span className="absolute inset-0 flex items-center justify-center" style={{ background: c, boxShadow: "inset -3px 0 0 rgba(0,0,0,.25), inset 2px 0 0 rgba(255,255,255,.08)" }}>
                <span className="absolute inset-x-0 top-3 h-[3px]" style={{ background: B.gilt }} />
                <span className="absolute inset-x-0 bottom-3 h-[3px]" style={{ background: B.gilt }} />
                <span className="text-[0.62rem] whitespace-nowrap" style={{ ...serif, color: "#F2EADB", writingMode: "vertical-rl" }}>{t}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="h-3 rounded-[2px]" style={{ background: `linear-gradient(${B.oak}, #5c3721)`, boxShadow: "0 6px 10px -4px rgba(0,0,0,.35)" }} />
    </div>
  );
};

// a tear-off ticket: perforated stub on the left, ink stamp when you're going
const Ticket = () => {
  const [going, setGoing] = useState(true);
  return (
    <button type="button" onClick={() => setGoing(!going)} className="relative flex w-full max-w-md text-left" style={{ background: B.card, boxShadow: "0 2px 6px rgba(34,26,20,.12)" }}>
      <div className="w-24 shrink-0 flex flex-col items-center justify-center py-5 border-r-2 border-dashed" style={{ borderColor: "#d8ccb6" }}>
        <span className="text-[0.6rem] tracking-[0.2em]" style={{ ...dmono, color: B.oxblood }}>NOV</span>
        <span className="text-4xl leading-none" style={{ ...serif, color: B.ink }}>14</span>
        <span className="text-[0.6rem] mt-1" style={dmono}>7:00 PM</span>
      </div>
      {/* perforation notches at the tear line */}
      <span className="absolute left-[5.6rem] -top-2 w-4 h-4 rounded-full" style={{ background: B.paper }} />
      <span className="absolute left-[5.6rem] -bottom-2 w-4 h-4 rounded-full" style={{ background: B.paper }} />
      <div className="relative flex-1 p-5">
        <p className="text-[0.6rem] tracking-[0.2em]" style={{ ...dmono, color: "#8a7a66" }}>THIS MONTH</p>
        <p className="mt-1 text-2xl leading-tight" style={{ ...serif, color: B.ink }}>Piranesi</p>
        <p className="mt-1 text-xs" style={{ color: "#6b5d4f" }}>Priya's place · Inner Sunset</p>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-14deg] px-2 py-1 text-sm tracking-[0.15em] border-2 rounded-sm transition-all duration-300"
          style={{ ...fell, color: B.forest, borderColor: B.forest, opacity: going ? 0.85 : 0, transform: `translateY(-50%) rotate(-14deg) scale(${going ? 1 : 1.6})` }}>
          Going
        </span>
      </div>
    </button>
  );
};

// a ruled index card note, with the page it was written on
const IndexNote = () => (
  <div className="relative w-full max-w-[17rem] p-4 pt-3" style={{ background: B.card, boxShadow: "0 2px 6px rgba(34,26,20,.12)", backgroundImage: "repeating-linear-gradient(transparent 0 23px, #d9e2ea 23px 24px)", backgroundPosition: "0 38px" }}>
    <div className="absolute inset-x-0 top-[34px] h-px" style={{ background: "#d99a8f" }} />
    <div className="flex items-center justify-between text-[0.65rem]" style={dmono}>
      <span style={{ color: B.oxblood }}>p. 184</span>
      <span className="flex gap-0.5" style={{ color: B.mustard }}>{[0, 1, 2, 3].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}<Star className="w-3 h-3" /></span>
    </div>
    <p className="mt-5 text-[1.05rem] leading-[24px]" style={{ ...serif, color: B.ink }}>The House feeds him and he thanks it. I can't stop thinking about that.</p>
    <span className="mt-3 inline-block px-2 py-0.5 text-[0.6rem] tracking-[0.12em]" style={{ ...dmono, color: B.forest, border: `1px solid ${B.forest}` }}>DISCUSS AT MEETUP</span>
  </div>
);

// notes past your page fold away until you ask for them
const Folded = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-[17rem]">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-sm" style={{ background: B.card, borderTop: `1px dashed ${B.gilt}`, borderBottom: `1px dashed ${B.gilt}` }}>
        <span style={serif} className="text-[1.05rem] italic">3 notes past p. 212</span>
        <span className="text-[0.6rem] tracking-[0.15em]" style={{ ...dmono, color: B.oxblood }}>{open ? "HIDE" : "REVEAL"}</span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="px-4 py-3 text-xs" style={{ background: "#efe5d3", color: "#6b5d4f" }}>
            <span style={{ ...dmono, color: B.oxblood }}>p. 240 · </span>So the Other was lying the whole time.
          </p>
        </div>
      </div>
    </div>
  );
};

// a cut-paper silhouette in a coloured oval, facing right
const Silhouette = ({ bg, kind = "tophat" }) => (
  <svg viewBox="0 0 80 100" className="w-16 h-20">
    <ellipse cx="40" cy="50" rx="38" ry="48" fill={bg} />
    <g fill={B.ink}>
      {kind === "tophat" && (<><rect x="22" y="14" width="30" height="24" rx="2" /><rect x="15" y="36" width="44" height="5" rx="2.5" /></>)}
      {kind === "bowler" && (<><path d="M20 40 C20 22 54 22 54 40 Z" /><rect x="14" y="38" width="46" height="5" rx="2.5" /></>)}
      {kind === "updo" && (<><circle cx="26" cy="30" r="10" /><path d="M24 44 C24 30 50 28 52 42 Z" /></>)}
      {/* head, nose and chin to the right, then neck and shoulders */}
      <path d="M24 41 C22 52 24 60 30 64 L30 70 C20 72 12 80 10 92 L70 92 C68 82 60 74 50 71 L49 65 C53 63 55 60 54 57 L57 55 L54 52 C56 50 57 48 55 46 L52 41 Z" />
    </g>
  </svg>
);

const BoundBoard = (props) => (
  <Board {...props}>
    <Cell bg={bpaper} note="Letterpress buttons: square corners and an inset hairline, set in IM Fell small caps. Forest for the main action.">
      <div className="flex flex-col items-center gap-3">
        <Press fill={B.forest}>Join a club</Press>
        <Press>Start a club</Press>
      </div>
    </Cell>
    <Cell bg={bpaper} note="RSVP. Tap one: Going fills in forest, Maybe in rust, Can't in oxblood.">
      <RSVP />
    </Cell>
    <Cell bg={bpaper} note="Portraits: Victorian cut-paper silhouettes, all facing right, in a coloured oval instead of initials.">
      <div className="flex gap-3">
        <Silhouette bg="#c9b48f" kind="tophat" />
        <Silhouette bg="#a9bfa7" kind="updo" />
        <Silhouette bg="#d4a595" kind="bowler" />
      </div>
    </Cell>
    <Cell bg={bpaper} wide note="The meetup ticket: the month on a perforated stub, the book and the place. Tap it: Going lands an ink stamp.">
      <Ticket />
    </Cell>
    <Cell bg={bpaper} note="A note on a ruled index card: the page it was written on, a star rating and a discuss-at-meetup tag.">
      <IndexNote />
    </Cell>
    <Cell bg={bpaper} wide note="Spines on an oak plank. Width follows page count. Tap one to lift it off the shelf with its paper slip; tap the shelf to put it back.">
      <Shelf />
    </Cell>
    <Cell bg={bpaper} note="Notes past your page stay folded until you choose to reveal them. Tap to open.">
      <Folded />
    </Cell>
  </Board>
);

export const ComponentBoard = ({ kind, ...props }) =>
  kind === "even" ? <EvenBoard {...props} /> : kind === "layer" ? <LayerBoard {...props} /> : kind === "utter" ? <UtterBoard {...props} /> : kind === "lumon" ? <LumonBoard {...props} /> : kind === "cellscope" ? <CellScopeBoard {...props} /> : kind === "bound" ? <BoundBoard {...props} /> : null;

// ---------------------------------------------------------------- tools grid
const LOGOS = { xcode, swift, python, fastapi, postgresql, docker, openstreetmap, googlelens, expo, figma, firebase, nestjs, nextjs, react, typescript, pixilart, html5, css3, javascript, vercel, flask };

// Apple frameworks and data sources with no public logo get an app-icon-style tile:
// a rounded square with its own gradient and a white glyph, so the row reads like real icons.
export const TILES = {
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
  swiftui: [Layers, "linear-gradient(160deg,#4aa8ff,#1f5fe0)"],
  book: [BookOpen, "linear-gradient(160deg,#c9a86a,#8a5a2b)"],
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
