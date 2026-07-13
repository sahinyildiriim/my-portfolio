import { MapPin, Mail, Code2, Download, Mouse } from "lucide-react";
import { motion } from "framer-motion";

const EMAIL = "muhammetsahinyildiirim@gmail.com";

function Home() {
  return (
    <section id="home" className="portfolio-hero">
      <div className="portfolio-glow portfolio-glow-left" />
      <div className="portfolio-glow portfolio-glow-center" />
      <div className="portfolio-glow portfolio-glow-right" />

      <motion.div
        className="portfolio-card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <span className="portfolio-badge">Backend Developer & Product Owner</span>

        <h1 className="portfolio-title">Şahin Yıldırım</h1>

        <p className="portfolio-role">
          Güvenilir API&apos;ler ve değer üreten dijital ürünler geliştiriyorum.
        </p>

        <div className="portfolio-contact">
          <span>
            <MapPin size={18} strokeWidth={1.8} />
            İstanbul, Türkiye
          </span>

          <a href={`mailto:${EMAIL}`}>
            <Mail size={18} strokeWidth={1.8} />
            {EMAIL}
          </a>
        </div>

        <div className="portfolio-actions">
          <a
            href="https://www.linkedin.com/in/muhammetsahinyildirim/"
            target="_blank"
            rel="noreferrer"
            className="portfolio-social-button portfolio-linkedin"
            aria-label="LinkedIn"
          >
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/sahinyildiriim"
            target="_blank"
            rel="noreferrer"
            className="portfolio-social-button"
            aria-label="GitHub"
          >
            <Code2 size={25} />
          </a>

          <a href="/resume.pdf" download className="portfolio-resume-button">
            <Download size={21} />
            <span>CV İndir</span>
            <span className="portfolio-resume-dot" />
          </a>
        </div>
      </motion.div>

      <a href="#about" className="portfolio-scroll" aria-label="Aşağı kaydır">
        <Mouse size={30} strokeWidth={1.5} />
      </a>
    </section>
  );
}

export default Home;
