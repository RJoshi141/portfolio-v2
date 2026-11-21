// Case study, after soliciabrown.com/projects/queue and moire-live's Lumen Studios:
// a number and a title that morphs in, a one-liner beside "Role / Platform / Stack / Code" meta,
// a modest centered hero, then chapters on a two-column grid (label and heading left, copy
// and media right), recordings in a device with clickable chapters, the numbers, and next up.
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { featured, selected, findProject } from "../../revamp/data/projects";
import { Clip, Device, DragStrip, CardVisual, Grain, Roll, Walkthrough, go, isVideo, pad, usePageMotion } from "../shared";
import { Footer, useLenis } from "../NextApp";
import { EmpathyMap, ComponentBoard, BoundPieces, TILES } from "../../revamp/components/CaseExtras";
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
  return { type: isVideo(o.src) ? "video" : "image", src: o.src, caption: o.caption || caption, tall: o.tall, wide: o.wide, small: o.small, rounded: o.rounded, w: o.w, dark: o.dark, label: o.label };
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
const HERO_WIDTH = { utter: "w-full md:max-w-[52rem]", bound: "w-full md:w-[80%]", joydrop: "w-full md:w-[80%]", layer: "w-full md:max-w-[52rem]" };
const Hero = ({ p, clip = true }) => {
  let inner;
  if (p.heroVideo) inner = <video autoPlay muted loop playsInline poster={p.heroVideo.poster} src={p.heroVideo.mp4} className="w-full h-auto" />;
  else if (p.landscapeDemo) inner = <Device kind="landscape" {...p.landscapeDemo} className="w-full" />;
  else if (p.phoneDemo) inner = <Device kind="phone" {...p.phoneDemo} className="h-[28rem] md:h-[32rem] mx-auto" />;
  else if (p.heroImage || p.hero) {
    const src = p.heroImage || p.hero;
    inner = isVideo(src) ? <video autoPlay muted loop playsInline src={src} className="w-full h-auto" /> : <img src={src} alt="" className="w-full h-auto" />;
  } else inner = <div className="relative aspect-[4/3] flex items-center justify-center"><CardVisual p={p} /></div>;
  // most heroes sit at about two thirds width; tall ones (Utter's watch) get less
  const width = p.layout === "story" ? "w-full md:max-w-[52rem]" : HERO_WIDTH[p.slug] || "w-full md:w-[52%]";
  // grainy gradient cover when the project has one
  if (p.grain) inner = <Grain tone={p.grain} className="px-[20%] py-12 md:py-16">{inner}</Grain>;
  return <div data-fade data-delay="0.2"><div data-clip={clip ? "" : undefined} className={`mt-16 md:mt-24 mx-auto ${width}`}>{inner}</div></div>;
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
      <Label>({pad(n)}){s.tag ? ` ${s.tag}` : ""}</Label>
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
      {/* "What I learned": bold lead, then a line */}
      {s.learned && (
        <div className="mt-4 space-y-3">
          {s.learned.map((l) => (
            <p key={l.title} data-fade className="text-[0.88rem] leading-[1.65]"><span className="font-medium">{l.title}</span> <span className="text-[var(--muted)]">{l.text}</span></p>
          ))}
        </div>
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

const Fig = ({ m }) => (
  <figure data-fade className="mt-12 md:mt-16 mx-auto md:w-[78%]">
    <img src={m.src} alt="" loading="lazy" className={`mx-auto w-full h-auto object-contain max-h-[30rem] ${m.rounded ? "rounded-2xl md:rounded-[1.75rem]" : ""}`} />
    {m.caption && <figcaption className="mt-3 mx-auto max-w-2xl text-xs leading-[1.6] text-[var(--muted)]">{m.caption}</figcaption>}
  </figure>
);

// "Key decision": the options I weighed, the one I picked, and one line of why
const Decision = ({ d }) => (
  <div className="mt-8 max-w-3xl">
    {d.chips ? (
      <div className="flex flex-wrap gap-2">
        {d.options.map((o, i) => (
          <span key={o.label} data-fade className={`px-3 py-1.5 text-[0.78rem] border ${i === d.chose ? "border-[var(--fg)] text-[var(--fg)]" : "border-[var(--line)] text-[var(--muted)]"}`}>
            {i === d.chose && <span className="mr-1.5">✓</span>}{o.label}
          </span>
        ))}
      </div>
    ) : (
      <div className={`grid gap-3 ${d.options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        {d.options.map((o, i) => {
          const on = i === d.chose;
          return (
            <div key={o.label} data-fade className={`p-4 border ${on ? "border-[var(--fg)]" : "border-[var(--line)]"}`}>
              <p className="mono text-[0.58rem] uppercase tracking-[0.18em] text-[var(--muted)]">{on ? "✓ Chose" : "Considered"}</p>
              <p className={`mt-2 text-[0.9rem] font-medium ${on ? "" : "text-[var(--muted)]"}`}>{o.label}</p>
              {o.note && <p className="mt-1 text-[0.78rem] leading-[1.55] text-[var(--muted)]">{o.note}</p>}
            </div>
          );
        })}
      </div>
    )}
    {d.why && (
      <p data-fade className="mt-5 text-[0.88rem] leading-[1.65]">
        <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--muted)] mr-2">Why</span>{d.why}
      </p>
    )}
  </div>
);

const CenterChapter = ({ s, n, p }) => {
  const items = media(s);
  const tone = s.grain ? p?.grain : undefined;

  if (s.decision) {
    const phonesOnly = items.length > 0 && items.every(isPhone);
    return (
      <section className="pt-24 md:pt-36 mx-auto max-w-5xl">
        <Copy s={s} n={n} wide />
        <Decision d={s.decision} />
        {phonesOnly ? (
          <Grain tone={tone} className="mt-10 md:mt-12 py-10 md:py-14 px-4 flex justify-center gap-3 md:gap-8 [&_figcaption]:hidden">
            {items.map((m, i) => <div key={i} data-fade><Item m={m} ph="h-[17rem] md:h-[25rem]" /></div>)}
          </Grain>
        ) : items.map((m, i) => <Fig key={i} m={m} />)}
      </section>
    );
  }
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
        {s.walkthrough && <div data-fade className="mt-10"><Walkthrough {...s.walkthrough} stage={tone} /></div>}
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

// ---------------------------------------------------------------- story layout (layout: "story")
// After rachelchen.tech: a legend down the left, one aligned column of content, a small grey
// eyebrow over a serif heading, grey body copy, and visuals that always sit under their text.
// every phone sits in its own square grainy panel; a lone phone always gets the same box (SOLO),
// so all the single phones on the page match
const SOLO = "w-full md:w-[52%]";
const Square = ({ tone, className = "", children }) => (
  <Grain tone={tone} className={`aspect-square flex items-center justify-center ${className}`}>{children}</Grain>
);
const Row = ({ tone, phone, title, text, children }) => (
  <div data-fade className="grid md:grid-cols-[52%_minmax(0,1fr)] gap-4 md:gap-10 md:items-end">
    <Square tone={tone}>{children || <PhoneIn m={phone} />}</Square>
    {(title || text) && (
      <div className="md:pb-2">
        {title && <p className="text-[0.92rem] md:text-[0.98rem] font-medium">{title}</p>}
        {text && <p className={`${title ? "mt-1.5" : ""} max-w-sm text-[0.82rem] md:text-[0.86rem] leading-[1.6] text-[var(--muted)]`}>{text}</p>}
      </div>
    )}
  </div>
);
// an iMessage group thread (iOS 26 look) that types itself out, message by message, then starts over
const AV = { Priya: "#E8A87C", Sam: "#7FA7D6", Maya: "#B39BD3", Leo: "#8DBF95", Jess: "#E2A8BA" };
const BLUE = "#1C8CFA";
// the little curl at the bottom corner of the last bubble in a run
const Tail = ({ me }) => (
  <svg viewBox="0 0 10 12" className={`absolute bottom-0 w-[7px] h-[9px] ${me ? "-right-[3px]" : "-left-[3px] -scale-x-100"}`} aria-hidden>
    <path d="M0 0 C0 6 2 10 10 12 C5 12 1 11 0 9 Z" fill={me ? BLUE : "#E9E9EB"} />
  </svg>
);
const Avatar = ({ name, size = "w-[1.15rem] h-[1.15rem] md:w-[1.4rem] md:h-[1.4rem]" }) => (
  <span className={`${size} shrink-0 rounded-full text-[0.45rem] md:text-[0.55rem] font-semibold text-white flex items-center justify-center`} style={{ background: AV[name] || "#bbb" }}>{name[0]}</span>
);
const GroupChat = ({ chat, frame }) => {
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(false);
  const box = useRef(null);
  const msgs = chat.messages;
  const total = msgs.length;
  useEffect(() => {
    let t;
    if (n >= total) { t = setTimeout(() => setN(0), 3200); return () => clearTimeout(t); }
    setTyping(true);
    t = setTimeout(() => { setTyping(false); setN((x) => x + 1); }, n === 0 ? 900 : 1150 + Math.min(msgs[n].text.length * 18, 700));
    return () => clearTimeout(t);
  }, [n, total]);
  useEffect(() => { const el = box.current; if (el) el.scrollTo({ top: el.scrollHeight, behavior: n ? "smooth" : "auto" }); }, [n, typing]);
  const next = msgs[n];
  const shown = msgs.slice(0, n);
  return (
    <Device kind="phone" frame={frame} className="h-[80%]">
      <div className="relative w-full h-full bg-white text-black" style={{ fontFamily: "-apple-system, 'SF Pro Text', Inter, sans-serif" }}>
        {/* the thread scrolls under a frosted header and the floating input bar */}
        <div ref={box} className="absolute inset-0 overflow-hidden px-[4%] pt-[46%] pb-[24%] text-[0.56rem] md:text-[0.66rem] leading-[1.28]">
          {shown.map((m, i) => {
            const prev = msgs[i - 1], nxt = shown[i + 1];
            const first = !m.me && prev?.from !== m.from;
            const last = !nxt || nxt.from !== m.from || !!nxt.me !== !!m.me;
            return (
              <div key={i} className={`${first || (m.me && !prev?.me) ? "mt-[0.55rem]" : "mt-[0.14rem]"}`}>
                {first && <p className="ml-[1.6rem] md:ml-[1.9rem] mb-[0.12rem] text-[0.45rem] md:text-[0.52rem] text-black/45">{m.from}</p>}
                <div className={`flex items-end gap-[0.3rem] ${m.me ? "justify-end" : ""}`}>
                  {!m.me && (last ? <Avatar name={m.from} /> : <span className="w-[1.15rem] md:w-[1.4rem] shrink-0" />)}
                  <span className={`relative max-w-[74%] px-[0.6rem] py-[0.32rem] rounded-[0.95rem] ${m.me ? "text-white" : ""}`} style={{ background: m.me ? BLUE : "#E9E9EB" }}>
                    {m.text}
                    {m.react && (
                      <span className={`absolute -top-[0.7rem] ${m.me ? "-left-[0.55rem]" : "-right-[0.55rem]"} w-[1.15rem] h-[1.15rem] rounded-full flex items-center justify-center text-[0.55rem] ring-2 ring-white`} style={{ background: "#E9E9EB" }}>{m.react}</span>
                    )}
                  </span>
                </div>
                {m.reply && <p className="ml-[1.9rem] md:ml-[2.2rem] mt-[0.15rem] text-[0.48rem] md:text-[0.56rem] font-medium" style={{ color: BLUE }}>1 Reply</p>}
              </div>
            );
          })}
          {typing && next && (
            <div className={`mt-[0.55rem] flex items-end gap-[0.3rem] ${next.me ? "justify-end" : ""}`}>
              {!next.me && <Avatar name={next.from} />}
              <span className="relative px-[0.6rem] py-[0.45rem] rounded-[0.95rem] flex gap-[3px]" style={{ background: next.me ? BLUE : "#E9E9EB" }}>
                {[0, 1, 2].map((d) => <span key={d} className="typing-dot w-[4px] h-[4px] rounded-full" style={{ background: next.me ? "#fff" : "#8e8e93", animationDelay: `${d * 0.18}s` }} />)}
              </span>
            </div>
          )}
        </div>
        {/* header: status bar, back pill, group photo, name pill, video button */}
        <div className="absolute inset-x-0 top-0 pb-[9%]" style={{ background: "linear-gradient(#fff 0%, #fff 78%, rgba(255,255,255,0) 100%)" }}>
          <div className="flex justify-between items-center px-[9%] pt-[5.5%] text-[0.5rem] md:text-[0.6rem] font-semibold">
            <span>9:41</span>
            <span className="flex items-center gap-[3px]">
              <span className="flex items-end gap-[1px]">{[3, 4, 5, 6].map((h) => <span key={h} className="w-[2px] bg-black rounded-[1px]" style={{ height: h }} />)}</span>
              <span className="w-[13px] h-[6px] rounded-[2px] border border-black/60 p-[1px]"><span className="block h-full w-[70%] bg-black rounded-[1px]" /></span>
            </span>
          </div>
          <div className="relative mt-[5%] h-[3.1rem] md:h-[3.6rem]">
            <span className="absolute left-[4%] top-[0.35rem] px-[0.4rem] py-[0.2rem] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.12)] flex items-center gap-[0.2rem] text-[0.55rem]">
              <svg viewBox="0 0 8 14" className="w-[5px] h-[9px]"><path d="M7 1 L1 7 L7 13" stroke="#000" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="w-[0.75rem] h-[0.75rem] rounded-full bg-black text-white text-[0.42rem] font-semibold flex items-center justify-center">2</span>
            </span>
            <span className="absolute right-[4%] top-[0.35rem] w-[1.25rem] h-[1.25rem] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.12)] flex items-center justify-center">
              <svg viewBox="0 0 18 12" className="w-[9px] h-[6px]"><rect x="1" y="1" width="11" height="10" rx="2.5" stroke="#000" strokeWidth="1.4" fill="none" /><path d="M12.5 4.5 L17 2 L17 10 L12.5 7.5" stroke="#000" strokeWidth="1.4" fill="none" strokeLinejoin="round" /></svg>
            </span>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center">
              <span className="w-[1.9rem] h-[1.9rem] md:w-[2.2rem] md:h-[2.2rem] rounded-full grid grid-cols-2 overflow-hidden ring-1 ring-black/5">
                {Object.keys(AV).slice(0, 4).map((k) => <span key={k} className="flex items-center justify-center text-[0.4rem] font-semibold text-white" style={{ background: AV[k] }}>{k[0]}</span>)}
              </span>
              <span className="-mt-[0.3rem] px-[0.45rem] py-[0.15rem] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.12)] text-[0.52rem] md:text-[0.6rem] font-semibold whitespace-nowrap flex items-center gap-[0.2rem]">
                {chat.title}<svg viewBox="0 0 6 10" className="w-[3px] h-[6px]"><path d="M1 1 L5 5 L1 9" stroke="#999" strokeWidth="1.4" fill="none" /></svg>
              </span>
            </div>
          </div>
        </div>
        {/* floating input: plus button and the iMessage pill */}
        <div className="absolute inset-x-0 bottom-0 px-[4%] pb-[7%] pt-[3%] flex items-center gap-[0.3rem] bg-gradient-to-t from-white via-white/90 to-white/0">
          <span className="w-[1.3rem] h-[1.3rem] shrink-0 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.14)] flex items-center justify-center text-[0.8rem] leading-none text-black/70">+</span>
          <span className="flex-1 h-[1.3rem] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.14)] px-[0.55rem] flex items-center justify-between text-[0.52rem] md:text-[0.6rem] text-black/30">
            iMessage
            <span className="flex items-center gap-[1.5px]">{[3, 6, 4, 7, 3].map((h, k) => <span key={k} className="w-[1.5px] rounded-full bg-black/35" style={{ height: h }} />)}</span>
          </span>
        </div>
      </div>
    </Device>
  );
};

const Rows = ({ children }) => <div className="mt-10 md:mt-12 space-y-10 md:space-y-14">{children}</div>;
const PhoneIn = ({ m }) => m.kind === "landscape"
  ? <Device {...m} caption={undefined} className="w-[86%]" />
  : m.type === "image"
  ? <img src={m.src} alt="" loading="lazy" className="h-[82%] w-auto object-contain" />
  : <Device {...m} caption={undefined} className="h-[76%]" />;

// a section can mix a wide "before" image with phones: the images go first, the phones after
const StoryVisuals = ({ s, p }) => {
  const all = media(s);
  if (!all.length) return null;
  const framed = all.filter((m) => m.type === "device");
  if (framed.length && framed.length < all.length) {
    const flat = all.filter((m) => m.type !== "device");
    return <><StoryItems items={flat} s={s} p={p} /><StoryItems items={framed} s={s} p={p} /></>;
  }
  return <StoryItems items={all} s={s} p={p} />;
};
const StoryItems = ({ items, s, p }) => {
  const phones = items.every(isPhone);
  const tone = s.grain ? p.grain : "neutral";
  if (phones && items.length === 1) {
    const m = items[0];
    return (
      <figure data-fade className="mt-10 md:mt-12">
        <Square tone={m.tone || tone} className={SOLO}><PhoneIn m={m} /></Square>
        {m.caption && <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{m.caption}</figcaption>}
      </figure>
    );
  }
  // three or more: one per row, caption beside; two can share a row
  if (phones && items.length >= 3) return <Rows>{items.map((m, i) => <Row key={i} tone={m.tone || tone} phone={m} text={m.caption} />)}</Rows>;
  if (phones) {
    return (
      <div className="mt-10 md:mt-12 grid grid-cols-2 gap-4 md:gap-5">
        {items.map((m, i) => (
          <figure key={i} data-fade>
            <Square tone={m.tone || tone}><PhoneIn m={m} /></Square>
            {m.caption && <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{m.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }
  if (items.every((m) => m.dark)) return items.map((m, i) => (
    <figure key={i} className="mt-8 md:mt-10">
      <div className="grain grain-dark p-5 md:p-7">
        {m.label && <p className="mono uppercase text-[0.66rem] md:text-[0.72rem] tracking-[0.14em] text-white/45">{m.label}</p>}
        <img src={m.src} alt="" loading="lazy" className={`mt-5 md:mt-6 mx-auto h-auto invert mix-blend-screen ${m.w || "w-full"}`} />
      </div>
      {m.caption && <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{m.caption}</figcaption>}
    </figure>
  ));
  return items.map((m, i) => (
    <figure key={i} data-fade className={`mt-10 md:mt-12 ${m.w || (m.small ? "w-[75%] md:w-[48%]" : "")}`}>
      {m.type === "video"
        ? <video autoPlay muted loop playsInline poster={m.poster} src={m.src} className="w-full h-auto" />
        : <img src={m.src} alt="" loading="lazy" className={`w-full h-auto ${m.rounded ? "rounded-2xl md:rounded-[1.75rem]" : ""}`} />}
      {m.caption && <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{m.caption}</figcaption>}
    </figure>
  ));
};

// a decision, kept quiet: the options in one line, the pick in full colour with a small mark,
// and one sentence on why
// a decision in a small dark card: the options in one line (the pick in white with an accent
// dot, the rest struck through) and one line on why
// a decision, kept quiet: the options in one line (the pick in full colour with an accent dot,
// the rest struck through) and one line on why
const StoryDecision = ({ d }) => (
  <div className="mt-6 md:mt-7">
    <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[1rem] md:text-[1.12rem] tracking-[-0.01em]">
      {d.options.map((o, i) => {
        const on = i === d.chose;
        return (
          <li key={o.label} className="flex items-center gap-3">
            {i > 0 && <span className="text-[var(--line)]">/</span>}
            <span className={on ? "font-medium" : "text-[var(--muted)] line-through decoration-1"}>{o.label}</span>
            {on && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent, currentColor)" }} />}
          </li>
        );
      })}
    </ul>
    {d.why && <p className="mt-3 max-w-xl text-[0.95rem] md:text-[1rem] leading-[1.6] text-[var(--muted)]">{d.why}</p>}
  </div>
);

const TwoCol = ({ rows }) => {
  const code = rows.some((r) => r.code);
  return (
    <div className={`mt-8 grid ${code ? "" : "md:grid-cols-2"} gap-x-10 gap-y-8`}>
      {rows.map((r) => (
        <div key={r.title} data-fade>
          <p className="text-[1.05rem] font-medium">{r.title}</p>
          <p className="mt-2 max-w-2xl text-[0.98rem] leading-[1.65] text-[var(--muted)]">{r.text}</p>
          {r.code && (
            <pre className="mt-4 overflow-x-auto bg-[#1C1C1B] border border-white/[0.06] p-4 md:p-5 text-[0.72rem] md:text-[0.78rem] leading-[1.6] text-[#E6E4DE]"><code className="mono">{r.code}</code></pre>
          )}
        </div>
      ))}
    </div>
  );
};

const StoryChapter = ({ s, p, i, prev }) => {
  // same eyebrow as the chapter before: no repeated label, and the heading drops to a subheading
  const cont = !!s.eyebrow && prev === s.eyebrow;
  const paras = s.body ? (Array.isArray(s.body) ? s.body : [s.body]) : [];
  return (
    <section data-nav={s.nav || undefined} id={`s-${i}`} className={cont ? "pt-16 md:pt-24" : "pt-20 md:pt-40"}>
      {s.eyebrow && !cont && <p className="text-[0.85rem] md:text-[0.95rem] text-[var(--muted)]">{s.eyebrow}</p>}
      {s.heading && (cont
        ? <h3 className="text-[1.05rem] md:text-[1.2rem] font-medium leading-[1.3] tracking-[-0.01em]">{s.heading}</h3>
        : <h2 data-split="lines" className="mt-2 md:mt-3 text-[1.45rem] md:text-[2.3rem] font-medium leading-[1.15] tracking-[-0.025em]">{s.heading}</h2>)}
      {paras.map((t) => <p key={t} data-split="lines" className="mt-4 md:mt-5 max-w-2xl text-[0.95rem] md:text-[1.08rem] leading-[1.65] text-[var(--muted)]">{t}</p>)}
      {s.list && (
        <ul className="mt-6 max-w-2xl">
          {s.list.map((t) => <li key={t} data-fade className="py-2.5 border-t border-[var(--line)] text-[0.98rem] leading-[1.55]">{t}</li>)}
        </ul>
      )}
      {s.decision && <StoryDecision d={s.decision} />}
      {s.learned && <TwoCol rows={s.learned} />}
      {s.stats && (
        <div className="mt-8 grid gap-x-6 md:gap-x-10" style={{ gridTemplateColumns: `repeat(${s.stats.length}, minmax(0, 1fr))` }}>
          {s.stats.map((m) => (
            <div key={m.label} className="pt-4 border-t border-[var(--line)]">
              <p className="text-[2rem] md:text-[3.2rem] font-medium leading-none tracking-[-0.04em]">{m.value}</p>
              <p className="mt-2 text-[0.82rem] md:text-[0.95rem] leading-[1.45] text-[var(--muted)]">{m.label}</p>
            </div>
          ))}
        </div>
      )}
      {s.steps && !s.watchDemo && !s.duo && <TwoCol rows={s.steps.map((st) => ({ title: st.label, text: st.text, code: st.code }))} />}
      {s.brand?.colors && (
        <div className="mt-8 flex flex-wrap gap-4">
          {s.brand.colors.map((c) => (
            <div key={c.hex} data-fade className="w-14 text-center">
              <div className="aspect-square rounded-full ring-1 ring-[var(--line)]" style={{ backgroundColor: c.hex }} />
              <p className="mt-1.5 text-[0.7rem]">{c.name}</p>
              <p className="mono text-[0.55rem] text-[var(--muted)]">{c.hex}</p>
            </div>
          ))}
        </div>
      )}
      {s.walkthrough && <div data-fade className="mt-10 md:mt-12"><Walkthrough {...s.walkthrough} stage={s.grain ? p.grain : undefined} /></div>}
      {s.board && (
        <div className="grain grain-neutral mt-10 md:mt-12 p-5 md:p-8">
          <p className="mono uppercase text-[0.68rem] md:text-[0.75rem] tracking-[0.14em] text-[var(--muted)]">{s.board.label}</p>
          <div className="mt-6 md:mt-8 space-y-8 md:space-y-0">
            {s.board.clusters.map((c, i) => (
              <figure key={c.label} className={`relative ${i % 2 ? "md:ml-auto md:w-[52%] md:-mt-[8%]" : "md:w-[68%]"}`}>
                <img src={c.src} alt="" loading="lazy" className="w-full h-auto" />
                <figcaption className={`mt-2 text-[0.8rem] md:text-[0.9rem] text-[var(--muted)] ${i % 2 ? "md:absolute md:left-[6%] md:top-[14%] md:mt-0" : "md:absolute md:left-[3%] md:bottom-[3%] md:mt-0"}`}>{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
      {s.watchDemo && <div className="cx mt-10 md:mt-12"><WatchDemo {...s.watchDemo} /></div>}
      {s.duo && (
        <div className="mt-10 md:mt-12 grid grid-cols-2 gap-4 md:gap-5">
          <figure>
            <Square tone={s.duo.watch.tone}>
              {/* Watch Ultra frame, the recording sits inside its display */}
              <div className="relative h-[62%] aspect-[1347/2148]">
                {/* this frame has a solid screen, so the recording goes on top of it */}
                <img src={s.duo.watch.frame} alt="" className="absolute inset-0 w-full h-full" />
                <div className="absolute overflow-hidden bg-black rounded-[14%/11.5%]" style={{ left: "9.6%", top: "21.6%", width: "75.2%", height: "56.7%" }}>
                  <Clip mp4={s.duo.watch.mp4} webm={s.duo.watch.webm} className="w-full h-full object-cover" />
                </div>
              </div>
            </Square>
            <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{s.duo.watch.caption}</figcaption>
          </figure>
          <figure>
            <Square tone={s.duo.phone.tone}><Device kind="phone" frame={s.duo.phone.frame} mp4={s.duo.phone.mp4} webm={s.duo.phone.webm} className="h-[80%]" /></Square>
            <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{s.duo.phone.caption}</figcaption>
          </figure>
        </div>
      )}
      {(s.watchDemo || s.duo) && s.steps && <TwoCol rows={s.steps.map((st) => ({ title: st.label, text: st.text }))} />}
      {s.decisions && (
        <div className="mt-10 md:mt-12 space-y-10 md:space-y-14">
          {s.decisions.map((d, k) => (
            <figure key={k}>
              <div className="flex items-baseline gap-4">
                <span className="mono text-[0.68rem] text-[var(--muted)]">{String(k + 1).padStart(2, "0")}</span>
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.98rem] md:text-[1.05rem] tracking-[-0.01em]">
                  {d.options.map((o, i) => (
                    <span key={o} className="flex items-center gap-2.5">
                      {i > 0 && <span className="text-[var(--line)]">/</span>}
                      <span className={i === d.chose ? "font-medium" : "text-[var(--muted)] line-through decoration-1"}>{o}</span>
                      {i === d.chose && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent, currentColor)" }} />}
                    </span>
                  ))}
                </p>
              </div>
              <div className="grain grain-dark mt-4 p-5 md:p-7">
                <p className="mono uppercase text-[0.62rem] md:text-[0.68rem] tracking-[0.14em] text-white/40">{d.sketch.label}</p>
                <img src={d.sketch.src} alt="" loading="lazy" className="mt-4 md:mt-5 mx-auto w-[88%] md:w-[62%] h-auto invert mix-blend-screen" />
              </div>
              {d.why && <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{d.why}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {s.mac && (
        <figure className="mt-10 md:mt-12">
          <Grain tone={s.mac.tone || "neutral"} className="py-8 md:py-12 flex justify-center"><Device kind="laptop" {...s.mac} className="w-[84%]" /></Grain>
          {s.mac.caption && <figcaption className="mt-3 text-[0.8rem] leading-[1.55] text-[var(--muted)]">{s.mac.caption}</figcaption>}
        </figure>
      )}
      {s.sprites && <div className="[&>div]:!my-10 md:[&>div]:!my-12"><Sprites still sheets={s.sprites} /></div>}
      {s.assets && <AssetShelf still items={s.assets} className="grain grain-dark mt-10 md:mt-12" />}
      {s.flows && <Rows>{s.flows.map((f) => <Row key={f.label} tone={f.tone} phone={{ kind: f.kind || "phone", frame: f.frame, mp4: f.mp4, poster: f.poster }} title={f.label} text={f.text} />)}</Rows>}
      {s.chat && <Rows><Row tone={s.chat.tone} text={s.chat.text}><GroupChat chat={s.chat} frame={s.chat.frame} /></Row></Rows>}
      {s.cards && <Rows>{s.cards.map((c) => <Row key={c.title} tone="neutral" phone={{ kind: "phone", ...c.phone }} title={c.title} text={c.text} />)}</Rows>}
      <StoryVisuals s={s} p={p} />
      {s.components === "bound" && <div className="mt-10 md:mt-12"><BoundPieces /></div>}
      {(s.empathy || (s.components && s.components !== "bound")) && (
        <div data-fade className="cx mt-10 md:mt-12">
          {s.empathy ? <EmpathyMap bare map={s.empathy} /> : <ComponentBoard bare kind={s.components} />}
        </div>
      )}
    </section>
  );
};

// the legend: section names down the left, the current one marked in the project's colour
const Legend = ({ sections, accent }) => {
  const lenis = useLenis();
  const [on, setOn] = useState(0);
  const entries = sections.map((s, i) => ({ i, label: s.nav })).filter((e) => e.label);
  useEffect(() => {
    const tick = () => {
      let cur = entries[0]?.i ?? 0;
      for (const e of entries) {
        const el = document.getElementById(`s-${e.i}`);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = e.i;
      }
      setOn(cur);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, [sections]);
  const jump = (i) => {
    const el = document.getElementById(`s-${i}`);
    if (!el) return;
    lenis ? lenis.scrollTo(el, { offset: -110 }) : el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="sticky top-[34vh] space-y-2.5">
      {entries.map((e) => {
        const active = e.i === on;
        return (
          <button key={e.i} type="button" onClick={() => jump(e.i)} className="relative block text-left text-[0.95rem] transition-colors"
            style={{ color: active ? accent : "var(--muted)" }}>
            <span className="inline-flex items-center gap-2.5">
              <span className="h-px transition-all duration-300" style={{ width: active ? 18 : 0, background: accent }} />
              <span className={`transition-transform duration-300 ${active ? "" : "-translate-x-2.5"}`}>{e.label}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default function Case({ slug }) {
  const root = useRef(null);
  usePageMotion(root);
  const p = findProject(slug);
  if (!p) return <main className="px-5 md:px-10 pt-44"><h1 className="text-6xl">Not found</h1></main>;
  const idx = all.findIndex((x) => x.slug === p.slug);
  const rest = [...all.slice(idx + 1), ...all.slice(0, idx)];
    const flow = p.flow ? [{ heading: p.flow.heading, body: p.flow.body, steps: p.flow.steps }] : [];
  const sections = [...flow, ...p.sections];
  const center = p.layout !== "classic";
  const story = p.layout === "story";
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

      <Hero p={p} clip={!story} />
      {/* Utter: the watch recording handing its memo to the iPhone inbox */}
      {p.demo?.phone && <div data-fade className="cx mx-auto mt-16 md:mt-24 max-w-5xl"><WatchDemo {...p.demo} /></div>}

      {story ? (
        <div className="mt-6 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,52rem)_minmax(0,1fr)] md:gap-x-10">
          <aside className="hidden md:block pl-4"><Legend sections={sections} accent={p.accent || "var(--fg)"} /></aside>
          <div data-still className="min-w-0" style={{ "--accent": p.accent }}>{sections.map((s, i) => <StoryChapter key={s.heading || s.key || i} s={s} p={p} i={i} prev={sections[i - 1]?.eyebrow} />)}</div>
        </div>
      ) : sections.map((s, i) => <Ch key={s.heading || s.key || i} s={s} n={i + 1} p={p} />)}

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

      {/* story layout: a quiet list in the content column, small icon + name + what it did */}
      {story && p.tools?.length > 0 && (
        <section className="pt-20 md:pt-40 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,52rem)_minmax(0,1fr)] md:gap-x-10">
          <div className="hidden md:block" />
          <div>
            <p className="text-[0.85rem] md:text-[0.95rem] text-[var(--muted)]">Built with</p>
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 border-t border-[var(--line)] pt-6">
              {p.tools.map((t) => {
                const tile = TILES[t.icon];
                const G = tile?.[0];
                return (
                  <li key={t.name} className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                      {t.logo && LOGOS[t.logo] ? (
                        <img src={LOGOS[t.logo]} alt="" className={`max-w-full max-h-full object-contain ${INK.includes(t.logo) ? "icon-ink" : ""}`} />
                      ) : G ? (
                        <span className="w-full h-full rounded-[24%] flex items-center justify-center" style={{ background: tile[1] }}>
                          <G className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                        </span>
                      ) : null}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[0.9rem] font-medium truncate">{t.name}</span>
                      {t.note && <span className="block text-[0.75rem] text-[var(--muted)] truncate">{t.note}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {!story && p.tools?.length > 0 && (
        // the tools as their real icons, name underneath (story: left aligned in the content column)
        <section data-still={story || undefined} className={story ? "pt-20 md:pt-40 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,52rem)_minmax(0,1fr)] md:gap-x-10" : center ? "pt-28 md:pt-44 text-center" : "pt-24 md:pt-36 grid md:grid-cols-12 gap-x-10 gap-y-8"}>
          {story && <div className="hidden md:block" />}
          <div className={story ? "" : "contents"}>
          <div className={story ? "" : center ? "" : "md:col-span-4"}>{story ? <p className="text-[0.85rem] md:text-[0.95rem] text-[var(--muted)]">Built with</p> : <Label>Built with</Label>}</div>
          <ul className={story ? "mt-6 flex flex-wrap gap-x-3 gap-y-6 [&>li]:w-[7.5rem]" : center ? "mx-auto mt-8 max-w-3xl flex flex-wrap justify-center gap-x-6 gap-y-6 [&>li]:w-16 [zoom:0.8]" : "md:col-span-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-8"}>
            {p.tools.map((t, i) => {
              const tile = TILES[t.icon];
              const G = tile?.[0];
              return (
                <li key={t.name} data-fade data-delay={i * 0.04} className={`flex flex-col gap-3 ${story ? "items-start text-left" : "items-center text-center"}`}>
                  <span className={`w-12 h-12 md:w-14 md:h-14 flex items-center ${story ? "justify-start" : "justify-center"}`}>
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
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
