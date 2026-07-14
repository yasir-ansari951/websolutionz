export type Metric = { label: string; value: string };

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  longDescription: string;
  image: string;
  accent: string;
  liveUrl: string;
  stack: string[];
  challenge: string;
  solution: string;
  metrics: Metric[];
  deliverables: string[];
};

export const projects: Project[] = [
  {
    id: "noir",
    name: "NOIR FC",
    category: "Sports E-Commerce",
    year: "2025",
    client: "NOIR Football Club",
    role: "E-Commerce Design & Development",
    description:
      "Headless street-football storefront with motion-led product storytelling and a 3.2x conversion lift.",
    longDescription:
      "NOIR FC came from a slow Shopify theme that buried their product story. We rebuilt it as a headless storefront with a cinematic drop experience, gesture-driven galleries and instant search.",
    image: "/images/project-noir.jpg",
    accent: "#ff2a35",
    liveUrl: "#",
    stack: ["Next.js", "Shopify Hydrogen", "Framer Motion", "Tailwind", "Vercel"],
    challenge:
      "52% mobile bounce rate and a 2.8s checkout that killed hype drops.",
    solution:
      "A 60fps product theater, predictive search, and a one-page checkout with Apple Pay and wallet passes.",
    metrics: [
      { label: "Conversion", value: "+220%" },
      { label: "LCP", value: "1.1s" },
      { label: "Bounce", value: "-48%" },
    ],
    deliverables: ["Storefront", "Custom CMS", "Checkout Optimization", "Drops System"],
  },
  {
    id: "vanta",
    name: "VANTA STUDIO",
    category: "Creative Portfolio",
    year: "2025",
    client: "VANTA Production House",
    role: "Portfolio Experience",
    description:
      "Immersive portfolio for a film production house built around scroll-driven cinematic sequences.",
    longDescription:
      "VANTA needed their reel to feel like a film, not a grid. We turned their case studies into horizontal film strips with synced audio-reactive type.",
    image: "/images/project-vanta.jpg",
    accent: "#e10613",
    liveUrl: "#",
    stack: ["Next.js 15", "GSAP ScrollTrigger", "Lenis", "Prismic", "R3F"],
    challenge:
      "Showreel was being skipped and case studies all looked the same.",
    solution:
      "Chapter-based scrolling, masked reveals, and a director-cut mode that auto-plays projects like a movie.",
    metrics: [
      { label: "Time on site", value: "+185%" },
      { label: "Reel completes", value: "73%" },
      { label: "Inquiries", value: "+92%" },
    ],
    deliverables: ["Art Direction", "Motion System", "CMS", "Case Study Template"],
  },
  {
    id: "eclipse",
    name: "ECLIPSE",
    category: "SaaS Dashboard",
    year: "2024",
    client: "Eclipse Analytics",
    role: "SaaS Product Design & Build",
    description:
      "Data-heavy analytics platform redesigned into a calm, high-density interface loved by power users.",
    longDescription:
      "Eclipse's dashboard was powerful but exhausting. We rebuilt the entire data layer for density, custom command palette, and real time collaboration.",
    image: "/images/project-eclipse.jpg",
    accent: "#ff2a35",
    liveUrl: "#",
    stack: ["React", "TypeScript", "TanStack", "WebSockets", "Tailwind"],
    challenge: "Users needed 12 clicks to build a report; churn at month 2.",
    solution:
      "Composable widgets, cmd-k navigation, and an insight engine that surfaces anomalies automatically.",
    metrics: [
      { label: "Report time", value: "-71%" },
      { label: "NPS", value: "+34" },
      { label: "Retention", value: "+26%" },
    ],
    deliverables: ["Dashboard", "Design System", "API Layer", "Onboarding"],
  },
  {
    id: "pulse",
    name: "PULSE",
    category: "Music Streaming",
    year: "2024",
    client: "Pulse Audio",
    role: "Mobile & Web Product",
    description:
      "Next-gen audio app with reactive visuals, gesture controls and a fiercely loyal community.",
    longDescription:
      "Pulse wanted a music app that felt alive. We built reactive canvases that pulse to audio, swipe-to-queue, and spatial listening rooms.",
    image: "/images/project-pulse.jpg",
    accent: "#e10613",
    liveUrl: "#",
    stack: ["React Native", "Expo", "Web Audio API", "Supabase", "Framer Motion"],
    challenge: "Commodity UI with no differentiator in a crowded market.",
    solution:
      "Audio-reactive shader visuals, haptics-mapped controls, and a creator-invite growth loop.",
    metrics: [
      { label: "DAU", value: "+140%" },
      { label: "Avg session", value: "38m" },
      { label: "App Store", value: "4.9★" },
    ],
    deliverables: ["iOS/Android App", "Web Player", "Design Language", "Growth"],
  },
  {
    id: "aether",
    name: "AETHER",
    category: "Fashion Lookbook",
    year: "2023",
    client: "Aether Atelier",
    role: "Digital Lookbook & Store",
    description:
      "Editorial digital lookbook blurring the line between magazine, film and online store.",
    longDescription:
      "Aether drops are cultural moments. We built an editorial engine where every look is a story with shoppable film frames.",
    image: "/images/project-aether.jpg",
    accent: "#ff2a35",
    liveUrl: "#",
    stack: ["Next.js", "Sanity", "Shopify", "Lenis", "Cloudinary"],
    challenge:
      "Lookbooks were static PDFs; no shoppable flow and no SEO.",
    solution:
      "Scroll-native editorial with chapter markers, shoppable hot-spots, and automated OG generation.",
    metrics: [
      { label: "Lookbook CTR", value: "+210%" },
      { label: "SEO traffic", value: "+162%" },
      { label: "Press features", value: "12" },
    ],
    deliverables: ["Lookbook System", "Editorial CMS", "E-Comm Integration"],
  },
  {
    id: "orbit",
    name: "ORBIT",
    category: "Fintech App",
    year: "2024",
    client: "Orbit Money",
    role: "Banking Experience",
    description:
      "A bold banking experience that turned a sterile category into a confident, premium ritual.",
    longDescription:
      "Orbit needed trust and taste. We redesigned onboarding, money movement and insights around calm confidence and speed.",
    image: "/images/project-orbit.jpg",
    accent: "#e10613",
    liveUrl: "#",
    stack: ["Next.js", "TypeScript", "Plaid", "Prisma", "Biometrics"],
    challenge:
      "Trust was low; users abandoned KYC and couldn't parse spending.",
    solution:
      "Progressive KYC, biometric vault, and auto-tagged insights with plain language.",
    metrics: [
      { label: "KYC completion", value: "+88%" },
      { label: "Support tickets", value: "-53%" },
      { label: "Activation", value: "+61%" },
    ],
    deliverables: ["Web App", "Mobile Web", "KYC Flow", "Design System"],
  },
];

