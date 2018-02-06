# Static generated disclosure

## Setup

    $ bundle install
    $ bundle exec jekyll serve


## Findings

- `ballots` should probably just be renamed `elections`.
- naming of the files is very important, it's how we reference relationships
  between entities. Best is to use the full path name which would be unique per
  entity.
- Info we attribute to candidates, like bio, occupation, website, etc, should
  those be frozen in time based at the time of election? For Example, London
  Breed is now running for Mayor, so many of these qualities have changed since
  the last election. Would folks be interested in seeing snapshots of websites,
  at the time of a previous election?
