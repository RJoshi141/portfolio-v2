// The site: smooth velocity scroll (Lenis + GSAP), pages that slide in from the right,
// ink headings, a custom cursor and a loader. Served at /portfolio-v2/; the version before
// it lives on at /portfolio-v2/previous/.
import { useEffect, useLayoutEffect, useRef, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, SplitText, makeInk } from "./motion";
import { findProject, featured, selected } from "../revamp/data/projects";
import { socials } from "../revamp/data/content";
import { Roll, go, useClock, setSettled, GridLines } from "./shared";
import Work from "./pages/Work";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import "../styles/themeToggle.css";
import Case from "./pages/Case";

const parse = () => {
  const [, page = "", slug = ""] = window.location.hash.replace(/^#/, "").split("/");
  // no home page any more: the site opens on the works
  return { page: page || "work", slug };
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
    <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block">
      {/* the cursor: a small black dot (white on the dark theme), always */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--fg)] ring-1 ring-[var(--bg)]/70" />
      {/* over something with a label: white words on a black tag, wiping in from left to right */}
      <div className="absolute left-3 -translate-y-1/2 whitespace-nowrap transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ clipPath: label ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}>
        <span className="block px-2.5 py-1 text-[0.85rem] text-white" style={{ background: "var(--red)" }}>{label || "\u00a0"}</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- nav
const WORK_COUNT = featured.length + selected.length;
// two short columns of links, after titarvl.framer.website
const COLS = [
  [["Work", "#/work", "work"], ["About", "#/about", "about"]],
  [["Resume", "#/resume", "resume"], ["Contact", "#/contact", "contact"]],
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
  const mbar = useRef(null); // the phone header, hidden and shown with the desktop one

  // the name is plain text now (no ink loop)

  // tuck the header away while scrolling down, bring it back on the way up (always shown near the top)
  useEffect(() => {
    let last = window.scrollY, hidden = false;
    const onScroll = () => {
      const y = window.scrollY, d = y - last;
      last = y;
      if (Math.abs(d) < 2) return;
      // case studies keep the "← Work / Bound" bar in place the whole time
      const onCase = /^#\/work\/[^/]+/.test(window.location.hash);
      const hide = !onCase && y > 140 && d > 0;
      if (hide === hidden) return;
      hidden = hide;
      gsap.to([bar.current, mbar.current], { yPercent: hide ? -110 : 0, duration: hide ? 0.5 : 0.7, ease: hide ? "power3.in" : "expo.out", overwrite: true });
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
    <>
    {/* desktop: the pages as a quiet list down the left, after rachelchen.tech. The current one
        gets a short line in front, like the case study legend */}
    {/* inside a story case study the section legend takes this spot instead */}
    {!(route.page === "work" && route.slug && findProject(route.slug)?.layout === "story") && <nav aria-label="Site" className="hidden md:block fixed left-6 top-[30vh] z-[100]">
      <ul className="space-y-1.5">
        {COLS.flat().map(([l, h, page]) => {
          const on = route.page === page;
          return (
            <li key={l}>
              <a href={h} onClick={go(h)} className={`block text-[0.85rem] leading-snug transition-colors ${on ? "" : "text-[var(--muted)] hover:text-[var(--red)]"}`} style={on ? { color: "var(--red)" } : undefined}>{l}</a>
            </li>
          );
        })}
      </ul>
    </nav>}
    {/* phones: one row of pages, the current one in red, a faint rule underneath (after rachelchen.tech) */}
    <div ref={mbar} className="md:hidden fixed top-0 inset-x-0 z-[100] bg-[var(--bg)]">
      <nav aria-label="Site" className="mx-4 py-4 flex items-center gap-5 border-b border-[var(--line)] text-[0.9rem]">
        {COLS.flat().map(([l, h, page]) => {
          const on = route.page === page;
          return <a key={l} href={h} onClick={go(h)} className={on ? "" : "text-[var(--muted)] hover:text-[var(--red)] transition-colors"} style={on ? { color: "var(--red)" } : undefined}>{l}</a>;
        })}
      </nav>
    </div>
    <header ref={bar} className="hidden md:flex fixed top-0 inset-x-0 z-[100] px-6 py-5 md:py-6 items-start justify-between gap-6 text-[var(--muted)]">
      {/* plain name, or on a case study a way back: ← Work / Bound */}
      {route.page === "work" && route.slug && findProject(route.slug) ? (
        <p className="flex items-center gap-2 text-[0.85rem] whitespace-nowrap">
          <a href="#/work" onClick={go("#/work")} className="flex items-center gap-1.5 hover:text-[var(--red)] transition-colors">
            <svg aria-hidden width="14" height="14" viewBox="0 0 14 14"><path d="M12 7H2M6 3L2 7l4 4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Work
          </a>
          <span className="opacity-50">/</span>
          <span className="text-[var(--fg)]">{findProject(route.slug).name}</span>
        </p>
      ) : (
        <a href="#/work" onClick={go("#/work")} className="block text-[0.85rem] hover:text-[var(--red)] transition-colors whitespace-nowrap">Ritika Joshi</a>
      )}
      <nav ref={navEl} onPointerLeave={out} className="relative flex items-start gap-6 md:gap-0 md:justify-end text-[0.85rem] leading-[1.5]">
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
          <div key={c} className="flex flex-col items-start md:hidden">
            {col.map(([l, h, page]) => (
              <a key={l} href={h} onClick={go(h)} onPointerEnter={over} className={`${item} ${route.page === page ? "text-white" : "text-white/65"}`}>
                {l}
              </a>
            ))}
          </div>
        ))}
        {/* the only clock on the site */}
        <div className="hidden md:flex items-start gap-4">
          <p className="text-right text-[0.72rem] leading-[1.4]">
            <span ref={clock} className="tabular-nums" /> PT<br />San Francisco, CA
          </p>
        </div>
      </nav>
    </header>
    </>
  );
};

