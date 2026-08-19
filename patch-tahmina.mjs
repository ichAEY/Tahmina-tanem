import fs from "node:fs";
import site from "./site-data.mjs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";
let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label = from) {
  if (!source.includes(from)) throw new Error(`Tahmina patch marker not found: ${label}`);
  source = source.replace(from, to);
}

function replaceBetween(start, end, replacement, label) {
  const startIndex = source.indexOf(start);
  if (startIndex < 0) throw new Error(`Tahmina patch start marker not found: ${label}`);
  const endIndex = source.indexOf(end, startIndex + start.length);
  if (endIndex < 0) throw new Error(`Tahmina patch end marker not found: ${label}`);
  source = source.slice(0, startIndex) + replacement + source.slice(endIndex);
}

const podology = JSON.stringify(site.services.podology ?? [], null, 2);
const training = JSON.stringify(site.services.training ?? [], null, 2);

replaceRequired(
  "const beforeAfter = [];",
  `const podology: Service[] = ${podology};\n\nconst training: Service[] = ${training};\n\nconst beforeAfter = [];`,
  "insert extra service categories",
);

replaceRequired(
  'const [category, setCategory] = useState<"manicure" | "pedicure">("manicure");',
  'const [category, setCategory] = useState<"manicure" | "pedicure" | "podology" | "training">("manicure");',
  "service category state",
);

replaceRequired(
  'const services = category === "manicure" ? manicure : pedicure;',
  'const services = { manicure, pedicure, podology, training }[category];',
  "service category resolver",
);

replaceRequired(
  'const switchCategory = (next: "manicure" | "pedicure") => {',
  'const switchCategory = (next: "manicure" | "pedicure" | "podology" | "training") => {',
  "service category switcher",
);

replaceRequired(
`          <div className="mct-tabs" role="tablist" aria-label="Категории услуг">
            <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
          </div>`,
`          <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
            <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
            <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
            <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
          </div>`,
  "four horizontal service tabs",
);

replaceRequired(
  'const lightboxItems = [...beforeAfter, ...galleryWorks];',
  'const lightboxItems = [...galleryWorks];',
  "gallery lightbox items",
);

const portfolioStart = '      <section className="mct-section" id="mobile-portfolio">';
const worksMarker = '        <div className="mct-shell mct-reveal">\n          <div className="mct-work-grid"';
replaceBetween(
  portfolioStart,
  worksMarker,
`      <section className="mct-section" id="mobile-portfolio">
        <div className="mct-shell mct-reveal">
          <div className="mct-section-head">
            <div><p className="mct-section-kicker">Портфолио</p><h2>Работы</h2></div>
            <p className="mct-section-note">Подборка работ Тахмины</p>
          </div>
        </div>
`,
  "remove before/after portfolio",
);

const galleryContentStart = '          <div className="mct-gallery-content">\n            <h3>До / после</h3>';
const galleryWorksHeading = '            <h3>Работы</h3>';
replaceBetween(
  galleryContentStart,
  galleryWorksHeading,
  '          <div className="mct-gallery-content">\n',
  "remove before/after from full gallery",
);

replaceRequired(
  '                  <a href="#mobile-promotions" onClick={() => setMenuOpen(false)}><span>•</span>Акции</a>\n',
  '',
  "remove mobile promotions link",
);
replaceRequired(
  '              <a href="#mobile-promotions">Акции</a>\n',
  '',
  "remove desktop promotions link",
);

const promotionSectionStart = '      <section className="mct-promotions mct-reveal" id="mobile-promotions" ref={promotionSectionRef}>';
const aboutSection = '      <section className="mct-about mct-reveal" id="mobile-about">';
replaceBetween(
  promotionSectionStart,
  aboutSection,
  '',
  "remove promotions/training block",
);

replaceRequired(
  '              onMouseLeave={resumeDesktopGallery}',
  '              onMouseLeave={() => { if (desktopGalleryPointerStartRef.current === null) resumeDesktopGallery(); }}',
  "desktop gallery mouse leave",
);

replaceRequired(
`              onPointerDown={(event) => {
                if (!event.isPrimary) return;
                pauseDesktopGallery(event.clientX);
                if (event.pointerType === "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!event.isPrimary || desktopGalleryPointerStartRef.current === null) return;
                moveDesktopGallery(event.clientX);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
                resumeDesktopGallery();
              }}
              onPointerCancel={resumeDesktopGallery}`,
`              onPointerDown={(event) => {
                if (!event.isPrimary) return;
                if (event.pointerType === "mouse") event.preventDefault();
                pauseDesktopGallery(event.clientX);
                if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!event.isPrimary || desktopGalleryPointerStartRef.current === null) return;
                if (event.pointerType === "mouse") event.preventDefault();
                moveDesktopGallery(event.clientX);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
                resumeDesktopGallery();
              }}
              onPointerCancel={resumeDesktopGallery}
              onLostPointerCapture={resumeDesktopGallery}
              onDragStart={(event) => event.preventDefault()}`,
  "desktop gallery pointer handling",
);

source = source.replaceAll('aria-label="Бесконечная галерея работ Нонны"', 'aria-label="Бесконечная галерея работ Тахмины"');

css += `

/* Tahmina-specific refinements */
.mct-tabs-scroll {
  display: flex !important;
  grid-template-columns: none !important;
  gap: 6px !important;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4px !important;
  scrollbar-width: none;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
}

.mct-tabs-scroll::-webkit-scrollbar { display: none; }

.mct-tabs-scroll .mct-tab {
  flex: 0 0 auto;
  min-width: max-content;
  padding-inline: 18px;
  white-space: nowrap;
}

.mct-brand,
.mct-intro-mark span,
.dct-footer > a {
  letter-spacing: .015em !important;
}

@media (max-width: 767px) {
  .mct-amenities-grid article:nth-child(2) strong {
    white-space: nowrap;
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .dct-gallery-viewport {
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-y;
  }

  .dct-gallery-viewport:active { cursor: grabbing; }

  .dct-gallery-viewport,
  .dct-gallery-track,
  .dct-gallery-set,
  .dct-gallery-module,
  .dct-film-frame,
  .dct-film-frame img {
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
  }

  .dct-film-frame img {
    pointer-events: none;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Tahmina-specific template refinements applied.");
