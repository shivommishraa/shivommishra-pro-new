import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProjectsPage, { projects as portfolioProjects } from "./ProjectsPage.jsx";
import BeyondCodePage from "./BeyondCodePage.jsx";

const emailAddress = "shivommishraa@gmail.com";
const phoneNumber = "895-3000-895";
const phoneDigits = "8953000895";
const whatsappNumber = "918953000895";

const skills = [
  { icon: "M", name: "Magento 2", note: "E-commerce development", color: "orange" },
  { icon: "D", name: "Drupal", note: "Content management system", color: "blue" },
  { icon: "</>", name: "PHP", note: "Backend development", color: "blue" },
  { icon: "L", name: "Laravel", note: "Web applications", color: "red" },
  { icon: "JS", name: "JavaScript", note: "Interactive interfaces", color: "yellow" },
  { icon: "R", name: "React.js", note: "UI library", color: "cyan" },
  { icon: "CI", name: "CodeIgniter", note: "PHP web applications", color: "red" },
  { icon: "F", name: "Flutter", note: "Cross-platform apps", color: "sky" },
  { icon: "A", name: "Android", note: "Mobile applications", color: "teal" },
  { icon: "Py", name: "Python", note: "Programming", color: "cyan" },
  { icon: "DB", name: "MySQL", note: "Data and databases", color: "teal" },
  { icon: "Git", name: "Git", note: "Version control", color: "violet" },
  { icon: "AWS", name: "AWS", note: "Cloud services", color: "orange" },
];

const featuredProjectNames = ["Hoya Contact Lenses", "SSG MART", "Career Alfa"];
const projects = portfolioProjects.filter((project) => featuredProjectNames.includes(project.name));
const careerPath = [
  { label: "CAREER PATH · STEP 1", title: "Trainee Web Developer" },
  { label: "CAREER PATH · STEP 2", title: "Web Developer" },
  { label: "CAREER PATH · STEP 3", title: "Software Engineer" },
  { label: "CAREER PATH · STEP 4", title: "Senior Software Engineer" },
  { label: "CURRENT ROLE · SEPTEMBER 2026–PRESENT", title: "Technical Leader" },
];

const roles = [
  "Software Development & Technology",
  "Technical Leader",
  "Magento & Laravel Developer",
  "Building digital products",
];

const marqueeItems = [
  "Magento 2",
  "Laravel",
  "Drupal",
  "React.js",
  "PHP",
  "CodeIgniter",
  "Flutter",
  "Android",
  "MySQL",
  "AWS",
  "Git",
  "Python",
];

const stats = [
  { value: portfolioProjects.length, suffix: "+", label: "Projects delivered", note: "E-commerce & web" },
  { value: skills.length, suffix: "", label: "Technologies", note: "Tools I build with" },
  { value: careerPath.length, suffix: "", label: "Career stages", note: "Trainee → Leader" },
  { value: 3, suffix: "", label: "Qualifications", note: "IT & computer science" },
];

const spotlightSelector = [
  "[data-spotlight]",
  ".skill-card",
  ".project-card",
  ".showcase-card",
  ".beyond-card",
  ".education-card",
  ".journey-group",
  ".project-note",
  ".glass-code",
].join(", ");

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setValue(to);
      return undefined;
    }
    let frame;
    const started = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / 1500);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref} className="counter">
      {value}
      {suffix}
    </span>
  );
}

function RotatingRole() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
    if (reduceMotion) {
      setText(roles[0]);
      return undefined;
    }
    let timeout;
    if (phase === "hold") {
      timeout = setTimeout(() => setPhase("deleting"), 2300);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 26);
      } else {
        setIndex((current) => (current + 1) % roles.length);
        setPhase("typing");
      }
    } else {
      const next = roles[index];
      if (text.length < next.length) {
        timeout = setTimeout(() => setText(next.slice(0, text.length + 1)), 52);
      } else {
        setPhase("hold");
      }
    }
    return () => clearTimeout(timeout);
  }, [phase, text, index, reduceMotion]);

  return (
    <span className="typed-role" aria-hidden="true">
      {text}
      <span className="typing-caret" />
    </span>
  );
}

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Shiv Om Mishra home">
      <span className="brand-mark">
        S<span>O</span>M
      </span>
      <span className="brand-copy">
        Shiv Om Mishra
        <small>Software Development &amp; Technology</small>
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Brand />
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>
      <nav className={`nav${menuOpen ? " open" : ""}`} aria-label="Main navigation">
        {[
          ["Home", "/"],
          ["About", "/about"],
          ["Projects", "/projects"],
          ["Beyond Code", "/beyond-code"],
          ["Contact", "/contact"],
        ].map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Link className="button button-outline header-cta" to="/contact">
        Let&apos;s talk <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}

