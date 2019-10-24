git checkout develop
hugo
git add .
git commit -m $1
git push origin develop
git checkout master
\cp -r -f ./docs/ .
rm -rf ./docs
git add .
git commit -m $1 
git push origin master
git checkout develop
