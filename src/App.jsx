import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Articles from "./pages/Articles";
import Leadership from "./pages/Leadership";
import FooterSocial from "./components/FooterSocial";
import ChatbotWidget from "./components/ChatbotWidget";

function App() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-colors duration-500">
      <Navbar />

      <main className="pt-24">
        <Home />
        <Experience />
        <Projects />
        <Articles />
        <Leadership />
      </main>

      <FooterSocial />
      <ChatbotWidget />
    </div>
  );
}

export default App;