import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
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

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
        <small>Technical Leader</small>
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
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
  return (
    <footer className="footer section-wrap">
      <Brand />
      <p>Designed &amp; built with curiosity. © {new Date().getFullYear()} Shiv Om Mishra.</p>
      <Link to="/" className="back-top">
        Back to top ↑
      </Link>
    </footer>
  );
}

function SectionHeading({ kicker, title, highlight, description }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>
          {title} <span className="gradient-text">{highlight}</span>
        </h2>
      </div>
      {description && <p>{description}</p>}
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

function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="hero section-wrap">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow"><span className="status-dot" /> TECHNICAL LEADER · SINCE SEPTEMBER 2026</p>
          <p className="hello">Hello, I&apos;m <span aria-hidden="true">👋</span></p>
          <h1>Shiv Om <span className="gradient-text">Mishra</span></h1>
          <h2 className="role-line">Technical Leader</h2>
          <p className="hero-description">
            I bring experience across web development, software engineering and
            technical leadership, with a focus on e-commerce and web applications.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">Explore my work <span>↗</span></Link>
            <Link className="button button-outline" to="/contact">Contact me</Link>
          </div>
          <div className="social-links">
            <a href={`mailto:${emailAddress}`} aria-label="Email">✉</a>
          </div>
        </motion.div>
        <div className="hero-art">
          <div className="profile-placeholder">
            <img
              className="hero-portrait"
              src="/images/shiv-om-mishra-portrait.png"
              alt="Portrait of Shiv Om Mishra"
            />
          </div>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <Reveal className="about panel section-wrap">
        <div className="about-text">
          <p className="section-kicker">01 / A LITTLE ABOUT ME</p>
          <h2>Turning ideas into<br /><span className="gradient-text">digital reality.</span></h2>
          <p>
            I&apos;m Shiv Om Mishra, a Technical Leader whose career has progressed
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
            I&apos;m Shiv Om Mishra, and my career path began as a Trainee Web
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
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [location.pathname, reduceMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
        transition={{ duration: reduceMotion ? 0 : 0.28 }}
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
    const handlePointerMove = (event) => {
      cursorRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <>
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}
