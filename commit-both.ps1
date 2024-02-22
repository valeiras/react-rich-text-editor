param ($message='Minor updates')

git add -A
git commit -m $message
git push -u origin main

npm run build
Copy-Item ".\assets\draggable-block-menu.svg" -Destination ".\rich-editor"
Set-Location .\rich-editor\

git add -A
git commit -m $message
git push -u origin main
Set-location ..