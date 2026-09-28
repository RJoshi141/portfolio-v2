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
import joydropLoginBefore from "../../assets/case-studies/joydrop/login-before-web.png";
import joydropLoginAfter from "../../assets/case-studies/joydrop/login-after-ios.png";
import joydropCommunitiesBefore from "../../assets/case-studies/joydrop/communities-before.png";
import joydropCommunitiesAfter from "../../assets/case-studies/joydrop/communities-after.png";
import joydropFeedPoster from "../../assets/case-studies/joydrop/feed-poster-first-frame.jpg";
import joydropFeedMp4 from "../../assets/case-studies/joydrop/feed-demo.mp4";
import joydropQuestionnaireMp4 from "../../assets/case-studies/joydrop/onboarding-questionnaire.mp4";
import joydropQuestionnairePoster from "../../assets/case-studies/joydrop/onboarding-questionnaire-poster.jpg";
import joydropTourMp4 from "../../assets/case-studies/joydrop/onboarding-tour.mp4";
import joydropTourPoster from "../../assets/case-studies/joydrop/onboarding-tour-poster.jpg";
import joydropOnboardingBefore from "../../assets/case-studies/joydrop/onboarding-before.png";
import macbookFrame from "../../assets/case-studies/macbook-frame.png";
import joydropWebMp4 from "../../assets/case-studies/joydrop/web-demo.mp4";
import joydropWebPoster from "../../assets/case-studies/joydrop/web-demo-poster.jpg";
import iphoneLandscapeFrame from "../../assets/case-studies/iphone-landscape-frame.png";
import zoomiesGameplayMp4 from "../../assets/case-studies/zoomies/gameplay.mp4";
import zoomiesGameplayPoster from "../../assets/case-studies/zoomies/gameplay-poster.jpg";
import zoomiesStartMp4 from "../../assets/case-studies/zoomies/start.mp4";
import zoomiesStartPoster from "../../assets/case-studies/zoomies/start-poster.jpg";
import zoomiesSplashMp4 from "../../assets/case-studies/zoomies/splash.mp4";
import zoomiesSplashPoster from "../../assets/case-studies/zoomies/splash-poster.jpg";
import zoomiesMenuMp4 from "../../assets/case-studies/zoomies/menu.mp4";
import zoomiesMenuPoster from "../../assets/case-studies/zoomies/menu-poster.jpg";
import zoomiesSpriteIdle from "../../assets/case-studies/zoomies/sprite-idle.png";
import zoomiesSpriteRun from "../../assets/case-studies/zoomies/sprite-run.png";
import zoomiesSpriteBark from "../../assets/case-studies/zoomies/sprite-bark.png";
import zoomiesSpriteHurt from "../../assets/case-studies/zoomies/sprite-hurt.png";
import zoomiesSpriteJump from "../../assets/case-studies/zoomies/sprite-jump.png";
import zoomiesSpriteDie from "../../assets/case-studies/zoomies/sprite-die.png";
import zoomiesSpriteSit from "../../assets/case-studies/zoomies/sprite-sit.png";
import zArtCloud1 from "../../assets/case-studies/zoomies/art/cloud1.png";
import zArtCloud2 from "../../assets/case-studies/zoomies/art/cloud2.png";
import zArtCloud3 from "../../assets/case-studies/zoomies/art/cloud3.png";
import zArtLog from "../../assets/case-studies/zoomies/art/wooden-log.png";
import zArtBone from "../../assets/case-studies/zoomies/art/dog-bone.png";
import zArtBoneYellow from "../../assets/case-studies/zoomies/art/dog-bone-yellow.png";
import zArtHeart from "../../assets/case-studies/zoomies/art/heart.png";
import zArtSkull from "../../assets/case-studies/zoomies/art/health-skull.png";
import zArtResume from "../../assets/case-studies/zoomies/art/resume-button.png";
import zArtRules from "../../assets/case-studies/zoomies/art/rules-button.png";
import zArtCredits from "../../assets/case-studies/zoomies/art/credits-button.png";
import zArtExit from "../../assets/case-studies/zoomies/art/exit-button.png";
import zArtMenu from "../../assets/case-studies/zoomies/art/menu-button.png";
import joydropNotifLock from "../../assets/case-studies/joydrop/notifications-lockscreen.jpg";
import joydropNotifBanner from "../../assets/case-studies/joydrop/notifications-banner.jpg";
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
    // Work case study; first card in the home rail (also linked from the Joydrop role on About)
    // TODO: add screenshots (image/images on any section) and fill the bracketed bits
    slug: "joydrop",
    name: "Joydrop",
    featured: true,
    tags: ["iOS", "Web"],
    tint: "#1a1a1a",
    // home rail card: web app recording playing inside a MacBook
    cardDemo: { frame: macbookFrame, mp4: joydropWebMp4, poster: joydropWebPoster },
    tagline: "Joy, uncontained.",
    summary: "Joydrop helps people recognize each other and keep those moments. I took it from a web product to a shipped iOS app, redesigned the UI along the way, and built Communities end to end.",
    // teammates: add `photo: someImport` to swap initials for a headshot
    team: [
      { name: "Dina-Marie Lam", linkedin: "https://www.linkedin.com/in/dina-marie-lam/" },
      { name: "Lalitha Pullabhatla", linkedin: "https://www.linkedin.com/in/lalithapullabhatla/" },
      { name: "Rachandeep Kaur", linkedin: "https://www.linkedin.com/in/rachandeep-kaur/" },
    ],
    role: "Founding Product Engineer",
    platform: "iOS, Web",
    year: "2025 – Now",
    site: "https://app.joydrop.me/",
    // iPhone at the top of the case study, right before "The product"
    // feed scroll + comments, 14s loop; poster is its first frame so the start is seamless
    phoneDemo: { frame: iphoneFrame, mp4: joydropFeedMp4, poster: joydropFeedPoster },
    siteLabel: "joydrop.me",
    stack: ["Expo", "React Native", "NestJS", "Next.js", "Firebase", "EAS"],
    sections: [
      {
        heading: "The product",
        body: [
          "A friend shows up for you. A coworker handles something hard. You notice, you mean to say something, and the moment passes. Joydrop catches it: find the person, say the thing, send. It takes about 30 seconds, and they keep it for good.",
          "It's not a feed and it's not a group chat, so nothing competes with the message. Communities give a team, club, or friend group a shared record of who showed up and how.",
        ],
      },
      {
        heading: "Getting to iOS",
        body: [
          "Joydrop started on the web. Getting it onto phones meant an Expo app, and a few native problems standing between us and real devices.",
          "I fixed 4+ iOS build and toolchain blockers (Xcode signing, CocoaPods, compiler bugs) so QA could run on real hardware, then set up EAS and CI/CD and released builds to TestFlight myself.",
        ],
      },
      {
        heading: "Redesigning the UI",
        // TODO: rewrite in your words
        body: [
          "The first version was the web app squeezed onto a phone: a white screen, a stock blue button, and a generic welcome that could belong to any product.",
          "For iOS I rebuilt it on the new brand system: a warm near-black canvas, Fraunces for headlines, Space Mono for labels and inputs, and Volt, a single electric violet, as the only accent. The copy follows the brand voice too. \"Seen starts here.\" says what the app is for before you've even logged in.",
        ],
        // brand swatches + type specimen, rendered under the before/after
        brand: {
          colors: [
            { name: "Dark", hex: "#0D0B09", note: "Background" },
            { name: "Ink", hex: "#1C1612", note: "Surfaces" },
            { name: "Volt", hex: "#7B2FFF", note: "The only accent" },
            { name: "White", hex: "#F5F0E8", note: "Warm white" },
            { name: "Grain", hex: "#C9B99A", note: "Metadata" },
            { name: "Ash", hex: "#8A7F74", note: "Body on dark" },
          ],
        },
        // before/after side by side, each on its own grey panel
        images: [
          { src: joydropLoginBefore, tall: true, inset: "w-[90%] h-[86%]", caption: "Before. The web app's login, viewed on a phone." },
          { src: joydropLoginAfter, tall: true, inset: "w-[90%] h-[86%]", caption: "After. The native iOS login." },
        ],
      },
      {
        heading: "Onboarding",
        // TODO: rewrite in your words
        body: [
          "I added two pieces to onboarding. Before sign-up, a short questionnaire asks about the last time you saw someone do something great, and where that recognition usually ends up. By the time you reach the login screen, you already know why Joydrop exists. After sign-up, a 30-second tour walks you through the feed, sending your first Joydrop, and finding a community to join.",
        ],
        // before: the old four-slide carousel (web + mobile), shown above the new recordings
        image: joydropOnboardingBefore,
        inset: "w-[78%] h-[76%]",
        caption: "Before. Four swipeable slides shared by web and mobile, each explaining a feature before you'd used the app.",
        // after: two recordings, each in its own grey box
        phones: [
          { frame: iphoneFrame, mp4: joydropQuestionnaireMp4, poster: joydropQuestionnairePoster, caption: "After. The questionnaire: a few quick questions that answer the why before you sign up." },
          { frame: iphoneFrame, mp4: joydropTourMp4, poster: joydropTourPoster, caption: "After. The app tour: coach marks for the feed, sending a Joydrop, and joining a community." },
        ],
      },
      {
        heading: "Shipping Communities",
        body: "Communities let people create public or private groups, invite others, and handle join requests on their own. I built it end to end, from the backend to the screens.",
        list: [
          "Public and private groups",
          "Invites",
          "Join requests the group can manage itself",
        ],
        // before (old web UI) then after (new iOS UI), each full width with a caption
        // TODO: rewrite captions in your words
        media: [
          {
            src: joydropCommunitiesBefore,
            inset: "w-[94%] h-[90%]",
            caption: "Before. The first version of Communities: browse your groups and recommended ones, create a community with an icon, description and public or private vibe, accept the guidelines to send it for admin approval, then see it in My Communities. Deleting asks for confirmation and spells out what gets removed.",
          },
          {
            src: joydropCommunitiesAfter,
            inset: "w-[90%] h-[88%]",
            caption: "After. The same flow on iOS in the new brand. An empty state that points you to Discover Communities, a create sheet with default icons and a 20-character name limit, communities as cards with Send joydrop right on them, and a delete sheet that also covers pending invites.",
          },
        ],
      },
      {
        heading: "Notifications",
        // TODO: rewrite in your words
        body: [
          "Push notifications with Expo and NestJS across 8+ trigger types, shipped alongside the iOS release.",
          "Each trigger has its own title so you can tell what happened without opening the app: a Joydrop received, a new post in one of your communities, a community invite, a connection request, or a reply to your comment.",
        ],
        // real device screenshots in iPhone frames, each in its own grey box
        phones: [
          { frame: iphoneFrame, poster: joydropNotifLock, caption: "Grouped on the lock screen: Joydrops, community posts, invites, connection requests, and replies." },
          { frame: iphoneFrame, poster: joydropNotifBanner, caption: "The first test push landing as a banner outside the app, with the badge count on the icon." },
        ],
      },
    ],
    metrics: [
      { value: "~30%", label: "Faster app performance" },
      { value: "8+", label: "Push notification triggers" },
      { value: "4+", label: "iOS build blockers fixed" },
    ],
    gallery: [],
  },
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
    // gameplay loop in a landscape iPhone at the top of the case study
    landscapeDemo: { frame: iphoneLandscapeFrame, mp4: zoomiesGameplayMp4, poster: zoomiesGameplayPoster },
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
        // the rest of the game's screens, each in its own box
        // TODO: rewrite captions in your words
        landscapes: [
          { frame: iphoneLandscapeFrame, mp4: zoomiesSplashMp4, poster: zoomiesSplashPoster, caption: "Splash. The pixel dog and wordmark on launch." },
          { frame: iphoneLandscapeFrame, mp4: zoomiesStartMp4, poster: zoomiesStartPoster, caption: "Tap to start. Five hearts, a distance counter, and a bone to grab back a heart." },
          { frame: iphoneLandscapeFrame, mp4: zoomiesMenuMp4, poster: zoomiesMenuPoster, caption: "Menu and rules. Resume, rules, credits, and exit, all in custom pixel buttons." },
        ],
      },
      {
        heading: "The sprites",
        // TODO: rewrite in your words
        body: [
          "Every frame of the dog is drawn by hand on a 48 by 48 pixel grid, one strip per action.",
          "In the game, each strip is sliced into SpriteKit textures at runtime and played with its own timing. Filtering is set to nearest so the pixels stay sharp at any size, the same way they play below.",
        ],
        // frame counts and timings match GameScene.swift
        sprites: [
          { name: "Idle", src: zoomiesSpriteIdle, frames: 16, ms: 120, note: "Waiting on the start screen, tail going." },
          { name: "Run", src: zoomiesSpriteRun, frames: 8, ms: 65, note: "The main loop, fast enough to feel like a sprint." },
          { name: "Jump", src: zoomiesSpriteJump, frames: 7, ms: 40, note: "A quick leap over the log while the dog arcs up and back down." },
          { name: "Bark", src: zoomiesSpriteBark, frames: 13, ms: 120, note: "Plays beside the Zoomies title on the splash screen." },
          { name: "Hurt", src: zoomiesSpriteHurt, frames: 4, ms: 50, note: "Flashes red when the dog hits a log and loses a heart." },
          { name: "Die", src: zoomiesSpriteDie, frames: 8, ms: 120, hold: 1000, note: "Out of hearts: a stumble and a flop before the game over screen." },
          { name: "Sit", src: zoomiesSpriteSit, frames: 9, ms: 90, note: "Keeps you company on the credits screen." },
        ],
      },
      {
        heading: "The world",
        // TODO: rewrite in your words
        body: [
          "The background is deliberately plain: one flat sky blue, a thick black road line, and nothing else fighting the dog for attention.",
          "Clouds give the scene depth without clutter. There are three hand-drawn shapes, and the bigger they are, the further back they sit. Each one drifts across in 40 to 60 seconds with a slow 4px bob, so the sky feels alive while the road keeps its speed.",
        ],
        assets: [
          { src: zArtCloud1, label: "Cloud 1", note: "Front · 1.8x" },
          { src: zArtCloud2, label: "Cloud 2", note: "Middle · 2.3x" },
          { src: zArtCloud3, label: "Cloud 3", note: "Back · 2.8x" },
        ],
      },
      {
        heading: "Obstacles and pickups",
        // TODO: rewrite in your words
        body: [
          "There is one thing to avoid and one thing to chase. A new log rolls in every 3 to 4 seconds, and each one crosses the screen at its own random speed, so the rhythm never settles into a pattern you can tap along to.",
          "Bones float at a fixed height above the road, so the only way to grab one is to jump for it. Each bone flashes yellow and gives back a heart, up to a max of five. Lose them all and the health bar turns into a skull.",
        ],
        assets: [
          { src: zArtLog, label: "Log", note: "Obstacle · −1 heart" },
          { src: zArtBone, label: "Bone", note: "Pickup · +1 heart" },
          { src: zArtBoneYellow, label: "Bone, collected", note: "2 quick blinks" },
          { src: zArtHeart, label: "Heart", note: "Up to 5" },
          { src: zArtSkull, label: "Skull", note: "Out of hearts" },
        ],
      },
      {
        heading: "Physics",
        // TODO: rewrite in your words
        body: "Zoomies doesn't simulate much, on purpose. Nothing actually collides or falls. SpriteKit's physics engine is only there to report contacts, and the dog's movement is choreographed so every jump feels the same.",
        steps: [
          {
            label: "Contacts, not collisions",
            text: "Each body gets a category bit: dog 1, logs 2, bones 4. The dog listens for contact with 2 and 4 but has a collision mask of 0, so nothing ever shoves it around.",
            file: "GameScene.swift",
            code: String.raw`dog.physicsBody?.affectedByGravity = false
dog.physicsBody?.categoryBitMask = 1
dog.physicsBody?.contactTestBitMask = 2 | 4   // logs + bones
dog.physicsBody?.collisionBitMask = 0`,
          },
          {
            label: "Forgiving hitboxes",
            text: "Hitboxes are much smaller than the art: about a third of the dog, and roughly 60% of a log. A near miss that looks like a miss counts as a miss.",
            file: "GameScene.swift",
            code: String.raw`dog.physicsBody = SKPhysicsBody(rectangleOf: CGSize(width: dog.size.width / 2.8,
                                                    height: dog.size.height / 3))

log.physicsBody = SKPhysicsBody(rectangleOf: CGSize(width: log.size.width / 1.6,
                                                    height: log.size.height / 1.8))`,
          },
          {
            label: "A scripted jump",
            text: "Instead of gravity, the jump is an arc: up 110px in half a second, back down in 0.3s, with the 7-frame jump sprite playing on top. Same height, same timing, every tap.",
            file: "GameScene.swift",
            code: String.raw`let jumpAnimation = SKAction.animate(with: jumpFrames, timePerFrame: 0.04)
let moveUp = SKAction.moveBy(x: 0, y: 110, duration: 0.5)
let moveDown = SKAction.moveBy(x: 0, y: -105, duration: 0.3)

let jumpMotion = SKAction.sequence([moveUp, moveDown])
let jumpGroup = SKAction.group([jumpAnimation, jumpMotion])`,
          },
          {
            label: "One place to decide",
            text: "Every contact lands in didBegin. It finds which body is the dog, then either hurts it and clears the log, or collects the bone.",
            file: "GameScene.swift",
            code: String.raw`func didBegin(_ contact: SKPhysicsContact) {
    let otherBody: SKPhysicsBody
    if contact.bodyA.categoryBitMask == 1 {
        otherBody = contact.bodyB
    } else if contact.bodyB.categoryBitMask == 1 {
        otherBody = contact.bodyA
    } else {
        return
    }

    if otherBody.categoryBitMask == 2 {          // log
        startHurt()
        otherBody.node?.removeFromParent()
    } else if otherBody.categoryBitMask == 4 {   // bone
        if let node = otherBody.node { handleBoneCollected(node) }
    }
}`,
          },
        ],
      },
      {
        heading: "Color and restraint",
        // TODO: rewrite in your words, especially the why
        body: [
          "Arcade runners live or die on readability. You have a split second to spot a log, so the palette does the sorting for you: a cool, flat sky; a warm brown dog; darker browns and a hint of green on the logs; red only for health; and yellow only when something good happens.",
          "Keeping the game small was the point. One tap to jump, one thing to dodge, one thing to collect. Every extra rule would have been one more thing to explain on a phone held sideways.",
        ],
        brand: {
          colors: [
            { name: "Sky", hex: "#87CFFA", note: "Flat background" },
            { name: "Road", hex: "#000000", note: "Ground line" },
            { name: "Coat", hex: "#875E48", note: "The dog" },
            { name: "Log", hex: "#6B421E", note: "Obstacles" },
            { name: "Heart", hex: "#CC121C", note: "Health only" },
            { name: "Glow", hex: "#FFD600", note: "Rewards only" },
          ],
        },
        assets: [
          { src: zArtMenu, label: "Menu" },
          { src: zArtResume, label: "Resume" },
          { src: zArtRules, label: "Rules" },
          { src: zArtCredits, label: "Credits" },
          { src: zArtExit, label: "Exit" },
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

export const featured = projects.filter((p) => p.featured && !p.hidden);
export const selected = projects.filter((p) => !p.featured && !p.hidden);
export const findProject = (slug) => projects.find((p) => p.slug === slug);
