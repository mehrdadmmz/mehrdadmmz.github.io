// Original, layered SVG illustrations. Parts remain editable and individually animated.
const hatch = `<pattern id="pencil-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><path d="M0 0V7" stroke="currentColor" stroke-width=".6" opacity=".24"/></pattern>`;
const screw = (x, y, r = 4) =>
  `<g><circle cx="${x}" cy="${y}" r="${r}"/><path d="M${x - r * 0.5} ${y}h${r}"/></g>`;
const vents = (x, y, n, w = 45) =>
  Array.from(
    { length: n },
    (_, i) => `<path d="M${x} ${y + i * 7}h${w}"/>`,
  ).join("");
const chip = (x, y, w = 35, h = 26) =>
  `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/><rect x="${x + 4}" y="${y + 4}" width="${w - 8}" height="${h - 8}" fill="url(#pencil-hatch)"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${x + 4 + (i * (w - 8)) / 5} ${y - 5}v5m0 ${h}v5"/>`).join("")}</g>`;

export const computerDrawing = `<svg viewBox="0 0 960 740" role="img" aria-labelledby="computer-title computer-desc" class="computer-svg">
<title id="computer-title">An illustrated retro computer, from its shell to its circuits</title><desc id="computer-desc">A beige compact computer with a curved display, mechanical keyboard and layered internal components. Use the exploration controls to open the case.</desc>
<defs>${hatch}<pattern id="screen-lines" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0h4" stroke="#bbc3a4" stroke-opacity=".12"/></pattern><linearGradient id="case-shade" x2="1" y2="1"><stop stop-color="#e5ddc8"/><stop offset="1" stop-color="#c3baa4"/></linearGradient><linearGradient id="crt-shade"><stop stop-color="#75806b"/><stop offset="1" stop-color="#3c483d"/></linearGradient><linearGradient id="glass-shade" x2="0" y2="1"><stop stop-color="#313d32"/><stop offset="1" stop-color="#17291f"/></linearGradient></defs>
<g class="computer-guides" fill="none" stroke="currentColor" stroke-width=".8" opacity=".2"><path d="M110 550H860M200 100V630M710 65V580" stroke-dasharray="5 8"/><ellipse cx="475" cy="590" rx="280" ry="70"/><path d="M120 155H835M180 450H880" stroke-dasharray="2 7"/></g>
<g class="computer-shadow"><ellipse cx="475" cy="624" rx="249" ry="27" fill="currentColor" opacity=".06"/></g>
<g class="pc-layer pc-shell" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
<path d="M255 162 375 92 692 92 571 162Z" fill="#e8e1d1"/><path d="m571 162 121-70v367l-121 75Z" fill="url(#case-shade)"/><path d="m587 185 85-50v285l-85 50Z" fill="url(#pencil-hatch)" stroke-opacity=".2"/><path d="M692 108 581 173M581 173v343" fill="none" opacity=".5"/><g fill="none" opacity=".65">${Array.from({ length: 13 }, (_, i) => `<path d="m613 ${210 + i * 9} 39-23"/>`).join("")}${screw(676, 129)}${screw(676, 429)}<path d="m625 406 34-20v19l-34 20Z"/></g>
</g>
<g class="pc-layer pc-board" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round">
<path d="m295 486 110-59 244 34-104 66Z" fill="#74846a"/><path d="m295 486 250 41v9l-250-39Z" fill="#546b52"/><path d="m545 527 104-66v9l-104 66Z" fill="#445a44"/><g transform="matrix(1,.16,-.8,.45,382,440)" fill="#c2bc9c">${chip(0, 0, 64, 60)}${chip(95, 4, 38, 30)}${chip(150, 4, 38, 30)}${chip(94, 55, 28, 38)}${chip(140, 55, 28, 38)}<g fill="none" stroke="#d1c9a3"><path d="M70 14h14v12h11M70 40h14v33h10M16 66v25h57v-4M185 60h30v45H27M131 25h15M140 75h-11"/></g><g fill="#d7cbae">${Array.from({ length: 9 }, (_, i) => `<rect x="${30 + i * 18}" y="117" width="11" height="17"/>`).join("")}</g></g>
<path d="M425 461c-50-45 100-62 79-134" fill="none" stroke="#b9824d" stroke-width="4"/><path d="M433 464c-48-47 95-66 80-130" fill="none" stroke="#5a6552" stroke-width="3"/>
</g>
<g class="pc-layer pc-tube" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round">
<path d="M293 188q-19 97 0 176l41 31 144-36 98-97-90-57Z" fill="#b3b5a6"/><path d="m334 395 144-36 98-97-90-57-96 11Z" fill="url(#pencil-hatch)"/><path d="m334 216 17 23 169 27 56-4M352 239q-16 65-1 117l-17 39" fill="none"/><path d="m478 255 98-14 22 17-2 25-73 5Z" fill="#706e60"/><path d="m581 246 44-4v37l-35 5Z" fill="#bc9b6d"/><g fill="none">${Array.from({ length: 7 }, (_, i) => `<path d="m${577 + i * 6} 246v36"/>`).join("")}<path d="M619 250q70-70 26-90t-49 32" stroke-width="3"/></g><rect x="288" y="183" width="183" height="214" rx="27" fill="url(#crt-shade)"/>
</g>
<g class="pc-layer pc-front" stroke="currentColor" stroke-width="1.45" stroke-linejoin="round">
<path d="M255 163q-8 0-8 9v345q0 13 12 13h302q13 0 13-13V174q0-12-13-12Z" fill="url(#case-shade)"/><path d="M265 176h291v326H265Z" fill="none" stroke-opacity=".25"/><path d="M279 191q-6 0-6 7v211q0 12 12 12h250q11 0 11-11V201q0-10-10-10Z" fill="#b8b09d"/><path d="M288 207q-6 80 0 187 114 10 242 0 9-88 0-186-111-11-242-1Z" fill="#3e4338"/><path d="M301 218q-8 70-1 164 102 9 216 0 8-77 0-164-99-10-215 0Z" fill="url(#glass-shade)"/><path d="M305 225q83-9 201-1" stroke="#cbd4ac" stroke-opacity=".15" fill="none" stroke-width="3"/><path d="M304 220h207v163H304Z" fill="url(#screen-lines)" stroke="none"/>
<g class="crt-content" fill="#d3d8ae" stroke="none" font-family="monospace" text-anchor="middle"><text x="409" y="300" font-size="23">hello, world.</text><text x="409" y="325" font-size="9" letter-spacing="1.4">A LITTLE CURIOSITY GOES A LONG WAY.</text><rect x="400" y="344" width="12" height="2" class="crt-cursor"/></g>
<g fill="none" stroke-width="1.2" opacity=".6">${vents(280, 455, 6, 126)}<path d="M447 460h84v14h-84zM452 467h68"/><path d="M450 487h8v7h-8z" fill="#ba5638"/></g><path d="M275 435H548" opacity=".3"/>${screw(264, 511, 3)}${screw(557, 511, 3)}
</g>
<g class="pc-layer pc-keyboard" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round">
<path d="m219 553 309-2 108 54-326 5Z" fill="#e4ddca"/><path d="m219 553 91 57v19l-91-58Z" fill="#cbc1a9"/><path d="m310 610 326-5v17l-326 7Z" fill="#bcb39f"/><g transform="matrix(1,0,.8,.46,240,558)">${Array.from({ length: 4 }, (_, r) => Array.from({ length: 13 }, (_, c) => `<rect x="${c * 20}" y="${r * 21}" width="16" height="16" rx="2" fill="${r === 0 && c === 0 ? "#b36247" : "#f0eadc"}"/><path d="M${c * 20 + 5} ${r * 21 + 5}h5" opacity=".45"/>`).join("")).join("")}<rect x="48" y="85" width="160" height="16" rx="2" fill="#ebe3d2"/></g>
<path d="M564 572c99-9 123-20 129 6" fill="none"/><path d="M690 578q21-17 43-2l15 28q-12 20-39 13Z" fill="#dad1bd"/><path d="m700 583 30 3M718 578l5 13" fill="none"/>
</g>
<g class="internal-labels" fill="currentColor" font-family="monospace" font-size="11" letter-spacing="1"><path d="M326 244H146l-22-20M600 213h154l28-27M515 548l26 93h168" fill="none" stroke="currentColor" stroke-width=".8"/><text x="94" y="212">01 / DISPLAY</text><text x="744" y="171">02 / ENCLOSURE</text><text x="614" y="660">03 / LOGIC BOARD</text></g>
</svg>`;

export const smallDrawings = {
  car: `<svg viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M28 118 36 94l42-10 41-36q61-17 102 7l40 35 23 9 6 26-27 7H52l-25-7Z"/><path d="m87 82 37-29q22-7 42-5l-5 39Zm86-33q26 0 44 10l30 29-74-1ZM160 91l-1 33M249 94l-4 28M42 101h30l-3 9H36M267 99l14 7M121 97h15"/><circle cx="83" cy="126" r="22" fill="var(--paper)"/><circle cx="83" cy="126" r="13"/><circle cx="238" cy="126" r="22" fill="var(--paper)"/><circle cx="238" cy="126" r="13"/><path d="m73 117 20 18m-20 0 20-18m135 0 20 18m-20 0 20-18M36 155h252M27 161h68M240 162h46" opacity=".5"/></svg>`,
  gpu: `<svg viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><path d="m42 52 218-18 28 26v75L68 155l-26-27Z"/><path d="m42 52 26 25 220-17M68 77v78M44 127l23 22M87 139l88-7v17l-88 8Z"/><circle cx="126" cy="108" r="27"/><circle cx="223" cy="99" r="27"/><circle cx="126" cy="108" r="8"/><circle cx="223" cy="99" r="8"/>${[126, 223].map((x, i) => Array.from({ length: 7 }, (_, n) => `<path d="M${x} ${i ? 76 : 85}q17 4 4 15" transform="rotate(${(n * 360) / 7} ${x} ${i ? 99 : 108})"/>`).join("")).join("")}<path d="m74 64 158-14M48 74l11 10v44M84 151l6 5m8-6 6 5m8-6 6 5m8-6 6 5m8-6 6 5m8-6 6 5M274 83v32"/></svg>`,
  keyboard: `<svg viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="m31 66 219-22 43 79-220 25Z"/><path d="M31 66v19l42 78 220-26v-14M73 148v15"/><g transform="matrix(1,-.1,.5,1,48,74)">${Array.from({ length: 4 }, (_, r) => Array.from({ length: 11 }, (_, c) => `<rect x="${c * 18}" y="${r * 14}" width="14" height="10" rx="1"/>`).join("")).join("")}<rect x="40" y="57" width="108" height="10" rx="1"/></g><path d="M160 52c-6-15 15-23 5-33"/><path d="M108 37v-9m-6 5h12" opacity=".4"/></svg>`,
  music: `<svg viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true"><path d="m46 52 203-15 33 99-203 15Z"/><path d="M46 52v14l33 99 203-15v-14M79 151v14"/><ellipse cx="152" cy="95" rx="64" ry="43" transform="rotate(8 152 95)"/><ellipse cx="152" cy="95" rx="54" ry="34" transform="rotate(8 152 95)"/><ellipse cx="152" cy="95" rx="43" ry="27" transform="rotate(8 152 95)"/><ellipse cx="152" cy="95" rx="18" ry="12"/><ellipse cx="152" cy="95" rx="3" ry="2"/><path d="m232 58-12 44-39 7m53-49-10 45-40 7"/><circle cx="233" cy="56" r="5"/><path d="m176 106 10 9-8 5-10-9ZM250 117l12-1M251 123l12-1"/><path d="M68 26v-9q12-7 22-2v13m-22-3q-11-4-13 4 6 7 13 1m22-5q-11-4-13 4 6 7 13 1"/></svg>`,
  football: `<svg viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true"><circle cx="160" cy="86" r="60"/><path d="m145 67 27-4 14 24-18 23-28-11Z" fill="currentColor" opacity=".85"/><path d="m145 67-17-21 20-18m24 35 15-23-6-10m5 57 29-4 5-9m-52 36 10 29-13 7m-25-47-28 6-6 7M128 46l-14 4-8 20 6 35m75-65 18 6 10 37m-37 56 25-17 12-39M112 105l7 23 22 15 24 3"/><path d="M86 153h152m-162 6h47m81 0h47" opacity=".4"/></svg>`,
  nature: `<svg viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m27 133 85-93 62 70 40-51 82 77M82 73l18 5 12-18 10 18 15 4M192 88l17 5 6-13 17 12M27 145h270m-247 9h124m48 0h66"/><circle cx="234" cy="37" r="13"/><path d="m46 128 16-30 16 30H46m16-37v52m186-12 14-24 14 24h-28m14-30v42"/><path d="M114 171q87-15 49-25t17-24"/></svg>`,
};

