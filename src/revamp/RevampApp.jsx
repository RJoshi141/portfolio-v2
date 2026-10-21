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
      {/* Header and footer span the full window, pinned to its edges at any zoom level.
          Page content is capped in rem and centered, so when you zoom out the images,
          cards and frames shrink along with the text instead of stretching to fill the wider window. */}
      <div className="w-full">
        <Nav page={page} />
        <main className="mx-auto max-w-[104rem]">
          {isCase ? <CaseStudy slug={slug} /> : Page ? <Page /> : <HomePage />}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default RevampApp;
