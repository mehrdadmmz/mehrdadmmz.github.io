# Mehrdad — a personal work in progress

A personal website about computer science, robotics, and curiosity. Vintage typography, a graphite robot, an illustrated retro computer with explorable internal layers, and a small collection of interests and places.

## Run locally

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Production output is generated with:

```sh
npm run build
npm run preview
```

Publish the contents of `dist/` to a static host. The build uses relative asset URLs so it can also run from a subdirectory. The site has no backend, API keys, external font requests, or runtime framework dependency.

Before publishing, set `og:image` in `index.html` to the absolute deployed URL of `assets/social-preview.png`. The deployment hostname has not been supplied, so no canonical domain is invented.

## Where to edit

- `index.html`: biography, experience, research, projects, navigation and links.
- `js/main.js`: interest notes, scroll behavior, point drawing, motion preferences and controls.
- `js/drawings.js`: original SVG computer layers, objects and place illustrations.
- `css/style.css`: layout, palette, typography, mobile adaptations and reduced-motion styles.
- `assets/illustrations/README.md`: asset provenance and the exact image-generation prompts.
- `docs/learning-to-see-plan.md`: final design direction and implementation decisions.

There are two main scroll sequences. The robot shifts from graphite to a stylized point representation. The retro computer opens into separate layers; its slider also works with keyboard input, and Blueprint view changes the illustration treatment. On short screens, the scenes use normal document flow and the computer stays manually explorable, avoiding clipped controls. Personal interests use accessible tabs. Essential biography, work and links remain available without JavaScript.

## Verification

```sh
npm test
```

The browser tests use an installed Google Chrome. Set `BROWSER_PATH` to a compatible Chromium executable if needed. Tests cover the scroll states, computer controls, interest tabs, 12 viewport sizes from 320px phones to 2560px desktops, touch controls after phone rotation, reduced-motion behavior, email copying, JavaScript-free content and automated WCAG accessibility checks. Automated checks complement visual review; they are not a complete accessibility certification.

The local inspection and identity export scripts in `scripts/` are development helpers. `create-identity.mjs` renders the favicon, touch icon and social image from the site's own artwork while the development server runs.

## Content notes

Huawei / Noah’s Ark Lab leads the work section, followed by the DeLTA internship, ICLR paper, Galactic Blitz, Opti_LLM, RageVision and NeuroDriver. Internship details and paper contribution metrics come from the owner; project descriptions were checked against their GitHub READMEs. DeLTA is listed in Burnaby, BC. The illustrations are interpretive artwork, not measurements or research results. Instagram links to `@mhrddmmz`, and X links to `@MMZisHere`. The football note mentions Arsenal.
