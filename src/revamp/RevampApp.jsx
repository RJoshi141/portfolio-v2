// Revamp sandbox, served at /portfolio-v2/revamp/
// Work-first redesign. Everything it needs lives in src/revamp/ so the live site is untouched.
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CaseStudy from "./pages/CaseStudy";
import useHashRoute from "./useHashRoute";
import { findProject } from "./data/projects";

function RevampApp() {
  const { page, slug } = useHashRoute();
  const isCase = page === "work" && slug;

  // dark-only for now; also keeps Tailwind dark: styles consistent
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const p = isCase && findProject(slug);
    document.title = p ? `${p.name} · Ritika Joshi` : "Ritika Joshi";
  }, [isCase, slug]);

  return (
    <div className="revamp bg-black text-white min-h-screen antialiased">
      <Nav />
      <main>{isCase ? <CaseStudy slug={slug} /> : <HomePage />}</main>
      <Footer />
    </div>
  );
}

export default RevampApp;
