// Everything the site says lives here. Facts only: every line can be checked against a repo, a README or a record.

export type Project = {
  slug: string;
  name: string;
  kind: string;
  year: string;
  status: "Live" | "Shipped" | "Building";
  summary: string;
  details: string[];
  stack: string[];
  tags: string[];
  links: { label: string; url: string }[];
  /** three colours for the generated cover art: base, mid, highlight */
  palette: [string, string, string];
  featured?: boolean;
};

export const site = {
  name: "Vishal Vana",
  short: "VANA",
  title: "Vishal Vana: AI agents, MCP servers and backends",
  description:
    "I build AI agents, MCP servers and Spring Boot backends that do real work, from multi-tenant platforms to apps that talk to hardware.",
  heroLine: "I build AI agents, MCP servers and backends that do real work.",
  location: ["India", "IST (UTC+5:30)"],
  role: "Developer at BelWo",
  email: "vishalvana592003@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/vishalvana" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vishalvana" },
    { label: "X", url: "https://x.com/vishalvana_" },
    { label: "Substack", url: "https://vishalvana.substack.com" },
    { label: "YouTube", url: "https://www.youtube.com/@vishuvanaa" },
  ],
};

export const about = {
  lead: "12 builds so far, from multi-tenant backends to apps that talk to hardware. Now I build AI agents and the backends they run on.",
  paragraphs: [
    "I started with Android apps and Spring Boot backends, and I still go deepest on the parts most people skip: auth, caching, load balancing. That plumbing decides whether a system holds up.",
    "Now my focus is AI agents and automation. AI tools make me faster at things I already understand. They don't replace understanding them.",
    "I like system design, making slow things fast, and research, with one IEEE paper so far. I build in public and write about it on Substack.",
  ],
};

export const capabilities = [
  { title: "Agents & automation", line: "AI agents wired to real tools through MCP, and jobs that run on their own." },
  { title: "Backends & APIs", line: "Auth, multi-tenant data, API keys and caching, with tests." },
  { title: "Scraping & data", line: "Pull data from the web, clean it, and make it searchable." },
  { title: "Mobile apps", line: "Flutter and native Android, including apps that set up hardware." },
];

export const experience = [
  { when: "Aug 2026 – now", what: "Developer L1", where: "BelWo" },
  {
    when: "Nov 2025 – Mar 2026",
    what: "Mobile Developer Intern",
    where: "Nomo Toyz",
    note: "Built their cross-platform Flutter app from scratch, including ESP32 device provisioning.",
  },
  { when: "2022 – 2026", what: "B.E. Computer Science", where: "Chandigarh University" },
];

export const research = [
  {
    title: "Navigating the Future of Mental Health: A Comprehensive Review of Tracking Applications",
    venue: "IEEE",
    when: "Dec 2024",
  },
  { title: "Self-Calibrating EMG System for Adaptive Signal Processing", venue: "Patent (proposed)", when: "" },
  { title: "Secure Healthcare Data Storage on Blockchain using Deep Learning", venue: "Paper", when: "" },
];

/** The live numbers shown in the "Now shipping" strip on the home page. */
export const nowShipping = {
  name: "Agent-first BaaS",
  line: "My Spring Boot backend-as-a-service now speaks MCP. Claude Code set up a full book-club app backend on it in 31 seconds.",
  url: "https://baas-demo.onrender.com",
  stats: [
    { value: "7", label: "MCP tools" },
    { value: "37", label: "unit tests" },
    { value: "31s", label: "prompt to backend" },
  ],
};

