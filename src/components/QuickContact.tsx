import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.3 3.5 10 7.6 8.2 9.8c1.3 2.7 3.3 4.7 6 6l2.2-1.8 4.1 2.7-.8 3.2c-.2.8-1 1.4-1.8 1.3C10 20.4 3.6 14 2.8 6.1c-.1-.8.5-1.6 1.3-1.8l3.2-.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.6 11.6a8.6 8.6 0 0 1-12.7 7.6L3 20.5l1.3-4.7A8.6 8.6 0 1 1 20.6 11.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 7.6c.3-.3.7-.2.9.1l1.1 2c.1.3.1.6-.1.8l-.8.9c.7 1.5 1.8 2.6 3.3 3.3l.9-.8c.2-.2.5-.2.8-.1l2 1.1c.3.2.4.6.1.9-.6.8-1.5 1.2-2.4 1-4.1-.8-7.3-4-8.1-8.1-.2-.9.3-1.8 1-2.4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5h16v12H9l-5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function QuickContact() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  return (
    <aside
      ref={containerRef}
      className="floating-contact"
      aria-label="Quick contact"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`contact-toggle ${open ? "is-open" : ""}`}
        aria-expanded={open}
        aria-controls="quick-contact-options"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : (
          <MessageIcon />
        )}
        <span>{open ? "Close" : "Contact"}</span>
      </button>
      <div id="quick-contact-options" className="quick-contact-panel" hidden={!open}>
        <p className="eyebrow">A good project starts here</p>
        <h2>Let’s talk metal.</h2>
        <p>Choose the way that works for you.</p>
        <Link
          className="quick-contact-option quote-option"
          to="/contact#quote"
          onClick={() => {
            setOpen(false);
            document.getElementById("quote")?.scrollIntoView();
          }}
        >
          <MessageIcon />
          <span>
            <strong>Request a quote</strong>
            <small>Tell us what you’re making</small>
          </span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 15 15 5M5 5h10v10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </Link>
        <a className="quick-contact-option" href="tel:+919718386438" onClick={() => setOpen(false)}>
          <PhoneIcon />
          <span>
            <strong>Call our team</strong>
            <small>+91 97183 86438</small>
          </span>
        </a>
        <a
          className="quick-contact-option"
          href="https://wa.me/919718386438?text=Hello%20J.K.%20Metal%20Works%2C%20I%20would%20like%20a%20quote%20for%20metal%20fabrication."
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          <WhatsAppIcon />
          <span>
            <strong>WhatsApp</strong>
            <small>Discuss your requirements</small>
          </span>
        </a>
      </div>
    </aside>
  );
}
