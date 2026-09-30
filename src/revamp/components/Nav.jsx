// Name scrolls away with the page; the links sit in a fixed capsule that collapses
// into a round menu button on scroll and opens a panel of every page (Gabriel Valdivia style).
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { goHome, goToSection } from "../useHashRoute";

// `page` marks real pages; the one you're on is highlighted white.
const links = [
  { label: "Work", href: "#/work", page: "work" },
  { label: "About", href: "#/about", page: "about" },
  { label: "Writing", href: "#/writing", page: "writing" },
  { label: "Resume", href: "#/resume", page: "resume" },
  { label: "Contact", section: "contact" },
];
const cls = "hover:text-white transition-colors";

// Renders one nav item as the right element (hash link, section scroll, or home)
const Item = ({ l, className, onPick }) => {
  const pick = (fn) => (e) => { fn?.(e); onPick?.(); };
  if (l.home) return <a href="#/" onClick={pick(goHome)} className={className}>Home</a>;
  if (l.href) return <a href={l.href} onClick={pick()} className={className}>{l.label}</a>;
  return <button onClick={pick(() => goToSection(l.section))} className={className}>{l.label}</button>;
};

// Apple-style clear glass: barely-there fill, lighter blur + saturation, soft shadow, no border.
// Text gets a faint shadow so it stays readable over busy images.
const GLASS =
  "bg-white/[0.06] backdrop-blur-lg backdrop-saturate-[1.8] shadow-[0_12px_40px_rgba(0,0,0,0.35)]";

// md breakpoint check so the row never collides with the name on phones
const useIsDesktop = () => {
  const q = "(min-width: 768px)";
  const [ok, setOk] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setOk(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return ok;
};

// Fixed top-right. At the top (desktop) it's the plain nav row; on scroll the links
// slide right and fade into a glass menu button. Phones always get the button.
function NavCapsule({ page, items }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const collapsed = scrolled || !isDesktop;
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // back at the top on desktop: close the panel as the row returns
  useEffect(() => {
    if (!collapsed) setOpen(false);
  }, [collapsed]);

  // close panel on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = links.find((l) => l.page === page)?.label || "Home";
  const menu = [{ label: "Home", home: true }, ...links];

  return (
    <div ref={ref} className="fixed top-2 right-3 md:top-6 md:right-[max(2.5rem,calc((100vw_-_1360px)/2_+_2.5rem))] z-50 flex flex-col items-end">
      {/* row and button share one 48px slot; the button is pinned to the right edge */}
      <div className="relative h-12 flex items-center justify-end">
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="links"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                // rightmost item leaves first, like they're being pulled into the button
                show: { transition: { staggerChildren: 0.04 } },
                hidden: { transition: { staggerChildren: 0.035, staggerDirection: -1 } },
              }}
              className="flex items-center gap-8 pr-2 text-lg text-neutral-400 whitespace-nowrap"
            >
              {items.map((l) => (
                <motion.span
                  key={l.label}
                  variants={{
                    hidden: { opacity: 0, x: 48, scale: 0.85, filter: "blur(6px)" },
                    show: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Item l={l} className={(l.home ? !page : l.page === page) ? "text-white" : cls} />
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {collapsed && (
            <motion.button
              key="toggle"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ type: "spring", stiffness: 420, damping: 28, delay: isDesktop ? 0.12 : 0 }}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`absolute right-0 top-0 w-12 h-12 rounded-full ${GLASS} hover:bg-white/[0.1] transition-colors`}
            >
              {/* two bars that rotate into an X */}
              <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-white transition-transform duration-300
                                ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 bg-white transition-transform duration-300
                                ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && collapsed && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, scale: 0.94, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className={`mt-3 min-w-[210px] rounded-[28px] py-3 origin-top-right [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] ${GLASS}`}
          >
            {menu.map((l) => {
              const active = (l.home ? "Home" : l.label) === current;
              return (
                <div key={l.label} className="relative">
                  {active && <span className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />}
                  <Item
                    l={l}
                    onPick={() => setOpen(false)}
                    className={`block w-full text-left pl-9 pr-8 py-2 text-lg transition-colors
                                ${active ? "text-white" : "text-white/55 hover:text-white"}`}
                  />
                </div>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Nav({ page }) {
  // every link always shows, Home included
  const items = [{ label: "Home", home: true }, ...links];

  return (
    <>
      {/* only the name lives in the flow, so it scrolls away with the page */}
      <header className="relative z-40">
        <div className="flex items-center px-5 md:px-16 lg:px-20 h-16 md:h-24">
          <a href="#/" onClick={goHome} className="text-base md:text-2xl text-neutral-300 hover:text-white transition-colors">
            Ritika Joshi
          </a>
        </div>
      </header>
      <NavCapsule page={page} items={items} />
    </>
  );
}
