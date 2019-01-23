# Getting started with Open Disclosure

This is a list of resources used by Open Oakland's **_[Open Disclosure]_** team + instructions to build the site on your own computer. The core technologies we use in the project are [Ruby], [Jekyll] (a Ruby/Liquid-based static site CMS), [CircleCI], [Node.js], a smidge of Python, and a teeny bit of React. *Don't worry* if you don't know things on the list (or if you've never even written a line of code) because we try to be inclusive and there are always tasks to be [re]done regardless of your technical background. Our data comes from [public-sources] and is augmented by a [shared google sheet] we use for manually aggregating information other references. For more information about "how the site works," see the [front-end README], [the site's FAQ], or our [campaign-finance wiki].

* **Our Website**: https://www.opendisclosure.io
* **GitHub Repositories**:
  * **Front-End Repo**: https://github.com/caciviclab/odca-jekyll
  * **Back-End Repo**: https://github.com/caciviclab/disclosure-backend-static

## Communication Resources
* **Slack**: Join the Open Oakland Slack at `openoakland.slack.com`, then join our specific `#open-disclosure` channel
* **Waffle Board** (Kaban/Trello-style task-board): https://waffle.io/caciviclab/disclosure-backend

## People To Know?
Lots of people have worked on Open Disclosure in its 2+ years of existance (thanks for joining!), but if you *really* want to know "the deal" try these folks (@slack-Ids from openoakland.slack.com)

* _Project Leads_: Tom Dooner(@tdooner) Aaron Borden(@adborden)
* _Designer_: :warning::warning::warning:
* _City Liason_: :warning::warning::warning:
* ???: :warning::warning::warning:
*
*

---

# How to build the site on your machine

Clone _*both*_ the back and front-end repos into the same parent directory. :warning: The front-end ***requires*** that the back-end directory be a sibling _specifically named_ `..\disclosure-backend-static` :warning: in order to build as it is hardcoded that way in the gulpfile.

Dependencies you should already have installed: [Ruby **2.3.4**], [Bundler],
[Make],
[Node 8.9+],
[ImageMagick] (Only need for production builds?? :warning: ?? **TODO** ?? :warning:),Python ?, [PostgreSQL] (only needed for back-end builds??)

## ** Build the Front-End **
(You did see the warning above that you'll need both repositories, right?)

1. **1st-time only**: `cd` into the front-end directory, run `make setup`, then run `make build`.

2. **Update** your local data resources with `make pull-finance`

3. **Rebuild**/**Start Local Server** - *`make serve`*, then the site should be at http://localhost:4000/

4. After making any changes you must run Front-End tests with `make test`.

## ** Build the Back-End **
If you are only doing front-end work, **building the entire back-end is not necessary** - you just need the base files to exist on your machine so feel free to skip this.

* **1st-time only**: `cd disclosure-backend-static` and run the following three commands one-at-a-time:

```
sudo pip install -r requirements.txt
gem install pg bundler
bundle install
```

* **Update Data**: You *do not need to do this every time* - It takes a while to pull the latest information and since it's fairly static data (the real site only updates its data once every 12hrs) you only need to do this "every so often":
  * 1) `make download` - Download raw data files from netfile and our [shared google sheet]
  * 2) `make import` - Import data for processing
  * 3) `make process` - Run the calculators and put output in the "build" folder

* **Debugging** - If you need it, `make run` will serve the static JSON files via a local web server

## Making Changes / Development Process

Notes on our development approach and preferred coding style are written in [ :warning: ** TODO ** :warning: CONTRIBUTING.md ]

tldr; - To work on the code, create and switch to a new branch in which you can do your work and make changes. When you are ready to merge your code, push your branch up to GitHub, go to the website and click the button in order to "Open a New Pull Request". Another member will review your code to approve the merge request.

[Bundler]: https://bundler.io/
[campaign-finance wiki]: https://github.com/caciviclab/campaign-finance-wiki
[CircleCI]: https://circleci.com/gh/caciviclab/odca-jekyll
[front-end README]: https://github.com/caciviclab/odca-jekyll/blob/master/README.md
[ImageMagick]: https://imagemagick.org/script/download.php
[Jekyll]: https://jekyllrb.com/
[Make]: https://www.gnu.org/software/make/
[Node 8.9+]: https://nodejs.org/en/download/
[Node.js]: https://nodejs.org/
[Open Disclosure]: https://www.opendisclosure.io/
[PostgreSQL]: https://www.postgresql.org/download/
[public-sources]: https://ssl.netfile.com/static/agency/coak/
[Ruby]: https://www.ruby-lang.org/en/downloads/
[Ruby **2.3.4**]: https://www.ruby-lang.org/en/downloads/
[shared google sheet]: https://docs.google.com/spreadsheets/d/1vJR8GR5Bk3bUQXziPiQe7to1O-QEm-_5GfD7hPjp-Xc/edit?usp=sharing
[the site's FAQ]: https://www.opendisclosure.io/faq/