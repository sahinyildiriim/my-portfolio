import { Heart, Code2, Mail, ExternalLink } from "lucide-react";

const EMAIL = "muhammetsahinyildiirim@gmail.com";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <div className="portfolio-footer-brand">
          <strong>Şahin Yıldırım</strong>
          <span>Backend Developer & Product Owner</span>
        </div>

        <div className="portfolio-footer-links">
          <a
            href={`mailto:${EMAIL}`}
            aria-label="E-posta gönder"
            title="E-posta"
          >
            <Mail size={18} />
          </a>

          <a
            href="https://github.com/sahinyildiriim"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <Code2 size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/muhammetsahinyildirim/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <ExternalLink size={18} />
          </a>
        </div>

        <p className="portfolio-footer-copy">
          © {year} Şahin Yıldırım · Tasarım ve geliştirme{" "}
          <Heart size={13} className="portfolio-footer-heart" aria-hidden /> ile
        </p>
      </div>
    </footer>
  );
}

export default Footer;
