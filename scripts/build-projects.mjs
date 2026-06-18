import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "data");
const outFile = path.join(dataDir, "projects.json");
const extensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const possibleProjectFolders = ["Project", "projects", "Projects", "project"];

function titleFromFileName(fileName) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getProjectDir() {
  for (const folderName of possibleProjectFolders) {
    const fullPath = path.join(root, folderName);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      return { folderName, fullPath };
    }
  }

  const defaultPath = path.join(root, "Project");
  fs.mkdirSync(defaultPath, { recursive: true });
  return { folderName: "Project", fullPath: defaultPath };
}

function getImages(folderName, dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }))
    .map((entry) => ({
      title: titleFromFileName(entry.name),
      image: `${folderName}/${encodeURIComponent(entry.name)}`
    }));
}

fs.mkdirSync(dataDir, { recursive: true });
const { folderName, fullPath } = getProjectDir();
const projects = getImages(folderName, fullPath);

fs.writeFileSync(outFile, JSON.stringify({ projects }, null, 2) + "\n");
console.log(`Generated ${outFile} with ${projects.length} build image(s) from ${folderName}/.`);
