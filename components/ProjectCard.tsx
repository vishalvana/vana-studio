"use client";

import Link from "next/link";
import { useRef } from "react";
import Cover from "./Cover";
import Reveal from "./Reveal";
import type { Project } from "@/content/site";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Reveal>
      <Link href={`/projects/${project.slug}`} className="card" ref={ref}>
        <div className="card-media" data-dark>
          <Cover seed={index + 1} palette={project.palette} hoverRef={ref} />
          <div className="card-mark">{project.name}</div>
          <div className="card-arrow" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M4 12 12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="card-meta">
          <h3>{project.name}</h3>
          <span className="mono muted">{project.tags.join(" · ")}</span>
        </div>
      </Link>
    </Reveal>
  );
}
