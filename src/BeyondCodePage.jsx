import { motion, useReducedMotion } from "framer-motion";

const icons = {
  leadership: (
    <>
      <path d="m12 3 2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8L12 3Z" />
      <path d="M7.5 19.5 6 22l6-2 6 2-1.5-2.5" />
    </>
  ),
  event: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h3M8 17h6" />
    </>
  ),
  award: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5v2a4 4 0 0 0 4 4M16 6h3v2a4 4 0 0 1-4 4M12 13v5M9 21h6M10 18h4" />
    </>
  ),
  academic: (
    <>
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.2v5.1c2.8 2.3 7.2 2.3 10 0v-5.1M21 9v6" />
    </>
  ),
  cycle: (
    <>
      <circle cx="6" cy="17" r="3.5" />
      <circle cx="18" cy="17" r="3.5" />
      <path d="m6 17 4-7h4l4 7m-8-7 4 7H6m7-10h3" />
    </>
  ),
  book: (
    <>
      <path d="M12 7c-2.2-2-5.3-2.7-8.5-2v14c3.2-.7 6.3 0 8.5 2 2.2-2 5.3-2.7 8.5-2V5c-3.2-.7-6.3 0-8.5 2Z" />
      <path d="M12 7v14M7 8.5c1.4 0 2.7.3 3.8 1M17 8.5c-1.4 0-2.7.3-3.8 1" />
    </>
  ),
  pen: (
    <>
      <path d="m4 20 4.2-1 10.9-10.9a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
      <path d="m14.8 6.2 3 3M4 20l5.2-1.2" />
    </>
  ),
  feather: (
    <>
      <path d="M20.5 3.5c-6.8-.8-12 1.7-14.4 6.1-1.8 3.2-.8 6.2 1.4 7.3 2.6 1.3 5.9-.5 7.9-3.4 2.2-3.1 3.1-6.7 5.1-10Z" />
      <path d="M3.5 21c3-5.3 7.1-8.9 12.4-11.2M8 16l-.4-4M12 13l3.7.1" />
    </>
  ),
};

const journeyGroups = [
  {
    name: "Professional",
    items: [
      {
        icon: "event",
        title: "Meet Magento Mumbai",
        description: "Attended the Magento community event in Mumbai.",
        date: "2023",
      },
      {
        icon: "event",
        title: "Meet Magento Ahmedabad",
        description: "Attended the Magento community event in Ahmedabad, Gujarat.",
        date: "2024",
      },
      {
        icon: "award",
        title: "Best Developer Award",
        description: "Received the award in my working organization for professional contribution and development excellence.",
        date: "2024",
      },
      {
        icon: "leadership",
        title: "Leadership Development Training",
        description: "Successfully completed leadership development training at IIM Lucknow.",
        date: "2025",
      },
    ],
  },
  {
    name: "Academic & college",
    items: [
      {
        icon: "academic",
        title: "Topper",
        description: "Achieved the Topper Award during Diploma studies.",
        date: "2019",
      },
      {
        icon: "cycle",
        title: "First Position — Cycle Race",
        description: "Secured First Position in a cycle race during college.",
      },
      {
        icon: "feather",
        title: "Second Position — Poetry Competition",
        description: "Secured Second Position in a poetry competition during college.",
      },
    ],
  },
  {
    name: "Literary",
    items: [
      {
        icon: "feather",
        title: "Creator of the Week",
        description: "Received this recognition from Sahityanama, Mumbai.",
        date: "2019",
      },
      {
        icon: "award",
        title: "Puneet Sahitya Pushp Samman",
        description: "Received the Puneet Sahitya Pushp Samman.",
        date: "2021",
      },
      {
        icon: "book",
        title: "Poetry publications",
        description: "Poems published in Sahityanama Magazine and several reputed magazines across India.",
      },
    ],
  },
];

function Icon({ name, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function RevealCard({ children, className = "", index = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.07 }}
    >
      {children}
    </motion.article>
  );
}

