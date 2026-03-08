"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Experience", "Projects", "Skills", "Contact"];

const EXPERIENCES = [
  {
    company: "Insyssky Softtech Private Limited",
    role: "Junior Software Developer",
    period: "Dec 2025 – Present",
    tag: "CURRENT",
    color: "#06B6D4",
    bullets: [
      "Built and maintained a scalable CMS using Next.js and Firebase for streamlined digital content management.",
      "Resolved critical JS bugs and optimised frontend architecture for high-performance, data-heavy modules.",
    ],
  },
  {
    company: "Marketysers Global Consulting LLP",
    role: "Content Writer",
    period: "Aug 2025 – Oct 2025",
    tag: "RESEARCH",
    color: "#8B5CF6",
    bullets: [
      "Developed comprehensive, data-driven market research reports with detailed segmentation and competitive analyses.",
      "Produced in-depth insights across diverse global industries to support strategic decision-making.",
    ],
  },
  {
    company: "Netscribes Data and Insights",
    role: "SEO Associate",
    period: "Mar 2025 – Aug 2025",
    tag: "SEO",
    color: "#A855F7",
    bullets: [
      "Documented key features for Flipkart products aligned with client requirements.",
      "Fostered strong relationships with clients and auditors, consistently meeting goals ahead of deadlines.",
    ],
  },
  {
    company: "ARC Document Solutions India",
    role: "Technical Content Writer",
    period: "Mar 2023 – Aug 2023",
    tag: "INTERNSHIP",
    color: "#6366f1",
    bullets: [
      "Enhanced documentation and analytical skills using MS Office 365 — Word, Excel, Access, and PowerPoint.",
      "Created impactful presentations and detailed Minutes of Meetings for corporate clients.",
    ],
  },
];

const PROJECTS = [
  {
    title: "CMS — Insyssky",
    tags: ["Next.js", "Firebase"],
    desc: "Scalable Content Management System to streamline digital content updates and database operations for a live production app.",
    url: null,
    featured: true,
  },
  {
    title: "Netflix Clone (Strawberry)",
    tags: ["HTML", "CSS"],
    desc: "Pixel-perfect recreation of the Netflix OTT platform interface built entirely with HTML and CSS.",
    url: "https://souradip-sdn.github.io/Strawberry",
    featured: false,
  },
  {
    title: "Car_Kharido Portal",
    tags: ["Angular", "TypeScript"],
    desc: "A full-featured car buying portal built using the Angular framework with dynamic listings and filtering.",
    url: "https://github.com/Souradip-Sdn/Car_Karido.git",
    featured: false,
  },
  {
    title: "BWU Texibition 2K22",
    tags: ["HTML", "CSS", "JS"],
    desc: "Recreated the official event registration portal for Brainware University's annual tech exhibition.",
    url: "https://souradip-sdn.github.io/Texibition-2K22",
    featured: false,
  },
];

const SKILLS_TECH = [
  { name: "Next.js", level: 75 },
  { name: "React / JS", level: 80 },
  { name: "HTML / CSS", level: 90 },
  { name: "Firebase", level: 70 },
  { name: "C++", level: 65 },
  { name: "SQL / MySQL", level: 60 },
  { name: "SEO / Keyword Research", level: 85 },
  { name: "MS Office 365", level: 90 },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "Brainware University",
    year: "2019 – 2023",
    score: "88.78%",
  },
  {
    degree: "Higher Secondary (10+2)",
    school: "Swami Dhananjoy Das Kathiya Baba Mission School",
    year: "2017 – 2019",
    score: "58.60%",
  },
  {
    degree: "Secondary (10)",
    school: "Sri Krishna Mission School",
    year: "2016 – 2017",
    score: "76.00%",
  },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollFade() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            // Remove visible so it re-animates when scrolling back down,
            // and reverses (slide back right→left) when scrolling up
            e.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade, .slide-left").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────


// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: -200, y: -200 });
  const trailerPos = useRef({ x: -200, y: -200 });
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    trailerPos.current.x += (pos.current.x - trailerPos.current.x) * 0.10;
    trailerPos.current.y += (pos.current.y - trailerPos.current.y) * 0.10;

    if (cursorRef.current) {
      cursorRef.current.style.left = `${pos.current.x}px`;
      cursorRef.current.style.top = `${pos.current.y}px`;
    }
    if (trailerRef.current) {
      trailerRef.current.style.left = `${trailerPos.current.x}px`;
      trailerRef.current.style.top = `${trailerPos.current.y}px`;
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a,button,input,textarea,select");
      setIsHovering(!!t);
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf.current = requestAnimationFrame(animate);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  /* ── Main cursor: bright white crosshair with coloured centre ── */
  const size = isClicking ? 10 : isHovering ? 16 : 12;
  const lineLen = isHovering ? 14 : 10;
  const lineThick = 2;
  const gap = 4;
  const colour = isHovering ? "#06B6D4" : "#ffffff";
  const glowColour = isHovering ? "rgba(6,182,212,0.35)" : "rgba(255,255,255,0.25)";

  return (
    <>
      {/* Lagging trailer circle */}
      <div
        ref={trailerRef}
        className="fixed pointer-events-none z-[9998]"
        style={{
          width: isHovering ? "52px" : "36px",
          height: isHovering ? "52px" : "36px",
          border: `1.5px solid ${isHovering ? "rgba(6,182,212,0.2)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />

      {/* Main crosshair cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {/* Centre dot */}
        <div style={{
          position: "absolute",
          width: `${size}px`, height: `${size}px`,
          background: colour,
          borderRadius: "50%",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          boxShadow: `0 0 ${isHovering ? 8 : 5}px ${isHovering ? 2 : 1}px ${glowColour}`,
          transition: "width 0.1s, height 0.1s, background 0.15s, box-shadow 0.15s",
        }} />
        {/* Top line */}
        <div style={{
          position:"absolute", width:`${lineThick}px`, height:`${lineLen}px`,
          background: colour, left:"50%", bottom:`calc(50% + ${gap + size/2}px)`,
          transform:"translateX(-50%)",
          boxShadow:`0 0 3px 1px ${glowColour}`,
          transition:"background 0.15s",
        }}/>
        {/* Bottom line */}
        <div style={{
          position:"absolute", width:`${lineThick}px`, height:`${lineLen}px`,
          background: colour, left:"50%", top:`calc(50% + ${gap + size/2}px)`,
          transform:"translateX(-50%)",
          boxShadow:`0 0 3px 1px ${glowColour}`,
          transition:"background 0.15s",
        }}/>
        {/* Left line */}
        <div style={{
          position:"absolute", height:`${lineThick}px`, width:`${lineLen}px`,
          background: colour, top:"50%", right:`calc(50% + ${gap + size/2}px)`,
          transform:"translateY(-50%)",
          boxShadow:`0 0 3px 1px ${glowColour}`,
          transition:"background 0.15s",
        }}/>
        {/* Right line */}
        <div style={{
          position:"absolute", height:`${lineThick}px`, width:`${lineLen}px`,
          background: colour, top:"50%", left:`calc(50% + ${gap + size/2}px)`,
          transform:"translateY(-50%)",
          boxShadow:`0 0 3px 1px ${glowColour}`,
          transition:"background 0.15s",
        }}/>
      </div>
    </>
  );
}

// ─── HOVER RIPPLE ─────────────────────────────────────────────────────────────
function HoverRipple() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button") as HTMLElement | null;
      if (!interactive) return;

      const rect = interactive.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        width:4px;height:4px;
        left:${x}px;top:${y}px;
        transform:translate(-50%,-50%) scale(0);
        background:rgba(139,92,246,0.35);
        pointer-events:none;
        animation:rippleAnim 0.55s ease-out forwards;
      `;

      const prev = interactive.style.position;
      const prev2 = interactive.style.overflow;
      interactive.style.position = "relative";
      interactive.style.overflow = "hidden";
      interactive.appendChild(ripple);

      ripple.addEventListener("animationend", () => {
        ripple.remove();
        if (!prev) interactive.style.position = prev;
        if (!prev2) interactive.style.overflow = prev2;
      });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [dotLeft, setDotLeft] = useState<number | null>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Determine active section
      const sections = ["experience", "projects", "skills", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Measure nav link positions and place dot directly under the active one
  useEffect(() => {
    if (!activeSection) { setDotLeft(null); return; }
    const linkEl = navLinkRefs.current[activeSection];
    const navEl = navRef.current;
    if (linkEl && navEl) {
      const linkRect = linkEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const centerX = linkRect.left + linkRect.width / 2 - navRect.left;
      setDotLeft((centerX / navRect.width) * 100);
    }
  }, [activeSection]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1e1e2e]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-display font-black text-sm">SD</span>
          </div>
          <span className="font-mono text-sm text-gray-300">Souradip.Portfolio</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a
                key={link}
                ref={(el) => { navLinkRefs.current[link.toLowerCase()] = el; }}
                href={`#${link.toLowerCase()}`}
                className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="mailto:souradip78220@gmail.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-purple-500 text-purple-400 font-mono text-xs tracking-widest uppercase hover:bg-purple-500/20 transition-all"
        >
          Hire Me
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#1e1e2e] px-6 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`block font-mono text-xs tracking-widest uppercase transition-colors ${
                activeSection === link.toLowerCase() ? "text-cyan-400" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:souradip78220@gmail.com"
            className="block font-mono text-xs tracking-widest text-purple-400 uppercase"
            onClick={() => setMenuOpen(false)}
          >
            Hire Me →
          </a>
        </div>
      )}

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        {/* Dot: snaps under active nav link, else follows scroll */}
        {dotLeft !== null ? (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(6,182,212,0.8)] -translate-x-1/2 transition-all duration-300"
            style={{ left: `${dotLeft}%` }}
          />
        ) : (
          scrollProgress > 0 && scrollProgress < 100 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(6,182,212,0.8)] -translate-x-1/2"
              style={{ left: `${scrollProgress}%` }}
            />
          )
        )}
      </div>
    </nav>
  );
}

