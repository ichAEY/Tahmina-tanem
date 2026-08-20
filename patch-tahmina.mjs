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
`  const switchCategory = (next: "manicure" | "pedicure" | "podology" | "training") => {
    setCategory(next);
    setExpanded(false);
  };`,
`  const switchCategory = (next: "manicure" | "pedicure" | "podology" | "training") => {
    setCategory(next);
    setExpanded(false);
  };

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches || !("IntersectionObserver" in window)) return;
    const tabs = document.querySelector<HTMLElement>(".mct-tabs-scroll");
    if (!tabs) return;

    let nudgeTimer = 0;
    let returnTimer = 0;
    let cancelled = false;

    const cancelHint = () => {
      cancelled = true;
      window.clearTimeout(nudgeTimer);
      window.clearTimeout(returnTimer);
    };

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      if (tabs.scrollWidth <= tabs.clientWidth + 8) return;

      nudgeTimer = window.setTimeout(() => {
        if (cancelled) return;
        tabs.scrollTo({ left: Math.min(54, tabs.scrollWidth - tabs.clientWidth), behavior: "smooth" });
        returnTimer = window.setTimeout(() => {
          if (!cancelled) tabs.scrollTo({ left: 0, behavior: "smooth" });
        }, 620);
      }, 280);
    }, { threshold: 0.6 });

    observer.observe(tabs);
    tabs.addEventListener("pointerdown", cancelHint, { once: true });

    return () => {
      observer.disconnect();
      cancelHint();
      tabs.removeEventListener("pointerdown", cancelHint);
    };
  }, []);`,
  "mobile service tabs hint",
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
  'const featuredWorks = galleryWorks.slice(0, 3);',
  'const featuredWorks = galleryWorks.slice(0, 5);',
  "five featured mobile works",
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
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Удобства для визита</p><span>Всё необходимое для спокойного посещения</span></div>',
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Почему выбирают Тахмину</p><span>Не только маникюр и педикюр</span></div>',
  "reframe amenities block",
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

.mct-service-name strong {
  white-space: pre-line !important;
}

.mct-about-experience strong {
  font-family: "Manrope", Arial, sans-serif !important;
  font-size: 26px !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  letter-spacing: -.045em !important;
}

.mct-brand,
.mct-intro-mark span,
.dct-footer > a {
  letter-spacing: .015em !important;
}

@media (max-width: 767px) {
  .mct-tabs-scroll {
    scroll-snap-type: x proximity;
    scroll-padding-inline: 4px;
  }

  .mct-tabs-scroll .mct-tab {
    flex: 0 0 112px !important;
    min-width: 112px !important;
    padding-inline: 12px !important;
    scroll-snap-align: start;
  }

  .mct-work-grid {
    grid-template-columns: 1.15fr .85fr !important;
    grid-template-rows: 138px 154px auto !important;
  }

  .mct-work-tile:nth-child(4),
  .mct-work-tile:nth-child(5) {
    grid-row: 3 !important;
    aspect-ratio: 1 / 1;
    min-height: 0;
  }

  .mct-work-tile:nth-child(4) { grid-column: 1 !important; }
  .mct-work-tile:nth-child(5) { grid-column: 2 !important; }

  .mct-work-tile:nth-child(4) img,
  .mct-work-tile:nth-child(5) img {
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .mct-about-copy > .mct-about-lead {
    color: #252220 !important;
    font-size: 21px !important;
    font-weight: 600 !important;
    line-height: 1.3 !important;
  }

  .mct-about-copy > p:not(.mct-about-lead) {
    color: #3b3734 !important;
    font-size: 14.2px !important;
    line-height: 1.58 !important;
  }

  .mct-amenities-head .mct-section-kicker {
    max-width: 160px;
    line-height: 1.3;
  }

  .mct-amenities-grid article:nth-child(2) strong {
    white-space: nowrap;
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .mct-tabs-scroll {
    width: 100% !important;
    overflow: hidden !important;
    gap: 4px !important;
  }

  .mct-tabs-scroll .mct-tab {
    flex: 1 1 25% !important;
    width: 25% !important;
    min-width: 0 !important;
    padding-inline: 10px !important;
    text-align: center;
  }

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
