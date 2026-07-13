import {
  ArrowUpRight,
  Mail,
  MapPin,
  Send,
  MessageSquare,
} from "lucide-react";

const EMAIL = "muhammetsahinyildiirim@gmail.com";

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const mailSubject = encodeURIComponent(
      subject || `Portfolyo iletişim mesajı - ${name}`,
    );

    const mailBody = encodeURIComponent(
      `İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`,
    );

    window.location.href = `mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-orb contact-orb-left" />
      <div className="contact-orb contact-orb-right" />

      <div className="contact-shell">
        <header className="contact-header">
          <span className="contact-eyebrow">
            <MessageSquare size={17} />
            İletişim
          </span>

          <div className="contact-title-row">
            <h2>
              Bir fikrin mi var?
              <span> Birlikte geliştirelim.</span>
            </h2>

            <p>
              Proje, iş birliği veya ürün geliştirme süreçleri hakkında
              konuşmak için bana ulaşabilirsin.
            </p>
          </div>
        </header>

        <div className="contact-layout">
          <article className="contact-info-card">
            <div>
              <span className="contact-card-label">İletişime geç</span>

              <h3>
                Yeni projeler ve iş birlikleri için her zaman konuşmaya açığım.
              </h3>

              <p>
                Backend geliştirme, ürün yönetimi veya birlikte üretmek
                istediğin bir fikir varsa mesajını bırakabilirsin.
              </p>
            </div>

            <div className="contact-info-list">
              <a href={`mailto:${EMAIL}`} className="contact-info-item">
                <span className="contact-info-icon">
                  <Mail size={20} strokeWidth={1.8} />
                </span>

                <span>
                  <small>E-posta</small>
                  <strong>{EMAIL}</strong>
                </span>

                <ArrowUpRight size={18} />
              </a>

              <div className="contact-info-item">
                <span className="contact-info-icon">
                  <MapPin size={20} strokeWidth={1.8} />
                </span>

                <span>
                  <small>Konum</small>
                  <strong>İstanbul, Türkiye</strong>
                </span>
              </div>
            </div>

            <div className="contact-availability">
              <span className="contact-availability-dot" />

              <div>
                <strong>İş birliğine açığım</strong>
                <p>
                  Staj, freelance ve yeni proje fırsatları için iletişime
                  geçebilirsin.
                </p>
              </div>
            </div>
          </article>

          <form className="contact-form-card" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <label className="contact-field">
                <span>Ad Soyad</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Adınızı girin"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="contact-field">
                <span>E-posta</span>

                <input
                  type="email"
                  name="email"
                  placeholder="ornek@mail.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="contact-field">
              <span>Konu</span>

              <input
                type="text"
                name="subject"
                placeholder="Hangi konuda görüşmek istiyorsunuz?"
              />
            </label>

            <label className="contact-field">
              <span>Mesaj</span>

              <textarea
                name="message"
                rows="6"
                placeholder="Mesajınızı buraya yazın..."
                required
              />
            </label>

            <button type="submit" className="contact-submit-button">
              <Send size={18} />
              Mesaj Gönder
            </button>

            <p className="contact-form-note">
              Bu form varsayılan e-posta uygulamanızı açar.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
