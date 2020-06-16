SVGS := $(patsubst %,_includes/svg/%,$(notdir $(wildcard assets/fontawesome/*.svg)))

build: $(SVGS)
	npm run build
	bundle exec jekyll build

clean:
	rm -rf _site
	npm run gulp -- clean

production: $(SVGS)
	npm run dist
	JEKYLL_ENV=production bundle exec jekyll build

pull-finance:
	npm run pull

serve: $(SVGS)
	npm run watch &
	bundle exec jekyll serve --incremental

setup:
	npm install
	bundle install

_includes/svg/%.svg: assets/fontawesome/%.svg
	mkdir -p _includes/svg
	cp $< $@


test:
	npm test
	bundle exec htmlproofer _site --check-html --disable-external
	bundle exec scss-lint _sass

.PHONY: build clean production pull-finance serve setup test
