const loader = document.getElementById("loader");
const cursorGlow = document.getElementById("cursorGlow");
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("siteHeader");
const gameGrid = document.getElementById("gameGrid");
const projectCarousel = document.getElementById("projectCarousel");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

const fallbackProjects = [];

const fallbackGames = [
  {
    title: "[SOUNDS] +1 Squish a Dumpling Escape!",
    url: "https://www.roblox.com/games/135807790398223/1-Squish-a-Dumpling-Escape",
    icon: "media/dumpling-icon.jpg",
    thumbnail: "media/dumpling-thumbnail.jpg",
    description: "A Roblox speed / obby experience where players squish dumplings, gain speed, race friends, unlock multipliers, and escape through a cozy dumpling-themed world."
  }
];

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 450);
});

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".nav a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-48% 0px -48% 0px" });

document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[character]));
}

function titleFromFileName(path) {
  const file = path.split("/").pop() || "Build";
  return file
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function placeholderImage(title) {
  const safeTitle = escapeHtml(title).slice(0, 42);
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#ff6a35"/>
          <stop offset="0.52" stop-color="#171d29"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0.3"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="#080b10"/>
      <circle cx="170" cy="135" r="360" fill="#ff6a35" opacity="0.28"/>
      <circle cx="1060" cy="700" r="420" fill="#5174ff" opacity="0.16"/>
      <rect x="66" y="66" width="1068" height="668" rx="54" fill="url(#g)" opacity="0.8"/>
      <text x="92" y="684" fill="#ffffff" font-family="Inter, Arial" font-size="72" font-weight="900">${safeTitle}</text>
    </svg>`)} `;
}

function normalizeProject(project, index) {
  const image = project.image || project.src || "";
  const title = project.title || titleFromFileName(image) || `Build ${index + 1}`;

  return {
    title,
    image: image || placeholderImage(title)
  };
}

function renderProjects(projects) {
  const normalized = projects.map(normalizeProject).filter((project) => project.image);
  projectCarousel.innerHTML = "";

  if (!normalized.length) {
    projectCarousel.innerHTML = `<div class="empty-projects">No build images added yet.</div>`;
    return;
  }

  normalized.forEach((project) => {
    const slide = document.createElement("article");
    slide.className = "project-slide";
    slide.innerHTML = `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy">`;
    slide.addEventListener("click", () => openImage(project.image));
    projectCarousel.appendChild(slide);
  });
}

function renderGames(games) {
  gameGrid.innerHTML = "";

  games.forEach((game) => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.innerHTML = `
      <div class="game-card-inner">
        <a class="game-thumbnail" href="${escapeHtml(game.url)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(game.title)} on Roblox">
          <img src="${escapeHtml(game.thumbnail)}" alt="${escapeHtml(game.title)} thumbnail" loading="lazy">
        </a>
        <div class="game-info">
          <div class="game-top">
            <a class="game-icon" href="${escapeHtml(game.url)}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(game.title)} on Roblox">
              <img src="${escapeHtml(game.icon)}" alt="${escapeHtml(game.title)} icon" loading="lazy">
            </a>
            <div>
              <p class="game-kicker">Roblox Experience</p>
              <h3>${escapeHtml(game.title)}</h3>
            </div>
          </div>
          <p>${escapeHtml(game.description)}</p>
          <div class="game-actions">
            <a href="${escapeHtml(game.url)}" target="_blank" rel="noreferrer">Open on Roblox →</a>
          </div>
        </div>
      </div>
    `;
    gameGrid.appendChild(card);
  });
}

function openImage(src) {
  modalImage.src = src;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

carouselPrev.addEventListener("click", () => {
  projectCarousel.scrollBy({ left: -projectCarousel.clientWidth * 0.78, behavior: "smooth" });
});

carouselNext.addEventListener("click", () => {
  projectCarousel.scrollBy({ left: projectCarousel.clientWidth * 0.78, behavior: "smooth" });
});

async function loadSiteSettings() {
  try {
    const response = await fetch("data/site.json", { cache: "no-store" });
    if (!response.ok) return;
    const site = await response.json();

    document.querySelectorAll("[data-site]").forEach((element) => {
      const key = element.dataset.site;
      if (site[key]) element.textContent = site[key];
    });

    const email = site.email || "philfromqc@gmail.com";
    const robloxUrl = site.robloxUrl || "https://www.roblox.com/users/8330323665/profile";
    document.getElementById("contactEmail").href = `mailto:${email}`;
    document.getElementById("robloxProfile").href = robloxUrl;
    document.getElementById("contactRoblox").href = robloxUrl;
  } catch (error) {
    console.warn("Could not load site settings.", error);
  }
}

async function loadProjects() {
  let projects = fallbackProjects;

  try {
    const response = await fetch("data/projects.json", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      const loaded = Array.isArray(data) ? data : data.projects;
      if (Array.isArray(loaded)) projects = loaded;
    }
  } catch (error) {
    console.warn("Could not load projects.json. Showing an empty carousel.", error);
  }

  renderProjects(projects);
}

async function loadGames() {
  let games = fallbackGames;

  try {
    const response = await fetch("data/games.json", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      const loaded = Array.isArray(data) ? data : data.games;
      if (Array.isArray(loaded) && loaded.length) games = loaded;
    }
  } catch (error) {
    console.warn("Could not load games.json. Showing fallback game.", error);
  }

  renderGames(games);
}

loadSiteSettings();
loadProjects();
loadGames();
