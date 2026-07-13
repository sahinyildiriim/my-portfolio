import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { bootMessages } from "../data/bootMessages";

function TerminalIntro({ onFinish }) {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const runBootSequence = async () => {
      for (const entry of bootMessages) {
        if (cancelled) {
          return;
        }

        setCurrentPrompt(entry.prompt);
        setCurrentLine("");

        for (let index = 0; index <= entry.command.length; index += 1) {
          if (cancelled) {
            return;
          }

          setCurrentLine(entry.command.slice(0, index));
          await wait(28);
        }

        setLines((prev) => [
          ...prev,
          {
            type: "command",
            prompt: entry.prompt,
            command: entry.command,
          },
        ]);

        setCurrentLine("");
        await wait(180);

        for (const outputLine of entry.output) {
          if (cancelled) {
            return;
          }

          setLines((prev) => [...prev, { type: "output", text: outputLine }]);
          await wait(140);
        }

        await wait(220);
      }

      if (!cancelled) {
        setShowButtons(true);
      }
    };

    runBootSequence();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentLine, currentPrompt]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center px-4 bg-[radial-gradient(circle_at_top,_rgba(126,240,192,0.08),_transparent_42%),linear-gradient(180deg,_#050708_0%,_#0a0f0d_100%)]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 bg-[#0a0f0d]/90 border border-[rgba(145,170,160,0.22)] rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl shadow-black/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-[#07100d] px-4 py-3 border-b border-[rgba(145,170,160,0.12)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#586b63]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
          <span className="ml-3 text-[rgba(139,162,154,0.75)] text-xs font-mono">
            sahin@portfolio: ~/dev
          </span>
        </div>

        <div className="p-6">
          <div
            ref={terminalRef}
            className="h-64 overflow-y-auto text-sm font-mono leading-6 text-[#d9e4df]"
          >
            {lines.map((line, i) =>
              line.type === "command" ? (
                <div key={i}>
                  <span className="text-[#7ef0c0]">{line.prompt}</span>{" "}
                  <span className="text-white">{line.command}</span>
                </div>
              ) : (
                <div
                  key={i}
                  className={
                    line.text === "System online. Redirecting to GUI..."
                      ? "text-[#a9f7d8]"
                      : "text-[rgba(217,228,223,0.82)]"
                  }
                >
                  {line.text}
                </div>
              )
            )}
            <div className="flex items-center">
              <span className="text-[#7ef0c0]">{currentPrompt}</span>
              <span className="text-white">{currentLine}</span>
              <span className="ml-1 animate-pulse text-[#7ef0c0]">▊</span>
            </div>
          </div>

          {showButtons && (
            <motion.div
              className="flex justify-end mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => onFinish("home")}
                className="border border-[rgba(126,240,192,0.55)] text-[#7ef0c0] rounded-full px-6 py-2 hover:bg-[#7ef0c0] hover:text-black transition"
              >
                Profili Keşfet
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TerminalIntro;