// Case study, after soliciabrown.com/projects/queue and moire-live's Lumen Studios:
// a number and a title that morphs in, a one-liner beside "Role / Platform / Stack / Code" meta,
// a modest centered hero, then chapters on a two-column grid (label and heading left, copy
// and media right), recordings in a device with clickable chapters, the numbers, and next up.
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { featured, selected, findProject } from "../../revamp/data/projects";
import { Device, DragStrip, CardVisual, Roll, Walkthrough, go, isVideo, pad, usePageMotion } from "../shared";
import { Footer } from "../NextApp";
import { EmpathyMap, ComponentBoard, TILES } from "../../revamp/components/CaseExtras";
// pieces reused from the previous site: Utter's watch-to-phone demo, Zoomies' sprite sheets and art shelf
import { WatchDemo, Sprites, AssetShelf } from "../../revamp/pages/CaseStudy";
// current tool logos (from the maintained svg-logos set): Firebase's 2024 flame, the 2024 CSS mark,
// the newer Docker whale. Xcode is the real Xcode 26 app icon; the rest have no newer version.
import figma from "../../assets/tools/latest/figma.svg";
import typescript from "../../assets/tools/latest/typescript.svg";
import react from "../../assets/tools/latest/react.svg";
import nextjs from "../../assets/tools/latest/nextjs.svg";
import vercel from "../../assets/tools/latest/vercel.svg";
import nestjs from "../../assets/tools/latest/nestjs.svg";
import firebase from "../../assets/tools/latest/firebase.svg";
import expo from "../../assets/tools/latest/expo.svg";
import swift from "../../assets/tools/latest/swift.svg";
import python from "../../assets/tools/latest/python.svg";
import fastapi from "../../assets/tools/latest/fastapi.svg";
import postgresql from "../../assets/tools/latest/postgresql.svg";
import docker from "../../assets/tools/latest/docker.svg";
import flask from "../../assets/tools/latest/flask.svg";
import html5 from "../../assets/tools/latest/html5.svg";
import css from "../../assets/tools/latest/css.svg";
import javascript from "../../assets/tools/latest/javascript.svg";
import xcode from "../../assets/tools/color/xcode.png";
import openstreetmap from "../../assets/tools/color/openstreetmap.svg";
import googlelens from "../../assets/tools/color/googlelens.svg";
import pixilart from "../../assets/tools/color/pixilart.svg";
import supabase from "../../assets/tools/latest/supabase.svg";
import resend from "../../assets/tools/latest/resend.svg";

const LOGOS = { figma, typescript, react, nextjs, vercel, nestjs, firebase, expo, swift, python, fastapi, postgresql, docker, flask, html5, css3: css, javascript, xcode, openstreetmap, googlelens, pixilart, supabase, resend };
// single-color black marks flip to white on the dark theme
const INK = ["nextjs", "vercel", "expo", "flask", "resend"];

const all = [...featured, ...selected];

// ---------------------------------------------------------------- collect a section's media
const fromSrc = (it, caption) => {
  const o = typeof it === "object" && it?.src ? it : { src: it };
  return { type: isVideo(o.src) ? "video" : "image", src: o.src, caption: o.caption || caption, tall: o.tall, wide: o.wide, small: o.small, rounded: o.rounded };
};
const media = (s) => {
  const out = [];
  if (s.image) out.push(fromSrc(s.image, s.caption));
  (s.images || []).forEach((it) => out.push(fromSrc(it)));
  if (s.video) out.push(fromSrc(s.video, s.caption));
  (s.media || []).forEach((m) => (Array.isArray(m.src) ? m.src : [m.src]).forEach((it) => out.push({ ...fromSrc(it, m.caption || m.label), wide: m.wide })));
  if (s.phoneImage) out.push({ type: "image", src: s.phoneImage, tall: true });
  if (s.phoneDemo) out.push({ type: "device", kind: "phone", ...s.phoneDemo });
  [...(s.phonesBefore || []), ...(s.phones || [])].forEach((p) => out.push({ type: "device", kind: "phone", ...p }));
  (s.landscapes || []).forEach((p) => out.push({ type: "device", kind: "landscape", ...p }));
  if (s.laptop) out.push({ type: "device", kind: "laptop", ...s.laptop });
  (s.clips || []).forEach((c) => out.push({ type: "video", src: c.mp4, poster: c.poster, caption: c.caption }));
  (s.pair || []).forEach((p) => out.push({ type: "image", src: p.phoneImage, tall: true, caption: p.heading }));
  return out;
};

