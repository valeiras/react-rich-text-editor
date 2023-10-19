param ($message='Minor updates')

git add -A
git commit -m $message
git push -u origin main

npm run build
cp .\google38b81e2e25451158.html .\dist\
Set-Location .\dist\

git add -A
git commit -m $message
git push -u origin main
Set-location ..