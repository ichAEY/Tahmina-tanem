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

css += `

/* Last services polish: clearer groups, symmetric mobile ribbon, All on desktop */
@media (max-width: 767px) {
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
  .mct-tabs-track {
    grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  }

  .mct-tab-all {
    display: block !important;
  }

  .mct-tab-divider {
    display: none !important;
  }
}
`;

fs.writeFileSync(componentPath, source, "utf8");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Last Tahmina services polish applied.");
