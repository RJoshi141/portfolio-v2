import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, findProject } from "../data/projects";

const ease = [0.22, 1, 0.36, 1];
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease },
});

// big rounded panel with the device frame centered on the project's tint
const Media = ({ src, alt, tint, caption }) => (
  <motion.figure {...rise()} className="my-16 md:my-24">
    <div
      className="rounded-2xl md:rounded-3xl aspect-[4/3] md:aspect-[16/9] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: tint }}
    >
      <img src={src} alt={alt} loading="lazy" className="w-[80%] h-[80%] object-contain" />
    </div>
    {caption && <figcaption className="mt-4 text-sm text-neutral-500">{caption}</figcaption>}
  </motion.figure>
);

// label column on the left, prose on the right (Blake-style section rhythm)
const Section = ({ heading, body, list }) => (
  <motion.section {...rise()} className="grid md:grid-cols-[240px_1fr] gap-4 md:gap-16 py-12 md:py-16 border-t border-neutral-900">
    <h2 className="text-base md:text-lg text-white">{heading}</h2>
    <div className="text-lg md:text-2xl tracking-tight leading-relaxed text-neutral-300 max-w-3xl space-y-6">
      {body && (Array.isArray(body) ? body : [body]).map((para) => <p key={para}>{para}</p>)}
      {list && (
        <ul className="space-y-4">
          {list.map((item) => (
            <li key={item} className="flex gap-4">
              <span className="text-neutral-600 tabular-nums text-base pt-1.5">
                {String(list.indexOf(item) + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.section>
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

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  // Gabriel-style metadata row, empty values dropped
  const meta = [
    ["Role", project.role],
    ["Platform", project.platform],
    ["Stack", project.stack.join(", ")],
    ["Year", project.year],
  ].filter(([, v]) => v);

  return (
    <article className="px-5 md:px-12">
      <a href="#/" className="inline-flex items-center gap-2 mt-8 text-sm text-neutral-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> All work
      </a>

      {/* Title + intro */}
      <header className="pt-12 md:pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.035em] leading-[1.02] text-white"
        >
          {project.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-6 text-xl md:text-3xl tracking-tight text-neutral-400 max-w-4xl leading-snug"
        >
          {project.summary}
        </motion.p>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 max-w-5xl"
        >
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-neutral-500">{label}</dt>
              <dd className="mt-1 text-sm md:text-base text-white">{value}</dd>
            </div>
          ))}
          <div>
            <dt className="text-sm text-neutral-500">Code</dt>
            <dd className="mt-1">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-sm md:text-base text-white hover:text-carnation transition-colors">
                GitHub <ArrowUpRight className="w-4 h-4" />
              </a>
            </dd>
          </div>
        </motion.dl>
      </header>

      {/* Hero media */}
      <Media src={project.frame} alt={`${project.name} preview`} tint={project.tint} />

      {/* Story sections, each can carry its own full-width image */}
      {project.sections.map((s) => (
        <div key={s.heading}>
          <Section {...s} />
          {s.image && <Media src={s.image} alt={s.heading} tint={project.tint} caption={s.caption} />}
        </div>
      ))}

      {/* Results block, only if there are numbers */}
      {project.metrics.length > 0 && (
        <motion.section {...rise()} className="py-12 md:py-16 border-t border-neutral-900">
          <h2 className="text-base md:text-lg text-white mb-10">Results</h2>
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

      {/* Numbered gallery */}
      {project.gallery.map((img, n) => (
        <Media key={n} src={img} alt={`${project.name} ${n + 1}`} tint={project.tint}
               caption={String(n + 1).padStart(2, "0")} />
      ))}

      {/* Prev / next */}
      <nav className="mt-16 grid grid-cols-2 border-t border-neutral-900">
        <a href={`#/work/${prev.slug}`} className="group py-12 pr-4">
          <p className="flex items-center gap-2 text-sm text-neutral-500"><ArrowLeft className="w-4 h-4" /> Previous</p>
          <p className="mt-3 text-2xl md:text-5xl tracking-tight text-white group-hover:text-carnation transition-colors">{prev.name}</p>
        </a>
        <a href={`#/work/${next.slug}`} className="group py-12 pl-4 text-right border-l border-neutral-900">
          <p className="flex items-center justify-end gap-2 text-sm text-neutral-500">Next <ArrowRight className="w-4 h-4" /></p>
          <p className="mt-3 text-2xl md:text-5xl tracking-tight text-white group-hover:text-carnation transition-colors">{next.name}</p>
        </a>
      </nav>
    </article>
  );
}
