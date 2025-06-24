# PowerShell脚本自动整理.md文件到同名文件夹
Get-ChildItem -Path $PSScriptRoot -Filter *.md -File | ForEach-Object {
    $basename = $_.BaseName
    $newDir = Join-Path -Path $_.DirectoryName -ChildPath $basename
    
    if (-not (Test-Path -Path $newDir)) {
        New-Item -ItemType Directory -Path $newDir | Out-Null
    }
    
    Move-Item -Path $_.FullName -Destination (Join-Path -Path $newDir -ChildPath "index.md")
}

Write-Host "已完成文件整理，共处理了 $(Get-ChildItem -Path $PSScriptRoot -Filter *.md -File | Measure-Object).Count 个文件" -ForegroundColor Green