#!/usr/bin/env sh
fullversion=`cat temp_version.txt`
echo "$( jq  '.Image.Name = "'"$fullversion"'"' Dockerrun.aws.json )" > Dockerrun.aws.json
