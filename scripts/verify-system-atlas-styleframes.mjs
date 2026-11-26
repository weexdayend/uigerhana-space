import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../docs/styleframes/system-atlas/connected");

const requiredText = {
  "home-desktop.svg": [
    "Start with the workflow",
    "Make complexity legible",
    "Build AI with context",
    "Think beyond the interface",
    "What Leaves When an Engineer Leaves",
    "Why Payment Gateways Don’t Solve Enterprise Reconciliation",
    "The Hidden Layer Every AI Agent Needs: Canonical Data Architecture",
  ],
  "home-tablet.svg": [
    "Co-Founder & Lead Software Engineer",
    "Information Systems & Cybersecurity Engineer",
    "What Leaves When an Engineer Leaves",
    "Why Payment Gateways Don’t Solve Enterprise Reconciliation",
    "The Hidden Layer Every AI Agent Needs: Canonical Data Architecture",
  ],
  "home-mobile.svg": [
    "UI/UX research",
    "Go · Python",
    "LLM integration",
    "Hydropower data extraction and reporting.",
    "Municipal waste-management delivery and F&B POS architecture.",
    "AI-assisted reporting and transaction intelligence.",
    "SNMP monitoring, operational alerts, and DLP.",
    "What Leaves When an Engineer Leaves",
    "Why Payment Gateways Don’t Solve Enterprise Reconciliation",
    "The Hidden Layer Every AI Agent Needs: Canonical Data Architecture",
  ],
  "work-index.svg": [
    "AI-assisted reporting, intelligent assistants, and extraction workflows turn unstructured operational and financial information into usable data.",
    "Structured data pipelines, canonical modeling, monitoring, and reporting systems for business and operational workflows.",
    "Software for public services, distribution, logistics, point-of-sale operations, ERP, and internal business processes.",
    "Infrastructure reporting, SNMP-based network monitoring, operational alerts, and policy-driven information-protection systems.",
  ],
  "motion-storyboard.svg": [
    "Vertical settle in reading order.",
    "Draws from origin to destination.",
    "Each waypoint appears as the route reaches it.",
    "Simple reveal as content enters view.",
  ],
};

const forbiddenFragments = {
  "home-desktop.svg": [
    "rt with the workflow",
    "e complexity legible",
    "uild AI with context",
    "beyond the interface",
    "gineering decisions live only in people's heads.",
    "ve Enterprise Reconciliation",
    "ing a payment and understanding what it settles.",
    "ation gives systems consistent business context.",
  ],
  "home-tablet.svg": [
    "er & Lead Software Engineer",
    "onal platforms, and business applications.",
    "ms & Cybersecurity Engineer",
    "urity, network monitoring, and automation.",
    "es When an Engineer Leaves",
    "anonical Data Architecture",
  ],
  "home-mobile.svg": [
    "ydropower data extraction and reporting.",
    "ement delivery and F&B POS architecture.",
    "reporting and transaction intelligence.",
    "monitoring, operational alerts, and DLP.",
    "aints before choosing an implementation.",
    "data models, and thoughtful interfaces.",
    "s, governance, and explainable behavior.",
    "toring, deployment, and maintainability.",
    "ves When an Engineer Leaves",
    "e Enterprise Reconciliation",
    "a gives systems consistent business context.",
  ],
  "work-index.svg": [
    "ed operational and financial information into usable data.",
    "reporting systems for business and operational workflows.",
    "-of-sale operations, ERP, and internal business processes.",
    "alerts, and policy-driven information-protection systems.",
  ],
  "motion-storyboard.svg": [
    "ertical settle in reading order.",
    "raws from origin to destination.",
    "aypoint as the route reaches it.",
    "r reveal as content enters view.",
  ],
};

function visibleTextNodes(svg) {
  return [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)]
    .map(function (match) {
      return match[1]
        .replace(/<tspan\b[^>]*>/g, " ")
        .replace(/<\/tspan>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    })
    .filter(Boolean);
}

function assertBalancedSvgTags(source, filename) {
  const stack = [];
  const tags = source.match(/<\/?[A-Za-z][^>]*>/g) || [];
  for (const tag of tags) {
    const closing = /^<\//.test(tag);
    const selfClosing = /\/>$/.test(tag);
    const nameMatch = tag.match(/^<\/?([A-Za-z][\w:-]*)/);
    const name = nameMatch && nameMatch[1];
    assert.ok(name, filename + ": malformed tag " + tag);
    if (closing) {
      const open = stack.pop();
      assert.equal(open, name, filename + ": mismatched closing tag " + tag + "; open tag was " + open);
    } else if (!selfClosing) {
      stack.push(name);
    }
  }
  assert.deepEqual(stack, [], filename + ": unclosed SVG tags: " + stack.join(", "));
}

