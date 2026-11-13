import Link from "next/link";
import Hero from "@/components/hero/Hero";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { Words } from "@/components/Reveal";
import Tunnel from "@/components/Tunnel";
import { about, capabilities, nowShipping, projects, site } from "@/content/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <section className="hero wrap">
        <Reveal as="h1" className="hero-line" fade={false}>
          <Words text={site.heroLine} />
        </Reveal>
        <Hero />
        <div className="plus-row">
          <span className="plus" />
          <span className="plus" />
          <span className="mono">Scroll to explore</span>
          <span className="plus" />
          <span className="plus" />
        </div>
      </section>

      <section className="statement wrap">
        <Reveal as="h2" className="mega" fade={false}>
          <span className="indent">
            <Words text="Built to" />
          </span>
          <br />
          <Words text="hold up." offset={2} />
        </Reveal>
        <div className="statement-body">
          <Reveal>
            <p className="lede">{about.lead}</p>
          </Reveal>
          <Reveal>
            <p className="lede muted">{about.paragraphs[0]}</p>
            <p style={{ marginTop: 28 }}>
              <Link className="text-link mono" href="/about">
                About me →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <Reveal as="section" className="now" dark>
        <div>
          <span className="mono">
            <span className="live-dot" />
            Now shipping
          </span>
          <h3>{nowShipping.name}</h3>
          <p className="lede" style={{ opacity: 0.75, maxWidth: "40ch" }}>
            {nowShipping.line}
          </p>
          <p style={{ marginTop: 24, display: "flex", gap: 22, flexWrap: "wrap" }}>
            <a className="text-link mono" href={nowShipping.url} target="_blank" rel="noreferrer">
              Open the live API ↗
            </a>
            <Link className="text-link mono" href="/projects/baas">
              Case study →
            </Link>
          </p>
        </div>
        <div className="now-stats">
          {nowShipping.stats.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span className="mono" style={{ opacity: 0.6 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="wrap">
        <div className="section-head">
          <Reveal as="h2" className="mega" fade={false}>
            <Words text="Selected builds" />
          </Reveal>
          <Reveal as="p" className="mono">
            Backends, agents and apps I designed, wrote and shipped myself.
          </Reveal>
        </div>
        <div className="grid">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} />
          ))}
        </div>
        <div className="see-all">
          <Link className="pill big dark" href="/projects">
            See all {projects.length} projects <span className="pill-dots"><i /></span>
          </Link>
        </div>
      </section>

      <section className="wrap">
        <div className="section-head">
          <Reveal as="h2" className="mega" fade={false}>
            <Words text="What I build" />
          </Reveal>
          <Reveal as="p" className="mono">
            Give me the problem; I&apos;ll pick the tools.
          </Reveal>
        </div>
        <div className="caps">
          {capabilities.map((c, i) => (
            <Reveal className="cap" key={c.title}>
              <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p className="lede muted">{c.line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Tunnel />
    </>
  );
}
