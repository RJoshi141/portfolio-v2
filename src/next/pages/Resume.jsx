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
    <main ref={root} className="px-5 md:px-10 pt-28 md:pt-[calc(30vh-2.4rem)]">
      {/* no big title: just the download link, then the PDF, level with the menu */}
      <h1 className="sr-only">Resume</h1>
      <div className="flex justify-end max-w-[60rem] mx-auto">
        <a href={PDF} download="Ritika-Joshi-Resume.pdf" data-cursor="Save" className="text-[0.95rem] text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
          <Roll>Download PDF</Roll>
        </a>
      </div>

      <div className="mt-4">
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
