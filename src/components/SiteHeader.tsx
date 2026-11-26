"use client";

import { useEffect, useState } from "react";
import { SITE_META } from "@/data/site";
import { PixelMark } from "@/components/PixelGraphics";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#experience", label: "Experience" },
  { href: "#approach", label: "Approach" },
  { href: "#writing", label: "Writing" },
];

export function SiteHeader() {
  const [darkBand, setDarkBand] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const evaluateBand = () => {
      const bands = Array.from(document.querySelectorAll<HTMLElement>("[data-band]"));
      const probeY = 56;

      for (let i = bands.length - 1; i >= 0; i--) {
        const band = bands[i];
        const rect = band.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          setDarkBand(band.dataset.band === "dark");
          return;
        }
      }
    };

    evaluateBand();
    window.addEventListener("scroll", evaluateBand, { passive: true });
    window.addEventListener("resize", evaluateBand);

    return () => {
      window.removeEventListener("scroll", evaluateBand);
      window.removeEventListener("resize", evaluateBand);
    };
  }, []);

  const surfaceClass = darkBand
    ? "bg-[#0b0e11] text-[#e8e4d8] border-[#e8e4d8]/20"
    : "bg-[#f2efe7] text-[#121518] border-[#121518]/18";

  const borderClass = darkBand
    ? "border-[#e8e4d8]/20"
    : "border-[#121518]/18";

  const ctaClass = darkBand
    ? "bg-[#e8e4d8] text-[#0b0e11] hover:bg-[#f0b765]"
    : "bg-[#0b0e11] text-[#e8e4d8] hover:bg-[#b8680c]";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-200 ${surfaceClass}`}>
      <div className="flex h-[49px] w-full items-stretch justify-between text-sm">
        <a
          href="#top"
          aria-label={`${SITE_META.brand} home`}
          className={`flex shrink-0 items-center gap-2.5 border-r px-4 sm:px-6 ${borderClass}`}
        >
          <PixelMark className="h-4 w-4" />
          <span className="font-pixel text-base font-bold tracking-tight">
            {SITE_META.brand}
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden flex-1 items-stretch md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center border-r px-4 text-sm transition-opacity hover:opacity-65 lg:px-5 ${borderClass}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-stretch">
          <span className={`hidden items-center border-l px-4 text-xs opacity-70 xl:flex ${borderClass}`}>
            {SITE_META.location}
          </span>
          <a
            href="/cv"
            className={`flex items-center px-4 text-sm transition-colors sm:px-5 ${ctaClass}`}
          >
            Résumé ↗
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`flex w-12 cursor-pointer items-center justify-center border-l md:hidden ${borderClass}`}
          >
            <span className="font-mono text-base leading-none" aria-hidden="true">
              {menuOpen ? "×" : "="}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`border-t md:hidden ${borderClass}`}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block border-b px-5 py-3 text-sm ${borderClass}`}
            >
              {item.label}
            </a>
          ))}
          <a href="/cv" onClick={closeMenu} className="block px-5 py-3 text-sm">
            View résumé ↗
          </a>
        </nav>
      )}
    </header>
  );
}
