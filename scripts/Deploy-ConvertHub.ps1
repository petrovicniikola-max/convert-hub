# Full production deploy: Astro build + Worker + Cloudflare Container
# Requires: Docker Desktop running, CLOUDFLARE_API_TOKEN in environment

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

if (-not $env:CLOUDFLARE_API_TOKEN) {
  Write-Error @"
CLOUDFLARE_API_TOKEN is not set.

Create a token at https://dash.cloudflare.com/profile/api-tokens
Template: Edit Cloudflare Workers

Then in PowerShell:
  `$env:CLOUDFLARE_API_TOKEN = 'your-token'
  .\scripts\Deploy-ConvertHub.ps1
"@
}

docker info | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Docker is not running. Start Docker Desktop, then retry."
}

Push-Location $root
try {
  npm run deploy
} finally {
  Pop-Location
}

Write-Host ""
Write-Host "Verify: https://convert-hub.net/api/health"
Write-Host "First container deploy may take 3-5 minutes to provision."