function Footer() {
  const reduceMotion = useReducedMotion();
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackTop(window.scrollY > 240);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <footer className="footer section-wrap">
      <Brand />
      <p>Designed &amp; built with curiosity. © {new Date().getFullYear()} Shiv Om Mishra.</p>
      <button
        type="button"
        className={`back-top${showBackTop ? " is-visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
      >
        <span className="back-top-label">Back to top</span>
        <span className="back-top-icon" aria-hidden="true">↑</span>
      </button>
    </footer>
  );
}

function SectionHeading({ kicker, title, highlight, description }) {
  const reduceMotion = useReducedMotion();
  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="section-heading">
      <motion.div {...motionProps}>
        <p className="section-kicker">{kicker}</p>
        <h2>
          {title} <span className="gradient-text">{highlight}</span>
        </h2>
      </motion.div>
      {description && (
        <motion.p {...motionProps} transition={{ ...motionProps.transition, delay: 0.1 }}>
          {description}
        </motion.p>
      )}
    </div>
  );
}

function ProjectCard({ project, index = 0 }) {
  return (
    <Reveal delay={index * 0.08}>
      <article className="project-card">
        <div className="project-art web-project-art">
          <span>{project.name.slice(0, 2).toUpperCase()}</span>
          <b>{project.name}</b>
          <small>{project.technologies.join(" · ")}</small>
          <span className="art-orb" aria-hidden="true" />
        </div>
        <div className="project-info">
          <div>
            <p className="project-category">{project.categories[0]}</p>
            <h3>{project.name}</h3>
            <p>{project.contribution}</p>
          </div>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </div>
        <div className="tags">
          {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <a className="project-preview-link" href={project.url} target="_blank" rel="noreferrer">
          Visit website <span aria-hidden="true">↗</span>
        </a>
      </article>
    </Reveal>
  );
}

function SkillGrid({ limit }) {
  const visibleSkills = limit ? skills.slice(0, limit) : skills;
  return (
    <motion.div className="skills-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
      {visibleSkills.map((skill) => (
        <motion.article className="skill-card" variants={cardMotion} key={skill.name}>
          <span className={`skill-icon ${skill.color}`}>{skill.icon}</span>
          <h3>{skill.name}</h3>
          <p>{skill.note}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HeroArt() {
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 140, damping: 18, mass: 0.35 });
  const smoothY = useSpring(rotateY, { stiffness: 140, damping: 18, mass: 0.35 });
  const { scrollY } = useScroll();
  const parallaxY = useSpring(useTransform(scrollY, [0, 720], [0, 58]), {
    stiffness: 70,
    damping: 22,
  });

  function handlePointerMove(event) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(-py * 14);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="hero-art" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <span className="hero-halo" aria-hidden="true" />
      <span className="orbit-ring orbit-ring-one" aria-hidden="true"><i /></span>
      <span className="orbit-ring orbit-ring-two" aria-hidden="true"><i /></span>
      <motion.div
        className="profile-placeholder"
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          y: parallaxY,
          transformPerspective: 1100,
        }}
      >
        <img
          className="hero-portrait"
          src="/images/shiv-om-mishra-portrait.png"
          alt="Portrait of Shiv Om Mishra"
        />
        <span className="portrait-sheen" aria-hidden="true" />
      </motion.div>
      <span className="hero-chip chip-a" aria-hidden="true">Magento</span>
      <span className="hero-chip chip-b" aria-hidden="true">React</span>
      <span className="hero-chip chip-c" aria-hidden="true">Laravel</span>
    </div>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {marqueeItems.map((item) => (
              <span key={`${copy}-${item}`}>
                {item}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsStrip() {
  return (
    <section className="section-wrap stats-wrap" aria-label="Portfolio highlights">
      <Reveal className="stats-strip">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong><Counter to={stat.value} suffix={stat.suffix} /></strong>
            <span>{stat.label}</span>
            <small>{stat.note}</small>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-aurora" aria-hidden="true">
          <span className="aurora aurora-one" />
          <span className="aurora aurora-two" />
          <span className="aurora aurora-three" />
        </div>
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow"><span className="status-dot" /> TECHNOLOGY · INNOVATION · LEADERSHIP</p>
          <p className="hello">Hello, I&apos;m <span className="wave" aria-hidden="true">👋</span></p>
          <h1>Shiv Om <span className="gradient-text">Mishra</span></h1>
          <h2 className="role-line">
            <span className="sr-only">Software Development &amp; Technology</span>
            <RotatingRole />
          </h2>
          <p className="hero-description">
            I bring experience across web development, software engineering and
            technical leadership, with a focus on e-commerce and web applications.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">Explore my work <span>↗</span></Link>
            <Link className="button button-outline" to="/contact">Contact me</Link>
          </div>
          <div className="social-links">
            <a className="hero-email-link" href={`mailto:${emailAddress}`}>
              <span className="hero-email-icon" aria-hidden="true">✉</span>
              <span className="hero-email-copy">
                <small>Email me</small>
                <strong>{emailAddress}</strong>
              </span>
              <span className="hero-email-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.div>
        <HeroArt />
      </section>

      <Marquee />
      <StatsStrip />

      <Reveal className="about panel section-wrap">
        <div className="about-text">
          <p className="section-kicker">01 / A LITTLE ABOUT ME</p>
          <h2>Turning ideas into<br /><span className="gradient-text">digital reality.</span></h2>
          <p>
            I&apos;m Shiv Om Mishra, a Software Development &amp; Technology professional whose career has progressed
            through web development, software engineering and senior software
            engineering. I focus on practical e-commerce and web application work.
          </p>
          <p>My project experience includes Magento, Laravel, CodeIgniter and mobile application development.</p>
          <Link className="text-link" to="/about">More about me <span>→</span></Link>
        </div>
        <CodeWindow />
      </Reveal>

      <section className="section-wrap section-block">
        <SectionHeading
          kicker="02 / WHAT I WORK WITH"
          title="Technical"
          highlight="toolkit."
          description="Tools and technologies I use to bring products to life."
        />
        <SkillGrid limit={4} />
        <Link className="text-link section-more" to="/about">Explore all skills <span>→</span></Link>
      </section>

      <section className="section-wrap section-block projects-preview">
        <SectionHeading
          kicker="03 / SELECTED WORK"
          title="Featured"
          highlight="projects."
          description="Selected e-commerce implementations across Magento, Laravel and CodeIgniter."
        />
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
        </div>
        <Link className="text-link section-more" to="/projects">View all projects <span>→</span></Link>
      </section>

      <Callout />
    </>
  );
}

function CodeWindow() {
  return (
    <div className="about-visual">
      <div className="glass-code">
        <div className="window-dots"><i /><i /><i /></div>
        <pre><span className="code-purple">const</span> developer = {"{"}
{"\n"}  name: <span className="code-green">&quot;Shiv Om Mishra&quot;</span>,
{"\n"}  focus: <span className="code-green">&quot;Web Development&quot;</span>,
{"\n"}  passion: <span className="code-green">&quot;Building solutions&quot;</span>,
{"\n"}  mindset: <span className="code-green">&quot;Always learning&quot;</span>
{"\n"}{"};"}</pre>
        <div className="code-glow" />
      </div>
      <div className="tech-chip chip-php">PHP</div>
      <div className="tech-chip chip-js">JS</div>
      <div className="tech-chip chip-magento">M2</div>
    </div>
  );
}

function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <PageShell kicker="A LITTLE ABOUT ME" title="Curious by nature." highlight="Developer by choice.">
      <Reveal className="about panel about-page-card">
        <div className="about-text">
          <p className="section-kicker">MY APPROACH</p>
          <h2>Building useful things,<br /><span className="gradient-text">one detail at a time.</span></h2>
          <p>
            I&apos;m Shiv Om Mishra, a Software Development &amp; Technology
            professional. My career path began as a Trainee Web
            Developer, progressing through Web Developer, Software Engineer and
            Senior Software Engineer before my current Technical Leader role.
            My project work spans e-commerce, web platforms and mobile applications.
          </p>
          <p>
            I have been working as a Technical Leader since September 2026.
          </p>
        </div>
        <CodeWindow />
      </Reveal>
      <section className="section-block">
        <SectionHeading kicker="01 / MY TOOLKIT" title="Tools for" highlight="building." description="A practical mix of technologies for turning ideas into working products." />
        <SkillGrid />
      </section>
      <Reveal className="journey panel">
        <div>
          <p className="section-kicker">02 / THE JOURNEY</p>
          <h2>Experience &amp; <span className="gradient-text">growth.</span></h2>
        </div>
        <motion.div
          className="timeline"
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14 } },
          }}
        >
          {careerPath.map((step) => (
            <motion.div
              className="timeline-item"
              key={step.title}
              variants={{
                hidden: { opacity: 0, x: -16 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="timeline-dot" />
              <small>{step.label}</small>
              <h3>{step.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
      <section className="section-block education-block">
        <SectionHeading
          kicker="03 / EDUCATION"
          title="Academic"
          highlight="background."
          description="Education in information technology and computer science."
        />
        <div className="education-grid">
          <article className="education-card">
            <span>D</span>
            <h3>Diploma in Information Technology</h3>
          </article>
          <article className="education-card">
            <span>B.Tech</span>
            <h3>Bachelor of Technology in Computer Science and Engineering</h3>
          </article>
          <article className="education-card">
            <span>M.Tech</span>
            <h3>Master of Technology in Computer Science and Engineering</h3>
          </article>
        </div>
      </section>
      <Callout />
    </PageShell>
  );
}

function ContactPage() {
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Portfolio enquiry",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      "",
      `${formData.get("message")}`,
    ].join("\n");
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <PageShell kicker="LET'S MAKE SOMETHING GOOD" title="Have a project in" highlight="mind?">
      <div className="contact-layout">
        <Reveal className="contact-copy panel">
          <span className="contact-sparkle" aria-hidden="true">✦</span>
          <p className="section-kicker">GET IN TOUCH</p>
          <h2>Good things start with a <span className="gradient-text">hello.</span></h2>
          <p>Tell me a little about what you&apos;re working on. I&apos;d love to hear about your idea and explore how we can build something great together.</p>
          <a className="contact-email" href={`mailto:${emailAddress}`}>{emailAddress}<span>↗</span></a>
          <a className="contact-email" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp · {phoneNumber}<span>↗</span></a>
          <a className="contact-email" href={`tel:${phoneDigits}`}>Call · {phoneNumber}<span>↗</span></a>
        </Reveal>
        <Reveal className="contact-form-wrap panel" delay={0.1}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" placeholder="How should I call you?" required />
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
            <label htmlFor="message">Tell me about your project</label>
            <textarea id="message" name="message" rows="5" placeholder="A few details about your idea..." required />
            <button className="button button-primary" type="submit">Send a message <span>↗</span></button>
            {whatsappUrl && (
              <p className="form-note" role="status">
                WhatsApp has your message ready for {phoneNumber}. Review it and press Send to deliver.
                {" "}If it didn&apos;t open, <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">open WhatsApp here</a>.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </PageShell>
  );
}

function PageShell({ kicker, title, highlight, children }) {
  return (
    <div className="inner-page section-wrap">
      <Reveal className="page-intro">
        <p className="eyebrow"><span className="status-dot" /> {kicker}</p>
        <h1>{title}<br /><span className="gradient-text">{highlight}</span></h1>
      </Reveal>
      {children}
    </div>
  );
}

function Callout() {
  return (
    <Reveal className="contact panel section-wrap">
      <div>
        <p className="section-kicker">HAVE A PROJECT IN MIND?</p>
        <h2>Let&apos;s build something <span className="gradient-text">great.</span></h2>
        <p>Have an idea? Let&apos;s talk about what we can create together.</p>
      </div>
      <Link className="button button-primary" to="/contact">Say hello <span>↗</span></Link>
    </Reveal>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.995 }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/beyond-code" element={<BeyondCodePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function NotFoundPage() {
  return (
    <PageShell kicker="404 / PAGE NOT FOUND" title="This page went" highlight="exploring.">
      <Link className="button button-primary" to="/">Back to home <span>↗</span></Link>
    </PageShell>
  );
}

export default function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glow = cursorRef.current;
    if (!glow || reduceMotion) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frame;

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.setProperty("--cursor-x", `${currentX}px`);
      glow.style.setProperty("--cursor-y", `${currentY}px`);
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const handlePointerMove = (event) => {
      const target = event.target?.closest?.(spotlightSelector);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        target.style.setProperty("--mx", `${x}px`);
        target.style.setProperty("--my", `${y}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}
