// Resume, after adasilv2.framer.website/resume: a label column on the left (Education, Experience,
// Toolbox), entries on the right. Each role is a logo tile, "Role @ Company", then dates | place,
// with a + that opens the details. Experience comes from the same data as About.
import { useRef, useState } from "react";
import { usePageMotion } from "../shared";
import { Footer } from "../NextApp";
import { experience } from "../../revamp/data/content";
import joydrop from "../../assets/joydrop.svg";
import bme from "../../assets/bme.png";
import toyota from "../../assets/toyota-icon.svg";
import beco from "../../assets/beco.png";
import pg from "../../assets/P&G.svg";
import kroger from "../../assets/kroger-icon.svg";
// photos from each job, shown as small thumbnails under the role
import pgDesk from "../../assets/resume/pg-desk.jpg";
import becoTeam from "../../assets/resume/beco-team.jpg";
import becoHike from "../../assets/resume/beco-hike.jpg";
import becoFood from "../../assets/resume/beco-food.jpg";
import tSign from "../../assets/resume/toyota-sign.jpg";
import tHat from "../../assets/resume/toyota-hardhat.jpg";
import tCoops from "../../assets/resume/toyota-coops.jpg";
import tRow from "../../assets/resume/toyota-row.jpg";
import jdArch from "../../assets/resume/joydrop-arch.jpg";
import jdBus from "../../assets/resume/joydrop-bus.jpg";
const PHOTOS = { Joydrop: [jdArch, jdBus], Toyota: [tSign, tHat, tCoops, tRow], "P&G": [pgDesk], "BECO Ventures": [becoTeam, becoHike, becoFood] };
import figma from "../../assets/tools/latest/figma.svg";
import typescript from "../../assets/tools/latest/typescript.svg";
import react from "../../assets/tools/latest/react.svg";
import nextjs from "../../assets/tools/latest/nextjs.svg";
import nestjs from "../../assets/tools/latest/nestjs.svg";
import firebase from "../../assets/tools/latest/firebase.svg";
import supabase from "../../assets/tools/latest/supabase.svg";
import postgresql from "../../assets/tools/latest/postgresql.svg";
import python from "../../assets/tools/latest/python.svg";
import fastapi from "../../assets/tools/latest/fastapi.svg";
import swift from "../../assets/tools/latest/swift.svg";
import expo from "../../assets/tools/latest/expo.svg";
import xcode from "../../assets/tools/color/xcode.png";

const PDF = `${import.meta.env.BASE_URL}Resume.pdf`;
const LOGO = { Joydrop: joydrop, "Bright Mind Enrichment": bme, Toyota: toyota, "BECO Ventures": beco, "P&G": pg, Kroger: kroger };
const TOOLS = [["Figma", figma], ["TypeScript", typescript], ["React", react], ["Next.js", nextjs], ["NestJS", nestjs], ["Expo", expo], ["Swift", swift], ["Xcode", xcode], ["Python", python], ["FastAPI", fastapi], ["PostgreSQL", postgresql], ["Supabase", supabase], ["Firebase", firebase]];

// one row of the page: the section name on the left, its content on the right
const Row = ({ label, children }) => (
  <section className="grid md:grid-cols-[9rem_minmax(0,1fr)] gap-x-10 gap-y-4 py-10 md:py-12 first:pt-0">
    <p className="text-[var(--muted)]">{label}</p>
    <div className="min-w-0">{children}</div>
  </section>
);

// a logo tile, square with soft corners like an app icon
const Tile = ({ src, alt }) => (
  <span className="w-9 h-9 shrink-0 rounded-[10px] bg-white overflow-hidden flex items-center justify-center">
    {src && <img src={src} alt={alt} className="w-[72%] h-[72%] object-contain" />}
  </span>
);

const Role = ({ e }) => {
  const [open, setOpen] = useState(false);
  const year = e.when.replace(" – ", " – ");
  return (
    <li className="group/role">
      <button type="button" onClick={() => setOpen(!open)} className="no-red w-full flex items-start gap-4 text-left">
        <span className={`shrink-0 transition-[transform,opacity] duration-300 ease-out ${open ? "-rotate-[8deg]" : "group-hover/role:opacity-70"}`}>{e.company === "Joydrop" ? <img src={joydrop} alt="Joydrop" className="w-9 h-9 shrink-0 rounded-[10px]" /> : <Tile src={LOGO[e.company]} alt={e.company} />}</span>
        <span className="flex-1 min-w-0">
          <span className="block"><span className="text-[#111]">{e.title}</span> <span className="text-[var(--muted)]">@</span> <span className="font-semibold text-[#111]">{e.company}</span></span>
          <span className="block text-[var(--muted)]">{year} <span className="mx-1 opacity-50">|</span> {e.where}</span>
        </span>
        {/* + turns into × when open */}
        <span aria-hidden className={`mt-0.5 text-[1.2rem] leading-none text-[var(--muted)] transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {/* details and photos both toggle the role when clicked */}
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
          <ul className="overflow-hidden pl-[3.25rem] space-y-1.5 text-[var(--muted)]">
            {e.bullets.map((b, i) => <li key={b} className={i === 0 ? "pt-3" : ""}>{b}</li>)}
          </ul>
        </div>
        {PHOTOS[e.company] && (
          <div className={`mt-3 pl-[3.25rem] pb-1 flex flex-wrap gap-2 transition-opacity duration-300 ${open ? "" : "group-hover/role:opacity-70"}`}>
            {PHOTOS[e.company].map((src) => <img key={src} src={src} alt="" loading="lazy" className="h-16 md:h-20 w-auto rounded-[8px] object-cover" />)}
          </div>
        )}
      </div>
    </li>
  );
};

export default function Resume() {
  const root = useRef(null);
  usePageMotion(root);
  return (
    <main ref={root} className="soft-ink px-5 md:px-10 pt-28 md:pt-[calc(30vh-0.15rem)]">
      <div className="max-w-[46rem] text-[0.85rem] md:text-[0.9rem] leading-[1.55]">
        <h1 className="sr-only">Resume</h1>

        <Row label="Resume">
          <p className="text-[var(--muted)]">Software engineer in San Francisco.</p>
          <a href={PDF} download="Ritika-Joshi-Resume.pdf" data-cursor="Save" className="inline-block mt-1 underline decoration-[var(--line)] underline-offset-4 hover:decoration-current">Download the PDF</a>
        </Row>

        <Row label="Education">
          <p><span className="font-medium">B.S. in Computer Science</span> <span className="mx-1 opacity-50">|</span> <span className="text-[var(--muted)]">May 2024</span></p>
          <p className="text-[var(--muted)]">University of Cincinnati</p>
        </Row>

        <Row label="Experience">
          <ol className="space-y-6">{experience.map((e) => <Role key={e.company} e={e} />)}</ol>
        </Row>

        <Row label="Toolbox">
          <ul className="flex flex-wrap gap-2.5">
            {TOOLS.map(([name, src]) => (
              <li key={name} title={name}>
                <span className="w-9 h-9 rounded-[10px] bg-white flex items-center justify-center">
                  <img src={src} alt={name} className={`w-[60%] h-[60%] object-contain ${["Next.js"].includes(name) ? "" : ""}`} />
                </span>
              </li>
            ))}
          </ul>
        </Row>
      </div>
      <Footer />
    </main>
  );
}
