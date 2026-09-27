import { useEffect, useState } from "react";

// Tiny hash router: "#/work/utter" -> { page: "work", slug: "utter" }
// Hash routes survive refreshes on GitHub Pages with no 404 hacks.
const parse = () => {
  const [, page = "", slug = ""] = window.location.hash.replace(/^#/, "").split("/");
  return { page, slug };
};

export default function useHashRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

// Scroll to a section on the home page, hopping home first if we're on a case study
export const goToSection = (id) => {
  if (window.location.hash.startsWith("#/work")) {
    window.location.hash = "#/";
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};