// one piece of media, kept modest: phones at a fixed height, everything else capped
const Item = ({ m, strip, lightArt, ph }) => {
  // ph: a phone height override (the centered layout sizes phones down)
  const phone = (m.type === "device" && /^phone/.test(m.kind)) || m.tall;
  const PH = ph || "h-[28rem] md:h-[34rem]";
  return (
    <figure className={strip ? "shrink-0" : ""}>
      <div className={`flex items-center justify-center ${strip ? (phone ? "h-[26rem] md:h-[30rem]" : "h-[16rem] md:h-[22rem]") : ""}`}>
        {m.type === "video" && <video autoPlay muted loop playsInline poster={m.poster} src={m.src} className={strip ? "h-full w-auto" : "w-full h-auto max-h-[70vh] object-contain"} />}
        {m.type === "image" && !lightArt && (
          <img src={m.src} alt="" loading="lazy" draggable="false"
            className={`${strip ? "h-full w-auto" : phone ? `${PH} w-auto` : "w-full h-auto max-h-[70vh] object-contain"} ${m.rounded ? "rounded-2xl md:rounded-[1.75rem]" : ""}`} />
        )}
        {/* light line art: on the light theme the drawing is repainted in Layer's deep green by
            using the image as a mask over a solid fill; on dark it shows as drawn */}
        {m.type === "image" && lightArt && (
          <span className="light-art relative inline-block">
            <img src={m.src} alt="" loading="lazy" draggable="false" className="block w-full h-auto max-h-[70vh] object-contain" />
            <span aria-hidden className="light-art-ink absolute inset-0" style={{ WebkitMaskImage: `url(${m.src})`, maskImage: `url(${m.src})` }} />
          </span>
        )}
        {m.type === "device" && (
          <Device {...m} className={/^phone/.test(m.kind) ? (strip ? "h-full" : PH) : m.kind === "landscape" ? (strip ? "h-full" : "w-full md:w-[85%]") : strip ? "h-full" : "w-full md:w-[90%]"} />
        )}
      </div>
      {m.caption && <figcaption className={`mt-4 text-sm leading-[1.55] text-[var(--muted)] ${strip ? "max-w-[18rem]" : "max-w-md"} ${phone && !strip ? "mx-auto text-center" : ""}`}>{m.caption}</figcaption>}
    </figure>
  );
};

const Gallery = ({ items, lightArt }) => {
  if (!items.length) return null;
  if (items.length === 1) return <div data-fade className="mt-12 md:mt-16"><Item m={items[0]} lightArt={lightArt} /></div>;
  if (items.length === 2)
    return <div className="mt-12 md:mt-16 grid grid-cols-2 gap-4 md:gap-8 items-start">{items.map((m, i) => <div key={i} data-fade><Item m={m} /></div>)}</div>;
  return <div className="mt-12 md:mt-16"><DragStrip>{items.map((m, i) => <Item key={i} m={m} strip />)}</DragStrip></div>;
};

// ---------------------------------------------------------------- hero media, centered and modest
const HERO_WIDTH = { utter: "w-[80%] md:w-[38%]", bound: "w-[85%] md:w-[40%]", layer: "w-[92%] md:w-[48%]" };
const Hero = ({ p }) => {
  let inner;
  if (p.heroVideo) inner = <video autoPlay muted loop playsInline poster={p.heroVideo.poster} src={p.heroVideo.mp4} className="w-full h-auto" />;
  else if (p.landscapeDemo) inner = <Device kind="landscape" {...p.landscapeDemo} className="w-full" />;
  else if (p.phoneDemo) inner = <Device kind="phone" {...p.phoneDemo} className="h-[28rem] md:h-[32rem] mx-auto" />;
  else if (p.heroImage || p.hero) {
    const src = p.heroImage || p.hero;
    inner = isVideo(src) ? <video autoPlay muted loop playsInline src={src} className="w-full h-auto" /> : <img src={src} alt="" className="w-full h-auto" />;
  } else inner = <div className="relative aspect-[4/3] flex items-center justify-center"><CardVisual p={p} /></div>;
  // most heroes sit at about two thirds width; tall ones (Utter's watch) get less
  const width = HERO_WIDTH[p.slug] || "w-full md:w-[52%]";
  return <div data-fade data-delay="0.2"><div data-clip className={`mt-16 md:mt-24 mx-auto ${width}`}>{inner}</div></div>;
};

