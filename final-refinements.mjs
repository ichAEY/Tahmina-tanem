import fs from "node:fs";

const componentPath = "app/mobile-claytone.tsx";
const cssPath = "app/globals.css";

let source = fs.readFileSync(componentPath, "utf8");
let css = fs.readFileSync(cssPath, "utf8");

function replaceRequired(from, to, label) {
  if (!source.includes(from)) throw new Error(`Final refinement marker not found: ${label}`);
  source = source.replace(from, to);
}

replaceRequired(
  "const beforeAfter = [];",
`const allServices: Array<Service & { sectionLabel?: string; sectionKey?: string }> = [
  ...manicure.map((service, index) => ({ ...service, sectionLabel: index === 0 ? "Маникюр" : undefined, sectionKey: "manicure" })),
  ...pedicure.map((service, index) => ({ ...service, sectionLabel: index === 0 ? "Педикюр" : undefined, sectionKey: "pedicure" })),
  ...podology.map((service, index) => ({ ...service, sectionLabel: index === 0 ? "Подология" : undefined, sectionKey: "podology" })),
  ...training.map((service, index) => ({ ...service, sectionLabel: index === 0 ? "Обучение" : undefined, sectionKey: "training" })),
];

const beforeAfter = [];`,
  "all services collection",
);

replaceRequired(
  'const [category, setCategory] = useState<"manicure" | "pedicure" | "podology" | "training">("manicure");',
  'const [category, setCategory] = useState<"all" | "manicure" | "pedicure" | "podology" | "training">("manicure");',
  "all services category state",
);

replaceRequired(
  'const services = { manicure, pedicure, podology, training }[category];',
`const services: Array<Service & { sectionLabel?: string; sectionKey?: string }> =
    category === "all" ? allServices
      : category === "manicure" ? manicure
        : category === "pedicure" ? pedicure
          : category === "podology" ? podology
            : training;`,
  "all services category resolver",
);

replaceRequired(
`  const visibleServices = useMemo(
    () => category === "manicure" && !expanded ? services.slice(0, 5) : services,
    [category, expanded, services],
  );`,
`  const isCollapsibleCategory = category === "manicure" || category === "all";
  const visibleServices = useMemo(
    () => isCollapsibleCategory && !expanded ? services.slice(0, 5) : services,
    [expanded, isCollapsibleCategory, services],
  );`,
  "collapsible all services list",
);

replaceRequired(
  'const switchCategory = (next: "manicure" | "pedicure" | "podology" | "training") => {',
  'const switchCategory = (next: "all" | "manicure" | "pedicure" | "podology" | "training") => {',
  "all services category switcher",
);

replaceRequired(
`          <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
            <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
            <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
            <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
          </div>`,
`          <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
            <div className="mct-tabs-track" role="presentation">
              <button className={\`mct-tab mct-tab-all\${category === "all" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "all"} onClick={() => switchCategory("all")}>Все</button>
              <span className="mct-tab-divider" aria-hidden="true" />
              <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
              <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
              <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
              <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
            </div>
          </div>`,
  "mobile service ribbon with all category",
);

replaceRequired(
`            {visibleServices.map((service) => (
              <article className="mct-service-row" key={service.name}>
                <div className="mct-service-name"><strong>{service.name}</strong><p className="dct-service-description">{service.description}</p><small>{service.time}</small></div>
                <div className="mct-service-action"><b>{service.price}</b><a href={service.url} target="_blank" rel="noopener noreferrer">Записаться →</a></div>
              </article>
            ))}`,
`            {visibleServices.map((service) => (
              <article className={\`mct-service-row\${service.sectionLabel ? " has-group-label" : ""}\`} key={\`\${service.sectionKey ?? category}-\${service.name}\`}>
                {service.sectionLabel && <span className="mct-service-group-label">{service.sectionLabel}</span>}
                <div className="mct-service-name"><strong>{service.name}</strong><p className="dct-service-description">{service.description}</p><small>{service.time}</small></div>
                <div className="mct-service-action"><b>{service.price}</b><a href={service.url} target="_blank" rel="noopener noreferrer">Записаться →</a></div>
              </article>
            ))}`,
  "service group labels in all category",
);

replaceRequired(
`          {category === "manicure" && (
            <button className={\`mct-more-services\${expanded ? " is-open" : ""}\`} type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Свернуть услуги" : \`Показать ещё \${manicure.length - 5} услуг\`}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}`,
`          {isCollapsibleCategory && services.length > 5 && (
            <button className={\`mct-more-services\${expanded ? " is-open" : ""}\`} type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Свернуть услуги" : \`Показать ещё \${services.length - 5} услуг\`}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}`,
  "collapsible manicure and all services",
);

