// Original SVG studies drawn from the owner's public Notion equipment photos.
// Product silhouettes and colours are references; desk arrangement is illustrative.
export const deskItems = [
  {
    id: "monitor",
    label: "Monitor",
    name: "Dell UltraSharp U2724DE",
    note: "The 27-inch display at the centre of my desk. Connected to the MacBook with an Anker Thunderbolt 4 cable.",
  },
  {
    id: "keyboard",
    label: "Keyboard",
    name: "NuPhy Air75 V3",
    note: "Low-profile keys, a silver frame, and a little colour: mint Escape, yellow Delete, and that orange control knob.",
  },
  {
    id: "mouse",
    label: "Mouse",
    name: "Logitech MX Master 3S",
    note: "A sculpted thumb rest, two metal scroll wheels, and a pale finish. Always within reach.",
  },
  {
    id: "mat",
    label: "Desk mat",
    name: "NuPhy Orbit · Bright",
    note: "A little cartography under the keyboard. The pale Orbit mat brings its earth contours and orange annotations to the desk.",
  },
  {
    id: "ferrari",
    label: "Ferrari",
    name: "LEGO Ferrari SF90 XX Stradale",
    note: "A small red distraction. The low nose, brick-built body and tall rear wing of the SF90 XX.",
  },
  {
    id: "porsche",
    label: "Porsche",
    name: "LEGO Porsche 911 GT3 RS",
    note: "The yellow one. Round headlights, a familiar 911 silhouette, and a rear wing that takes itself very seriously.",
  },
  {
    id: "echo",
    label: "Alexa",
    name: "Amazon Echo",
    note: "The blue fabric sphere, with Alexa and a quiet ring of light around its base.",
  },
  {
    id: "light",
    label: "Light bar",
    name: "Xiaomi Mi Monitor Light Bar",
    note: "A slim light above the screen, with its round wireless controller on the desk.",
  },
  {
    id: "magsafe",
    label: "MagSafe",
    name: "Apple MagSafe Charger",
    note: "The small silver charging puck and its white cable. A simple place to put the phone down.",
  },
  {
    id: "mac",
    label: "MacBook",
    name: "MacBook Air · 13.3-inch",
    note: "Lid closed, plugged into the monitor. The little machine behind the bigger screen.",
  },
  {
    id: "desk",
    label: "The desk",
    name: "IKEA MITTZON",
    note: "Walnut veneer, a white base, and a clean surface for everything else. The desk that brings it all together.",
  },
];

const number = (id) =>
  String(deskItems.findIndex((item) => item.id === id) + 1).padStart(2, "0");
const badge = (id, x, y) =>
  `<g class="desk-badge" transform="translate(${x} ${y})"><circle r="13"/><text y="4">${number(id)}</text></g>`;
const part = (id, dx, dy, x, y, art) =>
  `<g class="desk-object" data-desk-part="${id}" style="--desk-dx:${dx}px;--desk-dy:${dy}px">${art}${badge(id, x, y)}</g>`;
const studs = (xs, y) =>
  xs
    .map(
      (x) =>
        `<ellipse cx="${x}" cy="${y}" rx="3.5" ry="1.7" fill="#d9d1b9" stroke-width=".7"/>`,
    )
    .join("");
const wheels = (xs) =>
  xs
    .map(
      (x) =>
        `<g><ellipse cx="${x}" cy="54" rx="13" ry="17" fill="#3a4037"/><ellipse cx="${x}" cy="54" rx="8" ry="11" fill="#b4b7aa"/><path d="m${x - 6} 48 12 12m-12 0 12-12m-6-4v20" stroke-width=".8"/></g>`,
    )
    .join("");

