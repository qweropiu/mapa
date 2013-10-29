#!/usr/bin/env bash
cp $(find ~/mapa/ -name '*.js') ~/herokumapa/site/public/js/
cp $(find ~/mapa/ -name '*.html') ~/herokumapa/site/public/
cd ~/herokumapa/site/
git add .
git commit -am"update"
git push heroku master
git remote -v | grep -m 1 -oE [a-z]+-[a-z]+-[0-9]+ | awk '{print "\n\n\n" $1 ".herokuapp.com \n\n\n"}'
