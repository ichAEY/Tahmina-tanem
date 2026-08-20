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
            <span className="mct-tabs-swipe-cue" aria-hidden="true">›</span>
          </div>`,
);

css += `

/* Last services polish: clearer groups, symmetric mobile ribbon and subtle swipe cue */
@media (max-width: 767px) {
  .mct-tabs-ribbon-wrap {
    position: relative;
  }

  .mct-tabs-scroll {
    --mct-ribbon-edge: max(var(--mct-shell-pad), calc((100vw - 520px) / 2 + var(--mct-shell-pad)));
    padding-left: var(--mct-ribbon-edge) !important;
    padding-right: 0 !important;
    scroll-padding-left: var(--mct-ribbon-edge) !important;
    scroll-padding-right: var(--mct-ribbon-edge) !important;
  }

  .mct-tabs-track {
    margin-right: var(--mct-ribbon-edge);
  }

  .mct-tabs-swipe-cue {
    position: absolute;
    z-index: 3;
    top: 50%;
    right: -3px;
    display: flex;
    width: 38px;
    height: 44px;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2px;
    background: linear-gradient(90deg, rgba(247, 241, 235, 0), rgba(247, 241, 235, .88) 58%, #f7f1eb 100%);
    color: rgba(77, 65, 59, .62);
    font: 500 25px/1 "Cormorant Garamond", Georgia, serif;
    pointer-events: none;
    transform: translateY(-50%);
    animation: mctSwipeCue 1.8s ease-in-out infinite;
  }

  @keyframes mctSwipeCue {
    0%, 100% { opacity: .58; transform: translate3d(0, -50%, 0); }
    50% { opacity: .92; transform: translate3d(3px, -50%, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .mct-tabs-swipe-cue { animation: none; }
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
