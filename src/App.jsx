import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TerminalIntro from "./components/TerminalIntro";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import "./App.css";
import About from "./components/About";
import Project from "./components/Project";
import Skills from "./components/Skills";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [introDone]);

  const handleFinish = (targetId = "home") => {
    setIntroDone(true);

    setTimeout(() => {
      if (targetId) {
        window.history.replaceState(null, "", `#${targetId}`);
      }

      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <TerminalIntro
            key="intro"
            onFinish={handleFinish}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {introDone && (
          <motion.main
            key="main-content"
            initial={{
              opacity: 0,
              scale: 0.985,
              y: 18,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <Navbar />
            <Home />
            <About/>
            <Project />
            <Skills/>     
            <Blogs/>     
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;