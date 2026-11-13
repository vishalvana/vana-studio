"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
  /** fade/slide the whole block (default) or only animate the word masks inside it */
  fade?: boolean;
  dark?: boolean;
};

/** Adds `is-in` once the element scrolls into view; children animate off that class. */
export default function Reveal({ as = "div", className = "", children, fade = true, dark = false }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(as, { ref, className: `${fade ? "reveal " : ""}${className}`, ...(dark ? { "data-dark": "" } : {}) }, children);
}

/** Splits text into masked words that slide up one after another (inside a Reveal). */
export function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="words">
      {text.split(" ").map((w, i) => (
        <span className="word" key={i}>
          <span style={{ ["--i" as string]: i + offset }}>{w}</span>
          {" "}
        </span>
      ))}
    </span>
  );
}