export const projects: Project[] = [
  {
    slug: "baas",
    name: "Agent-first BaaS",
    kind: "Backend-as-a-Service + MCP server",
    year: "2026",
    status: "Live",
    summary: "A backend other apps plug into: sign-up, login, API keys and data storage, isolated per project. AI agents can set one up through MCP.",
    details: [
      "JWT auth for both platform developers and their app users",
      "Isolated projects, each with its own API key, users and collections; a key only works for its own project",
      "Dynamic JSON document storage on PostgreSQL",
      "MCP server (POST /mcp) with 7 tools; creating a project is idempotent",
      "Real Claude Code runs built todo, recipe and book-club app backends end to end",
      "37 unit tests and an end-to-end smoke test against the live deploy",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "MCP"],
    tags: ["backend", "mcp", "agents", "multi-tenant"],
    links: [
      { label: "Live", url: "https://baas-demo.onrender.com" },
      { label: "Repo", url: "https://github.com/vishalvana/BackendAsService" },
    ],
    palette: ["#140a05", "#ff4f1f", "#ffd2b8"],
    featured: true,
  },
  {
    slug: "kharcha",
    name: "Kharcha",
    kind: "Personal money buddy (Android)",
    year: "2026",
    status: "Shipped",
    summary: "I'm bad with money, so I built an app that tells me how much I can spend today, and when to stop.",
    details: [
      "Turns bank SMS into a daily safe-to-spend limit that recalculates every day",
      "Scan & Pay through any UPI app, with today's budget shown before paying",
      "Offline by design: no server, no internet permission; fingerprint lock and encrypted backups",
      "Hinglish nudges and a 10 PM day summary",
      "136 unit tests on the money logic, written test-first",
    ],
    stack: ["Flutter", "Dart", "Kotlin", "SQLite"],
    tags: ["mobile", "android", "offline", "tdd"],
    links: [],
    palette: ["#06140c", "#1f8a4c", "#f2b33d"],
    featured: true,
  },
  {
    slug: "mission-control",
    name: "Mission Control",
    kind: "Portfolio + MCP server",
    year: "2026",
    status: "Live",
    summary: "A portfolio Claude can read: connect it as an MCP server and ask what I've built.",
    details: [
      "Hand-written MCP server (Streamable HTTP) with 5 tools",
      "Ship log pulled live from GitHub",
      "Halftone and depth portraits drawn in canvas and WebGL from one photo",
    ],
    stack: ["Next.js", "TypeScript", "WebGL", "MCP"],
    tags: ["agents", "mcp", "frontend"],
    links: [
      { label: "Live", url: "https://vishalvana.vercel.app" },
      { label: "Repo", url: "https://github.com/vishalvana/mission-control" },
    ],
    palette: ["#0d0f12", "#8a929c", "#ff5a1f"],
    featured: true,
  },
  {
    slug: "nomo-toyz",
    name: "Nomo Toyz app",
    kind: "IoT mobile app (internship)",
    year: "2025–26",
    status: "Shipped",
    summary: "Set up a smart toy from your phone: the app provisions the ESP32 inside it.",
    details: [
      "Built from scratch through the full development cycle",
      "ESP32 hardware provisioning for device onboarding",
      "Modular authentication",
    ],
    stack: ["Flutter", "Dart", "Firebase", "ESP32"],
    tags: ["mobile", "iot", "client work"],
    links: [],
    palette: ["#0b0820", "#5b3df5", "#7ff0ff"],
    featured: true,
  },
  {
    slug: "atomicflow",
    name: "AtomicFlow",
    kind: "Team task manager",
    year: "2026",
    status: "Live",
    summary: "Teams plan projects, assign tasks and track progress, with permissions by role.",
    details: ["Role-based access control", "Projects, tasks and progress tracking", "Separate backend and frontend, both deployed"],
    stack: ["Java", "Spring Boot", "JavaScript"],
    tags: ["backend", "fullstack", "auth"],
    links: [
      { label: "Backend", url: "https://github.com/vishalvana/AtomicFlow" },
      { label: "Frontend", url: "https://github.com/vishalvana/atomic-Frontend" },
    ],
    palette: ["#03121a", "#0f6f8f", "#c8f7ff"],
    featured: true,
  },
  {
    slug: "mini-cache",
    name: "Mini Cache Engine",
    kind: "In-memory cache",
    year: "2026",
    status: "Shipped",
    summary: "A cache engine built from scratch: TTL expiry, thread-safe storage, hit and miss stats.",
    details: ["Thread-safe storage on ConcurrentHashMap", "Configurable TTL with scheduled cleanup", "Hit and miss statistics over REST"],
    stack: ["Java", "Spring Boot"],
    tags: ["backend", "system design", "performance"],
    links: [{ label: "Repo", url: "https://github.com/vishalvana/mini-cache" }],
    palette: ["#1a0612", "#d6336c", "#ffe0ec"],
    featured: true,
  },
  {
    slug: "job-aggregator",
    name: "Job aggregation platform",
    kind: "Search across job sources",
    year: "2026",
    status: "Building",
    summary: "One search across many job sources, with filters and duplicates removed.",
    details: ["Aggregates jobs from multiple sources", "Unified search and filtering", "Duplicate removal and automatic refresh"],
    stack: ["JavaScript"],
    tags: ["scraping", "automation", "search"],
    links: [{ label: "Repo", url: "https://github.com/vishalvana/Doda" }],
    palette: ["#14120a", "#b8a12e", "#fff6c2"],
  },
  {
    slug: "mern-job-scraper",
    name: "MERN job scraper",
    kind: "Scraper + search UI",
    year: "2026",
    status: "Shipped",
    summary: "Pulls RemoteOK and We Work Remotely feeds, normalizes them into MongoDB, and makes them searchable.",
    details: ["Uses only public JSON/RSS feeds meant for programmatic use", "Normalized postings in MongoDB", "React UI to browse, search and filter"],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    tags: ["scraping", "fullstack"],
    links: [{ label: "Repo", url: "https://github.com/vishalvana/ROK_Scrapper-" }],
    palette: ["#07140a", "#3c9a3c", "#d9ffd0"],
  },
  {
    slug: "web-scraper",
    name: "Spring Boot web scraper",
    kind: "Page extraction tool",
    year: "2026",
    status: "Shipped",
    summary: "Paste a URL, get the page back as structured data: title, meta, headings, links, images, text.",
    details: ["Jsoup-based extraction", "Optional custom CSS selector", "Built-in web UI and a JSON API"],
    stack: ["Java", "Spring Boot", "Jsoup"],
    tags: ["scraping", "backend", "api"],
    links: [{ label: "Repo", url: "https://github.com/vishalvana/Spring-Scrapper" }],
    palette: ["#10091a", "#8b5cf6", "#f0e6ff"],
  },
  {
    slug: "medoc-claim",
    name: "Medoc-Claim",
    kind: "Insurance claim system",
    year: "2026",
    status: "Live",
    summary: "The full insurance claim workflow in one Flutter app.",
    details: ["Complete claim workflow", "Built as a Flutter intern assignment"],
    stack: ["Flutter", "Dart"],
    tags: ["mobile", "flutter"],
    links: [
      { label: "Demo", url: "https://medoc-claim.netlify.app/" },
      { label: "Repo", url: "https://github.com/vishalvana/Medoc-Claim" },
    ],
    palette: ["#041016", "#1aa6b7", "#e6fbff"],
  },
  {
    slug: "ridesphere",
    name: "RideSphere",
    kind: "Android carpooling app",
    year: "2024",
    status: "Shipped",
    summary: "Host, search and manage carpools, with live location on Google Maps.",
    details: ["Real-time location tracking", "Multi-role authentication", "Firebase backend"],
    stack: ["Java", "Android", "Firebase", "Google Maps"],
    tags: ["mobile", "android"],
    links: [{ label: "Repo", url: "https://github.com/vishalvana/j_ridesphere" }],
    palette: ["#160b04", "#e07a1f", "#fff0d6"],
  },
  {
    slug: "shellspeak",
    name: "ShellSpeak",
    kind: "Terminal chat",
    year: "2026",
    status: "Shipped",
    summary: "Client-server chat over raw TCP sockets, written to learn threading and synchronization.",
    details: ["Concurrent reads and writes on separate threads", "Core Java only, no dependencies"],
    stack: ["Java"],
    tags: ["networking", "system design"],
    links: [{ label: "Repo", url: "https://github.com/vishalvana/ShellSpeak" }],
    palette: ["#0a0a0a", "#4a4a4a", "#e9e9e9"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
