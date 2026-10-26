// Work (after titarvl.framer.website/works): "works" with a bracketed count and a grid / list
// switch drawn as icons.
//   Grid: cards on an inverted panel (black in light mode, white in dark), art kept small
//         except the wide screen projects that need the room.
//   List: one tall row per project. Left half is a spec sheet (name + discipline, platform,
//         year, [ view project ]); right half is a strip of its screens running off the edge.
import { useLayoutEffect, useRef, useState } from "react";
import { featured, selected } from "../../revamp/data/projects";
import { CardVisual, Device, Roll, go, getSettled, usePageMotion } from "../shared";
import { gsap } from "../motion";
import { Footer } from "../NextApp";
import landscapeFrame from "../../assets/case-studies/iphone-landscape-frame.png";
import zMenu from "../../assets/case-studies/zoomies/menu-poster.jpg";
import zStart from "../../assets/case-studies/zoomies/start-poster.jpg";
import zRun from "../../assets/case-studies/zoomies/sprite-run.png";
import uRecord from "../../assets/case-studies/utter/iphone-record.png";
import uInbox from "../../assets/case-studies/utter/iphone-inbox.png";
import iphone from "../../assets/case-studies/iphone-frame.png";
import bShelves from "../../assets/case-studies/bound/shelves.jpg";
import bWire from "../../assets/case-studies/bound/wireframes.jpg";
import bLedger from "../../assets/case-studies/bound/club-ledger.jpg";

// hand-picked strips where the automatic pick isn't the best look
const PICKS = {
  "iphone-duo": [{ type: "card", wide: true }], // one big look at the fold, nothing else
  bound: [
    { type: "card" },
    { type: "phone", frame: iphone, poster: bShelves },
    { type: "img", src: bWire, wide: true }, // the lo-fi core flow
    { type: "phone", frame: iphone, poster: bLedger },
  ],
  zoomies: [
    { type: "card" },
    { type: "sprite", src: zRun, frames: 8 }, // the running dog, animated off its sprite sheet
    { type: "landscape", poster: zMenu, wide: true },
    { type: "landscape", poster: zStart },
  ],
};
// keep the automatic pick but swap one slot
const SWAP = {
  utter: { 2: { type: "imgs", srcs: [uRecord, uInbox], wide: true } },
};

const all = [...featured, ...selected];
const idx = (i) => String(i + 1).padStart(3, "0");
const open = (p) => (p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : { href: `#/work/${p.slug}`, onClick: go(`#/work/${p.slug}`) });
const kind = (p) => p.tags.slice(0, 2).join(", ").toLowerCase();
// these already read small on the card (a laptop, a sideways phone, a monitor), so they keep full size
const FULL = ["cellscope", "zoomies", "lumon"];
const isImg = (s) => typeof s === "string" && !/\.(mp4|webm|mov)(\?|$)/i.test(s);

// up to four pictures for a project's list strip: the card art, then screens from its sections,
// with the hero (usually landscape) dropped into the wide third slot
const shots = (p) => {
  if (PICKS[p.slug]) return PICKS[p.slug];
  const list = autoShots(p);
  Object.entries(SWAP[p.slug] || {}).forEach(([k, t]) => (list[k] = t));
  return list;
};
const autoShots = (p) => {
  const out = [];
  const seen = new Set();
  const add = (t) => { const k = t.src || t.poster || t.type; if (!k || seen.has(k)) return; seen.add(k); out.push(t); };
  (p.sections || []).forEach((s) => {
    [...(s.phonesBefore || []), ...(s.phones || [])].forEach((ph) => ph.poster && add({ type: "phone", frame: ph.frame, poster: ph.poster }));
    if (s.phoneDemo?.poster) add({ type: "phone", frame: s.phoneDemo.frame, poster: s.phoneDemo.poster });
    if (isImg(s.phoneImage)) add({ type: "img", src: s.phoneImage });
    (s.pair || []).forEach((x) => isImg(x.phoneImage) && add({ type: "img", src: x.phoneImage }));
    if (isImg(s.image?.src || s.image)) add({ type: "img", src: s.image?.src || s.image });
    (s.images || []).forEach((x) => isImg(x?.src || x) && add({ type: "img", src: x?.src || x }));
    (s.media || []).forEach((m) => (Array.isArray(m.src) ? m.src : [m.src]).forEach((x) => isImg(x?.src || x) && add({ type: "img", src: x?.src || x })));
    (s.clips || []).forEach((c) => c.poster && add({ type: "img", src: c.poster }));
  });
  const hero = p.heroImage || p.heroVideo?.poster;
  const rest = out.slice(0, 3);
  const list = [{ type: "card" }, ...rest.slice(0, 1)];
  list.push(hero ? { type: "img", src: hero, wide: true } : rest[1] ? { ...rest[1], wide: true } : { type: "card", wide: true });
  list.push(...rest.slice(hero ? 1 : 2, hero ? 3 : 3));
  return list.slice(0, 4);
};

