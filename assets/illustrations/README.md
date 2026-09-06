# Illustration assets

The robot was generated with the built-in imagegen tool. The production file is [robot-pencil.jpg](robot-pencil.jpg); [robot-pencil-white.png](robot-pencil-white.png) is the full-resolution master. The JPEG is a resized and encoded version of that master, approximately 270 KB. Its white background is composited onto the website paper using CSS.

All computer layers, interest drawings, city drawings, charts, and the favicon are original code-native SVG artwork in `js/drawings.js`, `js/main.js`, and `favicon.svg`. Reference images in `ref/` are mood references and are not shipped as website images. The computer is an imagined retro design, not a model-specific technical diagram. The wave illustration and robot point representation are artistic visualizations, not research results.

## Generation prompt

Create a production website illustration asset, NOT a webpage or mockup. Use case illustration-story. One extraordinarily fine graphite pencil technical drawing of a six-axis industrial robotic arm in a three-quarter view, base at bottom right, elbow reaching upper right, forearm extending diagonally toward lower left, open two-finger gripper hovering lower left. Reference the mechanical arm drawing in the supplied image ONLY for its graphite crosshatching and technical draftsmanship style. Isolate the complete arm on genuinely transparent background. No text, no typography, no UI, no paper background, no ground grid. Entire mechanical arm visible with 8% clean margin all sides. Fine confident charcoal contours, delicate crosshatched shading, very subtle warm grey highlights, visible believable bolts, joints, vent slots, cable conduits; crisp and intricate like a vintage engineer's notebook. A few faint construction arcs closely around the elbow, but no labels. Compact pedestal base with elliptical top and small fixing bolts. A single minuscule muted burnt-orange accent at the wrist ring, otherwise monochromatic. Refined, convincing hand drawing, not comic art, not glossy 3D, not photo. Square 1536x1536 composition, fully transparent background, black pencil linework remains dark opaque. This asset will be placed on warm ivory paper with real separately coded typography. Do not include any words from the reference.

## Final background edit prompt

Edit this exact robot illustration. Change ONLY the background: replace the entire grey-and-white checkerboard with a perfectly uniform pure solid WHITE #ffffff background, including spaces inside and around the gripper, joints and cables. Remove ALL checkerboard squares. NO transparency, NO checkerboard, NO grey backdrop, NO paper texture, NO grid. Keep exactly the same graphite robot drawing, its linework, mechanical detail, composition, size and tiny orange wrist accent. The robot must remain a pencil drawing on pure white. Preserve all dark pencil marks. Output the complete robot fully visible with the same framing.

The initial generation produced a checkerboard instead of alpha transparency. The final edit explicitly requested white. Only the corrected artwork is used by the website.

## Fonts

Instrument Serif is self-hosted from the Google Fonts repository under the SIL Open Font License: `assets/fonts/InstrumentSerif-LICENSE.txt`. NB International and NB International Mono were already present in the supplied repository and remain local.

## Identity exports

`scripts/create-identity.mjs` renders the authored vector favicon at 32 px and 180 px and generates `assets/social-preview.png` from the site's real typography and robot illustration. Run it while the local development server is available. All final site assets live inside this repository.
