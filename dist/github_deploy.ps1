# GitHub Deployment Helper Script for TechCronch

Write-Host "TechCronch GitHub Deployment Helper" -ForegroundColor Cyan
Write-Host "---------------------------------" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Error: Git repository not initialized. Please run the setup first." -ForegroundColor Red
    exit 1
}

# Ask for the repository URL
Write-Host "Please create a new repository on GitHub (https://github.com/new)"
Write-Host "Do NOT initialize it with README, .gitignore, or License."
Write-Host ""
$repoUrl = Read-Host "Enter your new GitHub Repository URL (e.g., https://github.com/username/techcronch.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Error: Repository URL cannot be empty." -ForegroundColor Red
    exit 1
}

# Add remote origin
Write-Host "Adding remote origin..."
git remote remove origin 2>$null # Remove if exists
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error adding remote origin." -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "Pushing code to GitHub..."
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully deployed to GitHub!" -ForegroundColor Green
    Write-Host "To enable GitHub Pages:"
    Write-Host "1. Go to your repository settings on GitHub."
    Write-Host "2. Navigate to 'Pages'."
    Write-Host "3. Under 'Source', select 'Deploy from a branch'."
    Write-Host "4. Select 'main' branch and '/root' folder (or '/dist' if you prefer)."
    Write-Host "5. Click Save."
} else {
    Write-Host ""
    Write-Host "❌ Failed to push to GitHub. Please check your URL and permissions." -ForegroundColor Red
}
