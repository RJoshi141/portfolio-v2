// The main site, served at /portfolio-v2/ (the previous site lives at /portfolio-v2/classic/)
// Work-first redesign. Everything it needs lives in src/revamp/ so the live site is untouched.
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CaseStudy from "./pages/CaseStudy";
import AboutPage from "./pages/AboutPage";
import WorkPage from "./pages/WorkPage";
import WritingPage from "./pages/WritingPage";
import ResumePage from "./pages/ResumePage";

const PAGES = { about: AboutPage, work: WorkPage, writing: WritingPage, resume: ResumePage };
const TITLES = { about: "About", work: "Work", writing: "Writing", resume: "Resume" };
import useHashRoute from "./useHashRoute";
import { findProject } from "./data/projects";

function RevampApp() {
  const { page, slug } = useHashRoute();
  const isCase = page === "work" && slug;
  const Page = PAGES[page]; // unknown routes fall back to home

  // dark-only for now; also keeps Tailwind dark: styles consistent
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const p = isCase && findProject(slug);
    const t = p ? p.name : TITLES[page];
    document.title = t ? `${t} · Ritika Joshi` : "Ritika Joshi";
  }, [isCase, slug, page]);

  return (
    <div className="revamp bg-black text-white min-h-screen antialiased">
      {/* Centered column: past 1360px wide (big screens, or zoomed out) the page stops stretching
          and the extra space goes to the black margins, so the content edges move closer together. */}
      <div className="mx-auto w-full max-w-[1360px]">
        <Nav page={page} />
        <main>
          {isCase ? <CaseStudy slug={slug} /> : Page ? <Page /> : <HomePage />}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default RevampApp;
