// Case study: giant title + intro/meta split (Gabriel's Grandstand), then
// headed story sections with full-width or side-by-side media (Blake's Randori).
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { findProject } from "../data/projects";
import { LightboxProvider, Zoomable } from "../components/Lightbox";

const ease = [0.22, 1, 0.36, 1];
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease },
});

const isVideo = (src) => typeof src === "string" && /\.(mp4|webm|mov)$/i.test(src);

// One media tile on a neutral dark grey panel (no per-project colors), or a raw video.
// `inset` = how much of the panel the image fills.
// `ratio` is the panel shape used when it's opened in the lightbox.
const Tile = ({ src, alt, inset = "w-[80%] h-[80%]", aspect = "aspect-[4/3] md:aspect-[16/9]", ratio = 16 / 9 }) => (
  <Zoomable ratio={ratio} className={aspect}>
    {isVideo(src) ? (
      <video src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
    ) : (
      <img src={src} alt={alt} loading="lazy" className={`${inset} object-contain`} />
    )}
  </Zoomable>
);

// Full-width media, or a row of 2-3 (phone screens side by side)
// `wide`: a shorter, cinema-shaped panel for wide strips of screens (less empty grey above and below)
const Media = ({ items, caption, alt, inset, wide, bare }) => {
  const list = Array.isArray(items) ? items : [items];
  return (
    <motion.figure {...rise()} className="my-12 md:my-20">
      {list.length === 1 ? (
        <Tile
          src={list[0]}
          alt={alt}
          inset={inset}
          {...(wide ? { aspect: "aspect-[16/9] md:aspect-[21/9]", ratio: 21 / 9 } : {})}
          // `bare`: no grey panel, the image sits on the page background
          {...(bare ? { aspect: "aspect-[4/3] md:aspect-[16/9] !bg-transparent" } : {})}
        />
      ) : (
        // tall phone pairs sit in narrower, centered portrait boxes (Gabriel's Grandstand phone rows)
        <div className={`grid gap-3 md:gap-6 ${list.length === 2 ? "md:grid-cols-2 md:gap-8" : "grid-cols-3"} ${list.every((it) => it?.tall) ? "md:max-w-[66%] md:mx-auto" : ""}`}>
          {list.map((item, i) => {
            // item is a src, or { src, caption, inset } for a note under that panel
            const { src, caption: note, inset: own, tall } = typeof item === "object" && item.src ? item : { src: item };
            // pairs are usually wide shots, so they get landscape panels; rows of 3 are phone screens
            const pair = list.length === 2;
            return (
              <div key={i}>
                <Tile
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  // `tall` pairs (portrait phone screenshots) get portrait panels so the phones can be bigger
                  aspect={pair && !tall ? "aspect-[4/3]" : pair ? "aspect-[2/3]" : "aspect-[3/4]"}
                  ratio={pair && !tall ? 4 / 3 : pair ? 2 / 3 : 3 / 4}
                  inset={own || inset || "w-[80%] h-[80%]"}
                />
                {note && <p className="mt-3 md:mt-4 text-sm md:text-base font-light leading-[1.5] text-neutral-400">{note}</p>}
              </div>
            );
          })}
        </div>
      )}
      {caption && <figcaption className="mt-4 md:mt-5 max-w-3xl text-sm md:text-base font-light leading-[1.6] text-neutral-400">{caption}</figcaption>}
    </motion.figure>
  );
};

