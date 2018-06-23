[![CircleCI](https://circleci.com/gh/caciviclab/odca-jekyll.svg?style=svg)](https://circleci.com/gh/caciviclab/odca-jekyll)

# www.opendisclosure.io

_This project is currently in MVP stage. We are currently working on getting
this project to feature parity with the existing
[opendisclosure.io][opendisclosure-io] website._

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
[project page](https://caciviclab.org/opendisclosure/) up to date with all the
information about how we work and where to get looped in.

We're maintaining a high-level list of work for our MVP in this [project
board](https://github.com/caciviclab/odca-jekyll/projects/1).

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.


## Prerequisites

- [Ruby 2.3](https://www.ruby-lang.org/)
- [Bundler](https://bundler.io/) gem
- [Make](https://www.gnu.org/software/make/)
- [Node 8.9+](https://nodejs.org/)


## Setup

    $ npm install
    $ bundle install
    $ make build
    $ make serve

Open your web browser to [http://localhost:4000/odca-jekyll/](http://localhost:4000/odca-jekyll/).


## Findings

This project started as an experiment. Here is what we learned:

- `ballots` should probably just be renamed `elections`.
- naming of the files is very important, it's how we reference relationships
  between entities. Best is to use the full path name which would be unique per
  entity.
- Info we attribute to candidates, like occupation, website, etc, should
  those be frozen in time based at the time of election? For example, London
  Breed is now running for Mayor, so many of these attributes have changed since
  the last election. Would folks be interested in seeing snapshots of websites,
  at the time of a previous election? i.e. should past elections just be
  snapshots of the opendisclosure website?
- supporting/opposing committees for a referendum should be stored within the
  referendum?


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

Then you can run the npm task.

    $ npm run pull

Now rebuild your site with the finance data.

    $ make build


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

Font Awesome Icons located under `assets/fontawesome/` available under the
[CC-BY-4.0 License](https://creativecommons.org/licenses/by/4.0/).


[backend-static]: https://github.com/caciviclab/disclosure-backend-static
[opendisclosure-io]: http://www.opendisclosure.io/
