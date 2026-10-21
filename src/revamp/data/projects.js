// Single source of truth for work cards + case study pages.
// Fill in anything marked TODO; empty fields are hidden on the case study page.
// Case study shape:
//   hero?: img or video (defaults to frame); demo?: { frame, mp4, webm } plays a recording inside a device frame
//   sections[{ heading, body?, list?, image? | images?[2-3] | video?, caption?, media?[{ src, label?, text?, inset?, caption? }] }]
//   (media = stacked full-width figures, e.g. sketch v1, v2, v3; optional inset like "w-[64%] h-[64%]" sizes the image)
//   metrics[{ value, label }], gallery[img]
import utterFrame from "../../assets/project-frames/utter-watch-ultra.png";
import duoFoldMp4 from "../../assets/case-studies/duo/duo-fold.mp4";
import duoFoldPoster from "../../assets/case-studies/duo/duo-fold-poster.jpg";
import duoCardMp4 from "../../assets/case-studies/duo/duo-fold-card.mp4";
import duoCardPoster from "../../assets/case-studies/duo/duo-fold-card-poster.jpg";
import layerCard from "../../assets/case-studies/layer/card-3d.png";
import layerHero3phones from "../../assets/case-studies/layer/hero-3phones.png";
import layerShelf from "../../assets/case-studies/layer/shelf.png";
import layerProduct from "../../assets/case-studies/layer/product.png";
import layerRoutine from "../../assets/case-studies/layer/routine.png";
import layerOnboarding from "../../assets/case-studies/layer/onboarding.png";
import layerHomescreen from "../../assets/case-studies/layer/homescreen.png";
import layerWidget from "../../assets/case-studies/layer/widget.png";
import layerIcons from "../../assets/case-studies/layer/icons.png";
import layerScanMp4 from "../../assets/case-studies/layer/scan-moisturizer.mp4";
import layerScanPoster from "../../assets/case-studies/layer/scan-moisturizer-poster.jpg";
import layerTourMp4 from "../../assets/case-studies/layer/intro-tour.mp4";
import layerTourPoster from "../../assets/case-studies/layer/intro-tour-poster.jpg";
import layerVoiceMp4 from "../../assets/case-studies/layer/voice-checkin.mp4";
import layerVoicePoster from "../../assets/case-studies/layer/voice-checkin-poster.jpg";
import layerReviewMp4 from "../../assets/case-studies/layer/routine-review.mp4";
import layerReviewPoster from "../../assets/case-studies/layer/routine-review-poster.jpg";
import layerEmptyShelf from "../../assets/case-studies/layer/empty-shelf.jpg";
import layerEmptyRoutine from "../../assets/case-studies/layer/empty-routine.jpg";
import evenCard from "../../assets/case-studies/even/card-3d.png";
import evenHero from "../../assets/case-studies/even/hero-3d.jpg";
import evenHeroMp4 from "../../assets/case-studies/even/hero-flyin.mp4";
import evenHeroPoster from "../../assets/case-studies/even/hero-flyin-poster.jpg";
import evenIcons from "../../assets/case-studies/even/icons.png";
import evenRoute from "../../assets/case-studies/even/route.png";
import evenTripInfo from "../../assets/case-studies/even/trip-info.png";
import evenDirections from "../../assets/case-studies/even/directions.png";
import evenInspect from "../../assets/case-studies/even/inspect.png";
import evenSlopeLayer from "../../assets/case-studies/even/slope-layer.png";
import evenLegend from "../../assets/case-studies/even/legend.png";
import evenProfiles from "../../assets/case-studies/even/profiles.png";
import evenAppStartMp4 from "../../assets/case-studies/even/app-start-2.mp4";
import evenAppStartPoster from "../../assets/case-studies/even/app-start-2-poster.jpg";
import evenChangeLocationMp4 from "../../assets/case-studies/even/change-location.mp4";
import evenChangeLocationPoster from "../../assets/case-studies/even/change-location-poster.jpg";
import evenPickLocationMp4 from "../../assets/case-studies/even/pick-location-2.mp4";
import evenPickLocationPoster from "../../assets/case-studies/even/pick-location-2-poster.jpg";
import utterHeroMp4 from "../../assets/case-studies/utter/hero-watch-3.mp4";
import utterHeroPoster from "../../assets/case-studies/utter/hero-watch-3-poster.jpg";
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
import joydropFeedPoster from "../../assets/case-studies/joydrop/app-scroll-poster.jpg";
import joydropFeedMp4 from "../../assets/case-studies/joydrop/app-scroll.mp4";
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
import joydropNotifLock from "../../assets/case-studies/joydrop/notifications-lockscreen.jpg";
import joydropNotifBanner from "../../assets/case-studies/joydrop/notifications-banner.jpg";
import joydropInappForYou from "../../assets/case-studies/joydrop/inapp-foryou.jpg";
import joydropInappBeforeList from "../../assets/case-studies/joydrop/inapp-before-list.jpg";
import joydropSearchBefore from "../../assets/case-studies/joydrop/search-before.jpg";
import joydropSearchAfter from "../../assets/case-studies/joydrop/search-after.jpg";
import watchUltraCase from "../../assets/case-studies/watch-ultra-case.png";
import zoomiesPixilartMp4 from "../../assets/case-studies/zoomies/pixilart.mp4";
import zoomiesPixilartPoster from "../../assets/case-studies/zoomies/pixilart-poster.jpg";
import joydropHomeBefore from "../../assets/case-studies/joydrop/home-before.png";
import joydropHomeFeed from "../../assets/case-studies/joydrop/home-after-feed.jpg";
import joydropHomeHighlight from "../../assets/case-studies/joydrop/home-after-highlight.jpg";
import joydropHomeComments from "../../assets/case-studies/joydrop/home-after-comments.jpg";
import joydropCardPhones from "../../assets/project-frames/joydrop-phones.png";
import joydropHero from "../../assets/case-studies/joydrop/hero-3phones.png";
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
    // card: two tilted phones render (home feed + highlight)
    frame: joydropCardPhones,
    // cardDemo: { kind: "phone", frame: iphoneFrame, mp4: joydropFeedMp4, poster: joydropFeedPoster },
    // cardDemo: { frame: macbookFrame, mp4: joydropWebMp4, poster: joydropWebPoster },
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
    // top of the case study: three-phone render; the app scroll video now sits in "The product"
    // three floating phones on a transparent background, sitting right on the page (no grey panel)
    hero: joydropHero,
    heroBare: true,
    heroInset: "w-full h-full",
    siteLabel: "joydrop.me",
    stack: ["Expo", "React Native", "NestJS", "Next.js", "Firebase", "EAS"],
    sections: [
      {
        heading: "The product",
        body: [
          "A friend shows up for you. A coworker handles something hard. You notice, you mean to say something, and the moment passes. Joydrop catches it: find the person, say the thing, send. It takes about 30 seconds, and they keep it for good.",
          "It's not a feed and it's not a group chat, so nothing competes with the message. Communities give a team, club, or friend group a shared record of who showed up and how.",
        ],
        // text and phone share one row
        phoneBeside: true,
        phoneDemo: { frame: iphoneFrame, mp4: joydropFeedMp4, poster: joydropFeedPoster },
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
          { src: joydropLoginBefore, tall: true, inset: "w-[90%] h-[90%]", caption: "Before. The web app's login, viewed on a phone." },
          { src: joydropLoginAfter, tall: true, inset: "w-[90%] h-[90%]", caption: "After. The native iOS login." },
        ],
      },
      {
        heading: "Home feed",
        // TODO: rewrite in your words
        body: [
          "The home feed is where most Joydrops get read, so it got the biggest rework. The Figma version had a separate Highlights carousel sitting on top of the feed, which pushed the actual posts below the fold.",
          "On iOS the feed leads with the posts. A dropdown switches between For You and Highlight, and highlighted Joydrops fill the card in violet instead of living in their own row. Cards sit at a slight tilt like notes pinned to a board, messages are set in monospace, and comments open in a sheet that supports GIFs and @ tags.",
        ],
        image: joydropHomeBefore,
        wide: true,
        inset: "w-[70%] h-[88%]",
        caption: "Before. The Figma design: a Highlights carousel above the feed, and comments in a plain sheet.",
        compactPhones: true,
        phones: [
          { frame: iphoneFrame, poster: joydropHomeFeed, caption: "After. The For You feed, with posts first and a quick search and send up top." },
          { frame: iphoneFrame, poster: joydropHomeHighlight, caption: "After. Highlight view: featured Joydrops fill the card in violet, with the Dots and badge they came with." },
          { frame: iphoneFrame, poster: joydropHomeComments, caption: "After. Comments with reactions, replies, GIFs, and @ tagging." },
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
        wide: true,
        inset: "w-[78%] h-[80%]",
        caption: "Before. Four swipeable slides shared by web and mobile, each explaining a feature before you'd used the app.",
        // after: two recordings, each in its own grey box
        compactPhones: true,
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
            wide: true,
            inset: "w-[94%] h-[90%]",
            caption: "Before. The first version of Communities: browse your groups and recommended ones, create a community with an icon, description and public or private vibe, accept the guidelines to send it for admin approval, then see it in My Communities. Deleting asks for confirmation and spells out what gets removed.",
          },
          {
            src: joydropCommunitiesAfter,
            wide: true,
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
        compactPhones: true,
        phones: [
          { frame: iphoneFrame, poster: joydropNotifLock, caption: "Grouped on the lock screen: Joydrops, community posts, invites, connection requests, and replies." },
          { frame: iphoneFrame, poster: joydropNotifBanner, caption: "The first test push landing as a banner outside the app, with the badge count on the icon." },
        ],
      },
      {
        heading: "In-app notifications",
        // TODO: rewrite in your words; before screens coming
        body: [
          "Inside the app, notifications split into two tabs: For You for things that happened to you, and Community for the groups you're in. Each tab is grouped into Last 7 days, Last 30 days, and a collapsible Older section, so the recent stuff stays on top.",
          "Every row puts the person or community first, with a small colored badge on the avatar that tells you what kind of notification it is at a glance: pink for a celebration, blue for a reply, green for a new connection or a welcome, red for an invite. Community names are set in the brand serif so they stand out from the monospace body, and the next step lives right on the row: send your first Joydrop to a new connection, or accept or decline an invite without opening anything.",
        ],
        compactPhones: true,
        // before (old web list) and after (new For You tab), side by side
        phones: [
          { frame: iphoneFrame, poster: joydropInappBeforeList, caption: "Before. One flat list of cards grouped by age, with the same blue buttons on every row." },
          { frame: iphoneFrame, poster: joydropInappForYou, caption: "After. Tabs for For You and Community, grouped by recency, with a colored badge for each type and the next step right on the row." },
        ],
      },
      {
        heading: "Search",
        // TODO: rewrite in your words
        body: "Search got the same treatment. It now opens as its own screen with Users and Communities tabs, and the recommendation cards keep one job each: send a Joydrop in violet, connect in black. Once you're already connected, the connect button drops away and send takes the full width.",
        compactPhones: true,
        phones: [
          { frame: iphoneFrame, poster: joydropSearchBefore, caption: "Before. A single search box above a grid of recommendations, with the same blue buttons as every other screen." },
          { frame: iphoneFrame, poster: joydropSearchAfter, caption: "After. Search by email or username, switch between Users and Communities, and act right from the card." },
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
    // work card: the watch recording playing inside the Watch Ultra frame
    cardDemo: { kind: "watch", frame: watchUltraCase, mp4: utterDemoMp4, webm: utterDemoWebm },
    tint: "#1b1712", // card background behind the device frame
    github: "https://github.com/RJoshi141/utter",
    summary:
      "Speak a thought on your Apple Watch, then find it transcribed and sorted on your iPhone.",
    role: "Solo: design, engineering",
    platform: "watchOS, iOS",
    // looping screen recording shown in a Watch Ultra frame at the top of the case study
    // still shown first, before the looping demos
    // hero: the watch turning on its band, looping (replaces the three-watch intro still)
    // recording at its own near-square shape, centered, no extra background around it
    heroVideo: { mp4: utterHeroMp4, poster: utterHeroPoster, fit: true, aspect: 1000 / 984 },
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
    slug: "layer",
    name: "Layer",
    tagline: "Ingredient-smart skincare planner",
    featured: true,
    tags: ["iOS", "Swift", "On-device AI"],
    frame: layerCard,
    tint: "#1e231d", // Layer's dark-mode card color
    // three floating phones on a transparent background, sitting right on the page (no grey panel)
    hero: layerHero3phones,
    heroBare: true,
    heroInset: "w-full h-full",
    github: "https://github.com/RJoshi141/layer",
    summary:
      "Skincare labels are dense ingredient lists in tiny type. Layer reads the bottle, explains what's inside, and builds a morning and night routine in the right order. All on the phone.",
    role: "Solo: design, engineering",
    platform: "iOS 26, widgets",
    year: "2026",
    stack: ["Swift", "SwiftUI", "SwiftData", "Vision", "Foundation Models", "SpeechAnalyzer", "WidgetKit"],
    sections: [
      {
        heading: "Why I built it",
        body: "Nobody knows which products clash, what order to use them in, or if last spring's serum is still good. The answers are on the bottle, just not in a form anyone can use.",
      },
      {
        heading: "Scan any label",
        body: "Snap the front and back. Vision reads the label, Layer finds the real product photo, cuts it out on device, and drafts everything for you to review.",
        // text and the scan recording share one row, like Joydrop's product section
        phoneBeside: true,
        phoneDemo: { frame: iphoneFrame, mp4: layerScanMp4, poster: layerScanPoster },
      },
      {
        heading: "Ingredients never touch the LLM",
        body: "A model can invent an ingredient that isn't on the bottle. A parser can't.",
        steps: [
          {
            label: "Parse",
            text: "A deterministic parser rejoins words OCR split across lines and merges lists from several photos.",
          },
          {
            label: "Match",
            text: "Each name is looked up in a 242-entry ingredient database. Unknown ones are classified from INCI naming rules.",
          },
          {
            label: "Fill the fuzzy parts",
            text: "Name, brand and type come from guided generation, typed Swift instead of JSON. Rules cover phones without Apple Intelligence.",
            file: "LabelExtractor.swift",
            code: `@Generable
struct ProductDraft {
    var name: String
    var brand: String
    @Guide(.anyOf(["cleanser", "serum", "moisturizer", "sunscreen", /* ... */]))
    var category: String
}`,
          },
          {
            label: "Review",
            text: "Nothing is saved until you've checked the draft.",
          },
        ],
      },
      {
        // one iPhone that plays the three flows in turn, with chapters beside it (desktop) or under it (phones)
        heading: "Made for your skin",
        body: "Pick a chapter or let it play through.",
        walkthrough: {
          frame: iphoneFrame,
          chapters: [
            {
              label: "Built around your skin",
              text: "A short tour, then five questions: skin type, sensitivity, concerns, actives and anything to avoid. The same ingredient list becomes advice for you.",
              mp4: layerTourMp4,
              poster: layerTourPoster,
            },
            {
              label: "Routine assistant",
              text: "An on-device model answers from your shelf through three tools and only suggests products you own. Without Apple Intelligence, rules give the same review.",
              mp4: layerReviewMp4,
              poster: layerReviewPoster,
            },
            {
              label: "Voice check-ins",
              text: "Say how your skin feels. It's transcribed on device and fills in what you used and how your skin reacted.",
              mp4: layerVoiceMp4,
              poster: layerVoicePoster,
            },
          ],
        },
        // where the tour lands: empty states that point at the next step instead of a blank screen
        compactPhones: true,
        phones: [
          { frame: iphoneFrame, poster: layerEmptyShelf, caption: "An empty shelf points straight at the first scan." },
          { frame: iphoneFrame, poster: layerEmptyRoutine, caption: "An empty routine explains what it will do once you pick products." },
        ],
      },
      {
        heading: "Routines that put themselves in order",
        body: "Products slot into layering order, thinnest to thickest. Eleven conflict rules flag clashes like retinol with acids. Rules make the safety calls; a model only explains them.",
        image: layerRoutine,
        inset: "w-[40%] h-[92%]",
      },
      {
        heading: "Tonight, without opening the app",
        body: "The widget flips between morning and night, strikes through expired products, and turns rust when something clashes. It reads a small snapshot the app shares, never the database.",
        images: [
          { src: layerWidget, inset: "w-[88%] h-[88%]", caption: "Tonight's three steps next to the app icon." },
          { src: layerHomescreen, inset: "w-[46%] h-[92%]", caption: "On the home screen." },
        ],
      },
      {
        heading: "Design",
        body: "Sage pages, forest controls and one loud lime for calls to action. Product names in Instrument Serif, with a custom line icon set.",
        brand: {
          colors: [
            { name: "Page", hex: "#F3F4EF", note: "Sage white" },
            { name: "Card", hex: "#E4E7DC", note: "Surfaces" },
            { name: "Ink", hex: "#1F261F", note: "Deep forest text" },
            { name: "Primary", hex: "#2F3D2C", note: "Controls" },
            { name: "Lime", hex: "#C4D97C", note: "Calls to action" },
            { name: "Rust", hex: "#B4602F", note: "Warnings only" },
          ],
        },
        image: layerIcons,
        inset: "w-[88%] h-[80%]",
        caption: "The custom line icon set, one per product type and step.",
      },
      {
        heading: "Privacy and cost",
        list: [
          "Everything lives on the phone. No account, no backend.",
          "OCR, extraction, speech, cutouts and the assistant all run on device.",
          "The only network calls find product photos, from free sources.",
        ],
      },
      {
        heading: "What's next",
        list: [
          "Siri: \"what's my routine tonight?\"",
          "Trends from check-ins over time.",
        ],
      },
    ],
    metrics: [],
    gallery: [],
  },
  {
    slug: "even",
    name: "Even",
    tagline: "Directions that know the hills",
    featured: true,
    tags: ["iOS", "Python", "PostGIS"],
    frame: evenCard,
    tint: "#141a2e", // deep blue behind the 3D phones
    // full-bleed 3D render with its own blue gradient background
    heroImage: evenHero,
    // the phones fly in on a loop (wins over heroImage)
    heroVideo: { mp4: evenHeroMp4, poster: evenHeroPoster },
    github: "https://github.com/RJoshi141/even",
    summary:
      "Map apps send everyone the same way. In San Francisco that can mean a 15% hill or a corner with no curb ramp. Even plans routes around how you get around, then shows you why it picked them.",
    role: "Solo: design, data, engineering",
    platform: "iOS 26",
    year: "2026",
    stack: ["SwiftUI", "MapKit", "Swift Charts", "FastAPI", "PostGIS", "pgRouting", "Python"],
    sections: [
      {
        heading: "Why I built it",
        body: "For someone in a wheelchair, a route is only as good as its worst block. AccessMap proved a slope-aware map could work in Seattle. I wanted it for San Francisco, built end to end: data pipeline, routing engine and app.",
      },
      {
        // one iPhone that plays the three flows in turn, with chapters beside it (desktop) or under it (phones)
        heading: "Three moves",
        body: "Pick a chapter or let it play through.",
        walkthrough: {
          frame: iphoneFrame,
          chapters: [
            {
              label: "Get started",
              text: "One question: how do you get around? Each answer sets its own slope and curb limits.",
              mp4: evenAppStartMp4,
              poster: evenAppStartPoster,
            },
            {
              label: "Search",
              text: "Search only suggests places Even can route to, and checks your location is covered first.",
              mp4: evenPickLocationMp4,
              poster: evenPickLocationPoster,
            },
            {
              label: "Tap anywhere",
              text: "Tap a sidewalk to see its incline and surface, then start or end a route right there.",
              mp4: evenChangeLocationMp4,
              poster: evenChangeLocationPoster,
            },
          ],
        },
      },
      {
        heading: "Building the map from open data",
        body: "No single dataset knows where you can roll, so Even stitches four into one graph.",
        steps: [
          {
            label: "Sidewalks",
            text: "OpenStreetMap sidewalks, crossings, steps and elevators, loaded into PostGIS.",
          },
          {
            label: "Slope",
            text: "USGS elevation at ~10 m per pixel, so paths are cut into 15 m runs with a signed grade.",
            file: "elevation.py",
            code: `# the DEM is ~10 m per pixel, so grades over shorter runs are mostly noise
MIN_CHUNK_M = 15.0`,
          },
          {
            label: "Curb ramps",
            text: "DataSF puts every ramp at the intersection center. Matching each ramp's corner label to the crossing end that points that way took coverage from 27% to 77%.",
            file: "match_curbs.py",
            code: `INTERSECTION_RADIUS_M = 35  # crosswalk ends sit 10-30 m from the center on wide streets
MAX_CORNER_ANGLE = 67.5     # end's bearing must roughly point at the labeled corner`,
          },
          {
            label: "The graph",
            text: "Split at every junction for pgRouting, with a check so routes never start on an island.",
          },
        ],
      },
      {
        heading: "Routing that knows your limits",
        body: "Dijkstra over a cost built from your profile. If nothing fits the whole way, Even gets you as close as it can and says how far is left.",
        steps: [
          {
            label: "Over your limits is a wall",
            text: "-1 means impassable, and uphill and downhill are checked separately.",
            file: "routing.py",
            code: `# forward travel climbs at +grade; reverse travel climbs at -grade
CASE WHEN grade > {up} OR -grade > {down} THEN -1 ELSE {WEIGHT} END AS cost,
CASE WHEN -grade > {up} OR grade > {down} THEN -1 ELSE {WEIGHT} END AS reverse_cost`,
          },
          {
            label: "Everything else costs extra",
            text: "Hills, unsurveyed curbs and worn ramps make an edge feel longer than it is.",
            file: "routing.py",
            code: `# a bad ramp makes its crosswalk cost 4x, so a ~15 m crossing
# is worth a ~45 m detour to avoid
WEIGHT = """length_m * (1 + abs(grade) / 10)
    * (CASE WHEN curb = 'unknown' THEN 1.5 ELSE 1 END)
    * (CASE WHEN steep_ramp OR poor_ramp THEN 4 ELSE 1 END)"""`,
          },
        ],
      },
      {
        heading: "One route, and why",
        body: "One route colored by slope, green under 3% and amber to 8%. The rest lives in two pop-ups.",
        media: [
          {
            src: [
              { src: evenTripInfo, tall: true, inset: "w-[86%] h-[90%]", caption: "Trip info: the slope profile against your limits, and what the shortest route would have cost you." },
              { src: evenDirections, tall: true, inset: "w-[86%] h-[90%]", caption: "Directions: nine raw path pieces merged into five readable steps, each with slope and curb status." },
            ],
          },
        ],
      },
      {
        heading: "Design",
        body: "NYC subway signage meets neo-brutalism: bold Helvetica, thick borders, hard shadows. Blue is the only accent, so wherever it shows up, that's the thing to tap.",
        brand: {
          colors: [
            { name: "Paper", hex: "#FBFAF7", note: "Panels" },
            { name: "Ink", hex: "#111111", note: "Text and borders" },
            { name: "Blue", hex: "#1D4ED8", note: "The only accent" },
            { name: "Light blue", hex: "#DCE6FF", note: "Selected rows" },
            { name: "Easy", hex: "#15803D", note: "Under 3%" },
            { name: "Moderate", hex: "#D98E04", note: "3 to 8%" },
          ],
        },
      },
      {
        heading: "What's next",
        list: [
          "Street names in directions.",
          "BART elevator outages that reroute you.",
          "A web client on the same API.",
        ],
      },
    ],
    metrics: [
      { value: "77%", label: "Curb coverage, up from 27%" },
      { value: "4", label: "Mobility profiles" },
      { value: "9 → 5", label: "Raw path pieces merged into direction steps on a test route" },
    ],
    gallery: [],
  },
  {
    slug: "iphone-duo",
    name: "iPhone Duo Case Study",
    tagline: "Making Apple's foldable actually fold",
    // card opens the standalone case study site instead of a #/work page
    link: "https://iphone-duo-casestudy.vercel.app/",
    featured: true,
    tags: ["React", "Three.js", "GLSL"],
    frame: duoFoldPoster,
    // work card: the fold loop, already on its own dark background
    cardDemo: { kind: "video", mp4: duoCardMp4, poster: duoCardPoster },
    tint: "#201f1b",
    hero: duoFoldMp4,
    github: "https://github.com/RJoshi141/iphone-duo-casestudy",
    summary:
      "Apple shows the iPhone Duo on its site as a 3D model you can spin but not use. I wanted to see if I could make that same file actually fold: drag it open, stop it halfway, and watch the screens wake up and go soft as the hinge moves.",
    role: "Solo: design, engineering",
    platform: "Web",
    year: "2026",
    stack: ["React", "TypeScript", "Three.js", "GLSL", "Motion"],
    sections: [
      {
        heading: "A still model, not a working phone",
        body: "Apple's product page loads a glTF of the phone, slowly rotating, and responds to a drag. That's it. The screen is one image baked onto the mesh. I wanted the real file to behave like a real phone, with no pre-rendered animation and no video standing in for the display. Just Apple's model, driven by code.",
      },
      {
        heading: "What's already in Apple's file",
        body: [
          "The file is more than a shape. One mesh is named folding-half, so the asset itself marks which part of the body rotates and around which hinge line. Everything else, how far it swings, how fast, what the screens do on the way, is up to whoever renders it.",
          "I load it once with GLTFLoader, find that node by name, and from then on folding is one rotation value set every frame. The two screen materials are named too, so I swap in my own shader without touching the frame, glass, or camera bump. A baked RoomEnvironment map gives the titanium something to reflect.",
        ],
      },
      {
        heading: "Faking a screen that's really a photo",
        body: [
          "There's no video and no second render behind the glass. The screen is a flat wallpaper projected onto the curved display in real time. For every point on the glass, the shader finds where a ray from the camera would hit a plane facing the lens and samples the wallpaper there, so tilting the phone shifts the image like it sits behind the glass instead of painted on it.",
          "The inner screen is one flat plane. The cover screen wraps further around the body, so it projects between two reference points along the hinge edge instead. Home screen icons blend on top through their own alpha.",
          "Depth of field is faked too: a blurred mip level plus four jittered samples around each pixel, scaled by how open the phone is. The inner screen softens as you close it while the cover screen comes into focus.",
        ],
      },
      {
        heading: "One number drives the whole phone",
        body: "Every visual change comes from a single 0 to 1 value: how far open the phone is.",
        steps: [
          {
            label: "Fold choreography",
            text: "Turns progress into the hinge angle, where the focus line sits on the cover screen, and how blurred the inner screen gets. The hinge finishes closing at 96% so the blur has a beat to settle instead of cutting off.",
            file: "fold-choreography.ts",
            code: `export function foldChoreography(progress: number) {
  const p = Math.max(0, Math.min(1, progress))
  const hinge = Math.min(1, p / 0.96)
  return {
    angle: (1 - hinge) * Math.PI,
    coverFocusEdge: 1.25 - Math.min(1, p / 0.45) * 1.1,
    innerDefocus: (1 - p) ** 0.65,
  }
}`,
          },
        ],
      },
      {
        heading: "Drag it, scrub it, or click",
        list: [
          "A click flips between open and closed over a two second ease. Dragging tracks your pointer directly with no easing, so it feels like you're pulling the hinge yourself.",
          "A press that moves more than five pixels counts as a drag, and the click that follows gets swallowed so letting go doesn't also toggle it.",
          "The slider stops at an exact angle and doubles as the accessible control: screen readers hear degrees open, not a raw decimal.",
          "As it closes, the model shifts sideways with the hinge angle so the fold stays centered instead of drifting out of frame.",
          "With reduced motion on, the fold jumps straight to its new position, even mid-animation.",
        ],
      },
      {
        heading: "Where I'd take it next",
        list: [
          "Give the hinge resistance: swap the linear ease for a spring so it feels like a mechanism, not a slider.",
          "Bake the crease into a normal map instead of faking it with shading, so it holds up close and under harsher light.",
          "Drive progress from a real hinge sensor or accelerometer, so the page folds with the phone in your hand.",
        ],
      },
      {
        heading: "Credits",
        body: "The 3D model and its textures are Apple's, used for an independent, non-commercial study. The fold component is adapted from an MIT-licensed open-source demo. Not affiliated with or endorsed by Apple.",
      },
    ],
    metrics: [],
    gallery: [],
  },
  {
    slug: "zoomies",
    name: "Zoomies",
    tagline: "Pixel-art endless runner",
    featured: true,
    tags: ["iOS", "SpriteKit", "Swift"],
    frame: zoomiesFrame,
    // work card: the gameplay loop in the landscape iPhone from the case study
    cardDemo: { kind: "landscape", frame: iphoneLandscapeFrame, mp4: zoomiesGameplayMp4, poster: zoomiesGameplayPoster },
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
          "Every frame of the dog is drawn by hand in Pixilart on a 48 by 48 pixel grid, one strip per action. Each action starts from the idle pose and gets redrawn a few pixels at a time, previewed on loop, and exported as a single sprite sheet.",
          "In the game, each strip is sliced into SpriteKit textures at runtime and played with its own timing. Filtering is set to nearest so the pixels stay sharp at any size, the same way they play below.",
        ],
        // behind the scenes: drawing the run cycle in Pixilart, shown before the finished sheets
        laptop: {
          frame: macbookFrame,
          mp4: zoomiesPixilartMp4,
          poster: zoomiesPixilartPoster,
          caption: "Behind the scenes in Pixilart: the sprite gallery, then the run cycle frame by frame on the timeline, with the preview playing it back.",
        },
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
      },
    ],
    metrics: [],
    gallery: [],
  },
  {
    slug: "cinemate",
    hidden: true, // off the Work and Home pages for now
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
    hidden: true, // off the Work and Home pages for now
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
    hidden: true, // off the Work and Home pages for now
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
    hidden: true, // off the Work and Home pages for now
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
