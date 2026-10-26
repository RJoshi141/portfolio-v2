// Small building blocks shared by the "next" pages.
import { useEffect, useRef } from "react";
import { gsap } from "./motion";

export const go = (hash) => (e) => {
  e?.preventDefault();
  if (window.location.hash !== hash) window.location.hash = hash;
};

// hover roll: the label slides up and an identical copy slides in from below
export const Roll = ({ children }) => (
  <span className="roll"><span>{children}</span><span aria-hidden>{children}</span></span>
);

export const pad = (n) => String(n).padStart(2, "0");
export const isVideo = (src) => typeof src === "string" && /\.(mp4|webm|mov)(\?|$)/i.test(src);

// ---------------------------------------------------------------- devices
// screen boxes measured off the frame PNGs (same numbers as the current site)
const BOX = {
  phone: { aspect: "aspect-[2025/4139]", screen: { left: "5.2%", top: "2.3%", width: "89.6%", height: "95.4%" }, round: "rounded-[13%/6%]", under: true },
  landscape: { aspect: "aspect-[895/438]", screen: { left: "2.46%", top: "5.48%", width: "94.97%", height: "89.27%" }, round: "rounded-[7%/15%]", under: true },
  laptop: { aspect: "aspect-[1400/846]", screen: { left: "10.8%", top: "2.8%", width: "78.5%", height: "84.4%" }, round: "", under: true },
  watch: { aspect: "aspect-[1347/1496]", screen: { left: "9.5%", top: "9.1%", width: "75.3%", height: "81.6%" }, round: "rounded-[14%/11.5%]", under: false },
};

export const Device = ({ kind = "phone", frame, mp4, webm, poster, className = "" }) => {
  const b = BOX[kind] || BOX.phone;
  const screen = (
    <div className={`absolute overflow-hidden bg-black ${b.round}`} style={b.screen}>
      {mp4 ? (
        <video autoPlay muted loop playsInline poster={poster} className="w-full h-full object-cover">
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        poster && <img src={poster} alt="" className="w-full h-full object-cover object-top" />
      )}
    </div>
  );
  return (
    <div className={`relative ${b.aspect} ${className}`}>
      {b.under && screen}
      {frame && <img src={frame} alt="" className="absolute inset-0 w-full h-full pointer-events-none" />}
      {!b.under && screen}
    </div>
  );
};

// ---------------------------------------------------------------- card visual
// the project's card art: a looping demo in a device, a full-bleed render, or the card image
export const CardVisual = ({ p, fit = "contain" }) => {
  const c = p.cardDemo;
  if (c?.kind === "image") return <img src={c.src} alt="" className="absolute inset-0 w-full h-full object-cover" />;
  if (c?.kind === "video")
    return <video autoPlay muted loop playsInline poster={c.poster} src={c.mp4} className="absolute inset-0 w-full h-full object-cover" />;
  if (c?.kind === "phone") return <Device kind="phone" {...c} className="h-[80%]" />;
  if (c?.kind === "landscape") return <Device kind="landscape" {...c} className="w-[76%]" />;
  if (c?.kind === "watch") return <Device kind="watch" {...c} className="h-[52%]" />;
  if (c) return <Device kind="laptop" {...c} className="w-[82%]" />;
  return <img src={p.frame} alt="" className={`w-[84%] h-[84%] object-${fit}`} />;
};

// ---------------------------------------------------------------- live SF clock
export const useClock = (ref) => {
  useEffect(() => {
    // 24-hour with seconds, ticking every second, like a station clock
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/Los_Angeles" });
    const tick = () => ref.current && (ref.current.textContent = fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [ref]);
};

// ---------------------------------------------------------------- velocity marquee
// an endless row of words; scrolling the page pushes it faster and flips its direction
export const Marquee = ({ items, lenis }) => {
  const track = useRef(null);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let x = 0, dir = -1, boost = 0;
    const tick = (_, dt) => {
      const half = el.scrollWidth / 2;
      x += dir * (0.04 + boost) * dt;
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(el, { x });
    };
    const onScroll = ({ velocity }) => {
      boost = Math.min(Math.abs(velocity) * 0.03, 1.4);
      if (velocity) dir = velocity > 0 ? -1 : 1;
    };
    gsap.ticker.add(tick);
    lenis?.on("scroll", onScroll);
    return () => { gsap.ticker.remove(tick); lenis?.off("scroll", onScroll); };
  }, [lenis]);
  // items are words or { name, logo, h } logos (logos print in one ink color, real colors on hover)
  const row = items.map((t, i) => (
    <span key={i} className="flex items-center pr-16 md:pr-28">
      {typeof t === "string" ? <span>{t}</span> : <img src={t.logo} alt={t.name} className={`logo-ink ${t.h} w-auto`} />}
    </span>
  ));
  return (
    <div className="overflow-hidden py-6 md:py-10 border-y border-[var(--line)]">
      <div ref={track} className="flex items-center w-max whitespace-nowrap text-5xl md:text-8xl tracking-[-0.03em] will-change-transform">
        {row}{row}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- drag strip
// horizontal row you can drag with the mouse or swipe/scroll sideways
export const DragStrip = ({ children, label = "drag to explore" }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0, moved = false;
    const dn = (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft; el.style.cursor = "grabbing"; };
    const mv = (e) => { if (!down) return; const dx = e.clientX - startX; if (Math.abs(dx) > 4) moved = true; el.scrollLeft = startLeft - dx; };
    const up = () => { down = false; el.style.cursor = ""; };
    const click = (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener("pointerdown", dn);
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    return () => { el.removeEventListener("pointerdown", dn); window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); el.removeEventListener("click", click, true); };
  }, []);
  return (
    <div>
      <div ref={ref} className="strip flex gap-4 md:gap-6 overflow-x-auto select-none px-5 md:px-10 -mx-5 md:-mx-10">{children}</div>
      <p className="mono mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">{label} →</p>
    </div>
  );
};

