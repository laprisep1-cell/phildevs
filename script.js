const loader = document.getElementById("loader");
const cursorGlow = document.getElementById("cursorGlow");
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("siteHeader");
const projectGrid = document.getElementById("projectGrid");
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

const fallbackProjects = [
  {
    title: "Medieval Valley Showcase",
    image: "",
    description: "Replace this card by uploading your screenshots into the projects folder.",
    tags: ["showcase", "map", "environment"]
  },
  {
    title: "Stylized Prop Set",
    image: "",
    description: "Use filenames like prop-wooden-crate.png or map-candy-world.png to auto-tag cards.",
    tags: ["prop", "low-poly", "roblox"]
  },
  {
    title: "Lobby Build",
    image: "",
    description: "This site is ready for your real Roblox builds and will look better once you add images.",
    tags: ["map", "lobby", "game-ready"]
  }
];

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 450);
});

window.addEventListener("mousemove", (event) => {
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

function titleFromFileName(path) {
  const file = path.split("/").pop() || "Project";
  return file
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeProject(project, index) {
  const image = project.image || project.src || "";
  const title = project.title || titleFromFileName(image) || `Project ${index + 1}`;
  const rawTags = Array.isArray(project.tags) ? project.tags : [];
  const filenameTags = image.toLowerCase().split(/[-_./ ]+/).filter(Boolean);
  const tags = [...new Set([...rawTags, ...filenameTags].filter((tag) => ["map", "maps", "prop", "props", "showcase", "lobby", "environment", "low", "poly"].includes(tag)))];

  return {
    title,
    image,
    description: project.description || "Roblox build preview focused on clean style, readable layout, and game-ready presentation.",
    tags: tags.length ? tags : ["roblox", "build"]
  };
}

function placeholderGradient(title) {
  const words = title.split(" ").slice(0, 2).join("+");
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#ff6a35"/>
          <stop offset="0.56" stop-color="#111827"/>
          <stop offset="1" stop-color="#5d86ff"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="#080b10"/>
      <circle cx="220" cy="130" r="330" fill="#ff6a35" opacity="0.24"/>
      <circle cx="1040" cy="690" r="410" fill="#5d86ff" opacity="0.18"/>
      <rect x="72" y="72" width="1056" height="656" rx="52" fill="url(#g)" opacity="0.56"/>
      <text x="92" y="672" fill="#ffffff" font-family="Inter, Arial" font-size="72" font-weight="800">${words}</text>
    </svg>`)}`;
}

function renderProjects(projects, activeFilter = "all") {
  const normalized = projects.map(normalizeProject);
  const filtered = activeFilter === "all"
    ? normalized
    : normalized.filter((project) => project.tags.some((tag) => tag.toLowerCase().includes(activeFilter)));

  projectGrid.innerHTML = "";

  if (!filtered.length) {
    projectGrid.innerHTML = `<div class="empty-projects">No projects match this filter yet. Add images to the <code>projects</code> folder and commit your changes.</div>`;
    return;
  }

  filtered.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = `project-card reveal ${index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""}`;
    card.innerHTML = `
      <div class="project-media">
        <img src="${project.image || placeholderGradient(project.title)}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <div class="tags">${project.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("")}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

    card.addEventListener("click", () => openProjectModal(project));
    projectGrid.appendChild(card);
    revealObserver.observe(card);
  });
}

function openProjectModal(project) {
  modalImage.src = project.image || placeholderGradient(project.title);
  modalCaption.textContent = project.title;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeProjectModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

modalClose.addEventListener("click", closeProjectModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProjectModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectModal();
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

    const discordUrl = site.discordUrl || "#contact";
    const email = site.email || "philfromqc@gmail.com";
    document.getElementById("discordLink").href = discordUrl;
    document.getElementById("contactDiscord").href = discordUrl;
    document.getElementById("contactEmail").href = `mailto:${email}`;
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
      projects = Array.isArray(data) ? data : data.projects || fallbackProjects;
    }
  } catch (error) {
    console.warn("Could not load projects.json. Showing fallback cards.", error);
  }

  renderProjects(projects);

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderProjects(projects, button.dataset.filter);
    });
  });
}

loadSiteSettings();
loadProjects();
