"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** The rounded dark card on the home page. The 3D scene only mounts (and runs) while it's on screen. */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting) setMounted(true); }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hero-card" ref={ref} data-dark>
      {mounted && <HeroScene active={visible} />}
      <div className="hero-tag mono">
        <b>●</b> <span className="hint-mouse">move your cursor through it</span>
        <span className="hint-touch">drag your finger through it</span>
      </div>
    </div>
  );
}
