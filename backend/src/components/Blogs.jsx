import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "Spring Boot ile Temiz REST API Tasarımı",
    description:
      "Katmanlı mimari, DTO kullanımı, hata yönetimi ve sürdürülebilir endpoint tasarımı üzerine pratik notlar.",
    gradient: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    category: "Backend",
    date: "12 Mayıs 2026",
    readTime: "6 dk",
    url: "#",
  },
  {
    id: 2,
    title: "Product Owner Olarak Teknik Ekiple Çalışmak",
    description:
      "Ürün hedefleri, teknik gereksinimler ve ekip iletişimi arasında sağlıklı bir denge kurmak için izlediğim yaklaşım.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    category: "Product",
    date: "28 Nisan 2026",
    readTime: "5 dk",
    url: "#",
  },
  {
    id: 3,
    title: "Öğrenciyken Gerçek Proje Geliştirmenin Önemi",
    description:
      "Teorik bilgiyi kalıcı hale getirmek, portföy oluşturmak ve gerçek problemlere çözüm üretmek üzerine deneyimlerim.",
    gradient: "linear-gradient(135deg, #ea580c 0%, #fb923c 100%)",
    category: "Kariyer",
    date: "10 Nisan 2026",
    readTime: "4 dk",
    url: "#",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function Blogs() {
  return (
    <section id="blogs" className="blogs-section">
      <div className="blogs-orb blogs-orb-left" />
      <div className="blogs-orb blogs-orb-right" />

      <div className="blogs-shell">
        <header className="blogs-header">
          <span className="blogs-eyebrow">
            <BookOpen size={17} />
            Blog
          </span>

          <div className="blogs-title-row">
            <h2>
              Öğrendiklerimden
              <span> paylaştığım notlar.</span>
            </h2>

            <p>
              Backend geliştirme, ürün yönetimi ve öğrenme sürecinde edindiğim
              deneyimleri kısa ve uygulanabilir yazılarla paylaşıyorum.
            </p>
          </div>
        </header>

        <div className="blogs-grid">
          {blogPosts.map((post, index) => (
            <motion.article
              className="blog-card"
              key={post.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={index}
            >
              <div className="blog-image-wrapper">
                <div
                  className="blog-image blog-image-placeholder"
                  style={{ background: post.gradient }}
                  role="img"
                  aria-label={`${post.title} görseli`}
                />

                <div className="blog-image-overlay" />

                <span className="blog-category">{post.category}</span>
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span>
                    <CalendarDays size={15} />
                    {post.date}
                  </span>

                  <span>
                    <Clock3 size={15} />
                    {post.readTime}
                  </span>
                </div>

                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <a
                  href={post.url}
                  className="blog-read-link"
                  aria-label={`${post.title} yazısını oku`}
                >
                  Yazıyı Oku
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blogs;
