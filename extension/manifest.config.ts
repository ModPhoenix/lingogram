import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

console.log(`version: ${version}`);

export default defineManifest(async () => ({
  manifest_version: 3,
  name: "Lingogram",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  action: { default_popup: "index.html" },
  content_scripts: [
    {
      js: ["src/content"],
      matches: ["<all_urls>"],
    },
  ],
}));
