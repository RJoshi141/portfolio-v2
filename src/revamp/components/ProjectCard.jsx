import { motion } from "framer-motion";

// size "lg" = featured rail card, "md" = grid card
export default function ProjectCard({ project, size = "md", index = 0 }) {
  const lg = size === "lg";
  return (
    <motion.a
      href={`#/work/${project.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className={`group block ${lg ? "snap-start shrink-0 w-[85vw] md:w-[68vw] lg:w-[62vw]" : ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl md:rounded-3xl flex items-center justify-center
                    ${lg ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]"}`}
        style={{ backgroundColor: project.tint }}
      >
        <img
          src={project.frame}
          alt={`${project.name} preview`}
          loading="lazy"
          className={`object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]
                      ${lg ? "w-[78%] h-[78%]" : "w-[80%] h-[80%]"}`}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className={`${lg ? "text-lg md:text-xl" : "text-base md:text-lg"} text-white`}>{project.name}</h3>
        <p className={`${lg ? "text-lg md:text-xl" : "text-base md:text-lg"} text-neutral-500`}>{project.tagline}</p>
      </div>
      <p className="mt-1 text-sm text-neutral-600">{project.tags.join(" · ")}</p>
    </motion.a>
  );
}
