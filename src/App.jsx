import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import FooterSocial from "./components/FooterSocial";

function App() {
  return (
    <div
      className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-500"
    >
      <Navbar />

      <main className="pt-24 max-w-6xl mx-auto px-6">
        <Home />
        <About />
        <Experience />
        <Projects />
        <Resume />
      </main>

      {/* Fixed footer always visible */}
      <FooterSocial />
    </div>
  );
}

export default App;
