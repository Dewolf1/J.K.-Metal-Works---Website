import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import everest from "../assets/stabilizer-everest.webp";
import datavision from "../assets/stabilizer-datavision.webp";
import switches from "../assets/poe-switches.webp";
import solarGuard from "../assets/solar-fence-guard.webp";
import blueland from "../assets/stabilizer-blueland.webp";
import wallMount from "../assets/stabilizer-wall-mount.webp";
import networkSwitch from "../assets/poe-network-switch.webp";
import charger from "../assets/battery-charger.webp";
import production from "../assets/stabilizer-production.webp";
import frontPanel from "../assets/stabilizer-front-panel.webp";
import skytech from "../assets/stabilizer-skytech.webp";
import stampedPanel from "../assets/custom-stamped-panel.webp";

const categories = [
  "All products",
  "Stabilizer cabinets",
  "Networking",
  "Power & protection",
  "Custom metalwork",
] as const;
type Category = (typeof categories)[number];
type Product = {
  image: string;
  title: string;
  category: Category;
  detail: string;
  finish: string;
  kind: "Metal enclosure" | "Front panel" | "Formed component" | "Production example";
  fit?: "photo";
};

const products: Product[] = [
  {
    image: networkSwitch,
    title: "PoE Switch Housing",
    kind: "Metal enclosure",
    category: "Networking",
    detail:
      "A compact metal housing for network switches, with precisely formed port openings and ventilation. Discuss your port layout, dimensions and finish with our team.",
    finish: "Port-ready enclosure",
  },
  {
    image: wallMount,
    title: "Wall-Mount Stabilizer Cabinet",
    kind: "Metal enclosure",
    category: "Stabilizer cabinets",
    detail:
      "A clean-profile cabinet for wall-mounted voltage stabilizers. Display openings, ventilation and mounting provisions can be discussed around your equipment.",
    finish: "Wall-mount format",
  },
  {
    image: charger,
    title: "Battery Charger Enclosure",
    kind: "Metal enclosure",
    category: "Power & protection",
    detail:
      "A ventilated enclosure for battery charging equipment. Share your component layout and requirements for cable entry, indicator openings and assembly.",
    finish: "Ventilated housing",
    fit: "photo",
  },
  {
    image: everest,
    title: "Voltage Stabilizer Cabinet",
    kind: "Metal enclosure",
    category: "Stabilizer cabinets",
    detail:
      "A durable cabinet for voltage stabilizer applications, combining a formed sheet-metal body with a clean front-panel layout. Enquire about dimensions, cut-outs and finishing.",
    finish: "Precision-formed cabinet",
  },
  {
    image: frontPanel,
    title: "Custom Stabilizer Fascia",
    kind: "Front panel",
    category: "Custom metalwork",
    detail:
      "A custom front panel with dedicated openings for meters, switches and indicators. Bring your drawing or reference to discuss a layout for your own brand.",
    finish: "Custom front-panel layout",
    fit: "photo",
  },
  {
    image: skytech,
    title: "Digital Stabilizer Housing",
    kind: "Metal enclosure",
    category: "Stabilizer cabinets",
    detail:
      "A freestanding stabilizer cabinet with a wide front-panel format. Enquire about a housing configured for your display, controls and internal assembly.",
    finish: "Freestanding format",
  },
  {
    image: switches,
    title: "Network Equipment Enclosures",
    kind: "Metal enclosure",
    category: "Networking",
    detail:
      "Protective metal enclosures for PoE switches and networking equipment. Discuss ventilation, connector access and installation needs for your application.",
    finish: "CCTV infrastructure",
    fit: "photo",
  },
  {
    image: blueland,
    title: "A.C. Stabilizer Cabinet",
    kind: "Metal enclosure",
    category: "Stabilizer cabinets",
    detail:
      "A sheet-metal cabinet for air-conditioner voltage stabilizers. Share your required dimensions, display location and preferred finish for a tailored quotation.",
    finish: "Appliance protection",
  },
  {
    image: stampedPanel,
    title: "Stamped Sheet-Metal Panel",
    kind: "Formed component",
    category: "Custom metalwork",
    detail:
      "A formed metal panel with punched holes and stamped detailing. Share a drawing or sample to discuss hole positions, material, dimensions and branding.",
    finish: "Punched & stamped detailing",
    fit: "photo",
  },
  {
    image: datavision,
    title: "Electronic Stabilizer Cabinet",
    kind: "Metal enclosure",
    category: "Stabilizer cabinets",
    detail:
      "A fabricated cabinet for electronic voltage regulation equipment. Discuss your preferred control layout and enclosure configuration with our team.",
    finish: "Custom fabrication",
  },
  {
    image: solarGuard,
    title: "Solar Fence Guard Housing",
    kind: "Metal enclosure",
    category: "Power & protection",
    detail:
      "A protective cabinet for solar fence guard systems. Contact us to discuss your installation environment, equipment dimensions and enclosure requirements.",
    finish: "Equipment protection",
    fit: "photo",
  },
];

