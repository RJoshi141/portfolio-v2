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

const LOGOS = { figma, typescript, react, nextjs, vercel, nestjs, firebase, expo, swift, python, fastapi, postgresql, docker, flask, html5, css3: css, javascript, xcode, openstreetmap, googlelens, pixilart };
// single-color black marks flip to white on the dark theme
const INK = ["nextjs", "vercel", "expo", "flask"];

const all = [...featured, ...selected];

// ---------------------------------------------------------------- collect a section's media
const fromSrc = (it, caption) => {
  const o = typeof it === "object" && it?.src ? it : { src: it };
  return { type: isVideo(o.src) ? "video" : "image", src: o.src, caption: o.caption || caption, tall: o.tall };
};
const media = (s) => {
  const out = [];
  if (s.image) out.push(fromSrc(s.image, s.caption));
  (s.images || []).forEach((it) => out.push(fromSrc(it)));
  if (s.video) out.push(fromSrc(s.video, s.caption));
  (s.media || []).forEach((m) => (Array.isArray(m.src) ? m.src : [m.src]).forEach((it) => out.push(fromSrc(it, m.caption || m.label))));
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
const Item = ({ m, strip, lightArt }) => {
  const phone = (m.type === "device" && m.kind === "phone") || m.tall;
  return (
    <figure className={strip ? "shrink-0" : ""}>
      <div className={`flex items-center justify-center ${strip ? (phone ? "h-[26rem] md:h-[30rem]" : "h-[16rem] md:h-[22rem]") : ""}`}>
        {m.type === "video" && <video autoPlay muted loop playsInline poster={m.poster} src={m.src} className={strip ? "h-full w-auto" : "w-full h-auto max-h-[70vh] object-contain"} />}
        {m.type === "image" && !lightArt && (
          <img src={m.src} alt="" loading="lazy" draggable="false"
            className={strip ? "h-full w-auto" : phone ? "h-[28rem] md:h-[34rem] w-auto" : "w-full h-auto max-h-[70vh] object-contain"} />
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
          <Device {...m} className={m.kind === "phone" ? (strip ? "h-full" : "h-[28rem] md:h-[34rem]") : m.kind === "landscape" ? (strip ? "h-full" : "w-full md:w-[85%]") : strip ? "h-full" : "w-full md:w-[90%]"} />
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
const HERO_WIDTH = { utter: "w-[80%] md:w-[38%]" };
const Hero = ({ p }) => {
  let inner;
  if (p.heroVideo) inner = <video autoPlay muted loop playsInline poster={p.heroVideo.poster} src={p.heroVideo.mp4} className="w-full h-auto" />;
  else if (p.landscapeDemo) inner = <Device kind="landscape" {...p.landscapeDemo} className="w-full" />;
  else if (p.phoneDemo) inner = <Device kind="phone" {...p.phoneDemo} className="h-[34rem] mx-auto" />;
  else if (p.heroImage || p.hero) {
    const src = p.heroImage || p.hero;
    inner = isVideo(src) ? <video autoPlay muted loop playsInline src={src} className="w-full h-auto" /> : <img src={src} alt="" className="w-full h-auto" />;
  } else inner = <div className="relative aspect-[4/3] flex items-center justify-center"><CardVisual p={p} /></div>;
  // most heroes sit at about two thirds width; tall ones (Utter's watch) get less
  const width = HERO_WIDTH[p.slug] || "w-full md:w-[68%]";
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

  return (
    <main ref={root} className="px-5 md:px-10 pt-36 md:pt-44">
      <div data-fade className="flex items-baseline justify-between">
        <Label>({pad(idx + 1)}) Case study</Label>
        <a href="#/work" onClick={go("#/work")} className="text-sm text-[var(--muted)]"><Roll>All works</Roll></a>
      </div>
      <h1 data-split="morph" data-now className="mt-6 text-[16vw] md:text-[8.5vw] leading-[0.9] tracking-[-0.055em]">{p.name}</h1>

      <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-x-10 gap-y-8">
        <p data-split="lines" data-now data-delay="0.3" className="md:col-span-7 text-lg md:text-[1.45rem] font-medium leading-[1.3] tracking-[-0.02em]">{p.summary}</p>
        <dl data-fade data-now data-delay="0.5" className="md:col-span-4 md:col-start-9 grid grid-cols-2 gap-x-6 gap-y-5 content-start">
          {[["Role", p.role], ["Platform", p.platform], ["Stack", p.stack.slice(0, 3).join(", ")]].map(([l, v]) => (
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

      {sections.map((s, i) => <Chapter key={s.heading || s.key || i} s={s} n={i + 1} />)}

      {p.metrics?.length > 0 && (
        <section className="pt-24 md:pt-36 grid md:grid-cols-12 gap-x-10 gap-y-8">
          <div className="md:col-span-4"><Label>Impact</Label><h2 data-split="lines" className="mt-3 text-2xl md:text-[2rem] leading-[1.1] tracking-[-0.03em]">Numbers that <span className="serif italic">moved</span>.</h2></div>
          <div className="md:col-span-8 grid grid-cols-2 gap-x-8 gap-y-10">
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
        <section className="pt-24 md:pt-36 grid md:grid-cols-12 gap-x-10 gap-y-8">
          <div className="md:col-span-4"><Label>Built with</Label></div>
          <ul className="md:col-span-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-x-4 gap-y-8">
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
