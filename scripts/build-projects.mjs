import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const projectsDir = path.join(root, "projects");
const dataDir = path.join(root, "data");
const outFile = path.join(dataDir, "projects.json");
const extensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);

function titleFromFileName(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getImages(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => ({
      title: titleFromFileName(entry.name),
      image: `projects/${entry.name}`
    }));
}

fs.mkdirSync(dataDir, { recursive: true });
const projects = getImages(projectsDir);

if (projects.length) {
  fs.writeFileSync(outFile, JSON.stringify({ projects }, null, 2) + "\n");
  console.log(`Generated ${outFile} with ${projects.length} build image(s).`);
} else {
  console.log("No project images found. Keeping existing data/projects.json as the carousel fallback.");
}
