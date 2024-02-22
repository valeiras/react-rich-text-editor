param ($message='Minor updates')

git add -A
git commit -m $message
git push -u origin main

npm run build
Copy-Item ".\assets\draggable-block-menu.svg" -Destination ".\dist"
Set-Location .\dist\

git add -A
git commit -m $message
git push -u origin main
Set-location ..