import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";

let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

const manicureGroupMarker = '...manicure.map((service, index) => ({ ...service, sectionLabel: index === 0 ? "Маникюр" : undefined, sectionKey: "manicure" })),';
if (!source.includes(manicureGroupMarker)) {
  throw new Error("Final services polish marker not found: manicure group label");
}

source = source.replace(
  manicureGroupMarker,
  '...manicure.map((service) => ({ ...service, sectionLabel: undefined, sectionKey: "manicure" })),',
);

const ribbonMarkup = `          <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
            <div className="mct-tabs-track" role="presentation">
              <button className={\`mct-tab mct-tab-all\${category === "all" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "all"} onClick={() => switchCategory("all")}>Все</button>
              <span className="mct-tab-divider" aria-hidden="true" />
              <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
              <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
              <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
              <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
            </div>
          </div>`;

if (!source.includes(ribbonMarkup)) {
  throw new Error("Final services polish marker not found: service ribbon");
}

source = source.replace(
  ribbonMarkup,
`          <div className="mct-tabs-ribbon-wrap">
            <span className="mct-tabs-swipe-cue" aria-hidden="true">
              <svg viewBox="0 0 18 10" fill="none"><path d="M1 5h14M11 1.5 15 5l-4 3.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
              <div className="mct-tabs-track" role="presentation">
                <button className={\`mct-tab mct-tab-all\${category === "all" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "all"} onClick={() => switchCategory("all")}>Все</button>
                <span className="mct-tab-divider" aria-hidden="true" />
                <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
                <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
                <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
                <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
              </div>
            </div>
          </div>`,
);

css += `

/* Last services polish: clearer groups, clean mobile ribbon cue and tactile controls */
@media (max-width: 767px) {
  .mct-tabs-ribbon-wrap {
    position: relative;
    padding-top: 15px;
  }

  .mct-tabs-scroll {
    --mct-ribbon-edge: max(var(--mct-shell-pad), calc((100vw - 520px) / 2 + var(--mct-shell-pad)));
    margin-top: 0 !important;
    padding-left: var(--mct-ribbon-edge) !important;
    padding-right: 0 !important;
    scroll-padding-left: var(--mct-ribbon-edge) !important;
    scroll-padding-right: var(--mct-ribbon-edge) !important;
  }

  .mct-tabs-track {
    margin-right: var(--mct-ribbon-edge);
  }

  /* One small hint above the ribbon, aligned to the right content edge. */
  .mct-tabs-swipe-cue {
    position: absolute;
    z-index: 3;
    top: 1px;
    right: 2px;
    display: block;
    width: 18px;
    height: 10px;
    color: rgba(80, 67, 61, .58);
    pointer-events: none;
    animation: mctSwipeCue 1.65s cubic-bezier(.45, 0, .25, 1) infinite;
  }

  .mct-tabs-swipe-cue svg {
    display: block;
    width: 18px;
    height: 10px;
  }

  @keyframes mctSwipeCue {
    0%, 26%, 100% { transform: translate3d(0, 0, 0); }
    52% { transform: translate3d(4px, 0, 0); }
    72% { transform: translate3d(1px, 0, 0); }
  }

  .mct-service-group-label {
    margin-top: 2px;
    margin-bottom: 1px;
    color: #6f5d55;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .095em;
  }

  .mct-service-group-label::after {
    background: rgba(65, 52, 47, .2);
  }

  /* Tactile press feedback for the main mobile actions. */
  .mct-main-cta,
  .mct-gallery-button,
  .mct-final-cta,
  .mct-final-secondary,
  .mct-sticky {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transform: translate3d(0, 0, 0) scale(1);
    transition: transform 115ms cubic-bezier(.2, .72, .28, 1), filter 115ms ease, box-shadow 115ms ease;
    will-change: transform;
  }

  .mct-main-cta:active,
  .mct-gallery-button:active,
  .mct-final-cta:active,
  .mct-final-secondary:active,
  .mct-sticky:active {
    transform: translate3d(0, 1px, 0) scale(.985);
    filter: brightness(.985);
  }

  .mct-gallery-button:active,
  .mct-final-secondary:active {
    box-shadow: inset 0 1px 3px rgba(65, 52, 47, .08);
  }

  .mct-tabs-scroll .mct-tab {
    -webkit-tap-highlight-color: transparent;
    transition: transform 105ms cubic-bezier(.2, .72, .28, 1), background-color 150ms ease, color 150ms ease;
    transform: translate3d(0, 0, 0) scale(1);
    will-change: transform;
  }

  .mct-tabs-scroll .mct-tab:active {
    transform: translate3d(0, 1px, 0) scale(.965);
  }

  @media (prefers-reduced-motion: reduce) {
    .mct-tabs-swipe-cue { animation: none; }
    .mct-main-cta,
    .mct-gallery-button,
    .mct-final-cta,
    .mct-final-secondary,
    .mct-sticky,
    .mct-tabs-scroll .mct-tab { transition: none; }
  }
}

@media (min-width: 768px) {
  .mct-tabs-ribbon-wrap {
    display: block;
  }

  .mct-tabs-track {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }

  .mct-tab-all,
  .mct-tab-divider,
  .mct-tabs-swipe-cue {
    display: none !important;
  }

  .mct-tabs-scroll .mct-tab {
    color: #4f4946 !important;
    font-size: 11.5px !important;
    letter-spacing: .005em;
  }

  .mct-tabs-scroll .mct-tab.is-active {
    color: var(--ink) !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Last Tahmina services polish applied.");