// GitHub star count: starts from the number saved in projects.js, then refreshes from the
// GitHub API once per session (cached so it doesn't hit the rate limit)
const Stars = ({ repo, count }) => {
  const [stars, setStars] = useState(count);
  useEffect(() => {
    const path = repo.replace("https://github.com/", "");
    const key = `stars:${path}`;
    try { const c = sessionStorage.getItem(key); if (c) { setStars(Number(c)); return; } } catch {}
    fetch(`https://api.github.com/repos/${path}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.stargazers_count === "number") {
          setStars(d.stargazers_count);
          try { sessionStorage.setItem(key, String(d.stargazers_count)); } catch {}
        }
      })
      .catch(() => {});
  }, [repo]);
  return (
    <span className="inline-flex items-center gap-1.5 text-[var(--muted)]" title={`${stars} ${stars === 1 ? "star" : "stars"} on GitHub`}>
      <Star className="w-3.5 h-3.5 fill-[#f5c542] text-[#f5c542]" />
      <span className="tabular-nums">{stars}</span>
    </span>
  );
};

const Label = ({ children, className = "" }) => (
  <p className={`mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--muted)] ${className}`}>{children}</p>
);

// ---------------------------------------------------------------- a chapter
const Chapter = ({ s, n }) => {
  const paras = s.body ? (Array.isArray(s.body) ? s.body : [s.body]) : [];
  const pairText = (s.pair || []).map((x) => x.body).filter(Boolean);
  const heading = s.heading || s.pair?.map((x) => x.heading).join(" / ");
  const items = media(s);
  if (!heading && !paras.length) return <div className="md:ml-[33.4%]"><Gallery items={items} /></div>;
  return (
    <section className="pt-24 md:pt-36 grid md:grid-cols-12 gap-x-10 gap-y-6">
      {/* left: number + heading, pinned while the chapter scrolls */}
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32 md:pr-6">
          <Label>({pad(n)})</Label>
          <h2 data-split="lines" className="mt-3 text-2xl md:text-[2rem] leading-[1.1] tracking-[-0.03em]">{heading}</h2>
        </div>
      </div>
      {/* right: copy, then the chapter's media */}
      <div className="md:col-span-8">
        <div className="max-w-2xl space-y-5">
          {[...paras, ...pairText].map((t) => (
            <p key={t} data-split="lines" className="text-base md:text-[1.08rem] font-medium leading-[1.6]">{t}</p>
          ))}
          {s.list && (
            <ul>
              {s.list.map((t, i) => (
                <li key={t} data-fade className="flex gap-5 py-3 border-t border-[var(--line)] text-[1.05rem]">
                  <span className="mono text-xs text-[var(--muted)] pt-1">({pad(i + 1)})</span><span>{t}</span>
                </li>
              ))}
            </ul>
          )}
          {s.brand?.colors && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 pt-3">
              {s.brand.colors.map((c) => (
                <div key={c.hex} data-fade>
                  <div className="aspect-square rounded-full ring-1 ring-[var(--line)]" style={{ backgroundColor: c.hex }} />
                  <p className="mt-2 text-sm">{c.name}</p>
                  <p className="mono text-[0.62rem] text-[var(--muted)]">{c.hex}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* steps: "(01) label" with a line of copy, two or four across */}
        {s.steps && (
          <ol className={`mt-12 grid gap-x-8 gap-y-10 ${s.steps.length >= 4 ? "sm:grid-cols-2" : s.steps.length === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
            {s.steps.map((st, i) => (
              <li key={st.label} data-fade className="border-t border-[var(--line)] pt-4">
                <Label>({pad(i + 1)})</Label>
                <p className="mt-3 text-base md:text-lg font-medium tracking-[-0.015em]">{st.label}</p>
                {st.text && <p className="mt-2 text-[var(--muted)] leading-[1.6]">{st.text}</p>}
              </li>
            ))}
          </ol>
        )}
        {s.walkthrough && <div data-fade className="mt-12 md:mt-16"><Walkthrough {...s.walkthrough} /></div>}
        <Gallery items={items} lightArt={s.lightArt} />
      </div>
      {/* "Who it's for" and the UI component boards run the full width under the chapter heading */}
      {(s.empathy || s.components) && (
        <div data-fade className="cx md:col-span-12 mt-6 md:mt-10">
          {s.empathy ? <EmpathyMap bare map={s.empathy} /> : <ComponentBoard bare kind={s.components} />}
        </div>
      )}
    </section>
  );
};

