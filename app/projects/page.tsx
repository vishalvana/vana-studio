import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { Words } from "@/components/Reveal";
import Tunnel from "@/components/Tunnel";
import { projects } from "@/content/site";

export const metadata: Metadata = { title: "Projects", description: "Every build: backends, AI agents, scrapers and mobile apps." };

export default function ProjectsPage() {
  return (
    <>
      <section className="page-head wrap">
        <Reveal as="h1" className="mega" fade={false}>
          <Words text="All builds" />
        </Reveal>
        <Reveal as="p" className="mono muted" >
          {projects.length} projects · backends · agents · scrapers · mobile
        </Reveal>
      </section>
      <section className="wrap">
        <div className="grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <Tunnel />
    </>
  );
}
