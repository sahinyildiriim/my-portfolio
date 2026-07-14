import { useEffect, useState } from "react";
import { ExternalLink, FolderKanban, LoaderCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

import { fetchProjects } from "../lib/api";

const fallbackGradients = [
  "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
  "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
  "linear-gradient(135deg, #0369a1 0%, #38bdf8 100%)",
  "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
];

function GithubIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23C2 16.75 4.87 20.58 8.84 21.94C9.34 22.04 9.52 21.72 9.52 21.45C9.52 21.21 9.51 20.41 9.51 19.56C7 20.03 6.35 18.93 6.15 18.35C6.04 18.05 5.55 17.13 5.13 16.88C4.78 16.69 4.28 16.22 5.12 16.21C5.91 16.2 6.47 16.95 6.66 17.25C7.56 18.8 9 18.36 9.57 18.09C9.66 17.42 9.92 16.97 10.21 16.71C7.99 16.45 5.67 15.57 5.67 11.65C5.67 10.53 6.06 9.61 6.7 8.89C6.6 8.63 6.25 7.58 6.8 6.17C6.8 6.17 7.64 5.9 9.55 7.22C10.35 6.99 11.2 6.88 12.05 6.88C12.9 6.88 13.75 6.99 14.55 7.22C16.46 5.89 17.3 6.17 17.3 6.17C17.85 7.58 17.5 8.63 17.4 8.89C18.04 9.61 18.43 10.52 18.43 11.65C18.43 15.58 16.1 16.45 13.88 16.71C14.24 17.03 14.55 17.66 14.55 18.63C14.55 20.02 14.54 21.14 14.54 21.45C14.54 21.72 14.72 22.05 15.22 21.94C19.17 20.58 22 16.74 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setIsLoading(true);
    setError("");

    try {
      const items = await fetchProjects(6);
      setProjects(items);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Projeler yüklenemedi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialProjects = async () => {
      try {
        const items = await fetchProjects(6);

        if (!cancelled) {
          setProjects(items);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Projeler yüklenemedi."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="projects-state projects-state-loading" aria-live="polite">
          <LoaderCircle className="projects-state-icon projects-state-icon-spinning" size={28} />
          <p>Projeler backend’den yükleniyor.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="projects-state projects-state-error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="projects-state-retry"
            onClick={loadProjects}
          >
            <RefreshCcw size={16} />
            Yeniden Dene
          </button>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="projects-state projects-state-empty">
          <p>Henüz yayınlanmış proje bulunmuyor.</p>
        </div>
      );
    }

    return (
      <div className="projects-grid">
        {projects.map((project, index) => {
          const projectVisual = project.imageUrl
            ? {
                backgroundImage: `url(${project.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background: fallbackGradients[index % fallbackGradients.length],
              };

          return (
            <motion.article
              className="project-card"
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={index}
            >
              <div className="project-image-wrapper">
                <div
                  className="project-image project-image-placeholder"
                  style={projectVisual}
                  role="img"
                  aria-label={`${project.title} görseli`}
                />

                <div className="project-image-overlay" />

                <span className="project-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-technologies">
                  {project.technologies?.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-button-primary"
                    >
                      <ExternalLink size={17} />
                      Demo
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button project-button-secondary"
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-orb projects-orb-left" />
      <div className="projects-orb projects-orb-right" />

      <div className="projects-shell">
        <header className="projects-header">
          <span className="projects-eyebrow">
            <FolderKanban size={17} />
            Projeler
          </span>

          <div className="projects-title-row">
            <h2>
              Fikirden ürüne
              <span> geliştirdiğim projeler.</span>
            </h2>

            <p>
              Backend geliştirme, ürün yönetimi ve kullanıcı ihtiyaçlarını bir
              araya getirdiğim seçili çalışmalarım.
            </p>
          </div>
        </header>

        {renderContent()}
      </div>
    </section>
  );
}

export default Projects;
