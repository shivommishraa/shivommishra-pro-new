import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export const projects = [
  {
    name: "Hoya Contact Lenses",
    url: "https://hoyacontactlenses.com/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: ["Magento"],
    categories: ["E-commerce", "Magento"],
  },
  {
    name: "Astalift Magento Portal",
    url: "https://astalift.com.sg/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: ["Magento"],
    categories: ["E-commerce", "Magento"],
  },
  {
    name: "TNS",
    url: "https://tns.com.sg/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: [],
    categories: ["E-commerce"],
  },
  {
    name: "Beauty Garage",
    url: "https://www.beautygarage.sg/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: [],
    categories: ["E-commerce"],
  },
  {
    name: "Cheefatt",
    url: "https://www.cheefatt.com/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: [],
    categories: ["E-commerce"],
  },
  {
    name: "Gulfnet",
    description: "Magento administration and Android application project.",
    contribution: "Magento admin panel · Android application",
    technologies: ["Magento", "Android"],
    categories: ["Magento", "Mobile Applications"],
  },
  {
    name: "Idemco",
    url: "https://www.idemcosb.com.my/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: [],
    categories: ["E-commerce"],
  },
  {
    name: "Career Alfa",
    url: "https://careeralfa.com/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: ["CodeIgniter"],
    categories: ["E-commerce", "CodeIgniter"],
  },
  {
    name: "SSG MART",
    url: "https://ssghypermart.com/",
    description: "E-commerce platform implementation.",
    contribution: "Frontend · Order & payment · Admin panel",
    technologies: ["Laravel"],
    categories: ["E-commerce", "Laravel"],
  },
  {
    name: "Burney Mobile Application",
    description: "Mobile application project.",
    contribution: "Flutter mobile application development",
    technologies: ["Flutter"],
    categories: ["Mobile Applications"],
  },
  {
    name: "Maa Durga Sewa Samiti",
    url: "https://www.maadurgasewasamiti.in/",
    description: "Website and donation management implementation.",
    contribution: "Website · Frontend · Donation/payment · Admin management",
    technologies: ["Laravel"],
    categories: ["Laravel"],
  },
  {
    name: "Fujifilm Australia",
    country: "Australia",
    language: "English",
    url: "https://www.fujifilm.com/fbau/en",
  },
  {
    name: "Fujifilm Cambodia",
    country: "Cambodia",
    language: "English",
    url: "https://www.fujifilm.com/fbca/en",
  },
  {
    name: "Fujifilm China",
    country: "China",
    language: "Simplified Chinese",
    url: "https://www.fujifilm-fb.com.cn/fbcn/zh-cn",
  },
  {
    name: "Fujifilm Hong Kong (English)",
    country: "Hong Kong",
    language: "English",
    url: "https://www.fujifilm.com/fbhk/en",
  },
  {
    name: "Fujifilm Hong Kong (Traditional Chinese)",
    country: "Hong Kong",
    language: "Traditional Chinese",
    url: "https://www.fujifilm.com/fbhk/zh-hk",
  },
  {
    name: "Fujifilm Korea",
    country: "Korea",
    language: "Korean",
    url: "https://www.fujifilm.com/fbkr/ko",
  },
  {
    name: "Fujifilm Myanmar",
    country: "Myanmar",
    language: "English",
    url: "https://www.fujifilm.com/fbmm/en",
  },
  {
    name: "Fujifilm Malaysia",
    country: "Malaysia",
    language: "English",
    url: "https://www.fujifilm.com/fbmy/en",
  },
  {
    name: "Fujifilm New Zealand",
    country: "New Zealand",
    language: "English",
    url: "https://www.fujifilm.com/fbnz/en",
  },
  {
    name: "Fujifilm Philippines",
    country: "Philippines",
    language: "English",
    url: "https://www.fujifilm.com/fbph/en",
  },
  {
    name: "Fujifilm Singapore",
    country: "Singapore",
    language: "English",
    url: "https://www.fujifilm.com/fbsg/en",
  },
  {
    name: "Fujifilm Thailand (English)",
    country: "Thailand",
    language: "English",
    url: "https://www.fujifilm.com/fbth/en",
  },
  {
    name: "Fujifilm Thailand (Thai)",
    country: "Thailand",
    language: "Thai",
    url: "https://www.fujifilm.com/fbth/th",
  },
  {
    name: "Fujifilm Taiwan",
    country: "Taiwan",
    language: "Traditional Chinese",
    url: "https://www.fujifilm.com/fbtw/zh-tw",
  },
  {
    name: "Fujifilm Vietnam (English)",
    country: "Vietnam",
    language: "English",
    url: "https://www.fujifilm.com/fbvn/en",
  },
  {
    name: "Fujifilm Vietnam (Vietnamese)",
    country: "Vietnam",
    language: "Vietnamese",
    url: "https://www.fujifilm.com/fbvn/vi",
  },
].map((project) => ({
  ...project,
  categories: project.country
    ? ["Corporate Websites", "Fujifilm Global Projects"]
    : project.categories,
  technologies: project.technologies || [],
}));

const filters = [
  "All Projects",
  "E-commerce",
  "Magento",
  "Laravel",
  "CodeIgniter",
  "Mobile Applications",
  "Corporate Websites",
  "Fujifilm Global Projects",
];

function ProjectLogo({ url, name, compact = false }) {
  const [unavailable, setUnavailable] = useState(!url);

  return (
    <span className={`projects-logo${compact ? " projects-logo-compact" : ""}`}>
      {url && !unavailable && (
        <img
          src={`${new URL(url).origin}/favicon.ico`}
          alt=""
          loading="lazy"
          onError={() => setUnavailable(true)}
        />
      )}
      {unavailable && <span aria-hidden="true">{name.slice(0, 2).toUpperCase()}</span>}
    </span>
  );
}

