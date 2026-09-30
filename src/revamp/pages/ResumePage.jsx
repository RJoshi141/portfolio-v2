// #/resume: PDF shown in-page with a download button (no new tab)
import { Download } from "lucide-react";
import PageTitle from "../components/PageTitle";

const PDF = `${import.meta.env.BASE_URL}Resume.pdf`;

export default function ResumePage() {
  return (
    <section className="px-5 md:px-16 lg:px-20 pt-16 md:pt-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <PageTitle>Resume</PageTitle>
        {/* `download` saves the file instead of opening it */}
        <a
          href={PDF}
          download="Ritika-Joshi-Resume.pdf"
          className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-700
                     text-base md:text-lg text-white hover:bg-white hover:text-black transition-colors"
        >
          <Download className="w-5 h-5" /> Download PDF
        </a>
      </div>

      {/* Phones: a crisp image of the page, sized to fit exactly (mobile browsers only draw the
          first PDF page inside a fixed box, leaving empty grey below it).
          resume-preview.png is rendered from Resume.pdf; regenerate it when the resume changes. */}
      <a href={PDF} download="Ritika-Joshi-Resume.pdf" className="md:hidden block mt-10">
        <img
          src={`${import.meta.env.BASE_URL}resume-preview.png`}
          alt="Ritika Joshi's resume"
          className="w-full h-auto rounded-xl bg-white"
        />
      </a>

      {/* Desktop: the live PDF, one letter-size page tall, with the fallback link if embedding fails */}
      <object
        data={`${PDF}#view=FitH&toolbar=0`}
        type="application/pdf"
        className="hidden md:block mt-16 w-full aspect-[8.5/11] max-h-[140vh] rounded-3xl bg-neutral-900"
      >
        <div className="mt-12 rounded-2xl bg-neutral-900 p-10 text-neutral-400">
          Your browser can't preview PDFs here.{" "}
          <a href={PDF} download="Ritika-Joshi-Resume.pdf" className="text-white underline underline-offset-4">
            Download it instead
          </a>
          .
        </div>
      </object>
    </section>
  );
}
