import { socials } from "../data/content";

export default function Footer() {
  return (
    <footer className="px-5 md:px-12 pt-24 pb-10 mt-24 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Ritika Joshi</p>
      <div className="flex gap-6 text-sm text-neutral-400">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
