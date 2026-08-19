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
`          <div className="mct-tabs" role="tablist" aria-label="Категории услуг">
            <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
            <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
            <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
          </div>`,
  "four service tabs",
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
            <p className="mct-section-note">Подборка маникюра, педикюра и дизайнов Тахмины</p>
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
  '<a href="#mobile-promotions" onClick={() => setMenuOpen(false)}><span>•</span>Акции</a>',
  '<a href="#mobile-promotions" onClick={() => setMenuOpen(false)}><span>•</span>Обучение</a>',
  "mobile menu training label",
);
replaceRequired(
  '<a href="#mobile-promotions">Акции</a>',
  '<a href="#mobile-promotions">Обучение</a>',
  "desktop menu training label",
);

const trainingSectionStart = '      <section className="mct-promotions mct-reveal" id="mobile-promotions" ref={promotionSectionRef}>';
const aboutSection = '      <section className="mct-about mct-reveal" id="mobile-about">';
replaceBetween(
  trainingSectionStart,
  aboutSection,
`      <section className="mct-promotions mct-reveal" id="mobile-promotions">
        <div className="mct-shell">
          <div className="mct-promotions-head">
            <div><p className="mct-section-kicker">Обучение мастеров</p><h2>Индивидуальные<br />занятия</h2></div>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Смотреть обучение →</a>
          </div>
          <div className="mct-promotion-list mct-training-list" aria-label="Индивидуальное обучение у Тахмины">
            {promotions.map((promotion) => (
              <article className="mct-promotion-card" key={promotion.title}>
                <figure><img src={promotion.image} alt={promotion.alt} loading="lazy" draggable="false" /></figure>
                <div className="mct-promotion-copy">
                  <span>{promotion.period}</span>
                  <h3>{promotion.title}</h3>
                  <strong className="mct-promotion-benefit">{promotion.highlight}</strong>
                  <p>{promotion.description}</p>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Посмотреть программу →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

`,
  "replace promotions with training",
);

replaceRequired(
  '              onMouseLeave={resumeDesktopGallery}',
  '              onMouseLeave={() => { if (desktopGalleryPointerStartRef.current === null) resumeDesktopGallery(); }}',
  "desktop gallery mouse leave",
);

source = source.replaceAll('aria-label="Бесконечная галерея работ Нонны"', 'aria-label="Бесконечная галерея работ Тахмины"');

css += `

/* Tahmina-specific refinements */
@media (max-width: 767px) {
  .mct-amenities-grid article:nth-child(2) strong {
    white-space: nowrap;
    font-size: 16px;
  }

  .mct-training-list {
    grid-auto-columns: min(88vw, 430px);
  }
}

@media (min-width: 768px) {
  .dct-gallery-viewport {
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .dct-gallery-viewport:active {
    cursor: grabbing;
  }

  .dct-film-frame,
  .dct-film-frame img {
    user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
  }

  .dct-film-frame img {
    pointer-events: none;
  }

  .mct-training-list {
    grid-auto-columns: min(620px, 62vw);
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Tahmina-specific template refinements applied.");
