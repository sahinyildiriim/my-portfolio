import {
  Server,
  ClipboardList,
  GraduationCap,
  Database,
  ArrowUpRight,
} from "lucide-react";


const focusAreas = [
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Güvenli, sürdürülebilir ve ölçeklenebilir API sistemleri geliştiriyorum.",
  },
  {
    icon: ClipboardList,
    title: "Product Ownership",
    description:
      "İhtiyaçları analiz ediyor, ürün hedeflerini teknik süreçlerle birleştiriyorum.",
  },
  {
    icon: GraduationCap,
    title: "Sürekli Öğrenme",
    description:
      "Öğrenci olarak yeni teknolojileri öğreniyor ve gerçek projelerde uyguluyorum.",
  },
];

const technologies = [
  "Java",
  "Spring Boot",
  "REST API",
  "SQL",
  "PostgreSQL",
  "Git",
];

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-orb about-orb-left" />
      <div className="about-orb about-orb-right" />

      <div className="about-shell">
        <header className="about-header">
          <span className="about-eyebrow">Hakkımda</span>

          <div className="about-title-row">
            <h2>
              Kod, ürün ve
              <span> öğrenme merakı.</span>
            </h2>

            <p>
              Backend geliştirme ile ürün yönetimini bir araya getiriyor,
              fikirleri planlanabilir ve sürdürülebilir dijital ürünlere
              dönüştürüyorum.
            </p>
          </div>
        </header>

        <div className="about-layout">
          <article className="about-profile-card">
            <div className="about-profile-top">
              <div className="about-avatar">
                <span>ŞY</span>
              </div>

              <div>
                <span className="about-status">
                  Öğrenci • Backend Developer
                </span>

                <h3>Muhammet Şahin Yıldırım</h3>

                <p className="about-profile-role">
                  Backend Developer &amp; Product Owner
                </p>
              </div>
            </div>

            <p className="about-description">
              Backend teknolojileriyle güvenilir servisler ve API yapıları
              geliştiriyorum. Product Owner bakış açımla kullanıcı ihtiyaçları,
              iş hedefleri ve teknik gereksinimler arasında denge kurmaya
              odaklanıyorum.
            </p>

            <p className="about-description">
              Aynı zamanda öğrenciyim. Öğrendiğim bilgileri yalnızca teoride
              bırakmayıp projelerde uygulamayı ve her projede kendimi biraz daha
              geliştirmeyi önemsiyorum.
            </p>

            <div className="about-technologies">
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <a href="#contact" className="about-contact-link">
              Birlikte çalışalım
              <ArrowUpRight size={18} />
            </a>
          </article>

          <div className="about-focus-grid">
            {focusAreas.map(({ icon: Icon, title, description }, index) => (
              <article className="about-focus-card" key={title}>
                <div className="about-focus-head">
                  <div className="about-focus-icon">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span>0{index + 1}</span>
                </div>

                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}

            <article className="about-data-card">
              <div className="about-data-icon">
                <Database size={23} />
              </div>

              <div>
                <strong>Odak noktam</strong>
                <span>
                  Temiz mimari, güçlü API tasarımı ve değer üreten ürünler.
                </span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;