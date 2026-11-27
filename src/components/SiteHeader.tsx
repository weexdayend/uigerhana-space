"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_META } from "@/data/site";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#writing", label: "Notes" },
];

export function SiteHeader() {
  const [darkBand, setDarkBand] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const evaluateBand = () => {
      const bands = Array.from(document.querySelectorAll<HTMLElement>("[data-band]"));
      const probeY = 49;
      const activeBand = bands.find((band) => {
        const rect = band.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      if (activeBand) setDarkBand(activeBand.dataset.band === "dark");
    };

    evaluateBand();
    window.addEventListener("scroll", evaluateBand, { passive: true });
    window.addEventListener("resize", evaluateBand);

    return () => {
      window.removeEventListener("scroll", evaluateBand);
      window.removeEventListener("resize", evaluateBand);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`atlas-header ${darkBand ? "is-dark" : "is-light"}`}>
      <div className="atlas-header__inner">
        <a
          href="#top"
          aria-label={`${SITE_META.brand} home`}
          className="atlas-header__brand"
        >
          <span className="atlas-header__mark" aria-hidden="true" />
          <span>GERHANA</span>
        </a>

        <nav aria-label="Main navigation" className="atlas-header__nav">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} className="atlas-header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="atlas-header__actions">
          <a href="/cv" className="atlas-header__resume">
            Résumé <span aria-hidden="true">↗</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="atlas-header__menu"
          >
            {menuOpen ? (
              <span className="atlas-header__close" aria-hidden="true">×</span>
            ) : (
              <span className="atlas-header__menu-lines" aria-hidden="true">
                <span />
                <span />
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="atlas-header__mobile-nav"
        >
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu} className="atlas-header__mobile-link">
              {item.label}
            </a>
          ))}
          <a href="/cv" onClick={closeMenu} className="atlas-header__mobile-resume">
            View résumé ↗
          </a>
        </nav>
      )}
    </header>
  );
}
