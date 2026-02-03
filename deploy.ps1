# Deploy Script for Voltrend
$ErrorActionPreference = "Stop"

Write-Host "Starting deployment build..." -ForegroundColor Cyan

# Define paths
$distDir = "dist"
$sdkDir = "_sdk"
$indexFile = "index.html"

# Clean dist directory
if (Test-Path $distDir) {
    Write-Host "Cleaning existing dist directory..."
    Remove-Item -Recurse -Force $distDir
}

# Create dist directory
New-Item -ItemType Directory -Force -Path $distDir | Out-Null

# Copy index.html
Write-Host "Copying index.html..."
Copy-Item $indexFile $distDir

# Copy PWA files
Write-Host "Copying PWA files..."
Copy-Item "manifest.json" $distDir
Copy-Item "sw.js" $distDir

# Copy _sdk directory
Write-Host "Copying SDKs..."
Copy-Item -Recurse $sdkDir $distDir

Write-Host "Build complete! Content is ready in '$distDir' folder." -ForegroundColor Green
Write-Host "You can serve this folder to test the production build."
