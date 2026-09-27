import { useEffect, useState } from "react";

// Tiny hash router: "#/work/utter" -> { page: "work", slug: "utter" }, "#/about" -> { page: "about" }
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

const onHome = () => parse().page === "";

// Scroll to a section on the home page, hopping home first from any other page
export const goToSection = (id) => {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  if (onHome()) return scroll();
  window.location.hash = "#/";
  setTimeout(scroll, 120); // let the home page render first
};

// Home: scroll to top if already there, otherwise navigate home
export const goHome = (e) => {
  e?.preventDefault();
  if (onHome()) window.scrollTo({ top: 0, behavior: "smooth" });
  else window.location.hash = "#/";
};