const productionExample: Product = {
  image: production,
  title: "Batch-Fabricated Cabinets",
  category: "Custom metalwork",
  kind: "Production example",
  detail:
    "Sheet-metal cabinet production for repeat requirements. Share your sample, drawing, quantity and timeline to discuss fabrication and finishing.",
  finish: "Repeat-production enquiries",
  fit: "photo",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductCollection() {
  const [category, setCategory] = useState<Category>("All products");
  const [selected, setSelected] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = products.filter(
    (product) => category === "All products" || product.category === category,
  );

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section className="products section" id="products">
      <div className="section-heading products-heading">
        <div>
          <div className="section-label" data-reveal>
            <span>03</span> The product collection
          </div>
          <h2 data-reveal>
            Different applications.
            <br />
            <em>One exacting standard.</em>
          </h2>
        </div>
        <p data-reveal>
          From the first cut to the final coat. Discover metal housings made for the technology
          inside.
        </p>
      </div>
      <div className="catalogue-note">
        <span>Fabrication, not finished electronics.</span>
        <p>
          Explore metal housings and parts. Photographs show example applications; dimensions,
          cut-outs and finishes are confirmed for your brief.
        </p>
      </div>
      <div className="collection-toolbar">
        <div className="product-filters" role="group" aria-label="Filter products by application">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "All products" && <sup>{products.length}</sup>}
            </button>
          ))}
        </div>
        <span className="collection-count" role="status" aria-live="polite">
          {String(visible.length).padStart(2, "0")} {visible.length === 1 ? "design" : "designs"} /
          made to your brief
        </span>
      </div>
      <div className="collection-grid">
        {visible.map((product, index) => (
          <button
            key={`${category}-${product.title}`}
            className="collection-card"
            type="button"
            onClick={() => setSelected(product)}
            style={{ animationDelay: `${Math.min(index, 5) * 55}ms` }}
            aria-label={`View ${product.title}`}
          >
            <div className="collection-image">
              <span className="collection-index">
                {String(products.indexOf(product) + 1).padStart(2, "0")} / JKM
              </span>
              <span className="collection-kind">{product.kind}</span>
              <img
                src={product.image}
                alt={product.title}
                className={product.fit || "contain"}
                loading="lazy"
                decoding="async"
                width="720"
                height="640"
              />
              <span className="collection-view">
                View details <Arrow />
              </span>
            </div>
            <div className="collection-caption">
              <div>
                <span>{product.category}</span>
                <h3>{product.title}</h3>
                <p>{product.finish}</p>
              </div>
              <span className="collection-arrow">
                <Arrow />
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="workshop-feature">
        <img
          src={production}
          alt="Fabricated stabilizer cabinets stacked in the workshop"
          loading="lazy"
          decoding="async"
          width="662"
          height="1280"
        />
        <div>
          <p className="eyebrow">From our workshop / Production example</p>
          <h3>
            From a single brief.
            <br />
            <em>To a repeatable build.</em>
          </h3>
          <p>
            Have a repeat-production requirement? Share your sample or drawing, expected quantity
            and timeline. We’ll discuss fabrication and finishing around your needs.
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => setSelected(productionExample)}
          >
            Explore batch fabrication <Arrow />
          </button>
        </div>
      </div>
      <div className="bespoke-note">
        <div>
          <span className="bespoke-symbol" aria-hidden="true">
            +
          </span>
          <p>
            Have something specific in mind?
            <br />
            <strong>Your drawing. Our craftsmanship.</strong>
          </p>
        </div>
        <Link to="/contact#quote" className="text-link">
          Request a quote <Arrow />
        </Link>
      </div>
      {selected && (
        <dialog
          ref={dialogRef}
          className="product-dialog"
          onCancel={() => setSelected(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          aria-labelledby="product-dialog-title"
        >
          <div className="product-dialog-inner">
            <button
              type="button"
              className="dialog-close"
              onClick={() => setSelected(null)}
              aria-label="Close product details"
              autoFocus
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="dialog-image">
              <img src={selected.image} alt={selected.title} />
            </div>
            <div className="dialog-copy">
              <p className="eyebrow">Made with purpose / JKM</p>
              <h2 id="product-dialog-title">{selected.title}</h2>
              <p>{selected.detail}</p>
              <div className="dialog-spec">
                <span>We fabricate</span>
                <strong>{selected.kind}</strong>
              </div>
              <div className="dialog-spec">
                <span>Application</span>
                <strong>{selected.category}</strong>
              </div>
              <div className="dialog-spec">
                <span>Dimensions & cut-outs</span>
                <strong>To your drawing or sample</strong>
              </div>
              <div className="dialog-spec">
                <span>Material, finish & quantity</span>
                <strong>Confirmed with your quote</strong>
              </div>
              <Link
                className="button button-primary"
                to={`/contact?product=${encodeURIComponent(selected.title)}#quote`}
              >
                Request a quote <Arrow />
              </Link>
              <small>
                Product photographs show example applications and configurations. Enquiries are for
                metal cabinets and fabrication.
              </small>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
