"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: `mailto:${site.email}`, label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [onDark, setOnDark] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Flip the logo to light when it sits over a dark section (anything marked data-dark).
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const hit = document.elementsFromPoint(60, 44).some((el) => el.closest("[data-dark]"));
      setOnDark(hit);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`header${onDark ? " on-dark" : ""}`}>
        <Link href="/" className="logo" aria-label="Home">
          {site.short}
          <span className="logo-dot" />
        </Link>
        <div className="header-actions">
          <a className="pill dark hide-sm" href={`mailto:${site.email}`}>
            Let&apos;s talk <span className="pill-dots"><i /></span>
          </a>
          <button className="pill" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">
            Menu <span className="pill-dots"><i /><i /></span>
          </button>
        </div>
      </header>

      <div className={`menu-scrim${open ? " is-open" : ""}`} onClick={() => setOpen(false)} />
      <nav id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="menu-top">
          <span className="mono">Menu</span>
          <button className="menu-close mono" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Close ✕
          </button>
        </div>
        <div className="menu-links">
          {links.map((l) =>
            l.href.startsWith("mailto:") ? (
              <a key={l.label} href={l.href} tabIndex={open ? 0 : -1}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                tabIndex={open ? 0 : -1}
                className={pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href)) ? "is-active" : ""}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>
        <div className="menu-foot mono">
          {site.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              {s.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
