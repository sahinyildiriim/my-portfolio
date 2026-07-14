import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  LoaderCircle,
  RefreshCcw,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import { fetchBlogPost, fetchBlogPosts, formatDateTR } from "../lib/api";

const fallbackGradients = [
  "linear-gradient(135deg, #059669 0%, #34d399 100%)",
  "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
  "linear-gradient(135deg, #ea580c 0%, #fb923c 100%)",
  "linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)",
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
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const loadBlogPosts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const items = await fetchBlogPosts(3);
      setBlogPosts(items);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Blog yazıları yüklenemedi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialBlogPosts = async () => {
      try {
        const items = await fetchBlogPosts(3);

        if (!cancelled) {
          setBlogPosts(items);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Blog yazıları yüklenemedi."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialBlogPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedSlug) {
      return undefined;
    }

    let cancelled = false;

    const loadBlogDetail = async () => {
      setIsDetailLoading(true);
      setDetailError("");

      try {
        const post = await fetchBlogPost(selectedSlug);

        if (!cancelled) {
          setSelectedBlog(post);
        }
      } catch (requestError) {
        if (!cancelled) {
          setDetailError(
            requestError instanceof Error
              ? requestError.message
              : "Blog detayı yüklenemedi."
          );
        }
      } finally {
        if (!cancelled) {
          setIsDetailLoading(false);
        }
      }
    };

    loadBlogDetail();

    return () => {
      cancelled = true;
    };
  }, [selectedSlug]);

  const openBlogDetail = (slug) => {
    setSelectedSlug(slug);
    setSelectedBlog(null);
    setDetailError("");
  };

  const closeBlogDetail = () => {
    setSelectedSlug("");
    setSelectedBlog(null);
    setIsDetailLoading(false);
    setDetailError("");
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="blogs-state blogs-state-loading" aria-live="polite">
          <LoaderCircle className="blogs-state-icon blogs-state-icon-spinning" size={28} />
          <p>Blog yazıları backend’den yükleniyor.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="blogs-state blogs-state-error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="blogs-state-retry"
            onClick={loadBlogPosts}
          >
            <RefreshCcw size={16} />
            Yeniden Dene
          </button>
        </div>
      );
    }

    if (blogPosts.length === 0) {
      return (
        <div className="blogs-state blogs-state-empty">
          <p>Henüz yayınlanmış blog yazısı bulunmuyor.</p>
        </div>
      );
    }

    return (
      <div className="blogs-grid">
        {blogPosts.map((post, index) => {
          const postVisual = post.imageUrl
            ? {
                backgroundImage: `url(${post.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background: fallbackGradients[index % fallbackGradients.length],
              };

          return (
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
                  style={postVisual}
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
                    {formatDateTR(post.publishedAt)}
                  </span>

                  <span>
                    <Clock3 size={15} />
                    {post.readTime ? `${post.readTime} dk` : "-"}
                  </span>
                </div>

                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <button
                  type="button"
                  className="blog-read-link blog-read-button"
                  onClick={() => openBlogDetail(post.slug)}
                  aria-label={`${post.title} yazısını oku`}
                >
                  Yazıyı Oku
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  };

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

        {renderContent()}
      </div>

      {selectedSlug && (
        <div
          className="blog-modal-backdrop"
          role="presentation"
          onClick={closeBlogDetail}
        >
          <motion.article
            className="blog-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="blog-modal-header">
              <div>
                <span className="blog-modal-eyebrow">Blog detayı</span>
                <h3 id="blog-modal-title">
                  {selectedBlog?.title || "Yazı yükleniyor"}
                </h3>
              </div>

              <button
                type="button"
                className="blog-modal-close"
                onClick={closeBlogDetail}
                aria-label="Blog detayını kapat"
              >
                <X size={18} />
              </button>
            </div>

            {isDetailLoading && (
              <div className="blog-modal-state">
                <LoaderCircle className="blogs-state-icon blogs-state-icon-spinning" size={26} />
                <p>Yazı içeriği yükleniyor.</p>
              </div>
            )}

            {detailError && !isDetailLoading && (
              <div className="blog-modal-state blog-modal-state-error" role="alert">
                <p>{detailError}</p>
              </div>
            )}

            {selectedBlog && !isDetailLoading && !detailError && (
              <>
                <div className="blog-modal-meta">
                  <span>{selectedBlog.category}</span>
                  <span>{formatDateTR(selectedBlog.publishedAt)}</span>
                  <span>
                    {selectedBlog.readTime ? `${selectedBlog.readTime} dk` : "-"}
                  </span>
                </div>

                <div className="blog-modal-content">
                  {selectedBlog.content}
                </div>
              </>
            )}
          </motion.article>
        </div>
      )}
    </section>
  );
}

export default Blogs;
