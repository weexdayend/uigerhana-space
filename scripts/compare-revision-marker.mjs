const FULL_COMMIT_SHA = /^[0-9a-f]{40}$/;

/**
 * Compares a served revision marker with the exact commit used for the audit.
 * Abbreviated SHAs are deliberately rejected: provenance requires all 40 hex
 * characters, not an unambiguous prefix.
 */
export function compareRevisionMarker(marker, expectedCommit) {
  const expected = typeof expectedCommit === "string"
    ? expectedCommit.trim().toLowerCase()
    : "";

  if (!FULL_COMMIT_SHA.test(expected)) {
    throw new TypeError("expectedCommit must be a full 40-character hexadecimal SHA.");
  }

  if (marker === null || marker === undefined) return "not-exposed";
  if (typeof marker !== "string") return "invalid-marker";

  const value = marker.trim().toLowerCase();
  if (!FULL_COMMIT_SHA.test(value)) return "invalid-marker";

  return value === expected ? "match" : "mismatch";
}

/**
 * A route may expose the marker through an HTTP header, one or more meta tags,
 * or both. Every exposed value must independently match the expected SHA.
 * Missing routes remain not-exposed and conflicting values fail closed.
 */
export function compareRevisionMarkers(markers, expectedCommit) {
  if (!Array.isArray(markers)) {
    throw new TypeError("markers must be an array of marker values.");
  }
  if (markers.length === 0) return "not-exposed";

  const states = markers.map((marker) => compareRevisionMarker(marker, expectedCommit));
  if (states.includes("invalid-marker") || states.includes("not-exposed")) {
    return "invalid-marker";
  }
  if (states.includes("mismatch")) return "mismatch";
  return "match";
}
