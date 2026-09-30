// #/writing: articles and talks as image cards
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTitle from "../components/PageTitle";
import { writing } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

export default function WritingPage() {
  return (
    <section className="px-5 md:px-16 lg:px-20 pt-16 md:pt-28">
      <PageTitle>Writing</PageTitle>
      <ul className="mt-16 md:mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-20">
        {writing.map((w, i) => (
          <motion.li
            key={w.link}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
          >
            <a href={w.link} target="_blank" rel="noopener noreferrer" className="group block">
              {/* cover image, gently zooms on hover */}
              <div className="aspect-[3/2] overflow-hidden bg-[#1a1a1a]">
                <img
                  src={w.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-5 font-mono text-xs md:text-sm uppercase tracking-wider text-neutral-500">
                {w.where} · {w.when}{w.read && ` · ${w.read}`}
              </p>
              <h2 className="mt-3 flex items-start gap-2 text-xl md:text-2xl tracking-[-0.015em] leading-snug text-white">
                <span>{w.title}</span>
                <ArrowUpRight className="mt-1 w-5 h-5 shrink-0 text-neutral-600 group-hover:text-white transition-colors" />
              </h2>
              {w.description && (
                <p className="mt-3 text-base md:text-lg font-light leading-[1.6] text-neutral-400">{w.description}</p>
              )}
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
