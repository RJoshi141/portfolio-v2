/**
 * Ritika's Knowledge Base
 * 
 * This file contains all the information the Portfolio Concierge knows about Ritika.
 * To update what the assistant can answer, add or edit entries here.
 * 
 * Each entry should have:
 * - id: unique identifier
 * - category: general|skills|experience|projects|interests|articles|leadership
 * - tags: array of keywords that might appear in questions
 * - questionPatterns: array of phrases that match this entry (include third-person variations)
 * - answer: either a string (for simple paragraphs) or an object with:
 *   - type: 'paragraph' | 'bulleted'
 *   - text: intro text or paragraph content
 *   - bullets: null or array of { title, description, links: [{ label, url }] }
 *   - followUpQuestions: array of questions about Ritika in third person
 * 
 * IMPORTANT: All followUpQuestions must be worded in third person about Ritika.
 * Use "What are Ritika's...", "How did Ritika...", "Which project did Ritika...", etc.
 * Do NOT use "do you", "can you", "will you" directed at the bot.
 */

export const ritikaKnowledgeBase = [
  // ─────────────────────────────────────────────
  // GENERAL
  // ─────────────────────────────────────────────
  {
    id: 'about',
    category: 'general',
    tags: ['about', 'intro', 'introduction', 'who are you', 'background', 'ritika', 'yourself'],
    questionPatterns: [
      'tell me about yourself',
      'who is ritika',
      'who are you',
      'about ritika',
      'introduce yourself',
      'what do you do',
      'ritika joshi',
      'who is ritika joshi',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika Joshi is a Full-Stack Developer & Tech-Creative based in San Francisco. She builds intuitive, scalable digital products that connect people and technology. Currently part of the team at Joydrop, crafting a real-time platform for recognition and rewards using Next.js, Nest.js, and Firebase. She's a recent Computer Science graduate from the University of Cincinnati (May 2024) and loves combining design and engineering to build experiences that feel joyful, accessible, and human.`,
      bullets: null,
      followUpQuestions: [
        "What are Ritika's key skills and areas of expertise?",
        'Where does Ritika currently work?',
        'What projects has Ritika built?',
        'What articles has Ritika written?',
      ],
    },
  },

  {
    id: 'contact',
    category: 'general',
    tags: ['contact', 'email', 'phone', 'phone number', 'reach out', 'get in touch', 'contact information', 'how to contact', 'ritika contact', 'ritika email', 'ritika phone'],
    questionPatterns: [
      'contact information',
      'contact info',
      'how to contact',
      'email address',
      'phone number',
      'ritika contact',
      'ritika email',
      'ritika phone',
      'how can i reach ritika',
      'ritika contact information',
      'get in touch with ritika',
      'ritika email address',
      'ritika phone number',
      'what is ritika email',
      'what is ritika phone',
    ],
    answer: {
      type: 'paragraph',
      text: `You can reach Ritika at:\n\nEmail: ritikajoshi141@gmail.com\nPhone: 5133060325`,
      bullets: null,
      followUpQuestions: [
        "What is Ritika's current role?",
        'What projects has Ritika built?',
        "What are Ritika's key skills?",
      ],
    },
  },

  {
    id: 'portfolio-site',
    category: 'projects',
    tags: ['portfolio', 'portfolio site', 'this site', 'this website', 'how was this built', 'how did ritika build this', 'website tech stack'],
    questionPatterns: [
      'how was this portfolio site built',
      'how was this site built',
      'how was this website built',
      'how did ritika build this portfolio',
      'how did ritika build this site',
      'what tech stack did ritika use for this portfolio',
      'what technologies did ritika use for this portfolio',
      'how is this portfolio built',
      'what did ritika use to build this portfolio',
      'portfolio tech stack',
      'this portfolio tech stack',
    ],
    answer: {
      type: 'paragraph',
      text: `This portfolio site was built with React, Vite, Tailwind CSS, and Framer Motion for smooth animations. It also uses Three.js and React Three Fiber for 3D elements, GSAP for advanced animations, and is deployed on GitHub Pages. But most importantly, it was built with a lot of love! 💜`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/portfolio-v2' },
      ],
      followUpQuestions: [
        "What are Ritika's key skills?",
        'What other projects has Ritika built?',
        'What technologies does Ritika use?',
      ],
    },
  },

  // ─────────────────────────────────────────────
  // SKILLS
  // ─────────────────────────────────────────────
  {
    id: 'skills',
    category: 'skills',
    tags: ['skills', 'tech stack', 'languages', 'tools', 'technologies', 'frameworks', 'what can you do', 'expertise'],
    questionPatterns: [
      'what are your key skills',
      'what technologies do you use',
      'what is your tech stack',
      'what languages do you know',
      'what frameworks do you know',
      'what are you good at',
      'your skills',
      'ritika skills',
      'ritika key skills',
      'ritika areas of expertise',
      'what skills does ritika have',
      'ritika tech stack',
    ],
    answer: {
      type: 'bulleted',
      text: "Ritika's key skills span full-stack development, with expertise in:",
      bullets: [
        {
          title: 'Frontend Development',
          description: 'React, Next.js, Angular, TypeScript, JavaScript (ES6+), HTML, CSS, and Tailwind CSS',
          links: [],
        },
        {
          title: 'Backend Development',
          description: 'Node.js, Nest.js, Express, Django REST Framework, Python, and SQL',
          links: [],
        },
        {
          title: 'Mobile Development',
          description: 'Swift, SwiftUI, SwiftData, WatchConnectivity, AVAudioSession, SFSpeechRecognizer, and SpriteKit for iOS/watchOS development',
          links: [],
        },
        {
          title: 'Cloud & Infrastructure',
          description: 'AWS, Azure, Firebase, Docker, and Vercel',
          links: [],
        },
        {
          title: 'Databases',
          description: 'PostgreSQL, MongoDB, and GraphQL',
          links: [],
        },
        {
          title: 'AI & Emerging Tech',
          description: 'LLMs for AI-powered features, RAG workflows, and text generation',
          links: [],
        },
      ],
      followUpQuestions: [
        'What technologies does Ritika use at Joydrop?',
        'What mobile development skills does Ritika have?',
        'What projects has Ritika built?',
      ],
    },
  },

  {
    id: 'mobile-skills',
    category: 'skills',
    tags: ['mobile', 'mobile development', 'ios', 'watchos', 'swift', 'swiftui', 'swiftdata', 'spritekit', 'mobile skills'],
    questionPatterns: [
      'what mobile development skills does ritika have',
      'ritika mobile skills',
      'mobile development skills',
      'ios development skills',
      'watchos development skills',
      'what mobile technologies does ritika know',
      'ritika swift',
      'ritika watchos',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika has strong mobile development skills focused on iOS and watchOS. She's proficient in Swift, SwiftUI, and SwiftData for building modern iOS apps, and has deep experience with watchOS development including WatchConnectivity, AVAudioSession, and SFSpeechRecognizer for on-device voice transcription. She's also worked with SpriteKit for game development. Her mobile projects include Utter (a voice capture app for Apple Watch and iPhone), Zoomies (a retro 2D endless runner), and Taskly (a clean to-do app).`,
      bullets: null,
      followUpQuestions: [
        'What is the Utter project?',
        'How did Ritika build Zoomies?',
        "What are Ritika's key skills?",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // EXPERIENCE
  // ─────────────────────────────────────────────
  {
    id: 'experience-general',
    category: 'experience',
    tags: ['experience', 'work', 'jobs', 'career', 'work history', 'employment'],
    questionPatterns: [
      'work experience',
      'past jobs',
      'where have you worked',
      'your experience',
      'career',
      'ritika work experience',
      'ritika past jobs',
      'where has ritika worked',
      'ritika career',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika has worked at several companies including Joydrop (current), Bright Mind Enrichment, Toyota, BECO Ventures, P&G, and Kroger. Her roles have spanned full-stack development, UI/UX design, data analytics, and mobile app development across various industries.`,
      bullets: null,
      followUpQuestions: [
        "What is Ritika's current role?",
        'What did Ritika do at Toyota?',
        "What are Ritika's key skills?",
      ],
    },
  },

  {
    id: 'companies-list',
    category: 'experience',
    tags: ['companies', 'company', 'list companies', 'worked for', 'employers', 'where worked'],
    questionPatterns: [
      'what other companies',
      'list the companies',
      'what companies',
      'which companies',
      'companies ritika worked for',
      'ritika companies',
      'list companies',
      'all companies',
      'what companies has ritika worked for',
      'which companies has ritika worked for',
      'ritika worked for',
      'companies ritika has worked for',
    ],
    answer: {
      type: 'bulleted',
      text: 'Ritika has worked at the following companies:',
      bullets: [
        {
          title: 'Joydrop (San Francisco)',
          description: "Full Stack App Developer (Sep '25 – Present) - Current role",
          links: [],
        },
        {
          title: 'Bright Mind Enrichment (San Francisco)',
          description: "UI/UX Web Developer (Sep '24 – Jul '25)",
          links: [],
        },
        {
          title: 'Toyota – Production Control (Georgetown, KY)',
          description: "Full Stack Developer (May '23 – Aug '23)",
          links: [],
        },
        {
          title: 'BECO Ventures (Singapore)',
          description: "UI Process Engineer (Sep '22 – Dec '22)",
          links: [],
        },
        {
          title: 'P&G – UC Simulation Center (Cincinnati, OH)',
          description: "Data Analyst (Jan '22 – Apr '22)",
          links: [],
        },
        {
          title: 'Kroger – Virtual Innovation Studio (Cincinnati, OH)',
          description: "CS Intern (Jan '20 – Apr '20)",
          links: [],
        },
      ],
      followUpQuestions: [
        "What is Ritika's current role?",
        'What did Ritika do at Toyota?',
        'What did Ritika accomplish at Bright Mind Enrichment?',
      ],
    },
  },

  {
    id: 'joydrop',
    category: 'experience',
    tags: ['joydrop', 'current', 'present', 'job', 'work', 'company', 'where do you work'],
    questionPatterns: [
      'where do you work',
      'current job',
      'what do you do at joydrop',
      'tell me about joydrop',
      'your current role',
      'ritika current job',
      'where does ritika work',
      'ritika joydrop',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika is currently a Full Stack App Developer at Joydrop in San Francisco (Sep '25 – Present). She builds and scales a full-stack platform using Next.js, Nest.js, and Firebase to power real-time recognition and reward interactions. She's optimized frontend and backend performance improving responsiveness by ~30%, and integrated AI-powered text generation features using LLMs to personalize user engagement.`,
      bullets: null,
      followUpQuestions: [
        'What technologies does Ritika use at Joydrop?',
        "What are Ritika's key skills?",
        'What other companies has Ritika worked for?',
      ],
    },
  },

  {
    id: 'joydrop-technologies',
    category: 'experience',
    tags: ['joydrop', 'technologies', 'tech stack', 'joydrop tech', 'joydrop technologies'],
    questionPatterns: [
      'what technologies does ritika use at joydrop',
      'joydrop technologies',
      'joydrop tech stack',
      'technologies joydrop',
      'tech stack joydrop',
      'what tech did ritika use at joydrop',
      'ritika joydrop technologies',
    ],
    answer: {
      type: 'paragraph',
      text: `At Joydrop, Ritika uses Next.js for the frontend, Nest.js for the backend, and Firebase for real-time features and infrastructure. She also works with TypeScript, JavaScript, and LLMs for AI-powered text generation features.`,
      bullets: null,
      followUpQuestions: [
        "What is Ritika's current role?",
        "What are Ritika's key skills?",
        'What other companies has Ritika worked for?',
      ],
    },
  },

  {
    id: 'bmeas',
    category: 'experience',
    tags: ['bright mind', 'bmeas', 'bme', 'ui ux', 'web developer'],
    questionPatterns: [
      'bright mind enrichment',
      'bmeas',
      'ui ux developer',
      'web developer experience',
      'ritika bright mind',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika worked as a UI/UX Web Developer at Bright Mind Enrichment in San Francisco (Sep '24 – Jul '25). She developed and maintained donation pages improving conversions by 20%, optimized site responsiveness and load times by 30%, and accelerated backend performance, cutting API response times by 35%.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika accomplish at Bright Mind Enrichment?',
        'What technologies did Ritika use at BMEAS?',
        "What is Ritika's current role?",
      ],
    },
  },

  {
    id: 'toyota',
    category: 'experience',
    tags: ['toyota', 'production control', 'full stack', 'azure', 'power bi'],
    questionPatterns: [
      'toyota',
      'production control',
      'tell me about toyota',
      'ritika toyota',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika worked as a Full Stack Developer at Toyota – Production Control in Georgetown, KY (May '23 – Aug '23). She reduced manual errors by 20% by designing and deploying SQL pipelines, improved process scalability by 30% with MS Azure automation, and cut manual reporting efforts by 40% by building real-time analytics dashboards with Power BI.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika work on at Toyota?',
        'What other companies has Ritika worked for?',
        "What are Ritika's data analytics skills?",
      ],
    },
  },

  {
    id: 'beco',
    category: 'experience',
    tags: ['beco', 'ventures', 'singapore', 'ui process engineer', 'aws', 'mongodb'],
    questionPatterns: [
      'beco',
      'beco ventures',
      'singapore',
      'ui process engineer',
      'ritika beco',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika worked as a UI Process Engineer at BECO Ventures in Singapore (Sep '22 – Dec '22). She enabled real-time monitoring of 10K+ greenhouse sensor readings, increased user efficiency by 40% by building interactive dashboards with React, Python, SQL, and MongoDB, and improved product reliability with 99.9% AWS uptime.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika build at BECO Ventures?',
        'What technologies did Ritika use at BECO?',
        'What other international experience does Ritika have?',
      ],
    },
  },

  {
    id: 'pg',
    category: 'experience',
    tags: ['p&g', 'procter', 'gamble', 'data analyst', 'uc simulation', 'cincinnati'],
    questionPatterns: [
      'p&g',
      'procter and gamble',
      'data analyst',
      'uc simulation',
      'ritika p&g',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika worked as a Data Analyst at P&G – UC Simulation Center in Cincinnati, OH (Jan '22 – Apr '22). She designed automated analytics with Excel VBA + REST APIs reducing processing time by 40% for global warehouse operations, and produced Power BI dashboards that improved decision-making speed by 25% across 3+ time zones.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika accomplish at P&G?',
        "What are Ritika's data analytics skills?",
        'What other companies has Ritika worked for?',
      ],
    },
  },

  {
    id: 'kroger',
    category: 'experience',
    tags: ['kroger', 'intern', 'cs intern', 'ios', 'mobile app'],
    questionPatterns: [
      'kroger',
      'intern',
      'cs intern',
      'kroger plus',
      'ritika kroger',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika worked as a CS Intern at Kroger – Virtual Innovation Studio in Cincinnati, OH (Jan '20 – Apr '20). She increased customer engagement by 15% and retention by 10% by enhancing Kroger Plus iOS app features, boosted user interaction by 20% through personalized promotions, and improved accessibility for 500K+ users.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika work on at Kroger?',
        'What mobile development experience does Ritika have?',
        'What other companies has Ritika worked for?',
      ],
    },
  },

  // ─────────────────────────────────────────────
  // PROJECTS
  // ─────────────────────────────────────────────
  {
    id: 'projects-general',
    category: 'projects',
    tags: ['projects', 'portfolio', 'github', 'what have you built', 'what projects'],
    questionPatterns: [
      'what projects',
      'what have you built',
      'your projects',
      'notable projects',
      'show me projects',
      'ritika projects',
      'ritika notable projects',
      'ritika portfolio projects',
      'what are ritika projects',
    ],
    answer: {
      type: 'bulleted',
      text: "Here are some of Ritika's notable projects:",
      bullets: [
        {
          title: 'Utter – Apple Watch Voice App',
          description: 'Voice capture app for Apple Watch and iPhone. Speak a thought on your wrist, transcribe and organize it on your phone using AVAudioSession and SFSpeechRecognizer.',
          links: [{ label: 'GitHub repo', url: 'https://github.com/RJoshi141/utter' }],
        },
        {
          title: 'Zoomies – 2D Endless Runner',
          description: 'Retro 2D endless runner built with SpriteKit + Swift with custom pixel sprites and UI.',
          links: [{ label: 'GitHub repo', url: 'https://github.com/RJoshi141/Zoomies' }],
        },
        {
          title: 'Cinemate – Movie Discovery & Watchlist',
          description: 'Discover and track your favorite movies with personalized recommendations, trivia, and interactive features.',
          links: [{ label: 'GitHub repo', url: 'https://github.com/RJoshi141/cinemate' }],
        },
        {
          title: 'Harmoni – Spotify Dashboard',
          description: 'A full-stack Spotify dashboard to explore your listening profile, edit playlists, and control playback.',
          links: [{ label: 'GitHub repo', url: 'https://github.com/RJoshi141/harmoni' }],
        },
        {
          title: "Rubik's Cube Solver",
          description: 'Interactive 3D Rubik\'s Cube visualizer and trainer built with React and Three.js.',
          links: [{ label: 'GitHub repo', url: 'https://github.com/RJoshi141/RubiksMaster' }],
        },
        {
          title: 'Lumon Interface',
          description: "A recreation of Severance's retro-futuristic Lumon interface with grid animations and immersive visuals.",
          links: [{ label: 'GitHub repo', url: 'https://github.com/RJoshi141/lumon' }],
        },
      ],
      followUpQuestions: [
        'What is the Utter project?',
        'Which project has been most challenging for Ritika so far?',
        'Can you share more details about Cinemate?',
        'How did Ritika build Zoomies?',
      ],
    },
  },

  {
    id: 'utter',
    category: 'projects',
    tags: ['utter', 'apple watch', 'watchos', 'voice', 'voice memo', 'transcribe', 'wrist', 'watch app', 'avaudiosession', 'sfspeechrecognizer'],
    questionPatterns: [
      'utter',
      'utter project',
      'what is utter',
      'ritika utter',
      'voice capture app',
      'apple watch app',
      'watchos app',
      'tell me about utter',
      'how did ritika build utter',
      'utter app details',
      'utter watch app',
    ],
    answer: {
      type: 'paragraph',
      text: `Utter is Ritika's voice capture app for Apple Watch and iPhone. The concept is beautifully simple — speak a thought on your wrist, then transcribe and organize it on your phone. It's built with Swift, SwiftUI, and WatchConnectivity to sync data between the watch and iPhone. On the watch side, Ritika used AVAudioSession to capture audio and SFSpeechRecognizer for on-device speech-to-text transcription, keeping all processing local for privacy. The app showcases deep watchOS knowledge including managing audio sessions, handling watch-to-phone data transfer, and building native watch UI with SwiftUI complications.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/utter' },
      ],
      followUpQuestions: [
        "What watchOS APIs did Ritika use for Utter?",
        "What other mobile projects has Ritika built?",
        "What are Ritika's iOS and watchOS skills?",
      ],
    },
  },

  {
    id: 'utter-technical',
    category: 'projects',
    tags: ['utter', 'technical', 'watchconnectivity', 'avaudiosession', 'sfspeechrecognizer', 'on-device', 'watchos apis', 'utter technical details'],
    questionPatterns: [
      'what watchos apis did ritika use for utter',
      'utter technical details',
      'how does utter work technically',
      'utter watchos apis',
      'utter avaudiosession',
      'utter sfspeechrecognizer',
      'utter watchconnectivity',
      'how did ritika implement utter',
    ],
    answer: {
      type: 'bulleted',
      text: 'Utter is built with several key watchOS and iOS technologies:',
      bullets: [
        {
          title: 'AVAudioSession',
          description: 'Used on the Apple Watch to capture audio input and manage the audio session lifecycle during recording.',
          links: [],
        },
        {
          title: 'SFSpeechRecognizer',
          description: 'Powers on-device speech-to-text transcription, keeping all voice data local for privacy.',
          links: [],
        },
        {
          title: 'WatchConnectivity',
          description: "Handles real-time data transfer between the Apple Watch and the iPhone, syncing transcribed notes to the phone's app.",
          links: [],
        },
        {
          title: 'SwiftUI',
          description: 'Used for building both the watchOS and iOS interfaces with native Apple design patterns.',
          links: [],
        },
      ],
      followUpQuestions: [
        "What other watchOS projects has Ritika built?",
        "What are Ritika's mobile development skills?",
        "What other projects has Ritika built?",
      ],
    },
  },

  {
    id: 'cinemate',
    category: 'projects',
    tags: ['cinemate', 'movie', 'movies', 'tmdb', 'react', 'typescript'],
    questionPatterns: [
      'movie app',
      'movie project',
      'ritika cinemate',
      'how did ritika build cinemate',
      'cinemate project',
      'can you share more details about cinemate',
      'more details about cinemate',
      'tell me more about cinemate',
    ],
    answer: {
      type: 'paragraph',
      text: `Cinemate is a comprehensive movie companion app that helps users discover and track their favorite films. Built with React, TypeScript, and Tailwind CSS, it integrates with the TMDB API to provide real-time movie data, cast information, and ratings. The app features personalized movie recommendations based on user preferences, a watchlist for tracking films, interactive trivia, and detailed movie information including trailers, reviews, and cast details. Ritika designed it with a clean, modern interface that makes movie discovery effortless and enjoyable.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/cinemate' },
      ],
      followUpQuestions: [
        'What other projects has Ritika built?',
        'What technologies does Ritika use for frontend development?',
        'How did Ritika build Zoomies?',
      ],
    },
  },

  {
    id: 'harmoni',
    category: 'projects',
    tags: ['harmoni', 'spotify', 'dashboard', 'music', 'playlist', 'playback', 'spotify api'],
    questionPatterns: [
      'harmoni',
      'harmoni project',
      'spotify dashboard',
      'spotify project',
      'ritika harmoni',
      'tell me about harmoni',
      'how did ritika build harmoni',
      'what is harmoni',
    ],
    answer: {
      type: 'paragraph',
      text: `Harmoni is a full-stack Spotify dashboard that lets you explore your listening profile, edit playlists, and control playback in real time. Built with React and deployed on Vercel, it integrates with the Spotify Web API to fetch a user's listening history, top artists, top tracks, and playlist data. Users can browse their music profile, make playlist edits, and control what's playing — all in one sleek interface.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/harmoni' },
      ],
      followUpQuestions: [
        'What other projects has Ritika built?',
        'What is the Utter project?',
        "What are Ritika's key skills?",
      ],
    },
  },

  {
    id: 'rubiks',
    category: 'projects',
    tags: ['rubiks', 'rubik', 'cube', 'rubiks cube', 'three.js', '3d', 'visualizer', 'solver'],
    questionPatterns: [
      "rubik's cube",
      'rubiks cube solver',
      'rubiks project',
      'ritika rubiks',
      'tell me about rubiks',
      'how did ritika build the rubiks cube solver',
      '3d cube project',
    ],
    answer: {
      type: 'paragraph',
      text: `The Rubik's Cube Solver is an interactive 3D Rubik's Cube visualizer and trainer built with React and Three.js. Users can rotate, scramble, and interact with the cube in real time in the browser. It uses Three.js for all 3D rendering and geometry, and React for the UI layer and state management. It's a showcase of Ritika's ability to work with 3D graphics and complex state in the browser.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/RubiksMaster' },
      ],
      followUpQuestions: [
        "What other projects has Ritika built?",
        "What technologies does Ritika know for 3D graphics?",
        "What is Ritika's portfolio site built with?",
      ],
    },
  },

  {
    id: 'lumon',
    category: 'projects',
    tags: ['lumon', 'severance', 'retro', 'interface', 'animation', 'lumon interface', 'tv show'],
    questionPatterns: [
      'lumon',
      'lumon interface',
      'severance',
      'ritika lumon',
      'tell me about lumon',
      'how did ritika build lumon',
      'what is the lumon project',
      'lumon project',
    ],
    answer: {
      type: 'paragraph',
      text: `The Lumon Interface is a faithful recreation of the retro-futuristic terminal from Apple TV+'s Severance. Built entirely with HTML, CSS, and vanilla JavaScript, it features the iconic grid animations, eerie green-on-black aesthetic, and immersive visual effects from the show. It's a passion project that showcases Ritika's eye for design detail and her ability to bring creative, unconventional interfaces to life using pure web technologies.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/lumon' },
      ],
      followUpQuestions: [
        "What other projects has Ritika built?",
        "What is Ritika's design philosophy?",
        "What other creative projects has Ritika worked on?",
      ],
    },
  },

  {
    id: 'zoomies',
    category: 'projects',
    tags: ['zoomies', 'game', 'ios', 'swift', 'spritekit', 'mobile game', 'pixel'],
    questionPatterns: [
      'zoomies',
      'game',
      'mobile game',
      'spritekit',
      'ritika zoomies',
      'how did ritika build zoomies',
      'zoomies project',
      'tell me about zoomies',
    ],
    answer: {
      type: 'paragraph',
      text: `Zoomies is a retro 2D endless runner game built with SpriteKit and Swift. Ritika created custom pixel sprites from scratch, designed smooth gameplay mechanics, and implemented collision detection and physics systems. The project involved SpriteKit's scene management, sprite animations, and touch-based controls to create an engaging retro gaming experience with a fully custom UI that matches the pixel art aesthetic.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/Zoomies' },
      ],
      followUpQuestions: [
        'Which project has been most challenging for Ritika so far?',
        'What mobile development skills does Ritika have?',
        'What other iOS projects has Ritika built?',
      ],
    },
  },

  {
    id: 'taskly',
    category: 'projects',
    tags: ['taskly', 'todo', 'ios', 'swift', 'swiftui', 'swiftdata'],
    questionPatterns: [
      'taskly',
      'todo app',
      'ios todo app',
      'ritika taskly',
      'how did ritika build taskly',
    ],
    answer: {
      type: 'paragraph',
      text: `Taskly is a clean, minimal to-do list iOS app built with SwiftUI and SwiftData. It's designed for clarity, speed, and delight — showcasing Ritika's ability to build polished, native iOS apps with modern Apple frameworks.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/Taskly' },
      ],
      followUpQuestions: [
        'What other iOS projects has Ritika built?',
        'What mobile development skills does Ritika have?',
        'What other projects has Ritika built?',
      ],
    },
  },

  {
    id: 'eventready',
    category: 'projects',
    tags: ['eventready', 'event', 'management', 'django', 'full stack', 'capstone'],
    questionPatterns: [
      'eventready',
      'event management',
      'capstone',
      'ritika eventready',
      'how did ritika build eventready',
    ],
    answer: {
      type: 'paragraph',
      text: `EventReady is a full-stack web app for event management with goal tracking, budget planning, and attendance tools. It's built with Django, React, MUI, and JavaScript. This was Ritika's capstone project at the University of Cincinnati.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/Capstone-Project' },
      ],
      followUpQuestions: [
        'What other projects has Ritika built?',
        'How did Ritika design and build EventReady?',
        'What full-stack technologies does Ritika know?',
      ],
    },
  },

  {
    id: 'challenging-project',
    category: 'projects',
    tags: ['challenging', 'difficult', 'hard', 'most challenging', 'challenge'],
    questionPatterns: [
      'which project has been most challenging',
      'most challenging project',
      'what was the most challenging project',
      'ritika most challenging project',
      'which project was most challenging for ritika',
      'challenging project ritika',
    ],
    answer: {
      type: 'paragraph',
      text: `Utter has been one of the most technically challenging projects for Ritika. Building a voice capture app for Apple Watch required mastering watchOS-specific APIs like AVAudioSession for audio capture and SFSpeechRecognizer for on-device transcription — while also handling the watch-to-phone data pipeline via WatchConnectivity. Managing audio sessions in the constrained watchOS environment, keeping processing on-device for privacy, and building a seamless two-device experience all at once made it a real engineering challenge. Zoomies is a close second — building a 2D game with custom pixel sprites and physics from scratch pushed Ritika into territory well beyond typical app interfaces.`,
      bullets: null,
      followUpQuestions: [
        'What is the Utter project?',
        'How did Ritika build Zoomies?',
        'What mobile development skills does Ritika have?',
      ],
    },
  },

  {
    id: 'ios-projects',
    category: 'projects',
    tags: ['ios', 'ios projects', 'mobile', 'swift', 'swiftui', 'other ios', 'watchos projects'],
    questionPatterns: [
      'what other ios projects',
      'other ios projects ritika',
      'ritika ios projects',
      'what ios projects has ritika built',
      'ritika mobile projects',
      'ritika watchos projects',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika's iOS and watchOS projects include Utter (voice capture for Apple Watch + iPhone), Zoomies (retro 2D endless runner with SpriteKit), and Taskly (clean SwiftUI to-do app). Check her GitHub for the full list.`,
      bullets: null,
      links: [
        { label: 'GitHub', url: 'https://github.com/RJoshi141' },
      ],
      followUpQuestions: [
        'What is the Utter project?',
        'What mobile development skills does Ritika have?',
        'How did Ritika build Zoomies?',
      ],
    },
  },

  // ─────────────────────────────────────────────
  // ARTICLES
  // ─────────────────────────────────────────────
  {
    id: 'articles-general',
    category: 'articles',
    tags: ['articles', 'writing', 'medium', 'blog', 'posts', 'written', 'publications'],
    questionPatterns: [
      'what articles has ritika written',
      'ritika articles',
      'ritika writing',
      'ritika medium',
      'ritika blog',
      'what has ritika written',
      'ritika publications',
      'articles ritika wrote',
      'show me ritika articles',
    ],
    answer: {
      type: 'bulleted',
      text: "Ritika has written three articles, primarily focused on her personal experience navigating technical interviews at top companies:",
      bullets: [
        {
          title: "I Interviewed at Atlassian — Here's Everything You Need to Know",
          description: "A detailed breakdown of Ritika's interview experience at Atlassian for a Full Stack Software Engineer role, covering the process, what to expect, and tips.",
          links: [{ label: 'Read on Medium', url: 'https://medium.com/@ritikajoshi141/i-interviewed-at-atlassian-heres-everything-you-need-to-know-b126553a03d5' }],
        },
        {
          title: 'AWS Front End Interview Series: From Application to Phone Screen — Part 1',
          description: "Part one of Ritika's series on going through the full front-end engineering interview process at Amazon Web Services, from applying to the phone screen.",
          links: [{ label: 'Read on Medium', url: 'https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41' }],
        },
        {
          title: 'Marking Milestones',
          description: "Ritika was the undergraduate student speaker at UC's commencement 2024 — the largest graduating class in UC history. This article covers her address and the journey of the graduating class.",
          links: [{ label: 'Read on UC News', url: 'https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html' }],
        },
      ],
      followUpQuestions: [
        "What was Ritika's Atlassian interview article about?",
        "What is Ritika's AWS interview series about?",
        "What is the Marking Milestones article about?",
        'Does Ritika write more on Medium?',
      ],
    },
  },

  {
    id: 'article-atlassian',
    category: 'articles',
    tags: ['atlassian', 'atlassian article', 'atlassian interview', 'interview atlassian', 'atlassian medium'],
    questionPatterns: [
      "what was ritika's atlassian interview article about",
      'atlassian interview article',
      'ritika atlassian article',
      'atlassian article',
      'tell me about the atlassian article',
      'ritika atlassian interview',
    ],
    answer: {
      type: 'paragraph',
      text: `In this article, Ritika documents her full interview experience at Atlassian for a Full Stack Software Engineer role. She covers everything from the initial application and recruiter screen through to the technical rounds — including what kinds of questions were asked, how the process was structured, and practical tips for anyone preparing for a similar interview. It's a candid, detailed first-person account aimed at helping other engineers navigate the Atlassian hiring process.`,
      bullets: null,
      links: [
        { label: 'Read on Medium', url: 'https://medium.com/@ritikajoshi141/i-interviewed-at-atlassian-heres-everything-you-need-to-know-b126553a03d5' },
      ],
      followUpQuestions: [
        "What is Ritika's AWS interview series about?",
        'What other articles has Ritika written?',
        'Does Ritika write more on Medium?',
      ],
    },
  },

  {
    id: 'article-aws',
    category: 'articles',
    tags: ['aws', 'amazon', 'aws interview', 'front end interview', 'aws article', 'aws medium', 'phone screen'],
    questionPatterns: [
      "what is ritika's aws interview series about",
      'aws interview series',
      'ritika aws article',
      'aws article',
      'tell me about the aws article',
      'ritika aws interview',
      'aws front end interview',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika's AWS Front End Interview Series is a two-part deep dive into her experience going through the full front-end engineering interview process at Amazon Web Services. Part 1 covers the journey from submitting the application through to the phone screen — including how she prepared, what the recruiter call was like, and what technical topics came up early in the process. It's written as a practical guide for engineers aiming to break into AWS or Amazon.`,
      bullets: null,
      links: [
        { label: 'Read Part 1 on Medium', url: 'https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41' },
      ],
      followUpQuestions: [
        "What was Ritika's Atlassian interview article about?",
        'What other articles has Ritika written?',
        'What is the Marking Milestones article about?',
      ],
    },
  },

  {
    id: 'article-milestones',
    category: 'articles',
    tags: ['marking milestones', 'commencement', 'graduation', 'student speaker', 'uc', 'university of cincinnati', 'speech', 'commencement speech'],
    questionPatterns: [
      'what is the marking milestones article about',
      'marking milestones article',
      'ritika commencement speech',
      'ritika student speaker',
      'ritika graduation speech',
      'uc commencement',
      'ritika uc graduation',
      'tell me about marking milestones',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika was selected as the undergraduate student speaker for the University of Cincinnati's Spring 2024 commencement — the largest graduating class in UC history. The "Marking Milestones" article covers her student address, in which she reflected on how the class navigated challenges together as Bearcats, united by the university's values. It's a proud milestone in Ritika's story and a testament to her leadership and impact on campus.`,
      bullets: null,
      links: [
        { label: 'Read on UC News', url: 'https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html' },
      ],
      followUpQuestions: [
        "What are Ritika's leadership accomplishments?",
        'What other articles has Ritika written?',
        "What awards has Ritika received?",
      ],
    },
  },

  {
    id: 'articles-medium',
    category: 'articles',
    tags: ['medium', 'follow medium', 'medium profile', 'more articles', 'ritika medium profile'],
    questionPatterns: [
      'does ritika write more on medium',
      'ritika medium profile',
      'follow ritika on medium',
      'more articles on medium',
      'ritika more writing',
    ],
    answer: {
      type: 'paragraph',
      text: `Yes! You can follow Ritika on Medium to stay updated when she publishes new articles. She writes about her experiences navigating technical interviews, engineering insights, and more.`,
      bullets: null,
      links: [
        { label: 'Follow on Medium', url: 'https://medium.com/@ritikajoshi141' },
      ],
      followUpQuestions: [
        'What articles has Ritika written?',
        "What was Ritika's Atlassian interview article about?",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // LEADERSHIP & ACCOLADES
  // ─────────────────────────────────────────────
  {
    id: 'leadership-general',
    category: 'leadership',
    tags: ['leadership', 'student government', 'campus', 'uc', 'university', 'on campus', 'extracurricular'],
    questionPatterns: [
      "what leadership roles has ritika held",
      "ritika leadership",
      "ritika student government",
      "ritika campus involvement",
      "ritika extracurricular",
      "ritika uc involvement",
    ],
    answer: {
      type: 'bulleted',
      text: "Ritika held four progressive leadership roles in UC's Student Government:",
      bullets: [
        {
          title: 'Senator-At-Large',
          description: "Apr 2023 – Apr 2024. Elected as one of 8 Senators-At-Large to represent the UC undergraduate student body. Led initiatives on Financial Literacy, International Alumni Network, and Women-Only Workout sessions.",
          links: [],
        },
        {
          title: 'Recruitment & Outreach Director',
          description: 'Aug 2022 – Dec 2022. Organized 2-week campus-wide events collaborating with student organizations.',
          links: [],
        },
        {
          title: 'Election Facilitation Committee Member',
          description: 'Jan 2022 – Apr 2022. Ensured campaigns and elections ran smoothly and equitably across campus.',
          links: [],
        },
        {
          title: 'Design Director',
          description: 'Aug 2021 – Dec 2021. Designed event graphics and created the USG Fall Progress Report magazine.',
          links: [],
        },
      ],
      followUpQuestions: [
        "What awards has Ritika received?",
        "Was Ritika a student speaker at graduation?",
        "What is Ritika's background?",
      ],
    },
  },

  {
    id: 'accolades',
    category: 'leadership',
    tags: ['awards', 'accolades', 'scholarships', 'recognition', 'honors', 'achievements', 'senior 100', 'freeman', 'scholarship'],
    questionPatterns: [
      "what awards has ritika received",
      "ritika awards",
      "ritika accolades",
      "ritika scholarships",
      "ritika recognition",
      "ritika honors",
      "ritika achievements",
      "what honors has ritika received",
    ],
    answer: {
      type: 'bulleted',
      text: "Ritika has received the following awards and scholarships:",
      bullets: [
        {
          title: 'Senior 100 Cohort 2024',
          description: "Recognized among UC's top 100 graduating seniors for academic excellence, leadership, and community impact.",
          links: [],
        },
        {
          title: 'Freeman Foundation Scholarship',
          description: 'Awarded for international outreach and academic excellence during study abroad in Singapore (Aug 2022).',
          links: [],
        },
        {
          title: 'UC Global Scholarship',
          description: 'Received for demonstrating cultural engagement and leadership in international education programs (2019–2024).',
          links: [],
        },
        {
          title: 'CEAS International Outreach Scholarship',
          description: "A merit-based award for international students offered by UC's College of Engineering & Applied Science (2019–2024).",
          links: [],
        },
      ],
      followUpQuestions: [
        "What leadership roles has Ritika held?",
        "Was Ritika a student speaker at graduation?",
        "What is Ritika's educational background?",
      ],
    },
  },

  {
    id: 'student-speaker',
    category: 'leadership',
    tags: ['student speaker', 'commencement', 'graduation speech', 'uc graduation', 'speaker'],
    questionPatterns: [
      'was ritika a student speaker',
      'ritika commencement speaker',
      'ritika graduation speech',
      'ritika student speaker',
      'ritika uc commencement',
    ],
    answer: {
      type: 'paragraph',
      text: `Yes! Ritika was selected as the undergraduate student speaker at the University of Cincinnati's Spring 2024 commencement — the largest graduating class in UC history. In her address, she reflected on the class's journey and what it meant to be Bearcats together. It's one of her proudest achievements alongside making the Senior 100 Cohort.`,
      bullets: null,
      links: [
        { label: 'Read on UC News', url: 'https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html' },
      ],
      followUpQuestions: [
        "What awards has Ritika received?",
        "What leadership roles has Ritika held?",
        "What is the Marking Milestones article about?",
      ],
    },
  },

  // ─────────────────────────────────────────────
  // INTERESTS / PHILOSOPHY
  // ─────────────────────────────────────────────
  {
    id: 'philosophy',
    category: 'interests',
    tags: ['philosophy', 'design', 'approach', 'values', 'what do you care about', 'interests'],
    questionPatterns: [
      'design philosophy',
      'what do you care about',
      'your approach',
      'what interests you',
      'values',
      'ritika design philosophy',
      'ritika approach',
      'what does ritika care about',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika enjoys building products that balance technical precision with thoughtful design, creating experiences that feel effortless for users. She loves combining design and engineering to build things that feel joyful, accessible, and human — whether that's a voice app for a tiny Apple Watch screen or a full-stack platform for thousands of users.`,
      bullets: null,
      followUpQuestions: [
        "What projects best showcase Ritika's design philosophy?",
        "What are Ritika's key skills?",
        'What projects has Ritika built?',
      ],
    },
  },
];