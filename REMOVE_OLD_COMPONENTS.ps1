# Run from the root of the lochan repository after copying the new files.
# These components are no longer rendered by the redesigned portfolio.

$old = @(
  'src/components/Contact.jsx',
  'src/components/Cursor.jsx',
  'src/components/Experience.jsx',
  'components/Front.js'
)

foreach ($path in $old) {
  if (Test-Path $path) {
    Remove-Item $path -Force
    Write-Host "Removed $path"
  }
}
