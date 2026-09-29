import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
        {project.cardDemo?.kind === "landscape" ? (
          // landscape iPhone with the gameplay loop (same screen box as the Zoomies case study)
          <div className="relative w-[70%] aspect-[895/438]">
            <video
              autoPlay muted loop playsInline poster={project.cardDemo.poster}
              className="absolute object-cover bg-black rounded-[7%/15%]"
              style={{ left: "2.46%", top: "5.48%", width: "94.97%", height: "89.27%" }}
            >
              <source src={project.cardDemo.mp4} type="video/mp4" />
            </video>
            <img src={project.cardDemo.frame} alt="" className="absolute inset-0 w-full h-full" />
          </div>
        ) : project.cardDemo?.kind === "watch" ? (
          // band-less Watch Ultra case with the recording inset from the bezel (measured off watch-ultra-case.png)
          <div className="relative h-[58%] aspect-[1347/1496]">
            <img src={project.cardDemo.frame} alt="" className="absolute inset-0 w-full h-full" />
            <div
              className="absolute overflow-hidden bg-black rounded-[14%/11.5%]"
              style={{ left: "9.5%", top: "9.1%", width: "75.3%", height: "81.6%" }}
            >
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                {project.cardDemo.webm && <source src={project.cardDemo.webm} type="video/webm" />}
                <source src={project.cardDemo.mp4} type="video/mp4" />
              </video>
            </div>
          </div>
        ) : project.cardDemo ? (
          // laptop frame with a looping recording in its display; screen box measured off macbook-frame.png
          <div className={`relative aspect-[1400/846] ${lg ? "w-[80%]" : "w-[84%]"}`}>
            <video
              autoPlay muted loop playsInline
              poster={project.cardDemo.poster}
              className="absolute object-cover bg-black"
              style={{ left: "10.8%", top: "2.8%", width: "78.5%", height: "84.4%" }}
            >
              <source src={project.cardDemo.mp4} type="video/mp4" />
            </video>
            <img src={project.cardDemo.frame} alt="" className="absolute inset-0 w-full h-full" />
          </div>
        ) : (
        <img
          src={project.frame}
          alt={`${project.name} preview`}
          loading="lazy"
          // rail cards stay still on hover (the arrow is the cue); grid cards keep the gentle zoom
          className={`object-contain ${lg ? "w-[78%] h-[78%]" : "w-[80%] h-[80%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"}`}
        />
        )}
        {/* Gabriel-style round arrow that fades in bottom-right on hover */}
        {lg && (
          <span className="absolute right-5 bottom-5 md:right-8 md:bottom-8 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className={`${lg ? "text-lg md:text-xl" : "text-base md:text-lg"} text-white`}>{project.name}</h3>
        <p className={`${lg ? "text-lg md:text-xl" : "text-base md:text-lg"} text-neutral-500`}>{project.tagline}</p>
      </div>
      <p className="mt-1 text-sm text-neutral-600">{project.tags.join(" · ")}</p>
    </motion.a>
  );
}
