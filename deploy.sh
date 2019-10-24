#!/bin/bash

echo "hugo"
hugo

echo "git push to develop branch"
git add .
git commit -m $1
git push origin develop

echo "git checkout master"
git checkout master

echo "copy files in docs folder"
\cp -r -f ./docs/ .
rm -rf ./docs

echo "git push to master branch"
git add .
git commit -m $1 
git push origin master
git checkout develop
