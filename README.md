# Roblox Builder Portfolio

A smooth glassy portfolio website for a Roblox builder. It is designed for GitHub Pages and automatically turns images from one folder into project cards.

## Folder system

Put your images in this folder:

```txt
projects
```

Supported image types:

```txt
.png .jpg .jpeg .webp .gif .svg
```

Example:

```txt
projects/candy-map.png
```

That becomes a portfolio card named `Candy Map`.

## Edit your text

Open this file:

```txt
data/site.json
```

Change your name, headline, Roblox link, Discord, and email.

## Launch on GitHub Pages

1. Create a new GitHub repository.
2. Upload every file from this folder into the repository.
3. Go to your repository `Settings`.
4. Open `Pages` in the left sidebar.
5. Under `Build and deployment`, choose `GitHub Actions` as the source.
6. Go to the `Actions` tab and run `Build and deploy portfolio`, or push a new change.
7. Your website link will appear in the workflow after it deploys.

## Add new work later

1. Add new images to the `projects` folder.
2. Commit/push the change.
3. GitHub Actions rebuilds the gallery automatically.

## Local preview

Because the site uses `fetch`, preview it with a small local server instead of double-clicking `index.html`.

With Python installed:

```bash
python -m http.server 5500
```

Then open:

```txt
http://localhost:5500
```
