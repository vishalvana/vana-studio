import type { Metadata } from "next";
import Reveal, { Words } from "@/components/Reveal";
import Tunnel from "@/components/Tunnel";
import { about, capabilities, experience, research } from "@/content/site";

export const metadata: Metadata = { title: "About", description: about.lead };

export default function AboutPage() {
  return (
    <>
      <section className="page-head wrap">
        <Reveal as="h1" className="mega" fade={false}>
          <Words text="Plumbing" />
          <br />
          <span className="indent">
            <Words text="first." offset={1} />
          </span>
        </Reveal>
      </section>

      <section className="wrap two-col">
        <Reveal>
          <p className="label mono">About</p>
        </Reveal>
        <div>
          <Reveal>
            <p className="lede" style={{ fontSize: "clamp(24px, 2.4vw, 38px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              {about.lead}
            </p>
          </Reveal>
          {about.paragraphs.map((p) => (
            <Reveal key={p}>
              <p className="lede muted" style={{ marginTop: 24 }}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap block two-col">
        <Reveal>
          <p className="label mono">What I build</p>
        </Reveal>
        <div className="rows">
          {capabilities.map((c) => (
            <Reveal className="row" key={c.title}>
              <h3>{c.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{c.line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap block two-col">
        <Reveal>
          <p className="label mono">Experience</p>
        </Reveal>
        <div className="rows">
          {experience.map((e) => (
            <Reveal className="row" key={e.what}>
              <span className="mono muted">{e.when}</span>
              <div>
                <h3>{e.what}</h3>
                {e.note && <p className="muted" style={{ margin: "6px 0 0" }}>{e.note}</p>}
              </div>
              <span>{e.where}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap block two-col">
        <Reveal>
          <p className="label mono">Research</p>
        </Reveal>
        <div className="rows">
          {research.map((r) => (
            <Reveal className="row" key={r.title}>
              <span className="mono muted">{r.venue}</span>
              <h3 style={{ fontSize: 19 }}>{r.title}</h3>
              <span className="mono muted">{r.when}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <Tunnel />
    </>
  );
}