export const cityDrawings = {
  tehran: `<svg viewBox="0 0 300 170" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true"><path d="M27 145h247M103 144l25-110h43l29 110M112 144q18-68 38-76 24 12 40 76M128 34l8 43m35-43-9 45M150 35v34M111 114l-14 31m90-31 16 31M124 64h50m-54 18h21m19 0h20M115 100h12m50 0h11"/><path d="m32 128 27-26 20 12 27-26m92 4 22-29 25 25 33 20" opacity=".35"/><path d="M91 149h117M83 154h135"/></svg>`,
  vancouver: `<svg viewBox="0 0 300 170" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true"><path d="m20 94 49-43 28 19 48-42 34 36 20-12 66 49M119 52l19 3 9-13 14 13m-98 3 9 8 10-3M25 127h251M41 123V94h11v29m8 0V84h15v39m5 0V76h12v47m7 0V92h13v31m5 0V82h12v41m7 0V96h16v27m17 0V78h5v45m-13-36h21m-24 5h27m-16-14V66m32 57V87h14v36m10 0V79h13v44m6 0V99h14v24"/><path d="M31 137h53m19 0h88m20 0h51M56 146h105m16 0h51M101 155h77" opacity=".6"/></svg>`,
  toronto: `<svg viewBox="0 0 300 170" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true"><path d="M24 140h252M134 139l10-73h9l10 73M148 66V22m-6 24h12m-18 8h25l-4 9h-17ZM148 22V9M30 138V104h17v34m7 0V88h21v50m7 0V99h16v39m8 0V73h18v65m52 0V95h17v43m7 0V79h19v59m8 0V102h22v36m5 0V90h15v48M65 90V79m145 0V65"/><path d="M35 149h70m17 0h126m-190 8h73m19 0h58" opacity=".5"/></svg>`,
};