const ferrari = `<g transform="translate(112 346) scale(1.12)">
  <path d="m8 48 9-19 38-9 27-18 40 6 23 16 6 24-20 11-112 1Z" fill="#b76046"/>
  <path d="m8 48 16 8 116-6 11-2v9L26 68 8 59Z" fill="#715143"/>
  ${wheels([40, 126])}
  <path d="m25 31 34-8 18 10-29 11-29-3Zm36-8 24-18 34 6 15 15-54 8Z" fill="#ccc2a8"/>
  <path d="m69 23 18-13 27 5 9 9-44 5Z" fill="#566259"/>
  <path d="m17 42 27 5m-29 4 23 5M51 35l25-7m5 8 3 17 23-2 5-18m-57 11 5 10" fill="none"/>
  <path d="m12 48 9-10 10 4-7 10Zm37-5 13-5 7 7-18 9" fill="#e1c7a7"/>
  <path d="m108 10 0-15 7 1 3 18m20 4V0l6 1 2 21" fill="#485045"/>
  <path d="m101-6 39-4 21 9-42 4Z" fill="#41493f"/>
  <path d="m88 39 12-1v9l-12 1Z" fill="#d2b66c"/>${studs([80, 90, 105], 5)}
  <path d="M37 30 32 45m31-19 2 9m55-21 5 8" fill="none" opacity=".5"/>
</g>`;
const porsche = `<g transform="translate(238 387) scale(.94)">
  <path d="m8 45 8-18 35-10 25-19 39 5 28 24 9 22-25 13-108-2Z" fill="#d6af5b"/>
  <path d="m8 45 19 10 125-6v9L28 68 8 58Z" fill="#766744"/>
  ${wheels([39, 125])}
  <path d="m55 21 22-20 36 6 18 22-50 4Z" fill="#737b6e"/>
  <path d="m64 20 16-14 29 5 10 14-41 4Z" fill="#45574f"/>
  <ellipse cx="25" cy="34" rx="9" ry="6" fill="#e7ddbc" transform="rotate(-20 25 34)"/>
  <ellipse cx="67" cy="40" rx="10" ry="6" fill="#e7ddbc" transform="rotate(-20 67 40)"/>
  <path d="m17 48 17 6m-19 3 16 5m24-9 17-3m6-15 3 19 23-2 7-15M19 28l30-5" fill="none"/>
  <path d="m105 7-3-16 8-1 5 23m21 7L132-4l7-1 8 27" fill="#41493f"/>
  <path d="m94-12 43-4 24 11-46 5Z" fill="#454b40"/>
  <path d="m103-10 28-2 13 6-29 3Z" fill="#d6af5b"/>
  ${studs([77, 91, 107], 2)}
  <text x="84" y="49" font-size="6" fill="#3d483c" stroke="none">GT3 RS</text>
</g>`;
const keyRows = Array.from({ length: 5 }, (_, r) => {
  const count = r === 0 ? 15 : r === 4 ? 8 : 14;
  return Array.from({ length: count }, (_, c) => {
    const x = 10 + c * 17;
    const fill =
      r === 0 && c === 0
        ? "#83b6a1"
        : r === 0 && c === 13
          ? "#d7bd62"
          : "#eeeae0";
    return `<rect x="${x}" y="${8 + r * 17}" width="14" height="13" rx="2" fill="${fill}"/><path d="M${x + 5} ${14 + r * 17}h4" stroke-width=".55" opacity=".45"/>`;
  }).join("");
}).join("");

export const deskDrawing = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 800" class="desk-svg" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
<defs>
  <clipPath id="desk-mat-edge"><rect width="440" height="216" rx="12"/></clipPath>
  <pattern id="desk-pencil" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 0v7" stroke-width=".5" opacity=".16"/></pattern>
  <pattern id="desk-fabric" width="4" height="4" patternUnits="userSpaceOnUse"><path d="m0 0 4 4m0-4-4 4" stroke-width=".5" opacity=".3"/></pattern>
  <linearGradient id="desk-silver" x2="0" y2="1"><stop stop-color="#eeeae0"/><stop offset="1" stop-color="#b7bbb0"/></linearGradient>
  <linearGradient id="desk-screen" x2="0" y2="1"><stop stop-color="#d8d8bc"/><stop offset="1" stop-color="#8e9c83"/></linearGradient>
  <linearGradient id="desk-lamplight" x2="0" y2="1"><stop stop-color="#e7cf8e" stop-opacity=".28"/><stop offset="1" stop-color="#e7cf8e" stop-opacity="0"/></linearGradient>
