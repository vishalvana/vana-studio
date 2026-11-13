import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head wrap" style={{ minHeight: "80vh" }}>
      <h1 className="mega">404</h1>
      <p className="lede muted" style={{ margin: "24px 0 40px" }}>
        Nothing was built here (yet).
      </p>
      <Link className="pill big dark" href="/">
        Back home <span className="pill-dots"><i /></span>
      </Link>
    </section>
  );
}
