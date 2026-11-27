import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflow = (name) =>
  readFile(new URL("../.github/workflows/" + name, import.meta.url), "utf8");

test("physical-device workflow uses active GitHub expressions", async () => {
  const source = await workflow("physical-device-acceptance.yml");
  assert.ok(source.includes("ref: ${{ github.sha }}"));
  assert.ok(source.includes("EXPECTED_COMMIT: ${{ inputs.expected_commit }}"));
  assert.ok(!source.includes("\\" + "${{"));
});

test("physical-device workflow binds the checkout to a lowercase full SHA", async () => {
  const source = await workflow("physical-device-acceptance.yml");
  assert.ok(source.includes("grep -Eq '^[a-f0-9]{40}$'"));
  assert.ok(source.includes('actual_commit="$(git rev-parse HEAD)"'));
  assert.ok(source.includes('[ "$actual_commit" != "$EXPECTED_COMMIT" ]'));
});

test("physical-device workflow resolves evidence JSON inside its evidence root", async () => {
  const source = await workflow("physical-device-acceptance.yml");
  assert.ok(source.includes('evidence_root="$(realpath -e evidence/physical-device)"'));
  assert.ok(source.includes('evidence_real="$(realpath -e "$EVIDENCE_FILE")"'));
  assert.ok(source.includes('"$evidence_root"/*.json'));
});

test("physical-device workflow uploads a report named for the selected commit", async () => {
  const source = await workflow("physical-device-acceptance.yml");
  assert.ok(source.includes('REPORT_PATH: ${{ runner.temp }}/physical-device-acceptance-report.json'));
  assert.ok(source.includes('name: physical-device-acceptance-${{ github.sha }}'));
  assert.ok(source.includes('path: ${{ runner.temp }}/physical-device-acceptance-report.json'));
});

test("release evidence gate requires an exact workflow path", async () => {
  const source = await workflow("release-evidence-gate.yml");
  assert.ok(source.includes("and .path == $workflow"));
  assert.ok(!source.includes("startswith($workflow)"));
});

test("release evidence gate downloads artifacts from explicit source run ids", async () => {
  const source = await workflow("release-evidence-gate.yml");
  for (const runInput of [
    "external_audit_run_id",
    "production_audit_run_id",
    "physical_device_audit_run_id",
  ]) {
    assert.ok(source.includes("run-id: ${{ inputs." + runInput + " }}"));
  }
  assert.ok(source.includes("name: external-destination-audit-${{ inputs.expected_commit }}"));
  assert.ok(source.includes("name: production-parity-audit-${{ inputs.expected_commit }}"));
  assert.ok(source.includes("name: physical-device-acceptance-${{ inputs.expected_commit }}"));
});

test("all audit workflows use manual dispatch and read-only permissions", async () => {
  const [external, production, physical, gate] = await Promise.all([
    workflow("external-destination-audit.yml"),
    workflow("production-parity-audit.yml"),
    workflow("physical-device-acceptance.yml"),
    workflow("release-evidence-gate.yml"),
  ]);
  for (const [name, source] of [
    ["external", external],
    ["production", production],
    ["physical", physical],
    ["release gate", gate],
  ]) {
    assert.ok(source.includes("workflow_dispatch:"), name + " must be manually dispatched");
    assert.ok(!source.includes("contents: write"), name + " must not receive contents write");
  }
  assert.ok(external.includes("permissions:\n  contents: read"));
  assert.ok(production.includes("permissions:\n  contents: read\n  deployments: read"));
  assert.ok(physical.includes("permissions:\n  contents: read"));
  assert.ok(gate.includes("permissions:\n  contents: read\n  actions: read"));
});

test("release evidence gate binds source event, completion, outcome, and exact head SHA", async () => {
  const source = await workflow("release-evidence-gate.yml");
  assert.ok(source.includes("(.head_sha | ascii_downcase) == $sha"));
  assert.ok(source.includes('.event == "workflow_dispatch"'));
  assert.ok(source.includes('.status == "completed"'));
  assert.ok(source.includes('(.conclusion == "success" or .conclusion == "failure")'));
});


test("release gate binds report timestamps to each completed source run window", async () => {
  const [gate, evaluator, validator] = await Promise.all([
    workflow("release-evidence-gate.yml"),
    readFile(new URL("./evaluate-release-evidence.mjs", import.meta.url), "utf8"),
    readFile(new URL("./validate-physical-device-evidence.mjs", import.meta.url), "utf8"),
  ]);
  for (const source of ["externalRun", "productionRun", "physicalRun"]) {
    assert.ok(gate.includes("runCreatedAt: $" + source + "[0].created_at"));
    assert.ok(gate.includes("runUpdatedAt: $" + source + "[0].updated_at"));
  }
  assert.ok(evaluator.includes("validateRunTimeProvenance"));
  assert.ok(evaluator.includes("report timestamp must fall within the source workflow run window"));
  assert.ok(evaluator.includes("manifest must be generated."));
  assert.ok(validator.includes("validatedAt: new Date().toISOString()"));
});