function ExternalLink({ url, children, className = "" }) {
  if (!url) {
    return (
      <span className={`project-visit project-visit-unavailable ${className}`}>
        Link not provided
      </span>
    );
  }

  return (
    <a
      className={`project-visit ${className}`}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {children || "Visit website"} <span aria-hidden="true">↗</span>
    </a>
  );
}

function ProjectCard({ project, index, reduceMotion }) {
  return (
    <motion.article
      className="showcase-card"
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.035 }}
    >
      <div className="showcase-card-top">
        <ProjectLogo url={project.url} name={project.name} />
        <span className="showcase-card-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="showcase-card-category">
        {project.country ? "Fujifilm · Corporate website" : project.categories[0]}
      </p>
      <h3>{project.name}</h3>
      <p className="showcase-description">{project.description}</p>
      <div className="showcase-contribution">
        <span>Contribution</span>
        <p>{project.contribution}</p>
      </div>
      {project.technologies.length > 0 && (
        <div className="showcase-tags" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      )}
      <ExternalLink url={project.url} />
    </motion.article>
  );
}

function FujifilmCountryCard({ country, variants, index, reduceMotion }) {
  const firstUrl = variants[0].url;

  return (
    <motion.article
      className="showcase-card fujifilm-card"
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.035 }}
    >
      <div className="showcase-card-top">
        <ProjectLogo url={firstUrl} name="Fujifilm" />
        <span className="fujifilm-mark">FUJIFILM</span>
      </div>
      <p className="showcase-card-category">International corporate website</p>
      <h3>{country}</h3>
      <p className="showcase-description">Fujifilm {country} website implementation.</p>
      <div className="showcase-contribution">
        <span>Contribution</span>
        <p>International corporate website implementation.</p>
        {variants.length > 1 && <span className="fujifilm-language-label">Language versions</span>}
        <div className="fujifilm-links">
          {variants.map((variant) => (
            <ExternalLink
              key={variant.url}
              url={variant.url}
              className="fujifilm-locale-link"
            >
              {variant.language} · Visit website
            </ExternalLink>
          ))}
        </div>
      </div>
      <div className="showcase-tags">
        <span>{variants.length} {variants.length === 1 ? "version" : "versions"}</span>
        <span>Fujifilm Global Projects</span>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [search, setSearch] = useState("");
  const reduceMotion = useReducedMotion();
  const query = search.trim().toLocaleLowerCase();

  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesFilter =
          activeFilter === "All Projects" || project.categories.includes(activeFilter);
        const searchable = [
          project.name,
          project.country,
          project.language,
          ...project.technologies,
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();
        return matchesFilter && (!query || searchable.includes(query));
      }),
    [activeFilter, query],
  );

  const webProjects = visibleProjects.filter((project) => !project.country);
  const countryGroups = visibleProjects.reduce((groups, project) => {
    if (!project.country) return groups;
    const group = groups.find((entry) => entry.country === project.country);
    if (group) group.variants.push(project);
    else groups.push({ country: project.country, variants: [project] });
    return groups;
  }, []);

  return (
    <div className="inner-page section-wrap projects-showcase">
      <motion.div
        className="page-intro"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow"><span className="status-dot" /> MY PROJECTS</p>
        <h1>
          Projects &amp; Professional
          <br />
          <span className="gradient-text">Experience</span>
        </h1>
        <p className="projects-subtitle">
          Explore my journey through e-commerce platforms, enterprise web solutions,
          international corporate websites and mobile applications.
        </p>
      </motion.div>

      <section className="projects-browser" aria-label="Browse projects">
        <div className="projects-toolbar">
          <label className="projects-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects, technologies or countries"
              aria-label="Search projects, technologies or countries"
            />
          </label>
          <p className="projects-count" aria-live="polite">
            Showing{" "}
            <motion.span
              key={visibleProjects.length}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
            >
              {visibleProjects.length}
            </motion.span>{" "}
            of {projects.length} projects
          </p>
        </div>

        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "active" : ""}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="sync">
          {webProjects.length > 0 && (
            <motion.section
              key="web-projects"
              className="showcase-section"
              layout
              aria-label="E-commerce and web applications"
            >
              <div className="showcase-section-heading">
                <div>
                  <p className="section-kicker">SELECTED BUILDS</p>
                  <h2>E-commerce &amp; <span className="gradient-text">web applications</span></h2>
                </div>
                <span>{webProjects.length.toString().padStart(2, "0")} projects</span>
              </div>
              <div className="showcase-grid">
                <AnimatePresence mode="sync">
                  {webProjects.map((project, index) => (
                    <ProjectCard
                      key={project.name}
                      project={project}
                      index={index}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
          {countryGroups.length > 0 && (
            <motion.section
              key="fujifilm-projects"
              className="showcase-section fujifilm-section"
              layout
              aria-label="Fujifilm global projects"
            >
              <div className="showcase-section-heading">
                <div>
                  <p className="section-kicker">INTERNATIONAL IMPLEMENTATIONS</p>
                  <h2>Fujifilm <span className="gradient-text">global projects</span></h2>
                </div>
                <span>{countryGroups.length.toString().padStart(2, "0")} countries · {countryGroups.reduce((total, group) => total + group.variants.length, 0)} sites</span>
              </div>
              <div className="showcase-grid">
                <AnimatePresence mode="sync">
                  {countryGroups.map((group, index) => (
                    <FujifilmCountryCard
                      key={group.country}
                      country={group.country}
                      variants={group.variants}
                      index={index}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
          {visibleProjects.length === 0 && (
            <motion.div
              key="empty"
              className="projects-empty"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span aria-hidden="true">⌕</span>
              <h2>No matching projects</h2>
              <p>Try another search or choose a different category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