// ---------------------------------------------------------------- a chapter, centered (layout: "center")
// The work leads. Copy is small, always left aligned, and sits beside the visuals (alternating
// sides down the page) instead of stacked above them. Wide pieces (the empathy map, the component
// board, the steps) get the small text block on top, then run across, scaled down a touch.
const isPhone = (m) => (m.type === "device" && /^phone/.test(m.kind)) || m.tall;

const Copy = ({ s, n, wide }) => {
  const own = s.body ? (Array.isArray(s.body) ? s.body : [s.body]) : [];
  // "pair" sections (two mini sections side by side) fold into one block
  const paras = [...own, ...(s.pair || []).map((x) => x.body).filter(Boolean)];
  const heading = s.heading || s.pair?.map((x) => x.heading).join(" / ");
  const list = s.list || s.pair?.flatMap((x) => x.list || []);
  return (
    <div className={`w-full shrink-0 ${wide ? "md:max-w-md" : "md:w-[19rem]"}`}>
      <Label>({pad(n)})</Label>
      {heading && <h2 data-split="lines" className="mt-3 text-base md:text-[1.15rem] font-medium leading-[1.25] tracking-[-0.015em]">{heading}</h2>}
      {paras.map((t) => (
        <p key={t} data-split="lines" className="mt-3 text-[0.88rem] leading-[1.65] text-[var(--muted)]">{t}</p>
      ))}
      {list?.length > 0 && (
        <ul className="mt-5">
          {list.map((t, i) => (
            <li key={t} data-fade className="flex gap-3 py-2 border-t border-[var(--line)] text-[0.82rem] leading-[1.5]">
              <span className="mono text-[0.6rem] text-[var(--muted)] pt-0.5">({pad(i + 1)})</span><span>{t}</span>
            </li>
          ))}
        </ul>
      )}
      {s.brand?.colors && (
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
          {s.brand.colors.map((c) => (
            <div key={c.hex} data-fade className="w-10 text-center" title={c.hex}>
              <div className="aspect-square rounded-full ring-1 ring-[var(--line)]" style={{ backgroundColor: c.hex }} />
              <p className="mt-1 text-[0.58rem] leading-tight">{c.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CenterChapter = ({ s, n }) => {
  const items = media(s);
  const big = s.walkthrough || s.empathy || s.components || s.steps || s.sprites || s.assets;
  const flip = n % 2 === 0; // alternate which side the copy sits on

  // text only: one small left-aligned block in the middle of the page
  if (!items.length && !big)
    return <section className="pt-24 md:pt-36 mx-auto max-w-md"><Copy s={s} n={n} wide /></section>;

  // wide pieces: copy on top (left aligned), the piece underneath
  if (big)
    return (
      <section className="pt-24 md:pt-36 mx-auto max-w-5xl">
        <Copy s={s} n={n} wide />
        {s.steps && (
          <ol className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {s.steps.map((st, i) => (
              <li key={st.label} data-fade className="border-t border-[var(--line)] pt-3">
                <Label>({pad(i + 1)})</Label>
                <p className="mt-2 text-[0.85rem] font-medium">{st.label}</p>
                {st.text && <p className="mt-1.5 text-[0.78rem] text-[var(--muted)] leading-[1.55]">{st.text}</p>}
              </li>
            ))}
          </ol>
        )}
        {s.walkthrough && <div data-fade className="mt-10"><Walkthrough {...s.walkthrough} /></div>}
        {/* Zoomies: the Pixilart laptop big, then the sheets and the art shelf (dark panels, kept as drawn) */}
        {(s.sprites || s.assets) && items.length > 0 && <div className="[&_figure>div]:mx-auto [&_.aspect-\[1400\/846\]]:!w-full md:[&_.aspect-\[1400\/846\]]:!w-[92%]"><Gallery items={items} /></div>}
        {(s.sprites || s.assets) && (
          <div className="cx [&_figure]:!my-8 [&_figcaption]:text-xs">
            {s.sprites && <Sprites sheets={s.sprites} />}
            {s.assets && <AssetShelf items={s.assets} />}
          </div>
        )}
        {(s.empathy || s.components) && (
          <div data-fade className="cx mt-10 [zoom:0.82]">
            {s.empathy ? <EmpathyMap bare map={s.empathy} /> : <ComponentBoard bare kind={s.components} />}
          </div>
        )}
      </section>
    );

  const hasCopy = s.heading || s.body || s.pair;
  // media with no copy of its own: just the visuals, centered
  if (!hasCopy && s.row)
    return (
      <section className="pt-16 md:pt-24 mx-auto max-w-5xl flex flex-wrap justify-center gap-6 md:gap-10 [&_figcaption]:max-w-[15rem] [&_figcaption]:text-xs">
        {items.map((m, i) => <div key={i} data-fade><Item m={m} ph="h-[22rem] md:h-[28rem]" /></div>)}
      </section>
    );
  if (!hasCopy) return <section className="pt-16 md:pt-24 mx-auto max-w-5xl"><Gallery items={items} lightArt={s.lightArt} /></section>;

  // lots of wide pieces: copy on top, the pieces in a strip / grid underneath
  const phones = items.every(isPhone);
  // a grid of everything at once (Utter's sketches), no scrolling
  if (s.grid)
    return (
      <section className="pt-24 md:pt-36 mx-auto max-w-5xl">
        <Copy s={s} n={n} wide />
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10">
          {(s.media || []).map((m) => (
            <figure key={m.src} data-fade>
              <img src={m.src} alt="" loading="lazy" className="w-full h-auto max-h-[22rem] object-contain" />
              <figcaption className="mt-3 text-xs leading-[1.6] text-[var(--muted)]"><span className="text-[var(--fg)]">{m.label}.</span> {m.text}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  // full-width pieces (Joydrop's before/after boards): one per row, stacked
  if (items.some((m) => m.wide))
    return (
      <section className="pt-24 md:pt-36 mx-auto max-w-5xl">
        <Copy s={s} n={n} wide />
        {items.map((m, i) => (
          <figure key={i} data-fade className="mt-14 md:mt-20 mx-auto md:w-[78%]">
            <img src={m.src} alt="" loading="lazy" className={`mx-auto w-full h-auto object-contain ${m.small ? "max-h-[17rem] md:max-h-[19rem]" : "max-h-[30rem]"} ${m.rounded ? "rounded-2xl md:rounded-[1.75rem]" : ""}`} />
            {m.caption && <figcaption className="mt-3 mx-auto max-w-2xl text-xs leading-[1.6] text-[var(--muted)]">{m.caption}</figcaption>}
          </figure>
        ))}
      </section>
    );
  if (items.length > 3 || (!phones && items.length > 1))
    return (
      <section className="pt-24 md:pt-36 mx-auto max-w-5xl [&_figcaption]:text-xs">
        <Copy s={s} n={n} wide />
        <Gallery items={items} lightArt={s.lightArt} />
      </section>
    );

  // visuals with copy beside them
  const ph = items.length > 1 ? "h-[20rem] md:h-[27rem]" : "h-[24rem] md:h-[31rem]";
  return (
    <section className="pt-24 md:pt-36">
      <div className={`mx-auto max-w-5xl flex flex-col md:items-center gap-10 md:gap-16 ${flip ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <Copy s={s} n={n} />
        <div data-fade className={`flex-1 min-w-0 flex justify-center gap-4 md:gap-6 [&_figcaption]:max-w-[15rem] [&_figcaption]:mx-auto [&_figcaption]:text-center [&_figcaption]:text-xs ${phones ? "" : "md:max-w-[42rem]"}`}>
          {items.map((m, i) => <Item key={i} m={m} lightArt={s.lightArt} ph={ph} />)}
        </div>
      </div>
    </section>
  );
};

export default function Case({ slug }) {
  const root = useRef(null);
  usePageMotion(root);
  const p = findProject(slug);
  if (!p) return <main className="px-5 md:px-10 pt-44"><h1 className="text-6xl">Not found</h1></main>;
  const idx = all.findIndex((x) => x.slug === p.slug);
  const rest = [...all.slice(idx + 1), ...all.slice(0, idx)];
  const next = rest.find((x) => !x.link);
  const flow = p.flow ? [{ heading: p.flow.heading, body: p.flow.body, steps: p.flow.steps }] : [];
  const sections = [...flow, ...p.sections];
  const center = p.layout !== "classic";
  const centerHead = false; // the header block keeps the original layout even in the centered case study
  const Ch = center ? CenterChapter : Chapter;

  return (
    <main ref={root} className="px-5 md:px-10 pt-36 md:pt-44">
      <div data-fade className="flex items-baseline justify-between">
        <Label>({pad(idx + 1)}) Case study</Label>
        <a href="#/work" onClick={go("#/work")} className="text-sm text-[var(--muted)]"><Roll>All works</Roll></a>
      </div>
      <h1 data-split="morph" data-now className={centerHead ? "mt-20 md:mt-24 text-center text-[13vw] md:text-[5.5vw] leading-[0.95] tracking-[-0.05em]" : "mt-6 text-[16vw] md:text-[8.5vw] leading-[0.9] tracking-[-0.055em]"}>{p.name}</h1>

      <div className={centerHead ? "mt-6 md:mt-8" : "mt-10 md:mt-14 grid md:grid-cols-12 gap-x-10 gap-y-8"}>
        <p data-split="lines" data-now data-delay="0.3" className={centerHead ? "mx-auto max-w-xl text-base md:text-[1.05rem] font-medium leading-[1.6] text-[var(--muted)]" : "md:col-span-6 text-base md:text-[1.12rem] font-medium leading-[1.5] tracking-[-0.01em]"}>{p.summary}</p>
        <dl data-fade data-now data-delay="0.5" className={centerHead ? "mx-auto mt-12 max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 border-t border-[var(--line)] pt-6" : "md:col-span-4 md:col-start-9 grid grid-cols-2 gap-x-6 gap-y-5 content-start"}>
          {[["Role", p.role], ["Platform", p.platform], ["Stack", p.stackLabel || p.stack.slice(0, 3).join(", ")]].map(([l, v]) => (
            <div key={l}><dt><Label>{l}</Label></dt><dd className="mt-1.5 text-sm md:text-[0.95rem] leading-snug">{v}</dd></div>
          ))}
          {/* Code: the repo (with its live star count) and the live site, if there is one */}
          {(p.github || p.site) && (
            <div>
              <dt><Label>Code</Label></dt>
              <dd className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm md:text-[0.95rem]">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:opacity-60 transition-opacity">GitHub <ArrowUpRight className="w-4 h-4" /></a>}
                {p.github && p.stars != null && <Stars repo={p.github} count={p.stars} />}
                {p.site && <a href={p.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:opacity-60 transition-opacity">{p.siteLabel || "Live"} <ArrowUpRight className="w-4 h-4" /></a>}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <Hero p={p} />
      {/* Utter: the watch recording handing its memo to the iPhone inbox */}
      {p.demo?.phone && <div data-fade className="cx mx-auto mt-16 md:mt-24 max-w-5xl"><WatchDemo {...p.demo} /></div>}

      {sections.map((s, i) => <Ch key={s.heading || s.key || i} s={s} n={i + 1} />)}

      {p.metrics?.length > 0 && (
        <section className={center ? "pt-24 md:pt-36 mx-auto max-w-5xl" : "pt-24 md:pt-36 grid md:grid-cols-12 gap-x-10 gap-y-8"}>
          <div className={center ? "" : "md:col-span-4"}><Label>Impact</Label><h2 data-split="lines" className={center ? "mt-3 text-base md:text-[1.15rem] font-medium" : "mt-3 text-2xl md:text-[2rem] leading-[1.1] tracking-[-0.03em]"}>Numbers that <span className="serif italic">moved</span>.</h2></div>
          <div className={center ? "mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 [&_p:first-child]:!text-4xl [&_p:first-child]:md:!text-5xl" : "md:col-span-8 grid grid-cols-2 gap-x-8 gap-y-10"}>
            {p.metrics.map((m) => {
              const num = parseFloat(m.value);
              const plain = String(num) === m.value; // only plain whole numbers count up
              return (
                <div key={m.label} className="border-t border-[var(--line)] pt-4">
                  <p className="text-5xl md:text-7xl tracking-[-0.05em]">{plain ? <span data-count={num}>0</span> : m.value}</p>
                  <p className="mt-2 text-sm text-[var(--muted)] max-w-[16rem]">{m.label}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {p.tools?.length > 0 && (
        // the tools as their real icons, name underneath
        <section className={center ? "pt-28 md:pt-44 text-center" : "pt-24 md:pt-36 grid md:grid-cols-12 gap-x-10 gap-y-8"}>
          <div className={center ? "" : "md:col-span-4"}><Label>Built with</Label></div>
          <ul className={center ? "mx-auto mt-8 max-w-3xl flex flex-wrap justify-center gap-x-6 gap-y-6 [&>li]:w-16 [zoom:0.8]" : "md:col-span-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-8"}>
            {p.tools.map((t, i) => {
              const tile = TILES[t.icon];
              const G = tile?.[0];
              return (
                <li key={t.name} data-fade data-delay={i * 0.04} className="flex flex-col items-center text-center gap-3">
                  <span className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                    {t.logo && LOGOS[t.logo] ? (
                      <img src={LOGOS[t.logo]} alt="" className={`max-w-full max-h-full object-contain ${INK.includes(t.logo) ? "icon-ink" : ""}`} />
                    ) : G ? (
                      // Apple frameworks without a public logo: an app-icon style tile
                      <span className="w-full h-full rounded-[22%] flex items-center justify-center" style={{ background: tile[1] }}>
                        <G className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.8} />
                      </span>
                    ) : null}
                  </span>
                  <span className="text-xs md:text-sm font-medium leading-tight">{t.name}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* next up: one row under a rule. The label sits on the rule, the name on the floor of the row,
          and the preview fills the right side of the same row, sitting on the same floor line */}
      {next && (
        <a href={`#/work/${next.slug}`} onClick={go(`#/work/${next.slug}`)} data-cursor="Next" className="roll-host group mt-32 md:mt-44 pt-6 border-t border-[var(--line)] grid md:grid-cols-12 gap-x-10 gap-y-8">
          <div className="md:col-span-7 flex flex-col justify-between gap-10">
            <Label>(Next case study)</Label>
            <div>
              <p className="text-[14vw] md:text-[7vw] leading-[0.82] tracking-[-0.055em]"><Roll>{next.name}</Roll></p>
              <p className="mt-5 flex justify-between gap-4 text-sm text-[var(--muted)]"><span>{next.tags?.join(", ")}</span><span className="text-[var(--fg)]"><Roll>View case study</Roll></span></p>
            </div>
          </div>
          <div className="md:col-span-5 relative h-[16rem] md:h-[22rem] overflow-hidden flex items-end justify-center transition-transform duration-700 group-hover:scale-[0.97] [&_img]:object-contain [&_img]:object-bottom [&_video]:object-contain [&_video]:object-bottom">
            <CardVisual p={next} />
          </div>
        </a>
      )}
      <Footer />
    </main>
  );
}
