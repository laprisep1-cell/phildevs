import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const projectsFolder = path.join(root, "projects");
const outputFile = path.join(root, "data", "gallery.json");
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function titleFromFilename(filename) {
  const parsed = path.parse(filename).name;
  return parsed
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function scanProjectsFolder() {
  try {
    const files = await readdir(projectsFolder, { withFileTypes: true });

    return files
      .filter((file) => file.isFile())
      .map((file) => file.name)
      .filter((filename) => imageExtensions.has(path.extname(filename).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((filename) => ({
        title: titleFromFilename(filename),
        src: `projects/${encodeURIComponent(filename)}`
      }));
  } catch {
    return [];
  }
}

const projects = await scanProjectsFolder();

await mkdir(path.join(root, "data"), { recursive: true });
await writeFile(outputFile, JSON.stringify(projects, null, 2) + "\n", "utf8");

console.log(`Generated data/gallery.json with ${projects.length} project image(s).`);
