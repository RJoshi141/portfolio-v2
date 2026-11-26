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
// Layer revamp (Oct 2026): new recordings, screens and the iPhone 17 frame
import iphone17Frame from "../../assets/case-studies/iphone-17-frame.png";
// blurred photo backdrops for the Layer phones (Pexels)
import layerBgWater from "../../assets/case-studies/layer-bg/bg-water.jpg";
import layerBgTrees from "../../assets/case-studies/layer-bg/bg-trees.jpg";
import layerBgBeach from "../../assets/case-studies/layer-bg/bg-beach.jpg";
import layerBgHills from "../../assets/case-studies/layer-bg/bg-hills.jpg";
import l2StartMp4 from "../../assets/case-studies/layer2/start.mp4";
import l2StartPoster from "../../assets/case-studies/layer2/start-poster.jpg";
import l2TourMp4 from "../../assets/case-studies/layer2/tour.mp4";
import l2TourPoster from "../../assets/case-studies/layer2/tour-poster.jpg";
import l2ScanMp4 from "../../assets/case-studies/layer2/scan.mp4";
import l2ScanPoster from "../../assets/case-studies/layer2/scan-poster.jpg";
import l2VoiceMp4 from "../../assets/case-studies/layer2/voice.mp4";
import l2VoicePoster from "../../assets/case-studies/layer2/voice-poster.jpg";
import l2Questionnaire from "../../assets/case-studies/layer2/questionnaire.jpg";
import l2TourVoice from "../../assets/case-studies/layer2/tour-voice.jpg";
import l2AddProduct from "../../assets/case-studies/layer2/add-product.jpg";
import l2NightRoutine from "../../assets/case-studies/layer2/night-routine.jpg";
import l2RoutineReview from "../../assets/case-studies/layer2/routine-review.jpg";
import l2ShelfRemove from "../../assets/case-studies/layer2/shelf-remove.jpg";
import l2Hero from "../../assets/case-studies/layer2/hero-3phones.png";
import l2Card from "../../assets/case-studies/layer2/card-2phones.png";
import boundHero from "../../assets/case-studies/bound/hero-2phones.png"; // start screen + shelves, two floating phones
import boundWireframes from "../../assets/case-studies/bound/wireframes.jpg";
// blurred photo backdrops for the phone panels (Pexels)
import boundBgReading from "../../assets/case-studies/bound/bg-reading.jpg";
import boundBgReaders from "../../assets/case-studies/bound/bg-readers.jpg";
import boundBgNotes from "../../assets/case-studies/bound/bg-notes.jpg";
import boundBgLibrary from "../../assets/case-studies/bound/bg-library.jpg";
import boundBgWindow from "../../assets/case-studies/bound/bg-window.jpg";
import boundJoinMp4 from "../../assets/case-studies/bound/join.mp4";
import boundJoinPoster from "../../assets/case-studies/bound/join-poster.jpg";
import boundShelfMp4 from "../../assets/case-studies/bound/shelf.mp4";
import boundShelfPoster from "../../assets/case-studies/bound/shelf-poster.jpg";
import boundAddMp4 from "../../assets/case-studies/bound/add-book.mp4";
import boundAddPoster from "../../assets/case-studies/bound/add-book-poster.jpg";
import boundMeetupMp4 from "../../assets/case-studies/bound/meetup.mp4";
import boundMeetupPoster from "../../assets/case-studies/bound/meetup-poster.jpg";
import boundLogPages from "../../assets/case-studies/bound/log-pages.jpg";
import boundBookNotes from "../../assets/case-studies/bound/book-notes.jpg";
import boundComposer from "../../assets/case-studies/bound/note-composer.jpg";
import boundLedger from "../../assets/case-studies/bound/club-ledger.jpg";
import boundStart from "../../assets/case-studies/bound/start-screen.jpg";
import boundShelves from "../../assets/case-studies/bound/shelves.jpg";
import boundIcons from "../../assets/case-studies/bound/app-icons.jpg";
import boundIconHome from "../../assets/case-studies/bound/icon-homescreen.png";
import boundTearSpec from "../../assets/case-studies/bound/tear-spec.jpg";
import boundPortraits from "../../assets/case-studies/bound/portrait-picker.jpg";
import boundSignIn from "../../assets/case-studies/bound/sign-in.jpg";
import evenCard from "../../assets/case-studies/even/card-3d.png";
import evenHero from "../../assets/case-studies/even/hero-3d.jpg";
import evenHeroMp4 from "../../assets/case-studies/even/hero-flyin.mp4";
import evenHeroPoster from "../../assets/case-studies/even/hero-flyin-poster.jpg";
import evenBgBay from "../../assets/case-studies/even/bg-bay.jpg"; // looking down to the bay and Alcatraz
import evenBgHill from "../../assets/case-studies/even/bg-hill.jpg"; // a street climbing toward Russian Hill
import evenBgStreet from "../../assets/case-studies/even/bg-street.jpg"; // a steep block of bay windows
import evenIcons from "../../assets/case-studies/even/icons.png";
import evenSlopeLayer from "../../assets/case-studies/even/slope-layer.png";
import evenLegend from "../../assets/case-studies/even/legend.png";
import evenTripInfo from "../../assets/case-studies/even/trip-info.png";
import evenDirections from "../../assets/case-studies/even/directions.png";
import evenAppStartMp4 from "../../assets/case-studies/even/app-start-2.mp4";
import evenAppStartPoster from "../../assets/case-studies/even/app-start-2-poster.jpg";
import evenChangeLocationMp4 from "../../assets/case-studies/even/change-location.mp4";
import evenChangeLocationPoster from "../../assets/case-studies/even/change-location-poster.jpg";
import evenPickLocationMp4 from "../../assets/case-studies/even/pick-location-2.mp4";
import evenPickLocationPoster from "../../assets/case-studies/even/pick-location-2-poster.jpg";
import utterHeroMp4 from "../../assets/case-studies/utter/hero-watch-3.mp4";
import utterHeroWrist from "../../assets/case-studies/utter/hero-wrist.jpg"; // the welcome screen on a wrist
import lumonHeroMp4 from "../../assets/case-studies/lumon/hero-imac.mp4";
import lumonHeroPoster from "../../assets/case-studies/lumon/hero-imac-poster.jpg";
import lumonDemoMp4 from "../../assets/case-studies/lumon/demo.mp4";
import lumonDemoPoster from "../../assets/case-studies/lumon/demo-poster.jpg";
import lumonReportsMp4 from "../../assets/case-studies/lumon/reports.mp4";
import lumonReportsPoster from "../../assets/case-studies/lumon/reports-poster.jpg";
import lumonShowScreenMp4 from "../../assets/case-studies/lumon/show-screen.mp4";
import lumonShowScreenPoster from "../../assets/case-studies/lumon/show-screen-poster.jpg";
import lumonShowUiMp4 from "../../assets/case-studies/lumon/show-interface.mp4";
import lumonShowUiPoster from "../../assets/case-studies/lumon/show-interface-poster.jpg";
import utterSketchV1 from "../../assets/case-studies/utter/sketch-v1-idle.png";
import utterSketchV2 from "../../assets/case-studies/utter/sketch-v2-recording.png";
import utterSketchV3 from "../../assets/case-studies/utter/sketch-v3-review.png";
import watchUltraFrame from "../../assets/case-studies/watch-ultra-frame.png";
import utterDemoMp4 from "../../assets/case-studies/utter/watch-demo.mp4";
import utterDemoWebm from "../../assets/case-studies/utter/watch-demo.webm";
import utterPhoneOnboarding from "../../assets/case-studies/utter/iphone-onboarding.png";
import utterPhoneRecord from "../../assets/case-studies/utter/iphone-record.png";
import utterPhoneInbox from "../../assets/case-studies/utter/iphone-inbox.png";
import utterWatchRecordReview from "../../assets/case-studies/utter/watch-final-record-review.png";
import utterWatchSyncConfirm from "../../assets/case-studies/utter/watch-final-sync-confirm.png";
// the two exploration boards: sketches, and the app on real devices
import utterBoardSketches from "../../assets/case-studies/utter/utter-board-sketches.webp";
import utterBoardDevice from "../../assets/case-studies/utter/utter-board-device.webp";
import utterBgTown from "../../assets/case-studies/utter/bg-town.jpg";
import utterBgButterfly from "../../assets/case-studies/utter/bg-butterfly.jpg";
import joydropLoginBefore from "../../assets/case-studies/joydrop/login-before-web.png";
import joydropLoginAfter from "../../assets/case-studies/joydrop/login-after-ios.png";
import joydropCommunitiesBefore from "../../assets/case-studies/joydrop/communities-before.png";
import joydropCommunitiesAfter from "../../assets/case-studies/joydrop/communities-after.png";
import joydropFeedPoster from "../../assets/case-studies/joydrop/app-scroll-poster.jpg";
import joydropFeedMp4 from "../../assets/case-studies/joydrop/app-scroll.mp4";
import joydropWebShotSignup from "../../assets/case-studies/joydrop/web-shot-signup.jpg";
import joydropWebShotFeed from "../../assets/case-studies/joydrop/web-shot-feed.jpg";
import joydropWebShotSearch from "../../assets/case-studies/joydrop/web-shot-search.jpg";
import joydropWebShotCreate from "../../assets/case-studies/joydrop/web-shot-create.jpg";
import joydropWebShotMarket from "../../assets/case-studies/joydrop/web-shot-market.jpg";
import joydropWebShotProfile from "../../assets/case-studies/joydrop/web-shot-profile.jpg";
import joydropWebFeedMp4 from "../../assets/case-studies/joydrop/web-feed.mp4";
import joydropWebFeedPoster from "../../assets/case-studies/joydrop/web-feed.jpg";
import joydropWebMarketMp4 from "../../assets/case-studies/joydrop/web-market.mp4";
import joydropWebMarketPoster from "../../assets/case-studies/joydrop/web-market.jpg";
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
// blurred photo backdrops for the phone panels (Pexels)
import joydropBgCheer from "../../assets/case-studies/joydrop/bg-cheer.jpg";
import joydropBgCoffee from "../../assets/case-studies/joydrop/bg-coffee.jpg";
import joydropBgLaugh from "../../assets/case-studies/joydrop/bg-laugh.jpg";
import joydropBgNight from "../../assets/case-studies/joydrop/bg-night.jpg";
import joydropBgWindow from "../../assets/case-studies/joydrop/bg-window.jpg";
import joydropBgHands from "../../assets/case-studies/joydrop/bg-hands.jpg";
import joydropBgCrowd from "../../assets/case-studies/joydrop/bg-crowd.jpg";
import joydropBgDance from "../../assets/case-studies/joydrop/bg-dance.jpg";
import iphoneFrame from "../../assets/case-studies/iphone-frame.png";
import utterPhoneMp4 from "../../assets/case-studies/utter/iphone-demo.mp4";
import utterPhoneWebm from "../../assets/case-studies/utter/iphone-demo.webm";
import zoomiesFrame from "../../assets/project-frames/zoomies-iphone.png";
import cinemateFrame from "../../assets/project-frames/cinemate-ipad.png";
import harmoniFrame from "../../assets/project-frames/harmoni-frames.png";
import portfolioFrame from "../../assets/project-frames/potfolio-frames.png";
import rubiksFrame from "../../assets/project-frames/rubiks-mac.png";
import lumonFrame from "../../assets/project-frames/lumon-imac.png";
import cellscopeHeroMp4 from "../../assets/case-studies/cellscope/hero-macbook-2.mp4";
import cellscopeHeroPoster from "../../assets/case-studies/cellscope/hero-macbook-2-poster.jpg";
import cellscopeCardMp4 from "../../assets/case-studies/cellscope/card.mp4";
import cellscopeCardPoster from "../../assets/case-studies/cellscope/card-poster.jpg";
import cellscopeChartsMp4 from "../../assets/case-studies/cellscope/charts.mp4";
import cellscopeChartsPoster from "../../assets/case-studies/cellscope/charts-poster.jpg";
import cellscopeRegsMp4 from "../../assets/case-studies/cellscope/registers.mp4";
import cellscopeRegsPoster from "../../assets/case-studies/cellscope/registers-poster.jpg";
import cellscopeMobileFleet from "../../assets/case-studies/cellscope/mobile-fleet.png";
import cellscopeMobileDetail from "../../assets/case-studies/cellscope/mobile-detail.png";

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
    // every phone row sits straight on the page, no grey panels
    bareFrames: true,
    // three floating phones on a transparent background, sitting right on the page (no grey panel)
    hero: joydropHero,
    heroBare: true,
    heroInset: "w-[85%] h-[85%]",
    siteLabel: "joydrop.me",
    stack: ["Expo", "React Native", "NestJS", "Next.js", "Firebase", "EAS"],
    layout: "story",
    accent: "#7B2FFF",
    grain: "radial-gradient(130% 110% at 15% 5%, #F8F5FD 0%, #E9DFFA 40%, #CDB8F4 75%, #B99DEF 100%)",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "Recognition that takes 30 seconds and lasts",
        body: "Find the person, say the thing, send. They keep it for good.",
        phoneDemo: { tone: `center / cover no-repeat url(${joydropBgCheer})`, frame: iphoneFrame, mp4: joydropFeedMp4, poster: joydropFeedPoster, caption: "The app, start to finish." },
      },
      {
        eyebrow: "Problem", nav: "Problem",
        heading: "The moment to say thanks always passes",
        body: "A friend shows up for you. A coworker handles something hard. You mean to say something, then the moment passes, or a group chat buries it by morning.",
      },
      {
        eyebrow: "Engineering", nav: "Getting to iOS",
        heading: "From a web app to real iPhones",
        body: "Joydrop started on the web. I fixed 4+ iOS build blockers (Xcode signing, CocoaPods, compiler bugs) so QA could test on real devices, then set up EAS, CI/CD and TestFlight releases myself.",
      },
      {
        eyebrow: "Visual design", nav: "Redesign",
        heading: "One violet, everything else warm black",
        body: "The first version was the web app squeezed onto a phone. I rebuilt it on the new brand: a warm near-black canvas, Fraunces for headlines, Space Mono for labels, and Volt as the only accent.",
        brand: {
          colors: [
            { name: "Dark", hex: "#0D0B09" },
            { name: "Ink", hex: "#1C1612" },
            { name: "Volt", hex: "#7B2FFF" },
            { name: "White", hex: "#F5F0E8" },
            { name: "Grain", hex: "#C9B99A" },
            { name: "Ash", hex: "#8A7F74" },
          ],
        },
        // drag the handle to wipe between the two
        compare: { framed: true, before: joydropLoginBefore, after: joydropLoginAfter, caption: "The web login on a phone, and the native iOS login: \"Seen starts here.\"" },
      },
      {
        tag: "Key decision",
        eyebrow: "Design decision", nav: "Design decisions",
        heading: "Posts first, highlights inside the feed",
        body: "The feed is where most Joydrops get read, so it got the biggest rework.",
        decision: {
          options: [
            { label: "Highlights carousel on top", note: "The Figma design. It pushed the actual posts below the fold." },
            { label: "Posts first, Highlight as a view", note: "A dropdown switches between For You and Highlight." },
          ],
          chose: 1,
          why: "People open the app to read what someone said, so that comes first.",
        },
        image: { src: joydropHomeBefore, caption: "Before. The Figma design, with a Highlights carousel above the feed." },
        // one phone at a time, fading to the next on a loop
        carousel: [
          { frame: iphoneFrame, poster: joydropHomeFeed, caption: "After. The For You feed: posts first, with search and send up top. Cards tilt like notes pinned to a board.", tone: `center / cover no-repeat url(${joydropBgCoffee})` },
          { frame: iphoneFrame, poster: joydropHomeHighlight, caption: "After. Highlight view: featured Joydrops fill the card in violet, with the Dots and badge they came with.", tone: `center / cover no-repeat url(${joydropBgLaugh})` },
          { frame: iphoneFrame, poster: joydropHomeComments, caption: "After. Comments with reactions, replies, GIFs and @ tagging.", tone: `center / cover no-repeat url(${joydropBgNight})` },
        ],
      },
      {
        tag: "Key decision",
        eyebrow: "Design decision",
        heading: "Answer the why before sign-up",
        decision: {
          options: [
            { label: "Four feature slides", note: "Shared by web and mobile, explaining features before you'd used them." },
            { label: "A questionnaire, then a tour", note: "A few questions before sign-up, a 30-second tour after." },
          ],
          chose: 1,
          why: "By the time you reach the login screen, you already know why Joydrop exists.",
        },
        image: { src: joydropOnboardingBefore, caption: "Before. Four swipeable slides." },
        phones: [
          { frame: iphoneFrame, mp4: joydropQuestionnaireMp4, poster: joydropQuestionnairePoster, caption: "The questionnaire: the last time you saw someone do something great.", tone: `center / cover no-repeat url(${joydropBgWindow})` },
          { frame: iphoneFrame, mp4: joydropTourMp4, poster: joydropTourPoster, caption: "The tour: the feed, your first Joydrop, a community to join.", tone: `center / cover no-repeat url(${joydropBgHands})` },
        ],
      },
      {
        eyebrow: "Core flows", nav: "Communities",
        heading: "Groups that run themselves",
        body: "I built Communities end to end, from the backend to the screens.",
        list: ["Public and private groups", "Invites", "Join requests the group manages itself"],
        media: [
          { src: joydropCommunitiesBefore, wide: true, caption: "Before. The first version: browse, create, wait for admin approval, delete with a confirmation." },
          { src: joydropCommunitiesAfter, wide: true, caption: "After. The same flow on iOS: an empty state that points to Discover, a create sheet, cards with Send joydrop right on them." },
        ],
      },
      {
        eyebrow: "Core flows", nav: "Notifications",
        heading: "You know what happened before you open it",
        body: "Push notifications with Expo and NestJS across 8+ triggers, each with its own title: a Joydrop received, a community post, an invite, a connection request, a reply.",
        phones: [
          { frame: iphoneFrame, poster: joydropNotifLock, caption: "Grouped on the lock screen.", tone: `center / cover no-repeat url(${joydropBgCrowd})` },
          { frame: iphoneFrame, poster: joydropNotifBanner, caption: "The first test push, as a banner.", tone: `center / cover no-repeat url(${joydropBgDance})` },
        ],
      },
      {
        eyebrow: "Core flows",
        heading: "Person first, next step on the row",
        body: "Two tabs, For You and Community, grouped by recency. A colored badge on the avatar tells you the type at a glance, and you can accept an invite or send a first Joydrop without opening anything.",
        compare: { frame: iphoneFrame, before: joydropInappBeforeList, after: joydropInappForYou, caption: "One flat list with the same blue buttons, then tabs, recency groups and a badge per type." },
      },
      {
        eyebrow: "Core flows",
        heading: "One job per button",
        body: "Search opens as its own screen with Users and Communities tabs. Send is violet, connect is black, and once you're connected, send takes the full width.",
        compare: { frame: iphoneFrame, before: joydropSearchBefore, after: joydropSearchAfter, caption: "One search box above a grid of blue buttons, then Users and Communities with actions on the card." },
      },
      {
        eyebrow: "Web", nav: "On the web",
        heading: "The same app, on the web",
        body: [
          "Joydrop runs in the browser too, so every screen had to work from a phone up to a wide laptop. The layout stays the same; the navigation and overlays change with the space.",
          "The look is neo-brutalist on purpose: hard black outlines, flat offset shadows under inputs and buttons, and post cards that sit a little crooked, like notes pinned to a board. It feels handmade rather than corporate, which suits an app about thanking people. Fraunces and Space Mono keep it warm, and violet stays the one accent.",
        ],
        list: [
          "Phones get a bottom tab bar, laptops a dark left rail",
          "Search is its own screen on iOS and a drawer over the feed on the web",
          "Sheets on iOS open as centered modals on the web",
        ],
        web: [
          { mp4: joydropWebFeedMp4, poster: joydropWebFeedPoster, caption: "Onboarding, the feed and sending a Joydrop." },
          { mp4: joydropWebMarketMp4, poster: joydropWebMarketPoster, caption: "Communities and the marketplace: claiming a spot at an event." },
        ],
        // a slow strip of web screens drifting past, faded at both edges
        webStrip: [
          { src: joydropWebShotSignup, label: "Sign up" },
          { src: joydropWebShotFeed, label: "Feed" },
          { src: joydropWebShotSearch, label: "Search" },
          { src: joydropWebShotCreate, label: "Create a community" },
          { src: joydropWebShotMarket, label: "Marketplace" },
          { src: joydropWebShotProfile, label: "Profile" },
        ],
      },
      {
        tag: "Impact",
        eyebrow: "Impact", nav: "Impact",
        heading: "From a web app to a shipped iOS app",
        stats: [
          { value: "~30%", label: "Faster app performance" },
          { value: "8+", label: "Push notification triggers" },
          { value: "4+", label: "iOS build blockers fixed" },
        ],
      },
    ],
    // tools row at the bottom of the case study
    tools: [
      { name: "Figma", logo: "figma" },
      { name: "TypeScript", logo: "typescript" },
      { name: "React Native", logo: "react" },
      { name: "Expo", logo: "expo" },
      { name: "EAS", icon: "eas" },
      { name: "Next.js", logo: "nextjs" },
      { name: "NestJS", logo: "nestjs" },
      { name: "Firebase", logo: "firebase" },
      { name: "Xcode", logo: "xcode" },
    ],
    metrics: [], // shown as the Impact chapter instead
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
    heroImage: utterHeroWrist,
    year: "", // TODO
    stack: ["Swift", "SwiftUI", "WatchConnectivity", "AVFoundation", "SFSpeechRecognizer"],
    layout: "story",
    accent: "#C99A1E",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "Say it on your wrist, read it on your phone",
        body: "Hold to talk on the watch. It lands on the iPhone transcribed and sorted.",
        // the watch and the phone, each in its own square on a blurred photo
        duo: {
          watch: { frame: watchUltraFrame, mp4: utterDemoMp4, webm: utterDemoWebm, tone: `center / cover no-repeat url(${utterBgTown})`, caption: "Hold to talk on the watch." },
          phone: { frame: iphoneFrame, mp4: utterPhoneMp4, webm: utterPhoneWebm, tone: `center / cover no-repeat url(${utterBgButterfly})`, caption: "It lands on the iPhone, transcribed." },
        },
        // how a memo gets from the wrist to the inbox
        steps: [
          { label: "Record", text: "Mono AAC at 12 kHz: plenty for speech, light enough to send." },
          { label: "Send", text: "WatchConnectivity delivers it in the background. Drop your wrist and move on." },
          { label: "Receive", text: "The iPhone moves the file into its own folder before the system cleans it up." },
          { label: "Transcribe", text: "The Speech framework waits for the final result, not partials." },
          { label: "Sort", text: "A keyword pass picks Reminder, Todo, Idea or Note. You can change it." },
        ],
      },
      {
        eyebrow: "Problem", nav: "Problem",
        heading: "Good ideas show up at bad times",
        body: "Walking, driving, mid-workout. By the time you unlock your phone and open a notes app, the thought is gone.",
      },
      {
        eyebrow: "Exploration", nav: "Exploration",
        heading: "From sketch to wrist",
        body: "Paper and Figma first, then the real thing on a real watch.",
        // one panel, two loose clusters, like a moodboard (after the Tomo case study)
        board: {
          label: "Sketch to device explorations",
          clusters: [
            { src: utterBoardSketches, label: "Sketches" },
            { src: utterBoardDevice, label: "On the device" },
          ],
        },
      },
      {
        eyebrow: "Design decisions", nav: "Design decisions",
        heading: "Three small calls on the wrist",
        // one chapter: each call is its options in a line, then the sketch it came from
        decisions: [
          {
            options: ["Tap anywhere", "Hold a button", "Hold the mic"], chose: 2,
            sketch: { src: utterSketchV1, label: "v1 · idle screen" },
            why: "Press to talk, let go to finish. The most natural gesture on a watch.",
          },
          {
            options: ["Timer ring", "Pulsing dot", "Waveform bars"], chose: 2,
            sketch: { src: utterSketchV2, label: "v2 · recording state" },
            why: "The bars move with your voice, so you can see it hears you.",
          },
          {
            options: ["Swipe to decide", "No review", "Play, trash or send"], chose: 2,
            sketch: { src: utterSketchV3, label: "v3 · review screen" },
            why: "One glance to catch a bad take before it sends.",
          },
        ],
      },
      {
        eyebrow: "Visual design", nav: "Visual design",
        heading: "One amber accent on black",
        body: "If it's yellow, it's the thing to tap. Each category gets its own colour: green Todo, orange Reminder, purple Idea, blue Note.",
        carousel: [
          { src: utterPhoneOnboarding, tall: true, caption: "Onboarding: record on your wrist, read on your phone, four categories." },
          { src: utterPhoneRecord, tall: true, caption: "Record: hold the mic, or import the latest watch recording." },
          { src: utterPhoneInbox, tall: true, caption: "Inbox: sorted into Todo, Reminder, Idea and Note." },
        ],
      },
      {
        eyebrow: "Final", nav: "Final app",
        heading: "Four states, one gesture",
        body: "Hold to talk, let go to review, tap to send.",
        images: [
          { src: utterWatchRecordReview, w: "w-[73%] md:w-[55%]", caption: "Record and review: a mic that breathes, a live waveform, then play, trash or send." },
          { src: utterWatchSyncConfirm, w: "w-[47%] md:w-[35%]", caption: "Sync and confirm: a spinner during the handoff, then Sent to iPhone." },
        ],
        // the watch turning on its band, closing the case study
        video: { src: utterHeroMp4, w: "w-[70%] md:w-[44%]", caption: "The finished watch app." },
      },
      {
        tag: "Impact",
        eyebrow: "Impact", nav: "Impact",
        heading: "A thought saved in one gesture",
        stats: [
          { value: "1", label: "Gesture: hold, let go, send" },
          { value: "4", label: "Categories every memo sorts into" },
          { value: "12 kHz", label: "Mono audio, light enough to send" },
        ],
      },
    ],
    // tools row at the bottom of the case study
    tools: [
      { name: "Xcode", logo: "xcode" },
      { name: "Swift", logo: "swift", note: "SwiftUI" },
      { name: "watchOS", icon: "watch" },
      { name: "WatchConnectivity", icon: "sync" },
      { name: "AVFoundation", icon: "audio" },
      { name: "Speech", icon: "mic", note: "SFSpeechRecognizer" },
    ],
    metrics: [], // shown as the Impact chapter instead
    gallery: [], // extra full-width screenshots, shown numbered
  },
  {
    slug: "layer",
    name: "Layer",
    tagline: "Ingredient-smart skincare planner",
    featured: true,
    tags: ["iOS", "Swift", "On-device AI"],
    // the revamp: warm paper, near-black ink, one bronze accent, a script word in every heading
    frame: l2Card, // two floating phones: the start screen and Add product
    tint: "#1a1613",
    // hero: three floating phones (start screen, voice check-in, routine review), straight on the page
    hero: l2Hero,
    heroBare: true,
    stars: 1, // GitHub stars as of Oct 2026; the badge refreshes live
    github: "https://github.com/RJoshi141/layer",
    summary:
      "Skincare labels are dense ingredient lists in tiny type. Layer reads the bottle, explains what's inside, and builds a morning and night routine in the right order. All on the phone.",
    role: "Solo: design, engineering",
    platform: "iOS 26, widgets",
    year: "2026",
    stack: ["Swift", "SwiftUI", "SwiftData", "Vision", "Foundation Models", "SpeechAnalyzer", "WidgetKit"],
    layout: "story",
    accent: "#764823",
    grain: "radial-gradient(130% 110% at 15% 5%, #F4F2EC 0%, #E8E6DE 40%, #D6C7B2 75%, #B99877 100%)",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "Skin, in order",
        body: "Scan a bottle, understand what's inside, get a routine in the right order. All on the phone.",
        flows: [
          {
            label: "Built around your skin",
            text: "The same bottle means different things on different skin. So before anything else, a short tour and five questions: your skin type, how easily it reacts, and how it has handled actives like retinol before. Every read after that is written for you, not for skin in general.",
            kind: "phone17", frame: iphone17Frame, mp4: l2TourMp4, poster: l2TourPoster,
            tone: `center / cover no-repeat url(${layerBgHills})`,
          },
          {
            label: "Scan any label",
            text: "Photograph the front and the back. Vision reads the tiny type, Layer finds the real product photo and cuts it out on the phone, then drafts the name, brand and every ingredient. You check the draft before anything lands on your shelf, because a wrong ingredient is worse than a slow one.",
            kind: "phone17", frame: iphone17Frame, mp4: l2ScanMp4, poster: l2ScanPoster,
            tone: `center / cover no-repeat url(${layerBgWater})`,
          },
          {
            label: "Voice check-ins",
            text: "Logging should take less effort than the routine itself. Say how your skin feels and it is transcribed on the phone, then sorted into which routine you did, what you used and how your skin reacted. Over time that becomes a record of what is actually working.",
            kind: "phone17", frame: iphone17Frame, mp4: l2VoiceMp4, poster: l2VoicePoster,
            tone: `center / cover no-repeat url(${layerBgTrees})`,
          },
        ],
      },
      {
        eyebrow: "Problem", nav: "Problem",
        heading: "The answers are on the bottle",
        body: "Which products clash, what order they go in, whether last spring's serum is still good. It's all printed there, in tiny type nobody can use.",
      },
      {
        eyebrow: "Onboarding", nav: "Onboarding",
        heading: "Five questions before the first scan",
        carousel: [
          { kind: "phone17", frame: iphone17Frame, mp4: l2StartMp4, poster: l2StartPoster, caption: "The first screen sets the tone: skin, in order, in warm gold light. It promises calm before it asks for anything." },
          { kind: "phone17", frame: iphone17Frame, poster: l2Questionnaire, caption: "Five questions, one per card, over a close-up of real skin. One at a time keeps it from feeling like a medical form." },
          { kind: "phone17", frame: iphone17Frame, poster: l2TourVoice, caption: "The tour ends on two promises: you can just talk to it, and nothing you say or scan leaves the phone." },
        ],
      },
      {
        eyebrow: "Design decision", nav: "Design decisions",
        heading: "Ingredients never touch the LLM",
        decision: {
          options: [{ label: "Let the model read the list" }, { label: "A parser and a database" }],
          chose: 1,
          why: "A model can invent an ingredient that isn't on the bottle. A parser can't.",
        },
        steps: [
          { label: "Parse", text: "Rejoins words OCR split across lines and merges lists from several photos." },
          { label: "Match", text: "Each name is looked up in a 242-entry ingredient database. Unknown ones follow INCI naming rules." },
          { label: "Fill the fuzzy parts", text: "Name, brand and type come from guided generation, typed Swift instead of JSON." },
          { label: "Review", text: "Nothing is saved until you've checked the draft." },
        ],
      },
      {
        eyebrow: "Core flows", nav: "Core flows",
        heading: "A good photo first",
        body: "Bright light, get close, and two or three photos if the list wraps around the bottle.",
        phones: [{ kind: "phone17", frame: iphone17Frame, poster: l2AddProduct, caption: "Three ways in: take a photo, scan the box, or pick from your library. The tips sit right above the button, so the first scan is a good one.", tone: `center / cover no-repeat url(${layerBgBeach})` }],
      },
      {
        eyebrow: "Core flows",
        heading: "Routines that put themselves in order",
        list: [
          "Every product slots in thinnest to thickest.",
          "Eleven conflict rules flag clashes, like retinol with acids.",
          "The widget flips between morning and night, and turns rust on a clash.",
        ],
        phones: [
          { kind: "phone17", frame: iphone17Frame, poster: l2NightRoutine, caption: "Tap to add. Layer puts each product in layering order, thinnest to thickest, so you never have to think about it." },
          { kind: "phone17", frame: iphone17Frame, poster: l2RoutineReview, caption: "Routine review looks the whole routine over. Rules decide what clashes; the model only explains why, in plain words." },
        ],
      },
      {
        eyebrow: "Visual design", nav: "Visual design",
        heading: "Warm paper, one bronze accent",
        body: "Spaced capitals for labels, and a handwritten script for the second word of every heading.",
        brand: {
          colors: [
            { name: "Paper", hex: "#E8E6DE" },
            { name: "Stone", hex: "#B8B6AF" },
            { name: "Ink", hex: "#111111" },
            { name: "Bronze", hex: "#764823" },
            { name: "Ivory", hex: "#ECE9E0" },
          ],
        },
        phones: [{ kind: "phone17", frame: iphone17Frame, poster: l2ShelfRemove, caption: "Your shelf: a line icon per product type, warm paper behind it, and one bronze accent for the thing to tap." }],
      },
      {
        eyebrow: "Privacy", nav: "Privacy",
        heading: "Nothing leaves the phone",
        list: [
          "No account, no backend.",
          "OCR, extraction, speech, cutouts and the assistant all run on device.",
          "The only network calls find product photos, from free sources.",
        ],
      },
      {
        eyebrow: "What's next",
        heading: "Still to come",
        list: ["Siri: \"what's my routine tonight?\"", "Trends from check-ins over time."],
      },
    ],
    tools: [
      { name: "Xcode", logo: "xcode" },
      { name: "Swift", logo: "swift", note: "SwiftUI, SwiftData" },
      { name: "Foundation Models", icon: "intelligence", note: "On-device LLM" },
      { name: "Vision", icon: "scan", note: "OCR, cutouts" },
      { name: "SpeechAnalyzer", icon: "mic" },
      { name: "WidgetKit", icon: "widget" },
      { name: "Google Lens", logo: "googlelens", note: "Photo search" },
      { name: "Open Beauty Facts", icon: "database", note: "Product data" },
    ],

    metrics: [],
    gallery: [],
  },
  {
    slug: "bound",
    name: "Bound",
    tagline: "A book club app with spoiler-safe notes",
    featured: true,
    tags: ["iOS", "SwiftUI", "Supabase"],
    frame: boundHero,
    tint: "#1b1612",
    hero: boundHero,
    heroBare: true,
    stars: 0, // GitHub stars as of Oct 2026; the badge refreshes live
    github: "https://github.com/RJoshi141/bound",
    summary:
      "Bound is a book club app for iOS. Your books sit on wooden shelves, your club leaves spoiler-safe notes in the margins, and the monthly meetup gets planned in the app instead of a group chat.",
    role: "Solo: design, engineering",
    platform: "iOS 26",
    year: "2026",
    stack: ["Swift", "SwiftUI", "SwiftData", "Supabase"],
    stackLabel: "Swift, SwiftUI, SwiftData, Supabase (Postgres, Auth, Realtime)",
    layout: "story", // pilot: Rachel Chen style: side legend, serif headings, one aligned column
    accent: "#8A2C22",
    // case study told as a story (after rachelchen.tech): the finished app first, then the hard
    // calls with the options I didn't take, then impact and what I learned
    takeaway: "I build crafted, opinionated interfaces on a real-time backend.",
    grain: "radial-gradient(130% 110% at 15% 5%, #F6EEDF 0%, #E9CFA6 30%, #C77D4E 62%, #8A2C22 100%)",
    sections: [
      {
        // the finished work, up front: three flows, each its own phone on its own grainy colour
        eyebrow: "Solution", nav: "Solution",
        heading: "A book club that lives on a shelf, not in a group chat",
        flows: [
          {
            label: "Tear into the app",
            text: "The start screen is an oil painting of stacked books. Leaving it, and finishing the join step, rips the page along a ragged edge and lifts it away.",
            frame: iphoneFrame, mp4: boundJoinMp4, poster: boundJoinPoster,
            tone: `center / cover no-repeat url(${boundBgReading})`,
          },
          {
            label: "Shelves that feel like shelves",
            text: "To read, Reading now and Finished, on oak planks. Spine width follows page count, and each spine takes its colour from the real cover. Tap one and it lifts with a paper slip underneath.",
            frame: iphoneFrame, mp4: boundShelfMp4, poster: boundShelfPoster,
            tone: `center / cover no-repeat url(${boundBgReaders})`,
          },
          {
            label: "Add any book",
            text: "Search Open Library by title, author or ISBN, or scan the barcode on the back. Real covers, page counts and a heart for favourites.",
            frame: iphoneFrame, mp4: boundAddMp4, poster: boundAddPoster,
            tone: `center / cover no-repeat url(${boundBgNotes})`,
          },
        ],
      },
      {
        eyebrow: "Problem", nav: "Problem",
        heading: "My book club lived in five places",
        body: "The pick in a group chat, progress on Goodreads, notes in a notes app, the meetup lost in a thread. Nobody knew what page anyone was on.",
      },
      {
        eyebrow: "Research", nav: "Who it's for",
        heading: "For people who want to talk about the book, not scroll for it",
        // the old group chat, as a looping iMessage thread
        chat: {
          tone: `center / cover no-repeat url(${boundBgWindow})`,
          frame: iphoneFrame,
          title: "Book Club",
          text: "Every month, the same thread: what page, whose place, and who spoiled what.",
          messages: [
            { from: "Priya", text: "ok what page are we reading up to??" },
            { from: "Sam", text: "no idea, I'm on 140", react: "😭" },
            { from: "Maya", text: "pls don't text past 200, I'm behind", reply: true },
            { from: "Leo", text: "who's hosting this month?" },
            { from: "Priya", text: "Jess I think? scroll up" },
            { from: "Jess", text: "wait was it me" },
            { from: "Sam", text: "the ending though. can't believe she dies" },
            { from: "Maya", text: "SAM", react: "‼️" },
            { from: "Leo", text: "what's the address again" },
            { from: "Jess", text: "also what did we even read last spring" },
            { me: true, text: "ok I'm making an app for this" },
          ],
        },
      },
      {
        eyebrow: "Process", nav: "Process",
        heading: "Five screens on paper before any code",
        body: "The look came from old library cards, bookcloth and letterpress.",
        image: { src: boundWireframes, caption: "The core flow, lo-fi: Join, Shelves, Book, Meetup, Club." },
      },
      {
        tag: "Key decision",
        eyebrow: "Design decision", nav: "Design decisions",
        heading: "Spoilers are gated by page, not by chapter",
        body: "Notes past your page stay folded until you open them.",
        decision: {
          options: [
            { label: "Gate by chapter", note: "Too coarse. One chapter hides a lot." },
            { label: "Gate by page", note: "Every note carries the page it was written on." },
          ],
          chose: 1,
          why: "You already log your page, so it's the sharpest line.",
        },
        carousel: [
          { frame: iphoneFrame, poster: boundLogPages, caption: "Log your page." },
          { frame: iphoneFrame, poster: boundBookNotes, caption: "The club's notes, on ruled index cards." },
          { frame: iphoneFrame, poster: boundComposer, caption: "A note with a rating, tags and a spoiler switch." },
        ],
      },
      {
        tag: "Key decision",
        eyebrow: "Design decision",
        heading: "The page only tears when you change places",
        body: "A dark sheet drops, the screen swaps, the sheet tears back up.",
        decision: {
          options: [
            { label: "Tear on every screen", note: "Fun once, tiring by the tenth." },
            { label: "Tear at two moments", note: "Leaving the start screen, finishing the join." },
          ],
          chose: 1,
          why: "Rare enough to stay special. Reduce Motion gets a crossfade.",
        },
        image: { src: boundTearSpec, caption: "The motion spec: drop, swap, tear back, settle." },
      },
      {
        eyebrow: "Core flows", nav: "Core flows",
        heading: "The meetup is a ticket, not a thread",
        list: [
          "Going lands an ink stamp.",
          "The host runs the vote.",
          "Updates reach everyone in about a second.",
        ],
        phoneDemo: { tone: `center / cover no-repeat url(${boundBgLibrary})`, frame: iphoneFrame, mp4: boundMeetupMp4, poster: boundMeetupPoster, caption: "Pick the winner, a time and a place, send the ticket." },
      },
      {
        eyebrow: "Core flows",
        heading: "The small things that make it feel like a club",
        carousel: [
          { frame: iphoneFrame, poster: boundLedger, title: "Every past meetup, on a library card", caption: "The club ledger: each meetup styled like a due-date card, with the club's average rating and yours." },
          { frame: iphoneFrame, poster: boundPortraits, title: "Silhouettes instead of initials", caption: "Six Victorian cut-paper silhouettes, all facing right, in a coloured oval." },
          { frame: iphoneFrame, poster: boundSignIn, title: "No passwords, just codes", caption: "Join with a 6-character invite code. Sign in with an 8-digit code sent to your email." },
        ],
      },
      {
        tag: "Key decision",
        eyebrow: "Under the hood", nav: "Under the hood",
        heading: "Who sees what is decided in the database, not the app",
        steps: [
          { label: "Offline first", text: "Shelves live in SwiftData and sync to Postgres." },
          { label: "Live clubs", text: "Supabase Realtime pushes every change." },
          { label: "Row-level security", text: "Only hosts plan meetups. No client can get around it." },
          { label: "Invite codes", text: "Database functions, so a code can't be guessed." },
          { label: "Books", text: "Open Library search, VisionKit barcode scan." },
          { label: "The tear", text: "A custom animatable SwiftUI shape." },
        ],
      },
      {
        eyebrow: "Visual design", nav: "Visual design",
        heading: "Paper and ink, not pixels",
        brand: {
          colors: [
            { name: "Paper", hex: "#F2EADB" },
            { name: "Card", hex: "#FAF5EA" },
            { name: "Ink", hex: "#221A14" },
            { name: "Forest", hex: "#2F4A35" },
            { name: "Oxblood", hex: "#8A2C22" },
            { name: "Rust", hex: "#B4572A" },
            { name: "Mustard", hex: "#C69A3A" },
            { name: "Gilt", hex: "#A9813A" },
            { name: "Oak", hex: "#7A4B2E" },
          ],
        },
        phones: [
          { frame: iphoneFrame, poster: boundStart, caption: "Ink: blackletter over an oil painting, letterpress buttons below." },
          { frame: iphoneFrame, poster: boundShelves, caption: "Paper: serif shelf names, oak planks." },
        ],
      },
      {
        tag: "Key decision",
        eyebrow: "Design decision",
        heading: "A wax seal, picked from six directions",
        decision: {
          chips: true,
          options: [{ label: "Blackletter B" }, { label: "On the shelf" }, { label: "Ribbon marker" }, { label: "Wax seal" }, { label: "Cameo" }, { label: "Torn page" }],
          chose: 3,
          why: "Reads at 60px. Feels like an invitation.",
        },
        images: [
          { src: boundIcons, wide: true, caption: "The six directions." },
          { src: boundIconHome, wide: true, small: true, caption: "The wax seal on a real home screen, next to Apple's own icons." },
        ],
      },
      {
        eyebrow: "What's next",
        heading: "Still on the shelf",
        list: [
          "Pass a book to a clubmate.",
          "Sign in with Apple, and a TestFlight beta.",
          "Meetup reminders.",
        ],
      },
      
      {
        tag: "What I learned",
        eyebrow: "Reflection", nav: "Reflection",
        learned: [
          { title: "Start with your own circle.", text: "I knew who it was for because I was one of them." },
          { title: "Then make it play.", text: "The torn page, the ink stamp, the spine that lifts." },
        ],
      },
    ],
    tools: [
      { name: "Xcode", logo: "xcode" },
      { name: "Swift", logo: "swift" },
      { name: "SwiftUI", icon: "swiftui" },
      { name: "SwiftData", icon: "database" },
      { name: "Supabase", logo: "supabase" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "Open Library", icon: "book" },
      { name: "VisionKit", icon: "scan" },
      { name: "Resend", logo: "resend" },
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
    heroVideo: { mp4: evenHeroMp4, poster: evenHeroPoster, width: "mx-auto md:w-[82%]" },
    github: "https://github.com/RJoshi141/even",
    summary:
      "Map apps send everyone the same way. In San Francisco that can mean a 15% hill or a corner with no curb ramp. Even plans routes around how you get around, then shows you why it picked them.",
    role: "Solo: design, data, engineering",
    platform: "iOS 26",
    year: "2026",
    stack: ["SwiftUI", "MapKit", "Swift Charts", "FastAPI", "PostGIS", "pgRouting", "Python"],
    layout: "story",
    accent: "#1D4ED8",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "Directions that know the hills",
        body: "Tell it how you get around. It plans around the slopes and curbs that would stop you, and shows you why.",
        flows: [
          {
            label: "Get started",
            text: "One question first: how do you get around? A manual chair, a power chair, a cane or a stroller each set their own uphill, downhill and curb limits, so every route after that is planned for you.",
            frame: iphoneFrame, mp4: evenAppStartMp4, poster: evenAppStartPoster,
            tone: `center / cover no-repeat url(${evenBgBay})`,
          },
          {
            label: "Search",
            text: "Search only suggests places Even can actually route to, and checks that where you are is covered first. No dead ends after you've already picked a destination.",
            frame: iphoneFrame, mp4: evenPickLocationMp4, poster: evenPickLocationPoster,
            tone: `center / cover no-repeat url(${evenBgHill})`,
          },
          {
            label: "Tap anywhere",
            text: "Tap any sidewalk to see its incline and surface before you commit, then start or end a route right there. The map becomes something you can question, not just follow.",
            frame: iphoneFrame, mp4: evenChangeLocationMp4, poster: evenChangeLocationPoster,
            tone: `center / cover no-repeat url(${evenBgStreet})`,
          },
        ],
      },
      {
        eyebrow: "Problem", nav: "Problem",
        heading: "A route is only as good as its worst block",
        body: "Map apps send everyone the same way. In San Francisco that can mean a 15% hill or a corner with no curb ramp, and one of those is enough to end the trip.",
      },
      {
        eyebrow: "Engineering", nav: "Data",
        heading: "Building the map from open data",
        body: "No single dataset knows where you can roll, so Even stitches four into one graph.",
        steps: [
          { label: "Sidewalks", text: "OpenStreetMap sidewalks, crossings, steps and elevators, loaded into PostGIS." },
          {
            label: "Slope",
            text: "USGS elevation at about 10 m per pixel, so paths are cut into 15 m runs with a signed grade.",
            code: `# the DEM is ~10 m per pixel, so grades over shorter runs are mostly noise
MIN_CHUNK_M = 15.0`,
          },
          {
            label: "Curb ramps",
            text: "DataSF puts every ramp at the intersection center. Matching each ramp's corner label to the crossing that points that way took coverage from 27% to 77%.",
            code: `INTERSECTION_RADIUS_M = 35  # crosswalk ends sit 10-30 m from the center on wide streets
MAX_CORNER_ANGLE = 67.5     # end's bearing must roughly point at the labeled corner`,
          },
          { label: "The graph", text: "Split at every junction for pgRouting, with a check so routes never start on an island." },
        ],
      },
      {
        eyebrow: "Design decision", nav: "Design decisions",
        heading: "Your limit is a wall, not a penalty",
        decision: {
          options: [{ label: "Penalize steep blocks" }, { label: "Block anything over your limit" }],
          chose: 1,
          why: "A penalty can still be paid. A wall means the route never asks you to climb what you can't.",
        },
        steps: [
          {
            label: "Over your limits is impassable",
            text: "-1 means the edge doesn't exist, and uphill and downhill are checked separately.",
            code: `# forward travel climbs at +grade; reverse travel climbs at -grade
CASE WHEN grade > {up} OR -grade > {down} THEN -1 ELSE {WEIGHT} END AS cost,
CASE WHEN -grade > {up} OR grade > {down} THEN -1 ELSE {WEIGHT} END AS reverse_cost`,
          },
          {
            label: "Everything else costs extra",
            text: "Hills, unsurveyed curbs and worn ramps make an edge feel longer than it is.",
            code: `# a bad ramp makes its crosswalk cost 4x, so a ~15 m crossing
# is worth a ~45 m detour to avoid
WEIGHT = """length_m * (1 + abs(grade) / 10)
    * (CASE WHEN curb = 'unknown' THEN 1.5 ELSE 1 END)
    * (CASE WHEN steep_ramp OR poor_ramp THEN 4 ELSE 1 END)"""`,
          },
        ],
      },
      {
        eyebrow: "Core flows", nav: "Core flows",
        heading: "One route, and why",
        body: "One line colored by slope, green under 3% and amber up to 8%. The reasoning lives in two pop-ups.",
        carousel: [
          { src: evenTripInfo, tall: true, caption: "Trip info: the slope profile against your limits, and what the shortest route would have cost you." },
          { src: evenDirections, tall: true, caption: "Directions: nine raw path pieces merged into five readable steps, each with slope and curb status." },
          { src: evenLegend, tall: true, caption: "The legend: slope, curb status and map markers in one panel." },
          { src: evenSlopeLayer, tall: true, caption: "The slope layer: every street colored by how steep it is." },
        ],
      },
      {
        eyebrow: "Visual design", nav: "Visual design",
        heading: "Subway signage, one blue",
        body: "Bold Helvetica, thick borders and hard shadows. Blue is the only accent, so wherever it shows up, that's the thing to tap.",
        image: { src: evenIcons, caption: "The app icon in light, dark and tinted: A to B, one bend." },
        brand: {
          colors: [
            { name: "Paper", hex: "#FBFAF7" },
            { name: "Ink", hex: "#111111" },
            { name: "Blue", hex: "#1D4ED8" },
            { name: "Light blue", hex: "#DCE6FF" },
            { name: "Easy", hex: "#15803D" },
            { name: "Moderate", hex: "#D98E04" },
          ],
        },
      },
      {
        eyebrow: "Impact", nav: "Impact",
        heading: "Curb ramps the map can finally see",
        stats: [
          { value: "77%", label: "Curb coverage, up from 27%" },
          { value: "4", label: "Mobility profiles" },
          { value: "9 → 5", label: "Path pieces merged into direction steps" },
        ],
      },
      {
        eyebrow: "What's next",
        heading: "Still to come",
        list: ["Street names in directions.", "BART elevator outages that reroute you.", "A web client on the same API."],
      },
    ],
    tools: [
      { name: "Xcode", logo: "xcode" },
      { name: "Swift", logo: "swift", note: "SwiftUI" },
      { name: "MapKit", icon: "map" },
      { name: "Swift Charts", icon: "chart" },
      { name: "Python", logo: "python" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "PostgreSQL", logo: "postgresql", note: "PostGIS, pgRouting" },
      { name: "Docker", logo: "docker" },
      { name: "OpenStreetMap", logo: "openstreetmap" },
    ],
    metrics: [],
    gallery: [],
  },
  {
    slug: "cellscope",
    name: "CellScope",
    tagline: "Live battery telemetry over SMBus",
    featured: true,
    tags: ["Python", "Flask", "React"],
    frame: cellscopeCardPoster,
    // work card: the live dashboard looping inside the MacBook frame
    cardDemo: { frame: macbookFrame, mp4: cellscopeCardMp4, poster: cellscopeCardPoster },
    tint: "#16181c",
    github: "https://github.com/RJoshi141/cellscope",
    site: "https://cellscope-nine.vercel.app/",
    siteLabel: "cellscope-nine.vercel.app",
    // the dashboard running on a MacBook, at its own shape
    heroVideo: { mp4: cellscopeHeroMp4, poster: cellscopeHeroPoster, fit: true, aspect: 16 / 9, width: "mx-auto md:w-[78%]" },
    summary:
      "Every laptop and phone battery has a gas-gauge chip that reports voltage, current and temperature over SMBus. CellScope is the kind of tool hardware teams build around that chip. It reads the raw registers, decodes them, stores every reading in Postgres and charts each battery live as it charges, drains and wears.",
    role: "Solo: design, engineering",
    platform: "Web",
    year: "2026",
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "React", "TypeScript", "Zustand", "KendoReact"],
    layout: "story",
    accent: "#0071E3",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "Every battery, live",
        body: "Two laptop packs and two phone batteries, simulated at 60x so a full charge cycle fits in a few minutes. Pick one and every chart follows it.",
        clips: [
          { mp4: cellscopeChartsMp4, poster: cellscopeChartsPoster, caption: "Four synced charts instead of one with two y-axes. Hover one and the crosshair moves on all of them." },
        ],
      },
      {
        eyebrow: "Problem", nav: "Problem",
        heading: "Battery teams read the chip, not a settings screen",
        body: "To catch a cell running hot or fading too fast, you read the gas gauge directly, one register at a time. I wanted to build that whole path: the bus, the decoding, the API, the database and the dashboard.",
      },
      {
        eyebrow: "Engineering", nav: "Engineering",
        heading: "Reading the wire",
        body: "Nothing comes off the bus as a nice number. Current is a signed 16-bit word, temperature is tenths of a kelvin, and status is a set of bit flags.",
        steps: [
          {
            label: "One decoder",
            text: "Takes anything with smbus2's read_word_data, so a real I²C adapter drops in without touching the API or the UI.",
            code: `def _signed16(word):
    return word - 0x10000 if word & 0x8000 else word  # two's complement

def read_battery(bus, addr=0x0B):
    def word(name):
        return bus.read_word_data(addr, SBS[name])
    return {
        "voltage_mv": word("voltage"),
        "current_ma": _signed16(word("current")),
        "temp_c": round(word("temperature") / 10 - 273.15, 1),  # 0.1 K
        "status": word("battery_status"),  # bit flags
    }`,
          },
        ],
        clips: [
          { mp4: cellscopeRegsMp4, poster: cellscopeRegsPoster, caption: "The register inspector: each raw word next to what it means, flashing when it changes." },
        ],
      },
      {
        eyebrow: "Engineering",
        heading: "A battery worth watching",
        body: "A random number makes a boring chart, so each battery runs a small physics model.",
        steps: [
          { label: "Charge", text: "Current integrated over time, the same coulomb counting a real gas gauge does." },
          { label: "Voltage", text: "Read off a Li-ion curve, minus current times internal resistance, so it sags under load." },
          { label: "Charging", text: "Constant current to 80%, then a taper as it fills." },
          { label: "Heat and wear", text: "Heats with current squared, and loses a little capacity every cycle." },
        ],
      },
      {
        eyebrow: "Design decision", nav: "Design decisions",
        heading: "Postgres is the only memory",
        decision: {
          options: [{ label: "Keep the simulation in memory" }, { label: "Rebuild from the last reading" }],
          chose: 1,
          why: "Serverless functions forget everything between requests, so each poll picks up exactly where the database left off.",
        },
        steps: [
          {
            label: "Stateless, throttled polling",
            text: "Ten open tabs still write one reading per tick, and a quiet hour resumes where it left off instead of draining every battery to zero.",
            code: `def poll(battery, now):
    last = battery.latest_reading()
    if last and now - last.ts < MIN_INTERVAL:
        return last  # someone else just polled this pack

    state = state_from(battery, last)
    if last:
        state = step(state, min(now - last.ts, MAX_GAP).total_seconds())

    bus = FakeSMBus(state)  # swap for smbus2.SMBus(1) on real hardware
    reading = Reading(battery=battery, ts=now, **read_battery(bus))
    db.session.add(reading)
    db.session.commit()
    return reading`,
          },
        ],
      },
      {
        eyebrow: "API",
        heading: "Two ways in",
        body: "REST for the dashboard, and JSON-RPC 2.0 on the same Flask app for scripts and test rigs, with batch requests and the spec's error codes.",
      },
      {
        eyebrow: "Visual design", nav: "Visual design",
        heading: "Close to Apple's own tools",
        body: "SF Pro for text, SF Mono for every hex word and serial, one blue accent, and green or red only when a battery is charging or low.",
        brand: {
          colors: [
            { name: "Paper", hex: "#F5F5F7" },
            { name: "Ink", hex: "#1D1D1F" },
            { name: "Blue", hex: "#0071E3" },
            { name: "Green", hex: "#34C759" },
            { name: "Red", hex: "#FF3B30" },
          ],
        },
        images: [
          { src: cellscopeMobileFleet, tall: true, caption: "On a phone, the fleet stacks into one column.", tone: "radial-gradient(120% 100% at 20% 0%, #F5F9FF 0%, #D9E9FB 50%, #A9CBF2 100%)" },
          { src: cellscopeMobileDetail, tall: true, caption: "Pack detail: stats go two-up and the charts stack.", tone: "radial-gradient(120% 100% at 80% 0%, #F4FBF6 0%, #D4F0DC 50%, #9FDDB0 100%)" },
        ],
      },
      {
        eyebrow: "Impact", nav: "Impact",
        heading: "One class away from real hardware",
        stats: [
          { value: "10", label: "Registers read every poll" },
          { value: "17", label: "Tests across decoding, API and RPC" },
          { value: "60x", label: "Simulated time" },
        ],
      },
      {
        eyebrow: "What's next",
        heading: "Still to come",
        list: ["A real gas gauge through a Total Phase Aardvark.", "Alembic migrations instead of create_all.", "Alerts when a battery crosses a temperature or health limit."],
      },
    ],
    tools: [
      { name: "Python", logo: "python" },
      { name: "Flask", logo: "flask" },
      { name: "PostgreSQL", logo: "postgresql", note: "SQLAlchemy" },
      { name: "React", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Vercel", logo: "vercel" },
    ],
    metrics: [],
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
    stars: 4, // GitHub stars as of Oct 2026; the badge refreshes live
    github: "https://github.com/RJoshi141/Zoomies",
    summary:
      "A retro 2D endless runner where a dog dodges logs and collects bones, with custom pixel sprites and UI.",
    role: "Solo: art, design, engineering",
    platform: "iOS",
    year: "", // TODO
    stack: ["Swift", "SpriteKit", "Xcode"],
    // gameplay loop in a landscape iPhone at the top of the case study
    landscapeDemo: { frame: iphoneLandscapeFrame, mp4: zoomiesGameplayMp4, poster: zoomiesGameplayPoster },
    layout: "story",
    accent: "#3A9AD9",
    grain: "radial-gradient(90% 80% at 0% 0%, #FFE58A 0%, rgba(255,229,138,0) 60%), radial-gradient(90% 90% at 100% 0%, #F7A8B8 0%, rgba(247,168,184,0) 62%), radial-gradient(100% 90% at 100% 100%, #B9A7F2 0%, rgba(185,167,242,0) 65%), linear-gradient(160deg, #FFF3D9 0%, #F8D3C6 45%, #9FD3F7 100%)",
    layout: "story",
    accent: "#3A9AD9",
    grain: "radial-gradient(90% 80% at 0% 0%, #FFE58A 0%, rgba(255,229,138,0) 60%), radial-gradient(90% 90% at 100% 0%, #F7A8B8 0%, rgba(247,168,184,0) 62%), radial-gradient(100% 90% at 100% 100%, #B9A7F2 0%, rgba(185,167,242,0) 65%), linear-gradient(160deg, #FFF3D9 0%, #F8D3C6 45%, #9FD3F7 100%)",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "One tap, one dog, an endless road",
        body: "Jump the logs, grab the bones, keep your five hearts.",
        flows: [
          {
            label: "Splash",
            text: "The pixel dog barks beside the wordmark on launch. It sets the tone before you've touched anything: this is a small, silly, hand-drawn game.",
            kind: "landscape", frame: iphoneLandscapeFrame, mp4: zoomiesSplashMp4, poster: zoomiesSplashPoster,
            tone: "radial-gradient(120% 100% at 20% 0%, #FFF9DC 0%, #FFEB99 45%, #FFD95C 80%, #F5C531 100%)",
          },
          {
            label: "Tap to start",
            text: "Five hearts and a distance counter, and nothing else. A bone gives a heart back, so there is always a reason to jump even when no log is coming.",
            kind: "landscape", frame: iphoneLandscapeFrame, mp4: zoomiesStartMp4, poster: zoomiesStartPoster,
            tone: "radial-gradient(120% 100% at 80% 0%, #F1F9FE 0%, #CFEAFB 45%, #A7D8F7 80%, #87CFFA 100%)",
          },
          {
            label: "Menu and rules",
            text: "Resume, rules, credits and exit, all as custom pixel buttons. Even the menus are drawn, so you never drop out of the world.",
            kind: "landscape", frame: iphoneLandscapeFrame, mp4: zoomiesMenuMp4, poster: zoomiesMenuPoster,
            tone: "radial-gradient(120% 100% at 50% 100%, #F8EFEA 0%, #E6CFC2 45%, #C9A38C 80%, #A9806A 100%)",
          },
        ],
      },
      {
        eyebrow: "Why I made it", nav: "Why",
        heading: "Sprites that actually move",
        body: "A visual effects class got me hooked on pixel animation. I wanted to see those sprites run in something playable.",
      },
      {
        eyebrow: "Process", nav: "Sprites",
        heading: "Every frame drawn by hand",
        body: "Each action starts from the idle pose on a 48 by 48 grid and gets redrawn a few pixels at a time. In the game, each strip is sliced into textures and played with nearest filtering, so the pixels stay sharp at any size.",
        mac: {
          frame: macbookFrame, mp4: zoomiesPixilartMp4, poster: zoomiesPixilartPoster,
          tone: "radial-gradient(120% 100% at 20% 0%, #F3F1EE 0%, #E2DCD4 50%, #CDBFB0 100%)",
          caption: "Drawing the run cycle in Pixilart, frame by frame, with the preview playing it back.",
        },
        // frame counts and timings match GameScene.swift
        sprites: [
          { name: "Idle", src: zoomiesSpriteIdle, frames: 16, ms: 120, note: "Waiting on the start screen, tail going." },
          { name: "Run", src: zoomiesSpriteRun, frames: 8, ms: 65, note: "The main loop, fast enough to feel like a sprint." },
          { name: "Jump", src: zoomiesSpriteJump, frames: 7, ms: 40, note: "A quick leap over the log." },
          { name: "Bark", src: zoomiesSpriteBark, frames: 13, ms: 120, note: "Beside the title on the splash screen." },
          { name: "Hurt", src: zoomiesSpriteHurt, frames: 4, ms: 50, note: "Flashes red when a log hits." },
          { name: "Die", src: zoomiesSpriteDie, frames: 8, ms: 120, hold: 1000, note: "A stumble and a flop, then game over." },
          { name: "Sit", src: zoomiesSpriteSit, frames: 9, ms: 90, note: "Keeps you company on the credits." },
        ],
      },
      {
        eyebrow: "Visual design", nav: "World",
        heading: "A plain sky so the dog stands out",
        body: "One flat blue, a black road line, and three clouds. The bigger the cloud, the further back it sits, and each drifts across in 40 to 60 seconds.",
        assets: [
          { src: zArtCloud1, label: "Cloud 1", note: "Front · 1.8x" },
          { src: zArtCloud2, label: "Cloud 2", note: "Middle · 2.3x" },
          { src: zArtCloud3, label: "Cloud 3", note: "Back · 2.8x" },
        ],
      },
      {
        eyebrow: "Visual design",
        heading: "One thing to dodge, one to chase",
        body: "A log every 3 to 4 seconds, each at its own speed, so you can't tap along to a rhythm. Bones float just high enough that you have to jump for them.",
        assets: [
          { src: zArtLog, label: "Log", note: "−1 heart" },
          { src: zArtBone, label: "Bone", note: "+1 heart" },
          { src: zArtBoneYellow, label: "Collected", note: "2 quick blinks" },
          { src: zArtHeart, label: "Heart", note: "Up to 5" },
          { src: zArtSkull, label: "Skull", note: "Out of hearts" },
        ],
      },
      {
        eyebrow: "Visual design",
        heading: "Red for health, yellow for rewards",
        body: "You have a split second to spot a log, so colour does the sorting. Everything else stays out of the way.",
        brand: {
          colors: [
            { name: "Sky", hex: "#87CFFA" },
            { name: "Road", hex: "#000000" },
            { name: "Coat", hex: "#875E48" },
            { name: "Log", hex: "#6B421E" },
            { name: "Heart", hex: "#CC121C" },
            { name: "Glow", hex: "#FFD600" },
          ],
        },
      },
      {
        eyebrow: "Design decision", nav: "Design decisions",
        heading: "Contacts, not collisions",
        decision: {
          options: [{ label: "Real physics" }, { label: "Contacts only" }],
          chose: 1,
          why: "Nothing ever shoves the dog, so every jump feels exactly the same.",
        },
        steps: [
          {
            label: "Contacts, not collisions",
            text: "Each body gets a category bit: dog 1, logs 2, bones 4. The dog listens for 2 and 4 but collides with nothing.",
            code: String.raw`dog.physicsBody?.affectedByGravity = false
dog.physicsBody?.categoryBitMask = 1
dog.physicsBody?.contactTestBitMask = 2 | 4   // logs + bones
dog.physicsBody?.collisionBitMask = 0`,
          },
          {
            label: "Forgiving hitboxes",
            text: "About a third of the dog and 60% of a log. A near miss that looks like a miss counts as one.",
            code: String.raw`dog.physicsBody = SKPhysicsBody(rectangleOf: CGSize(width: dog.size.width / 2.8,
                                                    height: dog.size.height / 3))`,
          },
          {
            label: "A scripted jump",
            text: "Up 110px in half a second, back down in 0.3s. Same height, same timing, every tap.",
            code: String.raw`let moveUp = SKAction.moveBy(x: 0, y: 110, duration: 0.5)
let moveDown = SKAction.moveBy(x: 0, y: -105, duration: 0.3)
let jumpGroup = SKAction.group([jumpAnimation, .sequence([moveUp, moveDown])])`,
          },
        ],
      },
    ],
    // tools row at the bottom of the case study
    tools: [
      { name: "Xcode", logo: "xcode" },
      { name: "Swift", logo: "swift" },
      { name: "SpriteKit", icon: "sprite" },
      { name: "Pixilart", logo: "pixilart" },
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
    stars: 14, // GitHub stars as of Oct 2026; the badge refreshes live
    github: "https://github.com/RJoshi141/lumon",
    site: "https://lumon-interface.vercel.app/index.html",
    siteLabel: "lumon-interface.vercel.app",
    // the site playing on an iMac, at its own shape
    heroVideo: { mp4: lumonHeroMp4, poster: lumonHeroPoster, fit: true, aspect: 16 / 9, width: "md:w-full" },
    summary:
      "A working recreation of the macrodata refinement terminal from Severance. Numbers drift and swell under your cursor, bins fill, and there's an employee report screen behind it. Plain HTML, CSS and JavaScript.",
    role: "Solo: design, engineering",
    stack: ["HTML", "CSS", "JavaScript"],
    platform: "Web",
    year: "",
    layout: "story",
    accent: "#2B9AB0",
    sections: [
      {
        eyebrow: "Solution", nav: "Solution",
        heading: "The refinement terminal, in a browser",
        body: "Numbers drift and swell under your cursor, bins fill, and there's an employee report screen behind it.",
        clips: [
          { mp4: lumonDemoMp4, poster: lumonDemoPoster, caption: "The boot screen into the refinement grid, the cursor magnifying numbers above the bins." },
          { mp4: lumonReportsMp4, poster: lumonReportsPoster, caption: "Employee reports: names, tasks refined and compliance scores." },
        ],
      },
      {
        eyebrow: "Research", nav: "Inspiration",
        heading: "Studied frame by frame",
        body: "The show's terminals are mostly empty navy, one cyan, and numbers that feel alive. I watched the boot screen and the file screen frame by frame before writing any CSS.",
        clips: [
          { mp4: lumonShowScreenMp4, poster: lumonShowScreenPoster, caption: "From Severance (Apple TV+): the Lumon mark on the boot screen." },
          { mp4: lumonShowUiMp4, poster: lumonShowUiPoster, caption: "From Severance (Apple TV+): a file opening on the terminal." },
        ],
      },
      {
        eyebrow: "Engineering", nav: "Engineering",
        heading: "Numbers that feel alive",
        body: "No framework, about ninety lines of JavaScript.",
        steps: [
          { label: "Random digits", text: "Every cell gets a random number on load, so no two files look the same." },
          { label: "Drift", text: "Some cells float up or sideways, each with its own delay and speed." },
          { label: "Swell", text: "Cells within 100px of the cursor scale up to 2.6x, easing back by 200px." },
          { label: "Reports", text: "A second screen renders employee reports from a small data set." },
        ],
      },
      {
        eyebrow: "Visual design", nav: "Visual design",
        heading: "Two colors, two typefaces",
        body: "Navy and phosphor cyan. Share Tech Mono for every digit, Russo One for the wordmark.",
        brand: {
          colors: [
            { name: "Cyan", hex: "#8EE3F1" },
            { name: "Navy", hex: "#08203A" },
            { name: "Deep navy", hex: "#041B2D" },
          ],
        },
      },
      {
        eyebrow: "What's next",
        heading: "Still to come",
        list: ["A features dashboard linking the other screens.", "A cryptic message board and interactive tasks.", "Sound effects to match the show."],
      },
    ],
    tools: [
      { name: "HTML", logo: "html5" },
      { name: "CSS", logo: "css3" },
      { name: "JavaScript", logo: "javascript" },
      { name: "Vercel", logo: "vercel" },
    ],
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