export type Service = {
  no: string;
  title: string;
  kicker: string;
  description: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  relatedProjectId: string;
};

export const services: Service[] = [
  {
    no: "01",
    title: "WEB DESIGN",
    kicker: "Art Direction / Interface",
    description:
      "Bold layouts, razor hierarchy and motion that gives every pixel intention. From editorial drops to high-converting stores.",
    deliverables: ["Art Direction", "Design Systems", "Prototypes"],
    image: "/images/service-webdesign.jpg",
    imageAlt: "Designer working on a dark premium website design in Figma.",
    relatedProjectId: "vanta",
  },
  {
    no: "02",
    title: "WEB DEVELOPMENT",
    kicker: "Engineering / Performance",
    description:
      "Production-grade Next.js builds with 60fps interactions, headless commerce and Core Vitals in the green.",
    deliverables: ["Next.js", "Headless CMS", "Performance"],
    image: "/images/project-eclipse.jpg",
    imageAlt: "Dark SaaS analytics dashboard on a laptop screen.",
    relatedProjectId: "eclipse",
  },
  {
    no: "03",
    title: "UI/UX DESIGN",
    kicker: "Research / Product",
    description:
      "Human-centred product design with flows that turn first-time visitors into power users.",
    deliverables: ["UX Research", "Flows", "Micro-interactions"],
    image: "/images/service-uiux.jpg",
    imageAlt: "UX designer sketching wireframes and user flows.",
    relatedProjectId: "pulse",
  },
  {
    no: "04",
    title: "BRANDING",
    kicker: "Identity / Strategy",
    description:
      "Street-wise identities with a pulse. Naming, visual systems and voice that refuse to be ignored.",
    deliverables: ["Logo & Mark", "Identity", "Guidelines"],
    image: "/images/service-branding.jpg",
    imageAlt: "Branding moodboard with logo sketches and color swatches.",
    relatedProjectId: "noir",
  },
  {
    no: "05",
    title: "SEO",
    kicker: "Visibility / Growth",
    description:
      "Technical and content SEO engineered to compound. Schema, speed and authority from day one.",
    deliverables: ["Technical SEO", "Content", "Authority"],
    image: "/images/service-seo.jpg",
    imageAlt: "SEO analytics dashboard showing traffic growth.",
    relatedProjectId: "aether",
  },
  {
    no: "06",
    title: "DIGITAL MARKETING",
    kicker: "Acquisition / Scale",
    description:
      "Performance campaigns and content engines that put you in front of the right people, relentlessly.",
    deliverables: ["Paid Social", "Content", "CRO"],
    image: "/images/project-orbit.jpg",
    imageAlt: "Fintech dashboard used for growth marketing analysis.",
    relatedProjectId: "orbit",
  },
];

