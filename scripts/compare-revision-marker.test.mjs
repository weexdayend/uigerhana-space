import assert from "node:assert/strict";
import test from "node:test";

import {
  compareRevisionMarker,
  compareRevisionMarkers,
} from "./compare-revision-marker.mjs";

const expected = "0123456789abcdef0123456789abcdef01234567";
const different = "1123456789abcdef0123456789abcdef01234567";

test("an exact full SHA matches after trimming and case normalization", () => {
  assert.equal(compareRevisionMarker("  " + expected.toUpperCase() + "  ", expected), "match");
});

test("an absent marker remains not-exposed", () => {
  assert.equal(compareRevisionMarker(null, expected), "not-exposed");
  assert.equal(compareRevisionMarker(undefined, expected), "not-exposed");
});

test("an abbreviated SHA is invalid rather than a match", () => {
  assert.equal(compareRevisionMarker(expected.slice(0, 12), expected), "invalid-marker");
  assert.equal(compareRevisionMarker(expected.slice(0, 7), expected), "invalid-marker");
});

test("malformed, overlong, and non-string markers are invalid", () => {
  assert.equal(compareRevisionMarker(expected + "0", expected), "invalid-marker");
  assert.equal(compareRevisionMarker("z".repeat(40), expected), "invalid-marker");
  assert.equal(compareRevisionMarker(123, expected), "invalid-marker");
});

test("a different full SHA is a mismatch", () => {
  assert.equal(compareRevisionMarker(different, expected), "mismatch");
});

test("expected commit must itself be a full SHA", () => {
  assert.throws(
    () => compareRevisionMarker(expected, expected.slice(0, 12)),
    /expectedCommit must be a full 40-character hexadecimal SHA/
  );
});

test("a route is a match only when every exposed marker source agrees", () => {
  assert.equal(compareRevisionMarkers([], expected), "not-exposed");
  assert.equal(compareRevisionMarkers([expected], expected), "match");
  assert.equal(compareRevisionMarkers([expected, expected.toUpperCase()], expected), "match");
  assert.equal(compareRevisionMarkers([expected, different], expected), "mismatch");
  assert.equal(compareRevisionMarkers([expected, expected.slice(0, 12)], expected), "invalid-marker");
  assert.equal(compareRevisionMarkers([expected, ""], expected), "invalid-marker");
});

test("marker collection requires an array", () => {
  assert.throws(
    () => compareRevisionMarkers(expected, expected),
    /markers must be an array/
  );
});
