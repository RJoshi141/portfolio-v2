import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFloat from "../components/ScrollFloat";
import joydropLogo from "../assets/joydrop.svg";
import bmeLogo from "../assets/bme.png";
import toyotaLogo from "../assets/toyota-icon.svg";
import becoLogo from "../assets/beco.png";
import pgLogo from "../assets/P&G.svg";
import krogerLogo from "../assets/kroger-icon.svg";

export default function Experience() {
  const experiences = [
    {
      key: "Joydrop",
      company: "JOYDROP",
      location: "San Francisco, CA",
      title: "Full Stack App Developer",
      duration: "Sep ’25 – Present",
      bullets: [
        "Built and scaled a full-stack platform using Next.js, Nest.js, and Firebase to power real-time recognition and reward interactions.",
        "Optimized frontend and backend performance, improving responsiveness by ~30% and enhancing reliability across user sessions.",
        "Partnered with the lead engineer to design scalable architecture supporting fast, joyful social interactions at scale.",
        "Integrated AI-powered text generation features using LLMs to personalize and enhance user engagement across the app.",
        "Contributed to UI/UX improvements that elevate accessibility, interactivity, and user retention through thoughtful design and iteration.",
      ],
      logo: { src: joydropLogo, alt: "Joydrop logo", shape: "circle" },
      link: "https://www.joydrop.me/",
    },
    {
      key: "BMEAS",
      company: "Bright Mind Enrichment",
      location: "San Francisco, CA",
      title: "UI/UX Web Developer",
      duration: "Sep ’24 – Jul ’25",
      bullets: [
        "Developed and maintained donation pages, improving usability and secure payment flows, boosting conversions by 20%.",
        "Optimized site responsiveness and load times by 30% by implementing optimized React components and REST API integrations.",
        "Accelerated backend performance, cutting API response times by 35% and lowering bounce rates by 20% with streamlined logic.",
        "Delivered high-performance, accessible features end-to-end, boosting site traffic and engagement by 25%.",
      ],
      logo: { src: bmeLogo, alt: "Bright Mind Enrichment & Schooling logo" },
      link: "https://brightmindenrichment.org/",
    },
    {
      key: "Toyota",
      company: "TOYOTA",
      location: "Georgetown, KY",
      title: "Full Stack Developer – Production Control",
      duration: "May ’23 – Aug ’23",
      bullets: [
        "Reduced manual errors by 20% by designing and deploying SQL pipelines for Supplier Change Requests.",
        "Improved process scalability and collaboration by 30% by automating workflows with MS Azure and Kaizen methods.",
        "Cut manual reporting efforts by 40% by building real-time analytics dashboards with Power BI and integrating CI/CD pipelines.",
        "Improved data retrieval efficiency by 42% by automating supplier change request data infrastructure across 5+ teams.",
      ],
      logo: { src: toyotaLogo, alt: "Toyota logo" },
      link: "https://pressroom.toyota.com/facility/toyota-motor-manufacturing-kentucky/",
    },
    {
      key: "BECO",
      company: "BECO Ventures",
      location: "Singapore",
      title: "UI Process Engineer",
      duration: "Sep ’22 – Dec ’22",
      bullets: [
        "Enabled real-time monitoring of 10K+ greenhouse sensor readings by developing a cloud-based data processing pipeline.",
        "Increased user efficiency by 40% by building interactive dashboards with React, Python, SQL, and MongoDB.",
        "Streamlined reporting, cutting generation time by 30% and improving accessibility by 55% through real-time processing systems.",
        "Improved product reliability and adoption by optimizing AWS infrastructure for 99.9% uptime and refining user flows.",
      ],
      logo: { src: becoLogo, alt: "BECO Ventures logo" },
      link: "https://beco-ventures.com/",
    },
    {
      key: "PnG",
      company: "P&G – UC Simulation Center",
      location: "Cincinnati, OH",
      title: "Data Analyst",
      duration: "Jan ’22 – Apr ’22",
      bullets: [
        "Designed automated analytics with Excel VBA + REST APIs, reducing processing time by 40% for global warehouse operations.",
        "Produced Power BI dashboards that improved decision-making speed by 25% across 3+ time zones.",
        "Validated data accuracy and improved reliability by integrating PyTest and automated testing pipelines.",
        "Facilitated multi-time-zone collaboration by designing a shared analytics system enabling consistent data entry worldwide.",
      ],
      logo: { src: pgLogo, alt: "P&G logo" },
      link: "https://us.pg.com/",
    },
    {
      key: "Kroger",
      company: "KROGER – Virtual Innovation Studio",
      location: "Cincinnati, OH",
      title: "CS Intern",
      duration: "Jan ’20 – Apr ’20",
      bullets: [
        "Increased customer engagement by 15% and retention by 10% by enhancing Kroger Plus iOS app features based on usage data.",
        "Boosted user interaction by 20% by analyzing customer behavior and delivering personalized promotions.",
        "Improved accessibility for 500K+ users by designing and implementing new navigation features.",
        "Incorporated customer feedback into iterative UI/UX updates, raising App Store ratings by 12%.",
      ],
      logo: { src: krogerLogo, alt: "Kroger logo" },
      link: "https://www.kroger.com/",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);
  return (
    <motion.section
      id="experience"
      className="scroll-mt-24 min-h-screen bg-white dark:bg-black text-black dark:text-white 
                 px-6 md:px-12 py-20 max-w-6xl mx-auto transition-colors duration-500"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr),minmax(0,1.25fr)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-5 text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-teal-600 dark:text-cyan-400">
            Work History
          </p>
          <ScrollFloat
            containerClassName="text-left"
            textClassName="text-4xl font-bold uppercase text-gray-900 dark:text-white"
          >
            Experience
          </ScrollFloat>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I’ve partnered with global teams to ship high-impact products, redesign systems, and
            bring thoughtful engineering to top-tier brands.
          </p>
        </motion.div>

        <div className="divide-y divide-gray-200 dark:divide-card-dark">
          {visibleExperiences.map((role, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.article
                key={role.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
                className="py-6"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center overflow-hidden">
                      <img
                        src={role.logo.src}
                        alt={role.logo.alt}
                        loading="lazy"
                        className={`object-contain ${
                          role.logo.shape === "circle"
                            ? "w-10 h-10 rounded-full object-cover"
                            : role.key === "BMEAS"
                              ? "w-10 h-10"
                              : "w-9 h-9"
                        }`}
                      />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-gray-900 dark:text-white">{role.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <a
                          href={role.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-gray-800 dark:text-gray-200 font-semibold border-b border-transparent hover:border-gray-800 dark:hover:border-white transition-colors duration-200"
                        >
                          {role.company}
                        </a>
                        <span className="px-2 text-gray-400 dark:text-gray-500">|</span>
                        {role.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {role.duration}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="mt-4 overflow-hidden text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      <ul className="list-disc pl-5 space-y-2">
                        {role.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
          {experiences.length > 3 && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-sm font-medium text-teal-600 dark:text-cyan-400 hover:underline flex items-center gap-2 transition-colors duration-200"
              >
                {showAll ? "Show less roles ↑" : "Show more roles ↓"}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
