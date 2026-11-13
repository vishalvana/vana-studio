"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import Reveal, { Words } from "./Reveal";

// A polar-coordinate tunnel of rings and spokes. Scrolling through the section flies you down it.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uProg; uniform vec2 uMouse;
out vec4 o;
float h(vec2 p){ p = fract(p*vec2(443.8, 441.4)); p += dot(p, p.yx + 19.19); return fract(p.x*p.y); }
void main(){
  vec2 p = (gl_FragCoord.xy - .5*uRes) / uRes.y;
  p -= uMouse * .08;
  float r = length(p), a = atan(p.y, p.x);
  float z = .32 / max(r, 1e-3);
  float travel = uTime * .35 + uProg * 9.;
  float zz = z + travel;
  float tw = a / 6.2831853 + .03 * sin(zz * .5 + uTime * .2);
  vec2 g = vec2(tw * 32., zz * 1.5);                // tunnel wall grid: spokes x rings
  vec2 d = abs(fract(g) - .5);
  vec2 w = fwidth(g);
  float grid = max(smoothstep(.5 - 1.4 * w.x, .5, d.x), smoothstep(.5 - 1.4 * w.y, .5, d.y));
  float cellId = h(floor(g));
  float lit = step(.975 - uProg * .04, cellId) * (.55 + .45 * sin(uTime * 2. + cellId * 40.));
  float inner = smoothstep(.5, .3, max(d.x, d.y));    // inset so lit cells keep a dark border
  vec3 ink = vec3(.95, .94, .92);
  vec3 orange = vec3(1., .31, .12);
  float fog = smoothstep(.02, .6, r);
  vec3 col = vec3(.035);
  col += ink * grid * .28 * fog;
  col += orange * lit * inner * .75 * fog;
  col += orange * .55 * exp(-r * 6.) * (.35 + uProg);
  col += (h(gl_FragCoord.xy + uTime) - .5) * .04;
  o = vec4(col, 1.);
}`;

export default function Tunnel() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current!;
    const gl = c.getContext("webgl2", { antialias: false });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, `#version 300 es\nin vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uProg = u("uProg"), uMouse = u("uMouse");

    let visible = false;
    let raf = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let prog01 = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5) * 0.75;
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      gl.viewport(0, 0, c.width, c.height);
    };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = 0.5 - e.clientY / window.innerHeight;
    };
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const r = section.current!.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const target = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      prog01 += (target - prog01) * 0.08;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uTime, now / 1000);
      gl.uniform1f(uProg, prog01);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(section.current!);
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <section className="tunnel" ref={section} data-dark>
      <div className="tunnel-sticky">
        <canvas ref={canvas} aria-hidden />
        <Reveal className="tunnel-copy" fade={false}>
          <h2 className="mega">
            <Words text="Got an idea" />
            <br />
            <Words text="worth building?" offset={3} />
          </h2>
          <a className="pill big" href={`mailto:${site.email}`}>
            Let&apos;s talk <span className="pill-dots"><i /></span>
          </a>
        </Reveal>
        <div className="tunnel-hint mono">
          <span>Keep scrolling</span>
          <span>{site.email}</span>
        </div>
      </div>
    </section>
  );
}
