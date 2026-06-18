# Phil Roblox Builder Portfolio

A dark, developer-style Roblox builder portfolio inspired by terminal/code portfolio layouts. It is made for GitHub Pages.

## Edit your info

Open `data/site.json` and change:

- `brand`
- `heroTitle`
- `heroSubtitle`
- `intro`
- `discord`
- `discordUrl`
- `email`
- `contactText`

## Add projects

Put images inside the `projects` folder.

Example names:

```txt
map-candy-world.png
prop-wooden-crate.png
showcase-medieval-valley.jpg
lobby-simulator-main.webp
```

When you push/commit to GitHub, the included GitHub Action scans the `projects` folder and updates `data/projects.json` automatically.

## Launch on GitHub Pages

1. Upload every file in this folder to your GitHub repository.
2. Make sure this file exists in your repo:

```txt
.github/workflows/deploy.yml
```

3. Go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Go to the **Actions** tab.
6. Run **Build and deploy portfolio**.

Your website link will look like:

```txt
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

## Important

If you drag files into GitHub from Windows and the `.github` folder does not upload, create this file manually in GitHub:

```txt
.github/workflows/deploy.yml
```

Then paste the workflow from the zip.