</defs>
<g class="desk-construction" opacity=".2" stroke-width=".7"><path d="M70 422 870 376M190 677l816-56M345 68v506M783 112v482" stroke-dasharray="3 8"/><ellipse cx="570" cy="746" rx="382" ry="26"/></g>
${part(
  "desk",
  0,
  0,
  975,
  663,
  `<g class="desk-foundation">
  <path d="m243 617 25 2v111l-25-1Zm-10-9 11 9v112l-11-8Z" fill="#e4e1d6"/>
  <path d="m825 582 25-2v117l-25 3Zm25-2 12-6v117l-12 6Z" fill="#d9dbd1"/>
  <path d="m196 729 122-8 25 12-130 11-21-6Zm587-30 121-8 26 11-131 11-21-6Z" fill="#deded1"/>
  <path d="m246 646 7 1v59m576-90 8-1v68" opacity=".35"/>
  <path d="m250 617 582-36v17l-578 38Z" fill="#c4c8bc"/>
  <path d="M98 440q-9 0-3 10l142 200q3 6 14 5l739-50q11-1 5-12L858 404q-4-5-15-4Z" fill="#c8b9a4"/>
  <path d="m95 446 143 206q3 4 14 3l739-50v12l-739 51q-9 1-15-7L95 458Z" fill="#a69680"/>
  <path d="m104 444 748-40 20 29-747 45Z" fill="#d7d3c4"/>
  <path d="m349 444 119-7q8 0 12 6l2 4-125 7Z" fill="#9da391"/>
  <path d="m162 480 53-3m607-31 41-3M244 646l724-49" opacity=".3"/>
  <path d="m290 654 38-2v13l-38 3Z" fill="#646d5d"/>
  <path d="m298 660 5-1m9 0 6-1" stroke="#e2e5d6"/>
</g>`,
)}
<g class="desk-cables" stroke="#777f70" stroke-width="2"><path d="M288 519C252 468 338 454 480 449S541 388 548 366"/><path d="M850 401c45 2 43 37 14 37"/></g>
${part("mat", 0, 36, 888, 577, `<g transform="matrix(1,.045,.5,.5,345,452)"><rect width="440" height="216" rx="12" fill="#d6dbd4"/><rect x="10" y="10" width="420" height="196" rx="7" stroke-dasharray="2 3" opacity=".5"/><g stroke="#8a9a88" opacity=".5" clip-path="url(#desk-mat-edge)"><ellipse cx="260" cy="198" rx="174" ry="197"/><ellipse cx="260" cy="198" rx="149" ry="197"/><ellipse cx="260" cy="198" rx="101" ry="197"/><path d="M109 97q31-31 54-18t37-24 43 9 54-11 28 43 32 15 40 36M101 123q24-20 42 4t44-10 41 24 32-6 43 23 63-7M175 34q15 22 24 9t37 9 30-26M89 169h338"/></g><g stroke="#b67b50" opacity=".75"><circle cx="49" cy="43" r="24"/><path d="M33 43h32m-16-16v32M29 163h63v28H29Z"/><path d="M370 34h34m-34 8h25"/></g><text x="366" y="197" font-size="12" fill="#ae704e" stroke="none">NuPhy</text></g>`)}
${part("monitor", 0, -38, 751, 330, `<path d="m536 328 30 2v78l-30-1Z" fill="url(#desk-silver)"/><path d="m536 355 30 2v23l-30-1Z" fill="url(#desk-pencil)"/><path d="m489 405 125-2 29 28-130 3-28-19Z" fill="url(#desk-silver)"/><path d="m489 405 25 23 124-2" opacity=".4"/><g transform="matrix(1,.055,0,1,360,112)"><path d="m0 0 7-4 363 1v224l-10 6Z" fill="#91998e"/><rect width="360" height="226" rx="4" fill="#454c42"/><rect x="7" y="7" width="346" height="208" rx="1" fill="url(#desk-screen)"/><g stroke="#5c7357"><circle cx="264" cy="59" r="24" fill="#e5d7b3" stroke="none"/><path d="M8 172 65 120 107 154 172 83 230 148 276 119 351 167v47H8Z" fill="#a3af92"/><path d="m9 186 60-29 68 21 53-42 73 51 88-21v47H9Z" fill="#718769"/><path d="M15 200q75-16 136 0t181 3" stroke="#bac5a5"/><path d="m147 112 23-6 13 17 11-10M52 135l11 3 5-8"/></g><g fill="#e6e3ce" stroke="none" font-family="monospace" font-size="8"><text x="19" y="25">a little room to think.</text></g><text x="164" y="223" fill="#d8ddce" stroke="none" font-size="6">DELL</text><circle cx="348" cy="221" r="1" fill="#e3dbb8" stroke="none"/></g>`)}
${part("light", 0, -82, 728, 108, `<path d="m525 119 5-18 36 2 7 23-13 4-9-13-11 6Z" fill="#5c6558"/><path d="M394 106q-5-1-5 5t5 6l311 17q7 0 7-5t-7-6Z" fill="#525b4e"/><path d="m397 115 302 17" stroke="#e7dbc0" stroke-width="2"/><ellipse cx="707" cy="128" rx="5" ry="6" fill="#41493f"/><path class="desk-light-beam" d="m398 120 302 17 93 351-468-18Z" fill="url(#desk-lamplight)" stroke="none"/><g transform="translate(789 440)"><ellipse cy="5" rx="19" ry="10" fill="#676e61"/><path d="M-19 0v6q18 18 38 0V0" fill="#586251"/><ellipse rx="19" ry="10" fill="#838978"/></g>`)}
${part("echo", 46, -36, 897, 368, `<g transform="translate(833 384)"><path d="M-43 5q-2-49 40-52 45-1 48 45l-7 23q-32 26-69 0Z" fill="#728d90"/><path d="M-43 5q-2-49 40-52 45-1 48 45l-7 23q-32 26-69 0Z" fill="url(#desk-fabric)"/><path d="M-37 18q33 25 73-1" stroke="#95c5c4" stroke-width="3"/><path d="m-11-35 8 1m-4-4v7m14-3 6 1" stroke="#bac7bb" stroke-width="1"/><path d="M12-44q29 19 27 47" opacity=".3"/></g>`)}
${part("ferrari", -45, -40, 171, 341, ferrari)}
${part("porsche", -14, 3, 343, 443, porsche)}
${part("mac", -47, 25, 189, 560, `<path d="m148 501 163-15 62 68-171 19Z" fill="url(#desk-silver)"/><path d="m148 501 54 72 171-19v7l-170 20-55-72Z" fill="#a5ad9f"/><path d="m154 504 153-14 59 61-162 18Z" stroke="#858f80" opacity=".5"/><path d="m252 517q-7-8-12-3t-3 11q5 9 10 8 4-3 8-1 5-1 7-7-6-4-3-8-3-2-7 0Zm-5-4q-1-6 5-7 1 6-5 7Z" fill="#929d8d" stroke="none"/><path d="m160 518 10-1m-6 7 10-1" stroke="#4c594a" stroke-width="2"/><path d="m175 540 11-1" stroke="#616d59" stroke-width="3"/>`)}
${part("keyboard", -6, 35, 421, 574, `<g transform="matrix(1,.045,.48,.57,394,484)"><path d="M0 0h274v103H0Z" fill="#c4c8bd"/><path d="m0 103 274 0v10H0Z" fill="#929c8e"/><rect x="5" y="4" width="264" height="94" rx="5" fill="#9ca596"/>${keyRows}<rect x="74" y="77" width="100" height="14" rx="3" fill="#eeeae0"/><g transform="translate(258 14)"><path d="M-7-9v12q7 8 14 0V-9" fill="#b95c3b"/><ellipse cy="-9" rx="7" ry="5" fill="#cc7650"/><path d="M-3-7v9m6-9v9" stroke="#8e543a" stroke-width=".6"/></g><path d="M3 9v15m269-2v17" stroke="#a4c9b4" stroke-width="2"/></g>`)}
${part("mouse", 39, 33, 842, 557, `<g transform="translate(782 523) rotate(-15)"><path d="M-24 25q-15-6-11-25 4-38 28-40 25-3 32 26l5 42q-19 19-54-3Z" fill="#d6d9cf"/><path d="M-24 25q-17-9-14-28 5-22 18-29l-1 37q-9 16-3 20Z" fill="#a1ab9d"/><path d="M-7-39v26l5 13m-5-13 29-6"/><rect x="-9" y="-24" width="7" height="17" rx="3" fill="#a4af9f"/><path d="m-8-20 5-1m-5 4 5-1m-5 4 5-1m-5 4 5-1" stroke-width=".65"/><path d="M-26-13v15" stroke="#667661" stroke-width="4"/><path d="m-26 7 3 2m-3 2 3 2"/><path d="M-11 26q17 9 31-1" stroke="#a4af9c"/></g>`)}
${part("magsafe", 52, 19, 933, 527, `<path d="M898 506c22 6 41 20 29 35s-56 15-31 43" stroke="#a9b0a1" stroke-width="3"/><ellipse cx="879" cy="501" rx="28" ry="17" fill="#b8c1b0"/><ellipse cx="879" cy="498" rx="28" ry="17" fill="#e9e9df"/><ellipse cx="879" cy="498" rx="23" ry="13" stroke="#b0b8a7"/>`)}
<g class="desk-annotation" fill="currentColor" stroke="none" font-family="monospace" font-size="11" letter-spacing="1.2"><text x="82" y="160">A FEW THINGS</text><text x="82" y="178">THAT MAKE IT MINE.</text><path d="M85 192q-10 58 41 97m-13-1 13 1-2-12" fill="none" stroke="currentColor"/></g>
</svg>`;

export function initDesk() {
  const root = document.querySelector(".desk-explorer");
  if (!root) return;
  const drawing = root.querySelector(".desk-illustration");
  drawing.innerHTML = deskDrawing;
  const slider = root.querySelector("#explore-desk");
  const buttons = root.querySelector(".desk-items");
  const initialTitle = root.querySelector(".desk-item-title").textContent;
  const initialNote = root.querySelector(".desk-item-note").textContent;
  let selected = null;
  buttons.innerHTML = deskItems
    .map(
      (item) =>
        `<button type="button" data-desk-select="${item.id}" aria-pressed="false"><span class="mono">${number(item.id)}</span> ${item.label}</button>`,
    )
    .join("");
  function select(id) {
    selected = selected === id ? null : id;
    drawing.classList.toggle("has-selection", selected !== null);
    root
      .querySelectorAll("[data-desk-part]")
      .forEach((el) =>
        el.classList.toggle("is-selected", el.dataset.deskPart === selected),
      );
    buttons
      .querySelectorAll("button")
      .forEach((el) =>
        el.setAttribute(
          "aria-pressed",
          String(el.dataset.deskSelect === selected),
        ),
      );
    const item = deskItems.find((item) => item.id === selected);
    const preview = root.querySelector(".desk-detail-preview");
    preview.replaceChildren();
    root.classList.toggle("desk-item-selected", Boolean(item));
    if (item) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const clone = drawing
        .querySelector(`[data-desk-part="${item.id}"]`)
        .cloneNode(true);
      clone.removeAttribute("class");
      clone.removeAttribute("style");
      clone.removeAttribute("data-desk-part");
      clone
        .querySelectorAll(".desk-badge, .desk-light-beam")
        .forEach((el) => el.remove());
      // Reuse the same local patterns and gradients in the enlarged item study.
      svg.append(drawing.querySelector("defs").cloneNode(true), clone);
      svg.querySelectorAll("[id]").forEach((el) => {
        const oldId = el.id;
        const newId = `detail-${oldId}`;
        el.id = newId;
        svg
          .querySelectorAll(`[fill="url(#${oldId})"]`)
          .forEach((use) => use.setAttribute("fill", `url(#${newId})`));
        svg
          .querySelectorAll(`[clip-path="url(#${oldId})"]`)
          .forEach((use) => use.setAttribute("clip-path", `url(#${newId})`));
      });
      preview.append(svg);
      const box = clone.getBBox();
      const pad = Math.max(8, Math.max(box.width, box.height) * 0.05);
      svg.setAttribute(
        "viewBox",
        `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`,
      );
    }
    root.querySelector(".desk-item-title").textContent =
      item?.name ?? initialTitle;
    root.querySelector(".desk-item-note").textContent =
      item?.note ?? initialNote;
    root.querySelector(".desk-selection-number").textContent = item
      ? `${number(item.id)} / A CLOSER LOOK`
      : "THE EVERYDAY COLLECTION";
  }
  buttons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-desk-select]");
    if (button) select(button.dataset.deskSelect);
  });
  drawing.addEventListener("click", (event) => {
    const object = event.target.closest("[data-desk-part]");
    if (object) select(object.dataset.deskPart);
  });
  slider.addEventListener("input", () => {
    const progress = Number(slider.value) / 100;
    root.style.setProperty("--desk-open", progress);
    slider.setAttribute(
      "aria-valuetext",
      `${slider.value} percent explored, ${progress < 0.5 ? "the everyday setup" : "the details, a little closer"}`,
    );
    root.querySelector(".desk-view-label").textContent =
      progress < 0.25
        ? "IN ITS PLACE"
        : progress < 0.75
          ? "A LITTLE PERSPECTIVE"
          : "THE DETAILS";
  });
}
