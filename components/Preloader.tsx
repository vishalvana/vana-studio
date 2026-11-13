"use client";

import { useEffect, useRef, useState } from "react";

/** First-load screen: a bar and a big counter run to 100, then the panel wipes up. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const count = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let fontsReady = false;
    document.fonts?.ready.then(() => (fontsReady = true));
    const start = performance.now();
    const minMs = 1500;
    const tick = (now: number) => {
      // ease toward 90% on time alone, finish once fonts are in
      const t = Math.min(1, (now - start) / minMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const p = fontsReady && t === 1 ? 1 : eased * 0.9;
      if (count.current) count.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        setDone(true);
        setTimeout(() => setGone(true), 1100);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <div className={`preloader${done ? " is-done" : ""}`} aria-hidden>
      <div className="preloader-bar">
        <span ref={bar} style={{ transform: "scaleX(0)" }} />
      </div>
      <div className="preloader-count" ref={count}>
        000
      </div>
    </div>
  );
}
