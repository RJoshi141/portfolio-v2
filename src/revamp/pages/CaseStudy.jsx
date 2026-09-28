// Case study: giant title + intro/meta split (Gabriel's Grandstand), then
// headed story sections with full-width or side-by-side media (Blake's Randori).
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, findProject } from "../data/projects";
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
const Media = ({ items, caption, alt, inset }) => {
  const list = Array.isArray(items) ? items : [items];
  return (
    <motion.figure {...rise()} className="my-12 md:my-20">
      {list.length === 1 ? (
        <Tile src={list[0]} alt={alt} inset={inset} />
      ) : (
        <div className={`grid gap-3 md:gap-6 ${list.length === 2 ? "md:grid-cols-2" : "grid-cols-3"}`}>
          {list.map((item, i) => {
            // item is a src, or { src, caption, inset } for a note under that panel
            const { src, caption: note, inset: own } = typeof item === "object" && item.src ? item : { src: item };
            // pairs are usually wide shots, so they get landscape panels; rows of 3 are phone screens
            const pair = list.length === 2;
            return (
              <div key={i}>
                <Tile
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  aspect={pair ? "aspect-[4/3]" : "aspect-[3/4]"}
                  ratio={pair ? 4 / 3 : 3 / 4}
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

  // hidden case studies (e.g. Joydrop, linked from About) aren't in the Work list, so step through listed ones
  const listed = projects.filter((p) => !p.hidden);
  const i = listed.indexOf(project);
  const prev = listed[(i - 1 + listed.length) % listed.length];
  const next = listed[(i + 1) % listed.length];

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
        <Media items={project.intro.src} caption={project.intro.caption} alt={`${project.name} intro`} inset="w-[70%] h-[64%]" />
      )}

      {/* Hero media */}
      {project.demo ? (
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
            <Media items={s.images || s.video || s.image} caption={s.caption} inset={s.inset} alt={s.heading || project.name} />
          )}
          {s.media?.map((m, n) =>
            m.label ? (
              <FigureRow key={n} label={m.label} text={m.text} src={m.src} inset={m.inset} />
            ) : (
              <Media key={n} items={m.src} caption={m.caption} inset={m.inset} alt={m.caption || `${s.heading} ${n + 1}`} />
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

      <nav className="mt-24 grid grid-cols-2 border-t border-neutral-900">
        <a href={`#/work/${prev.slug}`} className="group py-12 pr-4">
          <p className="flex items-center gap-2 text-sm text-neutral-500"><ArrowLeft className="w-4 h-4" /> Previous</p>
          <p className="mt-3 text-2xl md:text-5xl tracking-tight text-white group-hover:text-neutral-400 transition-colors">{prev.name}</p>
        </a>
        <a href={`#/work/${next.slug}`} className="group py-12 pl-4 text-right border-l border-neutral-900">
          <p className="flex items-center justify-end gap-2 text-sm text-neutral-500">Next <ArrowRight className="w-4 h-4" /></p>
          <p className="mt-3 text-2xl md:text-5xl tracking-tight text-white group-hover:text-neutral-400 transition-colors">{next.name}</p>
        </a>
      </nav>
    </article>
    </LightboxProvider>
  );
}
