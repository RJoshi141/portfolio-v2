// Resume: inked-in title, a download link, then the PDF itself (an image of it on phones,
// since mobile browsers only draw the first page of an embedded PDF)
import { useRef } from "react";
import { Roll, usePageMotion } from "../shared";
import { Footer } from "../NextApp";

const PDF = `${import.meta.env.BASE_URL}Resume.pdf`;

export default function Resume() {
  const root = useRef(null);
  usePageMotion(root);
  return (
    <main ref={root} className="px-5 md:px-10 pt-36 md:pt-44">
      <div className="grid md:grid-cols-12 gap-8 items-end">
        <h1 data-split="morph" data-now className="md:col-span-9 text-[22vw] md:text-[15vw] leading-[0.8] tracking-[-0.065em]">Resume</h1>
        <div data-fade data-now data-delay="0.6" className="md:col-span-3 md:text-right space-y-3 pb-2">
          <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)]">(PDF, one page)</p>
          <a href={PDF} download="Ritika-Joshi-Resume.pdf" data-cursor="Save" className="inline-block text-lg md:text-xl border-b border-[var(--fg)] pb-0.5">
            <Roll>Download</Roll>
          </a>
        </div>
      </div>

      <div data-fade className="mt-16 md:mt-24 pt-6 border-t border-[var(--line)]">
        <a href={PDF} download="Ritika-Joshi-Resume.pdf" className="md:hidden block">
          <img src={`${import.meta.env.BASE_URL}resume-preview-v2.png`} alt="Ritika Joshi's resume" className="w-full h-auto border border-[var(--line)]" />
        </a>
        <object data={`${PDF}#view=FitH&toolbar=0`} type="application/pdf" className="hidden md:block mx-auto w-full max-w-[60rem] aspect-[8.5/11] border border-[var(--line)] bg-white">
          <p className="p-10 text-[var(--muted)]">
            Your browser can't preview PDFs here. <a href={PDF} download="Ritika-Joshi-Resume.pdf" className="underline">Download it instead</a>.
          </p>
        </object>
      </div>
      <Footer />
    </main>
  );
}
