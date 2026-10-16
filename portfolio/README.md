# Sai Keerthan — portfolio

A responsive, dependency-free portfolio and a controllable 42-second elevator pitch.

## Preview

```sh
cd portfolio
python3 -m http.server 4173
```

Open http://localhost:4173. The pitch is at `/elevator-pitch/`.

## Deploy on Vercel

Import `saikeerthan-14/saikeerthan-14`. Set **Root Directory** to `portfolio`, **Framework Preset** to **Other**, leave Build Command unset, and use `.` as the output directory. No environment variables are required.

Alternatively, run `npx vercel --prod` from this directory after signing in.

## Editing

- `index.html`: portfolio and contact links.
- `elevator-pitch/index.html`: player and accessible transcript.
- `pitch.js`: seven scenes, each lasting six seconds.
- `style.css`: layout, responsive styles, local fonts, and reduced-motion support.

Project descriptions reflect the linked public source at the time of writing. PRs are described as submitted, without implying they were merged. No analytics, contact-form backend, external font requests, or API keys are used.
