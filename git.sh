#!/bin/bash

year=$(date +"%y")
month=$(date +"%m")
day=$(date +"%d")
hour=$(date +"%H")
minute=$(date +"%M")
timezone=$(date +"%Z")

datetime="$year-$month-$day""T$hour:$minute$timezone"

echo $datetime

git add .
git commit -m \"$datetime\"
git push -u origin main
