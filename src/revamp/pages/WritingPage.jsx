// #/writing: articles and talks
import PageTitle from "../components/PageTitle";
import { writing } from "../data/content";

export default function WritingPage() {
  return (
    <section className="px-5 md:px-12 pt-16 md:pt-28">
      <PageTitle>Writing</PageTitle>
      <div className="mt-16 md:mt-24">
        <ul>
          {writing.map((w) => (
            <li key={w.link}>
              <a
                href={w.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-8 py-5 border-t border-neutral-900"
              >
                <span className="text-lg md:text-2xl tracking-tight text-white group-hover:text-neutral-400 transition-colors">
                  {w.title}
                </span>
                <span className="text-sm text-neutral-500 shrink-0">
                  {w.where} · {w.when}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
