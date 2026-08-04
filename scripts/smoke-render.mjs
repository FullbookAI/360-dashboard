#!/usr/bin/env node
// Renders the Job Attribution tab in every control combination and fails if any
// of them throws or comes back suspiciously empty.
//
//   npm run check
//
// Why this exists: `vite build` does no type or property checking, so a rename
// in the aggregate shape (e.g. moving `monthly` under `scopes[...]`) builds
// perfectly and then throws at render, blanking the page. That shipped twice.
// This catches it in about a second.

import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const req = createRequire(path.join(root, "package.json"));
const esbuild = req("esbuild");
const React = req("react");
const { renderToString } = req("react-dom/server");
const Module = req("module");

const built = await esbuild.build({
  entryPoints: [path.join(root, "src/Attribution.jsx")],
  bundle: true, write: false, format: "cjs", platform: "node",
  jsx: "automatic", loader: { ".js": "jsx", ".jsx": "jsx", ".json": "json" },
  external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  logLevel: "silent",
});

const mod = new Module("attribution-smoke");
mod.require = id => req(id);
mod.paths = Module._nodeModulePaths(root);
mod._compile(built.outputFiles[0].text, path.join(root, "attribution-smoke.cjs"));
const Attribution = mod.exports.default;

// Force the component's useState initial values so each combination is rendered.
// Hook order in Attribution(): useMemo(model), useMemo(checks), then
// useState(scope), useState(metric), useState(asTable), useState(tip).
const realUseState = React.useState;
let forced = [], idx = 0;
React.useState = function (init) {
  const v = idx < forced.length ? forced[idx] : init;
  idx++;
  return [v, () => {}];
};

const MIN_HTML = 5000;   // a real render is ~39-60k chars; anything near zero is a blank page
let fails = 0;

for (const scope of ["2026", "all"])
  for (const metric of ["customers", "jobs"])
    for (const asTable of [false, true]) {
      forced = [scope, metric, asTable];
      idx = 0;
      const label = `scope=${scope.padEnd(4)} metric=${metric.padEnd(9)} ${asTable ? "table" : "chart"}`;
      try {
        const html = renderToString(React.createElement(Attribution));
        if (html.length < MIN_HTML) {
          fails++;
          console.log(`  BLANK  ${label} -> only ${html.length} chars`);
        } else {
          console.log(`  ok     ${label} -> ${html.length.toLocaleString()} chars`);
        }
      } catch (e) {
        fails++;
        console.log(`  THREW  ${label} -> ${e.message}`);
      }
    }

React.useState = realUseState;
console.log(fails
  ? `\n  ${fails} of 8 combinations FAILED\n`
  : `\n  All 8 control combinations render\n`);
process.exit(fails ? 1 : 0);