const Tile = ({ p, t }) => (
  <div className={`relative shrink-0 h-full overflow-hidden bg-[var(--fg)] flex items-center justify-center ${t.wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
    {t.type === "card" && <div className="absolute inset-[10%] flex items-center justify-center [&_img]:object-contain [&_video]:object-contain"><CardVisual p={p} /></div>}
    {t.type === "phone" && <Device kind="phone" frame={t.frame} poster={t.poster} className="h-[82%]" />}
    {t.type === "img" && <img src={t.src} alt="" loading="lazy" className="absolute inset-[8%] w-[84%] h-[84%] object-contain" />}
    {t.type === "imgs" && <div className="absolute inset-[8%] flex items-center justify-center gap-[6%]">{t.srcs.map((src) => <img key={src} src={src} alt="" loading="lazy" className="h-full w-auto object-contain" />)}</div>}
    {t.type === "landscape" && <div className="absolute inset-[12%] flex items-center justify-center"><Device kind="landscape" frame={landscapeFrame} poster={t.poster} className="w-full" /></div>}
    {t.type === "sprite" && <div className="sprite-run w-[55%] aspect-square" style={{ backgroundImage: `url(${t.src})`, "--frames": t.frames }} />}
  </div>
);

const GridCard = ({ p, i }) => (
  <a {...open(p)} data-cursor="View" data-item className="group block">
    <div className="relative overflow-hidden aspect-[4/5] bg-[var(--fg)]">
      <div className={`absolute ${FULL.includes(p.slug) ? "inset-0" : "inset-[17%]"} flex items-center justify-center transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] [&_img]:object-contain [&_video]:object-contain`}>
        <CardVisual p={p} />
      </div>
    </div>
    <div className="mt-3 flex items-baseline justify-between gap-4 text-sm">
      <p className="flex items-baseline gap-3"><span className="mono text-xs text-[var(--muted)]">{idx(i)}</span><Roll>{p.name}</Roll></p>
      <p className="text-[var(--muted)] truncate">{kind(p)}</p>
    </div>
  </a>
);

const ListRow = ({ p }) => (
  <a {...open(p)} data-cursor="View" data-item className="group grid md:grid-cols-[0.75fr_1.25fr] gap-6 md:gap-4 py-5 md:py-6 border-b border-[var(--fg)]">
    <div className="mono uppercase text-xs md:text-sm leading-[1.5] flex flex-col justify-between gap-10 min-h-[8rem]">
      <div className="flex justify-between gap-6">
        <p>{p.name}<br /><span className="text-[var(--muted)]">{p.tags.join(" & ")}</span></p>
        <p className="text-right">{p.platform || "—"}</p>
      </div>
      <div className="flex justify-between gap-6">
        <p>{p.year || "—"}</p>
        <p className="whitespace-nowrap">[ <Roll>{p.link ? "Visit site" : "View project"}</Roll> ]</p>
      </div>
    </div>
    <div className="flex gap-2 h-[11rem] md:h-[17rem] overflow-hidden">
      {shots(p).map((t, k) => <Tile key={k} p={p} t={t} />)}
    </div>
  </a>
);

// small square-glyph toggles instead of words
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden><rect x="1" y="1" width="7" height="7" /><rect x="10" y="1" width="7" height="7" /><rect x="1" y="10" width="7" height="7" /><rect x="10" y="10" width="7" height="7" /></svg>
);
const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden><rect x="1" y="2" width="16" height="3" /><rect x="1" y="7.5" width="16" height="3" /><rect x="1" y="13" width="16" height="3" /></svg>
);

export default function Work() {
  const root = useRef(null);
  const items = useRef(null);
  const [view, setView] = useState("grid");
  usePageMotion(root);

  // switching views: the new layout's items rise in one after another. On arrival they wait
  // for the slide and the inked title, so the heading is the first thing you see.
  // (tracked by "has the intro actually played", so React's double-run of effects in dev
  // can't skip the wait)
  const introPlayed = useRef(false);
  useLayoutEffect(() => {
    const els = items.current?.querySelectorAll("[data-item]");
    if (!els?.length) return;
    const tw = gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.045, paused: true });
    let dc, dead = false;
    const play = () => { introPlayed.current = true; tw.play(); };
    if (!introPlayed.current) getSettled().then(() => { if (!dead) dc = gsap.delayedCall(1, play); });
    else play();
    return () => { dead = true; tw.kill(); dc?.kill(); };
  }, [view]);

  return (
    <main ref={root} className="px-5 md:px-10 pt-36 md:pt-44">
      <div className="flex items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
        <div className="flex items-start gap-3 md:gap-5">
          <h1 data-split="morph" data-now className="text-[26vw] md:text-[16vw] leading-[0.78] tracking-[-0.065em]">works</h1>
          <span data-fade data-now data-delay="0.5" className="mono text-sm md:text-lg text-[var(--muted)] mt-2 md:mt-5">[ {all.length} ]</span>
        </div>
        <div data-fade data-now data-delay="0.4" className="flex items-center gap-1 pb-2">
          {[["grid", GridIcon, "Grid view"], ["list", ListIcon, "List view"]].map(([v, Icon, label]) => (
            <button key={v} type="button" onClick={() => setView(v)} aria-label={label} aria-pressed={view === v}
              className={`p-2 rounded-full transition-colors ${view === v ? "text-[var(--fg)]" : "text-[var(--muted)] opacity-50 hover:opacity-100"}`}>
              <Icon />
            </button>
          ))}
        </div>
      </div>

      <div ref={items} className="mt-8 md:mt-10">
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-10 md:gap-y-14">
            {all.map((p, i) => <GridCard key={p.slug} p={p} i={i} />)}
          </div>
        ) : (
          <div>{all.map((p) => <ListRow key={p.slug} p={p} />)}</div>
        )}
      </div>
      <Footer />
    </main>
  );
}
