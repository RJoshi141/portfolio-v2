// Site footer (Blake Crosley style): photo, name and one-liner on the left, link columns on the right,
// then a thin rule with copyright and location underneath.
import { goToSection } from "../useHashRoute";
import { projects } from "../data/projects";
import { socials } from "../data/content";
import avatar from "../../assets/footer-avatar.jpg";

const EMAIL = "ritikajoshi141@gmail.com";

const navigate = [
  { label: "About", href: "#/about" },
  { label: "Work", href: "#/work" },
  { label: "Writing", href: "#/writing" },
  { label: "Resume", href: "#/resume" },
  { label: "Contact", section: "contact" },
];

// first four case studies, in the same order as the Work page
const featuredProjects = projects.filter((p) => !p.hidden).slice(0, 4);

const connect = [
  { label: EMAIL, short: "Email", href: `mailto:${EMAIL}` },
  ...socials.filter((s) => s.label !== "Email").map((s) => ({ ...s, external: true })),
];

const linkCls = "text-base md:text-[17px] text-neutral-400 hover:text-white transition-colors";

const Column = ({ title, children }) => (
  <div>
    <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500">{title}</p>
    <ul className="mt-5 md:mt-6 space-y-2.5">{children}</ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="px-5 md:px-16 lg:px-20 mt-32 md:mt-40 pt-16 md:pt-20 pb-10">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-10">
        {/* who */}
        <div>
          <img src={avatar} alt="Ritika Joshi" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
          <p className="mt-6 text-2xl md:text-[1.75rem] font-medium tracking-[-0.02em] text-white">Ritika Joshi</p>
          <p className="mt-3 text-base md:text-lg text-neutral-400">Engineer with a designer's eye.</p>
        </div>

        {/* link columns sit side by side on phones too */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:contents">
          <Column title="Navigate">
            {navigate.map((l) => (
              <li key={l.label}>
                {l.section ? (
                  <button type="button" onClick={() => goToSection(l.section)} className={linkCls}>{l.label}</button>
                ) : (
                  <a href={l.href} className={linkCls}>{l.label}</a>
                )}
              </li>
            ))}
          </Column>

          <Column title="Projects">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <a href={`#/work/${p.slug}`} className={linkCls}>{p.name}</a>
              </li>
            ))}
            <li>
              <a href="#/work" className={linkCls}>All work →</a>
            </li>
          </Column>

          <Column title="Connect">
            {connect.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={linkCls}
                >
                  {/* full address on wider screens; just "Email" on phones so it doesn't wrap mid-word */}
                  {l.short ? (
                    <>
                      <span className="sm:hidden">{l.short}</span>
                      <span className="hidden sm:inline">{l.label}</span>
                    </>
                  ) : (
                    l.label
                  )}
                </a>
              </li>
            ))}
          </Column>
        </div>
      </div>

      <div className="mt-16 md:mt-20 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row sm:justify-between gap-3 text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Ritika Joshi. All rights reserved.</p>
        <p>San Francisco, California</p>
      </div>
    </footer>
  );
}
