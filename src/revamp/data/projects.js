// Single source of truth for work cards + case study pages.
// Fill in anything marked TODO; empty fields are hidden on the case study page.
// Case study shape: sections[{ heading, body?, list?, image?, caption? }], metrics[{ value, label }], gallery[img]
import utterFrame from "../../assets/project-frames/utter-watch-ultra.png";
import zoomiesFrame from "../../assets/project-frames/zoomies-iphone.png";
import cinemateFrame from "../../assets/project-frames/cinemate-ipad.png";
import harmoniFrame from "../../assets/project-frames/harmoni-frames.png";
import portfolioFrame from "../../assets/project-frames/potfolio-frames.png";
import rubiksFrame from "../../assets/project-frames/rubiks-mac.png";
import lumonFrame from "../../assets/project-frames/lumon-frames.png";

export const projects = [
  {
    slug: "utter",
    name: "Utter",
    tagline: "Voice capture for your wrist",
    featured: true,
    tags: ["watchOS", "iOS", "Swift"],
    frame: utterFrame,
    tint: "#1b1712", // card background behind the device frame
    github: "https://github.com/RJoshi141/utter",
    summary:
      "Speak a thought on your Apple Watch, then find it transcribed and sorted on your iPhone.",
    role: "Solo: design, engineering",
    platform: "watchOS, iOS",
    year: "", // TODO
    stack: ["Swift", "SwiftUI", "WatchConnectivity", "AVFoundation", "SFSpeechRecognizer"],
    sections: [
      {
        heading: "The problem",
        body: "Ideas show up at bad times. Pulling out a phone, unlocking it, and opening a notes app is enough friction to lose the thought.",
      },
      {
        heading: "What I built",
        list: [
          "One-tap recording on watchOS with AVFoundation",
          "Watch to phone sync over WatchConnectivity",
          "On-device transcription with SFSpeechRecognizer",
          "Keyword-based auto-categorization so memos land in the right place",
        ],
      },
      // TODO: { heading: "How it works", body: "...", image: someImport, caption: "..." },
    ],
    metrics: [], // e.g. { value: "<1s", label: "Watch to phone sync" }
    gallery: [], // extra full-width screenshots, shown numbered
  },
  {
    slug: "zoomies",
    name: "Zoomies",
    tagline: "Pixel-art endless runner",
    featured: true,
    tags: ["iOS", "SpriteKit", "Swift"],
    frame: zoomiesFrame,
    tint: "#101a13",
    github: "https://github.com/RJoshi141/Zoomies",
    summary:
      "A retro 2D endless runner where a dog dodges logs and collects bones, with custom pixel sprites and UI.",
    role: "Solo: art, design, engineering",
    platform: "iOS",
    year: "", // TODO
    stack: ["Swift", "SpriteKit", "Xcode"],
    sections: [
      {
        heading: "Why I made it",
        body: "A visual effects class in undergrad got me hooked on pixel animation. I wanted to see those sprites actually move in something playable.",
      },
      {
        heading: "What I built",
        list: [
          "Hand-drawn pixel sprites packed into texture atlases",
          "Physics and collisions using SpriteKit category bit masks",
          "Endless spawning, scoring, and custom game UI",
        ],
      },
    ],
    metrics: [],
    gallery: [],
  },
  {
    slug: "cinemate",
    name: "Cinemate",
    tagline: "Movie discovery with RAG",
    featured: true,
    tags: ["React", "TypeScript", "RAG"],
    frame: cinemateFrame,
    tint: "#14141a",
    github: "https://github.com/RJoshi141/cinemate",
    summary:
      "Discover and track movies with personalized recommendations, trivia, and interactive features.",
    role: "Solo: design, engineering",
    stack: ["React", "TypeScript", "TMDB API"],
    platform: "Web",
    year: "",
    sections: [], // TODO
    metrics: [],
    gallery: [],
  },
  {
    slug: "harmoni",
    name: "Harmoni",
    tagline: "Spotify listening dashboard",
    tags: ["React", "Spotify API", "Vercel"],
    frame: harmoniFrame,
    tint: "#161214",
    github: "https://github.com/RJoshi141/harmoni",
    summary:
      "A full-stack Spotify dashboard to explore your listening profile, edit playlists, and control playback.",
    role: "Solo: design, engineering",
    stack: ["React", "Spotify Web API", "Vercel"],
    platform: "Web",
    year: "",
    sections: [],
    metrics: [],
    gallery: [],
  },
  {
    slug: "lumon",
    name: "Lumon Interface",
    tagline: "Severance terminal recreation",
    tags: ["HTML", "CSS", "JavaScript"],
    frame: lumonFrame,
    tint: "#0f1517",
    github: "https://github.com/RJoshi141/lumon",
    summary:
      "A recreation of Severance's retro-futuristic Lumon terminal with grid animations and immersive visuals.",
    role: "Solo",
    stack: ["HTML", "CSS", "JavaScript"],
    platform: "Web",
    year: "",
    sections: [],
    metrics: [],
    gallery: [],
  },
  {
    slug: "rubiks",
    name: "Rubik's Cube Solver",
    tagline: "3D trainer in Three.js",
    tags: ["React", "Three.js"],
    frame: rubiksFrame,
    tint: "#151515",
    github: "https://github.com/RJoshi141/RubiksMaster",
    summary: "Interactive 3D Rubik's Cube visualizer and trainer built with React and Three.js.",
    role: "Solo",
    stack: ["React", "Three.js"],
    platform: "Web",
    year: "",
    sections: [],
    metrics: [],
    gallery: [],
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    tagline: "This site, previous version",
    tags: ["React", "Tailwind", "Framer Motion"],
    frame: portfolioFrame,
    tint: "#17120f",
    github: "https://github.com/RJoshi141/portfolio-v2",
    summary: "Personal site with a chatbot, physics-based 3D lanyard, light/dark mode, and motion.",
    role: "Solo",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"],
    platform: "Web",
    year: "",
    sections: [],
    metrics: [],
    gallery: [],
  },
];

export const featured = projects.filter((p) => p.featured);
export const selected = projects.filter((p) => !p.featured);
export const findProject = (slug) => projects.find((p) => p.slug === slug);
