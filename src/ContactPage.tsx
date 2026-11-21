import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import logo from "./assets/logo.png";
import factory from "./assets/factory.webp";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product")?.slice(0, 150);

  useEffect(() => {
    if (window.location.hash === "#quote") {
      const scrollToQuote = () => {
        const el = document.getElementById("quote");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      };
      scrollToQuote();
      const timer = setTimeout(scrollToQuote, 100);
      return () => clearTimeout(timer);
    }
  }, [product]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello J.K. Metal Works, I would like to request a fabrication quote.",
      "",
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Requirement: ${data.get("service")}`,
      ...(product ? [`Product example: ${product}`] : []),
      `Quantity: ${data.get("quantity") || "To discuss"}`,
      `Dimensions: ${data.get("dimensions") || "To discuss"}`,
      `Preferred finish: ${data.get("finish") || "To discuss"}`,
      "",
      `Project details: ${data.get("message")}`,
    ].join("\n");

    setSubmitted(true);
    window.open(
      `https://wa.me/919718386438?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="contact-page">
      <header className="contact-page-header">
        <Link to="/" className="brand" aria-label="J.K. Metal Works home">
          <img src={logo} alt="J.K. Metal Works" />
        </Link>
        <Link to="/" className="back-home">
          <span>Back to home</span>
          <Arrow />
        </Link>
      </header>

      <section className="contact-hero">
        <div className="contact-hero-image">
          <img src={factory} alt="" />
        </div>
        <div className="contact-hero-copy">
          <p className="eyebrow">
            <span /> Contact J.K. Metal Works
          </p>
          <h1>
            Your next project
            <br />
            <em>starts here.</em>
          </h1>
          <p>
            Tell us what you need. Our team will review your requirements and help shape the right
            fabrication solution.
          </p>
          <div className="contact-hero-meta">
            <div>
              <span>Call us</span>
              <a href="tel:+919718386438">+91 97183 86438</a>
            </div>
            <div>
              <span>Email us</span>
              <a href="mailto:Jkmetalworks@gmail.com">Jkmetalworks@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <section className="enquiry-section" id="quote" aria-labelledby="quote-heading">
        <div className="enquiry-intro">
          <div className="section-label">
            <span>01</span> Request a quote
          </div>
          <h2 id="quote-heading">
            Let’s make it
            <br />
            <em>with precision.</em>
          </h2>
          <p>
            Share your drawing, sample or requirements. Complete the details below, then review and
            send your quote request in WhatsApp. You can share reference files there too.
          </p>
          <ol className="quote-steps">
            <li>
              <span>01</span>
              <div>
                <strong>Tell us what you need</strong>
                <p>Application, quantity and the details you know.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Review in WhatsApp</strong>
                <p>Your request is prepared for you to check and send.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Discuss the right build</strong>
                <p>We confirm the specification before quoting.</p>
              </div>
            </li>
          </ol>
          <div className="response-note">
            <strong>Fast response</strong>
            <span>We usually respond during business hours.</span>
          </div>
        </div>

        <form key={product || "general"} className="enquiry-form" onSubmit={handleSubmit}>
          {product && (
            <div className="quote-product">
              <span>Quote for</span>
              <strong>{product}</strong>
              <small>Metal fabrication / example configuration</small>
            </div>
          )}
          <p className="form-guidance">
            Only fields marked * are required. Unsure about a specification? Leave it blank and
            we’ll discuss it.
          </p>
          <div className="form-row">
            <label>
              <span>Your name *</span>
              <input name="name" type="text" placeholder="Full name" autoComplete="name" required />
            </label>
            <label>
              <span>Company</span>
              <input
                name="company"
                type="text"
                placeholder="Company name"
                autoComplete="organization"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span>Phone number *</span>
              <input
                name="phone"
                type="tel"
                placeholder="+91 00000 00000"
                autoComplete="tel"
                required
              />
            </label>
            <label>
              <span>
                Email address <small>(optional)</small>
              </span>
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
              />
            </label>
          </div>
          <label>
            <span>What do you need? *</span>
            <select name="service" defaultValue="" required>
              <option value="" disabled>
                Select a requirement
              </option>
              <option>Stabilizer cabinets</option>
              <option>Inverter cabinets</option>
              <option>CCTV component cabinets</option>
              <option>Television components</option>
              <option>Electricity panels</option>
              <option>Custom sheet metal fabrication</option>
              <option>Powder coating</option>
              <option>Other requirement</option>
            </select>
          </label>
          <div className="form-row">
            <label>
              <span>
                Quantity <small>(optional)</small>
              </span>
              <input
                name="quantity"
                type="number"
                min="1"
                step="1"
                placeholder="Number of pieces"
              />
            </label>
            <label>
              <span>
                Dimensions <small>(optional)</small>
              </span>
              <input name="dimensions" type="text" placeholder="L × W × H, with units" />
            </label>
          </div>
          <label>
            <span>
              Preferred finish <small>(optional)</small>
            </span>
            <input
              name="finish"
              type="text"
              placeholder="e.g. powder coating, colour, or discuss with us"
            />
          </label>
          <label>
            <span>Project details *</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell us about dimensions, quantity, application, finish, or timeline..."
              defaultValue={
                product
                  ? `I'm interested in the ${product}. Please share a quote for the metal fabrication.`
                  : ""
              }
              required
            />
          </label>
          <button className="form-submit" type="submit">
            <span>{submitted ? "Review again in WhatsApp" : "Request a quote"}</span>
            <Arrow />
          </button>
          <small>Opens WhatsApp for you to review and send. Nothing is sent automatically.</small>
        </form>
      </section>

      <section className="contact-locations">
        <div>
          <span>Factory</span>
          <p>G-548, Phase II, UPSIDC Main M.G. Road, Ghaziabad, U.P.</p>
        </div>
        <div>
          <span>Head office</span>
          <p>23/11, 790, Street No. 04, Chauhan Banger, Delhi 110053</p>
        </div>
        <Link to="/">
          Return home <Arrow />
        </Link>
      </section>
    </main>
  );
}
