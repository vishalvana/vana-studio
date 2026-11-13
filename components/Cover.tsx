"use client";

import { useEffect, useRef } from "react";
import { attachCover } from "@/lib/coverPool";

type Props = { seed: number; palette: [string, string, string]; scale?: number; hoverRef?: React.RefObject<HTMLElement | null> };

/** Animated generative cover art for a project (rendered by the shared WebGL pool). */
export default function Cover({ seed, palette, scale, hoverRef }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const cover = attachCover(canvas, seed, palette, scale);
    if (!cover) {
      canvas.style.background = `linear-gradient(135deg, ${palette[0]}, ${palette[1]} 60%, ${palette[2]})`;
      return;
    }
    const host = hoverRef?.current ?? canvas;
    const enter = () => cover.setHover(true);
    const leave = () => cover.setHover(false);
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      cover.setMouse((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointermove", move);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointermove", move);
      cover.detach();
    };
  }, [seed, palette, scale, hoverRef]);

  return <canvas ref={ref} aria-hidden />;
}
