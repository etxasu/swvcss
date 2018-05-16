#!/bin/bash

# Populates the build folder for deployment.

set -e

if [[ ($# -ne 3) || (($1 != "dev") && ($1 != "staging") && ($1 != "production")) ]] ; then
	echo "usage: build.sh <dev|staging|production> <version> <build folder>"
	exit 1
fi

QA_LEVEL=$1
VERSION=$2
BUILD_FOLDER=$3

# Create the config.js
if [[($QA_LEVEL = "staging")]]; then
	EYES_SERVER="https://eyes.nasa.gov/staging"
	printf "module.exports = {\n\tversion: '$VERSION',\n\tdate: '$DATE'\n};\n" > config.js
elif [[($QA_LEVEL = "production")]]; then
	EYES_SERVER="https://eyes.nasa.gov"
else
	EYES_SERVER="https://eyes.nasa.gov/dev"
fi
printf "config = {\n\tanimServer: 'https://eyes.nasa.gov/server',\n\teyesServer: 'https://eyes.nasa.gov/dev'\n}\n" > config.js

# Moves files into the build folder.
rsync -arvz --exclude=".[!.]*" --exclude 'build.sh' --exclude 'package*' --exclude 'node_modules' --exclude 'webpack*' --delete --delete-excluded ./ "$BUILD_FOLDER/"

