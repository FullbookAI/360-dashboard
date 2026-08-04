#!/usr/bin/env node
// Turns the local Google Sheets exports into the PII-free aggregate file the
// Job Attribution tab reads.
//
//   npm run data
//
// The raw CSVs contain customer names and phone numbers and are gitignored —
// they must never be committed, because github.com/FullbookAI/360-dashboard is
// a PUBLIC repository. Only src/data/aggregates.json is committed, and it holds
// nothing but counts.
//
// Re-run this after replacing the CSVs with a fresh export, then rebuild.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "src", "data");
const SCAN = "360 Attribution Scan - scan.csv";
const TAG  = "360 Attribution Scan - tag_report.csv";
const OUT  = path.join(dataDir, "aggregates.json");

for (const f of [SCAN, TAG]) {
  if (!fs.existsSync(path.join(dataDir, f))) {
    console.error(`\n  Missing: src/data/${f}`);
    console.error("  Export it from the '360 Attribution Scan' Google Sheet");
    console.error("  (File > Download > CSV, one tab at a time) and re-run.\n");
    process.exit(1);
  }
}

const { buildAttribution, toAggregates, selfCheck } =
  await import(pathToFileURL(path.join(root, "src", "attribution.js")).href);

const model = buildAttribution(
  fs.readFileSync(path.join(dataDir, SCAN), "utf8"),
  fs.readFileSync(path.join(dataDir, TAG), "utf8"),
);
const agg = toAggregates(model);

// Belt and braces: refuse to write if anything resembling a phone number or a
// raw row survived into the aggregate. Cheap insurance against a future edit
// quietly widening what toAggregates returns.
const serialised = JSON.stringify(agg, null, 2);
const phoneLike = serialised.match(/\b\d{10}\b/g);
if (phoneLike) {
  console.error(`\n  ABORTED — ${phoneLike.length} phone-like value(s) found in the aggregate output.`);
  console.error("  toAggregates() is leaking per-row data. Fix that before committing.\n");
  process.exit(1);
}

fs.writeFileSync(OUT, serialised + "\n");

const checks = selfCheck(agg);
const bad = checks.filter(c => !c.ok);
console.log(`\n  Wrote src/data/aggregates.json  (${(serialised.length / 1024).toFixed(1)} KB, no PII)`);
console.log(`  From ${model.scan.length.toLocaleString()} HCP customers and ${model.tag.length} Facebook-tagged contacts`);
console.log(bad.length
  ? `  WARNING: ${bad.length} of ${checks.length} pivot cross-checks FAILED — ${bad.map(b => b.label).join(", ")}\n`
  : `  All ${checks.length} pivot cross-checks match the source workbook\n`);
