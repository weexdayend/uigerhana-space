"use client";

import { useEffect, useState } from "react";
import { SITE_META } from "@/data/site";
import { PixelMark } from "@/components/PixelGraphics";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#writing", label: "Notes" },
];

export function SiteHeader() {
  const [darkBand, setDarkBand] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const evaluateBand = () => {
      const bands = Array.from(document.querySelectorAll<HTMLElement>("[data-band]"));
      const probeY = 49;

      for (let index = bands.length - 1; index >= 0; index--) {
        const band = bands[index];
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
    ? "border-[#e8e4d8]/10 bg-[#0b0e11] text-[#e8e4d8]"
    : "border-[#121518]/12 bg-[#f2efe7] text-[#121518]";

  const linkClass = darkBand
    ? "text-[#e8e4d8]/75 hover:text-[#f0b765]"
    : "text-[#121518]/70 hover:text-[#8a5a20]";

  const resumeClass = darkBand
    ? "text-[#f0b765] hover:text-[#ffd18e]"
    : "text-[#8a5a20] hover:text-[#b8680c]";

  const borderClass = darkBand ? "border-[#e8e4d8]/10" : "border-[#121518]/12";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${surfaceClass}`}
    >
      <div className="mx-auto flex h-[49px] w-full max-w-[1680px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          aria-label={`${SITE_META.brand} home`}
          className="flex shrink-0 items-center gap-3"
        >
          <PixelMark className="h-[18px] w-[18px] text-[#f0b765]" />
          <span className="text-[13px] font-semibold tracking-[0.23em]">
            GERHANA
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors duration-200 ${linkClass}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex h-full items-center gap-5">
          <a
            href="/cv"
            className={`hidden items-center gap-2 text-sm transition-colors duration-200 sm:inline-flex ${resumeClass}`}
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center md:hidden ${borderClass}`}
          >
            {menuOpen ? (
              <span className="text-xl leading-none" aria-hidden="true">×</span>
            ) : (
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span className="h-px w-5 bg-current" />
                <span className="h-px w-3 bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`border-t px-5 py-3 md:hidden ${borderClass}`}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`block py-3 text-sm transition-colors ${linkClass}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/cv"
            onClick={closeMenu}
            className={`block py-3 text-sm transition-colors ${resumeClass}`}
          >
            View résumé ↗
          </a>
        </nav>
      )}
    </header>
  );
}
