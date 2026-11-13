# vana-studio

My personal site: an immersive, WebGL-heavy portfolio in the style of award-winning 3D studio sites, built from
scratch with Next.js, three.js and Rapier physics.

- **Hero:** a physics clump of glossy pieces (React Three Fiber + Rapier). Move your cursor through it to push them around.
- **Project covers:** every project gets generated, animated cover art from a domain-warped noise shader. One shared
  WebGL2 context renders all covers and copies frames into each card, so a grid of 12 never hits the browser's
  WebGL context limit.
- **Tunnel:** a scroll-driven polar tunnel shader that ends every page with a call to action.
- Lenis smooth scrolling, masked word reveals, preloader, pill header with a slide-out menu, project case-study pages.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static build of every page
```

## Make it yours

All content lives in [`content/site.ts`](content/site.ts): name, links, about text, capabilities, experience and
projects. Each project has a 3-colour `palette` that drives its generated cover. Add or remove projects there and
the home grid, `/projects`, and the `/projects/[slug]` pages all follow.

| File | What |
|---|---|
| `components/hero/HeroScene.tsx` | The physics clump: shapes, colours, count, pull strength, lighting |
| `lib/coverPool.ts` | The cover-art shader and the shared WebGL renderer |
| `components/Tunnel.tsx` | The tunnel shader + closing call to action |
| `app/globals.css` | Design tokens (`--bg`, `--accent`, `--gutter`, ...) and all styles |

## Stack

Next.js 16 (App Router) · React 19 · three.js · @react-three/fiber · @react-three/drei · @react-three/rapier · Lenis ·
Inter Tight + Geist Mono

## License

Code: MIT. Content in `content/site.ts` is about me; swap it for yours.
