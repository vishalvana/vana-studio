// One hidden WebGL2 context renders every project cover, then copies the frame into each card's 2D canvas.
// Browsers cap live WebGL contexts (~16), so a grid of 12 covers + the hero + the tunnel can't each own one.

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

// Domain-warped noise ("flow marble") tinted by three colours, with contour lines and grain.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uSeed; uniform float uHover; uniform vec2 uMouse;
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC;
out vec4 o;
float h(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), u.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), u.x), u.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 r = mat2(.8,-.6,.6,.8); for(int i=0;i<5;i++){ v += a*n(p); p = r*p*2.03; a *= .5; } return v; }
void main(){
  vec2 p = (gl_FragCoord.xy - .5*uRes) / uRes.y;
  p += (uMouse - .5) * .12 * uHover;
  float t = uTime * .05 + uSeed * 17.;
  vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p*1.8 + 3.5*q + vec2(1.7,9.2) + .4*t), fbm(p*1.8 + 3.5*q + vec2(8.3,2.8) - .3*t));
  float f = fbm(p*1.6 + 3.*r);
  vec3 col = mix(uA, uB, smoothstep(.25, .85, f));
  col = mix(col, uC, smoothstep(.55, 1.05, length(r) * f * 1.4));
  float lines = 1. - smoothstep(0., .035, abs(fract(f * 9. + uTime*.02) - .5) - .44);
  col += lines * .06 * (1. + uHover);
  col *= 1. - .35 * length(p * vec2(.7, 1.));
  col += (h(gl_FragCoord.xy + fract(uTime)) - .5) * .06;
  o = vec4(col, 1.);
}`;

type Target = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  seed: number;
  colors: [number[], number[], number[]];
  hover: number;
  hoverTarget: number;
  mouse: [number, number];
  visible: boolean;
};

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255);

let gl: WebGL2RenderingContext | null = null;
let glCanvas: HTMLCanvasElement;
let uniforms: Record<string, WebGLUniformLocation | null> = {};
const targets = new Set<Target>();
let raf = 0;
let last = 0;

function init() {
  if (gl) return gl;
  glCanvas = document.createElement("canvas");
  gl = glCanvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, src);
    gl!.compileShader(s);
    if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) console.error(gl!.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  for (const u of ["uRes", "uTime", "uSeed", "uHover", "uMouse", "uA", "uB", "uC"]) uniforms[u] = gl.getUniformLocation(prog, u);
  return gl;
}

function frame(now: number) {
  raf = requestAnimationFrame(frame);
  if (now - last < 1000 / 40) return; // ~40 fps is plenty for slow-moving art
  last = now;
  const g = gl!;
  for (const t of targets) {
    t.hover += (t.hoverTarget - t.hover) * 0.08;
    if (!t.visible) continue;
    const w = t.canvas.width, h = t.canvas.height;
    if (!w || !h) continue;
    if (glCanvas.width !== w || glCanvas.height !== h) {
      glCanvas.width = w;
      glCanvas.height = h;
    }
    g.viewport(0, 0, w, h);
    g.uniform2f(uniforms.uRes, w, h);
    g.uniform1f(uniforms.uTime, now / 1000 * (1 + t.hover * 1.5));
    g.uniform1f(uniforms.uSeed, t.seed);
    g.uniform1f(uniforms.uHover, t.hover);
    g.uniform2f(uniforms.uMouse, t.mouse[0], t.mouse[1]);
    g.uniform3fv(uniforms.uA, t.colors[0]);
    g.uniform3fv(uniforms.uB, t.colors[1]);
    g.uniform3fv(uniforms.uC, t.colors[2]);
    g.drawArrays(g.TRIANGLES, 0, 3);
    t.ctx.drawImage(glCanvas, 0, 0);
  }
}

/** Register a canvas to receive a cover. Returns controls + an unregister function. */
export function attachCover(canvas: HTMLCanvasElement, seed: number, palette: [string, string, string], scale = 0.6) {
  if (!init()) return null;
  const ctx = canvas.getContext("2d")!;
  const t: Target = {
    canvas,
    ctx,
    seed,
    colors: [hex(palette[0]), hex(palette[1]), hex(palette[2])],
    hover: 0,
    hoverTarget: 0,
    mouse: [0.5, 0.5],
    visible: false,
  };
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * scale));
    canvas.height = Math.max(1, Math.round(r.height * scale));
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => (t.visible = e.isIntersecting));
  io.observe(canvas);
  targets.add(t);
  if (!raf) raf = requestAnimationFrame(frame);
  return {
    setHover(on: boolean) {
      t.hoverTarget = on ? 1 : 0;
    },
    setMouse(x: number, y: number) {
      t.mouse = [x, 1 - y];
    },
    detach() {
      ro.disconnect();
      io.disconnect();
      targets.delete(t);
      if (!targets.size) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
  };
}