// Small visual summaries of the actual projects; schematic artwork, not measured results.
export const projectDrawings = {
  delta: `<svg viewBox="0 0 260 180" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
    <g opacity=".35"><path d="m36 86 125-16 58 58-126 18Z"/><path d="m42 103 126-16m-108 34 126-17" stroke-dasharray="3 4"/></g>
    <g opacity=".65"><path d="m36 61 125-16 58 58-126 18Z"/><path d="m49 74 14 11 16-9 17 13 17-21 19 16 14-21 17 10 16-7"/></g>
    <path d="m36 36 125-16 58 58-126 18Z"/><path d="m48 45 127-16m-114 28 127-17m-114 31 125-19M62 33l58 59m-32-63 57 59m-30-62 56 59m-30-62 56 58" opacity=".25"/>
    <path d="m54 50 18 3 16-14 20 13 12-26 20 16 16-13 23 13" stroke-width="1.6"/>
    <path d="M231 64q23 44-9 75m-3-12 3 12 12-4" stroke="var(--accent)"/>
    <g fill="currentColor" stroke="none" font-family="monospace" font-size="10" letter-spacing="1"><text x="49" y="169">RUN. REPEAT. REPRODUCE.</text></g>
  </svg>`,
  opti: `<svg viewBox="0 0 260 180" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
    <g><rect x="16" y="40" width="27" height="24" rx="3"/><rect x="16" y="77" width="27" height="24" rx="3"/><rect x="16" y="114" width="27" height="24" rx="3"/></g>
    <path d="M44 52h20v37h25M44 89h45M44 126h20V89"/>
    <g class="diagram-detail"><rect x="111" y="34" width="69" height="102" rx="3" opacity=".25"/><rect x="100" y="43" width="69" height="102" rx="3" fill="var(--paper)"/><rect x="89" y="52" width="69" height="102" rx="3" fill="var(--paper)"/><path d="M100 72h47m-47 14h47m-47 14h47m-47 14h47m-47 14h47" opacity=".45"/></g>
    <path d="M181 89h32m-6-5 6 5-6 5" stroke="var(--accent)"/><rect x="215" y="70" width="28" height="38" rx="3"/>
    <g fill="currentColor" stroke="none" font-family="monospace" font-size="10"><text x="23" y="56">t₀</text><text x="23" y="93">t₁</text><text x="23" y="130">t₂</text><text x="94" y="24">GPT-2 × 12</text><text x="226" y="93">?</text></g>
  </svg>`,
  rage: `<svg viewBox="0 0 260 180" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" aria-hidden="true">
    <rect x="28" y="25" width="178" height="119" rx="7"/><path d="M28 45h178m-152-12h2m8 0h2m8 0h2M91 145v13m56-13v13m-70 0h83"/>
    <path d="M71 66v-9h12m62 0h12v9M71 112v10h12m62 0h12v-10" stroke="var(--accent)"/>
    <ellipse cx="114" cy="87" rx="28" ry="31"/><path d="m97 77 10 4m16 0 10-4M98 89h7m18 0h7m-18 0-3 10h8m-17 8q12-8 24 0"/>
    <path d="M181 89h39m-5-5 5 5-5 5"/><rect x="224" y="71" width="22" height="36" rx="3"/><path d="M230 80h10m-10 9h10m-10 9h10"/>
    <text x="42" y="177" fill="currentColor" stroke="none" font-family="monospace" font-size="10" letter-spacing=".7">FRAME → FEATURES → CLASS</text>
  </svg>`,
  neuro: `<svg viewBox="0 0 260 180" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round" aria-hidden="true">
    <path d="M61 27C13 30 18 80 47 91s10 53 52 57 67-15 57-43-35-12-30-42-23-39-65-36Z"/>
    <path d="M65 45C37 46 37 70 58 77s13 49 44 51 44-8 34-23-35-15-29-44-22-18-42-16Z"/>
    <path d="M63 36C25 37 29 77 53 84s12 51 47 54 53-14 45-33-33-10-29-43-30-30-53-26Z" stroke-dasharray="4 5" opacity=".4"/>
    <g transform="translate(66 38) rotate(-9)"><rect x="-10" y="-5" width="20" height="10" rx="3" fill="var(--paper)"/><path d="M-3-5v10m8-10v10m4-5 32-19M9 0h34M9 0l32 19" stroke="var(--accent)"/></g>
    <g opacity=".5"><path d="M185 65 216 47m-31 18 31 24m-31 15 31-57m-31 57 31-15m0-42 28 25m-28 17 28-17"/></g>
    <g fill="var(--paper)"><circle cx="185" cy="65" r="5"/><circle cx="185" cy="104" r="5"/><circle cx="216" cy="47" r="5"/><circle cx="216" cy="89" r="5"/><circle cx="244" cy="72" r="5"/></g>
    <text x="31" y="176" fill="currentColor" stroke="none" font-family="monospace" font-size="10" letter-spacing=".8">SENSE. STEER. EVOLVE.</text>
  </svg>`,
};
