[![CircleCI](https://circleci.com/gh/adborden/odca-jekyll.svg?style=svg)](https://circleci.com/gh/adborden/odca-jekyll)

# www.opendisclosure.io

_This project is currently in MVP stage. We are currently working on getting
this project to feature parity with the existing
[opendisclosure.io][opendisclosure-io] website._

[Open Disclosure California][opendisclosure-io] provides transparent,
non-partisan campaign contribution and expenditure data in an accessible and
easy to understand format. We hope this site will engage the voting public and
raise awareness and accountability. Ultimately, this is one step toward shifting
politics into a movement of civic engagement and ultimate citizen action.


## Setup

    $ bundle install
    $ make build
    $ make serve

Open your web browser to [http://localhost:4000/](http://localhost:4000/).


## Findings

This project started as an experiment. Here is what we learned:

- `ballots` should probably just be renamed `elections`.
- naming of the files is very important, it's how we reference relationships
  between entities. Best is to use the full path name which would be unique per
  entity.
- Info we attribute to candidates, like bio, occupation, website, etc, should
  those be frozen in time based at the time of election? For example, London
  Breed is now running for Mayor, so many of these attributes have changed since
  the last election. Would folks be interested in seeing snapshots of websites,
  at the time of a previous election? i.e. should past elections just be
  snapshots of the opendisclosure website?


## Development

Run the tests

    $ make test


[opendisclosure-io]: http://www.opendisclosure.io/
