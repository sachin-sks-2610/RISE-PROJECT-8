# ServeEase Service Marketplace

Static multi-page website.

## Push To GitHub (first time)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy On GitHub Pages

1. Open repository Settings -> Pages.
2. In Build and deployment, choose `Deploy from a branch`.
3. Select branch `main` and folder `/ (root)`.
4. Save and wait for deployment.

## Why CSS was inconsistent after push

- Browsers can cache `style.css` aggressively on static hosts.
- HTML files now load versioned assets (`style.css?v=1.0.1`, `script.js?v=1.0.1`) to force fresh files after updates.

## Update workflow

When you change CSS/JS in the future, bump version in HTML links (for example `v=1.0.2`) and push.