// ---------------------------------------------------------------- page motion
// Intro text (data-now) plays straight away, while the page is still sliding in.
// Scroll-driven motion waits until the slide has finished and the page sits in normal flow,
// so ScrollTrigger measures the real positions.
import { useLayoutEffect } from "react";
import { wire, ScrollTrigger } from "./motion";
let settled = Promise.resolve();
export const setSettled = (p) => (settled = p);
export const getSettled = () => settled;
export const usePageMotion = (ref) => {
  useLayoutEffect(() => {
    let a, b, dead = false;
    const wait = settled;
    // keep the page hidden until its intro is wired: otherwise, on a reload, the finished page
    // flashes for a frame (while fonts load) before the ink and fades reset it
    const el = ref.current;
    if (el) el.style.visibility = "hidden";
    document.fonts.ready.then(() => {
      if (dead || !ref.current) return;
      a = wire(ref.current, { phase: "now", delay: 0.1, ready: wait });
      ref.current.style.visibility = "";
      wait.then(() => {
        if (dead || !ref.current) return;
        b = wire(ref.current, { phase: "scroll" });
        ScrollTrigger.refresh();
      });
    });
    return () => { dead = true; a?.revert(); b?.revert(); if (el) el.style.visibility = ""; };
  }, [ref]);
};

// ---------------------------------------------------------------- background lines
// thin vertical rules on the page's column edges, sitting behind everything like a drafting sheet
export const GridLines = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 px-5 md:px-10">
    <div className="relative h-full">
      {[0, 25, 50, 75, 100].map((x) => (
        <span key={x} className={`absolute top-0 bottom-0 w-px bg-[var(--line)] ${x === 25 || x === 75 ? "hidden md:block" : ""}`} style={{ left: `${x}%` }} />
      ))}
    </div>
  </div>
);

// ---------------------------------------------------------------- walkthrough
// one device that plays several recordings in turn with a quick blink to black between them,
// and the chapters as a list you can click (beside on desktop, under on phones)
import { useState as useS } from "react";
export const Walkthrough = ({ frame, chapters, landscape = false }) => {
  const [active, setActive] = useS(0);
  const [shown, setShown] = useS(0);
  const [dark, setDark] = useS(false);
  const t = useRef();
  const go = (i) => {
    clearTimeout(t.current);
    setActive(i);
    setDark(true);
    t.current = setTimeout(() => { setShown(i); t.current = setTimeout(() => setDark(false), 900); }, 120);
  };
  useEffect(() => () => clearTimeout(t.current), []);
  const c = chapters[shown];
  const b = landscape ? BOX.landscape : BOX.phone;
  return (
    <div className={`grid gap-8 md:gap-12 items-center ${landscape ? "" : "md:grid-cols-[auto_1fr]"}`}>
      <div className={`relative mx-auto ${b.aspect} ${landscape ? "w-full md:w-[52%]" : "h-[30rem] md:h-[36rem]"}`}>
        <div className={`absolute overflow-hidden bg-black ${b.round}`} style={b.screen}>
          <video key={shown} src={c.mp4} poster={c.poster} autoPlay muted playsInline
            onLoadedData={() => setDark(false)} onError={() => setDark(false)}
            onEnded={() => go((shown + 1) % chapters.length)} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-100 ${dark ? "opacity-100" : "opacity-0"}`} />
        </div>
        {frame && <img src={frame} alt="" className="absolute inset-0 w-full h-full pointer-events-none" />}
      </div>
      {/* landscape: the chapters sit in one centered row under the phone */}
      <ol className={landscape ? "mx-auto w-full md:w-[80%] grid md:grid-cols-3 gap-x-6 border-t border-[var(--line)] md:border-t-0" : "border-t border-[var(--line)]"}>
        {chapters.map((ch, i) => (
          <li key={ch.label} className={landscape ? "border-b md:border-b-0 md:border-t border-[var(--line)]" : "border-b border-[var(--line)]"}>
            <button type="button" onClick={() => go(i)} className="group w-full text-left py-4 md:py-5 flex gap-4 items-start">
              <span className={`mt-1.5 w-3 h-3 rounded-full shrink-0 transition-colors ${i === active ? "bg-[var(--fg)]" : "bg-[var(--line)] group-hover:bg-[var(--muted)]"}`} />
              <span className="flex-1">
                <span className={`block text-base md:text-lg transition-colors ${i === active ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}>{ch.label}</span>
                <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden"><span className="block pt-2 text-sm md:text-base leading-[1.6] text-[var(--muted)]">{ch.text}</span></span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
