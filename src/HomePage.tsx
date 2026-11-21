import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import logo from "./assets/logo.png";
import factory from "./assets/factory.webp";
import ProductCollection from "./components/ProductCollection";
import CountUp from "./components/CountUp";

type IconProps = { className?: string };

function Arrow({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function ServiceIcon({ children }: { children: ReactNode }) {
  return <div className="service-icon">{children}</div>;
}

const services = [
  {
    number: "01",
    title: "Stabilizer Cabinets",
    text: "Precision-built A.C. voltage stabilizer cabinets engineered for reliable regulation and protection.",
    icon: (
      <>
        <path d="M6 3h12v18H6z" />
        <path d="M9 7h6M9 11h6M9 16h2" />
      </>
    ),
  },
  {
    number: "02",
    title: "Inverter Cabinets",
    text: "Safe, durable enclosures for home, bus and commercial inverter systems, made to perform.",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="1" />
        <path d="M8 12h3l2-4 3 8 2-4h2" />
      </>
    ),
  },
  {
    number: "03",
    title: "CCTV Components",
    text: "Secure enclosures for POE switches, media converters, DVRs and mission-critical equipment.",
    icon: (
      <>
        <path d="M4 8h16v11H4zM7 8V5h10v3" />
        <path d="M8 13h1M12 13h1M16 13h1" />
      </>
    ),
  },
  {
    number: "04",
    title: "Television Components",
    text: "Durable stands and cabinets for LED TVs, set-top boxes, amplifiers and FM systems.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="13" rx="1" />
        <path d="M9 22h6M12 18v4" />
      </>
    ),
  },
  {
    number: "05",
    title: "Electricity Panels",
    text: "Robust electric panel and MCB boxes for secure, efficient housing of electrical components.",
    icon: (
      <>
        <path d="M5 3h14v18H5z" />
        <path d="M12 7l-3 5h3l-1 5 4-6h-3z" />
      </>
    ),
  },
  {
    number: "06",
    title: "Custom Metalwork",
    text: "Made-to-brief panels, housings and components, from your drawing or sample to a finished part.",
    icon: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
  },
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash === "#quote") {
      navigate("/contact#quote", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" },
    );

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const inView =
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 60 &&
        rect.bottom >= 0;

      if (inView) {
        node.classList.add("revealed");
      } else {
        node.classList.add("reveal-pending");
        observer.observe(node);
      }
    });

    return () => {
      observer.disconnect();
      nodes.forEach((node) => node.classList.remove("reveal-pending"));
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a className="skip-link" href="#products">
        Skip to products
      </a>
      <header className="site-header">
        <a href="#home" className="brand" aria-label="J.K. Metal Works home">
          <img src={logo} alt="J.K. Metal Works" />
        </a>
        <nav className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#products" onClick={closeMenu}>
            Products
          </a>
          <Link className="nav-contact" to="/contact#quote" onClick={closeMenu}>
            Request a quote <Arrow />
          </Link>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span /> Precision. In every detail.
          </p>
          <h1>
            Built to protect.
            <br />
            <em>Made to last.</em>
          </h1>
          <p className="hero-copy">
            High-performance metal enclosures shaped by three decades of expertise, exacting
            standards and a commitment to dependable craft.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/contact#quote">
              Request a quote <Arrow />
            </Link>
            <a className="text-link light" href="#products">
              Explore products <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-stats" aria-label="Company highlights">
          <div>
            <strong>
              <CountUp end={28} suffix="+" duration={1800} delay={300} />
            </strong>
            <span>Years of expertise</span>
          </div>
          <div>
            <strong>
              <CountUp end={8000} separator="," duration={2200} delay={450} />
            </strong>
            <span>Sq. ft. facility</span>
          </div>
          <div>
            <strong className="stat-badge">Pan-India</strong>
            <span>Supplier support</span>
          </div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to introduction">
          <span />
        </a>
      </section>

      <div
        className="craft-ribbon"
        aria-label="Precision fabrication, custom enclosures, powder coating, made in India"
      >
        <div className="craft-ribbon-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy}>
              <span>Precision fabrication</span>
              <i />
              <span>Custom enclosures</span>
              <i />
              <span>Powder coating</span>
              <i />
              <span>Made in India</span>
              <i />
            </div>
          ))}
        </div>
      </div>

      <section className="intro section" id="about">
        <div className="section-label" data-reveal>
          <span>01</span> Who we are
        </div>
        <div className="intro-grid">
          <h2 data-reveal>
            We turn sheet metal into <em>lasting confidence.</em>
          </h2>
          <div className="intro-copy" data-reveal>
            <p>
              Established in 1997 by Matloob Ahmed, J.K. Metal Works brings over 28 years of
              expertise to sheet metal fabrication, powder coating and cabinet production.
            </p>
            <p>
              From our advanced Ghaziabad facility, every enclosure is designed, formed, finished
              and inspected with one purpose: uncompromising reliability.
            </p>
            <a className="text-link" href="#capabilities">
              Inside our facility <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading">
          <div>
            <div className="section-label" data-reveal>
              <span>02</span> Capabilities
            </div>
            <h2 data-reveal>
              Engineered for
              <br />
              <em>every application.</em>
            </h2>
          </div>
          <p data-reveal>
            Tailored fabrication solutions, designed around your product and built to endure
            real-world demands.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.title}
              data-reveal
              style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <span className="service-number">{service.number}</span>
              <ServiceIcon>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <g
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {service.icon}
                  </g>
                </svg>
              </ServiceIcon>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link
                to={`/contact?product=${encodeURIComponent(service.title)}#quote`}
                aria-label={`Request a quote for ${service.title}`}
              >
                <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <ProductCollection />

      <section className="process-section section">
        <div className="section-heading">
          <div>
            <div className="section-label light-label" data-reveal>
              <span>Our approach</span> Considered at every stage
            </div>
            <h2 data-reveal>
              Not just manufactured.
              <br />
              <em>Meticulously made.</em>
            </h2>
          </div>
          <p data-reveal>
            One team. An integrated facility. Attention to every detail, from your first idea to a
            finished enclosure.
          </p>
        </div>
        <div className="process-grid">
          {[
            [
              "01",
              "Understand",
              "Your application, dimensions and drawings. A clear brief is where precision begins.",
            ],
            [
              "02",
              "Form",
              "Sheet metal is cut, punched, formed and welded around your component layout.",
            ],
            [
              "03",
              "Finish",
              "Surface preparation and powder coating bring the final look and protection together.",
            ],
            [
              "04",
              "Inspect",
              "A considered check of the fit, finish and fabrication before the work leaves our floor.",
            ],
          ].map(([number, title, text], index) => (
            <article
              key={number}
              data-reveal
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="capability" id="capabilities">
        <div className="capability-media" data-reveal>
          <img src={factory} alt="J.K. Metal Works manufacturing facility in Ghaziabad" />
          <span>Ghaziabad, India</span>
        </div>
        <div className="capability-content">
          <div className="section-label light-label" data-reveal>
            <span>04</span> Built in-house
          </div>
          <h2 data-reveal>
            Technology meets
            <br />
            <em>craftsmanship.</em>
          </h2>
          <p data-reveal>
            Our integrated facility brings forming, phosphating, welding, powder coating and quality
            control under one roof—giving us total command over every detail.
          </p>
          <div className="equipment-list" data-reveal>
            <div>
              <strong>08</strong>
              <span>Tank phosphating station</span>
            </div>
            <div>
              <strong>05+</strong>
              <span>Power press machines</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Powder coating booths</span>
            </div>
            <div>
              <strong>06</strong>
              <span>Spot welding machines</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial section" aria-labelledby="testimonials-heading">
        <div className="section-label centered" data-reveal>
          <span>05</span> Client confidence
        </div>
        <h2 id="testimonials-heading" data-reveal>
          Client <em>Testimonials</em>
        </h2>
        <p className="testimonial-intro" data-reveal>
          Hear from our satisfied clients across India.
        </p>
        <div className="testimonial-grid">
          {[
            {
              name: "Gurpreet Singh",
              company: "DataVision",
              initials: "GS",
              quote:
                "JK Metal Works consistently delivers high-quality stabilizer cabinets. Their attention to detail is impressive.",
            },
            {
              name: "Umang Aggarwal",
              company: "Blue-S-Gaurd",
              initials: "UA",
              quote:
                "The powder coating on the cabinets is durable and looks premium. We trust JK Metal Works for all our enclosure needs.",
            },
            {
              name: "Manish Gupta",
              company: "LZEN Electronics",
              initials: "MG",
              quote:
                "We received our order on time and the cabinets fit our specifications exactly. Excellent service and support!",
            },
          ].map((client, index) => (
            <figure
              className="testimonial-card"
              key={client.name}
              data-reveal
              style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <span className="testimonial-quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>“{client.quote}”</blockquote>
              <figcaption className="client">
                <span aria-hidden="true">{client.initials}</span>
                <div>
                  <strong>{client.name}</strong>
                  <small>{client.company}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-top">
          <div>
            <div className="section-label light-label" data-reveal>
              <span>06</span> Start a conversation
            </div>
            <h2 data-reveal>
              Let’s build something
              <br />
              <em>exceptional.</em>
            </h2>
          </div>
          <Link className="button quote-cta" to="/contact#quote">
            Request a quote <Arrow />
          </Link>
        </div>
        <div className="contact-details">
          <div>
            <span>Factory</span>
            <p>
              G-548, Phase II, UPSIDC
              <br />
              Main M.G. Road, Ghaziabad, U.P.
            </p>
          </div>
          <div>
            <span>Head office</span>
            <p>
              23/11, 790, Street No. 04
              <br />
              Chauhan Banger, Delhi 110053
            </p>
          </div>
          <div>
            <span>Contact</span>
            <a href="mailto:Jkmetalworks@gmail.com">Jkmetalworks@gmail.com</a>
            <a href="tel:+919718386438">+91 97183 86438</a>
          </div>
        </div>
      </section>

      <footer>
        <img src={logo} alt="J.K. Metal Works" />
        <p>Precision craftsmanship for reliable power protection.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#products">Products</a>
          <Link to="/contact#quote">Request a quote</Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} J.K. Metal Works</span>
          <span>Built with precision in India</span>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
