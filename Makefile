
build:
	bundle exec jekyll build

production:
	JEKYLL_ENV=production bundle exec jekyll build

serve:
	bundle exec jekyll serve

test:
	bundle exec htmlproofer _site --url-swap /odca-jekyll: --check-html --disable-external