const PHOTOS = ["/assets/sdn1.jpg", "/assets/sdn2.jpg", "/assets/sdn3.jpg", "/assets/sdn4.jpg", "/assets/sdn5.jpg"];

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % PHOTOS.length);
        setFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 shrink-0">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-cyan-500 to-purple-500 p-[2px] animate-[spin_8s_linear_infinite]">
        <div className="w-full h-full rounded-full bg-[#0a0a0f]" />
      </div>
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl scale-110 pointer-events-none" />

      {/* Photo */}
      <div className="absolute inset-[3px] rounded-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS[current]}
          alt={`Souradip photo ${current + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: fading ? 0 : 1 }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 500); }}
            className="transition-all duration-300"
            aria-label={`Go to photo ${i + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 h-1.5 bg-purple-400"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── TYPING NAME ─────────────────────────────────────────────────────────────
function TypingName() {
  const fullText = "SOURADIP DEBNATH";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const TYPING_SPEED = 110;
  const DELETING_SPEED = 60;
  const PAUSE_AFTER_FULL = 1400;
  const PAUSE_AFTER_EMPTY = 300;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && index <= fullText.length) {
      setDisplayed(fullText.slice(0, index));
      if (index === fullText.length) {
        timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_FULL);
      } else {
        timeout = setTimeout(() => setIndex((i) => i + 1), TYPING_SPEED);
      }
    } else if (deleting && index >= 0) {
      setDisplayed(fullText.slice(0, index));
      if (index === 0) {
        timeout = setTimeout(() => setDeleting(false), PAUSE_AFTER_EMPTY);
      } else {
        timeout = setTimeout(() => setIndex((i) => i - 1), DELETING_SPEED);
      }
    }
    return () => clearTimeout(timeout);
  }, [index, deleting]);

  // Split displayed into "SOURADIP" and "DEBNATH" parts
  const line1 = displayed.slice(0, 8);          // "SOURADIP"
  const line2 = displayed.length > 9 ? displayed.slice(9) : ""; // "DEBNATH"
  const showCursorOnLine1 = displayed.length <= 8;
  const showCursorOnLine2 = displayed.length > 8;

  return (
    <>
      <h1 className="font-display font-black text-[clamp(3rem,8vw,8rem)] leading-none uppercase tracking-tight text-white">
        {line1}
        {showCursorOnLine1 && (
          <span className="inline-block w-[3px] h-[0.85em] bg-cyan-400 ml-1 align-middle animate-pulse" />
        )}
      </h1>
      <h1 className="font-display font-black text-[clamp(3rem,8vw,8rem)] leading-none uppercase tracking-tight">
        <span className="text-gradient-purple">
          {line2}
          {showCursorOnLine2 && (
            <span className="inline-block w-[3px] h-[0.85em] bg-purple-400 ml-1 align-middle animate-pulse" />
          )}
        </span>
      </h1>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

      {/* Badge */}
      <div className="relative z-10 flex items-center gap-2 mb-10 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-mono text-xs text-gray-400 tracking-widest uppercase">Junior Software Developer · Open for Opportunities</span>
      </div>

      {/* Hero layout: photo + text side by side on large screens */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-6 max-w-6xl w-full mx-auto">

        {/* Photo slideshow */}
        <div className="flex justify-center lg:justify-start">
          <PhotoSlideshow />
        </div>

        {/* Text content */}
        <div className="text-center lg:text-left flex-1">
          <TypingName />

          <p className="mt-6 max-w-xl text-gray-400 font-body text-base leading-relaxed lg:mx-0 mx-auto">
            Crafting scalable, user-centric software with Next.js and Firebase. Bridging analytical
            precision from technical writing with modern frontend engineering.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono text-xs tracking-widest uppercase hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              View Projects
            </a>
            <a
              href="#experience"
              className="px-8 py-3.5 border border-white/20 text-gray-300 font-mono text-xs tracking-widest uppercase hover:border-white/50 hover:text-white transition-all duration-300"
            >
              My Stack
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex gap-10 justify-center lg:justify-start">
            {[
              { label: "Years Exp", value: "2+" },
              { label: "Projects", value: "4+" },
              { label: "B.Tech", value: "88%" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="font-display font-black text-3xl text-gradient-purple">{s.value}</div>
                <div className="font-mono text-xs text-gray-500 tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-fade">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">// 01</span>
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase text-white">
            Work <span className="text-gradient-cyan">Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="slide-left relative group glow-border rounded-none bg-[#111118] p-6 md:p-8 transition-all duration-300 hover:bg-[#14141f]"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300 group-hover:w-1"
                style={{ backgroundColor: exp.color }}
              />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="font-mono text-xs px-2 py-0.5 tracking-widest"
                      style={{ color: exp.color, border: `1px solid ${exp.color}40`, background: `${exp.color}10` }}
                    >
                      {exp.tag}
                    </span>
                    {exp.tag === "CURRENT" && (
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-white uppercase">{exp.company}</h3>
                  <p className="font-body text-gray-400 mt-0.6">{exp.role}</p>
                </div>
                <span className="font-mono text-xs text-gray-500 tracking-wider whitespace-nowrap mt-1">{exp.period}</span>
              </div>

              <ul className="space-y-2">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                    <span style={{ color: exp.color }} className="mt-0.4 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-fade">
        <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">// 02</span>
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase text-white">
              Latest <span className="text-gradient-purple">Work</span>
            </h2>
          </div>
          <a
            href="https://github.com/Souradip-Sdn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-400 tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2"
          >
            Explore GitHub <span className="text-purple-400">——</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => {
            const CardWrapper = project.url ? "a" : "div";
            const cardProps = project.url
              ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
            <CardWrapper
              key={i}
              {...(cardProps as any)}
              className={`slide-left group relative glow-border bg-[#111118] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 ${
                project.featured ? "md:col-span-2" : ""
              } ${project.url ? "cursor-pointer block" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {/* Gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 text-purple-400 tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.featured && (
                    <span className="font-mono text-xs px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 tracking-wider">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl uppercase text-white mb-3 group-hover:text-gradient-purple transition-all">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.desc}</p>

                {project.url ? (
                  <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-purple-400 group-hover:text-white transition-colors">
                    View Project <span>——</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-gray-600">
                    Private Repo
                  </span>
                )}
              </div>
            </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);
  const [displayPct, setDisplayPct] = useState(0);
  const [hovered, setHovered] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animate bar + counter from 0 → level
  const runAnimation = () => {
    setBarWidth(0);
    setDisplayPct(0);
    let start: number | null = null;
    const duration = 900;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setBarWidth(Math.round(eased * level));
      setDisplayPct(Math.round(eased * level));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Run on scroll into view (initial)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runAnimation(); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Re-run on hover
  const handleMouseEnter = () => {
    setHovered(true);
    runAnimation();
  };

  return (
    <div
      ref={ref}
      className="space-y-2 group/bar cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-center">
        <span className={`font-mono text-xs tracking-wider transition-colors duration-200 ${hovered ? "text-white" : "text-gray-300"}`}>
          {name}
        </span>
        <span className={`font-mono text-xs transition-colors duration-200 ${hovered ? "text-cyan-400" : "text-purple-400"}`}>
          {displayPct}%
        </span>
      </div>
      <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-colors duration-200 ${hovered ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-gradient-to-r from-purple-500 to-cyan-500"}`}
          style={{ width: `${barWidth}%`, transition: "width 0ms" }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-fade">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">// 03</span>
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase text-white">
            My <span className="text-gradient-cyan">Stack</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skill bars */}
          <div className="slide-left space-y-6">
            <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-6">Technical Proficiency</h3>
            {SKILLS_TECH.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}

            {/* Hobbies */}
            <div className="pt-6 border-t border-white/5">
              <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-4">Hobbies</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Watching Movies", query: "best movies to watch" },
                  { label: "Shows & Series", query: "best TV shows and series" },
                  { label: "Gaming", query: "BGMI" },
                  { label: "Listening to Music", query: "https://open.spotify.com/playlist/1SSvBmW5Sc5AZOsHbHeRww?si=5c3b09d7c0c5474a" },
                ].map(({ label, query }) => (
                  <button
                    key={label}
                    onClick={() => window.open(query.startsWith("http") ? query : `https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank")}
                    className="relative font-mono text-xs px-3 py-1.5 border border-white/10 text-gray-400 hover:border-cyan-500/60 hover:text-cyan-300 transition-all cursor-pointer group/hobby overflow-hidden"
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover/hobby:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at center, rgba(6,182,212,0.22) 0%, transparent 70%)" }}
                    />
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Education + strengths */}
          <div className="slide-left space-y-8" style={{ transitionDelay: "0.15s" }}>
            <div>
              <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-6">Education</h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="relative pl-5 border-l border-purple-500/20 hover:border-purple-500/60 transition-colors">
                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-purple-500" />
                    <p className="font-body font-medium text-white text-sm">{edu.degree}</p>
                    <p className="font-mono text-xs text-gray-500 mt-0.5">{edu.school}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="font-mono text-xs text-gray-600">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-4">Strengths</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Adaptability", "Versatility", "Positive Attitude",
                  "Attention to Detail", "Communication", "Multitasking",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(tag)}`, "_blank")}
                    className="relative font-mono text-xs px-3 py-1.5 border border-white/10 text-gray-400 hover:border-purple-500/60 hover:text-purple-300 transition-all cursor-pointer group/tag overflow-hidden"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.25) 0%, transparent 70%)" }} />
                    <span className="relative z-10">{tag}</span>
                  </button>
                ))}
              </div>

              <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["English", "Hindi", "Bengali"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(tag + " language")}`, "_blank")}
                    className="relative font-mono text-xs px-3 py-1.5 border border-white/10 text-gray-400 hover:border-cyan-500/60 hover:text-cyan-300 transition-all cursor-pointer group/tag overflow-hidden"
                  >
                    <span className="absolute inset-0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse at center, rgba(6,182,212,0.25) 0%, transparent 70%)" }} />
                    <span className="relative z-10">{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-6">Awards & Achievements</h3>
              <ul className="space-y-2">
                {[
                  "Google Cloud Ready Facilitator Program — Badges",
                  "3rd Place — Internal Hackathon 2K22",
                  "NPTEL Certification",
                  "170+ Problems Solved — GeeksforGeeks",
                ].map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-400">
                    <span className="text-cyan-400 shrink-0 mt-0.4">◆</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Collaboration", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const mailto = `mailto:souradip78220@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `From: ${form.name} (${form.email})\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="section-fade">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-purple-400 tracking-widest uppercase">// 04</span>
          <h2 className="font-display font-black text-5xl md:text-8xl uppercase text-white mt-2">
            Level Up{" "}
            <span className="italic text-gradient-purple">Together</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            Ready to build something great? Drop a message and let&apos;s create something memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact links */}
          <div className="slide-left lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs text-gray-500 tracking-widest uppercase mb-6">Connect</h3>
            {[
              {
                label: "Email",
                value: "souradip78220@gmail.com",
                href: "mailto:souradip78220@gmail.com",
                color: "#EA4335",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                ),
              },
              {
                label: "Phone",
                value: "+91 9862478220",
                href: "tel:+919862478220",
                color: "#25D366",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                value: "souradip-debnath",
                href: "https://www.linkedin.com/in/souradip-debnath-2787851b9",
                color: "#0A66C2",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
              },
              {
                label: "GitHub",
                value: "Souradip-Sdn",
                href: "https://github.com/Souradip-Sdn",
                color: "#ffffff",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                ),
              },
              {
                label: "Location",
                value: "Agartala, Tripura",
                href: "https://www.google.com/maps/search/Agartala+Tripura",
                color: "#06B6D4",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                ),
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-white/5 bg-[#111118] hover:border-purple-500/30 transition-all group cursor-pointer block"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{
                    background: `${c.color}18`,
                    border: `1px solid ${c.color}35`,
                    color: c.color,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <div className="font-mono text-xs text-gray-500 tracking-wider uppercase">{c.label}</div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors truncate block max-w-[180px]">
                    {c.value}
                  </span>
                </div>
                {/* Arrow indicator */}
                <div className="ml-auto text-gray-600 group-hover:text-purple-400 transition-colors text-xs">→</div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="slide-left lg:col-span-3 glow-border bg-[#111118] p-6 md:p-8" style={{ transitionDelay: "0.15s" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Player Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Comm Link (Email)</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-purple-500/60 transition-colors"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Quest Type (Subject)</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#0a0a0f] border border-white/10 text-white px-4 py-3 font-body text-sm focus:outline-none focus:border-purple-500/60 transition-colors appearance-none cursor-pointer"
              >
                <option>Collaboration</option>
                <option>Job Opportunity</option>
                <option>Freelance Project</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="font-mono text-xs text-gray-500 tracking-widest uppercase block mb-2">Message Log</label>
              <textarea
                rows={5}
                placeholder="Enter your quest details here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 font-body text-sm focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto ml-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono text-xs tracking-widest uppercase hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-purple-500/25 float-right"
            >
              {sent ? "Transmission Sent ✓" : "Send Transmission →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1e1e2e] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-gray-600 tracking-wider">
          © 2026 SOURADIP DEBNATH // ALL RIGHTS RESERVED
        </span>
        <div className="flex gap-6">
          {[
            { label: "GitHub", href: "https://github.com/Souradip-Sdn" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/souradip-debnath-2787851b9" },
            { label: "Email", href: "mailto:souradip78220@gmail.com" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-mono text-xs text-gray-500 tracking-widest uppercase hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── STAR FIELD ──────────────────────────────────────────────────────────────
interface Star { id: number; x: number; y: number; size: number; opacity: number; twinkleDuration: number; twinkleDelay: number; }
interface Burst { id: number; x: number; y: number; }

function StarField() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 160 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleDuration: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 4,
    }))
  );
  const [bursts, setBursts] = useState<Burst[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only burst if clicking directly on a star (not other interactive elements)
    const target = e.target as HTMLElement;
    if (target.dataset.star) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const id = Date.now();
      setBursts((b) => [...b, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), 900);
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          data-star="1"
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `starTwinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
            pointerEvents: "auto",
            cursor: "none",
          }}
        />
      ))}

      {/* Burst particles */}
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y, pointerEvents: "none" }}>
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * 360;
            const dist = 40 + Math.random() * 30;
            const size = Math.random() * 4 + 2;
            const colors = ["#06B6D4","#8B5CF6","#ffffff","#A855F7","#67e8f9","#e879f9"];
            const color = colors[i % colors.length];
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size, height: size,
                  background: color,
                  boxShadow: `0 0 6px 2px ${color}`,
                  transform: "translate(-50%,-50%)",
                  animation: `burstParticle 0.8s ease-out forwards`,
                  // inline keyframe via CSS variable trick — use style for each particle
                  ["--dx" as string]: `${Math.cos((angle * Math.PI) / 180) * dist}px`,
                  ["--dy" as string]: `${Math.sin((angle * Math.PI) / 180) * dist}px`,
                  animationDelay: `${i * 0.015}s`,
                }}
              />
            );
          })}
          {/* Central flash */}
          <div
            className="absolute rounded-full"
            style={{
              width: 18, height: 18,
              background: "radial-gradient(circle, #ffffff 0%, #06B6D4 50%, transparent 100%)",
              transform: "translate(-50%,-50%)",
              animation: "burstFlash 0.4s ease-out forwards",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Wrapper that captures clicks on stars
function StarFieldClickable() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 160 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleDuration: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 4,
    }))
  );

  const triggerBurst = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), 900);
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" style={{ pointerEvents: "none" }}>
      {stars.map((star) => (
        <div
          key={star.id}
          onClick={(e) => { e.stopPropagation(); triggerBurst(star.x / 100 * window.innerWidth, star.y / 100 * window.innerHeight); }}
          className="absolute rounded-full bg-white hover:scale-150 transition-transform"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `starTwinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
            pointerEvents: "auto",
            cursor: "none",
          }}
        />
      ))}
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y, pointerEvents: "none" }}>
          {Array.from({ length: 14 }, (_, i) => {
            const angle = (i / 14) * 360;
            const dist = 45 + Math.random() * 35;
            const size = Math.random() * 4 + 2;
            const colors = ["#06B6D4","#8B5CF6","#ffffff","#A855F7","#67e8f9","#e879f9","#fbbf24"];
            const color = colors[i % colors.length];
            return (
              <div key={i} className="absolute rounded-full" style={{
                width: size, height: size,
                background: color,
                boxShadow: `0 0 8px 3px ${color}88`,
                transform: "translate(-50%,-50%)",
                animation: `burstParticle${i % 2 === 0 ? "A" : "B"} 0.85s ease-out forwards`,
                ["--dx" as string]: `${Math.cos((angle * Math.PI) / 180) * dist}px`,
                ["--dy" as string]: `${Math.sin((angle * Math.PI) / 180) * dist}px`,
                animationDelay: `${i * 0.02}s`,
              }} />
            );
          })}
          <div className="absolute rounded-full" style={{
            width: 20, height: 20,
            background: "radial-gradient(circle, #ffffff 0%, #a855f7 50%, transparent 100%)",
            transform: "translate(-50%,-50%)",
            animation: "burstFlash 0.45s ease-out forwards",
          }} />
        </div>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollFade();

  return (
    <>
      <style>{`
        @keyframes rippleAnim {
          to { transform: translate(-50%,-50%) scale(60); opacity: 0; }
        }
        * { cursor: none !important; }
        .slide-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .slide-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: var(--base-op, 0.4); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes burstParticleA {
          0%   { transform: translate(-50%,-50%) translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(-50%,-50%) translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        @keyframes burstParticleB {
          0%   { transform: translate(-50%,-50%) translate(0,0) scale(1.2); opacity: 1; }
          60%  { opacity: 0.8; }
          100% { transform: translate(-50%,-50%) translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        @keyframes burstFlash {
          0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 1; }
          50%  { transform: translate(-50%,-50%) scale(2.5); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
        }
      `}</style>
      <StarFieldClickable />
      <CustomCursor />
      <HoverRipple />
    <main className="relative z-10">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
    </>
  );
}