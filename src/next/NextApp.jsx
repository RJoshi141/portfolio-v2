// The site: smooth velocity scroll (Lenis + GSAP), pages that slide in from the right,
// ink headings, a custom cursor and a loader. Served at /portfolio-v2/; the version before
// it lives on at /portfolio-v2/previous/.
import { useEffect, useLayoutEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, makeInk } from "./motion";
import { findProject, featured, selected } from "../revamp/data/projects";
import { socials } from "../revamp/data/content";
import { Roll, go, useClock, setSettled, GridLines } from "./shared";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import "../styles/themeToggle.css";
import Case from "./pages/Case";

const parse = () => {
  const [, page = "", slug = ""] = window.location.hash.replace(/^#/, "").split("/");
  return { page, slug };
};
export const LenisCtx = createContext(null);
export const useLenis = () => useContext(LenisCtx);

// ---------------------------------------------------------------- loader: 0 → 100, then the curtain lifts
const Loader = ({ onDone }) => {
  const root = useRef(null);
  const num = useRef(null);
  useLayoutEffect(() => {
    const o = { v: 0 };
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(o, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => (num.current.textContent = Math.round(o.v)) })
      .to(num.current, { yPercent: -110, duration: 0.7, ease: "expo.in" }, "+=0.1")
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.2");
    return () => tl.kill();
  }, [onDone]);
  return (
    <div ref={root} className="fixed inset-0 z-[200] bg-[var(--fg)] text-[var(--bg)] flex items-end justify-between p-5 md:p-10">
      <p className="mono text-xs uppercase tracking-[0.2em]">Ritika Joshi · Portfolio</p>
      <div className="overflow-hidden"><p className="text-[22vw] md:text-[14vw] leading-[0.8] tracking-[-0.06em] tabular-nums"><span ref={num}>0</span><span className="text-[0.4em] align-top">%</span></p></div>
    </div>
  );
};

