import { Github, Linkedin, Mail, Codepen } from "lucide-react";


export default function FooterSocial() {
  return (
    <footer
      className="footer-social bg-white dark:bg-black text-black dark:text-white 
                 border-t border-gray-200 dark:border-card-dark fixed bottom-0 left-0 w-full z-50 
                 transition-colors duration-500"
    >
      <div className="footer-content flex flex-col sm:flex-row justify-center items-center gap-5 py-4">
        {/* Hide text on mobile for consistency */}
        <span className="connect-text hidden sm:inline text-teal-600 dark:text-cyan-400 font-medium transition-colors duration-300">
          Let’s Connect!
        </span>

        <div className="icons flex items-center gap-5">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ritika-joshi-9395591a7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/RJoshi141"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />

          </a>

          {/* Email */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ritikajoshi141@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          
          {/* CodePen */}
          <a
            href="https://codepen.io/Ritika-Joshi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:text-teal-600 dark:hover:text-cyan-400 
                       transition-transform duration-300 hover:scale-110"
            aria-label="Codepen"
          >
            <Codepen className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
