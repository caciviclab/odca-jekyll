Open Disclosure Oakland  [![CircleCI](https://circleci.com/gh/caciviclab/odca-jekyll.svg?style=svg)](https://circleci.com/gh/caciviclab/odca-jekyll)
===========================================================================

[Open Disclosure][opendisclosure-io] is a project of [OpenOakland](https://openoakland.org). 
The website provides transparent, non-partisan campaign contribution and expenditure data in an accessible and easy to understand format. We hope this site will engage the voting public and
raise awareness and accountability. Ultimately, this is one step toward shifting
politics into a movement of civic engagement and ultimate citizen action.


# Readme contents

- [Code of conduct](#code-of-conduct-and-values)
- [Quickstart for developers](#quickstart-for-developers)
- [Project documentation](#project-documentation)
- [License](#license)


# Code of conduct

To participate in this project, we ask you to abide by the OpenOakland [Code of Conduct](CODE_OF_CONDUCT.md).


# Quickstart for developers

There are two ways to run the website locally for development: using Docker, and running everything locally.

## Run using Docker

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)

Ensure you have the backend cloned as a sibling to this repo. Find more details below in [Finance disclosures](#finance-disclosures).

### Run this command in your terminal

    $ make docker

Open your web browser to [http://localhost:4000/](http://localhost:4000/).


## Run locally

### Prerequisites

- [Ruby 2.7](https://www.ruby-lang.org/)
- [Bundler 2](https://bundler.io/) gem
- [Make](https://www.gnu.org/software/make/)
- [Node 12.16+](https://nodejs.org/)
- [ImageMagick](https://www.imagemagick.org/)
- [nvm](https://github.com/nvm-sh/nvm#install--update-script)


### Run these commands in your terminal

    $ nvm install && nvm use # To get on the right node version
    $ make setup # To install all dependencies

Ensure you have the backend cloned as a sibling to this repo. Find more details below in [Finance disclosures](#finance-disclosures).

    $ make pull-finance
    $ make serve

Open your web browser to [http://localhost:4000/](http://localhost:4000/).


### Additional commands

You can build the site without running a server, if needed 
    
    $ make build

You can run the tests locally too

    $ make test


## Finance disclosures

The process of downloading, converting, and calculating the reported financial
disclosures is handled by [disclosure-backend-static][backend-static].  To get
the finance data into this project, we use [gulp.js](https://gulpjs.com/) to
copy the files over and do some light transformations on their file paths.

If you have thoughts on how this could be improved, [let us
know](https://github.com/caciviclab/odca-jekyll/issues/5)!


### Update the finance data

In order to get the latest finance data, first clone
[disclosure-backend-static][backend-static] as a sibling to this project's
directory. _It is important that the `disclosure-backend-static` project is
cloned to the correct path (`../disclosure-backend-static`) which is hardcoded
in the gulpfile (pull requests welcome)._

Then you can run the pull-finance task.

    $ make pull-finance

Now rebuild your site with the finance data.

    $ make serve


## Deployment Information

This site is deployed by a [scheduled CI task](https://circleci.com/gh/caciviclab/workflows/odca-jekyll) twice daily. It clones the [disclosure-backend-static][backend-static] repo and pulls in the finance data before doing a build. Merges to the master branch will also trigger a deploy.

The site is hosted on [GitHub Pages](https://pages.github.com/). The deploy
consists of a force push of the `_site` directory to the `gh-pages` branch done
by [_bin/deploy.sh](_bin/deploy.sh).


# Project documentation

- [Project Overview](https://docs.google.com/document/d/147WBdGqM_J9pA_fmUhuE0DOEKrIFy0GaT9m66oXTbG0/edit?usp=sharing)


# License

Content for this website is available under the [Creative Commons
Attribution-NonCommercial-ShareAlike 4.0 International
License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Code is licensed under the GNU Affero General Public License.

```
    www.opendisclosure.io California’s online source for local campaign finance data
    Copyright (C) 2020  OpenOakland

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

[Font Awesome Icons](https://fontawesome.com/) located under `assets/fontawesome/` available under the
[CC-BY-4.0 License](https://creativecommons.org/licenses/by/4.0/).


[backend-static]: https://github.com/caciviclab/disclosure-backend-static
[opendisclosure-io]: https://www.opendisclosure.io/
