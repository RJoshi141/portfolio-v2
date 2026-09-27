// Single source of truth for work cards + case study pages.
// Fill in anything marked TODO; empty fields are hidden on the case study page.
// Case study shape:
//   hero?: img or video (defaults to frame); demo?: { frame, mp4, webm } plays a recording inside a device frame
//   sections[{ heading, body?, list?, image? | images?[2-3] | video?, caption?, media?[{ src, label?, text?, inset?, caption? }] }]
//   (media = stacked full-width figures, e.g. sketch v1, v2, v3; optional inset like "w-[64%] h-[64%]" sizes the image)
//   metrics[{ value, label }], gallery[img]
import utterFrame from "../../assets/project-frames/utter-watch-ultra.png";
import utterSketchV1 from "../../assets/case-studies/utter/sketch-v1-idle.png";
import utterSketchV2 from "../../assets/case-studies/utter/sketch-v2-recording.png";
import utterSketchV3 from "../../assets/case-studies/utter/sketch-v3-review.png";
import utterSketchFinal from "../../assets/case-studies/utter/sketch-final.png";
import watchUltraFrame from "../../assets/case-studies/watch-ultra-frame.png";
import utterDemoMp4 from "../../assets/case-studies/utter/watch-demo.mp4";
import utterDemoWebm from "../../assets/case-studies/utter/watch-demo.webm";
import utterPhoneOnboarding from "../../assets/case-studies/utter/iphone-onboarding.png";
import utterPhoneRecord from "../../assets/case-studies/utter/iphone-record.png";
import utterPhoneInbox from "../../assets/case-studies/utter/iphone-inbox.png";
import utterWatchIntro from "../../assets/case-studies/utter/watch-intro-3up.png";
import utterWatchRecordReview from "../../assets/case-studies/utter/watch-final-record-review.png";
import utterWatchSyncConfirm from "../../assets/case-studies/utter/watch-final-sync-confirm.png";
import iphoneFrame from "../../assets/case-studies/iphone-frame.png";
import utterPhoneMp4 from "../../assets/case-studies/utter/iphone-demo.mp4";
import utterPhoneWebm from "../../assets/case-studies/utter/iphone-demo.webm";
import zoomiesFrame from "../../assets/project-frames/zoomies-iphone.png";
import cinemateFrame from "../../assets/project-frames/cinemate-ipad.png";
import harmoniFrame from "../../assets/project-frames/harmoni-frames.png";
import portfolioFrame from "../../assets/project-frames/potfolio-frames.png";
import rubiksFrame from "../../assets/project-frames/rubiks-mac.png";
import lumonFrame from "../../assets/project-frames/lumon-imac.png";

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
    // looping screen recording shown in a Watch Ultra frame at the top of the case study
    // still shown first, before the looping demos
    intro: {
      src: utterWatchIntro,
      // TODO: rewrite in your words
      caption: "Discovery. Utter lives in the watch app grid as an amber U, launches in a beat, and opens on an intro screen that explains the whole idea in three lines: hold to record, send it to your iPhone, and it's transcribed and sorted.",
    },
    demo: {
      frame: watchUltraFrame, mp4: utterDemoMp4, webm: utterDemoWebm,
      phone: { frame: iphoneFrame, mp4: utterPhoneMp4, webm: utterPhoneWebm },
    },
    year: "", // TODO
    stack: ["Swift", "SwiftUI", "WatchConnectivity", "AVFoundation", "SFSpeechRecognizer"],
    // shown right under the demos: how a voice memo gets from the watch into the iPhone inbox
    // TODO: rewrite the text in your words; code is trimmed from the Utter repo
    flow: {
      heading: "From wrist to inbox",
      body: "A thought starts as audio on the watch and ends up as sorted text on the phone. Five steps get it there.",
      steps: [
        {
          label: "Record on the watch",
          text: "AVAudioRecorder writes a small mono AAC file. 12 kHz is plenty for speech and keeps the file light for the trip to the phone. Metering drives the live waveform.",
          file: "WatchAudioRecorder.swift",
          code: String.raw`let url = FileManager.default.temporaryDirectory
    .appendingPathComponent("utter-\(UUID().uuidString).m4a")

let settings: [String: Any] = [
    AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
    AVSampleRateKey: 12000,
    AVNumberOfChannelsKey: 1
]

let recorder = try AVAudioRecorder(url: url, settings: settings)
recorder.isMeteringEnabled = true
recorder.record()`,
        },
        {
          label: "Send it over WatchConnectivity",
          text: "Tapping send hands the file to WCSession. transferFile queues it and the system delivers it in the background, so you can drop your wrist and move on.",
          file: "UtterWatchApp.swift",
          code: String.raw`func sendAudioFile(_ url: URL) {
    guard WCSession.default.isReachable else {
        statusText = "iPhone not reachable"
        return
    }
    WCSession.default.transferFile(url, metadata: ["type": "audio"])
}`,
        },
        {
          label: "Catch it on the iPhone",
          text: "The phone's session delegate receives the file. The incoming copy gets cleaned up once the delegate returns, so it's moved into Documents/utter-recordings right away.",
          file: "UtterApp.swift",
          code: String.raw`func session(_ session: WCSession, didReceive file: WCSessionFile) {
    let folder = docs.appendingPathComponent("utter-recordings")
    try FileManager.default.createDirectory(at: folder,
                                            withIntermediateDirectories: true)

    let destination = folder.appendingPathComponent(file.fileURL.lastPathComponent)
    try FileManager.default.copyItem(at: file.fileURL, to: destination)
}`,
        },
        {
          label: "Transcribe",
          text: "Import from Apple Watch grabs the newest recording and runs it through the Speech framework as a file request, waiting for the final result instead of partials.",
          file: "SpeechManager.swift",
          code: String.raw`let request = SFSpeechURLRecognitionRequest(url: url)
request.shouldReportPartialResults = false

task = recognizer.recognitionTask(with: request) { result, error in
    if let result, result.isFinal {
        completion(result.bestTranscription.formattedString)
    }
}`,
        },
        {
          label: "Sort into a category",
          text: "A simple keyword pass picks Reminder, Todo, Idea, or Note. You can change it on the review sheet, then the memo is saved as Codable JSON and shows up in the inbox.",
          file: "ContentView.swift",
          code: String.raw`func detectedCategory(for text: String) -> String {
    let lower = text.lowercased()

    if lower.contains("remind me") || lower.contains("tomorrow") {
        return "reminder"
    } else if lower.contains("buy") || lower.contains("pick up") {
        return "todo"
    } else if lower.contains("idea") || lower.contains("what if") {
        return "idea"
    }
    return "note"
}`,
        },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body: "Ideas show up at bad times. Pulling out a phone, unlocking it, and opening a notes app is enough friction to lose the thought.",
      },
      {
        heading: "Early sketches",
        // TODO: rewrite these in your words
        body: "Before writing any code I sketched the three moments that matter on the wrist: before you speak, while you're speaking, and right after.",
        // compact rows: label + note left, sketch right (optional inset sizes the sketch in its panel)
        media: [
          {
            label: "v1 · Idle screen",
            text: "Three ways to start a memo: tap anywhere, hold a button with the inbox one tap away, or hold a mic with the inbox a scroll below. Hold to record won. Pressing to talk and letting go to finish felt like the most natural gesture on a watch.",
            src: utterSketchV1,
            inset: "w-[70%] h-[64%]",
          },
          {
            label: "v2 · Recording state",
            text: "Once you're talking, the screen has one job: confirm it's listening and tell you how to stop. I tried waveform bars, a circular timer ring, and a pulsing dot. The waveform shipped because it shows the watch is actually hearing you, with the timer and release hint right underneath.",
            src: utterSketchV2,
            inset: "w-[70%] h-[64%]",
          },
          {
            label: "v3 · Review screen",
            text: "What happens after you let go? I sketched an explicit review step with play, trash, and save; a swipe left or right to keep or discard; and a confirmation that skips review and just shows the memo landed on your iPhone, already tagged with a category.",
            src: utterSketchV3,
            inset: "w-[70%] h-[64%]",
          },
          {
            label: "Final direction",
            text: "Putting it together: a quiet idle screen that just says hold to speak, a waveform and timer while you talk, a quick review to play, trash, or send, and a confirmation that it landed on your iPhone with one tap to record again.",
            src: utterSketchFinal,
          },
        ],
      },
      {
        heading: "Design",
        // TODO: rewrite in your words
        body: [
          "Utter lives on a dark canvas so it feels at home next to watchOS, where black is the default and the screen melts into the bezel. One warm amber accent does all the pointing: the mic, the Inbox button, Get Started. If it's yellow, it's the thing to tap.",
          "Color is saved for meaning. Each category gets its own: green for Todo, orange for Reminder, purple for Idea, blue for Note. The same colors show up as chips during onboarding and as full cards in the inbox, so you learn the system once and read it at a glance.",
          "Every screen has one job. The record screen is mostly empty space around one big target, because you're usually grabbing it mid-thought. Big bold titles and quiet grey secondary text carry the hierarchy, so nothing needs extra decoration.",
        ],
      },
      {
        // iPhone screens in one row, each on its own grey panel with a note underneath
        key: "iphone-screens",
        inset: "w-[92%] h-[92%]",
        images: [
          { src: utterPhoneOnboarding, caption: "Onboarding. First launch explains the loop: record on your wrist, transcribe on your phone, and every memo lands in one of four categories." },
          { src: utterPhoneRecord, caption: "Record. Hold the mic to capture a thought right on the phone, or import your latest Apple Watch recording and transcribe it." },
          { src: utterPhoneInbox, caption: "Inbox. Memos get sorted into Todo, Reminder, Idea, and Note, with counts and completed items at a glance." },
        ],
      },
      {
        heading: "Final watch app",
        // TODO: rewrite in your words
        body: "Where the sketches ended up. Four states, one gesture: hold to talk, let go to review, tap to send.",
        // both final frames side by side, each on its own grey panel with a note underneath
        images: [
          {
            src: utterWatchRecordReview,
            inset: "w-[80%] h-[60%]",
            caption: "Record and review. The idle screen is just a mic that breathes. Holding it swaps in a live waveform and timer, and letting go lands on a review screen to play it back, trash it, or send it to your iPhone.",
          },
          {
            src: utterWatchSyncConfirm,
            inset: "w-[62%] h-[58%]",
            caption: "Sync and confirm. A spinner while WatchConnectivity hands the file off, then a clear Sent to iPhone with one tap to record the next thought.",
          },
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
