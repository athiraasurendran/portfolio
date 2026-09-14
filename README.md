# Athira A S — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS,
React Three Fiber, Framer Motion, and GSAP.

All content in `data/` is sourced directly from the resume, the provided
certificate files, and the
[Stock-Price-Prediction-LSTM](https://github.com/athiraasurendran/Stock-Price-Prediction-LSTM)
repository — nothing is invented. All 8 certificates are backed by real
files in `public/certificates/`.

---

## 1. Local setup

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# production build (run this before every deploy / commit to main)
npm run build

# serve the production build locally
npm run start

# lint
npm run lint
```

> **Note on this environment:** this project was authored in a sandbox with
> no network access, so `npm install` / `npm run build` could not be run or
> verified here. The code was written and manually reviewed carefully, but
> **please run `npm run build` yourself before deploying** and fix anything
> your local Node/TypeScript toolchain flags (there shouldn't be much — see
> the self-review notes below).

---

## 2. Assets you still need to add

All 8 certificates are wired up with real files. The only remaining
optional assets:

| Asset | Where it goes | Notes |
|---|---|---|
| Favicon / app icon | `app/icon.png` (Next.js auto-detects this) | Not added — no logo/icon was supplied |
| Open Graph / social preview image | `public/og-image.png`, then reference it in `app/layout.tsx`'s `openGraph.images` | Optional, improves link previews when shared |
| Optional: Stock Forecaster app screenshot | `public/images/projects/` | The case study currently works fully without one |

Full certificate-to-file mapping is documented in
`public/certificates/README.md`.

---


## 4. Deploying: GitHub → Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/athiraasurendran/<your-repo-name>.git
   git push -u origin main
   ```
2. **Import into Vercel**
   - Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
   - Select the repository you just pushed.
   - Framework preset: Vercel auto-detects **Next.js** — leave build command
     (`next build`) and output settings as default.
   - Click **Deploy**.
3. **After the first deploy**
   - Copy the `*.vercel.app` URL (or attach a custom domain under
     Project → Settings → Domains).
   - Update `siteUrl` in `data/site.ts` to match, then commit and push —
     Vercel redeploys automatically on every push to `main`.
4. Vercel deploys are automatic on every push from here on — no extra
   configuration needed for this project (no environment variables or
   server-side secrets are used).

---

## 5. Project structure

```text
app/                       Routes (App Router)
  layout.tsx                Root layout, fonts, metadata, JSON-LD
  page.tsx                  Home page — assembles all sections
  sitemap.ts / robots.ts    SEO
  work/ai-stock-forecaster/ Case-study route

components/
  sections/                 Page sections (Nav, Hero, About, Experience, ...)
  3d/                       React Three Fiber hero scene
  ui/                       Reusable primitives (Reveal, Tag, MagneticButton, ...)
  case-study/               GSAP-driven pipeline diagram

data/                       Single source of truth for all content
lib/                        Shared utilities (cn helper, nav section config)
public/
  certificates/             Certificate files go here (see README.md inside)
  resume/                   Available to download directly from the portfolio.
```

To add a new project, certification, or skill later, edit the relevant file
in `data/` — the UI components read from these files and don't need to
change.

---

## 6. Self-review notes (from the build process)

- Every experience, project, education, and skill claim was cross-checked
  against the uploaded resume and the live GitHub README for the Stock
  Forecaster project.
- No percentage grades are shown anywhere — both degrees display "First
  Class" per your instruction, not the raw resume percentages.
- Nav order was adjusted slightly from the original brief so it always
  matches the page's actual scroll order (About → Experience → Work →
  Education → Certifications → Contact) — this keeps the active-section
  indicator accurate.
- The 3D hero respects `prefers-reduced-motion`, downgrades node/pulse count
  on narrow screens or low `hardwareConcurrency`, detects WebGL and falls
  back to a static SVG diagram if unavailable, and is code-split via
  `next/dynamic` with `ssr: false` so it never blocks first paint.
- Because this project was built without network access, dependency
  versions in `package.json` are pinned to specific, known-compatible
  releases rather than verified by an actual `npm install` — run the build
  once locally to confirm before deploying.
