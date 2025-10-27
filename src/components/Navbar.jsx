export default function Navbar() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-950/80 backdrop-blur-md text-white z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold text-teal-400 cursor-pointer"
        >
          Ritika Joshi
        </h1>

        <ul className="hidden md:flex space-x-8 text-sm uppercase tracking-wide">
          <li>
            <button onClick={() => scrollToSection("home")} className="hover:text-teal-400 transition">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("about")} className="hover:text-teal-400 transition">
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("projects")} className="hover:text-teal-400 transition">
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("contact")} className="hover:text-teal-400 transition">
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
