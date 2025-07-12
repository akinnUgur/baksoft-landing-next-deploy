"use client";

import { useRef, useEffect, useState } from "react";

const moods = ["normal", "happy", "angry", "surprised"] as const;
type Mood = typeof moods[number];

export default function EyeTracker() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState({ left: false, right: false });
  const [mood, setMood] = useState<Mood>("normal");
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = eyeRef.current?.getBoundingClientRect();
      if (!rect) return;
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      setMouse({
        x: Math.max(-12, Math.min(12, offsetX / 8)),
        y: Math.max(-8, Math.min(8, offsetY / 8)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Blinking and winking
    const blinkInterval = setInterval(() => {
      const roll = Math.random();
      if (roll < 0.4) {
        // Both eyes blink
        setBlink({ left: true, right: true });
        setTimeout(() => setBlink({ left: false, right: false }), 350);
      } else if (roll < 0.6) {
        // Left eye wink
        setBlink((prev) => ({ ...prev, left: true }));
        setTimeout(() => setBlink((prev) => ({ ...prev, left: false })), 350);
      } else if (roll < 0.8) {
        // Right eye wink
        setBlink((prev) => ({ ...prev, right: true }));
        setTimeout(() => setBlink((prev) => ({ ...prev, right: false })), 350);
      }
    }, 2500 + Math.random() * 1500);

    // Mood changes
    const moodInterval = setInterval(() => {
      const nextMood = moods[Math.floor(Math.random() * moods.length)];
      setMood(nextMood);
    }, 6000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(blinkInterval);
      clearInterval(moodInterval);
    };
  }, []);

  const moodStyles: Record<Mood, { brow: string; pupilColor: string; pupilScale: string; shake: string }> = {
    normal: { brow: "rotate-0", pupilColor: "bg-black", pupilScale: "scale(1)", shake: "" },
    happy: { brow: "-rotate-8", pupilColor: "bg-green-500", pupilScale: "scale(1.2)", shake: "" },
    angry: { brow: "rotate-[30deg]", pupilColor: "bg-red-500", pupilScale: "scale(0.8)", shake: "animate-shake" },
    surprised: { brow: "-rotate-[35deg]", pupilColor: "bg-blue-500", pupilScale: "scale(1.4)", shake: "" },
  };

  return (
    <div
      ref={eyeRef}
      className="relative w-48 h-24 flex items-center justify-around select-none hover:scale-[1.05] transition-transform duration-500"
    >
      {[0, 1].map((_, i) => (
        <div
          key={i}
          className={`relative w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-full border-2 border-gray-400 shadow-xl flex items-center justify-center overflow-hidden ${moodStyles[mood].shake}`}
        >
          {/* Eyebrow */}
          <div
            className={`absolute -top-4 w-16 h-3 rounded-full bg-gray-800 transform origin-center transition-all duration-500 ease-out z-20`}
            style={{ left: "50%", transform: `translateX(-50%) ${moodStyles[mood].brow}` }}
          />

          {/* Eyeball */}
          <div
            className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center transition-transform duration-100 ease-out z-10"
            style={{ transform: `scale(${1 + Math.abs(mouse.x) / 40})` }}
          >
            {/* Pupil */}
            <div
              className={`w-5 h-5 ${moodStyles[mood].pupilColor} rounded-full shadow-md relative transition-all duration-500 ease-out`}
              style={{ transform: `translate(${mouse.x}px, ${mouse.y}px) ${moodStyles[mood].pupilScale}` }}
            >
              {/* Sparkle */}
              <div className="absolute w-2 h-2 bg-white/90 rounded-full top-1 left-1 animate-twinkle" />
            </div>
          </div>

          {/* Upper Eyelid */}
          <div
            className={`absolute top-0 left-0 w-full h-full bg-slate-900 transition-transform duration-350 ease-in-out z-30 ${
              blink[i === 0 ? "left" : "right"] ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{ clipPath: "circle(50% at 50% 50%)" }}
          >
            <div className="absolute bottom-0 w-full h-3 bg-gray-600/90" />
          </div>

          {/* CSS for animations */}
          <style jsx>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.9; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.3); }
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-2px); }
              75% { transform: translateX(2px); }
            }
            .animate-twinkle {
              animation: twinkle 1.8s infinite;
            }
            .animate-shake {
              animation: shake 0.2s infinite;
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}