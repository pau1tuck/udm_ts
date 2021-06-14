#!/bin/bash

datetime=$(date "+%Y-%m-%dT%H:%M%Z")

echo $datetime

git add .
git commit -m \"$datetime\"
git push -u origin main