export type Step = {
  no: string;
  title: string;
  text: string;
};

export const processSteps: Step[] = [
  { no: "01", title: "DISCOVER", text: "Goals, audience and market truth. We find the sharp edge." },
  { no: "02", title: "STRATEGY", text: "A focused blueprint that aligns brand, product and business." },
  { no: "03", title: "DESIGN", text: "We craft the experience — bold, intentional and unmistakably yours." },
  { no: "04", title: "DEVELOPMENT", text: "Engineering brings it to life with performance baked in." },
  { no: "05", title: "TESTING", text: "QA across devices, speed, accessibility and edge cases." },
  { no: "06", title: "LAUNCH", text: "Ship, measure and optimise for momentum that lasts." },
];

export type Why = {
  title: string;
  text: string;
};

export const whyItems: Why[] = [
  { title: "FAST", text: "Lean teams, rapid cycles. We ship in weeks, not quarters." },
  { title: "MODERN", text: "Future-proof stacks and motion-first systems." },
  { title: "CREATIVE", text: "Distinct concepts that refuse to look like anyone else." },
  { title: "RESULTS-DRIVEN", text: "Every decision laddered to measurable outcomes." },
  { title: "SEO OPTIMIZED", text: "Built to be found — technically airtight day one." },
  { title: "HIGH CONVERSION", text: "Design that turns attention into revenue." },
];

export type Testimonial = {
  name: string;
  company: string;
  review: string;
  initials: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ayan Malik",
    company: "NOIR FC — Founder",
    review:
      "WEBZ SLOUTINZ gave our brand a premium website that loads fast, looks sharp and converts better than our previous store.",
    initials: "AM",
    image:
      "https://images.pexels.com/photos/37148344/pexels-photo-37148344.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=400",
  },
  {
    name: "Nadia Khan",
    company: "VANTA — Creative Director",
    review:
      "The design direction was bold without being messy. Every section felt intentional and true to our identity.",
    initials: "NK",
    image:
      "https://images.pexels.com/photos/31865389/pexels-photo-31865389.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=400",
  },
  {
    name: "Omar Saeed",
    company: "ECLIPSE — SaaS Owner",
    review:
      "They handled strategy, UI and development in one clean process. The product feels modern and easy to scale.",
    initials: "OS",
    image:
      "https://images.pexels.com/photos/37148340/pexels-photo-37148340.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=400",
  },
  {
    name: "Hira Shah",
    company: "AETHER — Marketing Lead",
    review:
      "Our lookbook finally matches our clothes. SEO structure and shoppable editorial made an immediate difference.",
    initials: "HS",
    image:
      "https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=400",
  },
  {
    name: "Bilal Ahmed",
    company: "PULSE — Co-founder",
    review:
      "Fast communication, beautiful execution and no generic templates. An experience our community keeps talking about.",
    initials: "BA",
    image:
      "https://images.pexels.com/photos/10657877/pexels-photo-10657877.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=400",
  },
  {
    name: "Sara Iqbal",
    company: "ORBIT — Product Manager",
    review:
      "The new banking UX feels premium on desktop and mobile. KYC, spending and activation all improved.",
    initials: "SI",
    image:
      "https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=400&h=400",
  },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 120, suffix: "+", label: "Real Projects Shipped" },
  { value: 95, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

export const navLinks = [
  { label: "Home", href: "#home", index: "01" },
  { label: "Services", href: "#services", index: "02" },
  { label: "Work", href: "#work", index: "03" },
  { label: "About", href: "#about", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
];

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/web__solutionz?igsh=c2phcTVvYnJjdDBn",
  },
];
