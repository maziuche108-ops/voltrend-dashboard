# Deployment Guide

This project is a static web application built with Vanilla JS. It requires no server-side processing (PHP, Node.js, Python, etc.) to run in production, as all data is simulated via client-side SDKs.

## Quick Start (GitHub Deployment)

We have provided a helper script to easily push your code to GitHub.

1.  **Create a Repository**: Go to [GitHub.com/new](https://github.com/new) and create a new empty repository.
2.  **Run Script**: Execute the following command in your terminal:
    ```powershell
    .\github_deploy.ps1
    ```
3.  **Follow Prompts**: Paste your repository URL when asked.

## Build Process (Manual)

If you need a clean distribution folder for other hosts:

**Command:**
```powershell
.\deploy.ps1
```

**What it does:**
1. Cleans the previous `dist/` directory.
2. Copies `index.html` to `dist/`.
3. Copies the `_sdk/` directory to `dist/_sdk/`.

## Hosting Options

### 1. GitHub Pages (Recommended)
After running `github_deploy.ps1`:
1.  Go to your repository **Settings** on GitHub.
2.  Navigate to **Pages** (in the sidebar).
3.  Under **Build and deployment > Source**, select **Deploy from a branch**.
4.  Select **Branch**: `main` and **Folder**: `/dist` (or `/` if you want to verify the source).
    *   *Note: Since we committed the `dist` folder, you can select `/dist` as the source folder for a cleaner production URL, or use `/` and access via `your-site/dist/index.html`.*
5.  Click **Save**.

### 2. Netlify
- Drag and drop the `dist` folder onto the Netlify dashboard.
- OR connect your Git repository and set the "Publish directory" to `dist`.

### 3. Vercel
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel deploy` inside the `dist` folder.

### 4. Apache / Nginx
- Copy the contents of `dist` to your web root (e.g., `/var/www/html`).
- Ensure permissions are set to allow reading files.

## Verification

After deployment, verify the following:
- **Market Data**: Ticker should update every second.
- **Navigation**: Clicking links should change the view without reloading.
- **AI Validator**: Go to Admin Panel -> AI Diagnostics and click "Run Diagnostics".
