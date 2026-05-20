import { access } from "node:fs/promises";

const requiredFiles = ["out/index.html", "out/404.html"];

for (const filePath of requiredFiles) {
  try {
    await access(filePath);
  } catch {
    console.error(`Cloudflare output missing required file: ${filePath}`);
    process.exit(1);
  }
}

console.log("Cloudflare static output validated successfully.");
