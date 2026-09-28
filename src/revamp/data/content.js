import atlassianImg from "../../assets/atlassian.png";
import amazonImg from "../../assets/amazon.png";
import ucImg from "../../assets/uc.png";

// Copy for About / Experience / Writing / footer
// bullets come from the main site's Experience page
export const experience = [
  {
    company: "Joydrop",
    title: "Founding Product Engineer",
    when: "Sep 2025 – Now",
    where: "San Francisco, CA",
    whereIcon: "sf", // Golden Gate icon next to the location
    link: "https://app.joydrop.me/",
    caseStudy: "#/work/joydrop",
    bullets: [
      "Delivered the 0→1 build as founding engineer, owning the full stack end to end and shipping the product across web and iOS.",
      "Built the Communities feature end to end, letting users create public and private groups, send invites, and self-manage join requests.",
      "Shipped push notifications (Expo + NestJS) across 8+ trigger types and released the build solo via EAS and CI/CD to TestFlight.",
      "Fixed 4+ native iOS build and toolchain blockers (Xcode signing, CocoaPods, compiler bugs), unblocking real-device QA and releases.",
      "Boosted app performance ~30% while owning production triage and UI/UX execution from Figma to shipped code.",
    ],
  },
  {
    company: "Bright Mind Enrichment",
    title: "UI/UX Web Developer",
    when: "Sep 2024 – Jul 2025",
    where: "San Francisco, CA",
    whereIcon: "sf",
    link: "https://brightmindenrichment.org/",
    bullets: [
      "Built and maintained donation pages with smoother, secure payment flows, lifting conversions by 20%.",
      "Cut load times by 30% with optimized React components and REST API integrations.",
      "Brought API response times down 35% and bounce rates down 20% by streamlining backend logic.",
      "Shipped accessible, high-performance features end to end, growing traffic and engagement by 25%.",
    ],
  },
  {
    company: "Toyota",
    title: "Full Stack Developer, Production Control",
    when: "May – Aug 2023",
    where: "Georgetown, KY",
    whereIcon: "kentucky",
    link: "https://pressroom.toyota.com/facility/toyota-motor-manufacturing-kentucky/",
    bullets: [
      "Designed and deployed SQL pipelines for Supplier Change Requests, reducing manual errors by 20%.",
      "Automated workflows with Azure and Kaizen methods, improving scalability and collaboration by 30%.",
      "Built real-time Power BI dashboards with CI/CD, cutting manual reporting by 40%.",
      "Automated supplier change request data across 5+ teams, making data retrieval 42% faster.",
    ],
  },
  {
    company: "BECO Ventures",
    title: "UI Process Engineer",
    when: "Sep – Dec 2022",
    where: "Singapore",
    whereIcon: "singapore",
    link: "https://beco-ventures.com/",
    bullets: [
      "Built a cloud data pipeline for real-time monitoring of 10K+ greenhouse sensor readings.",
      "Built interactive dashboards with React, Python, SQL, and MongoDB, making users 40% more efficient.",
      "Moved reporting to real-time processing, cutting generation time by 30%.",
      "Tuned AWS infrastructure for 99.9% uptime and refined user flows to drive adoption.",
    ],
  },
  {
    company: "P&G",
    title: "Data Analyst, UC Simulation Center",
    when: "Jan – Apr 2022",
    where: "Cincinnati, OH",
    whereIcon: "cincinnati",
    link: "https://us.pg.com/",
    bullets: [
      "Automated analytics with Excel VBA and REST APIs, cutting processing time by 40% for global warehouse operations.",
      "Built Power BI dashboards that sped up decisions by 25% across 3+ time zones.",
      "Added PyTest and automated testing pipelines to validate data accuracy.",
      "Designed a shared analytics system so teams worldwide entered data the same way.",
    ],
  },
  {
    company: "Kroger",
    title: "CS Intern, Virtual Innovation Studio",
    when: "Jan – Apr 2020",
    where: "Cincinnati, OH",
    whereIcon: "cincinnati",
    link: "https://apps.apple.com/us/app/kroger/id403901186",
    bullets: [
      "Enhanced Kroger Plus iOS features based on usage data, raising engagement 15% and retention 10%.",
      "Analyzed customer behavior to deliver personalized promotions, boosting interaction by 20%.",
      "Designed new navigation features that improved accessibility for 500K+ users.",
      "Folded customer feedback into iterative UI/UX updates, raising App Store ratings by 12%.",
    ],
  },
];

// images + blurbs carried over from the main site's Articles page
export const writing = [
  {
    title: "I Interviewed at Atlassian. Here's Everything You Need to Know",
    description: "What the Full Stack Software Engineer loop at Atlassian was actually like, from their team-based hiring process to every round.",
    where: "Medium",
    when: "Dec 2025",
    read: "8 min read",
    image: atlassianImg,
    link: "https://medium.com/@ritikajoshi141/i-interviewed-at-atlassian-heres-everything-you-need-to-know-b126553a03d5",
  },
  {
    title: "AWS Front End Interview Series: From Application to Phone Screen, Part 1",
    description: "A recent CS grad's walkthrough of the front-end engineering interview process at Amazon Web Services, and everything I wish I'd known going in.",
    where: "Medium",
    when: "Jun 2024",
    read: "7 min read",
    image: amazonImg,
    link: "https://medium.com/@ritikajoshi141/aws-front-end-interview-series-from-application-to-phone-screen-part-1-of-2-8bd24350fc41",
  },
  {
    title: "Marking Milestones: my UC commencement student address",
    description: "How our class navigated the twists and turns of UC together, united as Bearcats through Juncta Juvant and Next Lives Here.",
    where: "UC News",
    when: "Apr 2024",
    read: "9 min read",
    image: ucImg,
    link: "https://www.uc.edu/news/articles/2024/04/uc-recognizes-its-largest-graduating-class-in-history-in-three-days-of-commencement.html",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/RJoshi141" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ritika-joshi-9395591a7/" },
  { label: "Medium", href: "https://medium.com/@ritikajoshi141" },
  { label: "Email", href: "mailto:ritikajoshi141@gmail.com" },
];
