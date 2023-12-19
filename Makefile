SVGS := $(patsubst %,_includes/svg/%,$(notdir $(wildcard assets/fontawesome/*.svg)))
PWD=$(shell pwd)
RED=\033[0;31m
CLR=\033[0m
NODE_OPTIONS=--openssl-legacy-provider

build: $(SVGS)
	npm run build
	bundle exec jekyll build

clean:
	rm -rf _site
	npm run gulp -- clean

production: $(SVGS)
	NODE_OPTIONS=$(NODE_OPTIONS) npm run dist
	JEKYLL_ENV=production bundle exec jekyll build

pull-finance:
	npm run pull

serve-docker: $(SVGS)
	NODE_OPTIONS=$(NODE_OPTIONS) npm run watch &
	jekyll serve --incremental

serve: $(SVGS)
	NODE_OPTIONS=$(NODE_OPTIONS) npm run watch &
	bundle exec jekyll serve --incremental

setup:
	npm install
	bundle install

_includes/svg/%.svg: assets/fontawesome/%.svg
	mkdir -p _includes/svg
	cp $< $@


test:
	npm test
	bundle exec htmlproofer _site --disable-external=true
	bundle exec scss-lint _sass

docker:
	./_bin/ensure-sibling-repo.sh
	cp -r ../disclosure-backend-static/build/* . # Copy over the built resources from the backend
	command -v docker >/dev/null 2>&1 || { echo >&2 "${RED}ERROR: Install docker at https://docs.docker.com/get-docker/${CLR}"; exit 1; }
	docker build -t odca-jekyll .
	docker run -it --rm -p 4000:4000 \
          -v "$(PWD)/_includes/:/app/_includes" \
          -v "$(PWD)/_layouts/:/app/_layouts" \
          -v "$(PWD)/_plugins/:/app/_plugins" \
          -v "$(PWD)/assets/:/app/assets" \
          -v "$(PWD)/src/:/app/src" \
          odca-jekyll

.PHONY: build clean production pull-finance serve setup test