const allSvgFiles = [
  "home-desktop.svg",
  "home-tablet.svg",
  "home-mobile.svg",
  "work-index.svg",
  "case-study.svg",
  "resume.svg",
  "component-library.svg",
  "interaction-states-desktop.svg",
  "interaction-states-mobile.svg",
  "motion-storyboard.svg",
];

const documentedSvgColors = new Set([
  "#10191B", "#172426", "#1E2D30", "#F1F0E8", "#B4BFB8",
  "#81908A", "#86A89B", "#D99B68", "#3C4A49", "#53645E",
  "#E8E6DC", "#C6C8BE", "#DFDED5", "#F8F6F0", "#C98B5D", "#E2E1D8",
]);

const scopedSvgColors = new Map([
  ["#DFDED5", new Set(["resume.svg"])],
  ["#F8F6F0", new Set(["resume.svg"])],
  ["#C98B5D", new Set(["interaction-states-desktop.svg"])],
  ["#E2E1D8", new Set(["interaction-states-desktop.svg"])],
]);

const paletteTextContracts = {
  "work-index.svg": [
    { text: "02 / WORK DOMAINS", fill: "#53645E", background: "#E8E6DC" },
    { text: "01", fill: "#53645E", background: "#F1F0E8" },
    { text: "02", fill: "#53645E", background: "#F1F0E8" },
    { text: "03", fill: "#53645E", background: "#F1F0E8" },
    { text: "04", fill: "#53645E", background: "#F1F0E8" },
  ],
  "case-study.svg": [
    { text: "STATUS · IN PROGRESS", fill: "#53645E", background: "#F1F0E8" },
  ],
  "resume.svg": [
    { text: "2021 — PRESENT", fill: "#53645E", background: "#F8F6F0" },
    { text: "2017 — PRESENT", fill: "#53645E", background: "#F8F6F0" },
  ],
};

function textElements(source) {
  return [...source.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)].map(function (match) {
    const text = match[2]
      .replace(/<tspan\b[^>]*>/g, " ")
      .replace(/<\/tspan>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
    const fill = match[1].match(/\bfill="(#[0-9a-fA-F]{6})"/);
    return { text, fill: fill ? fill[1].toUpperCase() : null };
  });
}

function relativeLuminance(hex) {
  const channels = [1, 3, 5].map(function (offset) {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground, background) {
  const values = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort(function (a, b) { return b - a; });
  return (values[0] + 0.05) / (values[1] + 0.05);
}

let checks = 0;
for (const filename of allSvgFiles) {
  const source = await readFile(path.join(root, filename), "utf8");
  assert.match(source, /<svg\b[^>]*viewBox=/, filename + ": missing SVG root/viewBox");
  assert.match(source, /<title\b[^>]*>[\s\S]*?<\/title>/, filename + ": missing title metadata");
  assert.match(source, /<desc\b[^>]*>[\s\S]*?<\/desc>/, filename + ": missing description metadata");
  assert.match(source, /<\/svg>\s*$/, filename + ": missing SVG closing tag");
  assertBalancedSvgTags(source, filename);
  checks += 5;

  const usedColors = new Set(
    [...source.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{6})"/g)].map(function (match) {
      return match[1].toUpperCase();
    })
  );
  for (const color of usedColors) {
    assert.ok(documentedSvgColors.has(color), filename + ": undocumented authored color " + color);
    const allowedFiles = scopedSvgColors.get(color);
    if (allowedFiles) {
      assert.ok(
        allowedFiles.has(filename),
        filename + ": " + color + " is restricted to " + [...allowedFiles].join(", ")
      );
    }
    checks += 1;
  }

  for (const contract of paletteTextContracts[filename] || []) {
    const node = textElements(source).find(function (element) {
      return element.text === contract.text;
    });
    assert.ok(node, filename + ": missing palette-governed text node: " + contract.text);
    assert.equal(node.fill, contract.fill, filename + ": incorrect foreground for " + contract.text);
    const ratio = contrastRatio(contract.fill, contract.background);
    assert.ok(ratio >= 4.5, filename + ": " + contract.text + " contrast is " + ratio.toFixed(2) + ":1");
    checks += 3;
  }
}

for (const [filename, required] of Object.entries(requiredText)) {
  const source = await readFile(path.join(root, filename), "utf8");
  const nodes = visibleTextNodes(source);
  const flattened = nodes.join("\n");
  for (const expected of required) {
    assert.ok(flattened.includes(expected), filename + ": missing complete copy: " + expected);
    checks += 1;
  }
  for (const fragment of forbiddenFragments[filename] || []) {
    assert.ok(!nodes.includes(fragment), filename + ": found known truncated text node: " + fragment);
    checks += 1;
  }
}

process.stdout.write(
  "System Atlas styleframe integrity passed: " + allSvgFiles.length +
  " SVG files, " + checks + " assertions.\n"
);
