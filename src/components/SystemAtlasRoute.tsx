"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SystemAtlasRoute() {
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>(
        "[data-atlas-route-path]",
        visual
      );
      const waypoints = gsap.utils.toArray<SVGCircleElement>(
        "[data-atlas-waypoint]",
        visual
      );

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      gsap.set(waypoints, {
        autoAlpha: 0,
        scale: 0.72,
        transformOrigin: "50% 50%",
      });

      gsap.timeline({ defaults: { ease: "power2.out" } })
        .to(paths, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut",
        })
        .to(
          waypoints,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.22,
            stagger: 0.1,
          },
          "-=0.18"
        );
    }, visual);

    return () => context.revert();
  }, []);

  return (
    <div ref={visualRef} data-hero-art className="hero-atlas__visual" aria-hidden="true">
      <svg
        className="hero-atlas__route hero-atlas__route--desktop"
        viewBox="0 0 560 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <path
          data-atlas-route-path
          d="M 48 72 C 126 24 150 145 232 155 S 341 118 372 228 S 306 344 446 418"
          stroke="#86A89B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle data-atlas-waypoint cx="48" cy="72" r="5.5" fill="#86A89B" stroke="#10191B" strokeWidth="2" />
        <circle data-atlas-waypoint cx="232" cy="155" r="5.5" fill="#86A89B" stroke="#10191B" strokeWidth="2" />
        <circle data-atlas-waypoint cx="372" cy="228" r="5.5" fill="#86A89B" stroke="#10191B" strokeWidth="2" />
        <circle data-atlas-waypoint cx="446" cy="418" r="8" fill="#D99B68" stroke="#10191B" strokeWidth="2" />
        <g className="hero-atlas__route-labels">
          <text x="48" y="48">UNDERSTAND</text>
          <text x="232" y="132">SHAPE</text>
          <text x="372" y="204">ENGINEER</text>
          <text x="446" y="454" textAnchor="end" className="is-terminal">OPERATE</text>
        </g>
      </svg>

      <svg
        className="hero-atlas__route hero-atlas__route--mobile"
        viewBox="0 0 360 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <path
          data-atlas-route-path
          d="M 32 76 C 78 36 110 89 162 106 S 238 78 262 130 S 287 176 328 178"
          stroke="#86A89B"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle data-atlas-waypoint cx="32" cy="76" r="4.5" fill="#86A89B" stroke="#10191B" strokeWidth="1.5" />
        <circle data-atlas-waypoint cx="162" cy="106" r="4.5" fill="#86A89B" stroke="#10191B" strokeWidth="1.5" />
        <circle data-atlas-waypoint cx="262" cy="130" r="4.5" fill="#86A89B" stroke="#10191B" strokeWidth="1.5" />
        <circle data-atlas-waypoint cx="328" cy="178" r="6.5" fill="#D99B68" stroke="#10191B" strokeWidth="1.5" />
        <g className="hero-atlas__route-labels">
          <text x="24" y="35">UNDERSTAND</text>
          <text x="162" y="86" textAnchor="middle">SHAPE</text>
          <text x="250" y="108">ENGINEER</text>
          <text x="336" y="207" textAnchor="end" className="is-terminal">OPERATE</text>
        </g>
      </svg>
    </div>
  );
}
