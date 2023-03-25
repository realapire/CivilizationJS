param(
    [Parameter(Mandatory=$true)]$path,
    [Parameter(Mandatory=$false)]$branch
)

Set-Location $path
git add .
git commit -am "auto-commit with apire script"

if (-not $branch) {
    $branch = "master"
}

git push -u -f origin $branch
