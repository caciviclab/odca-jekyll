
build:
	bundle exec jekyll build

clean:
	rm -rf _site

production:
	JEKYLL_ENV=production bundle exec jekyll build

serve:
	bundle exec jekyll serve

test:
	bundle exec htmlproofer _site --url-swap /odca-jekyll: --check-html --disable-external
	bundle exec scss-lint _sass
