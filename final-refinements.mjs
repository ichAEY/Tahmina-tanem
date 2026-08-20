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
`          <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
            <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
            <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
            <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
            <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
          </div>`,
`          <div className="mct-tabs mct-tabs-scroll" role="tablist" aria-label="Категории услуг">
            <div className="mct-tabs-track">
              <button className={\`mct-tab\${category === "manicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "manicure"} onClick={() => switchCategory("manicure")}>Маникюр</button>
              <button className={\`mct-tab\${category === "pedicure" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "pedicure"} onClick={() => switchCategory("pedicure")}>Педикюр</button>
              <button className={\`mct-tab\${category === "podology" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "podology"} onClick={() => switchCategory("podology")}>Подология</button>
              <button className={\`mct-tab\${category === "training" ? " is-active" : ""}\`} type="button" role="tab" aria-selected={category === "training"} onClick={() => switchCategory("training")}>Обучение</button>
            </div>
          </div>`,
  "service category ribbon",
);

replaceRequired(
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Почему выбирают Тахмину</p><span>Не только маникюр и педикюр</span></div>',
  '<div className="mct-amenities-head"><p className="mct-section-kicker">Для меня важно</p><span>Аккуратность, комфорт и внимание к деталям</span></div>',
  "personal amenities heading",
);

css += `

/* Final Tahmina mobile polish */
@media (max-width: 767px) {
  /* Compact A.S. NAILS wordmark without changing the brand itself. */
  .mct-brand,
  .mct-intro-mark span,
  .dct-footer > a {
    letter-spacing: 0 !important;
    word-spacing: -.1em !important;
  }

  /* Make the category control feel like one continuous ribbon that extends off-screen. */
  .mct-tabs-scroll {
    display: block !important;
    width: calc(100% + 22px) !important;
    margin-right: -22px !important;
    padding: 4px 22px 4px 4px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scroll-snap-type: x proximity;
    scroll-padding-inline: 4px;
    touch-action: pan-x;
  }

  .mct-tabs-track {
    display: flex;
    width: max-content;
    min-width: max-content;
    gap: 6px;
  }

  .mct-tabs-scroll .mct-tab {
    flex: 0 0 auto !important;
    min-width: 108px !important;
    width: auto !important;
    padding-inline: 16px !important;
    scroll-snap-align: start;
  }

  /* Keep the final portfolio pair visually balanced and remove the uneven bottom edge. */
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

  /* Replace the heavy statistic look with a lighter editorial accent. */
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
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Final Tahmina mobile refinements applied.");
