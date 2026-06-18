# Phil Roblox Portfolio

A dark Roblox portfolio for **64_phil**.

## What is included

- Hero text: `Low Poly Builds, Faster, Better`
- Status pill: `TOO BUSY`
- Game grid with the Roblox experience card
- Build image carousel with no descriptions
- Contact info for email, Discord, and Roblox profile
- Tech Stack with only `Skills` and `Softwares`
- GitHub Pages workflow already included

## Update your build carousel

Put your build screenshots inside the `Project` folder, then commit the changes.

Example:

```txt
Project/low-poly-lobby.png
Project/candy-map.png
Project/prop-set.png
```

The GitHub Action scans the `Project` folder and turns those images into the carousel. PNG files work.

Important: GitHub Pages is case-sensitive, so `Project` and `projects` are not the same folder. This version supports both for safety, but use `Project` to keep everything clean.

The carousel does **not** use images from `media`. The `media` folder is only for the Games I Worked On card images.

## Update the game card

Edit this file:

```txt
data/games.json
```

## Update your name, email, Discord, or Roblox link

Edit this file:

```txt
data/site.json
```

## Launch on GitHub Pages

1. Upload all files to your repo.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Go to the **Actions** tab.
5. Run **Build and deploy portfolio**.

## If images do not appear

1. Make sure screenshots are inside `Project`, not `media`.
2. Make sure the files are real image files like `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, or `.avif`.
3. Commit the images to GitHub.
4. Open the **Actions** tab and wait for the green checkmark.
5. Refresh your GitHub Pages site.
