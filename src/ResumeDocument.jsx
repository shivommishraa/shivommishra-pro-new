/**
 * Print-only resume document.
 * Screen par kabhi nahi dikhta (CSS: .resume-doc { display: none }).
 * "Download Resume" button window.print() karta hai aur @media print me
 * sirf ye document A4 par chapta hai — user "Save as PDF" se PDF save karta hai.
 */
const contact = {
  email: "shivommishraa@gmail.com",
  phone: "895-3000-895",
  phoneDigits: "8953000895",
  website: "https://shivommishraa.vercel.app",
  websiteLabel: "shivommishraa.vercel.app",
  location: "India",
};

const skillGroups = [
  { label: "E-commerce & backend", value: "Magento 2, Laravel, PHP, CodeIgniter, Drupal, MySQL" },
  { label: "Frontend", value: "React.js, JavaScript, HTML, CSS" },
  { label: "Mobile", value: "Flutter, Android" },
  { label: "Cloud & tooling", value: "AWS, Git" },
  { label: "Programming", value: "Python" },
  { label: "Languages", value: "Hindi, English" },
];

const projects = [
  { name: "Hoya Contact Lenses", stack: "Magento", detail: "Frontend · Order & payment · Admin panel" },
  { name: "Astalift Magento Portal", stack: "Magento", detail: "Frontend · Order & payment · Admin panel" },
  { name: "TNS", stack: "E-commerce", detail: "Frontend · Order & payment · Admin panel" },
  { name: "Beauty Garage", stack: "E-commerce", detail: "Frontend · Order & payment · Admin panel" },
  { name: "Cheefatt", stack: "E-commerce", detail: "Frontend · Order & payment · Admin panel" },
  { name: "Idemco", stack: "E-commerce", detail: "Frontend · Order & payment · Admin panel" },
  { name: "SSG MART", stack: "Laravel", detail: "Frontend · Order & payment · Admin panel" },
  { name: "Career Alfa", stack: "CodeIgniter", detail: "Frontend · Order & payment · Admin panel" },
  { name: "Maa Durga Sewa Samiti", stack: "Laravel", detail: "Website · Frontend · Donation & payment · Admin management" },
  { name: "Gulfnet", stack: "Magento · Android", detail: "Magento admin panel · Android application" },
  { name: "Burney Mobile Application", stack: "Flutter", detail: "Cross-platform mobile application development" },
];

const education = [
  { qualification: "Master of Technology (M.Tech)", field: "Computer Science and Engineering" },
  { qualification: "Bachelor of Technology (B.Tech)", field: "Computer Science and Engineering" },
  { qualification: "Diploma in Information Technology", field: "Topper award during diploma studies (2019)" },
];

const achievements = [
  "Best Developer Award — working organization, 2024.",
  "Leadership Development Training — completed at IIM Lucknow, 2025.",
  "Creator of the Week — Sahityanama Magazine, Mumbai, 2019.",
  "Puneet Sahitya Pushp Samman, 2021 — poetry published in Sahityanama Magazine and other reputed magazines across India.",
  "Meet Magento Mumbai (2023) and Meet Magento Ahmedabad (2024) — community events attended.",
];

const responsibilities = [
  "Lead technical delivery for e-commerce and web application projects across Magento, Laravel and PHP.",
  "Own technical decisions and solution approach, from requirement analysis through release.",
  "Set development standards, code review and quality practices for the team.",
  "Mentor developers and coordinate day-to-day execution with stakeholders.",
  "Plan work, clear blockers and keep releases predictable for client projects.",
];

export default function ResumeDocument() {
  return (
    <div className="resume-doc" aria-hidden="true">
      <header className="rs-head">
        <h1>Shiv Om Mishra</h1>
        <p className="rs-role">Technical Leader</p>
        <p className="rs-contact">
          <span>{contact.phone}</span>
          <span className="rs-sep">•</span>
          <span>{contact.email}</span>
          <span className="rs-sep">•</span>
          <span>{contact.websiteLabel}</span>
          <span className="rs-sep">•</span>
          <span>{contact.location}</span>
        </p>
      </header>

      <section className="rs-section">
        <h2>Profile</h2>
        <p>
          Technical Leader with a background across web development and software
          engineering, focused on e-commerce and web applications. Leads delivery
          of Magento, Laravel, CodeIgniter and mobile application projects — from
          requirement and technical approach to release and support. Career
          progressed from Trainee Web Developer to Technical Leader.
        </p>
      </section>

      <section className="rs-section">
        <h2>Core skills</h2>
        <dl className="rs-skills">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>{group.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rs-section">
        <h2>Experience</h2>
        <div className="rs-entry">
          <div className="rs-entry-head">
            <h3>Technical Leader</h3>
            <span>September 2026 — Present</span>
          </div>
          <ul>
            {responsibilities.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="rs-entry-sub">
            Career path: Trainee Web Developer → Web Developer → Software Engineer →
            Senior Software Engineer → Technical Leader.
          </p>
        </div>
      </section>

      <section className="rs-section">
        <h2>Selected projects</h2>
        <ul className="rs-projects">
          {projects.map((project) => (
            <li key={project.name}>
              <strong>{project.name}</strong>
              <span className="rs-project-stack">{project.stack}</span>
              <span className="rs-project-detail">{project.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rs-section">
        <h2>Education</h2>
        {education.map((item) => (
          <div className="rs-entry" key={item.qualification}>
            <div className="rs-entry-head">
              <h3>{item.qualification}</h3>
            </div>
            <p className="rs-entry-sub">{item.field}</p>
          </div>
        ))}
      </section>

      <section className="rs-section">
        <h2>Achievements &amp; recognition</h2>
        <ul>
          {achievements.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  );
}

export { contact as resumeContact };
