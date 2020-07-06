#!/bin/bash

BLUE='\033[0;34m'
CLR='\033[0m'

# Check if the backend repo has been checked out
if [ ! -d "../disclosure-backend-static/" ]; then
  # If it's not, just clone it for them but let them know what's happening
  echo -e "${BLUE}ALERT: Cloning the backend repo as a sibling repo${CLR}"
  cd .. && git clone git@github.com:caciviclab/disclosure-backend-static.git && cd odca-jekyll
fi

exit 0
