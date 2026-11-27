/**
 * Normalize an optional build-time Git revision for public provenance metadata.
 *
 * The value is intentionally absent when the build environment does not supply it.
 * A supplied value must identify one full Git commit SHA; abbreviated SHAs and
 * non-hex labels are rejected so the marker cannot imply stronger provenance
 * than the build input actually establishes.
 *
 * @param {string | undefined} value
 * @returns {string | null}
 */
export function normalizeBuildRevision(value) {
  if (value === undefined || value.trim() === "") return null;

  const normalized = value.trim().toLowerCase();
  if (!/^[0-9a-f]{40}$/.test(normalized)) {
    throw new Error("UI_GERHANA_REVISION must be a full 40-character hexadecimal commit SHA.");
  }

  return normalized;
}