replaceRequired(
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Почему выбирают Тахмину</p><span>Не только маникюр и педикюр</span></div>',
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Дополнительно</p><span>Подология, большая палитра и обучение мастеров</span></div>',
  "clear amenities heading",
);

source = source.replaceAll("A. S. NAILS", "A.S.NAILS");
source = source.replaceAll("A.S. NAILS", "A.S.NAILS");

css += `

/* Final Tahmina service and brand polish */
.mct-brand,
.mct-intro-mark span,
.dct-footer > a {
  letter-spacing: .015em !important;
  word-spacing: 0 !important;
  white-space: nowrap;
}

@media (max-width: 767px) {
  /* The scroll viewport is invisible; the long pill itself is the moving ribbon. */
  .mct-tabs-scroll {
    display: block !important;
    width: 100vw !important;
    margin: 15px calc(50% - 50vw) 7px !important;
    padding: 4px max(var(--mct-shell-pad), calc((100vw - 520px) / 2 + var(--mct-shell-pad))) 7px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    border-radius: 0 !important;
    background: transparent !important;
    scroll-snap-type: x proximity;
    scroll-padding-inline: max(var(--mct-shell-pad), calc((100vw - 520px) / 2 + var(--mct-shell-pad)));
    scrollbar-width: none;
    overscroll-behavior-inline: contain;
    touch-action: pan-x pan-y;
    -webkit-overflow-scrolling: touch;
  }

  .mct-tabs-scroll::-webkit-scrollbar { display: none; }

  .mct-tabs-track {
    display: flex;
    width: max-content;
    min-width: max-content;
    align-items: center;
    gap: 5px;
    padding: 4px;
    border-radius: 999px;
    background: #eee5df;
  }

  .mct-tabs-scroll .mct-tab {
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 106px !important;
    padding-inline: 16px !important;
    white-space: nowrap;
    scroll-snap-align: start;
  }

  .mct-tabs-scroll .mct-tab-all {
    min-width: 64px !important;
    padding-inline: 14px !important;
  }

  .mct-tab-divider {
    display: block;
    width: 1px;
    height: 21px;
    flex: 0 0 1px;
    margin: 0 3px;
    background: rgba(65, 52, 47, .18);
  }

  .mct-service-row.has-group-label {
    min-height: 96px;
    padding-top: 13px;
  }

  .mct-service-group-label {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: -1px;
    color: #8a756c;
    font: 600 8px/1 "Manrope", Arial, sans-serif;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .mct-service-group-label::after {
    height: 1px;
    flex: 1 1 auto;
    background: rgba(65, 52, 47, .13);
    content: "";
  }

  /* Keep the final portfolio pair visually balanced. */
  .mct-work-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
    grid-template-rows: 138px 154px auto !important;
    align-items: stretch;
  }

  .mct-work-tile:nth-child(4),
  .mct-work-tile:nth-child(5) {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 / 1 !important;
    min-height: 0 !important;
  }

  .mct-work-tile:nth-child(4) img,
  .mct-work-tile:nth-child(5) img {
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: 1 / 1 !important;
    object-fit: cover !important;
  }

  .mct-about-experience strong {
    font-family: "Cormorant Garamond", Georgia, serif !important;
    font-size: 34px !important;
    font-weight: 500 !important;
    line-height: .9 !important;
    letter-spacing: -.035em !important;
  }

  .mct-about-experience span {
    font-weight: 500 !important;
    letter-spacing: .01em !important;
  }

  .mct-amenities-head .mct-section-kicker {
    max-width: none !important;
  }
}

@media (min-width: 768px) {
  /* Desktop stays a strict four-column navigation: All is a mobile helper only. */
  .mct-tabs-scroll {
    display: block !important;
    width: 100% !important;
    overflow: hidden !important;
    gap: 0 !important;
    padding: 4px !important;
  }

  .mct-tabs-track {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    width: 100% !important;
    min-width: 0 !important;
    gap: 4px;
  }

  .mct-tab-all,
  .mct-tab-divider {
    display: none !important;
  }

  .mct-tabs-scroll .mct-tab {
    width: 100% !important;
    min-width: 0 !important;
    flex: none !important;
    padding-inline: 10px !important;
    text-align: center;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Final Tahmina service ribbon and brand refinements applied.");
