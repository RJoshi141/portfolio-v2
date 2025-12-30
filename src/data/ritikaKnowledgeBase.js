/**
 * Ritika's Knowledge Base
 * 
 * This file contains all the information the Portfolio Concierge knows about Ritika.
 * To update what the assistant can answer, add or edit entries here.
 * 
 * Each entry should have:
 * - id: unique identifier
 * - category: general|skills|experience|projects|interests
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
      text: `Ritika Joshi is a Full-Stack Developer & Tech-Creative based in San Francisco. She builds intuitive, scalable digital products that connect people and technology. Currently, she's part of the team at Joydrop, crafting a real-time platform for recognition and rewards using Next.js, Nest.js, and Firebase.`,
      bullets: null,
      followUpQuestions: [
        'What are Ritika\'s key skills and areas of expertise?',
        'Where does Ritika currently work?',
        'What projects has Ritika built?',
      ],
    },
  },

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
      text: 'Ritika\'s key skills span full-stack development, with expertise in:',
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
          description: 'Swift, SwiftUI, SwiftData, and SpriteKit for iOS development',
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
          description: 'LLMs for AI-powered features and text generation',
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
      text: `Ritika is currently a Full Stack App Developer at Joydrop in San Francisco (Sep '25 – Present). She builds and scales a full-stack platform using Next.js, Nest.js, and Firebase to power real-time recognition and reward interactions. She's optimized frontend and backend performance, improving responsiveness by ~30%, and integrated AI-powered text generation features using LLMs.`,
      bullets: null,
      followUpQuestions: [
        'What technologies does Ritika use at Joydrop?',
        'What are Ritika\'s key skills?',
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
      'what technologies does ritika use at joydrop?',
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
        'What is Ritika\'s current role?',
        'What are Ritika\'s key skills?',
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
      text: `Ritika worked as a UI/UX Web Developer at Bright Mind Enrichment in San Francisco (Sep '24 – Jul '25). She developed and maintained donation pages, improving conversions by 20%, optimized site responsiveness and load times by 30%, and accelerated backend performance, cutting API response times by 35%.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika accomplish at Bright Mind Enrichment?',
        'What technologies did Ritika use at BMEAS?',
        'What is Ritika\'s current role?',
      ],
    },
  },

  {
    id: 'bmeas-technologies',
    category: 'experience',
    tags: ['bmeas', 'bright mind', 'technologies', 'tech stack', 'bmeas tech', 'bmeas technologies'],
    questionPatterns: [
      'what technologies did ritika use at bmeas',
      'what technologies did ritika use at bright mind',
      'bmeas technologies',
      'bmeas tech stack',
      'technologies bmeas',
      'tech stack bmeas',
      'what tech did ritika use at bmeas',
      'ritika bmeas technologies',
    ],
    answer: {
      type: 'paragraph',
      text: `At Bright Mind Enrichment, Ritika used React for building optimized frontend components and REST APIs for backend integrations. She implemented React components to optimize site responsiveness and load times, and integrated REST APIs to accelerate backend performance and reduce API response times.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika accomplish at Bright Mind Enrichment?',
        'What are Ritika\'s key skills?',
        'What is Ritika\'s current role?',
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
        'What are Ritika\'s data analytics skills?',
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
      text: `Ritika worked as a UI Process Engineer at BECO Ventures in Singapore (Sep '22 – Dec '22). She enabled real-time monitoring of 10K+ greenhouse sensor readings by developing a cloud-based data processing pipeline, increased user efficiency by 40% by building interactive dashboards with React, Python, SQL, and MongoDB, and improved product reliability with 99.9% AWS uptime.`,
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
      text: `Ritika worked as a Data Analyst at P&G – UC Simulation Center in Cincinnati, OH (Jan '22 – Apr '22). She designed automated analytics with Excel VBA + REST APIs, reducing processing time by 40% for global warehouse operations, and produced Power BI dashboards that improved decision-making speed by 25% across 3+ time zones.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika accomplish at P&G?',
        'What are Ritika\'s data analytics skills?',
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
      text: `Ritika worked as a CS Intern at Kroger – Virtual Innovation Studio in Cincinnati, OH (Jan '20 – Apr '20). She increased customer engagement by 15% and retention by 10% by enhancing Kroger Plus iOS app features, boosted user interaction by 20% by analyzing customer behavior, and improved accessibility for 500K+ users.`,
      bullets: null,
      followUpQuestions: [
        'What did Ritika work on at Kroger?',
        'What mobile development experience does Ritika have?',
        'What other companies has Ritika worked for?',
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
    ],
    answer: {
      type: 'paragraph',
      text: `Cinemate is a movie discovery and tracking app with personalized recommendations, trivia, and interactive features. It's built with React, JavaScript, TypeScript, Tailwind CSS, and the TMDB API.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/cinemate' },
      ],
      followUpQuestions: [
        'What other projects has Ritika built?',
        'How did Ritika design Cinemate?',
        'What technologies does Ritika use for frontend development?',
      ],
    },
  },

  {
    id: 'cinemate-details',
    category: 'projects',
    tags: ['cinemate', 'details', 'more', 'share', 'movie app', 'features', 'tell me more', 'cinemate details', 'cinemate information'],
    questionPatterns: [
      'can you share more details about cinemate',
      'share more details about cinemate',
      'more details about cinemate',
      'details about cinemate',
      'cinemate details',
      'tell me more about cinemate',
      'what is cinemate',
      'cinemate features',
      'about cinemate',
      'cinemate app',
      'cinemate more',
      'cinemate information',
      'cinemate comprehensive',
    ],
    answer: {
      type: 'paragraph',
      text: `Cinemate is a comprehensive movie companion app that helps users discover and track their favorite films. Built with React, TypeScript, and Tailwind CSS, it integrates with the TMDB API to provide real-time movie data, cast information, and ratings. The app features personalized movie recommendations based on user preferences, a watchlist for tracking films to watch, interactive trivia, and detailed movie information including trailers, reviews, and cast details. Ritika designed it with a clean, modern interface that makes movie discovery effortless and enjoyable.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/cinemate' },
      ],
      followUpQuestions: [
        'What other projects has Ritika built?',
        'What technologies does Ritika use for frontend development?',
        'How did Ritika build Cinemate?',
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
      text: `EventReady is a full-stack web app for event management with goal tracking, budget planning, and attendance tools. It's built with Django, React, MUI, and JavaScript. This was Ritika's capstone project.`,
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
    id: 'taskly',
    category: 'projects',
    tags: ['taskly', 'todo', 'ios', 'swift', 'swiftui', 'swiftdata'],
    questionPatterns: [
      'taskly',
      'todo app',
      'ios app',
      'ritika taskly',
      'how did ritika build taskly',
    ],
    answer: {
      type: 'paragraph',
      text: `Taskly is a clean, minimal to-do list iOS app built with SwiftUI and SwiftData. It's designed for clarity, speed, and delight, showcasing Ritika's mobile development skills.`,
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
    id: 'zoomies',
    category: 'projects',
    tags: ['zoomies', 'game', 'ios', 'swift', 'spritekit', 'mobile game'],
    questionPatterns: [
      'zoomies',
      'game',
      'mobile game',
      'spritekit',
      'ritika zoomies',
      'how did ritika build zoomies',
    ],
    answer: {
      type: 'paragraph',
      text: `Zoomies is a retro 2D endless runner game built with SpriteKit and Swift. It features custom pixel sprites and UI, showcasing Ritika's game development skills.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/Zoomies' },
      ],
      followUpQuestions: [
        'What other iOS projects has Ritika built?',
        'What game development experience does Ritika have?',
        'What other projects has Ritika built?',
      ],
    },
  },

  {
    id: 'zoomies-details',
    category: 'projects',
    tags: ['zoomies', 'how', 'build', 'spritekit', 'swift', 'game development'],
    questionPatterns: [
      'how did ritika build zoomies',
      'how was zoomies built',
      'zoomies development',
      'ritika build zoomies',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika built Zoomies using SpriteKit, Apple's 2D game framework, and Swift. She created custom pixel sprites from scratch, designed smooth gameplay mechanics for the endless runner genre, and implemented collision detection and physics systems. The project involved working with SpriteKit's scene management, sprite animations, and touch-based controls to create an engaging retro gaming experience. She also designed a custom UI that matches the pixel art aesthetic.`,
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
      text: `Zoomies has been the most challenging project for Ritika so far. Building a retro 2D endless runner game with SpriteKit and Swift required learning game development fundamentals, creating custom pixel sprites, implementing smooth gameplay mechanics, and designing an engaging UI. The project pushed Ritika to explore new areas of iOS development beyond typical app interfaces, working with physics, collision detection, and animation systems.`,
      bullets: null,
      links: [
        { label: 'GitHub repo', url: 'https://github.com/RJoshi141/Zoomies' },
      ],
      followUpQuestions: [
        'What other iOS projects has Ritika built?',
        'What game development experience does Ritika have?',
        'How did Ritika build Zoomies?',
      ],
    },
  },

  {
    id: 'ios-projects',
    category: 'projects',
    tags: ['ios', 'ios projects', 'mobile', 'swift', 'swiftui', 'other ios'],
    questionPatterns: [
      'what other ios projects',
      'other ios projects ritika',
      'ritika ios projects',
      'what ios projects has ritika built',
      'ritika mobile projects',
    ],
    answer: {
      type: 'paragraph',
      text: `Check her GitHub repos to see all of Ritika's iOS projects.`,
      bullets: null,
      links: [
        { label: 'GitHub', url: 'https://github.com/RJoshi141' },
      ],
      followUpQuestions: [
        'What projects has Ritika built?',
        'What mobile development skills does Ritika have?',
        'How did Ritika build Zoomies?',
      ],
    },
  },

  {
    id: 'mobile-skills',
    category: 'skills',
    tags: ['mobile', 'mobile development', 'ios', 'swift', 'swiftui', 'swiftdata', 'spritekit', 'mobile skills'],
    questionPatterns: [
      'what mobile development skills does ritika have',
      'ritika mobile skills',
      'mobile development skills',
      'ios development skills',
      'what mobile technologies does ritika know',
      'ritika swift',
    ],
    answer: {
      type: 'paragraph',
      text: `Ritika has strong mobile development skills focused on iOS development. She's proficient in Swift, SwiftUI, and SwiftData for building modern iOS apps with declarative UI and data persistence. She's also worked with SpriteKit for game development, creating custom sprites and implementing game mechanics. Her mobile projects include Taskly, a clean to-do app built with SwiftUI and SwiftData, and Zoomies, a retro 2D endless runner game using SpriteKit. Ritika understands iOS design patterns, state management, and creating smooth, responsive user experiences on mobile devices.`,
      bullets: null,
      followUpQuestions: [
        'What other iOS projects has Ritika built?',
        'How did Ritika build Zoomies?',
        'What are Ritika\'s key skills?',
      ],
    },
  },

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
      text: 'Here are some of Ritika\'s notable projects:',
      bullets: [
        {
          title: 'Zoomies – 2D Endless Runner',
          description: 'Retro 2D endless runner built with SpriteKit + Swift with custom pixel sprites and UI.',
          links: [
            { label: 'GitHub repo', url: 'https://github.com/RJoshi141/Zoomies' },
          ],
        },
        {
          title: 'Cinemate – Movie Discovery & Watchlist',
          description: 'Discover and track your favorite movies with personalized recommendations, trivia, and interactive features.',
          links: [
            { label: 'GitHub repo', url: 'https://github.com/RJoshi141/cinemate' },
          ],
        },
        {
          title: 'Harmoni – Spotify Dashboard',
          description: 'A full-stack Spotify dashboard that lets you explore your listening profile, edit playlists, and control playback.',
          links: [
            { label: 'GitHub repo', url: 'https://github.com/RJoshi141/harmoni' },
          ],
        },
      ],
      followUpQuestions: [
        'Which project has been most challenging for Ritika so far?',
        'Can you share more details about Cinemate?',
        'How did Ritika build Zoomies?',
        'What technologies does Ritika use for mobile development?',
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
          description: 'Full Stack App Developer (Sep \'25 – Present) - Current role',
          links: [],
        },
        {
          title: 'Bright Mind Enrichment (San Francisco)',
          description: 'UI/UX Web Developer (Sep \'24 – Jul \'25)',
          links: [],
        },
        {
          title: 'Toyota – Production Control (Georgetown, KY)',
          description: 'Full Stack Developer (May \'23 – Aug \'23)',
          links: [],
        },
        {
          title: 'BECO Ventures (Singapore)',
          description: 'UI Process Engineer (Sep \'22 – Dec \'22)',
          links: [],
        },
        {
          title: 'P&G – UC Simulation Center (Cincinnati, OH)',
          description: 'Data Analyst (Jan \'22 – Apr \'22)',
          links: [],
        },
        {
          title: 'Kroger – Virtual Innovation Studio (Cincinnati, OH)',
          description: 'CS Intern (Jan \'20 – Apr \'20)',
          links: [],
        },
      ],
      followUpQuestions: [
        'What is Ritika\'s current role?',
        'What did Ritika do at Toyota?',
        'What did Ritika accomplish at Bright Mind Enrichment?',
      ],
    },
  },

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
        'What is Ritika\'s current role?',
        'What did Ritika do at Toyota?',
        'What are Ritika\'s key skills?',
      ],
    },
  },

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
      text: `Ritika enjoys building products that balance technical precision with thoughtful design, creating experiences that feel effortless for users. She loves combining design and engineering to build experiences that feel joyful, accessible, and human.`,
      bullets: null,
      followUpQuestions: [
        'What projects best showcase Ritika\'s design philosophy?',
        'What are Ritika\'s key skills?',
        'What projects has Ritika built?',
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
        'What is Ritika\'s current role?',
        'What projects has Ritika built?',
        'What are Ritika\'s key skills?',
      ],
    },
  },
];
