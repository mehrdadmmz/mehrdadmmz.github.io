# The everyday desk

An original SVG illustration at the end of “Off the clock / still curious”, immediately before the existing setup and coursework links. It uses the site's thin outlines, muted colours, construction marks, serif headings and numbered annotations.

## References

The owner’s public [Desktop Setup](https://iron-saxophone-83a.notion.site/Desktop-Setup-2d04eb58e916802cb088f2eb9a9ee82c) page supplied the product names and reference photos. The owner separately specified an IKEA MITTZON in walnut veneer with a white base. The [IKEA MITTZON range](https://www.ikea.com/ca/en/cat/mittzon-office-desks-700542/) informed the desk silhouette. Photos were inspected as references; none are redistributed with the site.

Included equipment:

- IKEA MITTZON desk, walnut veneer / white base
- Dell UltraSharp U2724DE monitor
- NuPhy Air75 V3 keyboard, including its contrasting keys and orange knob
- NuPhy Orbit desk mat, Bright
- Logitech MX Master 3S mouse
- LEGO Ferrari SF90 XX Stradale, 77254
- LEGO Porsche 911 GT3 RS, 77239
- Amazon Echo, fourth generation
- Xiaomi Mi Monitor Light Bar and controller
- Apple MagSafe charger
- Closed 13.3-inch MacBook Air with a cable to the monitor

The Anker Thunderbolt 4 cable is represented in the scene and monitor description. The page also lists headphones, earbuds, a chair, laptop stand and keyboard folio; these were omitted to match the requested objects and keep the scene readable. The arrangement, proportions and screen wallpaper are interpretive artwork, not an exact floor plan or product rendering.

## Interaction

The native range control moves individual SVG groups apart and reveals numbered labels. It is manual, adds no sticky scrolling, and remains usable with reduced motion. Each equipment button toggles its corresponding highlight and a larger detail illustration; the SVG objects are also clickable. Buttons expose selection with `aria-pressed`, and the text details are a polite live region. Essential links and an equipment description remain available without JavaScript.

The drawing is authored in `js/desk.js`, with no additional runtime dependencies or image downloads. `scripts/inspect-desk.mjs` captures desktop and phone-width views using the local development server. Browser coverage in `tests/desk.spec.js` checks keyboard operation, item selection, reduced motion, overflow and automated accessibility at 320, 390, 768 and 1440 pixels in Chromium and WebKit.
