[![CircleCI](https://circleci.com/gh/caciviclab/odca-jekyll.svg?style=svg)](https://circleci.com/gh/caciviclab/odca-jekyll)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/caciviclab/disclosure-backend.png?columns=ready)](https://waffle.io/caciviclab/disclosure-backend?utm_source=badge)

# www.opendisclosure.io

[Open Disclosure California][opendisclosure-io] provides transparent,
non-partisan campaign contribution and expenditure data in an accessible and
easy to understand format. We hope this site will engage the voting public and
raise awareness and accountability. Ultimately, this is one step toward shifting
politics into a movement of civic engagement and ultimate citizen action.


## Contributing

Welcome! We are a coalition of brigades, all volunteers from the California. We
would love to get help from folks across the state to help us in building
a database of campaign finance data for local jurisdictions across the state.

www.opendisclosure.io is one piece of the ODCA project. We try to keep our
[project page](http://caciviclab.org/opendisclosure/) up to date with all the
information about how we work and where to get looped in.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.


## Prerequisites

- [Ruby 2.3](https://www.ruby-lang.org/)
- [Bundler](https://bundler.io/) gem
- [Make](https://www.gnu.org/software/make/)
- [Node 8.9+](https://nodejs.org/)
- [ImageMagick](https://www.imagemagick.org/)


## Setup

    $ make setup
    $ make build

Follow the instructions under [Finance disclosures](#finance-disclosures).

    $ make pull-finance
    $ make serve

Open your web browser to [http://localhost:4000/](http://localhost:4000/).


## Development

Run the tests

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


## Deployment

This site is deployed by a [scheduled CI
task](https://circleci.com/gh/caciviclab/workflows/odca-jekyll) twice daily. It
clones the [disclosure-backend-static][backend-static] repo and pulls in the
finance data before doing a build. Merges to the master branch will also trigger
a deploy.

The site is hosted on [GitHub Pages](https://pages.github.com/). The deploy
consists of a force push of the `_site` directory to the `gh-pages` branch done
by [_bin/deploy.sh](_bin/deploy.sh).


## License

Content for this website is available under the [Creative Commons
Attribution-NonCommercial-ShareAlike 4.0 International
License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Code is licensed under the GNU Affero General Public License.

```
    www.opendisclosure.io California’s online source for local campaign finance data
    Copyright (C) 2018  CA Civic Lab

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
