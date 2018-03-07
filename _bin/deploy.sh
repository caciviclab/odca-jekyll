#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

GITHUB_REPO=${GITHUB_REPO:-"caciviclab/www.opendisclosure.io"}
build_dir=_site

# Add a circleci config to avoid testing the gh-pages branch
#TODO better way to do this?
mkdir -p ${build_dir}/.circleci
cp .circleci/config.yml ${build_dir}/.circleci/


# Git init
cd $build_dir
git --version
git init
git config user.name "CA Civic Lab deploy script"
git config user.email "opencal@googlegroups.com"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "git@github.com:${GITHUB_REPO}.git" master:gh-pages &> /dev/null || ( exit_code=$?; echo Error deploying to GH Pages: exit $exit_code >&2; exit $exit_code )
echo ok
