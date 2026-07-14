import {
  Server,
  Database,
  Boxes,
  GitBranch,
  Workflow,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

const skillGroups = [
  {
    icon: Server,
    title: "Backend",
    description: "API geliştirme, iş mantığı ve servis mimarileri.",
    skills: [
      { name: "Java", level: 82 },
      { name: "Spring Boot", level: 78 },
      { name: "REST API", level: 86 },
      { name: "Node.js", level: 68 },
    ],
  },
  {
    icon: Database,
    title: "Database",
    description: "Veri modelleme, sorgulama ve ilişkisel veritabanları.",
    skills: [
      { name: "PostgreSQL", level: 76 },
      { name: "SQL", level: 80 },
      { name: "MySQL", level: 72 },
      { name: "MongoDB", level: 62 },
    ],
  },
  {
    icon: Workflow,
    title: "Product & Process",
    description: "Ürün geliştirme, planlama ve ekip koordinasyonu.",
    skills: [
      { name: "Product Ownership", level: 76 },
      { name: "Agile / Scrum", level: 72 },
      { name: "Backlog Management", level: 74 },
      { name: "Requirement Analysis", level: 79 },
    ],
  },
];

const tools = [
  { icon: GitBranch, name: "Git & GitHub" },
  { icon: Boxes, name: "Docker" },
  { icon: Workflow, name: "Postman" },
  { icon: GraduationCap, name: "Sürekli Öğrenme" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-orb skills-orb-left" />
      <div className="skills-orb skills-orb-right" />

      <div className="skills-shell">
        <header className="skills-header">
          <span className="skills-eyebrow">
            <Boxes size={17} />
            Yetenekler
          </span>

          <div className="skills-title-row">
            <h2>
              Teknik bilgi,
              <span> ürün bakış açısı.</span>
            </h2>

            <p>
              Backend geliştirme, veri yönetimi ve ürün süreçlerinde kullandığım
              teknoloji ve yetkinlikler.
            </p>
          </div>
        </header>

        <div className="skills-grid">
          {skillGroups.map(({ icon: Icon, title, description, skills }, index) => (
            <motion.article
              className="skill-card"
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={index}
            >
              <div className="skill-card-head">
                <div className="skill-card-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>

              <div className="skill-list">
                {skills.map((skill) => (
                  <div className="skill-item" key={skill.name}>
                    <div className="skill-meta">
                      <span>{skill.name}</span>
                      <strong>{skill.level}%</strong>
                    </div>

                    <div className="skill-track">
                      <span style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="skills-tools">
          {tools.map(({ icon: Icon, name }) => (
            <div className="skill-tool" key={name}>
              <div className="skill-tool-icon">
                <Icon size={19} strokeWidth={1.8} />
              </div>

              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
