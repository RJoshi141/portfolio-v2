// Resume: written out in the same quiet column as About (after rachelchen.tech), with the PDF a
// click away. Experience comes from the same data as the About page.
import { useRef } from "react";
import { usePageMotion } from "../shared";
import { Footer } from "../NextApp";
import { experience } from "../../revamp/data/content";

const PDF = `${import.meta.env.BASE_URL}Resume.pdf`;
const SKILLS = [
  ["Languages", "TypeScript, JavaScript, Swift, Python, SQL"],
  ["Frontend", "React, Next.js, React Native, Expo, SwiftUI"],
  ["Backend", "Node.js, NestJS, FastAPI, Flask, PostgreSQL, Firebase, Supabase"],
  ["AI", "RAG workflows, LLM features in production, on-device models"],
  ["Design", "Figma, After Effects, Photoshop, Illustrator"],
];
const label = "text-[0.8rem] text-[var(--muted)]";

export default function Resume() {
  const root = useRef(null);
  usePageMotion(root);
  return (
    <main ref={root} className="soft-ink px-5 md:px-10 pt-28 md:pt-[calc(30vh-0.15rem)]">
      <div className="max-w-[34rem] text-[0.85rem] md:text-[0.9rem] leading-[1.55]">
        <h1 className="sr-only">Resume</h1>
        <p className="text-[var(--muted)]">
          Software engineer in San Francisco. <a href={PDF} download="Ritika-Joshi-Resume.pdf" data-cursor="Save" className="text-[var(--fg)] underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--fg)]">Download the PDF</a>
        </p>

        <section className="mt-14">
          <p className={label}>Experience</p>
          <ol className="mt-5 space-y-9">
            {experience.map((e) => (
              <li key={e.company} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4">
                <span className="text-[var(--muted)]">{e.when.replace(" – ", "–")}</span>
                <div className="min-w-0">
                  <a href={e.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">{e.company}</a>
                  <p className="text-[var(--muted)]">{e.title} · {e.where}</p>
                  <ul className="mt-2.5 space-y-1.5 text-[var(--muted)]">
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <p className={label}>Education</p>
          <div className="mt-5 grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4">
            <span className="text-[var(--muted)]">2024</span>
            <div>
              <p>University of Cincinnati</p>
              <p className="text-[var(--muted)]">B.S. Computer Science</p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <p className={label}>Skills</p>
          <ul className="mt-5 space-y-2">
            {SKILLS.map(([k, v]) => (
              <li key={k} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4">
                <span className="text-[var(--muted)]">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </main>
  );
}