function SectionTitle({ kicker, title, highlight, description, headingId }) {
  return (
    <div className="beyond-section-title">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 id={headingId}>{title} <span className="gradient-text">{highlight}</span></h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function JourneyItem({ item }) {
  return (
    <li className="journey-entry">
      <span className="journey-entry-icon"><Icon name={item.icon} /></span>
      <div>
        {item.date && <span className="journey-date">{item.date}</span>}
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </li>
  );
}

export default function BeyondCodePage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="inner-page section-wrap beyond-page">
      <motion.header
        className="page-intro beyond-intro"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
      >
        <p className="eyebrow"><span className="status-dot" /> PERSONAL &amp; PROFESSIONAL JOURNEY</p>
        <h1>Beyond Code – My Journey, Achievements &amp; Passion</h1>
        <p className="beyond-intro-copy">
          The learning, recognition and creativity that shape me beyond software development.
        </p>
      </motion.header>

      <section className="beyond-section" aria-labelledby="leadership-heading">
        <SectionTitle
          kicker="LEARNING & COMMUNITY"
          title="Leadership &"
          highlight="Continuous Learning"
          description="Professional development and time spent learning with the Magento community."
          headingId="leadership-heading"
        />
        <div className="beyond-card-grid">
          <RevealCard className="beyond-card community-card" index={0}>
            <span className="beyond-icon"><Icon name="event" /></span>
            <p className="beyond-card-kicker">MAGENTO COMMUNITY</p>
            <h3>Meet Magento Mumbai</h3>
            <p>Attended Meet Magento Mumbai to engage with the Magento ecosystem and learn about its latest technologies and industry practices.</p>
            <span className="beyond-card-foot">Meet Magento · 2023</span>
          </RevealCard>
          <RevealCard className="beyond-card community-card" index={1}>
            <span className="beyond-icon"><Icon name="event" /></span>
            <p className="beyond-card-kicker">MAGENTO COMMUNITY</p>
            <h3>Meet Magento Ahmedabad</h3>
            <p>Attended Meet Magento Ahmedabad, Gujarat, to stay connected with Magento trends, development practices and the wider community.</p>
            <span className="beyond-card-foot">Ahmedabad, Gujarat · 2024</span>
          </RevealCard>
          <RevealCard className="beyond-card leadership-card" index={2}>
            <span className="beyond-icon"><Icon name="leadership" /></span>
            <p className="beyond-card-kicker">LEADERSHIP DEVELOPMENT</p>
            <h3>Indian Institute of Management, Lucknow</h3>
            <p>Successfully completed Leadership Development Training at IIM Lucknow—an important milestone in my professional and leadership development.</p>
            <span className="beyond-card-foot">IIM Lucknow · 2025</span>
          </RevealCard>
        </div>
        <p className="beyond-media-note">
          <Icon name="pen" />
          Training certificates and event photographs can be added when available.
        </p>
      </section>

      <section className="beyond-section recognition-section" aria-labelledby="recognition-heading">
        <SectionTitle kicker="PROFESSIONAL MILESTONE" title="Professional Recognition" highlight="& Awards" headingId="recognition-heading" />
        <RevealCard className="recognition-card" index={0}>
          <span className="recognition-icon"><Icon name="award" /></span>
          <div className="recognition-copy">
            <p className="beyond-card-kicker">RECOGNITION FOR DEVELOPMENT EXCELLENCE</p>
            <h3>Best Developer Award</h3>
            <p>Received in my working organization for professional contribution and development excellence.</p>
          </div>
          <span className="recognition-year">2024</span>
        </RevealCard>
      </section>

      <section className="beyond-section" aria-labelledby="academic-heading">
        <SectionTitle
          kicker="ACADEMIC & COLLEGE MILESTONES"
          title="Academic Excellence"
          highlight="& Achievements"
          headingId="academic-heading"
        />
        <div className="beyond-card-grid academic-grid">
          <RevealCard className="beyond-card academic-card" index={0}>
            <span className="beyond-icon"><Icon name="academic" /></span>
            <p className="beyond-card-kicker">DIPLOMA STUDIES</p>
            <h3>Topper</h3>
            <p>Achieved the Topper Award during my Diploma studies.</p>
            <span className="beyond-card-foot">2019</span>
          </RevealCard>
          <RevealCard className="beyond-card academic-card" index={1}>
            <span className="beyond-icon"><Icon name="cycle" /></span>
            <p className="beyond-card-kicker">COLLEGE ACHIEVEMENT</p>
            <h3>First Position — Cycle Race</h3>
            <p>Secured First Position in a cycle race during college.</p>
          </RevealCard>
          <RevealCard className="beyond-card academic-card" index={2}>
            <span className="beyond-icon"><Icon name="feather" /></span>
            <p className="beyond-card-kicker">COLLEGE ACHIEVEMENT</p>
            <h3>Second Position — Poetry Competition</h3>
            <p>Secured Second Position in a poetry competition during college.</p>
          </RevealCard>
        </div>
      </section>

      <section className="beyond-section literary-section" aria-labelledby="literary-heading">
        <div className="literary-panel">
          <div className="literary-heading-row">
            <span className="literary-emblem"><Icon name="feather" /></span>
            <div>
              <p className="literary-kicker">A PERSONAL WORLD OF WORDS</p>
              <h2 id="literary-heading">A Soul Connected with Words –<br />My Literary Journey</h2>
            </div>
          </div>
          <blockquote className="devanagari-quote" lang="hi">
            ईश्वर ने मुझे एक विशेष उपहार दिया है—शब्दों के माध्यम से अपनी भावनाओं को व्यक्त करने की कला। तकनीक मेरी आजीविका और पहचान का हिस्सा है, लेकिन कविता मेरे हृदय की अभिव्यक्ति है। जब भी अवसर मिलता है, मैं अपनी कविताओं के माध्यम से भावनाओं, विचारों और जीवन के अनुभवों को शब्दों में पिरोने का प्रयास करता हूँ।
          </blockquote>
          <div className="literary-highlights">
            <div>
              <Icon name="book" />
              <span>Poems published in <strong>Sahityanama Magazine</strong></span>
            </div>
            <div>
              <Icon name="pen" />
              <span>Literary works published in several reputed magazines across India</span>
            </div>
            <div>
              <Icon name="award" />
              <span><strong>Creator of the Week</strong> — Sahityanama, Mumbai · 2019</span>
            </div>
            <div>
              <Icon name="award" />
              <span><strong>Puneet Sahitya Pushp Samman</strong> · 2021</span>
            </div>
          </div>
        </div>
      </section>

      <section className="beyond-section poetry-section" aria-labelledby="poetry-heading">
        <SectionTitle
          kicker="SELECTED WRITING"
          title="My Poetry"
          highlight="& Publications"
          description="A dedicated space for selected poems and published literary work."
          headingId="poetry-heading"
        />
        <div className="poetry-archive">
          <span className="poetry-book-icon"><Icon name="book" /></span>
          <div>
            <h3>Words, gathered over time.</h3>
            <p>Selected poems, publication details and magazine covers can be featured here when you share them.</p>
          </div>
          <span className="archive-mark" aria-hidden="true"><Icon name="feather" /></span>
        </div>
      </section>

      <section className="beyond-section journey-section" aria-labelledby="journey-heading">
        <SectionTitle
          kicker="MILESTONES & TIMELINE"
          title="My Journey"
          highlight="in moments"
          description="Professional, academic and literary milestones from my journey."
          headingId="journey-heading"
        />
        <div className="journey-groups">
          {journeyGroups.map((group, groupIndex) => (
            <RevealCard className="journey-group" index={groupIndex} key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <JourneyItem item={item} key={item.title} />
                ))}
              </ul>
            </RevealCard>
          ))}
        </div>
      </section>
    </div>
  );
}
