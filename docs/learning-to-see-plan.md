# Learning to See — implemented direction

The user accepted the personal, drawing-led direction and added retro-computing references. This first working version incorporates those additions.

## Identity and atmosphere

Mehrdad's name leads. A warm paper background, Instrument Serif headlines, understated sans-serif body text, monospaced annotations, graphite mechanical drawings and a muted orange accent create the old-computer feel. A decorative fringe of descending characters nods to the supplied terminal-font reference. Hobbies and cities remain personal details later on the page.

The user's Advercase references informed the tall vintage serif and restrained palette. The Trufter and retro Macintosh-inspired references informed the beige computer, curved screen, keyboard and illustrated layers. The Encoder reference informs small terminal details, with no persistent glitch effect on readable text. Hand-drawn references inform original object illustrations. The user-approved robot study supplies the main image style.

Reference photographs and watermarked stock previews are not used as production website images. No scenic photographic opening or Japan setting is included.

## Page sequence

1. **Meet Mehrdad.** Name, CS at SFU / Machine Learning Intern, short personal introduction, and graphite robotic arm. Work is immediately accessible.
2. **Learning to see and act.** The same illustration shifts into a stylized point representation with short robotics, reinforcement learning, VLM and VLA context. The point field is sampled from the drawing, not measured robot or sensor data.
3. **Selected work.** Huawei / Noah’s Ark Lab leads, then the DeLTA internship in Burnaby, the ICLR 2026 paper, Galactic Blitz, Opti_LLM, RageVision and NeuroDriver. Each entry has its own illustration; Huawei’s employer and lab names receive the strongest emphasis.
4. **Inside the computer.** A custom vintage computer separates into enclosure, display, tube, logic board and keyboard as the user scrolls. A manual slider and Blueprint view provide direct access to the illustration. The computer is an imagined design.
5. **Off the clock.** Original drawings and accessible notes for cars, compute, keyboards, music, Arsenal / football and nature. Setup and coursework links remain available.
6. **The human part.** Biography and small drawings for Tehran, Vancouver and Toronto. The text distinguishes Toronto from the internship in Markham, without inventing dates or a precise migration timeline. All three city names include Persian.
7. **Get in touch.** Email with a working copy action, GitHub, LinkedIn, Scholar, X, and Instagram. New favicon, touch icon and social sharing artwork match the design.

The mechanical exploded-view sequence moved to the computer after the retro additions. The robot retains the graphite-to-points perception transition, allowing each illustration to have a distinct purpose.

## Interaction and implementation

Native scrolling controls two brief sticky scenes. No scrolling library or runtime framework is required: small JavaScript modules, CSS, SVG and canvas handle the interactions. Vite supplies local development and static production builds. Motion is tied to changes in scroll or viewport state rather than an uninterrupted rendering loop.

Reduced-motion users get static compositions and manual computer controls. The footer motion preference persists locally when storage is available. Interests use keyboard-operable tabs; the slider supports standard keyboard input. Important content remains available without JavaScript. The mobile computer layout places controls below the illustration rather than over it.

The final robot master and optimized JPEG live in `assets/illustrations/`; exact generation prompts are recorded beside them. All SVG layers remain editable in `js/drawings.js`. Typography is served locally, and the open-source Instrument Serif license is included.

## References

- User-supplied files under `ref/` are the primary visual references for this revision.
- [Apple MacBook Pro](https://www.apple.com/macbook-pro/): product-page hierarchy and progressively revealed detail. Published page accessed during planning; live Apple animation inspection was unavailable.
- [Neural-operator paper](https://arxiv.org/abs/2602.15184): verified paper title, authorship and topic. The owner supplied the ICLR 2026 venue, second authorship, team context and research metrics in the refinement request.
- [Opti_LLM](https://github.com/mehrdadmmz/Opti_LLM): GPT-2 implementation and training optimizations.
- [RageVision](https://github.com/mehrdadmmz/RageVision): MobileNetV2 classification of rage-labeled streaming frames.
- [NeuroDriver](https://github.com/mehrdadmmz/NeuroDriver): neural-network drivers evolved through genetic algorithms in a 2D simulation.
- [Instrument Serif source](https://github.com/google/fonts/tree/main/ofl/instrumentserif): self-hosted font under the included SIL Open Font License.

The redesign is deployed from GitHub main through the existing Vercel integration. Responsive refinements measure both scenes and retain scroll animation on short screens. Robot image decoding completes before canvas sampling, including in Safari. Diagonal arrows use SVG to avoid iOS emoji substitution. Twelve viewport sizes plus phone rotation and touch controls are checked in Chromium and WebKit.
