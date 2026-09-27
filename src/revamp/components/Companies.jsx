// "Companies I've worked with" row, Blake Crosley style.
// h: per-logo height so wide wordmarks and stacked marks carry similar visual weight.
// mono: true turns a single-color logo white so it reads on black.
// Hovering one logo blurs and dims the rest.
import joydropLogo from "../../assets/joydrop.svg";
import bmeLogo from "../../assets/bme.png";
import toyotaLogo from "../../assets/toyota-logo.png";
import becoLogo from "../../assets/beco-ventures.png";
import pgLogo from "../../assets/pg-logo.png";
import krogerLogo from "../../assets/kroger-logo.png";

const companies = [
  { name: "Joydrop", logo: joydropLogo, h: "h-10 md:h-12" },
  { name: "Toyota", logo: toyotaLogo, h: "h-6 md:h-7" },
  { name: "P&G", logo: pgLogo, h: "h-12 md:h-14" },
  { name: "Kroger", logo: krogerLogo, h: "h-9 md:h-11" },
  { name: "BECO Ventures", logo: becoLogo, h: "h-9 md:h-10" },
  { name: "Bright Mind", logo: bmeLogo, h: "h-10 md:h-12" },
];

export default function Companies() {
  return (
    <div className="pt-20 md:pt-28">
      <p className="text-center text-base md:text-lg text-neutral-400">Companies I've worked with</p>
      {/* named group so hovering the row dims + blurs every logo except the hovered one */}
      <ul className="group/logos mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-12 md:gap-x-16 gap-y-8">
        {companies.map((c) => (
          <li
            key={c.name}
            className="transition-all duration-300 ease-out
                       group-hover/logos:opacity-30 group-hover/logos:blur-[0.75px]
                       hover:!opacity-100 hover:!blur-none hover:scale-110"
          >
            <img
              src={c.logo}
              alt={c.name}
              loading="lazy"
              className={`${c.h} w-auto ${c.mono ? "brightness-0 invert" : ""}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
