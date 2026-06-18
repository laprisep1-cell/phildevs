# Phil Roblox Dev Portfolio

A dark Roblox developer portfolio for **64_phil**.

## What is included

- Hero text: `Roblox Dev` and `Low Poly Builds, Faster, Better`
- Status pill: `TOO BUSY`
- Game grid with the Roblox experience card
- Build image carousel with no descriptions
- Contact info for email, Discord, and Roblox profile
- Tech Stack with only `Skills` and `Softwares`
- GitHub Pages workflow already included

## Update your build images

Put images inside the `projects` folder, then commit the changes.

Example:

```txt
projects/low-poly-lobby.png
projects/candy-map.png
projects/prop-set.png
```

The GitHub Action scans the `projects` folder and turns the images into the carousel.

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
