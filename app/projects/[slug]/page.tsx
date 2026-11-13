import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import Reveal, { Words } from "@/components/Reveal";
import { getProject, projects } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="page-head wrap">
        <p className="mono muted" style={{ marginBottom: 18 }}>
          <Link href="/projects" className="text-link">← All projects</Link>
        </p>
        <Reveal as="h1" className="mega" fade={false}>
          <Words text={project.name} />
        </Reveal>
      </section>

      <section className="wrap">
        <Reveal className="project-hero" dark>
          <Cover seed={index + 1} palette={project.palette} scale={0.5} />
        </Reveal>
        <dl className="facts">
          <div>
            <dt className="mono">What</dt>
            <dd>{project.kind}</dd>
          </div>
          <div>
            <dt className="mono">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="mono">Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt className="mono">Links</dt>
            <dd style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {project.links.length
                ? project.links.map((l) => (
                    <a key={l.url} className="text-link" href={l.url} target="_blank" rel="noreferrer">
                      {l.label} ↗
                    </a>
                  ))
                : <span className="muted">Private</span>}
            </dd>
          </div>
        </dl>
      </section>

      <section className="wrap block two-col">
        <Reveal>
          <p className="label mono">Overview</p>
        </Reveal>
        <div>
          <Reveal>
            <p className="lede" style={{ fontSize: "clamp(24px, 2.4vw, 38px)", letterSpacing: "-0.02em", lineHeight: 1.15, marginTop: 0 }}>
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap block two-col">
        <Reveal>
          <p className="label mono">What it does</p>
        </Reveal>
        <Reveal as="ol" className="list">
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </Reveal>
      </section>

      <section className="wrap block two-col">
        <Reveal>
          <p className="label mono">Built with</p>
        </Reveal>
        <Reveal className="chips">
          {project.stack.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </Reveal>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(80px, 12vh, 140px)" }}>
        <Link href={`/projects/${next.slug}`} className="next-project">
          <span className="mono muted">Next project</span>
          <h2 className="mega">{next.name} →</h2>
        </Link>
      </section>
    </>
  );
}
