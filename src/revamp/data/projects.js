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
// Layer revamp (Oct 2026): new recordings, screens and the iPhone 17 frame
import iphone17Frame from "../../assets/case-studies/iphone-17-frame.png";
import l2StartMp4 from "../../assets/case-studies/layer2/start.mp4";
import l2StartPoster from "../../assets/case-studies/layer2/start-poster.jpg";
import l2TourMp4 from "../../assets/case-studies/layer2/tour.mp4";
import l2TourPoster from "../../assets/case-studies/layer2/tour-poster.jpg";
import l2ScanMp4 from "../../assets/case-studies/layer2/scan.mp4";
import l2ScanPoster from "../../assets/case-studies/layer2/scan-poster.jpg";
import l2VoiceMp4 from "../../assets/case-studies/layer2/voice.mp4";
import l2VoicePoster from "../../assets/case-studies/layer2/voice-poster.jpg";
import l2Start from "../../assets/case-studies/layer2/start-screen.jpg";
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
    sections: [
      {
        heading: "The product",
        body: [
          "A friend shows up for you. A coworker handles something hard. You notice, you mean to say something, and the moment passes. Joydrop catches it: find the person, say the thing, send. It takes about 30 seconds, and they keep it for good.",
          "It's not a feed and it's not a group chat, so nothing competes with the message. Communities give a team, club, or friend group a shared record of who showed up and how.",
        ],
        // text and phone share one row
        phoneBeside: true,
        phoneSize: "walkthrough", // same phone height as the walkthrough players and Layer's scan
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
        bare: true, // login before/after phones without grey panels
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
    heroVideo: { mp4: utterHeroMp4, poster: utterHeroPoster, fit: true, aspect: 1000 / 984, width: "md:w-[44%]" },
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
      body: "Audio on the watch becomes sorted text on the phone in five steps.",
      steps: [
        {
          label: "Record",
          text: "A small mono AAC file at 12 kHz: plenty for speech, light enough to send.",
        },
        {
          label: "Send",
          text: "WatchConnectivity queues the file and delivers it in the background, so you can drop your wrist and move on.",
        },
        {
          label: "Receive",
          text: "The iPhone moves the file into its own folder right away, before the system cleans it up.",
        },
        {
          label: "Transcribe",
          text: "The Speech framework runs on the file and waits for the final result, not partials.",
        },
        {
          label: "Sort",
          text: "A keyword pass picks Reminder, Todo, Idea or Note. You can change it before saving.",
        },
      ],
    },
    sections: [
      {
        heading: "The problem",
        body: "Ideas show up at bad times. Pulling out a phone, unlocking it, and opening a notes app is enough friction to lose the thought.",
      },
      {
        // empathy map: who Utter is for
        heading: "Who it's for",
        body: "Good ideas show up at bad times. These are the people who lose them.",
        empathy: {
          who: "People who think on the move: walking, driving, working out, or mid-conversation, with an Apple Watch already on their wrist.",
          says: ["I'll remember it later.", "Wait, what was that idea?"],
          thinks: ["By the time I unlock my phone, it's gone.", "I don't want to stop what I'm doing."],
          does: ["Texts notes to themselves", "Leaves voice memos they never replay", "Keeps a dozen half-finished lists"],
          feels: ["scattered", "rushed", "forgetful", "frustrated"],
          hears: ["\"Just write it down.\"", "Notification pings pulling them away"],
          needs: ["One tap from the wrist", "Notes that sort themselves"],
        },
      },
      {
        heading: "Early sketches",
        // TODO: rewrite these in your words
        body: "Before writing any code I sketched the three moments that matter on the wrist: before you speak, while you're speaking, and right after.",
        // compact rows: label + note left, sketch right (optional inset sizes the sketch in its panel)
        grid: true, // next site: all four sketches shown at once in a grid, not a scroll strip
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
        // live UI components rebuilt in code, on Utter's black canvas
        heading: "Exploring UI components",
        body: "The pieces that make up Utter, rebuilt here in code.",
        components: "utter",
      },
      {
        // iPhone screens in one row, each on its own grey panel with a note underneath
        key: "iphone-screens",
        row: true, // next site: the three phones centered in one row
        inset: "w-[92%] h-[92%]",
        bare: true, // screenshots sit straight on the page, no grey panels
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
        // both final frames side by side with a note underneath, straight on the page (no grey panels)
        bare: true,
        images: [
          {
            src: utterWatchRecordReview,
            wide: true, small: true, // next site: one per row, kept compact
            inset: "w-[80%] h-[60%]",
            caption: "Record and review. The idle screen is just a mic that breathes. Holding it swaps in a live waveform and timer, and letting go lands on a review screen to play it back, trash it, or send it to your iPhone.",
          },
          {
            src: utterWatchSyncConfirm,
            wide: true, small: true, // next site: one per row, kept compact
            inset: "w-[62%] h-[58%]",
            caption: "Sync and confirm. A spinner while WatchConnectivity hands the file off, then a clear Sent to iPhone with one tap to record the next thought.",
          },
        ],
      },
      // TODO: { heading: "How it works", body: "...", image: someImport, caption: "..." },
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
    metrics: [
      { value: "1", label: "Gesture to capture: hold, let go, send" },
      { value: "4", label: "Categories every memo sorts into" },
      { value: "12 kHz", label: "Mono audio, light enough to send from the wrist" },
    ],
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
    sections: [
      {
        heading: "Why I built it",
        body: "Nobody knows which products clash, what order to use them in, or if last spring's serum is still good. The answers are on the bottle, just not in a form anyone can use.",
      },
      {
        heading: "Who it's for",
        body: "The answers are printed on every bottle. Most people just can't read them.",
        empathy: {
          who: "People building a skincare routine, from first-timers to anyone juggling actives like retinol and acids.",
          says: ["Can I use this with my vitamin C?", "Wait, does serum go before moisturizer?"],
          thinks: ["Is last spring's serum still good?", "Am I paying for products that cancel each other out?"],
          does: ["Googles every ingredient", "Copies routines from social media", "Buys products that do the same thing"],
          feels: ["overwhelmed", "unsure", "skeptical", "curious"],
          hears: ["Ten-step routines from influencers", "Conflicting advice on what clashes"],
          needs: ["A plain read of what's in each bottle", "A routine in the right order, without clashes"],
        },
      },
      {
        // one phone plays the three flows in turn, chapters beside it
        heading: "Made for your skin",
        body: "Pick a chapter or let it play through.",
        walkthrough: {
          kind: "phone17",
          frame: iphone17Frame,
          chapters: [
            {
              label: "Built around your skin",
              text: "A short tour, an empty shelf that shows what's coming, then a few questions: skin type, how easily it reacts, your history with actives. The same ingredient list becomes advice for you.",
              mp4: l2TourMp4,
              poster: l2TourPoster,
            },
            {
              label: "Scan any label",
              text: "Snap the front and back. Vision reads the label, Layer finds the real product photo, cuts it out on device, and drafts every ingredient for you to review before it lands on your shelf.",
              mp4: l2ScanMp4,
              poster: l2ScanPoster,
            },
            {
              label: "Voice check-ins",
              text: "Say how your skin feels. It's transcribed on device and fills in which routine, what you used and how your skin reacted.",
              mp4: l2VoiceMp4,
              poster: l2VoicePoster,
            },
          ],
        },
      },
      {
        // the first run, three stills in a centered row
        key: "first-run",
        row: true,
        phones: [
          { kind: "phone17", frame: iphone17Frame, mp4: l2StartMp4, poster: l2StartPoster, caption: "Skin, in order. The start screen, set in gold light." },
          { kind: "phone17", frame: iphone17Frame, poster: l2Questionnaire, caption: "Five questions, one per card, over a close-up of real skin." },
          { kind: "phone17", frame: iphone17Frame, poster: l2TourVoice, caption: "The tour ends on voice check-ins, and that everything stays on the phone." },
        ],
      },
      {
        heading: "Ingredients never touch the LLM",
        body: "A model can invent an ingredient that isn't on the bottle. A parser can't.",
        steps: [
          { label: "Parse", text: "A deterministic parser rejoins words OCR split across lines and merges lists from several photos." },
          { label: "Match", text: "Each name is looked up in a 242-entry ingredient database. Unknown ones are classified from INCI naming rules." },
          { label: "Fill the fuzzy parts", text: "Name, brand and type come from guided generation, typed Swift instead of JSON. Rules cover phones without Apple Intelligence." },
          { label: "Review", text: "Nothing is saved until you've checked the draft." },
        ],
      },
      {
        heading: "Photograph the ingredients",
        body: "Three tips up front, so the first scan reads well: bright light, get close, and take two or three photos if the list wraps around the bottle.",
        phones: [{ kind: "phone17", frame: iphone17Frame, poster: l2AddProduct, caption: "Add product: take a photo, scan a box, or pick from your library." }],
      },
      {
        heading: "Routines that put themselves in order",
        body: "Pick what goes in. Layer handles the rest.",
        list: [
          "Every product slots into layering order, thinnest to thickest.",
          "Eleven conflict rules flag clashes, like retinol with acids.",
          "Routine review looks the whole routine over and suggests what to add or watch. Rules decide; a model only explains.",
          "The widget flips between morning and night and turns rust when something clashes.",
        ],
        phones: [
          { kind: "phone17", frame: iphone17Frame, poster: l2NightRoutine, caption: "Night routine: tap to add, Layer puts it in order." },
          { kind: "phone17", frame: iphone17Frame, poster: l2RoutineReview, caption: "Routine review: one step looked over, with a reason for each tip." },
        ],
      },
      {
        heading: "Design",
        body: "A quiet revamp: warm paper, near-black ink and one bronze accent. Spaced capitals for labels and buttons, and a handwritten script for the second word of every heading, like skin, in order.",
        brand: {
          colors: [
            { name: "Paper", hex: "#E8E6DE" },
            { name: "Stone", hex: "#B8B6AF" },
            { name: "Ink", hex: "#111111" },
            { name: "Bronze", hex: "#764823" },
            { name: "Ivory", hex: "#ECE9E0" },
          ],
        },
        phones: [{ kind: "phone17", frame: iphone17Frame, poster: l2ShelfRemove, caption: "Your shelf, with a line icon per product type and sheets that explain what happens next." }],
      },
      {
        heading: "Exploring UI components",
        body: "The pieces that make up the new Layer, rebuilt here in code. Tap them.",
        components: "layer",
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
    layout: "center", // trial: a centered, quieter case study layout (see Case.jsx)
    sections: [
      {
        heading: "Why I built it",
        body: "I'm in a book club, and it lives in five places. The book gets picked in a group chat, progress sits on Goodreads, notes go in a notes app, and the meetup date gets lost in the thread. Nobody wants spoilers, but nobody knows what page everyone else is on.",
      },
      {
        heading: "Who it's for",
        body: "Hosts and members of a monthly book club.",
        empathy: {
          who: "Hosts and members of a monthly book club.",
          says: ["Wait, what page are we reading up to?", "Who's hosting this month?"],
          thinks: ["Is it safe to read the group chat yet?", "What did we even read last spring?"],
          does: ["Scrolls the group chat for the address", "Keeps a reading log somewhere else", "Votes on the next pick with emoji reactions"],
          feels: ["behind", "spoiled", "scattered", "excited to talk about the book"],
          hears: ["\"No spoilers!\" followed by a spoiler"],
          needs: ["One place for the book, the notes and the meetup", "Notes that don't ruin the ending"],
        },
      },
      {
        heading: "Process",
        body: [
          "I started with lo-fi wireframes of the core flow: Join, then Shelves, Book, Meetup and the Club ledger.",
          "The early concept gated spoilers by chapter and had custom shelves. The final build gates by page instead, which is more precise.",
          "The look came from paper and ink: old library cards, bookcloth covers, letterpress.",
        ],
        image: { src: boundWireframes, caption: "The core flow, lo-fi: Join, Shelves, Book, Meetup, Club." },
      },
      {
        // one phone plays the three shelf moments in turn, with chapters beside it (like Layer's "Made for your skin")
        heading: "From the first tap to the shelf",
        body: "Pick a chapter or let it play through.",
        walkthrough: {
          frame: iphoneFrame,
          chapters: [
            {
              label: "Tear into the app",
              text: "The start screen is an oil painting of stacked books. Leaving it, and finishing the join step, rips the page along a ragged edge and lifts it away. It only plays at those two moments, so it never gets old. Inspired by niccolomiranda.com.",
              mp4: boundJoinMp4,
              poster: boundJoinPoster,
            },
            {
              label: "Shelves that feel like shelves",
              text: "To read, Reading now and Finished, on oak planks. Spine width follows page count, and each spine takes its colour from the right edge of the real cover. Tap one and it lifts with a paper slip underneath.",
              mp4: boundShelfMp4,
              poster: boundShelfPoster,
            },
            {
              label: "Add any book",
              text: "Search Open Library by title, author or ISBN, or scan the barcode on the back. Real covers, page counts and a heart for favourites.",
              mp4: boundAddMp4,
              poster: boundAddPoster,
            },
          ],
        },
      },
      {
        heading: "The tear, frame by frame",
        body: "A dark sheet drops over the screen with a ripped, fibrous edge. The screen swaps underneath, then the sheet tears back up to reveal it. With Reduce Motion on, it's a short crossfade instead.",
        image: { src: boundTearSpec, caption: "The motion spec: drop, swap, tear back, settle." },
      },
      {
        heading: "Notes that don't spoil",
        body: "Every note saves the page its author was on. Notes past your page fold into a \"3 notes past p. 212\" row until you choose to reveal them.",
        list: [
          "Notes are ruled index cards with a star rating.",
          "Tag one \"discuss at meetup\" to bring it up in person.",
          "Edit or delete your own.",
        ],
        phones: [
          { frame: iphoneFrame, poster: boundLogPages, caption: "Log your page. Every note you write remembers it." },
          { frame: iphoneFrame, poster: boundBookNotes, caption: "The club's notes on ruled index cards, with the club average up top." },
          { frame: iphoneFrame, poster: boundComposer, caption: "Write a note: a rating, quick tags, and a spoiler switch tied to your page." },
        ],
      },
      {
        heading: "Live with your club",
        body: "A note, RSVP or vote on one phone shows up on everyone else's in about a second.",
        // TODO: two phones side by side, one change landing on both
      },
      {
        heading: "The monthly meetup",
        body: "A tear-off ticket per month: the book, the date, the place, a map, and a perforated edge.",
        list: [
          "RSVP Going, Maybe or Can't. Going lands an ink stamp on the ticket.",
          "The host puts books up for a vote and members vote.",
          "The host plans the meetup from the winner.",
        ],
        phoneBeside: true,
        phoneDemo: { frame: iphoneFrame, mp4: boundMeetupMp4, poster: boundMeetupPoster, caption: "The host picks the vote winner, a time and a place, then sends the ticket. RSVP right on it." },
      },
      {
        heading: "The club ledger",
        body: "Every past meetup, styled like a library due-date card, with the club's average rating and yours.",
        phones: [{ frame: iphoneFrame, poster: boundLedger, caption: "Books passed to you, the ledger, and the club's silhouettes." }],
      },
      {
        heading: "Portraits",
        body: "Instead of initials, everyone picks one of six Victorian cut-paper silhouettes: top hat, updo, feather hat, bowler, bonnet, curls. All face right, in a coloured oval.",
        phones: [{ frame: iphoneFrame, poster: boundPortraits, caption: "Pick a silhouette and an oval colour." }],
      },
      {
        heading: "Sign-in without passwords",
        body: "Join with a club's 6-character invite code, or start a club and get one to share. Sign-in is an 8-digit code sent to your email.",
        phones: [{ frame: iphoneFrame, poster: boundSignIn, caption: "Welcome back: an email, then an 8-digit code." }],
      },
      {
        heading: "Who sees what lives in the database",
        body: "Shelves work offline. Clubs stay live. The rules sit in Postgres, not the app.",
        steps: [
          { label: "Offline first", text: "Your shelves live on the phone in SwiftData and sync to Postgres about a second after each change. The app pulls the server copy when it opens." },
          { label: "Live club data", text: "Members, meetups, RSVPs, votes and notes come from Supabase, and Realtime pushes changes as they happen." },
          { label: "Row-level security", text: "Clubmates can read your shelf, only hosts plan meetups and run the vote, and recommendations are visible only to sender and recipient." },
          { label: "Invite codes", text: "Creating and joining a club are database functions, so a code can't be guessed into someone else's club from the client." },
          { label: "The ledger", text: "A database view over past meetups, so it never goes stale." },
          { label: "Books and covers", text: "Open Library for search, ISBN lookup and covers. VisionKit scans barcodes and only accepts 978/979 codes, the ones printed on books. Core Image averages the cover's right edge for the spine colour." },
          { label: "Email codes", text: "Sent through a custom SMTP sender on Resend." },
          { label: "The tear", text: "A custom animatable SwiftUI shape. The torn edge rips left to right, then the page lifts straight up over 2.6 seconds." },
        ],
      },
      {
        heading: "Design",
        body: "Paper and ink. UnifrakturMaguntia blackletter for the masthead, Instrument Serif for headings and italic shelf names, IM Fell English SC for letterpress buttons, Hanken Grotesk for body and DM Mono for labels.",
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
        list: [
          "Buttons are square-cornered letterpress with an inset hairline.",
          "RSVP fills: Going in forest, Maybe in rust, Can't in oxblood.",
          "Menus are custom paper cards instead of the system menu.",
          "The app icon is a red wax seal with a blackletter B.",
          "The start, join and start-a-club screens each use a different oil painting of books.",
        ],
        phones: [
          { frame: iphoneFrame, poster: boundStart, caption: "Ink: blackletter over an oil painting, letterpress buttons below." },
          { frame: iphoneFrame, poster: boundShelves, caption: "Paper: Instrument Serif shelf names, DM Mono counts, oak planks." },
        ],
      },
      {
        heading: "App icon",
        body: "Six directions, each checked at real size on a home screen. The wax seal won: it still reads at 60px and feels like an invitation.",
        images: [
          { src: boundIcons, wide: true, caption: "Blackletter B, On the shelf, Ribbon marker, Wax seal, Cameo, Torn page." },
          { src: boundIconHome, wide: true, rounded: true, caption: "The wax seal on a real home screen, next to Apple's own icons." },
        ],
      },
      {
        heading: "Exploring UI components",
        body: "The pieces that make up Bound, rebuilt here in code. Tap them.",
        components: "bound",
      },
      {
        heading: "What's next",
        list: [
          "Recommendations: pass a book to a clubmate.",
          "Sign in with Apple, and a TestFlight beta for my own club.",
          "Meetup reminders and add-to-calendar.",
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
    sections: [
      {
        heading: "Why I built it",
        body: "For someone in a wheelchair, a route is only as good as its worst block. AccessMap proved a slope-aware map could work in Seattle. I wanted it for San Francisco, built end to end: data pipeline, routing engine and app.",
      },
      {
        // empathy map: who Even is for, in their own words
        heading: "Who it's for",
        body: "A route is only as good as its worst block. This is who that matters to.",
        empathy: {
          who: "Manual and power wheelchair users, people with walkers or canes, and parents pushing strollers in San Francisco.",
          says: ["Is there a ramp on that corner?", "The map said 12 minutes. It took me 40."],
          thinks: ["One steep block and the whole trip fails.", "I don't want to get stuck halfway."],
          does: ["Checks Street View before leaving", "Plans around hills from memory", "Sticks to long routes they already know"],
          feels: ["anxious", "stuck", "frustrated", "cautious", "dependent"],
          hears: ["\"It's just around the corner.\"", "Directions built for distance and time, not slope"],
          needs: ["A route that fits their limits", "A reason to trust it before they go"],
        },
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
        bare: true, // trip info and directions phones straight on the page, no grey panels
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
        // live UI components rebuilt in code, on the app's own grid paper
        heading: "Exploring UI components",
        body: "The pieces that make up Even, rebuilt here in code. Try pressing the buttons.",
        components: "even",
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
    // tools grid at the bottom of the case study
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
    metrics: [
      { value: "77%", label: "Curb coverage, up from 27%" },
      { value: "4", label: "Mobility profiles" },
      { value: "9 → 5", label: "Raw path pieces merged into direction steps on a test route" },
    ],
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
    sections: [
      {
        heading: "Why I built it",
        body: "Battery teams don't check a pack from a settings screen. They read the gas gauge directly, one register at a time, to catch a cell running hot or capacity fading faster than it should. I wanted to build that whole path myself: the bus, the decoding, the API, the database and the dashboard on top.",
      },
      {
        heading: "What it shows",
        body: "Two laptop packs and two phone batteries, simulated at 60× real time so a full charge cycle fits in a few minutes. Pick one and everything below follows it.",
        clipsWidth: "mx-auto md:w-[68%]", // smaller, centered
        clips: [
          { mp4: cellscopeChartsMp4, poster: cellscopeChartsPoster, caption: "Four synced charts instead of one with two y-axes. Hovering one moves the crosshair on all of them." },
        ],
      },
      {
        heading: "Reading the wire",
        body: "Nothing comes off the bus as a nice number. Current is a signed 16-bit word, temperature is tenths of a kelvin, and status is a set of bit flags. Every value on the dashboard starts as one of these words.",
        steps: [
          {
            label: "One decoder",
            text: "Takes anything with smbus2's read_word_data, so a real I²C adapter drops in without touching the API or the UI.",
            file: "simulator.py",
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
        # ...plus capacity, cycle count and time to empty/full
    }`,
          },
        ],
        clipsWidth: "mx-auto md:w-[68%]", // smaller, centered
        clips: [
          { mp4: cellscopeRegsMp4, poster: cellscopeRegsPoster, caption: "The register inspector: each raw word next to what it means, flashing when it changes between polls." },
        ],
      },
      {
        heading: "A battery worth watching",
        body: "A random number generator makes a boring chart, so each battery runs a small physics model.",
        stepRow: true,
        steps: [
          { label: "Charge", text: "Charge left is current integrated over time, the same coulomb counting a real gas gauge does." },
          { label: "Voltage", text: "Read off a Li-ion curve, minus current times internal resistance, so it sags under load." },
          { label: "Charging", text: "Constant current to 80%, then a taper as it fills, like a real charger." },
          { label: "Heat and wear", text: "Heats with current squared, and loses a little capacity every cycle." },
        ],
      },
      {
        heading: "Built for serverless",
        body: "Vercel functions don't keep memory between requests, so the simulator can't either. Each poll rebuilds the battery from its last stored reading, steps it forward and reads it through the bus. Postgres is the only source of truth.",
        steps: [
          {
            label: "Stateless, throttled polling",
            text: "Ten open tabs still write one reading per tick, and a quiet hour resumes where it left off instead of draining every battery to zero.",
            file: "telemetry.py",
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
        heading: "Two ways in",
        body: "REST for the dashboard, and JSON-RPC 2.0 on the same Flask app for scripts and test rigs, with batch requests, notifications and the spec's error codes. Errors come back as JSON either way.",
      },
      {
        heading: "Design",
        body: "Quiet and close to Apple's own tools: SF Pro for text, SF Mono for every hex word and serial, one blue accent, and green or red only when a battery is charging or low. The laptop and phone icons are drawn from scratch to match.",
        brand: {
          colors: [
            { name: "Paper", hex: "#F5F5F7", note: "Page" },
            { name: "Ink", hex: "#1D1D1F", note: "Text and charge" },
            { name: "Blue", hex: "#0071E3", note: "Accent and chart lines" },
            { name: "Green", hex: "#34C759", note: "Charging" },
            { name: "Red", hex: "#FF3B30", note: "Low and alarms" },
          ],
        },
        media: [
          {
            bare: true, // phone screens straight on the page, no grey panels
            src: [
              { src: cellscopeMobileFleet, tall: true, inset: "w-[86%] h-[90%]", caption: "On a phone, the fleet stacks into one column." },
              { src: cellscopeMobileDetail, tall: true, inset: "w-[86%] h-[90%]", caption: "Pack detail: stats go two-up and the charts stack." },
            ],
          },
        ],
      },
      {
        // live UI components rebuilt in code, on CellScope's light page
        heading: "Exploring UI components",
        body: "The pieces of the dashboard, rebuilt here in code.",
        components: "cellscope",
      },
      {
        heading: "What's next",
        list: [
          "Connect a real gas gauge through a Total Phase Aardvark.",
          "Alembic migrations instead of create_all.",
          "Alerts when a battery crosses a temperature or health limit.",
        ],
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
    metrics: [
      { value: "10", label: "Smart Battery registers read every poll" },
      { value: "17", label: "pytest tests across decoding, API and RPC" },
      { value: "1", label: "Class to swap for real hardware" },
      { value: "60×", label: "Simulated time, a full cycle in minutes" },
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
      {
        // one landscape iPhone that plays the other three screens in turn, pills underneath
        heading: "The other screens",
        body: "Pick a screen or let it play through.",
        walkthrough: {
          frame: iphoneLandscapeFrame,
          landscape: true,
          bottom: true,
          chapters: [
            { label: "Splash", text: "The pixel dog and wordmark on launch.", mp4: zoomiesSplashMp4, poster: zoomiesSplashPoster },
            { label: "Tap to start", text: "Five hearts, a distance counter, and a bone to grab back a heart.", mp4: zoomiesStartMp4, poster: zoomiesStartPoster },
            { label: "Menu and rules", text: "Resume, rules, credits and exit, all in custom pixel buttons.", mp4: zoomiesMenuMp4, poster: zoomiesMenuPoster },
          ],
        },
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
    sections: [
      {
        heading: "Design inspiration",
        body: "The show's terminals are mostly empty navy, one cyan, and numbers that feel alive. I studied the boot screen and the file screen frame by frame before writing any CSS.",
        clips: [
          { mp4: lumonShowScreenMp4, poster: lumonShowScreenPoster, caption: "From Severance (Apple TV+): the Lumon mark on the boot screen." },
          { mp4: lumonShowUiMp4, poster: lumonShowUiPoster, caption: "From Severance (Apple TV+): a file opening on the terminal." },
        ],
      },
      {
        heading: "What I built",
        body: "The same two moments, rebuilt for the browser.",
        clips: [
          { mp4: lumonDemoMp4, poster: lumonDemoPoster, caption: "The boot screen into the refinement grid, with the cursor magnifying numbers and the bins underneath." },
          { mp4: lumonReportsMp4, poster: lumonReportsPoster, caption: "Employee reports: names, tasks refined and compliance scores." },
        ],
      },
      {
        heading: "Making the numbers feel alive",
        body: "No framework, about ninety lines of JavaScript.",
        stepRow: true,
        steps: [
          { label: "Random digits", text: "Every cell gets a random number on load, so no two files look the same." },
          { label: "Drift", text: "Some cells float up or sideways, each with its own delay and speed." },
          { label: "Swell", text: "Cells within 100px of the cursor scale up to 2.6x, easing back to normal by 200px." },
          { label: "Reports", text: "A second screen renders employee reports from a small data set." },
        ],
      },
      {
        heading: "Design",
        body: "Two colors and two typefaces: navy and phosphor cyan, Share Tech Mono for every digit and Russo One for the wordmark.",
        brand: {
          colors: [
            { name: "Cyan", hex: "#8EE3F1", note: "Every line, digit and glow" },
            { name: "Navy", hex: "#08203A", note: "The terminal" },
            { name: "Deep navy", hex: "#041B2D", note: "Shadows and depth" },
          ],
        },
      },
      {
        // live UI components rebuilt in code, in the terminal's colors
        heading: "Exploring UI components",
        body: "The pieces of the terminal, rebuilt here in code. Try the grid.",
        components: "lumon",
      },
      {
        heading: "What's next",
        list: [
          "A features dashboard linking the other screens.",
          "A cryptic message board and interactive tasks.",
          "Sound effects to match the show.",
        ],
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
