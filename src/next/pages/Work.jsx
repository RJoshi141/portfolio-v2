// Work (after titarvl.framer.website/works): "works" with a bracketed count and a grid / list
// switch drawn as icons.
//   Grid: cards on an inverted panel (black in light mode, white in dark), art kept small
//         except the wide screen projects that need the room.
//   List: one tall row per project. Left half is a spec sheet (name + discipline, platform,
//         year, [ view project ]); right half is a strip of its screens running off the edge.
import { useLayoutEffect, useRef, useState } from "react";
import { featured, selected } from "../../revamp/data/projects";
import { CardVisual, Clip, Device, Grain, Roll, go, getSettled, usePageMotion } from "../shared";
import { gsap } from "../motion";
import { Footer } from "../NextApp";
import duoCardMp4 from "../../assets/case-studies/duo/duo-card.mp4";
import duoCardPoster from "../../assets/case-studies/duo/duo-card-poster.jpg";
import evenHand from "../../assets/case-studies/even-hand.png";
import bHome from "../../assets/case-studies/bound/bound-card.jpg";
import jCard from "../../assets/case-studies/joydrop/joydrop-card.jpg";
import landscapeFrame from "../../assets/case-studies/iphone-landscape-frame.png";
import zMenu from "../../assets/case-studies/zoomies/menu-poster.jpg";
import zStart from "../../assets/case-studies/zoomies/start-poster.jpg";
import zRun from "../../assets/case-studies/zoomies/sprite-run.png";
import uRecord from "../../assets/case-studies/utter/iphone-record.png";
import uInbox from "../../assets/case-studies/utter/iphone-inbox.png";
import iphone from "../../assets/case-studies/iphone-frame.png";
import bShelves from "../../assets/case-studies/bound/shelves.jpg";
import bWire from "../../assets/case-studies/bound/wireframes.jpg";
import logoBme from "../../assets/bme.png";
import logoToyota from "../../assets/toyota-logo.png";
import logoBeco from "../../assets/beco-ventures.png";
import logoPg from "../../assets/pg-logo.png";
import logoKroger from "../../assets/kroger-logo.png";
// where I've worked before, as logos (heights tuned so they read the same size)
const PAST_LOGOS = [
  { name: "Bright Mind Enrichment", src: logoBme, h: 28, href: "https://brightmindenrichment.org/" },
  { name: "Toyota", src: logoToyota, h: 14, href: "https://pressroom.toyota.com/facility/toyota-motor-manufacturing-kentucky/" },
  { name: "BECO Ventures", src: logoBeco, h: 24, href: "https://beco-ventures.com/" },
  { name: "P&G", src: logoPg, h: 26, href: "https://us.pg.com/" },
  { name: "Kroger", src: logoKroger, h: 20, href: "https://apps.apple.com/us/app/kroger/id403901186" },
];
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
    [...(s.phonesBefore || []), ...(s.phones || [])].forEach((ph) => ph.poster && add({ type: "phone", kind: ph.kind, frame: ph.frame, poster: ph.poster }));
    if (s.phoneDemo?.poster) add({ type: "phone", kind: s.phoneDemo.kind, frame: s.phoneDemo.frame, poster: s.phoneDemo.poster });
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
    {t.type === "phone" && <Device kind={t.kind || "phone"} frame={t.frame} poster={t.poster} className="h-[82%]" />}
    {t.type === "img" && <img src={t.src} alt="" loading="lazy" className="absolute inset-[8%] w-[84%] h-[84%] object-contain" />}
    {t.type === "imgs" && <div className="absolute inset-[8%] flex items-center justify-center gap-[6%]">{t.srcs.map((src) => <img key={src} src={src} alt="" loading="lazy" className="h-full w-auto object-contain" />)}</div>}
    {t.type === "landscape" && <div className="absolute inset-[12%] flex items-center justify-center"><Device kind="landscape" frame={landscapeFrame} poster={t.poster} className="w-full" /></div>}
    {t.type === "sprite" && <div className="sprite-run w-[55%] aspect-square" style={{ backgroundImage: `url(${t.src})`, "--frames": t.frames }} />}
  </div>
);