// Heading in the left column, large readable copy on the right (Gabriel's Slingshot page)
const Section = ({ heading, body, list }) => (
  <motion.section {...rise()} className="pt-20 md:pt-32 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-6 md:gap-16">
    <h2 className="text-2xl md:text-[1.75rem] font-normal tracking-[-0.015em] leading-tight text-white">{heading}</h2>
    <div className="text-lg md:text-[1.35rem] font-light tracking-[-0.005em] leading-[1.55] text-neutral-200 space-y-6">
      {body && (Array.isArray(body) ? body : [body]).map((para) => <p key={para}>{para}</p>)}
      {list && (
        <ul className="space-y-4">
          {list.map((item, n) => (
            <li key={item} className="flex gap-4">
              <span className="text-neutral-500 tabular-nums text-sm md:text-base pt-1">{String(n + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.section>
);

const Loop = ({ mp4, webm }) => (
  <video autoPlay muted loop playsInline className="w-full h-full object-cover">
    {webm && <source src={webm} type="video/webm" />}
    <source src={mp4} type="video/mp4" />
  </video>
);

// Voice memo "in transit": a packet with a tiny waveform rides a dashed line from the
// watch to the phone, labelled with what's actually moving and how.
const Flow = () => (
  <div className="relative w-[20%] self-center flex flex-col items-center text-center font-mono uppercase tracking-wider text-neutral-500 text-[clamp(6px,0.75vw,11px)]">
    <span>utter-uuid.m4a</span>
    <div className="relative w-full my-[1.2em] border-t border-dashed border-neutral-600">
      <motion.div
        className="absolute top-0 flex items-end gap-[0.18em] h-[1.9em] px-[0.6em] py-[0.45em] rounded-full bg-[#f5c542] shadow-[0_0_18px_rgba(245,197,66,0.45)]"
        style={{ x: "-50%", y: "-50%" }}
        initial={{ left: "0%", opacity: 0 }}
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5, times: [0, 0.15, 0.85, 1] }}
      >
        {[0.45, 0.9, 0.6, 1, 0.5].map((h, i) => (
          <motion.span
            key={i}
            className="w-[0.22em] rounded-full bg-black/80"
            animate={{ height: [`${h * 100}%`, `${(1.3 - h) * 100}%`, `${h * 100}%`] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
          />
        ))}
      </motion.div>
    </div>
    <span className="text-neutral-300">WatchConnectivity</span>
    <span className="mt-[0.4em] normal-case tracking-normal">transferFile(_:)</span>
  </div>
);

// Hero panel: looping recordings inside device frames (watch, and optionally an iPhone).
// Screen boxes are measured off the frame PNGs (percentages of each frame image).
const WatchDemo = ({ frame, mp4, webm, phone }) => (
  <motion.figure {...rise()} className="my-12 md:my-20">
    <Zoomable ratio={16 / 9} className="aspect-[4/3] md:aspect-[16/9]">
      <div className="relative h-[44%] aspect-[1347/2148]">
        <img src={frame} alt="" className="absolute inset-0 w-full h-full" />
        {/* recording sits slightly inside the frame's display so it never touches the bezel */}
        <div
          className="absolute overflow-hidden bg-black rounded-[14%/11.5%]"
          style={{ left: "9.6%", top: "21.6%", width: "75.2%", height: "56.7%" }}
        >
          <Loop mp4={mp4} webm={webm} />
        </div>
      </div>
      {phone && (
        <>
        <Flow />
        <div className="relative h-[84%] aspect-[2025/4139]">
          {/* the iPhone frame's screen is transparent, so the recording sits underneath it */}
          <div
            className="absolute overflow-hidden bg-black rounded-[18%/8.5%]"
            style={{ left: "5.2%", top: "2.3%", width: "89.6%", height: "95.4%" }}
          >
            <Loop mp4={phone.mp4} webm={phone.webm} />
          </div>
          <img src={phone.frame} alt="" className="absolute inset-0 w-full h-full" />
        </div>
        </>
      )}
    </Zoomable>
  </motion.figure>
);

// One iPhone playing a screen recording (or a still until the recording exists).
// Same screen box as the Utter phone: the frame's screen is transparent, so media sits underneath.
const PhoneScreen = ({ frame, mp4, webm, poster, className = "" }) => (
  <div className={`relative h-[86%] aspect-[2025/4139] ${className}`}>
    <div
      className="absolute overflow-hidden bg-black rounded-[18%/8.5%]"
      style={{ left: "5.2%", top: "2.3%", width: "89.6%", height: "95.4%" }}
    >
      {mp4 ? (
        <video autoPlay muted loop playsInline poster={poster} className="w-full h-full object-cover">
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="" className="w-full h-full object-cover object-top" />
      )}
    </div>
    <img src={frame} alt="" className="absolute inset-0 w-full h-full" />
  </div>
);

// One iPhone on a wide grey panel, or several iPhones each in their own grey box side by side
// (captions sit under each box).
// `compact`: narrower, centered portrait boxes (matches the login before/after row)
const PhoneDemo = ({ phones, compact, ...single }) => {
  if (!phones) {
    return (
      <motion.figure {...rise()} className="my-12 md:my-20">
        {/* no grey panel here: the phone sits straight on the page background */}
        <Zoomable ratio={16 / 9} className="aspect-[4/3] md:aspect-[16/9] !bg-transparent">
          <PhoneScreen {...single} />
        </Zoomable>
      </motion.figure>
    );
  }
  return (
    <motion.div {...rise()} className={`my-12 md:my-20 grid md:grid-cols-2 gap-6 md:gap-8 ${compact ? "md:max-w-[66%] md:mx-auto" : ""}`}>
      {phones.map((p, i) => (
        <figure key={i}>
          <Zoomable ratio={compact ? 2 / 3 : 4 / 5} className={compact ? "aspect-[2/3]" : "aspect-[4/5]"}>
            <PhoneScreen {...p} className={compact ? "!h-[90%]" : ""} />
          </Zoomable>
          {p.caption && (
            <figcaption className="mt-4 md:mt-5 text-sm md:text-base font-light leading-[1.6] text-neutral-400">{p.caption}</figcaption>
          )}
        </figure>
      ))}
    </motion.div>
  );
};

// Landscape iPhone with a looping recording. The recordings have their own Dynamic Island baked in,
// so the screen box is nudged left to sit exactly under the frame's island (measured off the PNG).
const LandscapePhone = ({ frame, mp4, poster, className = "" }) => (
  <div className={`relative aspect-[895/438] ${className}`}>
    <video
      autoPlay muted loop playsInline poster={poster}
      // rounded to the screen's corner radius so the square video corners don't poke past the bezel
      className="absolute object-cover bg-black rounded-[7%/15%]"
      style={{ left: "2.46%", top: "5.48%", width: "94.97%", height: "89.27%" }}
    >
      <source src={mp4} type="video/mp4" />
    </video>
    <img src={frame} alt="" className="absolute inset-0 w-full h-full" />
  </div>
);

// One big landscape phone on a wide panel, or several in their own boxes side by side (with captions)
const LandscapeDemo = ({ phones, ...single }) => {
  if (!phones) {
    return (
      <motion.figure {...rise()} className="my-12 md:my-20">
        {/* no grey panel: the phone sits straight on the page background */}
        <Zoomable ratio={16 / 9} className="aspect-[4/3] md:aspect-[16/9] !bg-transparent">
          <LandscapePhone {...single} className="w-[54%]" />
        </Zoomable>
      </motion.figure>
    );
  }
  return (
    <motion.div {...rise()} className={`my-12 md:my-20 grid gap-6 md:gap-8 ${phones.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {phones.map((p, i) => (
        <figure key={i}>
          <Zoomable ratio={16 / 10} className="aspect-[16/10]">
            <LandscapePhone {...p} className="w-[88%]" />
          </Zoomable>
          {p.caption && (
            <figcaption className="mt-4 md:mt-5 text-sm md:text-base font-light leading-[1.6] text-neutral-400">{p.caption}</figcaption>
          )}
        </figure>
      ))}
    </motion.div>
  );
};

// Hand-drawn sprite sheets: each plays live at the game's own frame timing, with the full strip underneath.
// image-rendering: pixelated keeps the 48px cells crisp when scaled up (same idea as .nearest filtering in SpriteKit).
// `hold` (ms) freezes on the last frame before looping: the play runs through `play`% of the cycle,
// then sits on the final frame for the rest (per-sprite keyframes, since the split differs per sheet).
const SpriteSheet = ({ name, src, frames, ms, note, hold = 0 }) => {
  const play = frames * ms;
  const total = play + hold;
  const id = `sprite-${name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const anim = hold
    ? `${id} ${total}ms linear infinite`
    : `sprite-play ${play}ms steps(${frames}, jump-none) infinite`;
  return (
  <figure>
    {hold > 0 && (
      <style>{`@keyframes ${id} {
        0% { background-position-x: 0%; animation-timing-function: steps(${frames}, jump-none); }
        ${((play / total) * 100).toFixed(2)}% { background-position-x: 100%; }
        100% { background-position-x: 100%; }
      }`}</style>
    )}
    <div className="aspect-[4/3] bg-[#1a1a1a] flex flex-col items-center justify-center gap-[8%]">
      <div
        role="img"
        aria-label={`${name} animation`}
        className="w-[38%] aspect-square"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: `${frames * 100}% 100%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
          animation: anim,
        }}
      />
      <img src={src} alt={`${name} sprite sheet`} className="w-[86%] h-auto" style={{ imageRendering: "pixelated" }} />
    </div>
    <figcaption className="mt-4 md:mt-5">
      <p className="text-base md:text-lg text-white">{name}</p>
      <p className="mt-1 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-500">
        {frames} frames · {ms}ms per frame
      </p>
      {note && <p className="mt-2 text-sm md:text-base font-light leading-[1.6] text-neutral-400">{note}</p>}
    </figcaption>
  </figure>
  );
};

// Pixel-art pieces on one grey panel, scaled up crisp, each with a label and a short spec line
const AssetShelf = ({ items }) => (
  <motion.figure {...rise()} className="my-12 md:my-20 bg-[#1a1a1a] px-6 md:px-12 py-10 md:py-14">
    {/* centered row: fixed-width slots so short sets (like 3 clouds) sit in the middle */}
    <ul className="flex flex-wrap justify-center gap-y-10">
      {items.map((a) => (
        <li key={a.label} className="w-1/2 md:w-1/5 flex flex-col items-center text-center">
          {/* same integer scale for every piece, so relative sizes stay true and pixels stay square */}
          <div className="h-16 md:h-24 flex items-center justify-center">
            <img src={a.src} alt={a.label} className="[zoom:3] md:[zoom:4]" style={{ imageRendering: "pixelated" }} />
          </div>
          <p className="mt-4 text-sm md:text-base text-white">{a.label}</p>
          {a.note && <p className="mt-1 font-mono text-[11px] md:text-xs uppercase tracking-wider text-neutral-500">{a.note}</p>}
        </li>
      ))}
    </ul>
  </motion.figure>
);

const Sprites = ({ sheets }) => (
  <motion.div {...rise()} className="my-12 md:my-20 grid md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-14">
    {sheets.map((s) => <SpriteSheet key={s.name} {...s} />)}
  </motion.div>
);

// MacBook with a looping screen recording on a wide grey panel, optional caption underneath.
// Screen box measured off macbook-frame.png (the frame's screen is transparent, so the video sits behind it).
const LaptopDemo = ({ frame, mp4, poster, caption }) => (
  <motion.figure {...rise()} className="my-12 md:my-20">
    <Zoomable ratio={16 / 9} className="aspect-[4/3] md:aspect-[16/9]">
      <div className="relative w-[80%] aspect-[1400/846]">
        <video
          autoPlay muted loop playsInline poster={poster}
          className="absolute object-cover bg-black"
          style={{ left: "10.8%", top: "2.8%", width: "78.5%", height: "84.4%" }}
        >
          <source src={mp4} type="video/mp4" />
        </video>
        <img src={frame} alt="" className="absolute inset-0 w-full h-full" />
      </div>
    </Zoomable>
    {caption && <figcaption className="mt-4 md:mt-5 max-w-3xl text-sm md:text-base font-light leading-[1.6] text-neutral-400">{caption}</figcaption>}
  </motion.figure>
);

// Compact figure row: label + note on the left, sketch on the right, panel sized to the
// sketch's wide shape so it doesn't eat vertical space.
const FigureRow = ({ label, text, src, inset = "w-[92%] h-[86%]" }) => (
  <motion.div {...rise()} className="pt-10 md:pt-14 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-4 md:gap-16 items-center">
    <div>
      <p className="text-base md:text-lg text-white">{label}</p>
      {text && <p className="mt-2 md:mt-3 text-base md:text-lg font-light leading-[1.6] text-neutral-400">{text}</p>}
    </div>
    <Tile src={src} alt={label} inset={inset} aspect="aspect-[2.7/1]" ratio={2.7} />
  </motion.div>
);

// Tiny Swift highlighter: comments, strings, keywords. Everything else stays neutral.
const SWIFT = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(let|var|func|guard|else|return|if|try|in|self|await)\b/gm;
const highlight = (code) => {
  const out = [];
  let last = 0, m, k = 0;
  while ((m = SWIFT.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] ? "text-neutral-500" : m[2] ? "text-[#f5c542]" : "text-[#ff7ab2]";
    out.push(<span key={k++} className={`font-mono ${cls}`}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(code.slice(last));
  return out;
};

// One step of the watch-to-phone pipeline: explanation left, real code right
const CodeStep = ({ n, label, text, file, code }) => (
  <motion.div {...rise()} className="pt-10 md:pt-14 grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] gap-4 md:gap-16 items-start">
    <div>
      <p className="text-base md:text-lg text-white">
        <span className="font-mono text-sm text-neutral-500 mr-3">{String(n).padStart(2, "0")}</span>
        {label}
      </p>
      {text && <p className="mt-2 md:mt-3 text-base md:text-lg font-light leading-[1.6] text-neutral-400">{text}</p>}
    </div>
    <div className="bg-[#1a1a1a] min-w-0">
      {file && <p className="px-5 md:px-7 pt-4 md:pt-5 font-mono text-[11px] md:text-xs uppercase tracking-wider text-neutral-500">{file}</p>}
      <pre className="px-5 md:px-7 py-4 md:py-5 overflow-x-auto font-mono text-[12px] md:text-[13.5px] leading-[1.7] text-neutral-200">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  </motion.div>
);

// Team avatars (Gabriel's Twinsi page): photo or initials, name tooltip on hover, links to LinkedIn
// first + last name initials ("Dina-Marie Lam" -> "DL")
const initials = (name) => {
  const w = name.trim().split(/\s+/);
  return (w[0][0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
};
const Team = ({ people }) => (
  <div className="flex flex-wrap gap-2.5">
    {people.map((p) => (
      <a
        key={p.name}
        href={p.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${p.name} on LinkedIn`}
        className="group relative block w-10 h-10 md:w-11 md:h-11 rounded-full"
      >
        {p.photo ? (
          <img src={p.photo} alt={p.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="w-full h-full rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center text-xs md:text-sm font-medium tracking-wide">
            {initials(p.name)}
          </span>
        )}
        {/* tooltip */}
        <span className="pointer-events-none absolute left-1/2 bottom-full mb-2.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-sm text-black opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100">
          {p.name}
        </span>
      </a>
    ))}
  </div>
);

// Brand system panel: type specimen on top, color swatches below (used on Joydrop)
const BrandPanel = ({ colors = [], display, mono }) => (
  <motion.figure {...rise()} className="my-12 md:my-20 bg-[#1a1a1a] p-6 md:p-12">
    {(display || mono) && (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-10 md:mb-14">
      <div>
        <p className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-neutral-500">Fraunces · Display</p>
        <p className="mt-3 text-[#F5F0E8] leading-[0.95] tracking-[-0.02em] text-5xl md:text-7xl"
           style={{ fontFamily: "'Fraunces', serif", fontWeight: 900 }}>
          {display}
        </p>
      </div>
      <div>
        <p className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-neutral-500">Space Mono · System</p>
        <p className="mt-3 text-[#C9B99A] text-base md:text-lg tracking-[0.12em]" style={{ fontFamily: "'Space Mono', monospace" }}>
          {mono}
        </p>
      </div>
    </div>
    )}
    <ul className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
      {colors.map((c) => (
        <li key={c.hex}>
          {/* thin ring so the near-black swatches still read against the grey panel */}
          <div className="aspect-square ring-1 ring-white/10" style={{ backgroundColor: c.hex }} />
          <p className="mt-3 text-sm md:text-base text-white">{c.name}</p>
          <p className="font-mono text-[11px] md:text-xs uppercase tracking-wider text-neutral-500">{c.hex}</p>
          {c.note && <p className="mt-1 text-xs md:text-sm font-light text-neutral-500">{c.note}</p>}
        </li>
      ))}
    </ul>
  </motion.figure>
);

// Mono uppercase label column, Grandstand-style
const MetaRow = ({ label, children }) => (
  <div className="grid grid-cols-[96px_1fr] md:grid-cols-[120px_1fr] gap-4 items-start">
    <dt className="font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-500 pt-1.5">{label}</dt>
    <dd className="text-base md:text-lg text-white">{children}</dd>
  </div>
);

export default function CaseStudy({ slug }) {
  const project = findProject(slug);
  if (!project) {
    return (
      <section className="px-5 md:px-12 py-32">
        <p className="text-3xl text-white">That project doesn't exist.</p>
        <a href="#/" className="mt-6 inline-block text-neutral-400 hover:text-white">Back to work</a>
      </section>
    );
  }


  return (
    <LightboxProvider>
    <article className="px-5 md:px-12">
      {/* Giant title, sized off viewport width */}
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="pt-16 md:pt-24 font-medium tracking-[-0.05em] leading-[0.9] text-white break-words"
        style={{ fontSize: project.name.length > 10 ? "clamp(3.5rem, 11vw, 12rem)" : "clamp(4rem, 17vw, 18rem)" }}
      >
        {project.name}
      </motion.h1>

      {/* Intro left, meta right */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="mt-14 md:mt-24 grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-12 md:gap-20"
      >
        <p className="text-xl md:text-[1.7rem] tracking-[-0.01em] leading-[1.45] text-neutral-200">{project.summary}</p>
        <dl className="space-y-6">
          {project.team?.length > 0 && <MetaRow label="Team"><Team people={project.team} /></MetaRow>}
          {project.role && <MetaRow label="Role">{project.role}</MetaRow>}
          {project.platform && <MetaRow label="Platform">{project.platform}</MetaRow>}
          <MetaRow label="Stack">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="font-mono text-xs md:text-sm uppercase tracking-wide px-3.5 py-1.5 rounded-full border border-neutral-700 text-neutral-200">
                  {t}
                </span>
              ))}
            </div>
          </MetaRow>
          {project.year && <MetaRow label="Date">{project.year}</MetaRow>}
          {project.github && <MetaRow label="Code">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1 hover:text-neutral-400 transition-colors">
              GitHub <ArrowUpRight className="w-4 h-4" />
            </a>
          </MetaRow>}
          {project.site && (
            <MetaRow label="Live">
              <a href={project.site} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 hover:text-neutral-400 transition-colors">
                {project.siteLabel || "Visit"} <ArrowUpRight className="w-4 h-4" />
              </a>
            </MetaRow>
          )}
        </dl>
      </motion.div>

      {/* Intro still (e.g. the watch welcome screen), then the looping demos */}
      {project.intro && (
        <Media items={project.intro.src} caption={project.intro.caption} alt={`${project.name} intro`} inset="w-[58%] h-[54%]" bare />
      )}

      {/* Hero media */}
      {project.landscapeDemo ? (
        <LandscapeDemo {...project.landscapeDemo} />
      ) : project.phoneDemo ? (
        <PhoneDemo {...project.phoneDemo} />
      ) : project.demo ? (
        <WatchDemo {...project.demo} />
      ) : (
        (project.hero || project.frame) && (
          <Media items={project.hero || project.frame} alt={`${project.name} preview`} inset="w-[62%] h-[62%]" />
        )
      )}

      {/* How data moves through the app: heading + body, then numbered code steps */}
      {project.flow && (
        <div>
          <Section heading={project.flow.heading} body={project.flow.body} />
          {project.flow.steps.map((st, n) => <CodeStep key={st.label} n={n + 1} {...st} />)}
        </div>
      )}

      {/* Story: heading, text, then that section's media */}
      {project.sections.map((s) => (
        <div key={s.heading || s.key}>
          {s.heading && <Section {...s} />}
          {(s.images || s.image || s.video) && (
            <Media items={s.images || s.video || s.image} caption={s.caption} inset={s.inset} wide={s.wide} alt={s.heading || project.name} />
          )}
          {s.brand && <BrandPanel {...s.brand} />}
          {/* optional "before" row of phones above the main one */}
          {s.phonesBefore && <PhoneDemo phones={s.phonesBefore} compact={s.compactPhones} />}
          {s.phones && <PhoneDemo phones={s.phones} compact={s.compactPhones} />}
          {s.landscapes && <LandscapeDemo phones={s.landscapes} />}
          {s.laptop && <LaptopDemo {...s.laptop} />}
          {s.sprites && <Sprites sheets={s.sprites} />}
          {s.assets && <AssetShelf items={s.assets} />}
          {s.steps?.map((st, n) => <CodeStep key={st.label} n={n + 1} {...st} />)}
          {s.media?.map((m, n) =>
            m.label ? (
              <FigureRow key={n} label={m.label} text={m.text} src={m.src} inset={m.inset} />
            ) : (
              <Media key={n} items={m.src} caption={m.caption} inset={m.inset} wide={m.wide} alt={m.caption || `${s.heading} ${n + 1}`} />
            )
          )}
        </div>
      ))}

      {project.metrics.length > 0 && (
        <motion.section {...rise()} className="pt-16 md:pt-28">
          <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-white mb-10">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-5xl md:text-6xl tracking-tight text-white">{m.value}</p>
                <p className="mt-2 text-sm md:text-base text-neutral-500">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {project.gallery.map((img, n) => (
        <Media key={n} items={img} alt={`${project.name} ${n + 1}`} caption={String(n + 1).padStart(2, "0")} />
      ))}

    </article>
    </LightboxProvider>
  );
}