// ---------------------------------------------------------------- footer
export const Footer = () => (
  // just the links, no rule, no copyright
  <footer className="mt-32 md:mt-48 pb-8 flex flex-wrap gap-x-5 gap-y-1 md:justify-end text-[0.85rem]">
    {socials.filter((s) => s.label !== "Email").map((s) => (
      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--red)] transition-colors">{s.label}</a>
    ))}
  </footer>
);


// ---------------------------------------------------------------- app
export default function NextApp() {
  // no loading screen: the site opens straight onto the page
  const loaded = true;
  // light by default like most of the references; remembers the visitor's pick
  const [theme, setTheme] = useState("light"); // light only, no dark mode
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
    window.__lenis = l;
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
            gsap.set(inEl, { clearProps: "transform,visibility,opacity" });
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
        // a quiet cross-fade, after rachelchen.tech: the old page fades out, the new one fades in
        gsap.set(inEl, { opacity: 0, visibility: "visible" });
        if (outEl) tl.to(outEl, { opacity: 0, duration: 0.25, ease: "power1.out" }, 0);
        tl.to(inEl, { opacity: 1, duration: 0.45, ease: "power1.out" }, 0.15);
      }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [lenis]);

  const pageFor = ({ page, slug }) => (page === "work" && slug ? Case : page === "work" ? Work : page === "about" ? About : page === "resume" ? Resume : page === "contact" ? Contact : Work);
  const current = pages[pages.length - 1].route;

  return (
    <LenisCtx.Provider value={lenis}>
      <Cursor />
      <Nav route={current} theme={theme} setTheme={setTheme} />
      {loaded && pages.map(({ id, route, entering }) => {
        const Page = pageFor(route);
        return (
          <div
            key={id}
            ref={(el) => { if (el) layers.current[id] = el; else delete layers.current[id]; }}
            // the incoming page is a fixed, clipped layer while it slides; afterwards it's a normal page
            className={entering ? "fixed inset-0 z-[60] overflow-hidden bg-[var(--bg)]" : "relative bg-[var(--bg)]"}
            style={entering ? { visibility: "hidden" } : undefined}
          >
            {/* drafting lines behind every page except works, resume and contact */}
            {!((route.page === "work" && (!route.slug || findProject(route.slug)?.layout === "story")) || ["contact", "resume", "about"].includes(route.page)) && <GridLines />}
            <div className="relative z-10 md:pl-[14rem]"><Page slug={route.slug} /></div>
          </div>
        );
      })}
    </LenisCtx.Provider>
  );
}
