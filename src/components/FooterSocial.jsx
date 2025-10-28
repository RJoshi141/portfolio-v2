import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/footerSocial.css";

export default function FooterSocial() {
  return (
    <footer
      className="footer-social bg-white dark:bg-black text-black dark:text-white 
                 border-t border-gray-200 dark:border-gray-800 fixed bottom-0 left-0 w-full z-50 
                 transition-colors duration-500"
    >
      <div className="footer-content flex flex-col sm:flex-row justify-center items-center gap-3 py-4">
        {/* Hide text on mobile for consistency */}
        <span className="connect-text hidden sm:inline text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">
          Let’s Connect
        </span>

        <div className="icons flex items-center gap-6 text-xl">
          <a
            href="https://www.linkedin.com/in/ritika-joshi-9395591a7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/RJoshi141"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
          >
            <FaGithub />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ritikajoshi141@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