// ---------------------------------------------------------------- custom cursor
// a dot that trails the pointer and opens into a label over anything with data-cursor
const Cursor = () => {
  const dot = useRef(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(dot.current, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(dot.current, "y", { duration: 0.35, ease: "power3" });
    const move = (e) => {
      x(e.clientX); y(e.clientY);
      const t = e.target.closest?.("[data-cursor]");
      setLabel(t ? t.dataset.cursor : "");
      dot.current.dataset.link = e.target.closest?.("a,button") ? "1" : "";
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block mix-blend-difference">
      <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-black flex items-center justify-center transition-[width,height] duration-300 ease-out ${label ? "w-24 h-24" : "w-3 h-3"}`}>
        <span className={`mono text-[0.65rem] uppercase tracking-[0.15em] transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>{label}</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- nav
const WORK_COUNT = featured.length + selected.length;
// two short columns of links, after titarvl.framer.website
const COLS = [
  [["Home", "#/", ""], ["Works", "#/work", "work"]],
  [["About", "#/about", "about"], ["Resume", "#/resume", "resume"]],
  [["Contact", "#/contact", "contact"]],
];
// Hovering a link pours a pill of ink under it. Moving to the next link, the pill springs across
// while a trailing drop lags behind; a goo filter melts the two together so the ink stretches
// and snaps like a blot instead of a hard box sliding. The link text inverts against the pill.
const Nav = ({ route, theme, setTheme }) => {
  const clock = useRef(null);
  useClock(clock);
  const navEl = useRef(null);
  const pill = useRef(null);
  const drop = useRef(null);
  const shown = useRef(false);
  const bar = useRef(null);
  const nameEl = useRef(null);

  // the name melts back into ink and re-forms every few seconds, in the same goo as the headings
  useEffect(() => {
    let split, tl, ink, dead = false;
    document.fonts.ready.then(() => {
      if (dead || !nameEl.current) return;
      split = SplitText.create(nameEl.current.querySelectorAll(".nm"), { type: "chars" });
      ink = makeInk(nameEl.current);
      ink.setChars(split.chars);
      const paint = ink.paint;
      tl = gsap.timeline({ repeat: -1, repeatDelay: 6, delay: 4 })
        .call(ink.on)
        .to(ink.state, { blur: ink.blur * 0.7, wobble: ink.wobble * 0.7, duration: 0.6, ease: "power2.in", onUpdate: paint }, 0)
        .to(split.chars, { scale: 0.25, opacity: 0, duration: 0.5, ease: "power2.in", stagger: { each: 0.035, from: "random" } }, 0.1)
        .to(split.chars, { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out", stagger: { each: 0.035, from: "random" } }, 0.85)
        .to(ink.state, { blur: 0, wobble: 0, duration: 1.2, ease: "power2.out", onUpdate: paint }, 0.85)
        .call(ink.off);
    });
    return () => { dead = true; tl?.kill(); split?.revert(); ink?.off(); ink?.svg.remove(); };
  }, []);

  // tuck the header away while scrolling down, bring it back on the way up (always shown near the top)
  useEffect(() => {
    let last = window.scrollY, hidden = false;
    const onScroll = () => {
      const y = window.scrollY, d = y - last;
      last = y;
      if (Math.abs(d) < 2) return;
      const hide = y > 140 && d > 0;
      if (hide === hidden) return;
      hidden = hide;
      gsap.to(bar.current, { yPercent: hide ? -110 : 0, duration: hide ? 0.5 : 0.7, ease: hide ? "power3.in" : "expo.out", overwrite: true });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const over = (e) => {
    const n = navEl.current.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left - n.left, y = r.top - n.top, w = r.width, h = r.height;
    const dx = x + w / 2 - h / 2;
    // everything is SVG attributes (no transforms), so the shapes sit exactly on the link
    const full = (X, W) => ({ x: X, y, width: W, height: h, rx: h / 2 });
    const dot = (X, W) => ({ x: X + W / 2, y: y + h / 2, width: 0, height: 0, rx: 0 });
    if (!shown.current) {
      shown.current = true;
      gsap.fromTo(pill.current, { attr: dot(x, w) }, { attr: full(x, w), duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
      gsap.fromTo(drop.current, { attr: dot(dx, h) }, { attr: full(dx, h), duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    } else {
      gsap.to(pill.current, { attr: full(x, w), duration: 0.6, ease: "elastic.out(1, 0.6)", overwrite: "auto" });
      gsap.to(drop.current, { attr: full(dx, h), duration: 1, ease: "power3.out", overwrite: "auto" });
    }
  };
  const out = () => {
    shown.current = false;
    const shrink = (el) => {
      const X = +el.getAttribute("x"), Y = +el.getAttribute("y"), W = +el.getAttribute("width"), H = +el.getAttribute("height");
      gsap.to(el, { attr: { x: X + W / 2, y: Y + H / 2, width: 0, height: 0, rx: 0 }, duration: 0.45, ease: "power3.in", overwrite: "auto" });
    };
    shrink(pill.current); shrink(drop.current);
  };

  const item = "relative z-10 mix-blend-difference rounded-full px-2 py-[0.1rem] -mx-2";
  return (
    <header ref={bar} className="fixed top-0 inset-x-0 z-[100] px-5 md:px-10 py-5 md:py-6 flex items-start justify-between gap-6 mix-blend-difference text-white">
      {/* full name as the wordmark: a heavier sans, and Joshi in the italic serif from About */}
      <a ref={nameEl} href="#/" onClick={go("#/")} aria-label="Ritika Joshi, home" className="block text-[1.05rem] md:text-[1.3rem] leading-[0.9] font-semibold tracking-[-0.045em] whitespace-nowrap">
        <span className="nm block">Ritika</span>
        {/* last name tucked in under the first, like a stacked wordmark */}
        <span className="nm block pl-[1.1em] serif italic font-normal tracking-[-0.01em]">Joshi</span>
      </a>
      <nav ref={navEl} onPointerLeave={out} className="relative flex items-start gap-6 md:gap-0 md:w-1/2 md:justify-between mono uppercase text-[0.68rem] md:text-[0.8rem] tracking-[0.04em] leading-[1.6]">
        {/* the pill and its drop are SVG shapes with the goo filter applied inside the SVG: Safari
            repaints that correctly (a CSS filter: url() on HTML left streaks behind it) */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 w-full h-full overflow-visible">
          <filter id="nav-goo" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
          </filter>
          <g filter="url(#nav-goo)">
            <rect ref={pill} x="0" y="0" width="0" height="0" fill="#fff" />
            <rect ref={drop} x="0" y="0" width="0" height="0" fill="#fff" />
          </g>
        </svg>
        {COLS.map((col, c) => (
          <div key={c} className="flex flex-col items-start">
            {col.map(([l, h, page]) => (
              <a key={l} href={h} onClick={go(h)} onPointerEnter={over} className={`${item} ${route.page === page ? "text-white" : "text-white/65"}`}>
                {l}{l === "Works" && <span className="ml-1">[{WORK_COUNT}]</span>}
              </a>
            ))}
          </div>
        ))}
        {/* the only clock on the site */}
        <div className="hidden md:flex items-start gap-4">
          <p className="text-right text-white/65">
            <span ref={clock} className="tabular-nums" /> PT<br />San Francisco, CA
          </p>
        {/* the sun/moon toggle from the original site: the moon's bite slides in, rays fold away */}
        <button type="button" onPointerEnter={out} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="theme-toggle relative z-10 -mt-0.5 text-white/70 hover:text-white transition-colors">
          <svg className="sun-and-moon block translate-y-[1px]" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
            <mask className="moon" id="next-moon-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <circle cx="24" cy="10" r="6" fill="black" />
            </mask>
            <circle className="sun" cx="12" cy="12" r="5.5" mask="url(#next-moon-mask)" fill="currentColor" />
            <g className="sun-beams" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
              <line x1="12" y1="1.8" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22.2" />
              <line x1="1.8" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22.2" y2="12" />
              <line x1="4.5" y1="4.5" x2="6.1" y2="6.1" /><line x1="17.9" y1="17.9" x2="19.5" y2="19.5" />
              <line x1="4.5" y1="19.5" x2="6.1" y2="17.9" /><line x1="17.9" y1="6.1" x2="19.5" y2="4.5" />
            </g>
          </svg>
        </button>
        </div>
      </nav>
    </header>
  );
};

// ---------------------------------------------------------------- footer
export const Footer = () => {
  // one click copies the address; the label flips to "Copied" for a moment
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const email = "ritikajoshi141@gmail.com";
    try { await navigator.clipboard.writeText(email); }
    catch {
      // older browsers / blocked clipboard: fall back to a hidden textarea
      const t = Object.assign(document.createElement("textarea"), { value: email });
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch {}
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <footer className="pt-32 md:pt-48 pb-8">
      <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)]">(Contact)</p>
      <a href="#/contact" onClick={go("#/contact")} data-cursor="Say hi" className="roll-host block mt-6">
        <span data-split="morph" className="block text-[13vw] md:text-[9.5vw] leading-[0.9] tracking-[-0.05em]">Let's <span className="serif italic">talk</span></span>
      </a>
      <button type="button" data-fade onClick={copy} data-cursor={copied ? "Copied" : "Copy"} className="group mt-6 flex items-baseline gap-4 text-left text-lg md:text-2xl text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
        <span>ritikajoshi141@gmail.com</span>
        <span className={`mono text-[0.7rem] uppercase tracking-[0.15em] transition-opacity ${copied ? "opacity-100 text-[var(--fg)]" : "opacity-60 group-hover:opacity-100"}`} aria-live="polite">
          [ {copied ? "Copied" : "Copy"} ]
        </span>
      </button>
      <div data-fade className="mt-24 md:mt-32 pt-6 border-t border-[var(--line)] grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
        <p className="text-[var(--muted)]">© 2026 Ritika Joshi</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 md:col-span-2 md:justify-end">
          {socials.filter((s) => s.label !== "Email").map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"><Roll>{s.label}</Roll></a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ---------------------------------------------------------------- app
export default function NextApp() {
  const [loaded, setLoaded] = useState(false);
  // light by default like most of the references; remembers the visitor's pick
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("next-theme") || "light"; } catch { return "light"; } });
  const [lenis, setLenis] = useState(null);
  // pages on screen: normally one; during a transition the old one plus the one sliding in
  const [pages, setPages] = useState(() => [{ id: 0, route: parse(), entering: false }]);
  const layers = useRef({});
  const busy = useRef(false);
  const queued = useRef(null);
  const nextId = useRef(1);

  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem("next-theme", theme); } catch {} }, [theme]);

  // smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
  useEffect(() => {
    const l = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    l.on("scroll", ScrollTrigger.update);
    const raf = (t) => l.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(l);
    return () => { gsap.ticker.remove(raf); l.destroy(); };
  }, []);

  // Page change, forward or back: the new page slides in from the right over the old one,
  // which drifts left and dims underneath. No title card in between.
  useEffect(() => {
    const onHash = () => {
      if (busy.current) { queued.current = parse(); return; }
      busy.current = true;
      let done;
      setSettled(new Promise((r) => (done = r)));
      lenis?.stop();
      const id = nextId.current++;
      setPages((ps) => [...ps.slice(-1), { id, route: parse(), entering: true }]);
      // run the slide once both layers are in the DOM
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const inEl = layers.current[id];
        const outId = Object.keys(layers.current).map(Number).find((k) => k !== id && layers.current[k]);
        const outEl = layers.current[outId];
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(inEl, { clearProps: "transform,visibility" });
            // the new page drops into normal flow at the top; the old one goes away
            setPages([{ id, route: parse(), entering: false }]);
            requestAnimationFrame(() => {
              window.scrollTo(0, 0);
              lenis?.scrollTo(0, { immediate: true, force: true });
              lenis?.start();
              ScrollTrigger.refresh();
              done();
              busy.current = false;
              if (queued.current) { queued.current = null; onHash(); }
            });
          },
        });
        gsap.set(inEl, { xPercent: 100, visibility: "visible" });
        tl.to(inEl, { xPercent: 0, duration: 1.1, ease: "expo.inOut" }, 0);
        if (outEl) tl.to(outEl, { xPercent: -25, opacity: 0.6, duration: 1.1, ease: "expo.inOut" }, 0);
      }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [lenis]);

  const pageFor = ({ page, slug }) => (page === "work" && slug ? Case : page === "work" ? Work : page === "about" ? About : page === "resume" ? Resume : page === "contact" ? Contact : Home);
  const current = pages[pages.length - 1].route;

  return (
    <LenisCtx.Provider value={lenis}>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Nav route={current} theme={theme} setTheme={setTheme} />
      {loaded && pages.map(({ id, route, entering }) => {
        const Page = pageFor(route);
        return (
          <div
            key={id}
            ref={(el) => { if (el) layers.current[id] = el; else delete layers.current[id]; }}
            // the incoming page is a fixed, clipped layer while it slides; afterwards it's a normal page
            className={entering ? "fixed inset-0 z-[60] overflow-hidden bg-[var(--bg)] shadow-[-30px_0_60px_rgba(0,0,0,0.12)]" : "relative bg-[var(--bg)]"}
            style={entering ? { visibility: "hidden" } : undefined}
          >
            {/* drafting lines behind every page except works, resume and contact */}
            {!((route.page === "work" && !route.slug) || ["contact", "resume"].includes(route.page)) && <GridLines />}
            <div className="relative z-10"><Page slug={route.slug} /></div>
          </div>
        );
      })}
    </LenisCtx.Provider>
  );
}
