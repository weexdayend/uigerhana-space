import assert from "node:assert/strict";
import test from "node:test";
import { normalizeBuildRevision } from "../src/lib/build-revision.js";

test("does not emit a revision marker when no build revision is supplied", () => {
  assert.equal(normalizeBuildRevision(undefined), null);
  assert.equal(normalizeBuildRevision(""), null);
  assert.equal(normalizeBuildRevision("   "), null);
});

test("normalizes a full commit SHA to lowercase", () => {
  const revision = "A".repeat(40);
  assert.equal(normalizeBuildRevision(revision), "a".repeat(40));
  assert.equal(normalizeBuildRevision("  " + revision + "\n"), "a".repeat(40));
});

test("rejects abbreviated commit SHAs", () => {
  assert.throws(
    () => normalizeBuildRevision("a".repeat(12)),
    /full 40-character hexadecimal commit SHA/
  );
});

test("rejects non-hex or descriptive revision labels", () => {
  for (const value of ["g".repeat(40), "main", "unknown", "a".repeat(39) + "z"]) {
    assert.throws(
      () => normalizeBuildRevision(value),
      /full 40-character hexadecimal commit SHA/
    );
  }
});