// the cards show the work itself on a bright grainy colour (after rachelchen.tech), not black panels
const CARD_TONE = {
  cellscope: "radial-gradient(120% 100% at 20% 0%, #F5F9FF 0%, #D6E6FA 50%, #A9C8F0 100%)",
  lumon: "radial-gradient(120% 100% at 30% 0%, #1E4A66 0%, #0D2A42 55%, #061827 100%)",
  even: "radial-gradient(120% 100% at 20% 0%, #EEF3FF 0%, #C9D8FF 45%, #8FADF7 100%)",
  utter: "radial-gradient(120% 100% at 20% 0%, #FBF4E4 0%, #F1DDB0 45%, #E2BF79 100%)",
};
// each card plays the app itself: one real interaction from the case study, in its device
// each card takes the shape that suits its work: tall for phones, wide for screens and the game
const SHAPE = {
  joydrop: "aspect-[4/5]", layer: "aspect-[4/5]", bound: "aspect-[4/5]", even: "aspect-[4/5]",
  utter: "aspect-[3/2]", cellscope: "aspect-[16/10]", zoomies: "aspect-[16/9]", lumon: "aspect-[16/10]",
};
// which cards go in the left column, picked so both columns end at about the same height
const LEFT = ["joydrop", "even", "bound", "cellscope"];
// card order on the page: Even before Bound
const ORDER = ["joydrop", "utter", "layer", "even", "bound"];
const ordered = [...all].sort((a, b) => (ORDER.indexOf(a.slug) + 1 || 99) - (ORDER.indexOf(b.slug) + 1 || 99));
// card backdrops picked by hand: Even in the app's own blue, Bound on the research chat's photo
const CARD_BG = {
  even: "radial-gradient(120% 100% at 20% 0%, #C7D4F6 0%, #7F9BE8 38%, #3B62D6 72%, #1D4ED8 100%)",
};
const FULLBLEED = ["utter", "iphone-duo", "zoomies", "bound", "joydrop"]; // no colour panel, the content fills the card
const FLOW = { even: 2, layer: 1, bound: 1 }; // which of the Solution flows to show
const appClip = (p) => {
  const sol = p.sections?.[0] || {};
  if (p.slug in FLOW && sol.flows?.[FLOW[p.slug]]) { const f = sol.flows[FLOW[p.slug]]; return { kind: f.kind || "phone", frame: f.frame, mp4: f.mp4, poster: f.poster, tone: f.tone }; }
  if (sol.phoneDemo?.mp4) return { kind: "phone", ...sol.phoneDemo };
  return null;
};
const CardArt = ({ p }) => {
  // full-bleed: the recording or photo is the whole card
  if (p.slug === "utter" && p.heroImage) return <img src={p.heroImage} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />;

  // Bound: the ink start screen (blackletter over the oil painting), in its frame
  // Bound: the wax seal icon on a real home screen, filling the card
  if (p.slug === "bound") return <img src={bHome} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-center" />;
  // Zoomies: the pixel dog's run cycle, on the game's own flat sky
  if (p.slug === "zoomies") return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#87CFFA" }}>
      <div className="sprite-run h-[78%] aspect-square" style={{ backgroundImage: `url(${zRun})`, "--frames": 8 }} />
    </div>
  );
  // CellScope: just the dashboard screen, no laptop around it
  if (p.slug === "cellscope" && p.cardDemo?.mp4) return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Clip mp4={p.cardDemo.mp4} poster={p.cardDemo.poster} className="w-[84%] h-auto shadow-[0_12px_30px_-12px_rgba(30,60,110,0.35)]" />
    </div>
  );
  // Even: the phone in hand, cropped in close on the route
  if (p.slug === "even") return <img src={evenHand} alt="" loading="lazy" className="absolute max-w-none w-[165%] left-[-16%] top-[-4%]" />;
  // Joydrop: the app in hand, sending a joydrop
  if (p.slug === "joydrop") return <img src={jCard} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[78%_50%]" />;
  if (p.slug === "iphone-duo") return <Clip mp4={duoCardMp4} poster={duoCardPoster} className="absolute inset-0 w-full h-full object-cover scale-[1.06]" />;
  const c = appClip(p);
  if (c) { const { tone, ...d } = c; return <div className="absolute inset-0 flex items-center justify-center"><Device {...d} className="h-[78%]" /></div>; }
  return <div className="absolute inset-[14%] flex items-center justify-center [&_img]:object-contain [&_video]:object-contain"><CardVisual p={p} /></div>;
};
const GridCard = ({ p, i }) => (
  <a {...open(p)} data-cursor="View project" data-item className="group block">
    <Grain tone={FULLBLEED.includes(p.slug) ? undefined : (CARD_BG[p.slug] || appClip(p)?.tone) || p.grain || CARD_TONE[p.slug] || "neutral"} className={`relative overflow-hidden transition-opacity duration-300 group-hover:opacity-70 ${SHAPE[p.slug] || "aspect-square"}`}>
      <div className="absolute inset-0">
        <CardArt p={p} />
      </div>
    </Grain>
    <div className="mt-3 flex items-baseline gap-2 text-[0.9rem]">
      <p className="group-hover:text-[var(--red)] transition-colors">{p.name}</p>
      <span className="text-[var(--line)]">/</span>
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
  // the cards are simply there with the page (no staggered rise)

  return (
    <main ref={root} className="px-5 md:px-10 pt-28 md:pt-[calc(30vh-1.3rem)]">
      {/* after rachelchen.tech: one line about me in a big serif, where I am now and where I've been,
          then the work */}
      <h1 className="font-medium max-w-[60rem] text-[2.3rem] md:text-[3.9rem] leading-[1.1] tracking-[-0.01em]" style={{ fontFamily: '"Playfair Display", Georgia, serif', color: "#454542" }}>Ritika Joshi is an engineer with a designer's eye.</h1>
      <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-[minmax(0,15rem)_minmax(0,28rem)] gap-x-12 gap-y-6 text-[0.85rem] md:text-[0.9rem] leading-[1.55]">
        <div>
          <p className="text-[var(--muted)]">Currently</p>
          <p className="mt-1.5">Founding product engineer @ Joydrop in San Francisco</p>
        </div>
        <div>
          <p className="text-[var(--muted)]">Previously</p>
          {/* the companies as their logos, all set to the same height */}
          <ul className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-3">
            {PAST_LOGOS.map((c) => (
              <li key={c.name}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.name} className="block transition-opacity hover:opacity-70">
                  <img src={c.src} alt={c.name} className="w-auto object-contain" style={{ height: c.h }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* the work, as a grid only */}
      <div ref={items} className="mt-14 md:mt-20">
        {/* two columns that stack independently, so tall and wide cards stagger (after rachelchen.tech) */}
        <div className="sm:hidden space-y-10">{ordered.map((p, i) => <GridCard key={p.slug} p={p} i={i} />)}</div>
        <div className="hidden sm:grid grid-cols-2 gap-x-4 md:gap-x-5 items-start md:max-w-[56rem]">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-10 md:space-y-12">
              {ordered.map((p, i) => ((LEFT.includes(p.slug) ? 0 : 1) === col ? <GridCard key={p.slug} p={p} i={i} /> : null))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
