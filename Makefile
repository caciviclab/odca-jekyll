
build:
	npm run build
	bundle exec jekyll build

clean:
	rm -rf _site
	npm run gulp -- clean

production:
	npm run dist
	JEKYLL_ENV=production bundle exec jekyll build

pull-finance:
	npm run pull

serve:
	npm run watch &
	bundle exec jekyll serve --incremental

setup:
	npm install
	bundle install

test:
	npm test
	bundle exec htmlproofer _site --check-html --disable-external
	bundle exec scss-lint _sass
