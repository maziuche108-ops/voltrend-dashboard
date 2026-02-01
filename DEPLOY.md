# Deployment Guide

This project is a static web application built with Vanilla JS. It requires no server-side processing (PHP, Node.js, Python, etc.) to run in production, as all data is simulated via client-side SDKs.

## Build Process

We have provided a PowerShell script to package the application for deployment.

**Command:**
```powershell
.\deploy.ps1
```

**What it does:**
1. Cleans the previous `dist/` directory.
2. Copies `index.html` to `dist/`.
3. Copies the `_sdk/` directory to `dist/_sdk/`.

## Hosting Options

### 1. Netlify (Recommended)
- Drag and drop the `dist` folder onto the Netlify dashboard.
- OR connect your Git repository and set the "Publish directory" to `dist`.

### 2. Vercel
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel deploy` inside the `dist` folder.

### 3. GitHub Pages
- Push the contents of `dist` to a `gh-pages` branch.
- Enable GitHub Pages in your repository settings.

### 4. Apache / Nginx
- Copy the contents of `dist` to your web root (e.g., `/var/www/html`).
- Ensure permissions are set to allow reading files.

## Verification

After deployment, verify the following:
- **Market Data**: Ticker should update every second.
- **Navigation**: Clicking links should change the view without reloading.
- **AI Validator**: Go to Admin Panel -> AI Diagnostics and click "Run Diagnostics".
