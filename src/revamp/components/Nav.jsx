import { goToSection } from "../useHashRoute";

const links = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Writing", id: "writing" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-5 md:px-12 h-16 md:h-20">
        <a href="#/" className="text-base md:text-lg text-neutral-300 hover:text-white transition-colors">
          Ritika Joshi
        </a>
        <div className="flex items-center gap-5 md:gap-8 text-sm md:text-base text-neutral-400">
          {links.map((l) => (
            <button key={l.id} onClick={() => goToSection(l.id)} className="hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
