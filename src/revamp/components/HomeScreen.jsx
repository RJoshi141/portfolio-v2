// Raffi-inspired: tap an app on the phone, the panel beside it explains it.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mic, Dog, Clapperboard, Music2, Terminal, Box, Globe, User,
  Signal, Wifi, BatteryFull, ArrowUpRight, ArrowRight,
} from "lucide-react";
import { SiGithub, SiMedium } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { Mail } from "lucide-react";
import { findProject } from "../data/projects";

const BIO = {
  title: "Ritika Joshi",
  body: [
    "I'm a founding product engineer at Joydrop, where I built the platform from 0 to 1 across web, iOS, and Android.",
    "Outside work I make Apple platform apps and small experiments. Based in San Francisco, CS at the University of Cincinnati.",
    "This is my home screen. Tap around.",
  ],
};

// project apps pull their copy from projects.js so it never drifts
const projectApp = (slug, Icon, bg) => {
  const p = findProject(slug);
  return { id: slug, label: p.name.split(" ")[0], Icon, bg, title: p.name, body: [p.summary], href: `#/work/${slug}`, cta: "Open case study" };
};

const APPS = [
  projectApp("utter", Mic, "#f46565"),
  projectApp("zoomies", Dog, "#3f8f4f"),
  projectApp("cinemate", Clapperboard, "#4b4bb8"),
  projectApp("harmoni", Music2, "#1db954"),
  projectApp("lumon", Terminal, "#1f6f7a"),
  projectApp("rubiks", Box, "#d98e04"),
  projectApp("portfolio", Globe, "#6b6b6b"),
  { id: "about", label: "About", Icon: User, bg: "#e8e8e8", fg: "#111", ...BIO },
];

const DOCK = [
  { id: "github", label: "GitHub", Icon: SiGithub, bg: "#24292f", title: "GitHub", body: ["Source for everything on this site, plus experiments that didn't make the cut."], href: "https://github.com/RJoshi141", cta: "github.com/RJoshi141", external: true },
  { id: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn, bg: "#0a66c2", title: "LinkedIn", body: ["The formal version of all this."], href: "https://www.linkedin.com/in/ritika-joshi-9395591a7/", cta: "Connect", external: true },
  { id: "medium", label: "Medium", Icon: SiMedium, bg: "#f2f2f2", fg: "#000", title: "Medium", body: ["I write about interviewing, building, and what I learn along the way."], href: "https://medium.com/@ritikajoshi141", cta: "Read", external: true },
  { id: "mail", label: "Mail", Icon: Mail, bg: "#2f7df6", title: "Mail", body: ["Fastest way to reach me."], href: "#contact", cta: "Write to me" },
];

const ALL = [...APPS, ...DOCK];

const useClock = () => {
  const fmt = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "");
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
};

const AppIcon = ({ app, active, dimmed, onClick, showLabel = true }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1.5 group" aria-label={app.label}>
    <span
      className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center transition-all duration-300
                  group-hover:scale-105 ${active ? "ring-2 ring-white/80 ring-offset-2 ring-offset-[#141414]" : ""}
                  ${dimmed ? "opacity-40" : "opacity-100"}`}
      style={{ backgroundColor: app.bg, color: app.fg || "#fff" }}
    >
      <app.Icon className="w-6 h-6" />
    </span>
    {showLabel && <span className={`text-[11px] text-neutral-300 transition-opacity ${dimmed ? "opacity-40" : ""}`}>{app.label}</span>}
  </button>
);

export default function HomeScreen() {
  const [selected, setSelected] = useState("about");
  const time = useClock();
  const app = ALL.find((a) => a.id === selected);
  // tapping the open app again goes back to the bio
  const pick = (id) => setSelected((cur) => (cur === id ? "about" : id));
  const isDefault = selected === "about";

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
      {/* Phone */}
      <div className="shrink-0 w-[300px] h-[620px] rounded-[52px] bg-neutral-800 p-[10px]">
        <div className="relative w-full h-full rounded-[43px] bg-[#141414] overflow-hidden px-5">
          <div className="flex items-center justify-between pt-4 px-3 text-[13px] font-medium text-white">
            <span className="tabular-nums">{time}</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-3 w-[92px] h-[26px] rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <Signal className="w-3.5 h-3.5" /><Wifi className="w-3.5 h-3.5" /><BatteryFull className="w-4 h-4" />
            </span>
          </div>

          {/* "Now" widget */}
          <div className="mt-8 rounded-[20px] bg-neutral-800/70 p-4">
            <p className="text-[11px] uppercase tracking-wider text-neutral-400">Now</p>
            <p className="mt-1 text-[15px] leading-snug text-white">Building at Joydrop</p>
            <p className="text-[12px] text-neutral-400">San Francisco</p>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-y-5 justify-items-center">
            {APPS.map((a) => (
              <AppIcon key={a.id} app={a} active={selected === a.id && !isDefault}
                       dimmed={!isDefault && selected !== a.id} onClick={() => pick(a.id)} />
            ))}
          </div>

          <div className="absolute bottom-3 left-3 right-3 rounded-[30px] bg-neutral-800/70 px-3 py-3 flex justify-around">
            {DOCK.map((a) => (
              <AppIcon key={a.id} app={a} showLabel={false} active={selected === a.id}
                       dimmed={!isDefault && selected !== a.id} onClick={() => pick(a.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Panel */}
      <div className="w-full max-w-xl md:pt-10 min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-2xl md:text-3xl tracking-tight text-white">{app.title}</p>
            <div className="mt-5 space-y-4 text-base md:text-lg text-neutral-400 leading-relaxed">
              {app.body.map((b) => <p key={b}>{b}</p>)}
            </div>
            {app.href && (
              <a
                href={app.href}
                {...(app.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-8 inline-flex items-center gap-2 text-white hover:text-carnation transition-colors"
              >
                {app.cta} {app.external ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
