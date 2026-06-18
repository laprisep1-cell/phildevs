const galleryGrid = document.querySelector("#galleryGrid");
const emptyState = document.querySelector("#emptyState");
const cardTemplate = document.querySelector("#galleryCardTemplate");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = document.querySelector(".lightbox-close");

let allItems = [];

async function loadSiteSettings() {
  try {
    const response = await fetch(`data/site.json?v=${Date.now()}`);
    if (!response.ok) return;
    const settings = await response.json();

    document.title = settings.pageTitle || document.title;

    document.querySelectorAll("[data-site]").forEach((element) => {
      const key = element.dataset.site;
      if (settings[key]) element.textContent = settings[key];
    });

    updateContactLink("robloxLink", settings.robloxUrl);
    updateContactLink("discordLink", settings.discordUrl || settings.discordName, settings.discordName);
    updateContactLink("emailLink", settings.email ? `mailto:${settings.email}` : "", settings.email);
  } catch (error) {
    console.warn("Could not load data/site.json", error);
  }
}

function updateContactLink(id, href, label) {
  const link = document.querySelector(`#${id}`);
  if (!link) return;

  if (label) link.textContent = label;
  if (href) {
    link.href = href;
  } else {
    link.style.display = "none";
  }
}

async function loadGallery() {
  try {
    const response = await fetch(`data/gallery.json?v=${Date.now()}`);
    if (!response.ok) throw new Error("Missing gallery.json");
    const gallery = await response.json();

    allItems = Array.isArray(gallery) ? gallery : [];
  } catch (error) {
    allItems = [];
    console.warn("Gallery is empty or missing. Add images to the projects folder and run the generator.", error);
  }

  renderGallery();
}

function renderGallery() {
  galleryGrid.innerHTML = "";
  emptyState.hidden = allItems.length > 0;

  allItems.forEach((item) => {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    const image = card.querySelector("img");
    const button = card.querySelector("button");
    const category = card.querySelector(".gallery-category");
    const title = card.querySelector("h3");

    image.src = item.src;
    image.alt = item.title;
    category.textContent = "Project";
    title.textContent = item.title;

    button.addEventListener("click", () => openLightbox(item.src, item.title));

    galleryGrid.appendChild(card);
  });
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

loadSiteSettings();
loadGallery();
