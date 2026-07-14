import { useEffect, useState } from "react";
import {
  Home,
  User,
  BriefcaseBusiness,
  Code2,
  BookOpen,
  Mail,
} from "lucide-react";

const menuItems = [
  { id: "home", label: "Ana Sayfa", icon: Home },
  { id: "about", label: "Hakkımda", icon: User },
  { id: "projects", label: "Projeler", icon: BriefcaseBusiness },
  { id: "skills", label: "Yetenekler", icon: Code2 },
  { id: "blogs", label: "Blog", icon: BookOpen },
  { id: "contact", label: "İletişim", icon: Mail },
];

const SECTION_IDS = menuItems.map((item) => item.id);

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const offset = 120;
      let current = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className={`portfolio-navbar${scrolled ? " portfolio-navbar-scrolled" : ""}`}
      aria-label="Ana menü"
    >
      {menuItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`navbar-link${activeSection === id ? " navbar-link-active" : ""}`}
          aria-label={label}
          aria-current={activeSection === id ? "page" : undefined}
          title={label}
          onClick={() => scrollToSection(id)}
        >
          <Icon size={20} strokeWidth={1.7} />
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
